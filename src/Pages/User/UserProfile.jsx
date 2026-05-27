import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router"; // ប្រើប្រាស់ useNavigate សម្រាប់ iOS Compatibility

const UserPage = () => {
  const navigate = useNavigate();

  const defaultUser = {
    name: "Sothea Chhum",
    email: "sothea@example.com",
    phone: "+855 12 345 678",
    address: "Phnom Penh, Cambodia",
    image: "https://i.pravatar.cc/150?img=3",
    password: "123456",
  };

  const [user, setUser] = useState(defaultUser);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);

  const [formData, setFormData] = useState(defaultUser);

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Load user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setFormData(parsedUser);
      } catch (error) {
        console.error("Error parsing user data", error);
      }
    } else {
      localStorage.setItem("user", JSON.stringify(defaultUser));
    }
  }, []);

  // Edit Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Save Profile
  const handleSave = () => {
    setUser(formData);
    localStorage.setItem("user", JSON.stringify(formData));
    setIsEditOpen(false);
    alert("Profile updated!");
  };

  // Password Input Change
  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  // Update Password
  const handleUpdatePassword = () => {
    if (passwordData.oldPassword !== user.password) {
      alert("Old password incorrect");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const updatedUser = {
      ...user,
      password: passwordData.newPassword,
    };

    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setIsPasswordOpen(false);
    alert("Password changed successfully");
  };

  // Logout (ដោះស្រាយការគាំងនៅលើ iOS Safari)
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated"); // សម្អាត Auth state ប្រសិនបើមាន
    navigate("/"); // ប្រើប្រាស់ Client-side routing ធានាមិនគាំងលើ iOS
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4 text-gray-800">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-[#272343] mb-6">My Profile</h1>

        <div className="flex flex-col md:flex-row gap-6 items-center">
          <img
            src={user.image}
            alt="profile"
            className="w-32 h-32 rounded-full border-4 border-gray-200 object-cover"
          />

          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-semibold text-gray-900">
              {user.name}
            </h2>
            <p className="text-gray-600 mt-1">{user.email}</p>
            <p className="text-gray-600">{user.phone}</p>
            <p className="text-gray-600">{user.address}</p>

            <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-4">
              <button
                onClick={() => {
                  setFormData(user); // ធានាថាទិន្នន័យថ្មីបំផុតត្រូវបានបញ្ចូលទៅក្នុង Form
                  setIsEditOpen(true);
                }}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors shadow-sm"
              >
                Edit Profile
              </button>

              <button
                onClick={() => setIsPasswordOpen(true)}
                className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-lg transition-colors shadow-sm"
              >
                Change Password
              </button>

              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors shadow-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
          <div className="bg-white p-6 rounded-2xl w-full max-w-[400px] shadow-2xl text-gray-900">
            <h2 className="text-xl font-bold mb-4 text-[#272343]">
              Edit Profile
            </h2>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-gray-500 block mb-1">
                  Name
                </label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2.5 border border-gray-200 rounded-xl bg-white text-gray-900 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 block mb-1">
                  Email
                </label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2.5 border border-gray-200 rounded-xl bg-white text-gray-900 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 block mb-1">
                  Phone
                </label>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-2.5 border border-gray-200 rounded-xl bg-white text-gray-900 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 block mb-1">
                  Address
                </label>
                <input
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full p-2.5 border border-gray-200 rounded-xl bg-white text-gray-900 outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-5">
              <button
                type="button"
                onClick={() => setIsEditOpen(false)}
                className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg font-medium transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Password Modal */}
      {isPasswordOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
          <div className="bg-white p-6 rounded-2xl w-full max-w-[400px] shadow-2xl text-gray-900">
            <h2 className="text-xl font-bold mb-4 text-[#272343]">
              Change Password
            </h2>

            <div className="space-y-3">
              <input
                type="password"
                name="oldPassword"
                placeholder="Old Password"
                onChange={handlePasswordChange}
                className="w-full p-2.5 border border-gray-200 rounded-xl bg-white text-gray-900 outline-none focus:border-green-500"
              />

              <input
                type="password"
                name="newPassword"
                placeholder="New Password"
                onChange={handlePasswordChange}
                className="w-full p-2.5 border border-gray-200 rounded-xl bg-white text-gray-900 outline-none focus:border-green-500"
              />

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                onChange={handlePasswordChange}
                className="w-full p-2.5 border border-gray-200 rounded-xl bg-white text-gray-900 outline-none focus:border-green-500"
              />
            </div>

            <div className="flex justify-end gap-2 mt-5">
              <button
                type="button"
                onClick={() => setIsPasswordOpen(false)}
                className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleUpdatePassword}
                className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg font-medium transition-colors"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPage;
