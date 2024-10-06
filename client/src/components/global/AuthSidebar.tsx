import { Link } from "react-router-dom";

const Sidebar = () => {
  const links = [
    { name: "Dashboard", path: "/user/dashboard" },
    { name: "Jobs", path: "/user/jobs" },
    { name: "Applications", path: "/user/applications" },
    { name: "Profile", path: "/user/profile" },
  ];

  return (
    <div className="text-slate-900 md:flex hidden w-40 p-6 shadow-md border-r min-h-screen">
      <ul className="space-y-3">
        {links.map((item, index) => (
          <Link
            to={item.path}
            key={index}
            className={`flex items-center space-x-2 cursor-pointer hover:bg-gray-300
             px-2 py-2 rounded-lg transition duration-200`}
          >
            <span className="text-sm font-medium">{item.name}</span>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
