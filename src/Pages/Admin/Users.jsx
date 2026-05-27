import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Search, Eye, X } from "lucide-react";
import AdminHeader from "../../Components/AdminHeader/AdminHeader";
import AdminSidebar from "../../Components/AdminSidebar/AdminSidebar";

const Users = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [modal, setModal] = useState({ open: false, mode: "add", data: null });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "Customer",
    image: "",
  });

  useEffect(() => {
    if (modal.open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [modal.open]);

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "+1-234-567-8900",
      role: "Customer",
      joinDate: "2024-01-15",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+1-234-567-8901",
      role: "Admin",
      joinDate: "2023-12-20",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop",
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob@example.com",
      phone: "+1-234-567-8902",
      role: "Customer",
      joinDate: "2024-02-10",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop",
    },
  ]);

  const handleOpenModal = (mode, user = null) => {
    setModal({ open: true, mode, data: user });
    if (mode === "add") {
      setFormData({
        name: "",
        email: "",
        phone: "",
        role: "Customer",
        image: "",
      });
    } else {
      setFormData(user);
    }
  };

  const handleCloseModal = () => {
    setModal({ open: false, mode: "add", data: null });
    setFormData({
      name: "",
      email: "",
      phone: "",
      role: "Customer",
      image: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (modal.mode === "add") {
      const newUser = {
        id: Math.max(...users.map((u) => u.id), 0) + 1,
        ...formData,
        joinDate: new Date().toISOString().split("T")[0],
      };
      setUsers([...users, newUser]);
    } else {
      setUsers(users.map((u) => (u.id === modal.data.id ? formData : u)));
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div
      className={`h-screen overflow-hidden text-slate-900 ${isDarkMode ? "bg-slate-900" : "bg-slate-100"}`}
    >
      <div className="flex h-screen">
        <div className={`${sidebarOpen ? "block" : "hidden"} xl:block`}>
          <AdminSidebar isDark={isDarkMode} currentPath="/admin/users" />
        </div>
        <div className="flex-1 flex flex-col">
          <AdminHeader
            onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
            onThemeToggle={() => setIsDarkMode(!isDarkMode)}
            isDarkMode={isDarkMode}
          />

          <main
            className={`flex-1 overflow-y-auto px-6 xl:px-10 pt-6 pb-10 ${isDarkMode ? "bg-slate-900" : "bg-slate-100"}`}
          >
            <div className="flex flex-col gap-6">
              <div className="rounded-[32px] bg-white p-6 shadow-lg">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h1 className="text-3xl font-semibold text-slate-900">
                      Users
                    </h1>
                    <p className="mt-2 text-sm text-slate-500">
                      Manage user accounts and permissions
                    </p>
                  </div>
                  <button
                    onClick={() => handleOpenModal("add")}
                    className="flex items-center gap-2 rounded-3xl bg-gradient-to-r from-indigo-600 to-sky-500 px-6 py-3 text-white hover:shadow-lg transition"
                  >
                    <Plus className="h-5 w-5" />
                    Add User
                  </button>
                </div>

                <div className="mt-6 flex gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-3 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full rounded-3xl border border-slate-200 pl-10 pr-4 py-2 text-sm outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="mt-6 overflow-hidden rounded-[28px] border border-slate-200">
                  <table className="min-w-full divide-y divide-slate-200 text-left text-sm text-slate-600">
                    <thead className="bg-slate-50 text-slate-500">
                      <tr>
                        <th className="px-6 py-4 font-medium">Image</th>
                        <th className="px-6 py-4 font-medium">Name</th>
                        <th className="px-6 py-4 font-medium">Email</th>
                        <th className="px-6 py-4 font-medium">Phone</th>
                        <th className="px-6 py-4 font-medium">Role</th>
                        <th className="px-6 py-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                      {users.map((user) => (
                        <tr key={user.id} className="hover:bg-slate-50">
                          <td className="px-6 py-4">
                            {user.image && (
                              <img
                                src={user.image}
                                alt={user.name}
                                className="h-10 w-10 rounded-full object-cover"
                              />
                            )}
                          </td>
                          <td className="px-6 py-4 font-semibold text-slate-900">
                            {user.name}
                          </td>
                          <td className="px-6 py-4">{user.email}</td>
                          <td className="px-6 py-4">{user.phone}</td>
                          <td className="px-6 py-4">
                            <span
                              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                user.role === "Admin"
                                  ? "bg-purple-100 text-purple-700"
                                  : "bg-blue-100 text-blue-700"
                              }`}
                            >
                              {user.role}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleOpenModal("view", user)}
                                className="rounded-2xl bg-green-100 p-2 text-green-600 hover:bg-green-200"
                              >
                                <Eye className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleOpenModal("edit", user)}
                                className="rounded-2xl bg-sky-100 p-2 text-sky-600 hover:bg-sky-200"
                              >
                                <Edit className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(user.id)}
                                className="rounded-2xl bg-red-100 p-2 text-red-600 hover:bg-red-200"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Modal */}
      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-[28px] bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-slate-900">
                {modal.mode === "add"
                  ? "Add User"
                  : modal.mode === "edit"
                    ? "Edit User"
                    : "View User"}
              </h2>
              <button
                onClick={handleCloseModal}
                className="rounded-full p-1 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {modal.mode === "view" ? (
              <div className="space-y-4">
                {formData.image && (
                  <img
                    src={formData.image}
                    alt={formData.name}
                    className="h-40 w-40 rounded-lg object-cover mx-auto"
                  />
                )}
                <div>
                  <p className="text-xs text-slate-500">Name</p>
                  <p className="text-sm font-semibold text-slate-900">
                    {formData.name}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Email</p>
                  <p className="text-sm font-semibold text-slate-900">
                    {formData.email}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Phone</p>
                  <p className="text-sm font-semibold text-slate-900">
                    {formData.phone}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Role</p>
                  <p className="text-sm font-semibold text-slate-900">
                    {formData.role}
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-900">
                    Profile Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="mt-1 block w-full text-sm"
                  />
                  {formData.image && (
                    <img
                      src={formData.image}
                      alt="preview"
                      className="mt-2 h-20 w-20 rounded-lg object-cover"
                    />
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-900">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-900">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-900">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-900">
                    Role
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm outline-none focus:border-indigo-500"
                  >
                    <option value="Customer">Customer</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleCloseModal}
                    className="flex-1 rounded-2xl border border-slate-200 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex-1 rounded-2xl bg-gradient-to-r from-indigo-600 to-sky-500 py-2 text-sm font-medium text-white hover:shadow-lg"
                  >
                    Save
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
