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
  viewDetailsText = "View All",
  className = "",
}) => {
  const isPositive = percentage >= 0;
  const percentageColor = isPositive ? "text-green-600" : "text-red-600";
  const PercentageIcon = isPositive ? ChevronUp : ChevronDown;

  return (
    <div
      className={`bg-white rounded-xl shadow-lg border border-gray-100 p-6 flex flex-col justify-between w-full min-h-[140px] min-w-60 transition-shadow hover:shadow-xl ${className}`}>
      <div className="flex flex-col">
        <div className="flex flex-col items-start justify-between ">
          <div
            className={`p-3 rounded-xl flex`}
            style={{ backgroundColor: iconBgColor }}>
            <Icon size={24} style={{ color: "white" }} />
          </div>

          <div className="flex flex-col mt-2">
            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
              {title}
            </h3>

            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-gray-900">{value}</span>
              <div
                className={`flex gap-1 items-center text-xs font-semibold ${percentageColor}`}>
                <PercentageIcon size={12} />
                <span>
                  {isPositive ? "+" : ""}
                  {percentage}%
                </span>
              </div>
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-400 font-semibold hover:text-blue-800 transition-colors  mt-4">
          {viewDetailsText}
        </p>
      </div>
    </div>
  );
};

export default StatsCard;
