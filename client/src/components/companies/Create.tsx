import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { ENDPOINT, CREATECOMPANY } from "../../constants/config";
import Loader from "../global/Loader";
import { useRecoilValue } from "recoil";
import { userDetailsAtom } from "../../recoil/atoms";
import { Link, useNavigate } from "react-router-dom";

const Create = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    description: "",
    email: "",
    phone: "",
  });

  const [avatar, setAvatar] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const user = useRecoilValue(userDetailsAtom);
  const navigate = useNavigate();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAvatar(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Step 1: Upload the avatar
      let avatarUrl = "";
      if (avatar) {
        const avatarFormData = new FormData();
        avatarFormData.append("avatar", avatar);

        const uploadResponse = await axios.post(
          `http://localhost:1738/uploads/upload`,
          avatarFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log(uploadResponse);
        console.log(uploadResponse.data);
        const avatarUrll = uploadResponse.data.avatar;
        console.log("Avatar URL:", avatarUrll);

        avatarUrl = uploadResponse.data.avatar; // Assuming the response contains the URL of the uploaded avatar
      }

      const companyData = {
        ...formData,
        avatar: avatarUrl,
        userId: user.id,
      };

      console.log(companyData);

      await axios.post(`${ENDPOINT}${CREATECOMPANY}`, companyData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast.success("Company created successfully!");

      // Reset form state
      setFormData({
        name: "",
        address: "",
        description: "",
        email: "",
        phone: "",
      });
      setAvatar(null);
      navigate("/user/companies");
    } catch (error: any) {
      console.error(
        "Error creating company:",
        error.response?.data || error.message
      );
      toast.error("Failed to create company. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full p-4 flex flex-col justify-center items-center">
      <h2 className="text-lg font-bold mb-4">Create Company</h2>
      <form onSubmit={handleSubmit} className="w-1/2">
        {loading && <Loader />}
        <div className="mb-4">
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
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Address</label>
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
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter company description"
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
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
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Phone</label>
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
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Avatar</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div className="w-full flex justify-between">
          <Link
            to="/user/companies"
            type="button"
            className="px-4 py-2 bg-red-600 text-white rounded-md"
          >
            Back
          </Link>
          <button
            type="submit"
            className="px-4 py-2 bg-slate-800 text-white rounded-md"
            disabled={loading}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Create;
