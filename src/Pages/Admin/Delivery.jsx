import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Search } from "lucide-react";
import AdminHeader from "../../Components/AdminHeader/AdminHeader";
import AdminSidebar from "../../Components/AdminSidebar/AdminSidebar";

const Delivery = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [search, setSearch] = useState("");

  const deliveryServices = ["Grab", "Wownow", "Panda", "PassApp", "GoFast"];

  const [deliveries, setDeliveries] = useState([
    {
      id: 1,
      deliveryId: "D001",
      deliveryName: "Fast Delivery",
      deliveryService: "Grab",
      productName: "Laptop",
      qtyProduct: 1,
      status: "Active",
    },
    {
      id: 2,
      deliveryId: "D002",
      deliveryName: "Standard Delivery",
      deliveryService: "Wownow",
      productName: "Phone",
      qtyProduct: 2,
      status: "Active",
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    deliveryId: "",
    deliveryName: "",
    deliveryService: "",
    productName: "",
    qtyProduct: "",
    status: "Active",
  });

  useEffect(() => {
    document.body.style.overflow = modalOpen ? "hidden" : "auto";
  }, [modalOpen]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    setEditingId(null);
    setFormData({
      deliveryId: "",
      deliveryName: "",
      deliveryService: "",
      productName: "",
      qtyProduct: "",
      status: "Active",
    });
    setModalOpen(true);
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData(item);
    setModalOpen(true);
  };

  const handleSave = () => {
    if (Object.values(formData).some((v) => v === "")) return;

    if (editingId) {
      setDeliveries((prev) =>
        prev.map((d) =>
          d.id === editingId ? { ...formData, id: editingId } : d,
        ),
      );
    } else {
      setDeliveries((prev) => [...prev, { ...formData, id: Date.now() }]);
    }

    setModalOpen(false);
  };

  const handleDelete = (id) => {
    setDeliveries((prev) => prev.filter((d) => d.id !== id));
  };

  const filtered = deliveries.filter((d) =>
    d.deliveryName.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />

      <div className="flex">
        <AdminSidebar isOpen={sidebarOpen} />

        <main className="flex-1 p-6">
          <div className="bg-white rounded-2xl shadow p-6">
            {/* HEADER */}
            <div className="flex justify-between mb-4">
              <div className="relative w-full md:w-1/2">
                <Search
                  className="absolute left-3 top-2.5 text-gray-400"
                  size={16}
                />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search delivery..."
                  className="w-full pl-9 pr-3 py-2 rounded-full bg-gray-100 focus:outline-none"
                />
              </div>

              <button
                onClick={handleAdd}
                className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-full"
              >
                <Plus size={18} />
                Add
              </button>
            </div>

            {/* TABLE (NO BORDER) */}
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-600">
                  <th className="p-3 text-left">ID</th>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Service</th>
                  <th className="p-3 text-left">Product</th>
                  <th className="p-3 text-left">Qty</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((d) => (
                  <tr key={d.id} className="hover:bg-gray-50">
                    <td className="p-3">{d.deliveryId}</td>
                    <td className="p-3 font-medium text-blue-600">
                      {d.deliveryName}
                    </td>
                    <td className="p-3">{d.deliveryService}</td>
                    <td className="p-3">{d.productName}</td>
                    <td className="p-3">{d.qtyProduct}</td>
                    <td className="p-3">{d.status}</td>

                    <td className="p-3">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleEdit(d)}
                          className="p-2 bg-blue-100 rounded-full"
                        >
                          <Edit2 size={14} />
                        </button>

                        <button
                          onClick={() => handleDelete(d.id)}
                          className="p-2 bg-red-100 rounded-full"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {/* MODAL (NO BORDER INPUT) */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl w-[500px] shadow-lg">
            <h2 className="text-lg font-bold mb-4">
              {editingId ? "Edit Delivery" : "Add Delivery"}
            </h2>

            <div className="grid grid-cols-2 gap-3">
              <input
                name="deliveryId"
                value={formData.deliveryId}
                onChange={handleInputChange}
                className="p-2 bg-gray-100 rounded focus:outline-none"
                placeholder="ID"
              />

              <input
                name="deliveryName"
                value={formData.deliveryName}
                onChange={handleInputChange}
                className="p-2 bg-gray-100 rounded focus:outline-none"
                placeholder="Name"
              />

              <select
                name="deliveryService"
                value={formData.deliveryService}
                onChange={handleInputChange}
                className="p-2 bg-gray-100 rounded focus:outline-none"
              >
                <option value="">Service</option>
                {deliveryServices.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>

              <input
                name="productName"
                value={formData.productName}
                onChange={handleInputChange}
                className="p-2 bg-gray-100 rounded focus:outline-none"
                placeholder="Product"
              />

              <input
                name="qtyProduct"
                value={formData.qtyProduct}
                onChange={handleInputChange}
                className="p-2 bg-gray-100 rounded focus:outline-none"
                placeholder="Qty"
              />

              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="p-2 bg-gray-100 rounded focus:outline-none"
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setModalOpen(false)}
                className="flex-1 bg-gray-400 text-white py-2 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="flex-1 bg-blue-600 text-white py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Delivery;
