import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userDetailsAtom } from "../../recoil/atoms";
import axios from "axios";
import { Application } from "../../types/interface";

const UserJobs = () => {
  const user = useRecoilValue(userDetailsAtom);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        const response = await axios.get<Application[]>(
          `http://localhost:1738/api/application/user/${user.id}`
        );
        setApplications(response.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (user && user.id) {
      fetchApplications();
    }
  }, [user]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="px-8 py-6">
      <h2 className="text-2xl font-semibold mb-4">My Applications</h2>
      <table className="min-w-full border-collapse border border-slate-400">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-slate-400 px-4 py-2 text-start">
              Job Title
            </th>
            <th className="border border-slate-400 px-4 py-2 text-start">
              Company
            </th>
            <th className="border border-slate-400 px-4 py-2 text-start">
              Status
            </th>
            <th className="border border-slate-400 px-4 py-2 text-start">
              Date Applied
            </th>
          </tr>
        </thead>
        <tbody>
          {applications.length > 0 ? (
            applications.map((application) => (
              <tr key={application.id}>
                <td className="border border-slate-400 px-4 py-2">
                  {application.Job?.title}
                </td>
                <td className="border border-slate-400 px-4 py-2">
                  {application.Job?.Company?.name}
                </td>
                <td className="border border-slate-400 px-4 py-2">
                  {application.status}
                </td>
                <td className="border border-slate-400 px-4 py-2">
                  {new Date(application.appliedAt).toLocaleDateString()}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="border border-slate-400 px-4 py-2" colSpan={4}>
                No applications found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserJobs;
