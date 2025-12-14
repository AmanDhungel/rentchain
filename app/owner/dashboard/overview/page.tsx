import ContractStatus from "@/components/owner/Dashboard/Overview/ContactStatus";
import OwnerDashboard from "@/components/owner/Dashboard/Overview/Dashboard";
import PropertiesTodo from "@/components/owner/Dashboard/Overview/PropertiesTodo";
import RentalInvoices from "@/components/owner/Dashboard/Overview/RentalInvoices";

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
