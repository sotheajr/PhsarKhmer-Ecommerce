import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Search, Eye, X } from "lucide-react";
import AdminHeader from "../../Components/AdminHeader/AdminHeader";
import AdminSidebar from "../../Components/AdminSidebar/AdminSidebar";
import feature1 from "../../assets/features/product_1.png";
import feature2 from "../../assets/features/product_2.png";
import feature3 from "../../assets/features/product_3.png";
import feature4 from "../../assets/features/product_4.png";

const Features = () => {
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

  const [features, setFeatures] = useState([
    {
      id: 1,
      name: "Free Shipping",
      description: "Free shipping on all orders",
      status: "Active",
      image: feature1,
    },
    {
      id: 2,
      name: "24/7 Support",
      description: "Round the clock customer support",
      status: "Active",
      image: feature2,
    },
    {
      id: 3,
      name: "Secure Payment",
      description: "100% secure payment processing",
      status: "Active",
      image: feature3,
    },
    {
      id: 4,
      name: "Quality Guarantee",
      description: "High quality products guaranteed",
      status: "Active",
      image: feature4,
    },
  ]);

  const handleOpenModal = (mode, feature = null) => {
    setModal({ open: true, mode, data: feature });
    if (mode === "add") {
      setFormData({
        name: "",
        description: "",
        image: "",
        status: "Active",
      });
    } else {
      setFormData(feature);
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
      setFeatures([...features, { ...formData, id: Date.now() }]);
    } else {
      setFeatures(
        features.map((f) =>
          f.id === modal.data.id ? { ...formData, id: f.id } : f,
        ),
      );
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    setFeatures(features.filter((f) => f.id !== id));
  };

  const filteredFeatures = features.filter((feature) =>
    feature.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminHeader
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />
      <div className="flex">
        <AdminSidebar isOpen={sidebarOpen} />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-slate-900">
                Features Management
              </h1>
              <p className="text-slate-600 mt-2">
                Manage your website features
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-slate-200">
              <div className="p-6 border-b border-slate-200">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="relative flex-1 max-w-md">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                      <input
                        type="text"
                        placeholder="Search features..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => handleOpenModal("add")}
                    className="flex items-center gap-2 bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                    Add Feature
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filteredFeatures.map((feature) => (
                    <div
                      key={feature.id}
                      className="bg-white border border-slate-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <img
                        src={feature.image}
                        alt={feature.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-semibold text-slate-900 mb-2">
                          {feature.name}
                        </h3>
                        <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                          {feature.description}
                        </p>
                        <div className="flex items-center justify-between mb-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              feature.status === "Active"
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {feature.status}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleOpenModal("edit", feature)}
                            className="flex-1 flex items-center justify-center gap-1 bg-blue-50 text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-100 transition-colors text-sm"
                          >
                            <Edit className="h-4 w-4" />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(feature.id)}
                            className="flex-1 flex items-center justify-center gap-1 bg-red-50 text-red-600 px-3 py-2 rounded-lg hover:bg-red-100 transition-colors text-sm"
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {modal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-slate-900">
                  {modal.mode === "add" ? "Add Feature" : "Edit Feature"}
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    placeholder="Enter feature name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    placeholder="Enter feature description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                  {formData.image && (
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="mt-2 w-full h-32 object-cover rounded-lg"
                    />
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleCloseModal}
                  className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
                >
                  {modal.mode === "add" ? "Add Feature" : "Update Feature"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Features;
