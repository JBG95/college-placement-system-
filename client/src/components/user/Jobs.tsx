import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import axios from "axios";
import { userDetailsAtom } from "../../recoil/atoms";
import { Job } from "../../types/interface";

const Jobs = () => {
  const navigate = useNavigate();
  const userDetails = useRecoilValue(userDetailsAtom); // Get user details from Recoil
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1738/api/jobs/user/${userDetails.id}/jobs`
        ); // Adjust the API endpoint
        console.log(response.data);
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, [userDetails.id]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  const handleCreateJob = () => {
    navigate("/user/jobs/create");
  };

  const handleUpdateJob = (jobId: string) => {
    navigate(`/user/jobs/update/${jobId}`);
  };

  // Filter and search jobs based on user input
  const filteredJobs = jobs
    .filter((job) => {
      if (filter === "all") return true; // Show all jobs
      return job.status.toLowerCase() === filter; // Filter by status
    })
    .filter((job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase())
    ); // Search by title

  return (
    <div className="p-4">
      {/* Topbar with search, filters, and create job button */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-4">
          {/* Search bar */}
          <input
            type="text"
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={handleSearch}
            className="border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
          />

          {/* Filter buttons */}
          <div className="flex space-x-2">
            {["all", "active", "settled", "closed"].map((status) => (
              <button
                key={status}
                className={`px-4 py-2 rounded-md ${
                  filter === status ? "bg-gray-500 text-white" : "bg-gray-100"
                }`}
                onClick={() => handleFilterChange(status)}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Create Job button */}
        <button
          className="px-4 py-2 bg-slate-800 text-white rounded-md hover:bg-slate-700"
          onClick={handleCreateJob}
        >
          Create Job
        </button>
      </div>

      {/* Job list */}
      <div>
        {filteredJobs.length > 0 ? (
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-slate-700 text-white">
                <th className="border px-4 py-2 text-start">Title</th>
                <th className="border px-4 py-2 text-start">Status</th>
                <th className="border px-4 py-2 text-start">Salary Range</th>
                <th className="border px-4 py-2 text-start">Deadline</th>
                <th className="border px-4 py-2 text-start">Location</th>
                <th className="border px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredJobs.map((job) => (
                <tr key={job.id} className="border-b">
                  <td className="border px-4 py-2">{job.title}</td>
                  <td className="border px-4 py-2">{job.status}</td>
                  <td className="border px-4 py-2">K{job.salaryRange}</td>
                  <td className="border px-4 py-2">{job.deadline}</td>
                  <td className="border px-4 py-2">{job.location}</td>
                  <td className="border px-4 py-2 space-x-2 flex items-center justify-center">
                    <button
                      className="bg-slate-700 p-2 text-white rounded hover:bg-slate-600"
                      onClick={() => handleUpdateJob(job.id)}
                    >
                      Update
                    </button>
                    <button className="bg-red-500 p-2 text-white rounded hover:bg-red-600">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No jobs found.</p>
        )}
      </div>
    </div>
  );
};

export default Jobs;
