import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Search, Eye, X } from "lucide-react";
import AdminHeader from "../../Components/AdminHeader/AdminHeader";
import AdminSidebar from "../../Components/AdminSidebar/AdminSidebar";
import product1 from "../../assets/products/product_1.png";
import product2 from "../../assets/products/product_2.png";
import product3 from "../../assets/products/product_3.png";
import product4 from "../../assets/products/product_4.png";

const Products = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [modal, setModal] = useState({ open: false, mode: "add", data: null });
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    status: "Active",
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

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Comfy Chair",
      category: "Furniture",
      price: "$299",
      stock: 45,
      status: "Active",
      image: product1,
    },
    {
      id: 2,
      name: "Sofa Set",
      category: "Furniture",
      price: "$899",
      stock: 12,
      status: "Active",
      image: product2,
    },
    {
      id: 3,
      name: "Office Desk",
      category: "Furniture",
      price: "$450",
      stock: 0,
      status: "Out of Stock",
      image: product3,
    },
  ]);

  const handleOpenModal = (mode, product = null) => {
    setModal({ open: true, mode, data: product });
    if (mode === "add") {
      setFormData({
        name: "",
        category: "",
        price: "",
        stock: "",
        status: "Active",
        image: "",
      });
    } else {
      setFormData(product);
    }
  };

  const handleCloseModal = () => {
    setModal({ open: false, mode: "add", data: null });
    setFormData({
      name: "",
      category: "",
      price: "",
      stock: "",
      status: "Active",
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
      const newProduct = {
        id: Math.max(...products.map((p) => p.id), 0) + 1,
        ...formData,
      };
      setProducts([...products, newProduct]);
    } else {
      setProducts(products.map((p) => (p.id === modal.data.id ? formData : p)));
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div
      className={`h-screen overflow-hidden text-slate-900 ${isDarkMode ? "bg-slate-900" : "bg-slate-100"}`}
    >
      <div className="flex h-screen">
        <div className={`${sidebarOpen ? "block" : "hidden"} xl:block`}>
          <AdminSidebar isDark={isDarkMode} currentPath="/admin/products" />
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
                      Products
                    </h1>
                    <p className="mt-2 text-sm text-slate-500">
                      Manage your product inventory
                    </p>
                  </div>
                  <button
                    onClick={() => handleOpenModal("add")}
                    className="flex items-center gap-2 rounded-3xl bg-gradient-to-r from-indigo-600 to-sky-500 px-6 py-3 text-white hover:shadow-lg transition"
                  >
                    <Plus className="h-5 w-5" />
                    Add Product
                  </button>
                </div>

                <div className="mt-6 flex gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-3 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search products..."
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
                        <th className="px-6 py-4 font-medium">Product Name</th>
                        <th className="px-6 py-4 font-medium">Category</th>
                        <th className="px-6 py-4 font-medium">Price</th>
                        <th className="px-6 py-4 font-medium">Stock</th>
                        <th className="px-6 py-4 font-medium">Status</th>
                        <th className="px-6 py-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                      {products.map((product) => (
                        <tr key={product.id} className="hover:bg-slate-50">
                          <td className="px-6 py-4">
                            {product.image && (
                              <img
                                src={product.image}
                                alt={product.name}
                                className="h-10 w-10 rounded-lg object-cover"
                              />
                            )}
                          </td>
                          <td className="px-6 py-4 font-semibold text-slate-900">
                            {product.name}
                          </td>
                          <td className="px-6 py-4">{product.category}</td>
                          <td className="px-6 py-4">{product.price}</td>
                          <td className="px-6 py-4">{product.stock}</td>
                          <td className="px-6 py-4">
                            <span
                              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                product.status === "Active"
                                  ? "bg-emerald-100 text-emerald-700"
                                  : "bg-red-100 text-red-700"
                              }`}
                            >
                              {product.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleOpenModal("view", product)}
                                className="rounded-2xl bg-green-100 p-2 text-green-600 hover:bg-green-200"
                              >
                                <Eye className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleOpenModal("edit", product)}
                                className="rounded-2xl bg-sky-100 p-2 text-sky-600 hover:bg-sky-200"
                              >
                                <Edit className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(product.id)}
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
                  ? "Add Product"
                  : modal.mode === "edit"
                    ? "Edit Product"
                    : "View Product"}
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
                  <p className="text-xs text-slate-500">Product Name</p>
                  <p className="text-sm font-semibold text-slate-900">
                    {formData.name}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Category</p>
                  <p className="text-sm font-semibold text-slate-900">
                    {formData.category}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Price</p>
                  <p className="text-sm font-semibold text-slate-900">
                    {formData.price}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Stock</p>
                  <p className="text-sm font-semibold text-slate-900">
                    {formData.stock}
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-900">
                    Product Image
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
                    Product Name
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
                    Category
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-900">
                    Price
                  </label>
                  <input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-900">
                    Stock
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
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
                    <option value="Out of Stock">Out of Stock</option>
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

export default Products;
