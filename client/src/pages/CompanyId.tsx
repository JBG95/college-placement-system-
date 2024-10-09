import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Company } from "../types/interface";
import { MapPin, Mail, Phone, Loader } from "lucide-react";

const CompanyId = () => {
  const { companyId } = useParams();
  const [company, setCompany] = useState<Company | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const id = companyId;

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const response = await axios.get(
          `http://localhost:1738/api/company/one/${id}`
        );
        console.log(response.data);
        setCompany(response.data);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompanyDetails();
  }, [id]);

  return (
    <div className="container mx-auto p-4 w-full min-h-screen pt-24">
      {isLoading ? (
        <div className="flex justify-center items-center">
          <Loader />
        </div>
      ) : isError ? (
        <p className="text-center text-red-500">
          Error fetching company details.
        </p>
      ) : company ? (
        <div className="px-4 py-6 transition-shadow w-1/2 rounded-xl border">
          <div className="flex items-center mb-4">
            <img
              src={company.avatar}
              alt={company.name}
              className="w-24 h-24 rounded-full mr-4 border shadow shadow-slate-500"
            />
            <h1 className="text-3xl font-bold">{company.name}</h1>
          </div>

          <p className="text-sm flex items-center text-gray-600 gap-1">
            <MapPin className="text-orange-500 mr-1" /> {company.address}
          </p>

          <div className="bg-slate-400 h-[1px] w-full mt-2 mb-2"></div>

          <p className="text-lg text-gray-700 mb-4">
            {company.description || "No description available."}
          </p>

          <div className="bg-slate-400 h-[1px] w-full mt-2 mb-2"></div>

          <p className="text-sm flex items-center text-gray-600 gap-1">
            <Mail className="text-orange-500 mr-1" /> {company.email}
          </p>

          <p className="text-sm flex items-center text-gray-600 gap-1 mt-2">
            <Phone className="text-orange-500 mr-1" /> {company.phone}
          </p>
        </div>
      ) : (
        <p className="text-center text-gray-500">Company not found.</p>
      )}
    </div>
  );
};

export default CompanyId;
