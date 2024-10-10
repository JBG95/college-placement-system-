import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import axios from "axios";
import { userDetailsAtom } from "../../recoil/atoms";
import { Application } from "../../types/interface";
import { Loader } from "lucide-react";

const fetchApplications = async (userId: string) => {
  try {
    const response = await axios.get(
      `http://localhost:1738/api/application/applications/user/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching applications:", error);
    return [];
  }
};

const updateApplicationStatus = async (
  applicationId: string,
  status: string
) => {
  try {
    const response = await axios.put(
      `http://localhost:1738/api/application/update/${applicationId}`,
      { status }
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating application ${applicationId}:`, error);
    throw error;
  }
};

const ApplicationList = () => {
  const userDetails = useRecoilValue(userDetailsAtom);
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  useEffect(() => {
    const loadApplications = async () => {
      if (userDetails && userDetails.id) {
        setIsLoading(true);
        setIsError(false);
        try {
          const data = await fetchApplications(userDetails.id);
          setApplications(data);
        } catch (error) {
          setIsError(true);
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadApplications();
  }, [userDetails]);

  // Filter applications based on the selected status
  const filteredApplications = applications.filter((app) => {
    if (statusFilter === "All") return true;
    return app.status === statusFilter;
  });

  // Handle approve and decline actions
  const handleApprove = async (applicationId: string) => {
    try {
      setIsUpdating(applicationId); // Show loader for the specific application
      await updateApplicationStatus(applicationId, "Approved");
      setApplications((prevApps) =>
        prevApps.map((app) =>
          app.id === applicationId ? { ...app, status: "Approved" } : app
        )
      );
      console.log("Application approved:", applicationId);
    } catch (error) {
      console.error("Failed to approve application:", applicationId);
    } finally {
      setIsUpdating(null);
    }
  };

  const handleDecline = async (applicationId: string) => {
    try {
      setIsUpdating(applicationId); // Show loader for the specific application
      await updateApplicationStatus(applicationId, "Declined");
      setApplications((prevApps) =>
        prevApps.map((app) =>
          app.id === applicationId ? { ...app, status: "Declined" } : app
        )
      );
      console.log("Application declined:", applicationId);
    } catch (error) {
      console.error("Failed to decline application:", applicationId);
    } finally {
      setIsUpdating(null);
    }
  };

  return (
    <div>
      <div className="mb-4">
        <label htmlFor="status-filter" className="mr-2">
          Filter by Status:
        </label>
        <select
          id="status-filter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-300 rounded p-1"
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Declined">Declined</option>
        </select>
      </div>

      {isLoading ? (
        <div className="text-center">
          <Loader />
        </div>
      ) : isError ? (
        <div className="text-center text-red-500">
          Error fetching applications
        </div>
      ) : filteredApplications.length > 0 ? (
        <table className="application-table w-full border-collapse text-sm border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-2 py-2">Full Name</th>
              <th className="border border-gray-300 px-2 py-2">Email</th>
              <th className="border border-gray-300 px-2 py-2">Phone</th>
              <th className="border border-gray-300 px-2 py-2">Status</th>
              <th className="border border-gray-300 px-2 py-2">Experience</th>
              <th className="border border-gray-300 px-2 py-2">Education</th>
              <th className="border border-gray-300 px-2 py-2">Applied At</th>
              <th className="border border-gray-300 px-2 py-2">Cover Letter</th>
              <th className="border border-gray-300 px-2 py-2">Resume</th>
              <th className="border border-gray-300 px-2 py-2">Job Title</th>
              <th className="border border-gray-300 px-2 py-2">Company</th>
              <th className="border border-gray-300 px-2 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredApplications.map((app: Application) => (
              <tr key={app.id} className="application-row text-sm">
                <td className="border border-gray-300 px-2 py-2">
                  {app.fullname}
                </td>
                <td className="border border-gray-300 px-2 py-2">
                  {app.email}
                </td>
                <td className="border border-gray-300 px-2 py-2">
                  {app.phone}
                </td>
                <td className="border border-gray-300 px-2 py-2">
                  {app.status}
                </td>
                <td className="border border-gray-300 px-2 py-2">
                  {app.experience}
                </td>
                <td className="border border-gray-300 px-2 py-2">
                  {app.education}
                </td>
                <td className="border border-gray-300 px-2 py-2">
                  {new Date(app.appliedAt).toLocaleString()}
                </td>
                <td className="border border-gray-300 px-2 py-2">
                  <a
                    href={app.coverLetter}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View
                  </a>
                </td>
                <td className="border border-gray-300 px-2 py-2">
                  <a
                    href={app.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View
                  </a>
                </td>
                <td className="border border-gray-300 px-2 py-2">
                  {app.Job.title}
                </td>
                <td className="border border-gray-300 px-2 py-2">
                  {app.Job.Company.name}
                </td>
                <td className="border border-gray-300 px-2 py-2">
                  {app.status === "Pending" ? (
                    <div>
                      {isUpdating === app.id ? (
                        <p>Updating....</p>
                      ) : (
                        <>
                          <button
                            onClick={() => handleApprove(app.id)}
                            className="bg-green-500 w-full text-white px-2 py-1 rounded mr-1"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleDecline(app.id)}
                            className="bg-red-500 w-full mt-2 text-white px-2 py-1 rounded"
                          >
                            Decline
                          </button>
                        </>
                      )}
                    </div>
                  ) : (
                    <span>Settled</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center">No applications found.</div>
      )}
    </div>
  );
};

export default ApplicationList;
