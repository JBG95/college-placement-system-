import { UserCheck, Briefcase, Headset, Search } from "lucide-react";

const WhyUs = () => {
  return (
    <section className="w-full py-6 px-8 flex flex-col min-h-screen justify-center items-center bg-slate-100">
      <p className="text-[65px] font-extrabold text-slate-900 text-center">
        Finding a job has never
        <br />
        been easier
        <span className="text-[65px] font-extrabold text-orange-600">.</span>
      </p>

      <div className="flex w-full max-w-6xl gap-10 justify-center mt-8">
        <div className="flex flex-col items-center text-center">
          <UserCheck className="text-orange-600 h-16 w-16 mb-4" />
          <p className="text-xl font-semibold text-slate-900">Easy Applying</p>
          <p className="mt-2 text-slate-600">
            Apply for jobs in just a few clicks. Our platform simplifies the
            application process, allowing you to submit your resume and cover
            letter with ease.
          </p>
        </div>

        <div className="flex flex-col items-center text-center">
          <Briefcase className="text-orange-600 h-16 w-16 mb-4" />
          <p className="text-xl font-semibold text-slate-900">Many Vacancies</p>
          <p className="mt-2 text-slate-600">
            Explore a wide range of job opportunities across various industries.
            We connect you with the best employers looking for talented
            candidates like you.
          </p>
        </div>

        <div className="flex flex-col items-center text-center">
          <Headset className="text-orange-600 h-16 w-16 mb-4" />
          <p className="text-xl font-semibold text-slate-900">Best Support</p>
          <p className="mt-2 text-slate-600">
            Our team is here to help you every step of the way. Whether you need
            guidance on your job search or technical support, we've got you
            covered.
          </p>
        </div>
      </div>

      <div className="flex flex-col mt-12">
        <p className="text-xl text-center font-semibold text-slate-800 mb-4">
          Looking for a job now?
        </p>
        <div className="flex items-center border border-slate-800 shadow shadow-slate-900 rounded-full p-2 space-x-4">
          <select
            name="category"
            id="category"
            className="p-3 rounded-full border border-slate-300 text-slate-700 focus:outline-none"
          >
            <option value="">Select Category</option>
            <option value="frontend">Frontend Developer</option>
            <option value="backend">Backend Developer</option>
            <option value="fullstack">Full Stack Developer</option>
            <option value="devops">DevOps Engineer</option>
            <option value="data">Data Scientist</option>
          </select>

          <select
            name="location"
            id="location"
            className="p-3 rounded-full border border-slate-300 text-slate-700 focus:outline-none"
          >
            <option value="">Select Location</option>
            <option value="lusaka">Lusaka</option>
            <option value="ndola">Ndola</option>
            <option value="kitwe">Kitwe</option>
            <option value="livingstone">Livingstone</option>
            <option value="choma">Choma</option>
          </select>

          <button className="p-3 bg-slate-900 text-white rounded-full flex items-center gap-2">
            <Search className="h-5 w-5" /> Search
          </button>
        </div>
        <div className="flex flex-col gap-6">
          <p>Popular categories</p>
          <div className="w-full flex"></div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
