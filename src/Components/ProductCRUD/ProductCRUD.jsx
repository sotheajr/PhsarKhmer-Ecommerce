import React, { useState } from "react";
import { Edit2, Trash2, Plus } from "lucide-react";
import CRUDModal from "../CRUDModal/CRUDModal";
import product1 from "../../assets/products/product_1.png";
import product2 from "../../assets/products/product_2.png";
import product3 from "../../assets/products/product_3.png";
import product4 from "../../assets/products/product_4.png";
import product5 from "../../assets/products/product_5.png";
import product6 from "../../assets/products/product_6.png";
import product7 from "../../assets/products/product_7.png";
import product8 from "../../assets/products/product_8.png";

const ProductCRUD = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Product 1",
      image: product1,
      category: "Electronics",
      price: 299.99,
      stock: 50,
      active: true,
    },
    {
      id: 2,
      name: "Product 2",
      image: product2,
      category: "Fashion",
      price: 199.99,
      stock: 75,
      active: true,
    },
    {
      id: 3,
      name: "Product 3",
      image: product3,
      category: "Home",
      price: 149.99,
      stock: 30,
      active: true,
    },
    {
      id: 4,
      name: "Product 4",
      image: product4,
      category: "Electronics",
      price: 399.99,
      stock: 20,
      active: true,
    },
    {
      id: 5,
      name: "Product 5",
      image: product5,
      category: "Fashion",
      price: 89.99,
      stock: 100,
      active: true,
    },
    {
      id: 6,
      name: "Product 6",
      image: product6,
      category: "Home",
      price: 129.99,
      stock: 45,
      active: true,
    },
    {
      id: 7,
      name: "Product 7",
      image: product7,
      category: "Electronics",
      price: 259.99,
      stock: 35,
      active: true,
    },
    {
      id: 8,
      name: "Product 8",
      image: product8,
      category: "Fashion",
      price: 159.99,
      stock: 60,
      active: true,
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    category: "",
    price: "",
    stock: "",
    active: true,
  });

  const handleOpenModal = (product = null) => {
    if (product) {
      setFormData(product);
      setEditingId(product.id);
    } else {
      setFormData({
        name: "",
        image: "",
        category: "",
        price: "",
        stock: "",
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
      setProducts(
        products.map((p) =>
          p.id === editingId ? { ...formData, id: editingId } : p,
        ),
      );
    } else {
      setProducts([...products, { ...formData, id: Date.now() }]);
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900">Products</h3>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 transition"
        >
          <Plus size={20} />
          Add Product
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="rounded-lg border border-slate-200 bg-white shadow-sm overflow-hidden hover:shadow-md transition"
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-40 w-full object-cover"
            />
            <div className="p-4">
              <h4 className="font-semibold text-slate-900 text-sm">
                {product.name}
              </h4>
              <p className="text-xs text-slate-600 mt-1">{product.category}</p>
              <div className="mt-2 flex items-center justify-between">
                <span className="font-bold text-indigo-600">
                  ${product.price}
                </span>
                <span className="text-xs bg-slate-100 px-2 py-1 rounded">
                  Stock: {product.stock}
                </span>
              </div>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => handleOpenModal(product)}
                  className="flex-1 flex items-center justify-center gap-1 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 py-2 rounded text-sm transition"
                >
                  <Edit2 size={14} />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="flex-1 flex items-center justify-center gap-1 bg-red-50 text-red-600 hover:bg-red-100 py-2 rounded text-sm transition"
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
        title={editingId ? "Edit Product" : "Add New Product"}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-1">
              Product Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Product name"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-1">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select category</option>
                <option value="Electronics">Electronics</option>
                <option value="Fashion">Fashion</option>
                <option value="Home">Home</option>
                <option value="Sports">Sports</option>
              </select>
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
                className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-1">
                Price *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
                step="0.01"
                min="0"
                className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-900 mb-1">
                Stock *
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                required
                min="0"
                className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="0"
              />
            </div>
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
              className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition font-medium"
            >
              {editingId ? "Update Product" : "Create Product"}
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

export default ProductCRUD;
