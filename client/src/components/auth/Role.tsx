import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ENDPOINT, UPDATEROLE } from "../../constants/config";
import { Briefcase, PlusCircle } from "lucide-react";
import Loader from "../global/Loader";

const Role = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [_selectedRole, setSelectedRole] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleRoleSelection = async (role: string) => {
    setSelectedRole(role);
    setLoading(true);

    try {
      await axios.put(`${ENDPOINT}${UPDATEROLE}${userId}`, {
        role,
      });

      setTimeout(() => {
        if (role === "User") {
          navigate("/login");
        } else if (role === "Creator") {
          navigate("/login");
        }
      }, 2000);
    } catch (error) {
      setMessage("Failed to update the role. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-6 md:px-48 p-4 min-h-screen w-full flex items-center justify-center">
      <div className="w-full md:gap-4 gap-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 shadow p-4 rounded-xl">
        <div className="flex flex-col justify-center md:p-4 p-0">
          <h2 className="text-3xl font-bold text-slate-800 flex items-center">
            What would you like to do?
          </h2>

          {/* Explanations for both roles */}
          <div className="mt-4">
            <p className="text-slate-700">
              <strong>Find a Job:</strong> As a job seeker, you can browse
              through various job listings, apply for positions, and connect
              with potential employers. This role allows you to take the next
              step in your career by finding opportunities that match your
              skills and interests.
            </p>
            <p className="text-slate-700 mt-2">
              <strong>Create a Job:</strong> If you're an employer or
              organization, this role lets you post job openings, manage
              applications, and find the right talent for your needs. Create job
              listings and grow your team by connecting with qualified
              candidates.
            </p>
          </div>
        </div>

        <div className="flex flex-col w-full gap-4 md:p-4 p-0 md:justify-center justify-start md:items-center items-start">
          <h3 className="text-slate-900 font-bold text-2xl md:text-center text-start md:mt-0 mt-4">
            Select Your Role
          </h3>

          {message && (
            <div
              className={`p-2 rounded ${
                message.includes("updated")
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {message}
            </div>
          )}

          {loading ? (
            <Loader />
          ) : (
            <div className="flex flex-col gap-4 w-full max-w-sm">
              <button
                onClick={() => handleRoleSelection("User")}
                disabled={loading} // Disable button while loading
                className={`flex items-center p-3 rounded-xl ${
                  loading ? "bg-gray-400" : "bg-orange-600 hover:bg-orange-500"
                } transition-all duration-300 text-white justify-center`}
              >
                <Briefcase className="mr-2" /> {/* Icon for Find a Job */}
                Find a Job
              </button>
              <button
                onClick={() => handleRoleSelection("Creator")}
                disabled={loading} // Disable button while loading
                className={`flex items-center p-3 rounded-xl ${
                  loading ? "bg-gray-400" : "bg-gray-600 hover:bg-gray-500"
                } transition-all duration-300 text-white justify-center`}
              >
                <PlusCircle className="mr-2" /> {/* Icon for Create a Job */}
                Create a Job
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Role;
