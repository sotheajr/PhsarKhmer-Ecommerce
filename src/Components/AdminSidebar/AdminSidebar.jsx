import React from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  ShieldCheck,
  Activity,
  Users,
  Grid,
  Package,
  MessageSquare,
  Tag,
  Store,
  LogOut,
  X,
} from "lucide-react";

const sections = [
  {
    title: "Main",
    items: [
      { label: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
      { label: "Users", icon: Users, path: "/admin/users" },
      { label: "Products", icon: Package, path: "/admin/products" },
      { label: "Categories", icon: Tag, path: "/admin/categories" },
      { label: "Brands", icon: Store, path: "/admin/brands" },
      { label: "Features", icon: ShieldCheck, path: "/admin/features" },
      { label: "Delivery", icon: Activity, path: "/admin/delivery" },
      { label: "Orders", icon: Grid, path: "/admin/orders" },
      { label: "Messages", icon: MessageSquare, path: "/admin/messages" },
    ],
  },
];

const AdminSidebar = ({ sidebarOpen, onSidebarToggle, isDark = false }) => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/auth/login";
  };

  return (
    <>
      {/* ផ្ទាំងខ្មៅស្រអាប់ពីក្រោយ (Overlay) បង្ហាញតែលើ Mobile នៅពេល Sidebar បើក */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 xl:hidden"
          onClick={() => onSidebarToggle && onSidebarToggle(false)}
        />
      )}

      {/* 🛠️ កូដ aside នេះធានាថានឹងស្លាយចេញមកពី Left to Right យ៉ាង Smooth */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-72 flex flex-col shadow-2xl transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          xl:static xl:translate-x-0
          ${isDark ? "bg-slate-800 text-slate-100" : "bg-slate-950 text-slate-100"}`}
      >
        {/* HEADER របស់ Sidebar */}
        <div className="flex items-center justify-between border-b px-6 py-6 border-white/10">
          <div className="flex items-center gap-3">
            <div className="grid h-14 w-14 place-items-center rounded-3xl bg-gradient-to-br from-indigo-600 to-sky-500 text-xl font-semibold text-white">
              TA
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-slate-500">
                TailAdmin
              </p>
              <h2 className="text-xl font-semibold">Dashboard</h2>
            </div>
          </div>

          {/* ប៊ូតុងបិទ "X" បង្ហាញតែលើ Mobile */}
          <button
            onClick={() => onSidebarToggle && onSidebarToggle(false)}
            className="xl:hidden p-2 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* MENU */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          {sections.map((section) => (
            <div key={section.title} className="mb-7">
              <p className="mb-4 text-xs uppercase tracking-[0.3em] text-slate-500">
                {section.title}
              </p>

              <div className="space-y-2">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.label}
                      to={item.path}
                      className="flex items-center gap-3 rounded-3xl px-4 py-3 text-sm text-slate-400 hover:bg-slate-800 hover:text-white"
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div className="border-t px-6 py-5 border-white/10">
          <div className="rounded-3xl p-4 text-sm text-slate-300 bg-slate-900 mb-4">
            <p className="text-sm font-semibold text-white">Need help?</p>
            <p className="mt-2 text-sm text-slate-400">
              Contact support or review your dashboard settings.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full rounded-3xl bg-red-500 hover:bg-red-600 py-3 text-sm text-white"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
