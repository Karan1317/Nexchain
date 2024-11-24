import {
  Search,
  FileText,
  ChevronDown,
  Truck,
  Clock,
  CheckCircle,
  AlertCircle,
  Filter,
} from "lucide-react";
import React, { useState } from "react";

export default function OrderPage() {
  const [orders, setOrders] = useState([
    {
      id: "ORD-2024-002",
      customer: "Electronics Plus",
      status: "Processing",
      date: "2024-11-21",
      total: 5999.7,
    },
    {
      id: "ORD-2024-001",
      customer: "TechCorp Industries",
      status: "In Transit",
      date: "2024-11-20",
      total: 19999.5,
    },
    {
      id: "ORD-2024-003",
      customer: "SmartHome Solutions",
      status: "Delivered",
      date: "2024-11-18",
      total: 12499.5,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "ascending" });
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control the modal visibility

  const getStatusIcon = (status) => {
    switch (status) {
      case "Processing":
        return <Clock className="w-4 h-4" />;
      case "In Transit":
        return <Truck className="w-4 h-4" />;
      case "Delivered":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  // Sorting handler
  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedOrders = React.useMemo(() => {
    let sortableOrders = [...orders];
    if (statusFilter !== "All Status") {
      sortableOrders = sortableOrders.filter(order => order.status === statusFilter);
    }

    if (searchTerm) {
      sortableOrders = sortableOrders.filter(
        (order) => order.id.toLowerCase().includes(searchTerm.toLowerCase()) || order.customer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortConfig !== null) {
      sortableOrders.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableOrders;
  }, [orders, searchTerm, statusFilter, sortConfig]);

  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100 via-white to-purple-100 p-8 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto backdrop-blur-sm">
        {/* Header */}
        <div className="flex justify-between items-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent drop-shadow-sm">
            Order Management
          </h1>
          <button
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-500 text-white rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-3 font-medium"
            onClick={() => setIsModalOpen(true)} // Toggle the modal when the button is clicked
          >
            <FileText className="w-5 h-5" />
            Generate Report
          </button>
        </div>

        {/* Search & Filter */}
        <div className="flex gap-6 mb-12">
          <div className="flex-1 relative group">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md dark:bg-gray-800/50 dark:border-gray-700 dark:text-white"
            />
          </div>
          <div className="relative">
            <select
              className="appearance-none pl-6 pr-12 py-4 rounded-xl border border-gray-200 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md font-medium dark:bg-gray-800/50 dark:border-gray-700 dark:text-white"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option>All Status</option>
              <option>Processing</option>
              <option>In Transit</option>
              <option>Delivered</option>
            </select>
            <ChevronDown className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden border border-gray-100/50 transition-all duration-300 hover:shadow-2xl dark:bg-gray-800/50 dark:border-gray-700">
          <div className="p-8 border-b border-gray-100/50 dark:border-gray-700">
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent dark:from-white dark:to-gray-300">
              Orders
            </h2>
            <p className="text-gray-500 mt-1 dark:text-gray-400">
              Manage and track your orders
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50/50 dark:bg-gray-700/50">
                  <th className="text-left px-8 py-5 text-sm font-semibold text-gray-600 dark:text-gray-300 cursor-pointer" onClick={() => requestSort("id")}>
                    Order ID{" "}
                    <ChevronDown className="w-4 h-4 inline-block ml-1 opacity-50" />
                  </th>
                  <th className="text-left px-8 py-5 text-sm font-semibold text-gray-600 dark:text-gray-300">
                    Customer
                  </th>
                  <th className="text-left px-8 py-5 text-sm font-semibold text-gray-600 dark:text-gray-300 cursor-pointer" onClick={() => requestSort("status")}>
                    Status{" "}
                    <ChevronDown className="w-4 h-4 inline-block ml-1 opacity-50" />
                  </th>
                  <th className="text-left px-8 py-5 text-sm font-semibold text-gray-600 dark:text-gray-300 cursor-pointer" onClick={() => requestSort("date")}>
                    Order Date{" "}
                    <ChevronDown className="w-4 h-4 inline-block ml-1 opacity-50" />
                  </th>
                  <th className="text-right px-8 py-5 text-sm font-semibold text-gray-600 dark:text-gray-300 cursor-pointer" onClick={() => requestSort("total")}>
                    Total{" "}
                    <ChevronDown className="w-4 h-4 inline-block ml-1 opacity-50" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-t border-gray-100/50 hover:bg-blue-50/30 transition-colors duration-200 dark:border-gray-700 dark:hover:bg-blue-900/20"
                  >
                    <td className="px-8 py-6 font-medium dark:text-gray-300">{order.id}</td>
                    <td className="px-8 py-6 dark:text-gray-300">{order.customer}</td>
                    <td className="px-8 py-6">
                      <span
                        className={`
                        inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200
                        ${order.status === "Processing" && "bg-yellow-100/70 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"}
                        ${order.status === "In Transit" && "bg-blue-100/70 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"}
                        ${order.status === "Delivered" && "bg-green-100/70 text-green-700 dark:bg-green-900/30 dark:text-green-400"}
                      `}
                      >
                        {getStatusIcon(order.status)}
                        {order.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 dark:text-gray-300">{order.date}</td>
                    <td className="px-8 py-6 text-right">
                      <span className="font-medium dark:text-gray-300">
                        ₹{order.total.toLocaleString()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal for generating report */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg w-[90%] max-w-lg">
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                Generate Report
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Select the format and options for your report.
              </p>
              {/* You can add form or other content here to allow the user to choose options */}
              <div className="mt-4 flex justify-end gap-4">
                <button
                  className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  onClick={() => {
                    // Handle report generation logic here
                    alert("Report generated!");
                    setIsModalOpen(false);
                  }}
                >
                  Generate
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
