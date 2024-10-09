import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "../components/global/Loader";
import { Job } from "../types/interface";
import { MapPin } from "lucide-react";

const Jobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const response = await axios.get("http://localhost:1738/api/jobs/all");
        setJobs(response.data);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="py-8 px-8 w-full min-h-screen flex flex-col">
      <div className="flex justify-between items-center w-full mb-4">
        <input
          type="text"
          placeholder="Search jobs..."
          className="py-2 px-4 rounded-full border border-slate-300 focus:outline-none focus:border-slate-500 w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex gap-4">
          <button className="py-2 px-3 text-center bg-slate-800 shadow text-white rounded-full">
            Recent
          </button>
          <button className="py-2 px-3 text-center bg-slate-100 text-slate-800 shadow rounded-full">
            Popular
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center">
          <Loader />
        </div>
      ) : isError ? (
        <p className="text-center text-red-500">Error fetching jobs.</p>
      ) : filteredJobs.length === 0 ? (
        <p className="text-center text-gray-500">No jobs available.</p>
      ) : (
        <div className="w-full grid lg:grid-cols-4 md:grid-cols-4 grid-cols-1 gap-4 mt-4">
          {filteredJobs.map((job: Job) => (
            <div
              key={job.id}
              className="p-4 shadow shadow-slate-600 rounded-xl"
            >
              <div className="w-full flex gap-3 items-center">
                <img
                  src={
                    job.Company?.avatar ||
                    job.user?.avatarUrl ||
                    "placeholder-image-url"
                  }
                  alt={job.Company?.name || job.user?.fullname}
                  loading="lazy"
                  className="h-14 w-14 rounded-full shadow shadow-slate-400"
                />
                <div className="flex flex-col">
                  <p className="font-bold text-slate-900">
                    {job.Company?.name || job.user?.fullname}
                  </p>
                  <div className="flex items-center text-sm text-slate-700">
                    <MapPin className="text-orange-500 mr-1" /> {job.location}
                  </div>
                </div>
              </div>
              <div className="bg-slate-400 h-[1px] w-full flex mt-4"></div>
              <div className="mt-4 flex flex-col">
                <p className="text-slate-900 text-lg font-bold">{job.title}</p>
                <div className="w-full gap-4 flex text-sm mt-2 text-slate-700">
                  <p className="before:content-['•'] before:text-orange-500 before:mr-1">
                    {job.type}
                  </p>
                  <p className="before:content-['•'] before:text-orange-500 before:mr-1">
                    {job.work}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex justify-between item-center">
                <p className="text-slate-700 font-bold text-md">
                  K{job.salaryRange}
                  <span className="text-slate-700 text-sm font-normal">
                    /month
                  </span>
                </p>
                <Link
                  to={`/job/${job.id}`}
                  className="py-2 px-4 bg-slate-700 hover:bg-slate-800 transition-all duration-300 text-white rounded-full"
                >
                  Apply Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Jobs;
