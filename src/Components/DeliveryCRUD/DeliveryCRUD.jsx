import React, { useState } from "react";
import { Edit2, Trash2, Plus } from "lucide-react";
import CRUDModal from "../CRUDModal/CRUDModal";
import product1 from "../../assets/products/product_1.png";
import product2 from "../../assets/products/product_2.png";
import product3 from "../../assets/products/product_3.png";
import product4 from "../../assets/products/product_4.png";

const DeliveryCRUD = () => {
  const [deliveries, setDeliveries] = useState([
    {
      id: 1,
      name: "Standard Delivery",
      image: product1,
      description: "Delivery within 3-5 business days",
      cost: 5.99,
      active: true,
    },
    {
      id: 2,
      name: "Express Delivery",
      image: product2,
      description: "Delivery within 1-2 business days",
      cost: 12.99,
      active: true,
    },
    {
      id: 3,
      name: "Overnight Delivery",
      image: product3,
      description: "Next day delivery",
      cost: 19.99,
      active: true,
    },
    {
      id: 4,
      name: "Free Delivery",
      image: product4,
      description: "Free delivery on orders over $100",
      cost: 0,
      active: true,
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    description: "",
    cost: 0,
    active: true,
  });

  const handleOpenModal = (delivery = null) => {
    if (delivery) {
      setFormData(delivery);
      setEditingId(delivery.id);
    } else {
      setFormData({
        name: "",
        image: "",
        description: "",
        cost: 0,
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
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
            ? parseFloat(value)
            : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setDeliveries(
        deliveries.map((d) =>
          d.id === editingId ? { ...formData, id: editingId } : d,
        ),
      );
    } else {
      setDeliveries([...deliveries, { ...formData, id: Date.now() }]);
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (
      window.confirm("Are you sure you want to delete this delivery option?")
    ) {
      setDeliveries(deliveries.filter((d) => d.id !== id));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900">
          Delivery Options
        </h3>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 rounded-lg bg-amber-600 px-4 py-2 text-white hover:bg-amber-700 transition"
        >
          <Plus size={20} />
          Add Delivery Option
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {deliveries.map((delivery) => (
          <div
            key={delivery.id}
            className="rounded-lg border border-slate-200 bg-white shadow-sm overflow-hidden hover:shadow-md transition"
          >
            <img
              src={delivery.image}
              alt={delivery.name}
              className="h-40 w-full object-cover"
            />
            <div className="p-4">
              <h4 className="font-semibold text-slate-900">{delivery.name}</h4>
              <p className="text-sm text-slate-600 mt-1 line-clamp-2">
                {delivery.description}
              </p>
              <div className="mt-3 flex items-center justify-between text-sm">
                <span className="text-slate-600">
                  Cost: <strong>${delivery.cost.toFixed(2)}</strong>
                </span>
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold ${
                    delivery.active
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {delivery.active ? "Active" : "Inactive"}
                </span>
              </div>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => handleOpenModal(delivery)}
                  className="flex items-center gap-1 rounded bg-blue-50 px-3 py-1 text-sm text-blue-600 hover:bg-blue-100 transition"
                >
                  <Edit2 size={14} />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(delivery.id)}
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
        title={editingId ? "Edit Delivery Option" : "Add Delivery Option"}
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
              Cost ($)
            </label>
            <input
              type="number"
              name="cost"
              value={formData.cost}
              onChange={handleInputChange}
              step="0.01"
              min="0"
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

export default DeliveryCRUD;
