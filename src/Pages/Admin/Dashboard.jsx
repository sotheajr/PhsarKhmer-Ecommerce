import React, { useState } from "react";
import {
  LayoutDashboard,
  Users,
  TrendingUp,
  Layers,
  FileText,
  Activity,
  Circle,
  BarChart3,
  PieChart,
  Smartphone,
  ShieldCheck,
} from "lucide-react";
import AdminHeader from "../../Components/AdminHeader/AdminHeader";
import AdminSidebar from "../../Components/AdminSidebar/AdminSidebar";
import BannerCRUD from "../../Components/BannerCRUD/BannerCRUD";
import CustomerDeliveryCRUD from "../../Components/CustomerDeliveryCRUD/CustomerDeliveryCRUD";
import OrderCRUD from "../../Components/OrderCRUD/OrderCRUD";
import BrandCRUD from "../../Components/BrandCRUD/BrandCRUD";
import ProductCRUD from "../../Components/ProductCRUD/ProductCRUD";
import CategoryCRUD from "../../Components/CategoryCRUD/CategoryCRUD";

const statCards = [
  {
    label: "Visitors",
    value: "13.7K",
    detail: "172,458 Target Users",
    change: "+10%",
    bg: "bg-gradient-to-br from-sky-500 to-blue-600",
    iconBg: "bg-gradient-to-br from-sky-400 to-cyan-500",
  },
  {
    label: "Bounce Rate",
    value: "41.6%",
    detail: "472,458 Targeted Users",
    change: "+17%",
    bg: "bg-gradient-to-br from-emerald-500 to-lime-500",
    iconBg: "bg-gradient-to-br from-emerald-400 to-emerald-500",
  },
  {
    label: "Users",
    value: "19M",
    detail: "172,458 Target Users",
    change: "+10%",
    bg: "bg-gradient-to-br from-orange-500 to-rose-500",
    iconBg: "bg-gradient-to-br from-orange-400 to-rose-500",
  },
  {
    label: "New Contacts",
    value: "75",
    detail: "172,458 Target Users",
    change: "-5%",
    bg: "bg-gradient-to-br from-fuchsia-500 to-violet-500",
    iconBg: "bg-gradient-to-br from-fuchsia-400 to-violet-500",
  },
];

const menuItems = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "Application", icon: Layers },
  { label: "Authentication", icon: ShieldCheck },
  { label: "Pages", icon: FileText },
  { label: "Components", icon: Circle },
  { label: "Content", icon: Activity },
  { label: "Utilities", icon: BarChart3 },
  { label: "Forms", icon: Smartphone },
  { label: "Tables", icon: Users },
  { label: "Charts", icon: PieChart },
];

const countryStats = [
  {
    country: "Canada",
    sessions: "55,555",
    goals: "210",
    goalsRate: "2.46%",
    bounceRate: "0.26%",
  },
  {
    country: "India",
    sessions: "24,152",
    goals: "135",
    goalsRate: "0.58%",
    bounceRate: "0.43%",
  },
  {
    country: "UK",
    sessions: "15,640",
    goals: "324",
    goalsRate: "5.15%",
    bounceRate: "2.47%",
  },
];

const performanceData = [42, 58, 50, 64, 72, 68, 84, 79, 91, 102, 97, 112];
const performanceLabels = [
  "10 Jan",
  "15 Jan",
  "20 Jan",
  "25 Jan",
  "30 Jan",
  "4 Feb",
  "9 Feb",
  "14 Feb",
  "19 Feb",
  "24 Feb",
  "29 Feb",
  "4 Mar",
];

const donutMetrics = [
  { label: "Active", value: 68, color: "from-emerald-500 to-sky-500" },
  { label: "Hold", value: 18, color: "from-sky-500 to-indigo-500" },
  { label: "Closed", value: 14, color: "from-amber-400 to-orange-500" },
];

