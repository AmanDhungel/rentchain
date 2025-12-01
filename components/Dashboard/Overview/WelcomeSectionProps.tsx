import { SquarePen } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useDialogOpen from "@/context/Dialog";
import { icons } from "../../../assets/icons/exports";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import useAuthStore from "@/context/User";

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
  const { setIsOpen } = useDialogOpen();
  const router = useRouter();
  const { user } = useAuthStore();

  const userInitials = user?.fullName
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <div className="w-full bg-white p-6 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] mb-5">
      <div className="flex items-center justify-between max-md:flex-col max-md:items-start gap-4">
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
                <span className="relative inline-block h-1 w-1 m-1 my-2">
                  <span className="absolute top-[7px] -left-2 right-0 border-b w-[50px] border-orange-500"></span>
                  <span className="block h-1 w-1 bg-orange-500 rounded-full"></span>
                </span>
                <span className="underline">{activeleases} active leases</span>
              </span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            className="flex items-center gap-2 px-4 py-2.5 bg-[#3B7080] text-white rounded-lg hover:bg-[#2C5966] transition-colors"
            onClick={() => {
              setIsOpen();
              router.push("/properties/manageproperties");
            }}>
            <Image
              alt="roundeplusicon"
              src={icons.RoundedPlusIcon}
              className="scale-200"
            />
            <span>Add Property</span>
          </button>

          <button
            className="flex items-center gap-2 px-4 py-2.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            onClick={() => {
              setIsOpen();
              router.push("/tenant/managetenant");
            }}>
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
