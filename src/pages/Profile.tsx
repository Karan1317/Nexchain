import {
  Settings,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  BarChart2,
  Package,
  ClipboardList,
  TrendingUp,
  Truck,
  Users,
  ChevronRight,
  Clock,
} from "lucide-react";
import { useState } from "react";
export default function Profile() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [timeRange, setTimeRange] = useState("30days");
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gradient-to-r from-white to-blue-50 rounded-2xl p-8 shadow-xl transition-all duration-300">
          <div className="flex flex-col space-y-6">
            <div className="flex items-center text-sm text-gray-600 mb-4">
              <span>Dashboard</span>
              <ChevronRight className="w-4 h-4 mx-2" />
              <span className="text-blue-600 font-medium">Overview</span>
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
              <div className="relative group">
                <img
                  src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Profile"
                  className="w-32 h-32 rounded-full ring-4 ring-white shadow-xl object-cover transition-all duration-300 group-hover:scale-105"
                />
                <div className="absolute bottom-0 right-0 bg-green-500 w-4 h-4 rounded-full ring-2 ring-white animate-pulse"></div>
              </div>

              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  John Smith
                </h1>
                <p className="text-lg text-gray-600 mb-1 font-medium">
                  Supply Chain Manager
                </p>
                <p className="text-md text-gray-500 mb-4">
                  Electronics Division
                </p>

                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2 hover:text-blue-600 transition-colors duration-200">
                    <Mail className="w-4 h-4" />
                    <span>john.smith@electronics.com</span>
                  </div>
                  <div className="flex items-center gap-2 hover:text-blue-600 transition-colors duration-200">
                    <Phone className="w-4 h-4" />
                    <span>+1 (555) 789-0123</span>
                  </div>
                  <div className="flex items-center gap-2 hover:text-blue-600 transition-colors duration-200">
                    <MapPin className="w-4 h-4" />
                    <span>Austin, TX</span>
                  </div>
                  <div className="flex items-center gap-2 hover:text-blue-600 transition-colors duration-200">
                    <Calendar className="w-4 h-4" />
                    <span>Joined March 2019</span>
                  </div>
                </div>
              </div>

              <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-all duration-200 hover:shadow-md">
                <Settings className="w-4 h-4 mr-2" />
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        <nav className="mt-8 border-b border-gray-200 bg-white rounded-t-xl px-4">
          <div className="flex justify-between items-center">
            <div className="flex space-x-8">
              {["dashboard", "inventory", "reports"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`
                    px-4 py-4 text-sm font-medium capitalize transition-all duration-200
                    ${activeTab === tab ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300"}
                  `}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="text-sm border-0 bg-transparent text-gray-600 focus:ring-0"
              >
                <option value="7days">Last 7 days</option>
                <option value="30days">Last 30 days</option>
                <option value="90days">Last 90 days</option>
              </select>
            </div>
          </div>
        </nav>

        <div className="mt-8 grid gap-6 animate-fadeIn">
          {activeTab === "dashboard" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-white to-blue-50 rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">
                    Inventory Turnover
                  </h3>
                  <div className="p-2 bg-green-100 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-green-500" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-gray-700 mb-1">8.5x</p>
                <p className="text-sm text-gray-500 flex items-center gap-2">
                  <span className="inline-block px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs">
                    +12%
                  </span>
                  Last 30 days
                </p>
              </div>

              <div className="bg-gradient-to-br from-white to-blue-50 rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">
                    Order Fulfillment
                  </h3>
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <BarChart2 className="w-6 h-6 text-blue-500" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-gray-700 mb-1">98.2%</p>
                <p className="text-sm text-gray-500">Current rate</p>
              </div>

              <div className="bg-gradient-to-br from-white to-blue-50 rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">
                    Supplier Performance
                  </h3>
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Users className="w-6 h-6 text-purple-500" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-gray-700 mb-1">94%</p>
                <p className="text-sm text-gray-500">Average rating</p>
              </div>

              <div className="bg-gradient-to-br from-white to-blue-50 rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Lead Time</h3>
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Truck className="w-6 h-6 text-orange-500" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-gray-700 mb-1">
                  5.2 days
                </p>
                <p className="text-sm text-gray-500">Average time</p>
              </div>
            </div>
          )}

          {activeTab === "inventory" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="bg-gradient-to-br from-white to-blue-50 rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">
                      Component #{item}
                    </h3>
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Package className="w-6 h-6 text-blue-500" />
                    </div>
                  </div>
                  <p className="text-gray-600 mb-2">SKU: EL-{1000 + item}</p>
                  <p className="text-gray-600 mb-2">
                    Stock: {item * 150} units
                  </p>
                  <p className="text-gray-600">
                    Reorder Point: {item * 50} units
                  </p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "reports" && (
            <div className="bg-gradient-to-br from-white to-blue-50 rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="prose max-w-none">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Supply Chain Expertise
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Supply Chain Manager with over 10 years of experience in
                  electronics manufacturing and distribution. Specialized in
                  optimizing inventory management and streamlining procurement
                  processes.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Skills & Competencies
                </h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {[
                    "Supply Chain Management",
                    "Inventory Optimization",
                    "ERP Systems",
                    "Logistics Management",
                    "Electronics Manufacturing",
                    "Vendor Management",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm hover:bg-blue-100 transition-colors duration-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Certifications
                </h3>
                <div className="space-y-3">
                  {[
                    "APICS Certified Supply Chain Professional (CSCP)",
                    "Six Sigma Green Belt",
                    "Project Management Professional (PMP)",
                  ].map((cert) => (
                    <div
                      key={cert}
                      className="flex items-center gap-3 text-gray-600 hover:text-blue-600 transition-colors duration-200"
                    >
                      <div className="p-1 bg-blue-50 rounded">
                        <ClipboardList className="w-4 h-4" />
                      </div>
                      <span>{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
