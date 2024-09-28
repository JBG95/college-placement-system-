import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import zesco from "../../assets/zesco-removebg-preview.png";
import dice from "../../assets/Mask_group-removebg-preview.png";
import mtn from "../../assets/mtn-removebg-preview.png";
import airtel from "../../assets/airtel-removebg-preview.png";
import zamtel from "../../assets/zamtel-removebg-preview.png";
import fqm from "../../assets/fqm-removebg-preview.png";
import shoprite from "../../assets/shoprite.png";
import stanchart from "../../assets/stanchart-removebg-preview.png";

const jobs = [
  {
    id: 1,
    company: "DiCE Labs",
    location: "9 Miles, Lusaka",
    title: "UI/UX Designer",
    type: "Full Time",
    workType: "Onsite",
    salary: "k2000",
    image: dice,
  },
  {
    id: 2,
    company: "Airtel Zambia",
    location: "Cairo Road, Lusaka",
    title: "Software Engineer",
    type: "Full Time",
    workType: "Remote",
    salary: "k2500",
    image: airtel,
  },
  {
    id: 3,
    company: "MTN Zambia",
    location: "Levy Business Park, Lusaka",
    title: "Product Manager",
    type: "Full Time",
    workType: "Onsite",
    salary: "k3000",
    image: mtn,
  },
  {
    id: 4,
    company: "Zamtel",
    location: "Kamwala, Lusaka",
    title: "Network Administrator",
    type: "Full Time",
    workType: "Onsite",
    salary: "k2200",
    image: zamtel,
  },
  {
    id: 5,
    company: "ZESCO",
    location: "Kitwe, Copperbelt",
    title: "Electrical Engineer",
    type: "Full Time",
    workType: "Onsite",
    salary: "k3500",
    image: zesco,
  },
  {
    id: 6,
    company: "First Quantum Minerals",
    location: "Solwezi, North-Western",
    title: "Mining Engineer",
    type: "Full Time",
    workType: "Onsite",
    salary: "k4500",
    image: fqm,
  },
  {
    id: 7,
    company: "Shoprite Zambia",
    location: "Woodlands, Lusaka",
    title: "Store Manager",
    type: "Full Time",
    workType: "Onsite",
    salary: "k1800",
    image: shoprite,
  },
  {
    id: 8,
    company: "Standard Chartered Bank",
    location: "Manda Hill, Lusaka",
    title: "Financial Analyst",
    type: "Full Time",
    workType: "Remote",
    salary: "k4000",
    image: stanchart,
  },
];

const Jobs = () => {
  return (
    <section className="py-8 px-8 w-full min-h-screen flex flex-col">
      <p className="text-slate-900 text-[65px] font-extrabold text-center">
        Choose From Available <br />
        Jobs Listings
      </p>
      <div className="justify-between w-full flex">
        <p className="text-slate-800 text-lg">
          Find a job that suits you and apply
        </p>
        <div className="flex gap-4">
          <button className="py-2 px-3 text-center bg-slate-800 shadow text-white rounded-full">
            Recent
          </button>
          <button className="py-2 px-3 text-center bg-slate-100 text-slate-800 shadow rounded-full">
            Popular
          </button>
        </div>
      </div>

      <div className="w-full grid lg:grid-cols-4 md:grid-cols-4 grid-cols-1 gap-4 mt-4">
        {jobs.map((job) => (
          <div key={job.id} className="p-4 shadow shadow-slate-600 rounded-xl">
            <div className="w-full flex gap-3 items-center">
              <img
                src={job.image}
                alt={job.company}
                loading="lazy"
                className="h-14 w-14 rounded-full shadow shadow-slate-400"
              />
              <div className="flex flex-col">
                <p className="font-bold text-slate-900">{job.company}</p>
                <div className="flex items-center text-sm text-slate-700">
                  <MapPin className="text-orange-500 mr-1" /> {job.location}
                </div>
              </div>
            </div>
            <div className="bg-slate-400 h-[1px] w-full flex mt-4"></div>
            <div className="mt-4 flex flex-col">
              <p className="text-slate-900 text-lg font-bold">{job.title}</p>
              <div className="w-full gap-4 flex text-sm mt-2 text-slate-700">
                <p className="before:content-['•'] before:text-orange-500 before:mr-1">
                  {job.type}
                </p>
                <p className="before:content-['•'] before:text-orange-500 before:mr-1">
                  {job.workType}
                </p>
              </div>
            </div>
            <div className="mt-4 flex justify-between item-center">
              <p className="text-slate-700 font-bold text-md">
                {job.salary}
                <span className="text-slate-700 text-sm font-normal">
                  /month
                </span>
              </p>
              <Link
                to="/apply"
                className="py-2 px-4 bg-slate-700 hover:bg-slate-800 transition-all duration-300 text-white rounded-full"
              >
                Apply Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Jobs;
