import React from "react";
import { Menu } from "lucide-react";

const AdminHeader = ({ onSidebarToggle }) => {
  return (
    <header className="flex items-center justify-between bg-white px-6 py-4 shadow-sm border-b border-gray-200">
      <div className="flex items-center gap-4">
        <button
          onClick={onSidebarToggle}
          className="xl:hidden p-3 text-gray-700 bg-white border border-gray-200 rounded-full shadow-md hover:bg-gray-50 transition-all active:scale-95 flex items-center justify-center"
          aria-label="Open Sidebar"
        >
          <Menu className="w-6 h-6" />
        </button>

        <h1 className="text-lg font-semibold text-gray-800 hidden sm:block">
          Overview
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-medium text-sm">
            AD
          </div>
          <span className="text-sm font-medium text-gray-700 hidden md:block">
            Admin User
          </span>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
