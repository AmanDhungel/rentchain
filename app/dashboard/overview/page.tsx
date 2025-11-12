import React from "react";
import Sidebar from "@/components/Sidebar";
import OwnerDashboard from "@/components/Dashboard/Overview/OwnerDashboard";
import ContractStatus from "@/components/Dashboard/Overview/ContactStatus";
import WorkOrderOverview from "@/components/Dashboard/Overview/WorkOrderOverview";
import TenantsCheckInOut from "@/components/Dashboard/Overview/TenantCheckInOut";

const FinalDashboard = () => {
  return (
    <div className="flex min-h-screen">
      <div className="w-64 fixed top-0 left-0 h-full text-white">
        <Sidebar />
      </div>
      <div className="flex-1 ">
        <OwnerDashboard />
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-100 md:-mt-44">
          <ContractStatus />
          <WorkOrderOverview />
          <TenantsCheckInOut />
        </div>
      </div>
    </div>
  );
};

export default FinalDashboard;
