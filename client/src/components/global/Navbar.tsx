import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isAuthenticatedAtom, userDetailsAtom } from "../../recoil/atoms";
import { User } from "lucide-react";

const Navbar = () => {
  const user = useRecoilValue(userDetailsAtom);
  const isAuthenticated = useRecoilValue(isAuthenticatedAtom);
  const setAuthState = useSetRecoilState(isAuthenticatedAtom);
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuthState(false);
    localStorage.removeItem("userDetailsAtom");
    navigate("/login");
  };

  const links = [
    { name: "Jobs", path: "/jobs" },
    { name: "Companies", path: "/companies" },
  ];

  return (
    <nav className="py-2 px-8 border-b border-slate-400 flex justify-between items-center w-full sticky top-0 z-index backdrop-blur-lg">
      {/* Logo */}
      <Link className="font-bold text-3xl text-slate-900" to="/">
        CPS<span className="font-bold text-5xl text-red-600">.</span>
      </Link>

      <div className="flex gap-4 items-center text-slate-900">
        {/* Links */}
        {links.map((link, index) => (
          <Link key={index} to={link.path}>
            {link.name}
          </Link>
        ))}

        {isAuthenticated ? (
          <div className="flex items-center gap-2">
            {/* User icon and username */}
            <Link to="/dashboard" className="flex items-center gap-2">
              <User className="h-6 w-6 text-slate-900" />
              <span className="text-slate-900 font-semibold">
                {user?.username || "User"}
              </span>
            </Link>

            {/* Log Out button */}
            <button
              onClick={handleLogout}
              className="p-2 rounded-md bg-red-600 hover:bg-red-500 text-white transition-all"
            >
              Log Out
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="p-2 rounded-md bg-orange-600 hover:bg-orange-500 text-white transition-all"
          >
            Get Started
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
