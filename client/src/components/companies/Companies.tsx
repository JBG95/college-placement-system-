import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import axios from "axios";
import { userDetailsAtom } from "../../recoil/atoms";
import { GETUSERCOMPANIES } from "../../constants/config";
import { Company } from "../../types/interface";
import { Mail, MapPin, Phone } from "lucide-react";

const Companies = () => {
  const navigate = useNavigate();
  const userDetails = useRecoilValue(userDetailsAtom);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const userId = userDetails?.id;

  // Fetch companies for the user
  useEffect(() => {
    const fetchCompanies = async () => {
      if (!userId) return;
      setIsLoading(true);
      setIsError(false);
      try {
        const response = await axios.get(`${GETUSERCOMPANIES}/${userId}`);
        setCompanies(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompanies();
  }, [userId]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  const handleCreateCompany = () => {
    navigate("/user/companies/create");
  };

  // Filtered companies based on search term and filter
  const filteredCompanies = companies.filter((company: any) => {
    const matchesSearch = company.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    // User's companies filter logic
    const matchesFilter =
      filter === "all" || (filter === "user" && company.userId === userId);

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Search Companies..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 w-64"
          />
          <div className="flex space-x-2">
            <button
              className={`px-4 py-2 rounded-md ${
                filter === "all" ? "bg-gray-500 text-white" : "bg-gray-100"
              }`}
              onClick={() => handleFilterChange("all")}
            >
              All
            </button>
            <button
              className={`px-4 py-2 rounded-md ${
                filter === "user" ? "bg-gray-500 text-white" : "bg-gray-100"
              }`}
              onClick={() => handleFilterChange("user")}
            >
              User's Companies
            </button>
          </div>
        </div>
        <button
          onClick={handleCreateCompany}
          className="px-4 py-2 bg-slate-800 text-white rounded-md hover:bg-slate-700"
        >
          Create Company
        </button>
      </div>

      <div>
        {isLoading ? (
          <div className="text-center">Loading...</div>
        ) : isError ? (
          <div className="text-center text-red-500">
            Error fetching companies
          </div>
        ) : filteredCompanies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-6">
            {filteredCompanies.map((company: any) => (
              <div
                key={company.id}
                className="p-4 border rounded-xl shadow-md shadow-slate-600 transition-shadow duration-300 cursor-pointer"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={company.avatar}
                    alt={company.name}
                    className="w-16 h-16 rounded-full mr-4 border shadow shadow-slate-500"
                  />
                  <div>
                    <h3 className="text-md font-semibold">{company.name}</h3>
                  </div>
                </div>
                <p className="text-sm items-center w-full text-gray-600 flex gap-1">
                  <MapPin className="text-orange-500 mr-1" />
                  {company.address}
                </p>

                <div className="bg-slate-400 h-[1px] w-full flex mt-2 mb-2"></div>
                <p className="text-gray-700 mb-4">
                  {company.description.length > 100
                    ? company.description.substring(0, 100) + "..."
                    : company.description}
                </p>
                <div className="bg-slate-400 h-[1px] w-full flex mt-2 mb-2"></div>

                <p className="text-sm items-center w-full text-gray-600 flex gap-1">
                  <Mail className="text-orange-500 mr-1" />
                  {company.email}
                </p>
                <p className="text-sm items-center w-full text-gray-600 flex gap-1 mt-2">
                  <Phone className="text-orange-500 mr-1" />
                  {company.phone}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">
            {filter === "freelance" || filter === "other"
              ? "No companies found."
              : "User has no company, please create one."}
          </div>
        )}
      </div>
    </div>
  );
};

export default Companies;
