import { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { userDetailsAtom } from "../../recoil/atoms";
import { ENDPOINT } from "../../constants/config";
import Loader from "../global/Loader"; // Import the Loader component

// Enums for JobType, WorkType, and ListingType
export enum JobType {
  Internship = "Internship",
  Parttime = "Parttime",
  Fulltime = "Fulltime",
  Permanent = "Permanent",
}

export enum WorkType {
  Remote = "Remote",
  Onsite = "Onsite",
}

export enum ListingType {
  Company = "Company",
  Personal = "Personal",
}

const CreateJobForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirements: "",
    salaryRange: "",
    type: JobType.Internship, // Default to Internship
    work: WorkType.Remote, // Default to Remote
    listing: ListingType.Company, // Default to Company
    location: "",
    deadline: "",
    selectedCompany: "", // State to hold selected company if applicable
  });

  const [userCompanies, setUserCompanies] = useState<
    { id: string; name: string }[]
  >([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const userDetails = useRecoilValue(userDetailsAtom);
  const userId = userDetails?.id;

  // Fetch user companies when the component mounts
  useEffect(() => {
    const fetchUserCompanies = async () => {
      try {
        const response = await axios.get(`${ENDPOINT}/company/user/${userId}`);
        setUserCompanies(response.data); // Assume response data is an array of company objects
      } catch (error) {
        console.error("Error fetching user companies:", error);
        setError("Failed to load companies.");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchUserCompanies();
  }, [userId]);

  // Handle form data changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    // Check if the Listing Type changes to Company and reset selectedCompany
    if (name === "listingType" && value === ListingType.Company) {
      setFormData((prevData) => ({ ...prevData, selectedCompany: "" })); // Reset the selected company
    }
  };

  // Validate form data
  const validateFormData = () => {
    if (
      !formData.title ||
      !formData.description ||
      !formData.salaryRange ||
      !formData.location
    ) {
      return "Please fill out all required fields.";
    }
    return null;
  };

  // Submit the new job form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateFormData();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null); // Clear previous errors
    setSuccess(null); // Clear previous success messages

    try {
      // Split requirements by comma and trim each entry
      const requirementsArray = formData.requirements
        .split(",")
        .map((req) => req.trim())
        .filter((req) => req.length > 0); // Filter out any empty entries

      await axios.post(`${ENDPOINT}/jobs/create`, {
        ...formData,
        requirements: requirementsArray, // Use the processed requirements array
        userId,
        companyId: formData.selectedCompany, // Include companyId in the payload
      });
      setSuccess("Job created successfully!");
      setFormData({
        title: "",
        description: "",
        requirements: "",
        salaryRange: "",
        type: JobType.Internship,
        work: WorkType.Remote,
        listing: ListingType.Company,
        location: "",
        deadline: "",
        selectedCompany: "",
      }); // Reset form after successful submission
    } catch (error) {
      console.error("Error creating job:", error);
      setError("Failed to create job. Please try again.");
    }
  };

  if (loading) {
    return <Loader />; // Show loader while data is being fetched
  }

  return (
    <div className="p-8 w-full justify-center flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">Create a New Job</h1>
      {error && <div className="text-red-600 mb-4">{error}</div>}
      {success && <div className="text-green-600 mb-4">{success}</div>}
      <form onSubmit={handleSubmit} className="space-y-4 w-1/2">
        <label className="block">
          <span className="text-gray-700">Job Title</span>
          <input
            name="title"
            placeholder="Job Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Job Description</span>
          <textarea
            name="description"
            placeholder="Job Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Requirements</span>
          <input
            name="requirements"
            placeholder="Enter requirements separated by commas"
            value={formData.requirements}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Salary Range</span>
          <input
            name="salaryRange"
            placeholder="Salary Range"
            value={formData.salaryRange}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </label>

        {/* Job Type Dropdown */}
        <label className="block">
          <span className="text-gray-700">Job Type</span>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            {Object.values(JobType).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>

        {/* Work Type Dropdown */}
        <label className="block">
          <span className="text-gray-700">Work Type</span>
          <select
            name="work"
            value={formData.work}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            {Object.values(WorkType).map((work) => (
              <option key={work} value={work}>
                {work}
              </option>
            ))}
          </select>
        </label>

        {/* Listing Type Dropdown */}
        <label className="block">
          <span className="text-gray-700">Listing Type</span>
          <select
            name="listing"
            value={formData.listing}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            {Object.values(ListingType).map((listing) => (
              <option key={listing} value={listing}>
                {listing}
              </option>
            ))}
          </select>
        </label>

        {/* Conditionally render company selection dropdown */}
        {formData.listing === ListingType.Company && (
          <label className="block">
            <span className="text-gray-700">Select Company</span>
            <select
              name="selectedCompany"
              value={formData.selectedCompany}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select a company</option>
              {userCompanies.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.name}
                </option>
              ))}
            </select>
          </label>
        )}

        <label className="block">
          <span className="text-gray-700">Location</span>
          <input
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Application Deadline</span>
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </label>

        <button
          type="submit"
          className="w-full bg-slate-800 text-white p-2 rounded-md hover:bg-slate-700"
        >
          Create Job
        </button>
      </form>
    </div>
  );
};

export default CreateJobForm;
