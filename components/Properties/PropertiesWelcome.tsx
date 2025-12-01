import React from "react";
import { SquarePen } from "lucide-react";
import { icons } from "../../assets/icons/exports";
import PropertySetupDialog from "./QuickAdd/PropertySetupDialog";
import StandardPropertySetupDialog from "./StandardSetup/PropertySetupDialog";
import Image from "next/image";
import useAuthStore from "@/context/User";
import { Avatar, AvatarFallback } from "../ui/avatar";

interface WelcomeSectionProps {
  userName?: string;
  properties?: number;
  activeleases?: number;
}

const PropertiesWelcomeSection: React.FC<WelcomeSectionProps> = ({
  userName = "Adrian",
  properties = 3,
  activeleases = 5,
}) => {
  const { user } = useAuthStore();

  const userInitials = user?.fullName
    .split(" ")
    .map((n) => n[0])
    .join("");
  return (
    <div className="w-full bg-white p-6 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] mb-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold">
              <Avatar className="h-9 w-9 ring-2 bg-transparent ">
                <AvatarFallback className="bg-transparent text-white">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-semibold text-gray-800">
                Welcome Back, {user?.fullName}
              </h2>
              <button className="p-1 bg-gray-700 rounded-full hover:bg-gray-800 transition-colors">
                <SquarePen size={10} className="text-white" />
              </button>
            </div>

            <p className="text-gray-500 flex gap-1 text-sm">
              You have{" "}
              <span className="text-orange-500 flex">
                <span className="underline">{properties} properties</span>
                <span className="relative inline-block h-1 w-1 m-1 my-[9px]">
                  <span className="absolute top-[7px] -left-2 right-0 border-b w-[50px] border-orange-500"></span>
                  <span className="block h-1 w-1 bg-orange-500 rounded-full"></span>
                </span>
                <span className="underline">{activeleases} active leases</span>
              </span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <PropertySetupDialog />
          <StandardPropertySetupDialog />

          <button className="flex items-center gap-2 px-4 py-2.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
            <Image
              src={icons.RoundedPlusIcon}
              alt="roundedplusicon"
              className="scale-200"
            />
            <span>Enhanced Setup</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertiesWelcomeSection;
