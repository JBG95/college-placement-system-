import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ENDPOINT, UPDATEAVATAR } from "../../constants/config";

const Avatar = () => {
  const { userId } = useParams(); // Get userId from the URL
  const navigate = useNavigate(); // Used for redirection

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", selectedFile);

    try {
      // Make the request to upload the avatar
      await axios.put(`${ENDPOINT}/${UPDATEAVATAR}${userId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // On success, show a success message and navigate to the role page
      setMessage("Profile picture uploaded successfully!");
      setTimeout(() => {
        navigate(`/user/role/${userId}`); // Redirect to the role page after a delay
      }, 2000); // 2 second delay to show the success message
    } catch (error) {
      setMessage("Failed to upload the profile picture. Please try again.");
    }
  };

  return (
    <section className="py-6 md:px-48 p-4 min-h-screen w-full flex items-center">
      <div className="w-full md:gap-4 gap-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 shadow p-4 rounded-xl">
        <div className="flex flex-col justify-center md:p-4 p-0">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">
            Congratulations! 🎉
          </h2>
          <p className="text-slate-700 mb-2">
            Your account has been successfully created. Now, let's upload your
            profile picture to complete your profile.
          </p>
        </div>

        <div className="flex flex-col w-full gap-4 md:p-4 p-0">
          <h3 className="text-slate-900 font-semibold text-2xl md:text-center text-start">
            Upload Your Profile Picture
          </h3>

          {message && (
            <div
              className={`p-2 rounded ${
                message.includes("success")
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {message}
            </div>
          )}

          <div className="flex flex-col gap-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-3 rounded-xl border border-slate-500 text-slate-800 outline-none"
            />
            <button
              onClick={handleUpload}
              className="p-3 rounded-xl bg-orange-600 hover:bg-orange-500 transition-all duration-300 text-white"
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Avatar;
