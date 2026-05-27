import React, { useState } from "react";
import { Edit2, Trash2, Plus } from "lucide-react";
import CRUDModal from "../CRUDModal/CRUDModal";
import feature1 from "../../assets/features/product_1.png";
import feature2 from "../../assets/features/product_2.png";
import feature3 from "../../assets/features/product_3.png";
import feature4 from "../../assets/features/product_4.png";

const FeaturesCRUD = () => {
  const [features, setFeatures] = useState([
    {
      id: 1,
      name: "Free Shipping",
      image: feature1,
      description: "Free shipping on all orders",
      active: true,
    },
    {
      id: 2,
      name: "24/7 Support",
      image: feature2,
      description: "Round the clock customer support",
      active: true,
    },
    {
      id: 3,
      name: "Secure Payment",
      image: feature3,
      description: "100% secure payment processing",
      active: true,
    },
    {
      id: 4,
      name: "Quality Guarantee",
      image: feature4,
      description: "High quality products guaranteed",
      active: true,
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    description: "",
    active: true,
  });

  const handleOpenModal = (feature = null) => {
    if (feature) {
      setFormData(feature);
      setEditingId(feature.id);
    } else {
      setFormData({
        name: "",
        image: "",
        description: "",
        active: true,
      });
      setEditingId(null);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setFeatures(
        features.map((f) =>
          f.id === editingId ? { ...formData, id: editingId } : f,
        ),
      );
    } else {
      setFeatures([...features, { ...formData, id: Date.now() }]);
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this feature?")) {
      setFeatures(features.filter((f) => f.id !== id));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900">Features</h3>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 rounded-lg bg-amber-600 px-4 py-2 text-white hover:bg-amber-700 transition"
        >
          <Plus size={20} />
          Add Feature
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="rounded-lg border border-slate-200 bg-white shadow-sm overflow-hidden hover:shadow-md transition"
          >
            <img
              src={feature.image}
              alt={feature.name}
              className="h-40 w-full object-cover"
            />
            <div className="p-4">
              <h4 className="font-semibold text-slate-900">{feature.name}</h4>
              <p className="text-sm text-slate-600 mt-1 line-clamp-2">
                {feature.description}
              </p>
              <div className="mt-3 flex items-center justify-between text-sm">
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold ${
                    feature.active
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {feature.active ? "Active" : "Inactive"}
                </span>
              </div>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => handleOpenModal(feature)}
                  className="flex items-center gap-1 rounded bg-blue-50 px-3 py-1 text-sm text-blue-600 hover:bg-blue-100 transition"
                >
                  <Edit2 size={14} />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(feature.id)}
                  className="flex items-center gap-1 rounded bg-red-50 px-3 py-1 text-sm text-red-600 hover:bg-red-100 transition"
                >
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <CRUDModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingId ? "Edit Feature" : "Add Feature"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              required
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
              className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Image URL
            </label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              required
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="active"
              checked={formData.active}
              onChange={handleInputChange}
              className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-slate-300 rounded"
            />
            <label className="ml-2 block text-sm text-slate-700">Active</label>
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={handleCloseModal}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-700 transition"
            >
              {editingId ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </CRUDModal>
    </div>
  );
};

export default FeaturesCRUD;
