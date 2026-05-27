import React, { useState } from "react";
import { Edit2, Trash2, Plus } from "lucide-react";
import CRUDModal from "../CRUDModal/CRUDModal";
import brand1 from "../../assets/brands/brand_1.png";
import brand2 from "../../assets/brands/brand_2.png";
import brand3 from "../../assets/brands/brand_3.png";
import brand4 from "../../assets/brands/brand_4.png";
import brand5 from "../../assets/brands/brand_5.png";

const BrandCRUD = () => {
  const [brands, setBrands] = useState([
    {
      id: 1,
      name: "Brand 1",
      logo: brand1,
      description: "Premium quality products",
      active: true,
    },
    {
      id: 2,
      name: "Brand 2",
      logo: brand2,
      description: "Trusted brand",
      active: true,
    },
    {
      id: 3,
      name: "Brand 3",
      logo: brand3,
      description: "Best seller",
      active: true,
    },
    {
      id: 4,
      name: "Brand 4",
      logo: brand4,
      description: "Customer favorite",
      active: true,
    },
    {
      id: 5,
      name: "Brand 5",
      logo: brand5,
      description: "Excellence in quality",
      active: true,
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    logo: "",
    description: "",
    active: true,
  });

  const handleOpenModal = (brand = null) => {
    if (brand) {
      setFormData(brand);
      setEditingId(brand.id);
    } else {
      setFormData({
        name: "",
        logo: "",
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
      setBrands(
        brands.map((b) =>
          b.id === editingId ? { ...formData, id: editingId } : b,
        ),
      );
    } else {
      setBrands([...brands, { ...formData, id: Date.now() }]);
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this brand?")) {
      setBrands(brands.filter((b) => b.id !== id));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900">Brands</h3>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 rounded-lg bg-pink-600 px-4 py-2 text-white hover:bg-pink-700 transition"
        >
          <Plus size={20} />
          Add Brand
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {brands.map((brand) => (
          <div
            key={brand.id}
            className="rounded-lg border border-slate-200 bg-white shadow-sm p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <img
                src={brand.logo}
                alt={brand.name}
                className="h-16 w-16 rounded-lg object-cover bg-slate-100"
              />
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  brand.active
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {brand.active ? "Active" : "Inactive"}
              </span>
            </div>
            <h4 className="font-semibold text-slate-900">{brand.name}</h4>
            <p className="text-sm text-slate-600 mt-2">{brand.description}</p>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => handleOpenModal(brand)}
                className="flex-1 flex items-center justify-center gap-1 bg-pink-50 text-pink-600 hover:bg-pink-100 py-2 rounded transition"
              >
                <Edit2 size={16} />
                Edit
              </button>
              <button
                onClick={() => handleDelete(brand.id)}
                className="flex-1 flex items-center justify-center gap-1 bg-red-50 text-red-600 hover:bg-red-100 py-2 rounded transition"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <CRUDModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingId ? "Edit Brand" : "Add New Brand"}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-1">
              Brand Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Brand name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-900 mb-1">
              Logo URL *
            </label>
            <input
              type="url"
              name="logo"
              value={formData.logo}
              onChange={handleInputChange}
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="https://example.com/logo.png"
            />
            {formData.logo && (
              <img
                src={formData.logo}
                alt="Preview"
                className="mt-2 h-20 w-20 rounded-lg object-cover"
              />
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-900 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="3"
              className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Brand description"
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
              className="flex-1 bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition font-medium"
            >
              {editingId ? "Update Brand" : "Create Brand"}
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

export default BrandCRUD;
