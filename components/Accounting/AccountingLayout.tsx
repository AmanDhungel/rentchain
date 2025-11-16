"use client";
import Sidebar from "../Sidebar";
import TopBar from "../TopBar";
import AdminHeaderSection from "../Dashboard/Overview/Header";
import AccountingHeaderSection from "./AccountingHeader";
import { usePathname, useRouter } from "next/navigation";

const AccountingLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  return (
    <div className="flex">
      <div className="max-sm:hidden md:w-72 lg:w-64 top-0 left-0 h-full text-white">
        <Sidebar />
      </div>
      <div className="flex-1 mr-5 ml-5">
        <TopBar />
        {pathname === "/accounting/accountingandbilling" ? (
          <AccountingHeaderSection />
        ) : (
          ""
        )}
        {children}
      </div>
    </div>
  );
};

export default AccountingLayout;
