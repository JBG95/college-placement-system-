import {
  Briefcase,
  Building,
  ClipboardList,
  Star,
  User,
  FileText,
  DollarSign,
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const jobCount = 12;
  const companyCount = 8;
  const applicationCount = 5;
  const skillsCount = 10;
  const profileCount = 1;
  const freelanceCount = 4;
  const projectCount = 3;
  const offerCount = 6;

  return (
    <div className="flex flex-col gap-6 px-8 py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link
          to="/user/companies"
          className="p-4 flex flex-col items-center bg-white rounded-lg shadow-md cursor-pointer border-2 border-slate-800 hover:bg-slate-100 transition"
        >
          <Building size={32} className="mb-4 text-slate-800" />
          <h3 className="text-lg font-semibold">Companies</h3>
          <p className="text-3xl font-bold">{companyCount}</p>
        </Link>
        <Link
          to="/user/jobs"
          className="p-4 flex flex-col items-center bg-white rounded-lg shadow-md cursor-pointer border-2 border-slate-800 hover:bg-slate-100 transition"
        >
          <Briefcase size={32} className="mb-4 text-slate-800" />
          <h3 className="text-lg font-semibold">Jobs</h3>
          <p className="text-3xl font-bold">{jobCount}</p>
        </Link>
        <Link
          to="/applications"
          className="p-4 flex flex-col items-center bg-white rounded-lg shadow-md cursor-pointer border-2 border-slate-800 hover:bg-slate-100 transition"
        >
          <ClipboardList size={32} className="mb-4 text-slate-800" />
          <h3 className="text-lg font-semibold">Applications</h3>
          <p className="text-3xl font-bold">{applicationCount}</p>
        </Link>
        <Link
          to="/skills"
          className="p-4 flex flex-col items-center bg-white rounded-lg shadow-md cursor-pointer border-2 border-slate-800 hover:bg-slate-100 transition"
        >
          <Star size={32} className="mb-4 text-slate-800" />
          <h3 className="text-lg font-semibold">Skills</h3>
          <p className="text-3xl font-bold">{skillsCount}</p>
        </Link>
        <Link
          to="/profile"
          className="p-4 flex flex-col items-center bg-white rounded-lg shadow-md cursor-pointer border-2 border-slate-800 hover:bg-slate-100 transition"
        >
          <User size={32} className="mb-4 text-slate-800" />
          <h3 className="text-lg font-semibold">Profile</h3>
          <p className="text-3xl font-bold">{profileCount}</p>
        </Link>
        <Link
          to="/freelance"
          className="p-4 flex flex-col items-center bg-white rounded-lg shadow-md cursor-pointer border-2 border-slate-800 hover:bg-slate-100 transition"
        >
          <FileText size={32} className="mb-4 text-slate-800" />
          <h3 className="text-lg font-semibold">Freelance</h3>
          <p className="text-3xl font-bold">{freelanceCount}</p>
        </Link>
        <Link
          to="/projects"
          className="p-4 flex flex-col items-center bg-white rounded-lg shadow-md cursor-pointer border-2 border-slate-800 hover:bg-slate-100 transition"
        >
          <Briefcase size={32} className="mb-4 text-slate-800" />
          <h3 className="text-lg font-semibold">Projects</h3>
          <p className="text-3xl font-bold">{projectCount}</p>
        </Link>
        <Link
          to="/offers"
          className="p-4 flex flex-col items-center bg-white rounded-lg shadow-md cursor-pointer border-2 border-slate-800 hover:bg-slate-100 transition"
        >
          <DollarSign size={32} className="mb-4 text-slate-800" />
          <h3 className="text-lg font-semibold">Offers</h3>
          <p className="text-3xl font-bold">{offerCount}</p>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
