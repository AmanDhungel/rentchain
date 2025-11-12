import React from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface StatsCardProps {
  icon: LucideIcon;
  iconBgColor: string;
  title: string;
  value: string;
  percentage: number;
  viewDetailsText?: string;
  className?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  icon: Icon,
  iconBgColor,
  title,
  value,
  percentage,
  viewDetailsText = "View Details",
  className = "",
}) => {
  const isPositive = percentage >= 0;
  const percentageColor = isPositive ? "text-green-500" : "text-red-500";
  const PercentageIcon = isPositive ? ChevronUp : ChevronDown;

  return (
    <div
      className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 ${className}`}>
      <div className="flex flex-col h-full">
        <div className="flex items-start justify-between mb-4">
          <div
            className={`p-2 rounded-lg`}
            style={{ backgroundColor: iconBgColor }}>
            <Icon size={20} style={{ color: "white" }} />
          </div>
        </div>

        <div className="flex-grow">
          <h3 className="text-[10px] text-gray-500 uppercase tracking-wide mb-2">
            {title}
          </h3>

          <div className="flex items-baseline gap-2 mb-3">
            <span className="flex gap-2 text-2xl font-bold text-gray-800">
              {value}{" "}
              <div className={`flex items-center gap-1 ${percentageColor}`}>
                <PercentageIcon size={16} />
                <span className="text-sm font-medium">
                  {isPositive ? "+" : ""}
                  {percentage}%
                </span>
              </div>
            </span>
          </div>
        </div>

        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors text-left mt-auto">
          {viewDetailsText}
        </button>
      </div>
    </div>
  );
};

export default StatsCard;
