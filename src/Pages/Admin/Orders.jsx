import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Search, Eye, X } from "lucide-react";
import AdminHeader from "../../Components/AdminHeader/AdminHeader";
import AdminSidebar from "../../Components/AdminSidebar/AdminSidebar";
import product1 from "../../assets/products/product_1.png";
import product2 from "../../assets/products/product_2.png";
import product3 from "../../assets/products/product_3.png";
import product4 from "../../assets/products/product_4.png";

const Orders = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [modal, setModal] = useState({ open: false, mode: "add", data: null });
  const [formData, setFormData] = useState({
    customer: "",
    items: "",
    total: "",
    date: "",
    status: "Pending",
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

  const [orders, setOrders] = useState([
    {
      id: "ORD-001",
      customer: "John Doe",
      items: 3,
      total: "$1,250",
      date: "2024-03-15",
      status: "Delivered",
      image: product1,
    },
    {
      id: "ORD-002",
      customer: "Jane Smith",
      items: 2,
      total: "$850",
      date: "2024-03-14",
      status: "Processing",
      image: product2,
    },
    {
      id: "ORD-003",
      customer: "Bob Johnson",
      items: 5,
      total: "$2,100",
      date: "2024-03-13",
      status: "Shipped",
      image: product3,
    },
    {
      id: "ORD-004",
      customer: "Alice Brown",
      items: 1,
      total: "$450",
      date: "2024-03-12",
      status: "Pending",
      image: product4,
    },
  ]);

  const handleOpenModal = (mode, order = null) => {
    setModal({ open: true, mode, data: order });
    if (mode === "add") {
      setFormData({
        customer: "",
        items: "",
        total: "",
        date: "",
        status: "Pending",
        image: "",
      });
    } else {
      setFormData(order);
    }
  };

  const handleCloseModal = () => {
    setModal({ open: false, mode: "add", data: null });
    setFormData({
      customer: "",
      items: "",
      total: "",
      date: "",
      status: "Pending",
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
      const newOrder = {
        id: `ORD-${String(Math.max(...orders.map((o) => parseInt(o.id.split("-")[1])), 0) + 1).padStart(3, "0")}`,
        ...formData,
      };
      setOrders([...orders, newOrder]);
    } else {
      setOrders(orders.map((o) => (o.id === modal.data.id ? formData : o)));
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    setOrders(orders.filter((order) => order.id !== id));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-emerald-100 text-emerald-700";
      case "Processing":
        return "bg-blue-100 text-blue-700";
      case "Shipped":
        return "bg-purple-100 text-purple-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div
      className={`h-screen overflow-hidden text-slate-900 ${isDarkMode ? "bg-slate-900" : "bg-slate-100"}`}
    >
      <div className="flex h-screen">
        <div className={`${sidebarOpen ? "block" : "hidden"} xl:block`}>
          <AdminSidebar isDark={isDarkMode} currentPath="/admin/orders" />
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
                      Orders
                    </h1>
                    <p className="mt-2 text-sm text-slate-500">
                      Manage customer orders
                    </p>
                  </div>
                  <button
                    onClick={() => handleOpenModal("add")}
                    className="flex items-center gap-2 rounded-3xl bg-gradient-to-r from-indigo-600 to-sky-500 px-6 py-3 text-white hover:shadow-lg transition"
                  >
                    <Plus className="h-5 w-5" />
                    New Order
                  </button>
                </div>

                <div className="mt-6 flex gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-3 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search orders..."
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
                        <th className="px-6 py-4 font-medium">Order ID</th>
                        <th className="px-6 py-4 font-medium">Customer</th>
                        <th className="px-6 py-4 font-medium">Items</th>
                        <th className="px-6 py-4 font-medium">Total</th>
                        <th className="px-6 py-4 font-medium">Date</th>
                        <th className="px-6 py-4 font-medium">Status</th>
                        <th className="px-6 py-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                      {orders.map((order) => (
                        <tr key={order.id} className="hover:bg-slate-50">
                          <td className="px-6 py-4">
                            {order.image && (
                              <img
                                src={order.image}
                                alt={order.customer}
                                className="h-10 w-10 rounded-lg object-cover"
                              />
                            )}
                          </td>
                          <td className="px-6 py-4 font-semibold text-slate-900">
                            {order.id}
                          </td>
                          <td className="px-6 py-4">{order.customer}</td>
                          <td className="px-6 py-4">{order.items}</td>
                          <td className="px-6 py-4 font-semibold">
                            {order.total}
                          </td>
                          <td className="px-6 py-4">{order.date}</td>
                          <td className="px-6 py-4">
                            <span
                              className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(order.status)}`}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleOpenModal("view", order)}
                                className="rounded-2xl bg-green-100 p-2 text-green-600 hover:bg-green-200"
                              >
                                <Eye className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleOpenModal("edit", order)}
                                className="rounded-2xl bg-sky-100 p-2 text-sky-600 hover:bg-sky-200"
                              >
                                <Edit className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(order.id)}
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
                  ? "Add Order"
                  : modal.mode === "edit"
                    ? "Edit Order"
                    : "View Order"}
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
                      alt={formData.customer}
                      className="h-20 w-20 rounded-lg object-cover"
                    />
                  )}
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      {formData.customer}
                    </h3>
                    <p className="text-sm text-slate-500">
                      Order ID: {formData.id}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Items
                    </label>
                    <p className="mt-1 text-sm text-slate-900">
                      {formData.items}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Total
                    </label>
                    <p className="mt-1 text-sm text-slate-900">
                      {formData.total}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Date
                    </label>
                    <p className="mt-1 text-sm text-slate-900">
                      {formData.date}
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
                      Customer
                    </label>
                    <input
                      type="text"
                      name="customer"
                      value={formData.customer}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                      placeholder="Enter customer name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Items
                    </label>
                    <input
                      type="number"
                      name="items"
                      value={formData.items}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                      placeholder="Number of items"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Total
                    </label>
                    <input
                      type="text"
                      name="total"
                      value={formData.total}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                      placeholder="Total amount"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
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
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
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
                    {modal.mode === "add" ? "Add Order" : "Save Changes"}
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

export default Orders;
