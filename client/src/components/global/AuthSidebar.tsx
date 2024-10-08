import { Link, useLocation } from "react-router-dom";
import { Home, Building, Briefcase, ClipboardList, User } from "lucide-react";

const Sidebar = () => {
  const location = useLocation();

  const links = [
    { name: "Dashboard", path: "/dashboard", icon: <Home /> },
    { name: "Company", path: "/user/companies", icon: <Building /> },
    { name: "Jobs", path: "/user/jobs", icon: <Briefcase /> },
    {
      name: "Applications",
      path: "/user/applications",
      icon: <ClipboardList />,
    },
    { name: "Profile", path: "/user/profile", icon: <User /> },
  ];

  return (
    <div className="text-slate-900 md:flex hidden w-40 p-6 shadow-md border-r min-h-screen">
      <ul className="space-y-3">
        {links.map((item, index) => (
          <Link
            to={item.path}
            key={index}
            className={`flex items-center space-x-2 px-2 py-2 rounded-lg transition duration-200 
              ${
                location.pathname === item.path
                  ? "bg-slate-800 text-white"
                  : "hover:bg-gray-300 text-slate-900"
              }`}
          >
            <span>{item.icon}</span>
            <span className="text-sm font-medium">{item.name}</span>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
