import React from "react";
import ContractStatus from "@/components/Dashboard/Overview/ContactStatus";
import RentalInvoices from "@/components/Dashboard/Overview/RentalInvoices";
import PropertiesTodo from "@/components/Dashboard/Overview/PropertiesTodo";
import OwnerDashboard from "@/components/Dashboard/Overview/Dashboard";

const FinalDashboard = () => {
  return (
    <>
      <OwnerDashboard />
      <ContractStatus />
      <RentalInvoices />
      <PropertiesTodo />
    </>
  );
};

export default FinalDashboard;
