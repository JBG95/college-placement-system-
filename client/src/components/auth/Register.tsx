import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ENDPOINT, REGISTER } from "../../constants/config";
import { useSetRecoilState } from "recoil";
import { userDetailsAtom } from "../../recoil/atoms";
import Loader from "../global/Loader";

const Register = () => {
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState(""); // New phone state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const setUserState = useSetRecoilState(userDetailsAtom);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(`${ENDPOINT}${REGISTER}`, {
        username,
        fullname,
        email,
        password,
        phone, // Include phone in the request
      });

      console.log("User registered", response.data);
      setUserState(response.data);
      navigate("/");
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="py-6 md:px-48 p-4 min-h-screen w-full flex items-center">
      <div className="w-full md:gap-4 gap-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 shadow p-4 rounded-xl">
        {/* Left side content */}
        <div className="flex flex-col justify-center md:p-4 p-0">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">
            Join CPS
            <span className="text-orange-600 font-semibold text-4xl">
              .
            </span>{" "}
            Job Site
          </h2>
          <p className="text-slate-700 mb-2">
            Create your profile, discover opportunities, and start your job hunt
            with CPS.
          </p>
        </div>

        {/* Right side content - Registration Form */}
        <div className="flex flex-col w-full gap-4 md:p-4 p-0">
          <p className="text-slate-900 font-semibold text-3xl md:text-center text-start">
            Create an Account
            <span className="text-orange-600 font-semibold text-4xl">.</span>
          </p>

          {error && (
            <div className="bg-red-100 text-red-600 p-2 rounded">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
            {/* Username Input */}
            <div className="w-full flex gap-2">
              <div className="w-full flex flex-col gap-2">
                <label htmlFor="username" className="text-slate-800">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full p-3 rounded-xl border border-slate-500 text-slate-800 outline-none placeholder-gray-400"
                />
              </div>
              <div className="w-full flex flex-col gap-2">
                <label htmlFor="fullname" className="text-slate-800">
                  Fullname
                </label>
                <input
                  type="text"
                  placeholder="Enter your fullname"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  required
                  className="w-full p-3 rounded-xl border border-slate-500 text-slate-800 outline-none placeholder-gray-400"
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="w-full flex flex-col gap-2">
              <label htmlFor="email" className="text-slate-800">
                Email
              </label>
              <input
                type="email"
                placeholder="example@dice.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-3 rounded-xl border border-slate-500 text-slate-800 outline-none placeholder-gray-400"
              />
            </div>

            {/* Phone Input */}
            <div className="w-full flex flex-col gap-2">
              <label htmlFor="phone" className="text-slate-800">
                Phone
              </label>
              <input
                type="tel"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full p-3 rounded-xl border border-slate-500 text-slate-800 outline-none placeholder-gray-400"
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <label htmlFor="password" className="text-slate-800">
                Password
              </label>
              <input
                className="w-full p-3 mt-2 rounded-xl border border-slate-500 text-slate-800 outline-none placeholder-gray-400"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                id="password"
                required
              />
            </div>

            <button
              type="submit"
              className="p-3 rounded-xl bg-orange-600 hover:bg-orange-500 transition-all duration-300 text-white"
              disabled={loading}
            >
              {loading ? "Registering..." : "Sign Up"}
            </button>

            <p className="mt-2 text-center text-slate-800">
              Already have an account?{" "}
              <Link to="/login" className="text-slate-800 hover:text-slate-700">
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
