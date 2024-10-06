import axios from "axios";
import { useState, useEffect } from "react";
import {
  ENDPOINT,
  CREATECOMPANY,
  GETUSERCOMPANIES,
} from "../../constants/config";
import { userDetailsAtom } from "../../recoil/atoms";
import { useRecoilValue } from "recoil";
import { toast } from "react-hot-toast";
import Loader from "../global/Loader";

const CompaniesComponent = () => {
  // State to handle form data
  const [formData, setFormData] = useState<{
    name: string;
    address: string;
    description: string;
    email: string;
    phone: string;
  }>({
    name: "",
    address: "",
    description: "",
    email: "",
    phone: "",
  });

  // State to store user companies
  const [userCompanies, setUserCompanies] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false); // Modal state
  const [loading, setLoading] = useState(false); // Loading state for Loader
  const [fetchingCompanies, setFetchingCompanies] = useState(false); // Loading state for fetching companies

  const userDetails = useRecoilValue(userDetailsAtom);
  const userId = userDetails?.id; // Extract userId from the user details

  // Fetch user companies
  useEffect(() => {
    if (userId) {
      const fetchUserCompanies = async () => {
        setFetchingCompanies(true); // Show loader while fetching
        try {
          const response = await axios.get(
            `${ENDPOINT}${GETUSERCOMPANIES}/${userId}`
          );

          console.log("API response:", response.data); // Log entire response data

          // Check if the response contains the companies in the expected structure
          setUserCompanies(response.data.companies || []); // Adjust this line if the structure differs
          setFetchingCompanies(false); // Hide loader after fetching
        } catch (error: any) {
          console.error("Error fetching user companies:", error.message);
          toast.error("Failed to fetch user companies.");
          setFetchingCompanies(false);
        }
      };

      fetchUserCompanies();
    }
  }, [userId]);

  // Handle input change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Show loader when submitting the form

    try {
      const payload = { ...formData, userId };

      await axios.post(`${ENDPOINT}${CREATECOMPANY}`, JSON.stringify(payload), {
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast.success("Company created successfully!");
      setShowModal(false);

      // Fetch companies again after creating a new one
      const fetchCompaniesResponse = await axios.get(
        `${ENDPOINT}${GETUSERCOMPANIES.replace("${user.id}", userId)}`
      );
      setUserCompanies(fetchCompaniesResponse.data.companies || []);
    } catch (error: any) {
      console.error(
        "Error creating company:",
        error.response?.data || error.message
      );
      toast.error("Failed to create company. Please try again.");
    } finally {
      setLoading(false); // Hide loader after form submission
    }
  };

  return (
    <div className="w-full">
      {/* Display loader while fetching companies */}
      {fetchingCompanies ? <Loader /> : null}

      {/* Display list of user companies */}
      <div>
        <h2 className="text-lg font-bold mb-4">Your Companies</h2>
        {userCompanies.length > 0 ? (
          <ul>
            {userCompanies.map((company) => (
              <li key={company.id} className="mb-2">
                <span className="font-bold">{company.name}</span>:{" "}
                {company.description}
              </li>
            ))}
          </ul>
        ) : (
          <p>No companies found.</p>
        )}
      </div>

      {/* Button to open the modal */}
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded-md"
        onClick={() => setShowModal(true)}
      >
        Create Company
      </button>

      {/* Modal for creating a company */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 w-full">
          <div className="bg-white p-6 rounded-lg w-1/2">
            <h2 className="text-lg font-bold mb-4">Create Company</h2>
            <form onSubmit={handleSubmit} className="w-full">
              {loading && <Loader />} {/* Show Loader when loading */}
              <div className="w-full flex gap-4">
                <div className="mb-4 w-full">
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter company name"
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>

                <div className="mb-4 w-full">
                  <label className="block text-sm font-medium mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Enter company address"
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>
              </div>
              <div className="mb-4 w-full">
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter company description"
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              <div className="w-full flex gap-4">
                <div className="mb-4 w-full">
                  <label className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter company email"
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>

                <div className="mb-4 w-full">
                  <label className="block text-sm font-medium mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter company phone number"
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end w-full">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-500 text-white rounded-md mr-2"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-md"
                  disabled={loading} // Disable button when loading
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompaniesComponent;
