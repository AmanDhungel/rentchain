import { Calendar1 } from "lucide-react";
import React from "react";
import ManagementCard from "./ManagementCard";
import { icons } from "../../../assets/icons/exports";
import DynamicSubMenuItems from "../Properties/DynamicSubMenuItems";

const Actions = () => {
  const rows = [
    {
      id: 1,
      title: "Agreements",
      icon: icons.ActionAgreement,
    },
    {
      id: 2,
      title: "Accounting",
      icon: icons.ActionAccouting,
    },
    {
      id: 3,
      title: "Utilities",
      icon: icons.ActionUtilities,
    },
    {
      id: 4,
      title: "Work Orders",
      icon: icons.actionWorkOrder,
    },
    {
      id: 5,
      title: "Occupancy",
      icon: icons.ActionOccupancy,
    },
    {
      id: 6,
      title: "Enhanced Features",
      icon: icons.ActionEnhancedFeatures,
    },
    {
      id: 7,
      title: "Enchanced Parking",
      icon: icons.ActionEnhancedFeatures,
    },
  ];

  const submenuRows = [
    {
      id: 1,
      title: "Payments",
      subtitle: "Payment processing and management",
      badge: { text: "Payments", color: "bg-orange-500" },
      icon: icons.Payments,
    },
    {
      id: 2,
      title: "IAM",
      subtitle: "Identity and access management",
      badge: { text: "IAM", color: "bg-purple-600" },
      icon: icons.InteractiveSpace,
    },
    {
      id: 3,
      title: "Analytics",
      subtitle: "Reports and business intelligence",
      badge: { text: "Analytics", color: "bg-orange-600" },
      icon: icons.TrendingUp,
    },
  ];
  return (
    <>
      <div className="mb-4 flex justify-between">
        <h3 className="text-gray-700 font-semibold">Management Tool</h3>
        <p className="text-sm border border-[#E5E7EB] rounded-md px-3 py-1 flex items-center gap-2 ">
          <Calendar1 size={16} /> This Week
        </p>
      </div>
      <hr className="border border-[#E5E7EB] mb-5" />
      <div className="grid grid-cols-2 gap-4 mb-5">
        <ManagementCard rows={rows} />
      </div>
      <DynamicSubMenuItems rows={submenuRows} Title="Core Services" />
    </>
  );
};

export default Actions;
