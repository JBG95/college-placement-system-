import { ClipboardList, Star, User, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";

const MyDashboard = () => {
  const applicationCount = 5;
  const skillsCount = 10;
  const profileCount = 1;
  const offerCount = 6;

  return (
    <div className="flex flex-col gap-6 px-8 py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Applications */}
        <Link
          to="/seeker/applications"
          className="p-4 flex flex-col items-center bg-white rounded-lg shadow-md cursor-pointer border-2 border-slate-800 hover:bg-slate-100 transition"
        >
          <ClipboardList size={32} className="mb-4 text-slate-800" />
          <h3 className="text-lg font-semibold">Applications</h3>
          <p className="text-3xl font-bold">{applicationCount}</p>
        </Link>

        {/* Skills */}
        <Link
          to="/seeker/skills"
          className="p-4 flex flex-col items-center bg-white rounded-lg shadow-md cursor-pointer border-2 border-slate-800 hover:bg-slate-100 transition"
        >
          <Star size={32} className="mb-4 text-slate-800" />
          <h3 className="text-lg font-semibold">Skills</h3>
          <p className="text-3xl font-bold">{skillsCount}</p>
        </Link>

        {/* Offers */}
        <Link
          to="/seeker/offers"
          className="p-4 flex flex-col items-center bg-white rounded-lg shadow-md cursor-pointer border-2 border-slate-800 hover:bg-slate-100 transition"
        >
          <DollarSign size={32} className="mb-4 text-slate-800" />
          <h3 className="text-lg font-semibold">Offers</h3>
          <p className="text-3xl font-bold">{offerCount}</p>
        </Link>

        {/* Profile */}
        <Link
          to="/seeker/profile"
          className="p-4 flex flex-col items-center bg-white rounded-lg shadow-md cursor-pointer border-2 border-slate-800 hover:bg-slate-100 transition"
        >
          <User size={32} className="mb-4 text-slate-800" />
          <h3 className="text-lg font-semibold">Profile</h3>
          <p className="text-3xl font-bold">{profileCount}</p>
        </Link>
      </div>
    </div>
  );
};

export default MyDashboard;
