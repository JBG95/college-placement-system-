import { useState } from "react";
import Jobscomponent from "../jobs/Jobscomponent";
import Skillscomponent from "../skills/Skillscomponent";
import Applicationscomponent from "../applications/Applicationscomponent";
import CompaniesComponent from "../companies/CompaniesComponent";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState<string>("jobs");

  return (
    <div className="flex flex-col gap-4 px-8 py-6">
      {/* Buttons for selecting sections */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveSection("jobs")}
          className={`px-4 py-2 ${
            activeSection === "jobs" ? "bg-slate-800" : "bg-gray-500"
          } text-white rounded-md`}
        >
          Jobs
        </button>
        <button
          onClick={() => setActiveSection("companies")}
          className={`px-4 py-2 ${
            activeSection === "companies" ? "bg-slate-800" : "bg-gray-500"
          } text-white rounded-md`}
        >
          Companies
        </button>
        <button
          onClick={() => setActiveSection("applications")}
          className={`px-4 py-2 ${
            activeSection === "applications" ? "bg-slate-800" : "bg-gray-500"
          } text-white rounded-md`}
        >
          Applications
        </button>
        <button
          onClick={() => setActiveSection("skills")}
          className={`px-4 py-2 ${
            activeSection === "skills" ? "bg-slate-800" : "bg-gray-500"
          } text-white rounded-md`}
        >
          Skills
        </button>
      </div>

      {/* Render the selected section */}
      <div>
        {activeSection === "jobs" && <Jobscomponent />}
        {activeSection === "companies" && <CompaniesComponent />}
        {activeSection === "applications" && <Applicationscomponent />}
        {activeSection === "skills" && <Skillscomponent />}
      </div>
    </div>
  );
};

export default Dashboard;
