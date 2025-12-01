import ContractStatus from "@/components/Dashboard/Overview/ContactStatus";
import OwnerDashboard from "@/components/Dashboard/Overview/Dashboard";
import PropertiesTodo from "@/components/Dashboard/Overview/PropertiesTodo";
import RentalInvoices from "@/components/Dashboard/Overview/RentalInvoices";

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
