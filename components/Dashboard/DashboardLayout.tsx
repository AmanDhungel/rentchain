"use client";
import Sidebar from "../Sidebar";
import TopBar from "../TopBar";
import AdminHeaderSection from "./Overview/Header";
import PropertiesWelcomeSection from "../Properties/PropertiesWelcome";
import WelcomeSection from "./Overview/WelcomeSectionProps";
import { usePathname } from "next/navigation";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  return (
    <div className="flex">
      <div className="max-sm:hidden md:w-72 lg:w-64 top-0 left-0 h-full text-white">
        <Sidebar />
      </div>
      <div className="flex-1 mr-5 ml-5">
        <TopBar />
        <AdminHeaderSection />
        {pathname.startsWith("/properties") ? (
          <PropertiesWelcomeSection />
        ) : (
          <WelcomeSection />
        )}
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
