import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Search, Eye, X } from "lucide-react";
import AdminHeader from "../../Components/AdminHeader/AdminHeader";
import AdminSidebar from "../../Components/AdminSidebar/AdminSidebar";
import brand1 from "../../assets/brands/brand_1.png";
import brand2 from "../../assets/brands/brand_2.png";
import brand3 from "../../assets/brands/brand_3.png";
import brand4 from "../../assets/brands/brand_4.png";

const Brands = () => {
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

  const [brands, setBrands] = useState([
    {
      id: 1,
      name: "Modern Home",
      description: "Contemporary furniture brand",
      productCount: 15,
      status: "Active",
      image: brand1,
    },
    {
      id: 2,
      name: "Comfort Plus",
      description: "Premium comfort furniture",
      productCount: 22,
      status: "Active",
      image: brand2,
    },
    {
      id: 3,
      name: "Classic Design",
      description: "Classic style furniture",
      productCount: 8,
      status: "Inactive",
      image: brand3,
    },
  ]);

  const handleOpenModal = (mode, brand = null) => {
    setModal({ open: true, mode, data: brand });
    if (mode === "add") {
      setFormData({
        name: "",
        description: "",
        image: "",
        status: "Active",
      });
    } else {
      setFormData(brand);
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
      const newBrand = {
        id: Math.max(...brands.map((b) => b.id), 0) + 1,
        ...formData,
        productCount: 0,
      };
      setBrands([...brands, newBrand]);
    } else {
      setBrands(brands.map((b) => (b.id === modal.data.id ? formData : b)));
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    setBrands(brands.filter((brand) => brand.id !== id));
  };

  return (
    <div
      className={`h-screen overflow-hidden text-slate-900 ${isDarkMode ? "bg-slate-900" : "bg-slate-100"}`}
    >
      <div className="flex h-screen">
        <div className={`${sidebarOpen ? "block" : "hidden"} xl:block`}>
          <AdminSidebar isDark={isDarkMode} currentPath="/admin/brands" />
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
                      Brands
                    </h1>
                    <p className="mt-2 text-sm text-slate-500">
                      Manage product brands
                    </p>
                  </div>
                  <button
                    onClick={() => handleOpenModal("add")}
                    className="flex items-center gap-2 rounded-3xl bg-gradient-to-r from-indigo-600 to-sky-500 px-6 py-3 text-white hover:shadow-lg transition"
                  >
                    <Plus className="h-5 w-5" />
                    Add Brand
                  </button>
                </div>

                <div className="mt-6 flex gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-3 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search brands..."
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
                        <th className="px-6 py-4 font-medium">Brand Name</th>
                        <th className="px-6 py-4 font-medium">Description</th>
                        <th className="px-6 py-4 font-medium">Products</th>
                        <th className="px-6 py-4 font-medium">Status</th>
                        <th className="px-6 py-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                      {brands.map((brand) => (
                        <tr key={brand.id} className="hover:bg-slate-50">
                          <td className="px-6 py-4">
                            {brand.image && (
                              <img
                                src={brand.image}
                                alt={brand.name}
                                className="h-10 w-10 rounded-lg object-cover"
                              />
                            )}
                          </td>
                          <td className="px-6 py-4 font-semibold text-slate-900">
                            {brand.name}
                          </td>
                          <td className="px-6 py-4">{brand.description}</td>
                          <td className="px-6 py-4">{brand.productCount}</td>
                          <td className="px-6 py-4">
                            <span
                              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                brand.status === "Active"
                                  ? "bg-emerald-100 text-emerald-700"
                                  : "bg-gray-100 text-gray-700"
                              }`}
                            >
                              {brand.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleOpenModal("view", brand)}
                                className="rounded-2xl bg-green-100 p-2 text-green-600 hover:bg-green-200"
                              >
                                <Eye className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleOpenModal("edit", brand)}
                                className="rounded-2xl bg-sky-100 p-2 text-sky-600 hover:bg-sky-200"
                              >
                                <Edit className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(brand.id)}
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
          <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-slate-900">
                {modal.mode === "add"
                  ? "Add Brand"
                  : modal.mode === "edit"
                    ? "Edit Brand"
                    : "View Brand"}
              </h2>
              <button
                onClick={handleCloseModal}
                className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {modal.mode === "view" ? (
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  {formData.image && (
                    <img
                      src={formData.image}
                      alt={formData.name}
                      className="h-20 w-20 rounded-lg object-cover"
                    />
                  )}
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      {formData.name}
                    </h3>
                    <p className="text-sm text-slate-500">
                      Products: {formData.productCount}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Description
                    </label>
                    <p className="mt-1 text-sm text-slate-900">
                      {formData.description}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Status
                    </label>
                    <p className="mt-1 text-sm text-slate-900">
                      {formData.status}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Brand Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                      placeholder="Enter brand name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={3}
                      className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                      placeholder="Enter brand description"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Status
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="mt-1 block w-full text-sm text-slate-500 file:mr-4 file:rounded-lg file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-indigo-700 hover:file:bg-indigo-100"
                    />
                    {formData.image && (
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="mt-2 h-20 w-20 rounded-lg object-cover"
                      />
                    )}
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="rounded-3xl border border-slate-300 px-6 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSave}
                    className="rounded-3xl bg-gradient-to-r from-indigo-600 to-sky-500 px-6 py-2 text-sm font-medium text-white hover:shadow-lg"
                  >
                    {modal.mode === "add" ? "Add Brand" : "Save Changes"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Brands;
