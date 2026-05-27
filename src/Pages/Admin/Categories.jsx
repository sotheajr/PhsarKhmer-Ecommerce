import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Search, Eye, X } from "lucide-react";
import AdminHeader from "../../Components/AdminHeader/AdminHeader";
import AdminSidebar from "../../Components/AdminSidebar/AdminSidebar";
import category1 from "../../assets/categories/categories_1.png";
import category2 from "../../assets/categories/categories_2.png";
import category3 from "../../assets/categories/categories_3.png";
import category4 from "../../assets/categories/categories_4.png";

const Categories = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [modal, setModal] = useState({ open: false, mode: "add", data: null });
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    status: "Active",
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

  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Furniture",
      description: "Home and office furniture",
      productCount: 24,
      status: "Active",
      image: category1,
    },
    {
      id: 2,
      name: "Decor",
      description: "Home decoration items",
      productCount: 18,
      status: "Active",
      image: category2,
    },
    {
      id: 3,
      name: "Lighting",
      description: "Light fixtures and lamps",
      productCount: 12,
      status: "Inactive",
      image: category3,
    },
  ]);

  const handleOpenModal = (mode, category = null) => {
    setModal({ open: true, mode, data: category });
    if (mode === "add") {
      setFormData({
        name: "",
        description: "",
        image: "",
        status: "Active",
      });
    } else {
      setFormData(category);
    }
  };

  const handleCloseModal = () => {
    setModal({ open: false, mode: "add", data: null });
    setFormData({
      name: "",
      description: "",
      image: "",
      status: "Active",
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
      const newCategory = {
        id: Math.max(...categories.map((c) => c.id), 0) + 1,
        ...formData,
        productCount: 0,
      };
      setCategories([...categories, newCategory]);
    } else {
      setCategories(
        categories.map((c) => (c.id === modal.data.id ? formData : c)),
      );
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    setCategories(categories.filter((category) => category.id !== id));
  };

  return (
    <div
      className={`h-screen overflow-hidden text-slate-900 ${isDarkMode ? "bg-slate-900" : "bg-slate-100"}`}
    >
      <div className="flex h-screen">
        <div className={`${sidebarOpen ? "block" : "hidden"} xl:block`}>
          <AdminSidebar isDark={isDarkMode} currentPath="/admin/categories" />
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
                      Categories
                    </h1>
                    <p className="mt-2 text-sm text-slate-500">
                      Manage product categories
                    </p>
                  </div>
                  <button
                    onClick={() => handleOpenModal("add")}
                    className="flex items-center gap-2 rounded-3xl bg-gradient-to-r from-indigo-600 to-sky-500 px-6 py-3 text-white hover:shadow-lg transition"
                  >
                    <Plus className="h-5 w-5" />
                    Add Category
                  </button>
                </div>

                <div className="mt-6 flex gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-3 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search categories..."
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
                        <th className="px-6 py-4 font-medium">Category Name</th>
                        <th className="px-6 py-4 font-medium">Description</th>
                        <th className="px-6 py-4 font-medium">Products</th>
                        <th className="px-6 py-4 font-medium">Status</th>
                        <th className="px-6 py-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                      {categories.map((category) => (
                        <tr key={category.id} className="hover:bg-slate-50">
                          <td className="px-6 py-4">
                            {category.image && (
                              <img
                                src={category.image}
                                alt={category.name}
                                className="h-10 w-10 rounded-lg object-cover"
                              />
                            )}
                          </td>
                          <td className="px-6 py-4 font-semibold text-slate-900">
                            {category.name}
                          </td>
                          <td className="px-6 py-4">{category.description}</td>
                          <td className="px-6 py-4">{category.productCount}</td>
                          <td className="px-6 py-4">
                            <span
                              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                category.status === "Active"
                                  ? "bg-emerald-100 text-emerald-700"
                                  : "bg-gray-100 text-gray-700"
                              }`}
                            >
                              {category.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2">
                              <button
                                onClick={() =>
                                  handleOpenModal("view", category)
                                }
                                className="rounded-2xl bg-green-100 p-2 text-green-600 hover:bg-green-200"
                              >
                                <Eye className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() =>
                                  handleOpenModal("edit", category)
                                }
                                className="rounded-2xl bg-sky-100 p-2 text-sky-600 hover:bg-sky-200"
                              >
                                <Edit className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(category.id)}
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
                  ? "Add Category"
                  : modal.mode === "edit"
                    ? "Edit Category"
                    : "View Category"}
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
                    className="h-40 w-full rounded-lg object-cover"
                  />
                )}
                <div>
                  <p className="text-xs text-slate-500">Category Name</p>
                  <p className="text-sm font-semibold text-slate-900">
                    {formData.name}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Description</p>
                  <p className="text-sm font-semibold text-slate-900">
                    {formData.description}
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-900">
                    Category Image
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
                    Category Name
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
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                    className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-900">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm outline-none focus:border-indigo-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
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

export default Categories;
