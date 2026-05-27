import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

import AdminSidebar from "../Components/AdminSidebar/AdminSidebar";
import AdminHeader from "../Components/AdminHeader/AdminHeader";

const AdminLayout = () => {
  // កំណត់តម្លៃដំបូង៖ បើអេក្រង់ធំជាង 1280px (xl) ឱ្យបើក បើលើទូរស័ព្ទឱ្យបិទ (false)
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1280);

  // តាមដានការផ្លាស់ប្ដូរទំហំអេក្រង់ (Resize) ដើម្បីបិទបើក Sidebar អូតូ
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* 🛠️ ហៅប្រើប្រាស់ AdminSidebar ដោយផ្ទាល់ (គ្មាន div ណាផ្សេងមកបិទបាំងលាក់វាទៀតទេ) */}
      <AdminSidebar
        sidebarOpen={sidebarOpen}
        onSidebarToggle={(value) => setSidebarOpen(value)}
      />

      {/* Content Area */}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
        {/* Header - បញ្ជូន Function ទៅប្តូរតម្លៃ state បិទបើក (!sidebarOpen) */}
        <AdminHeader onSidebarToggle={() => setSidebarOpen(!sidebarOpen)} />

        {/* Page Main Content */}
        <main className="flex-1 p-4 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
