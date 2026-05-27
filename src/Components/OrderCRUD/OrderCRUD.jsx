import React, { useState } from "react";
import { Edit2, Trash2, Plus, Eye } from "lucide-react";
import CRUDModal from "../CRUDModal/CRUDModal";

const OrderCRUD = () => {
  const [orders, setOrders] = useState([
    {
      id: 1001,
      orderNumber: "#ORD-001",
      customer: "John Doe",
      total: 299.99,
      status: "pending",
      date: "2024-01-15",
      items: 3,
    },
    {
      id: 1002,
      orderNumber: "#ORD-002",
      customer: "Jane Smith",
      total: 149.99,
      status: "completed",
      date: "2024-01-14",
      items: 2,
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    orderNumber: "",
    customer: "",
    total: "",
    status: "pending",
    date: "",
    items: 1,
  });

  const handleOpenModal = (order = null) => {
    if (order) {
      setFormData(order);
      setEditingId(order.id);
    } else {
      setFormData({
        orderNumber: `#ORD-${String(orders.length + 1).padStart(3, "0")}`,
        customer: "",
        total: "",
        status: "pending",
        date: new Date().toISOString().split("T")[0],
        items: 1,
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
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setOrders(
        orders.map((o) =>
          o.id === editingId ? { ...formData, id: editingId } : o,
        ),
      );
    } else {
      setOrders([...orders, { ...formData, id: Date.now() }]);
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      setOrders(orders.filter((o) => o.id !== id));
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-700",
      processing: "bg-blue-100 text-blue-700",
      completed: "bg-green-100 text-green-700",
      cancelled: "bg-red-100 text-red-700",
    };
    return colors[status] || "bg-gray-100 text-gray-700";
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900">Orders</h3>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-white hover:bg-purple-700 transition"
        >
          <Plus size={20} />
          Add Order
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-slate-200">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-slate-900">
                Order #
              </th>
              <th className="px-4 py-3 text-left font-semibold text-slate-900">
                Customer
              </th>
              <th className="px-4 py-3 text-left font-semibold text-slate-900">
                Date
              </th>
              <th className="px-4 py-3 text-left font-semibold text-slate-900">
                Items
              </th>
              <th className="px-4 py-3 text-left font-semibold text-slate-900">
                Total
              </th>
              <th className="px-4 py-3 text-left font-semibold text-slate-900">
                Status
              </th>
              <th className="px-4 py-3 text-center font-semibold text-slate-900">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-slate-200 hover:bg-slate-50"
              >
                <td className="px-4 py-3 text-slate-900 font-semibold">
                  {order.orderNumber}
                </td>
                <td className="px-4 py-3 text-slate-600">{order.customer}</td>
                <td className="px-4 py-3 text-slate-600">{order.date}</td>
                <td className="px-4 py-3 text-slate-600">{order.items}</td>
                <td className="px-4 py-3 text-slate-900 font-semibold">
                  ${order.total}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusColor(
                      order.status,
                    )}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleOpenModal(order)}
                      className="p-2 hover:bg-purple-100 text-purple-600 rounded transition"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(order.id)}
                      className="p-2 hover:bg-red-100 text-red-600 rounded transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CRUDModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingId ? "Edit Order" : "Add New Order"}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-1">
                Order Number *
              </label>
              <input
                type="text"
                name="orderNumber"
                value={formData.orderNumber}
                onChange={handleInputChange}
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="#ORD-001"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-900 mb-1">
                Date *
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-1">
                Customer *
              </label>
              <input
                type="text"
                name="customer"
                value={formData.customer}
                onChange={handleInputChange}
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Customer name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-900 mb-1">
                Number of Items *
              </label>
              <input
                type="number"
                name="items"
                value={formData.items}
                onChange={handleInputChange}
                required
                min="1"
                className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-1">
                Total Amount *
              </label>
              <input
                type="number"
                name="total"
                value={formData.total}
                onChange={handleInputChange}
                required
                step="0.01"
                min="0"
                className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-900 mb-1">
                Status *
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition font-medium"
            >
              {editingId ? "Update Order" : "Create Order"}
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

export default OrderCRUD;
