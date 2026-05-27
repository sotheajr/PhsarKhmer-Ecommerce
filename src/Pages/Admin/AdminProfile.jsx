import React, { useState, useEffect } from "react";
import AdminSidebar from "../../Components/AdminSidebar/AdminSidebar";
import AdminHeader from "../../Components/AdminHeader/AdminHeader";

const defaultUser = {
  name: "Admin User",
  email: "admin@example.com",
  phone: "+855 12 345 678",
  address: "Phnom Penh, Cambodia",
  image: "https://i.pravatar.cc/150?img=12",
  password: "123456",
  role: "Admin",
};

const AdminProfile = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const [user, setUser] = useState(defaultUser);
  const [formData, setFormData] = useState(defaultUser);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("user");

    if (saved) {
      const parsed = JSON.parse(saved);
      setUser(parsed);
      setFormData(parsed);
    } else {
      localStorage.setItem("user", JSON.stringify(defaultUser));
    }
  }, []);

  // update form
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // save profile
  const handleSave = () => {
    setUser(formData);
    localStorage.setItem("user", JSON.stringify(formData));
    setIsEditOpen(false);
    alert("Profile updated!");
  };

  // password change
  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdatePassword = () => {
    if (passwordData.oldPassword !== user.password) {
      alert("Old password incorrect");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const updated = {
      ...user,
      password: passwordData.newPassword,
    };

    setUser(updated);
    localStorage.setItem("user", JSON.stringify(updated));

    setIsPasswordOpen(false);
    alert("Password changed successfully");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/auth/login";
  };

  return (
    <div className="flex h-screen bg-slate-900 text-white">
      {/* SIDEBAR */}
      <AdminSidebar sidebarOpen={sidebarOpen} isDark={isDarkMode} />

      {/* MAIN */}
      <div className="flex-1 flex flex-col">
        {/* HEADER */}
        <AdminHeader
          onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
          onThemeToggle={() => setIsDarkMode(!isDarkMode)}
          isDarkMode={isDarkMode}
        />

        {/* CONTENT */}
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">Admin Profile</h1>

          <div className="bg-slate-800 p-6 rounded-2xl flex flex-col md:flex-row gap-6 items-center">
            <img
              src={user.image}
              alt="profile"
              className="w-32 h-32 rounded-full border-4 border-slate-600"
            />

            <div className="flex-1">
              <h2 className="text-xl font-bold">{user.name}</h2>
              <p className="text-slate-300">{user.email}</p>
              <p className="text-slate-300">{user.phone}</p>
              <p className="text-slate-300">{user.address}</p>
              <p className="text-sm text-blue-400 mt-1">{user.role}</p>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => setIsEditOpen(true)}
                  className="px-4 py-2 bg-blue-500 rounded"
                >
                  Edit Profile
                </button>

                <button
                  onClick={() => setIsPasswordOpen(true)}
                  className="px-4 py-2 bg-yellow-500 rounded"
                >
                  Change Password
                </button>

                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-500 rounded"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* EDIT MODAL */}
      {isEditOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="bg-slate-800 p-6 rounded-xl w-[400px]">
            <h2 className="text-xl mb-4">Edit Profile</h2>

            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 mb-2 bg-slate-700 rounded"
            />
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 mb-2 bg-slate-700 rounded"
            />
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 mb-2 bg-slate-700 rounded"
            />
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 mb-4 bg-slate-700 rounded"
            />

            <div className="flex justify-end gap-2">
              <button onClick={() => setIsEditOpen(false)}>Cancel</button>
              <button
                onClick={handleSave}
                className="bg-blue-500 px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PASSWORD MODAL */}
      {isPasswordOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="bg-slate-800 p-6 rounded-xl w-[400px]">
            <h2 className="text-xl mb-4">Change Password</h2>

            <input
              type="password"
              name="oldPassword"
              placeholder="Old Password"
              onChange={handlePasswordChange}
              className="w-full p-2 mb-2 bg-slate-700 rounded"
            />
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              onChange={handlePasswordChange}
              className="w-full p-2 mb-2 bg-slate-700 rounded"
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={handlePasswordChange}
              className="w-full p-2 mb-4 bg-slate-700 rounded"
            />

            <div className="flex justify-end gap-2">
              <button onClick={() => setIsPasswordOpen(false)}>Cancel</button>
              <button
                onClick={handleUpdatePassword}
                className="bg-green-500 px-4 py-2 rounded"
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

export default AdminProfile;
