import React, { useState } from "react";
import { Edit2, Trash2, Plus, Eye } from "lucide-react";
import CRUDModal from "../CRUDModal/CRUDModal";
import bannerImage from "../../assets/Banner/banner_image.png";

const BannerCRUD = () => {
  const [banners, setBanners] = useState([
    {
      id: 1,
      title: "Summer Sale",
      description: "Get 50% off on all items",
      image: bannerImage,
      active: true,
      order: 1,
    },
    {
      id: 2,
      title: "New Arrivals",
      description: "Check out our latest products",
      image: bannerImage,
      active: true,
      order: 2,
    },
    {
      id: 3,
      title: " clearance Sale",
      description: "Up to 70% off selected items",
      image: bannerImage,
      active: true,
      order: 3,
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    active: true,
    order: 1,
  });

  const handleOpenModal = (banner = null) => {
    if (banner) {
      setFormData(banner);
      setEditingId(banner.id);
    } else {
      setFormData({
        title: "",
        description: "",
        image: "",
        active: true,
        order: banners.length + 1,
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
      setBanners(
        banners.map((b) =>
          b.id === editingId ? { ...formData, id: editingId } : b,
        ),
      );
    } else {
      setBanners([...banners, { ...formData, id: Date.now() }]);
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this banner?")) {
      setBanners(banners.filter((b) => b.id !== id));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900">Banners</h3>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
        >
          <Plus size={20} />
          Add Banner
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {banners.map((banner) => (
          <div
            key={banner.id}
            className="rounded-lg border border-slate-200 bg-white shadow-sm overflow-hidden"
          >
            <img
              src={banner.image}
              alt={banner.title}
              className="h-40 w-full object-cover"
            />
            <div className="p-4">
              <h4 className="font-semibold text-slate-900">{banner.title}</h4>
              <p className="text-sm text-slate-600 mt-1">
                {banner.description}
              </p>
              <div className="mt-3 flex items-center justify-between">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    banner.active
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {banner.active ? "Active" : "Inactive"}
                </span>
              </div>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => handleOpenModal(banner)}
                  className="flex-1 flex items-center justify-center gap-1 bg-blue-50 text-blue-600 hover:bg-blue-100 py-2 rounded transition"
                >
                  <Edit2 size={16} />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(banner.id)}
                  className="flex-1 flex items-center justify-center gap-1 bg-red-50 text-red-600 hover:bg-red-100 py-2 rounded transition"
                >
                  <Trash2 size={16} />
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
        title={editingId ? "Edit Banner" : "Add New Banner"}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-1">
              Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Banner title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-900 mb-1">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows="3"
              className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Banner description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-900 mb-1">
              Image URL *
            </label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-900 mb-1">
              Order
            </label>
            <input
              type="number"
              name="order"
              value={formData.order}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="1"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="active"
              name="active"
              checked={formData.active}
              onChange={handleInputChange}
              className="h-4 w-4 rounded border-slate-300"
            />
            <label htmlFor="active" className="text-sm text-slate-700">
              Active
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium"
            >
              {editingId ? "Update Banner" : "Create Banner"}
            </button>
            <button
              type="button"
              onClick={handleCloseModal}
              className="flex-1 bg-slate-200 text-slate-900 py-2 rounded-lg hover:bg-slate-300 transition font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </CRUDModal>
    </div>
  );
};

export default BannerCRUD;
