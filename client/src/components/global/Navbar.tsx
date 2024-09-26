import { Link } from "react-router-dom";

const Navbar = () => {
  const links = [
    { name: "Jobs", path: "/jobs" },
    { name: "Companies", path: "/companies" },
    { name: "Get Started", path: "/login" },
  ];

  return (
    <nav className="py-2 px-8 border-b border-slate-400 flex justify-between items-center w-full sticky top-0 z-index backdrop-blur-lg">
      <Link className="font-bold text-3xl text-slate-900" to="/">
        CPS<span className="font-bold text-5xl text-red-600">.</span>
      </Link>

      <div className="flex gap-4 items-center text-slate-900">
        {links.map((link, index) => (
          <Link key={index} to={link.path}>
            {link.name}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
