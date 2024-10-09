import { useState } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { ENDPOINT } from "../constants/config";
import Loader from "../components/global/Loader";
import { userDetailsAtom } from "../recoil/atoms";
import { useParams } from "react-router-dom";

const JobApplicationForm = () => {
  const userDetails = useRecoilValue(userDetailsAtom);
  const { jobId } = useParams();
  const userId = userDetails.id;

  const [formData, setFormData] = useState({
    fullname: userDetails.fullname || "",
    email: userDetails.email || "",
    phone: userDetails.phone || "",
    resume: null as File | null,
    coverLetter: null as File | null,
    experience: "",
    education: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Handle form data changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle file uploads
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "resume" | "coverLetter"
  ) => {
    const file = e.target.files?.[0] || null;
    setFormData((prevData) => ({ ...prevData, [field]: file }));
  };

  // Validate form data
  const validateFormData = () => {
    if (
      !formData.fullname ||
      !formData.email ||
      !formData.phone ||
      !formData.resume
    ) {
      return "Please fill out all required fields.";
    }
    return null;
  };

  // Upload documents and get their URLs
  const uploadDocuments = async (): Promise<{
    resume: string;
    coverLetter: string;
  }> => {
    const documentFormData = new FormData();
    documentFormData.append("resume", formData.resume!);
    documentFormData.append("coverLetter", formData.coverLetter!);

    const response = await axios.post(
      `http://localhost:1738/uploads/upload-documents`,
      documentFormData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(response.data);

    const { resume, coverLetter } = response.data; // Assuming response includes these URLs
    return { resume, coverLetter };
  };

  // Submit the job application form
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
      setLoading(true); // Set loading state
      const { resume, coverLetter } = await uploadDocuments(); // Upload documents

      // Prepare application data
      const applicationData = {
        userId,
        jobId,
        fullname: formData.fullname,
        email: formData.email,
        phone: formData.phone,
        resume,
        coverLetter,
        experience: formData.experience,
        education: formData.education,
      };

      // Submit application
      await axios.post(`${ENDPOINT}/application/create`, applicationData);
      setSuccess("Application submitted successfully!");
      setFormData({
        fullname: "",
        email: "",
        phone: "",
        resume: null,
        coverLetter: null,
        experience: "",
        education: "",
      }); // Reset form after successful submission
    } catch (error) {
      console.error("Error submitting application:", error);
      setError("Failed to submit application. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  if (loading) {
    return <Loader />; // Show loader while data is being fetched
  }

  return (
    <div className="p-8 w-full justify-center flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">Job Application</h1>
      {error && <div className="text-red-600 mb-4">{error}</div>}
      {success && <div className="text-green-600 mb-4">{success}</div>}
      <form onSubmit={handleSubmit} className="space-y-4 w-1/2">
        <label className="block">
          <span className="text-gray-700">Full Name</span>
          <input
            name="fullname"
            placeholder="Full Name"
            value={formData.fullname}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Email</span>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Phone</span>
          <input
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Resume (PDF)</span>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => handleFileChange(e, "resume")}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Cover Letter (PDF)</span>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => handleFileChange(e, "coverLetter")}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Experience</span>
          <textarea
            name="experience"
            placeholder="Previous Experience In Years"
            value={formData.experience}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Education</span>
          <textarea
            name="education"
            placeholder="Education Background"
            value={formData.education}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </label>

        <button
          type="submit"
          className="w-full bg-slate-800 text-white p-2 rounded-md hover:bg-slate-700"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default JobApplicationForm;
