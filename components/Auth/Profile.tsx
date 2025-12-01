import Cookies from "js-cookie";
import { User, Settings, LogOut, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Post } from "@/services/action";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useRouter } from "next/navigation";
import { logoutAction } from "@/services/Logout";

const AvatarDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const userName = "John Doe";
  const userInitials = userName
    .split(" ")
    .map((n) => n[0])
    .join("");

  const toggleDropdown = () => setIsOpen(!isOpen);
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await logoutAction();
      alert("User has been logged out successfully!");
      router.refresh();
    } catch (err) {
      alert("Logout failed. Please try again.");
    }
  };

  const handleAction = (action) => {
    if (action === "Logout") {
      handleLogout();
      setIsOpen(false);
    } else {
      setIsOpen(false);
    }
  };

  const menuItems = [
    { icon: User, label: "Profile", action: "Profile" },
    { icon: Settings, label: "Settings", action: "Settings" },
    {
      icon: LogOut,
      label: "Logout",
      action: "Logout",
      isDestructive: true,
      onClick: handleLogout,
    },
  ];

  return (
    <div className="relative inline-block text-left font-sans">
      <button
        type="button"
        className="flex items-center space-x-2 rounded-full p-1 pl-3 text-gray-700 bg-white hover:bg-gray-100 transition-colors duration-150 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-haspopup="true">
        <Avatar className="h-9 w-9 ring-2 ring-gray-100">
          <AvatarFallback className="bg-orange-600 text-white">
            {userInitials}
          </AvatarFallback>
        </Avatar>
      </button>

      {isOpen && (
        <div
          className="absolute right-0 z-20 mt-2 w-56 origin-top-right rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 divide-y divide-gray-100"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button">
          <div className="px-4 py-3">
            <p className="text-sm font-medium text-gray-900">{userName}</p>
            <p className="truncate text-xs font-normal text-gray-500">
              john.doe@example.com
            </p>
          </div>
          <div className="py-1" role="none">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.action}
                  onClick={() => handleAction(item.action)}
                  className={`group flex w-full items-center px-4 py-2 text-sm transition-colors duration-100 ${
                    item.isDestructive
                      ? "text-red-600 hover:bg-red-50 hover:text-red-700"
                      : "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                  }`}
                  role="menuitem">
                  <Icon className="mr-3 h-4 w-4" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default AvatarDropdown;
