import React from "react";
import { SquarePen } from "lucide-react";
import { icons } from "../../../assets/icons/exports";
import Image from "next/image";

interface WelcomeSectionProps {
  userName?: string;
  properties?: number;
  activeleases?: number;
}

const WelcomeSection: React.FC<WelcomeSectionProps> = ({
  userName = "Adrian",
  properties = 3,
  activeleases = 5,
}) => {
  return (
    <div className="w-full bg-white p-6 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] mb-5">
      <div className="flex items-center justify-between max-md:flex-col max-md:items-start gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold">
              A
            </div>
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-semibold text-gray-800">
                Welcome Back, {userName}
              </h2>
              <button className="p-1 bg-gray-700 rounded-full hover:bg-gray-800 transition-colors">
                <SquarePen size={10} className="text-white" />
              </button>
            </div>

            <p className="text-gray-500 flex gap-1 text-sm">
              You have{" "}
              <span className="text-orange-500 flex underline">
                {properties} properties &middot; {activeleases} active leases
              </span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-[#3B7080] text-white rounded-lg hover:bg-[#2C5966] transition-colors">
            <Image
              alt="roundeplusicon"
              src={icons.RoundedPlusIcon}
              className="scale-200"
            />
            <span>Add Property</span>
          </button>

          <button className="flex items-center gap-2 px-4 py-2.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
            <Image
              alt="roundeplusicon"
              src={icons.RoundedPlusIcon}
              className="scale-200"
            />
            <span>Add Tenant</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;
