import React, { useState } from "react";
import AdminSidebar from "../../Components/AdminSidebar/AdminSidebar";
import AdminHeader from "../../Components/AdminHeader/AdminHeader";

const dummyUsers = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Sok Dara" },
  { id: 3, name: "Visitor 123" },
  { id: 4, name: "Lucky Customer" },
  { id: 5, name: "Support Ticket #5521" },
];
const dummyMessages = {
  1: [
    { id: 1, sender: "user", text: "Hello admin!" },
    { id: 2, sender: "admin", text: "Hi 👋 how can I help you today?" },
    { id: 3, sender: "user", text: "I want to check my order status" },
    { id: 4, sender: "admin", text: "Sure 👍 please give me your order ID" },
    { id: 5, sender: "user", text: "Order ID: #A1023" },
    { id: 6, sender: "admin", text: "Got it ✅ your order is on the way" },
    { id: 7, sender: "user", text: "Thank you 🙏" },
  ],

  2: [
    { id: 1, sender: "user", text: "I want to order product" },
    { id: 2, sender: "admin", text: "Sure 👍 what product do you want?" },
    { id: 3, sender: "user", text: "Nike shoes size 42" },
    { id: 4, sender: "admin", text: "We have stock available 👟" },
    { id: 5, sender: "user", text: "Price please?" },
    { id: 6, sender: "admin", text: "$59 only 💰" },
    { id: 7, sender: "user", text: "Ok I will buy it" },
  ],

  3: [
    { id: 1, sender: "user", text: "Is this available?" },
    { id: 2, sender: "admin", text: "Yes 👍 it is available" },
    { id: 3, sender: "user", text: "Can you deliver to Phnom Penh?" },
    { id: 4, sender: "admin", text: "Yes 🚚 delivery in 1-2 days" },
    { id: 5, sender: "user", text: "Great 👍" },
  ],

  4: [
    { id: 1, sender: "user", text: "Do you have discount?" },
    { id: 2, sender: "admin", text: "Yes 🔥 10% off today" },
    { id: 3, sender: "user", text: "Nice! I will order now" },
    { id: 4, sender: "admin", text: "Thank you for shopping with us 🙏" },
  ],

  5: [
    { id: 1, sender: "user", text: "Support needed" },
    { id: 2, sender: "admin", text: "How can I help you?" },
    { id: 3, sender: "user", text: "My payment failed" },
    { id: 4, sender: "admin", text: "Please try again or use ABA bank" },
    { id: 5, sender: "user", text: "Okay I will try again" },
  ],
};

const Messages = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const [selectedUser, setSelectedUser] = useState(1);
  const [messages, setMessages] = useState(dummyMessages);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input) return;

    const newMessage = {
      id: Date.now(),
      sender: "admin",
      text: input,
    };

    setMessages({
      ...messages,
      [selectedUser]: [...(messages[selectedUser] || []), newMessage],
    });

    setInput("");
  };

  return (
    <div className="flex h-screen bg-slate-900">
      {/* SIDEBAR */}
      <AdminSidebar sidebarOpen={sidebarOpen} isDark={isDarkMode} />

      {/* MAIN */}
      <div className="flex-1 flex flex-col">
        {/* HEADER */}
        <AdminHeader
          onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
          onThemeToggle={() => setIsDarkMode(!isDarkMode)}
          isDarkMode={isDarkMode}
        />

        {/* CHAT AREA */}
        <div className="flex flex-1 overflow-hidden">
          {/* USER LIST */}
          <div className="w-1/4 bg-slate-950 text-white p-4 overflow-y-auto">
            <h2 className="mb-4 font-bold text-lg">Messages</h2>

            {dummyUsers.map((user) => (
              <div
                key={user.id}
                onClick={() => setSelectedUser(user.id)}
                className={`p-3 rounded cursor-pointer mb-2 ${
                  selectedUser === user.id
                    ? "bg-slate-700"
                    : "hover:bg-slate-800"
                }`}
              >
                {user.name}
              </div>
            ))}
          </div>

          {/* CHAT */}
          <div className="flex-1 flex flex-col bg-slate-900 text-white">
            {/* BODY */}
            <div className="flex-1 p-4 overflow-y-auto space-y-2">
              {(messages[selectedUser] || []).map((msg) => (
                <div
                  key={msg.id}
                  className={`max-w-xs p-3 rounded-xl ${
                    msg.sender === "admin"
                      ? "bg-blue-500 ml-auto"
                      : "bg-slate-700"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            {/* INPUT */}
            <div className="p-4 flex gap-2 border-t border-white/10">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type message..."
                className="flex-1 p-2 rounded bg-slate-800 outline-none"
              />
              <button
                onClick={handleSend}
                className="bg-blue-500 px-4 rounded-xl"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
