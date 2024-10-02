import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ENDPOINT, LOGIN } from "../../constants/config";
import { userDetailsAtom } from "../../recoil/atoms";
import { useSetRecoilState } from "recoil";
import Loader from "../global/Loader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const setUserState = useSetRecoilState(userDetailsAtom);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(`${ENDPOINT}${LOGIN}`, {
        email,
        password,
      });

      console.log(response);

      console.log("this is user", response.data);
      setUserState(response.data);
      navigate("/");
    } catch (err) {
      setError("Login failed. Please check your credentials and try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />; // Display the Loader when loading
  }

  return (
    <section className="py-6 md:px-48 p-4 min-h-screen w-full flex items-center">
      <div className="w-full md:gap-4 gap-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 shadow p-4 rounded-xl">
        {/* Left side content */}
        <div className="flex flex-col justify-center md:p-4 p-0">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">
            Welcome to CPS
            <span className="text-orange-600 font-semibold text-4xl">
              .
            </span>{" "}
            Job Site
          </h2>
          <p className="text-slate-700 mb-2">
            Discover job listings, create your professional profile, and gain
            access to the best opportunities in the market. Sign in to get
            started or create a new account to join our network.
          </p>
        </div>

        <div className="flex flex-col w-full gap-4 md:p-4 p-0">
          <p className="text-slate-900 font-semibold text-3xl md:text-center text-start">
            Sign In Please
            <span className="text-orange-600 font-semibold text-4xl">.</span>
          </p>

          {error && (
            <div className="bg-red-100 text-red-600 p-2 rounded">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
            <div className="w-full flex flex-col gap-2">
              <label htmlFor="email" className="text-slate-800">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="example@dice.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full p-3 rounded-xl border border-slate-500 text-slate-800 outline-none placeholder-gray-400"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-600">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    height="1.3em"
                    width="1.3em"
                  >
                    <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6m-2 0l-8 5-8-5h16m0 12H4V8l8 5 8-5v10z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="relative">
              <label htmlFor="password" className="text-slate-800">
                Password
              </label>
              <input
                className="w-full p-3 mt-2 rounded-xl border border-slate-500 text-slate-800 outline-none placeholder-gray-400"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                id="password"
                name="password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-2 mt-8 flex items-center text-slate-600"
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19.5C7.5 19.5 3.75 16.5 1.875 12 3.75 7.5 7.5 4.5 12 4.5c1.8 0 3.525.375 5.075 1.05m-1.2 2.175a6 6 0 11-8.4 8.4M12 8.25a3.75 3.75 0 00-2.625 6.375"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>

            <Link to="/" className="text-slate-800 hover:text-slate-700">
              Forgot Password?
            </Link>
            <button
              type="submit"
              className="p-3 rounded-xl bg-orange-600 hover:bg-orange-500 transition-all duration-300 text-white"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
            <p className="mt-2 text-center text-slate-800">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-slate-800 hover:text-slate-700"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
