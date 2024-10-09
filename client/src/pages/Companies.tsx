import { useState, useEffect } from "react";
import axios from "axios";
import { Company } from "../types/interface";
import { MapPin, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import Loader from "../components/global/Loader";

const CompaniesList = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchCompanies = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const response = await axios.get(
          "http://localhost:1738/api/company/all"
        );
        setCompanies(response.data);
        setFilteredCompanies(response.data);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  useEffect(() => {
    const results = companies.filter((company) =>
      company.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCompanies(results);
  }, [searchTerm, companies]);

  return (
    <div className="container mx-auto p-4 w-full min-h-screen pt-24">
      <h1 className="text-2xl font-bold mb-4">Companies</h1>

      <div className="mb-6 w-full flex justify-between">
        <input
          type="text"
          placeholder="Search companies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 w-72"
        />
        <button className="text-white bg-slate-800 rounded-lg py-2 px-2">
          View All
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center">
          <Loader />
        </div>
      ) : isError ? (
        <p className="text-center text-red-500">Error fetching companies</p>
      ) : filteredCompanies.length === 0 ? (
        <p className="text-center text-gray-500">No companies found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCompanies.map((company: Company) => (
            <div
              key={company.id}
              className="p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center mb-4">
                <img
                  src={company.avatar}
                  alt={company.name}
                  className="w-16 h-16 rounded-full mr-4 border shadow shadow-slate-500"
                />
                <h2 className="text-xl font-semibold">{company.name}</h2>
              </div>
              <p className="text-sm flex items-center text-gray-600 gap-1">
                <MapPin className="text-orange-500 mr-1" /> {company.address}
              </p>
              <div className="bg-slate-400 h-[1px] w-full mt-2 mb-2"></div>
              <p className="text-gray-700 mb-4">
                {company.description.length > 100
                  ? company.description.substring(0, 100) + "..."
                  : company.description}
              </p>
              <div className="bg-slate-400 h-[1px] w-full mt-2 mb-2"></div>
              <p className="text-sm flex items-center text-gray-600 gap-1">
                <Mail className="text-orange-500 mr-1" /> {company.email}
              </p>
              <p className="text-sm flex items-center text-gray-600 gap-1 mt-2">
                <Phone className="text-orange-500 mr-1" /> {company.phone}
              </p>
              <Link to={`/company/${company.id}`} className="mt-4 block">
                <button className="rounded text-center w-full flex justify-center text-gray-100 bg-slate-800 hover:bg-slate-700 p-2">
                  View Company
                </button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompaniesList;
