import { useState } from "react";
import { useRecoilValue } from "recoil";
import { userDetailsAtom } from "../../recoil/atoms";
import { User } from "lucide-react";
import { capitalize } from "../../utils/functions";

const Profile = () => {
  const user = useRecoilValue(userDetailsAtom);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedUser, setEditedUser] = useState({
    username: user?.username,
    email: user?.email,
    fullname: user?.fullname,
    phone: user?.phone,
    location: user?.location,
    avatarUrl: user?.avatarUrl,
  });

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = () => {
    console.log("User details updated:", editedUser);
    handleCloseModal();
  };

  return (
    <div className="w-full flex flex-col items-center rounded min-h-screen">
      <div className="w-full max-w-lg flex flex-col justify-center items-center bg-white shadow shadow-slate-400 rounded-xl p-4 mt-8">
        <h1 className="text-2xl font-bold mb-2 text-slate-800">Profile</h1>
        <div className="w-full flex flex-col">
          <h2 className="text-lg font-semibold text-slate-800 text-center">
            User Information
          </h2>

          <div className="w-full flex justify-center items-center mt-2">
            <div className="flex items-center justify-center mb-4 p-2 rounded-full shadow shadow-gray-500 w-14">
              <User size={40} className="text-gray-600" />
            </div>
          </div>

          {[
            { label: "Username", value: capitalize(user?.username) },
            { label: "Fullname", value: capitalize(user?.fullname) },
            { label: "Email", value: capitalize(user?.email) },
            { label: "Role", value: capitalize(user?.role) },
            { label: "Phone", value: user?.phone },
          ].map((field, index) => (
            <div
              className="flex justify-between items-center text-slate-800 mt-2"
              key={index}
            >
              <p>{field.label}:</p>
              <div className="flex gap-1 items-center">
                <p>{field.value}</p>
              </div>
            </div>
          ))}

          {/* Edit Button */}
          <button
            onClick={handleEditClick}
            className="mt-4 bg-slate-800 text-white px-4 py-2 rounded"
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* Custom Modal for editing user information */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-md w-1/3">
            <h2 className="text-xl font-bold mb-4">Edit User Information</h2>
            <div>
              {[
                {
                  label: "Username",
                  name: "username",
                  value: editedUser.username,
                },
                {
                  label: "Full Name",
                  name: "fullname",
                  value: editedUser.fullname,
                },
                { label: "Email", name: "email", value: editedUser.email },
                { label: "Phone", name: "phone", value: editedUser.phone },
                {
                  label: "Location",
                  name: "location",
                  value: editedUser.location,
                },
                {
                  label: "Avatar URL",
                  name: "avatarUrl",
                  value: editedUser.avatarUrl,
                },
              ].map((field, index) => (
                <label className="block mb-2" key={index}>
                  {field.label}:
                  <input
                    type="text"
                    name={field.name}
                    value={field.value}
                    onChange={handleInputChange}
                    className="border p-2 w-full"
                  />
                </label>
              ))}
              <div className="flex justify-between mt-4">
                <button
                  onClick={handleSaveChanges}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Save Changes
                </button>
                <button onClick={handleCloseModal} className="text-red-500">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
