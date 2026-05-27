import React, { useState } from "react";
import { Edit2, Trash2, Plus } from "lucide-react";
import CRUDModal from "../CRUDModal/CRUDModal";
import category1 from "../../assets/categories/categories_1.png";
import category2 from "../../assets/categories/categories_2.png";
import category3 from "../../assets/categories/categories_3.png";
import category4 from "../../assets/categories/categories_4.png";

const CategoryCRUD = () => {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Electronics",
      image: category1,
      description: "All electronic devices",
      productCount: 45,
      active: true,
    },
    {
      id: 2,
      name: "Fashion",
      image: category2,
      description: "Clothing and accessories",
      productCount: 120,
      active: true,
    },
    {
      id: 3,
      name: "Home & Living",
      image: category3,
      description: "Home furniture and decor",
      productCount: 80,
      active: true,
    },
    {
      id: 4,
      name: "Sports & Outdoors",
      image: category4,
      description: "Sports equipment",
      productCount: 65,
      active: true,
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    description: "",
    productCount: 0,
    active: true,
  });

  const handleOpenModal = (category = null) => {
    if (category) {
      setFormData(category);
      setEditingId(category.id);
    } else {
      setFormData({
        name: "",
        image: "",
        description: "",
        productCount: 0,
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
      setCategories(
        categories.map((c) =>
          c.id === editingId ? { ...formData, id: editingId } : c,
        ),
      );
    } else {
      setCategories([...categories, { ...formData, id: Date.now() }]);
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setCategories(categories.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900">Categories</h3>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 rounded-lg bg-amber-600 px-4 py-2 text-white hover:bg-amber-700 transition"
        >
          <Plus size={20} />
          Add Category
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="rounded-lg border border-slate-200 bg-white shadow-sm overflow-hidden hover:shadow-md transition"
          >
            <img
              src={category.image}
              alt={category.name}
              className="h-40 w-full object-cover"
            />
            <div className="p-4">
              <h4 className="font-semibold text-slate-900">{category.name}</h4>
              <p className="text-sm text-slate-600 mt-1 line-clamp-2">
                {category.description}
              </p>
              <div className="mt-3 flex items-center justify-between text-sm">
                <span className="text-slate-600">
                  Products: <strong>{category.productCount}</strong>
                </span>
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold ${
                    category.active
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {category.active ? "Active" : "Inactive"}
                </span>
              </div>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => handleOpenModal(category)}
                  className="flex-1 flex items-center justify-center gap-1 bg-amber-50 text-amber-600 hover:bg-amber-100 py-2 rounded transition"
                >
                  <Edit2 size={16} />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(category.id)}
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
        title={editingId ? "Edit Category" : "Add New Category"}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-1">
              Category Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="Category name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-900 mb-1">
              Category Image URL *
            </label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="https://example.com/image.jpg"
            />
            {formData.image && (
              <img
                src={formData.image}
                alt="Preview"
                className="mt-2 h-24 w-full rounded-lg object-cover"
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
              className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="Category description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-900 mb-1">
              Product Count
            </label>
            <input
              type="number"
              name="productCount"
              value={formData.productCount}
              onChange={handleInputChange}
              min="0"
              className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="0"
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
              className="flex-1 bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700 transition font-medium"
            >
              {editingId ? "Update Category" : "Create Category"}
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

export default CategoryCRUD;