const buildChartPaths = (data, width, height, padding = 24) => {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  const points = data.map((value, index) => {
    const x = Math.round((index / (data.length - 1)) * chartWidth + padding);
    const y = Math.round(
      height - padding - ((value - min) / (max - min || 1)) * chartHeight,
    );
    return { x, y, value };
  });

  const linePath = points
    .map((point, idx) => `${idx === 0 ? "M" : "L"}${point.x},${point.y}`)
    .join(" ");

  const areaPath = `${linePath} L${width - padding},${height - padding} L${padding},${height - padding} Z`;

  return { points, linePath, areaPath };
};

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const chart = buildChartPaths(performanceData, 660, 260);

  return (
    <div
      className={`h-screen overflow-hidden text-slate-900 ${isDarkMode ? "bg-slate-900" : "bg-slate-100"}`}
    >
      <div className="flex h-screen">
        <div className={`${sidebarOpen ? "block" : "hidden"} xl:block`}>
          <AdminSidebar isDark={isDarkMode} currentPath="/admin/dashboard" />
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
                      Dashboard
                    </h1>
                    <p className="mt-2 text-sm text-slate-500">
                      Overview of your e-commerce business performance.
                    </p>
                  </div>
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                    Updated 2 minutes ago
                  </div>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  {statCards.map((card) => (
                    <div
                      key={card.label}
                      className={`rounded-[28px] p-6 shadow-sm text-white ${card.bg}`}
                    >
                      <div
                        className={`rounded-3xl p-3 inline-flex text-white ${card.iconBg}`}
                      >
                        <TrendingUp className="h-5 w-5" />
                      </div>
                      <p className="mt-6 text-sm uppercase tracking-[0.2em] text-white/80">
                        {card.label}
                      </p>
                      <div className="mt-2 flex items-center justify-between gap-3">
                        <h2 className="text-3xl font-semibold">{card.value}</h2>
                        <span className="rounded-2xl bg-white/20 px-3 py-1 text-sm text-white/95">
                          {card.change}
                        </span>
                      </div>
                      <p className="mt-3 text-sm text-white/80">
                        {card.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
                <section className="rounded-[32px] bg-white p-6 shadow-lg">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">
                        Country Stats
                      </h3>
                      <p className="mt-1 text-sm text-slate-500">
                        Weekly session performance across top markets.
                      </p>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600">
                      <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                      Active
                    </div>
                  </div>

                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <div className="rounded-[28px] bg-slate-50 p-5">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <h4 className="text-base font-semibold text-slate-900">
                            Unique Visitors
                          </h4>
                          <p className="text-sm text-slate-500">
                            Weekly visitor performance
                          </p>
                        </div>
                        <span className="rounded-2xl bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
                          +12.4%
                        </span>
                      </div>
                      <div className="mt-6 overflow-hidden rounded-[28px] bg-white p-4 shadow-sm">
                        <svg viewBox="0 0 660 260" className="w-full h-[260px]">
                          <defs>
                            <linearGradient
                              id="lineGradient"
                              x1="0%"
                              y1="0%"
                              x2="100%"
                              y2="0%"
                            >
                              <stop offset="0%" stopColor="#0ea5e9" />
                              <stop offset="100%" stopColor="#6366f1" />
                            </linearGradient>
                            <linearGradient
                              id="areaGradient"
                              x1="0%"
                              y1="0%"
                              x2="0%"
                              y2="100%"
                            >
                              <stop
                                offset="0%"
                                stopColor="#0ea5e9"
                                stopOpacity="0.22"
                              />
                              <stop
                                offset="100%"
                                stopColor="#0ea5e9"
                                stopOpacity="0"
                              />
                            </linearGradient>
                          </defs>
                          <g stroke="#e2e8f0" strokeWidth="1">
                            {[...Array(4)].map((_, index) => {
                              const y = 40 + index * 50;
                              return (
                                <line
                                  key={index}
                                  x1="24"
                                  y1={y}
                                  x2="636"
                                  y2={y}
                                />
                              );
                            })}
                          </g>
                          <path d={chart.areaPath} fill="url(#areaGradient)" />
                          <path
                            d={chart.linePath}
                            fill="none"
                            stroke="url(#lineGradient)"
                            strokeWidth="4"
                            strokeLinejoin="round"
                            strokeLinecap="round"
                          />
                          {chart.points.map((point, idx) => (
                            <g key={idx}>
                              <circle
                                cx={point.x}
                                cy={point.y}
                                r="5"
                                fill="#fff"
                                stroke="#0ea5e9"
                                strokeWidth="3"
                              />
                            </g>
                          ))}
                          {performanceLabels.map((label, idx) => {
                            const x =
                              24 + (idx / (performanceLabels.length - 1)) * 612;
                            return (
                              <text
                                key={label}
                                x={x}
                                y="255"
                                textAnchor="middle"
                                className="text-[11px] fill-slate-400"
                              >
                                {label}
                              </text>
                            );
                          })}
                        </svg>
                      </div>
                    </div>
                    <div className="rounded-[28px] bg-slate-50 p-5">
                      <div className="mb-5 flex items-center justify-between text-sm text-slate-500">
                        <span>Sessions</span>
                        <span>Goal rate</span>
                      </div>
                      <div className="space-y-4">
                        {countryStats.map((row) => (
                          <div
                            key={row.country}
                            className="rounded-3xl border border-slate-200 p-4"
                          >
                            <div className="flex items-center justify-between gap-3">
                              <div>
                                <p className="text-base font-semibold text-slate-900">
                                  {row.country}
                                </p>
                                <p className="text-sm text-slate-500">
                                  {row.sessions} sessions
                                </p>
                              </div>
                              <div className="text-right text-sm text-slate-500">
                                <p>{row.goalsRate}</p>
                                <p className="mt-1">Bounce {row.bounceRate}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>

                <aside className="space-y-6">
                  <div className="rounded-[32px] bg-white p-6 shadow-lg">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">
                          Analytics Audience Metrics
                        </h3>
                        <p className="mt-1 text-sm text-slate-500">
                          Breakdown of active, hold, and closed states.
                        </p>
                      </div>
                      <div className="inline-flex items-center gap-2 text-sm text-slate-500">
                        <span className="h-2 w-2 rounded-full bg-emerald-500"></span>{" "}
                        Active
                        <span className="h-2 w-2 rounded-full bg-sky-500"></span>{" "}
                        Hold
                        <span className="h-2 w-2 rounded-full bg-amber-400"></span>{" "}
                        Closed
                      </div>
                    </div>
                    <div className="mt-6 grid gap-4">
                      <div className="rounded-[28px] bg-slate-50 p-5">
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <p className="text-base font-semibold text-slate-900">
                              Active
                            </p>
                            <p className="text-sm text-slate-500">
                              67% of traffic
                            </p>
                          </div>
                          <div className="relative h-20 w-20">
                            <svg viewBox="0 0 100 100" className="h-20 w-20">
                              <circle
                                cx="50"
                                cy="50"
                                r="40"
                                stroke="#e2e8f0"
                                strokeWidth="10"
                                fill="none"
                              />
                              <circle
                                cx="50"
                                cy="50"
                                r="40"
                                stroke="#0ea5e9"
                                strokeWidth="10"
                                strokeLinecap="round"
                                fill="none"
                                strokeDasharray="168 251"
                                transform="rotate(-90 50 50)"
                              />
                            </svg>
                            <div className="absolute inset-0 grid place-items-center text-sm font-semibold text-slate-700">
                              67%
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-[28px] bg-slate-50 p-5">
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <p className="text-base font-semibold text-slate-900">
                              Hold
                            </p>
                            <p className="text-sm text-slate-500">
                              18% of traffic
                            </p>
                          </div>
                          <div className="relative h-20 w-20">
                            <svg viewBox="0 0 100 100" className="h-20 w-20">
                              <circle
                                cx="50"
                                cy="50"
                                r="40"
                                stroke="#e2e8f0"
                                strokeWidth="10"
                                fill="none"
                              />
                              <circle
                                cx="50"
                                cy="50"
                                r="40"
                                stroke="#38bdf8"
                                strokeWidth="10"
                                strokeLinecap="round"
                                fill="none"
                                strokeDasharray="45 251"
                                transform="rotate(-90 50 50)"
                              />
                            </svg>
                            <div className="absolute inset-0 grid place-items-center text-sm font-semibold text-slate-700">
                              18%
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-[28px] bg-slate-50 p-5">
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <p className="text-base font-semibold text-slate-900">
                              Closed
                            </p>
                            <p className="text-sm text-slate-500">
                              15% of traffic
                            </p>
                          </div>
                          <div className="relative h-20 w-20">
                            <svg viewBox="0 0 100 100" className="h-20 w-20">
                              <circle
                                cx="50"
                                cy="50"
                                r="40"
                                stroke="#e2e8f0"
                                strokeWidth="10"
                                fill="none"
                              />
                              <circle
                                cx="50"
                                cy="50"
                                r="40"
                                stroke="#f59e0b"
                                strokeWidth="10"
                                strokeLinecap="round"
                                fill="none"
                                strokeDasharray="38 251"
                                transform="rotate(-90 50 50)"
                              />
                            </svg>
                            <div className="absolute inset-0 grid place-items-center text-sm font-semibold text-slate-700">
                              15%
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[32px] bg-white p-6 shadow-lg">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">
                        Subscribers Growth
                      </h3>
                      <p className="mt-1 text-sm text-slate-500">
                        Monthly user acquisition performance.
                      </p>
                    </div>
                    <div className="mt-6 rounded-[28px] bg-slate-50 p-5">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-3xl font-semibold text-slate-900">
                            8.62k
                          </p>
                          <p className="text-sm text-slate-500">
                            Subscribers this month
                          </p>
                        </div>
                        <span className="rounded-2xl bg-emerald-100 px-3 py-2 text-sm font-semibold text-emerald-700">
                          +40 followers
                        </span>
                      </div>
                      <div className="mt-6 h-40 overflow-hidden rounded-[28px] bg-white p-4 shadow-sm">
                        <svg viewBox="0 0 320 160" className="w-full h-full">
                          <defs>
                            <linearGradient
                              id="sparkline"
                              x1="0%"
                              y1="0%"
                              x2="100%"
                              y2="0%"
                            >
                              <stop offset="0%" stopColor="#3b82f6" />
                              <stop offset="100%" stopColor="#06b6d4" />
                            </linearGradient>
                          </defs>
                          <polyline
                            fill="none"
                            stroke="url(#sparkline)"
                            strokeWidth="4"
                            points="10,120 45,100 80,108 115,75 150,82 185,60 220,53 255,40 290,28"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </aside>
              </div>

              <div className="rounded-[32px] bg-white p-6 shadow-lg">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      Country Performance Table
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      Detailed session and bounce rate analytics.
                    </p>
                  </div>
                </div>

                <div className="mt-6 overflow-hidden rounded-[28px] border border-slate-200">
                  <table className="min-w-full divide-y divide-slate-200 text-left text-sm text-slate-600">
                    <thead className="bg-slate-50 text-slate-500">
                      <tr>
                        <th className="px-6 py-4 font-medium">Country</th>
                        <th className="px-6 py-4 font-medium">Sessions</th>
                        <th className="px-6 py-4 font-medium">Goals</th>
                        <th className="px-6 py-4 font-medium">Goals Rate</th>
                        <th className="px-6 py-4 font-medium">Bounce Rate</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                      {countryStats.map((row) => (
                        <tr key={row.country} className="hover:bg-slate-50">
                          <td className="px-6 py-4 font-semibold text-slate-900">
                            {row.country}
                          </td>
                          <td className="px-6 py-4">{row.sessions}</td>
                          <td className="px-6 py-4">{row.goals}</td>
                          <td className="px-6 py-4">{row.goalsRate}</td>
                          <td className="px-6 py-4">{row.bounceRate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* CRUD Sections */}
              <div className="rounded-[32px] bg-white p-6 shadow-lg">
                <BannerCRUD />
              </div>

              <div className="rounded-[32px] bg-white p-6 shadow-lg">
                <ProductCRUD />
              </div>

              <div className="rounded-[32px] bg-white p-6 shadow-lg">
                <CategoryCRUD />
              </div>

              <div className="rounded-[32px] bg-white p-6 shadow-lg">
                <BrandCRUD />
              </div>

              <div className="rounded-[32px] bg-white p-6 shadow-lg">
                <CustomerDeliveryCRUD />
              </div>

              <div className="rounded-[32px] bg-white p-6 shadow-lg">
                <OrderCRUD />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
