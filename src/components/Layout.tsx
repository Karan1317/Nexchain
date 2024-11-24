import { Package, ShoppingCart, BarChart2, User, LogOut, Settings } from 'lucide-react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useState } from 'react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const user = {
    name: "John Smith",
    email: "john.smith@nexchain.com",
    role: "Supply Chain Manager"
  };

  const navigationItems = [
    { path: '/dashboard', icon: BarChart2, label: 'Dashboard' },
    { path: '/inventory', icon: Package, label: 'Inventory' },
    { path: '/order', icon: ShoppingCart, label: 'Orders' },
    { path: '/profile', icon: User, label: 'Profile' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      

      {/* Sidebar and Content */}
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 min-h-screen bg-white shadow-sm">
          <div className="p-4">
            <ul className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <li key={item.path}>
                    <button
                      onClick={() => navigate(item.path)}
                      className={`w-full flex items-center space-x-2 p-2 rounded-lg ${
                        isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;