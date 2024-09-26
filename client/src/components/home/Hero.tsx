import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="py-10 px-8 w-full flex flex-col min-h-screen justify-center items-center text-center">
      <p className="text-[65px] font-extrabold text-slate-900 leading-tight">
        The best free Job Site
        <br /> for your career
        <span className="text-[65px] font-extrabold text-orange-700">.</span>
      </p>
      <p className="text-lg max-w-xl mt-4 text-slate-800">
        We help you find the best job and internship to build your career in the
        digital era.
      </p>
      <div className="mt-6 gap-6 flex">
        <Link
          to="/"
          className="p-3 rounded-full border-2 border-slate-900 hover:shadow-md hover:shadow-slate-900 transition-all duration-300 text-slate-900 text-lg"
        >
          Get Started
        </Link>
        <Link
          to="/"
          className="p-3 text-slate-900 hover:text-slate-800 text-lg flex items-center"
        >
          Learn More
          <ArrowRight className="ml-2" />
        </Link>
      </div>
    </section>
  );
};

export default Hero;
