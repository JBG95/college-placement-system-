import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Job } from "../types/interface";
import Loader from "../components/global/Loader";
import { MapPin } from "lucide-react";

const JobId = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const response = await axios.get(
          `http://localhost:1738/api/jobs/one/${jobId}`
        );
        setJob(response.data);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader />
      </div>
    );
  }

  if (isError || !job) {
    return (
      <p className="text-center text-red-500">Error fetching job details.</p>
    );
  }

  const descriptionParagraphs = job.description.trim().split("\n\n");

  return (
    <section className="w-full py-8 px-8 min-h-screen flex flex-col items-center bg-gray-50">
      <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-8 bg-white shadow-lg rounded-lg p-8">
        <div className="w-full flex flex-col mx-auto">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            {job.title}
          </h1>
          <div className="flex gap-4 items-center mb-6">
            <img
              src={job.Company?.avatar || job.user?.avatarUrl}
              alt={job.Company?.name || job.user?.fullname || "Company Logo"}
              loading="lazy"
              className="h-20 w-20 rounded-full shadow shadow-slate-400 object-cover"
            />
            <div>
              <p className="text-lg font-bold text-slate-900">
                {job.Company?.name || job.user?.fullname}
              </p>
              <div className="flex items-center text-sm text-slate-700">
                <MapPin className="text-orange-500 mr-1" /> {job.location}
              </div>
            </div>
          </div>
          <div className="bg-slate-300 h-[1px] w-full mb-6"></div>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Requirements</h2>
            <ul className="list-disc list-inside text-slate-700 space-y-1">
              {job.requirements.map((requirement, index) => (
                <li key={index}>{requirement}</li>
              ))}
            </ul>
          </div>
          <div className="mb-6 flex justify-between w-full">
            <p className="text-slate-700">Job Type</p>
            <p className="text-slate-700">{job.type}</p>
          </div>
          <div className="mb-6 flex justify-between w-full">
            <p className="text-slate-700">Work Type</p>
            <p className="text-slate-700">{job.work}</p>
          </div>
          <div className="mb-6 flex justify-between w-full">
            <p className="text-slate-700">Salary Range</p>
            <p className="text-slate-700">K{job.salaryRange} /month</p>
          </div>
          <div className="mb-6 flex justify-between w-full">
            <p className="text-slate-700">Application Deadline</p>
            <p className="text-slate-700">{job.deadline}</p>
          </div>
          <div className="mt-6 flex justify-center">
            <Link
              to={`/apply/${jobId}`}
              className="py-3 px-8 bg-slate-800 hover:bg-slate-700 transition-all duration-300 text-white font-bold rounded-full shadow-md"
            >
              Apply Now
            </Link>
          </div>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Job Description</h2>
          {descriptionParagraphs.map((paragraph, index) => (
            <p key={index} className="text-slate-700 leading-relaxed mb-4">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JobId;
