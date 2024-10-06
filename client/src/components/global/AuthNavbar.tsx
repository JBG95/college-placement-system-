import { User, Bell } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userDetailsAtom, isAuthenticatedAtom } from "../../recoil/atoms";

const Navbar = () => {
  const user = useRecoilValue(userDetailsAtom);
  const setAuthState = useSetRecoilState(isAuthenticatedAtom);
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuthState(false);
    localStorage.removeItem("userDetailsAtom");
    navigate("/login");
  };

  return (
    <nav className="py-4 px-8 bg-white shadow-md flex justify-between items-center w-full">
      <Link className="font-bold text-3xl text-slate-900" to="/">
        CPS<span className="font-bold text-5xl text-red-600">.</span>
      </Link>

      <div className="flex items-center gap-6">
        {/* Notification Icon */}
        <Bell className="h-6 w-6 text-slate-900 cursor-pointer" />
        {/* User Details */}
        <div className="flex items-center gap-2">
          <User className="h-6 w-6 text-slate-900" />
          <span className="text-slate-900 font-semibold">
            {user?.username || "User"}
          </span>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-500 text-white transition-all"
        >
          Log Out
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
