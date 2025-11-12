import React from "react";
import Sidebar from "../../Sidebar";
import OwnerDashboard from "./Dashboard";
import ContractStatus from "./ContactStatus";
import WorkOrderOverview from "./WorkOrderOverview";
import TenantsCheckInOut from "./TenantCheckInOut";

const FinalDashboard = () => {
  return (
    <div className="flex min-h-screen">
      <div className="w-64 fixed top-0 left-0 h-full text-white">
        <Sidebar />
      </div>
      <div className="flex-1 ">
        <OwnerDashboard />
      </div>
    </div>
  );
};

export default FinalDashboard;
