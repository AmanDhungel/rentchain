import { Calendar1, DollarSign, TriangleAlert } from "lucide-react";
import DynamicSubMenuItems from "../Properties/DynamicSubMenuItems";
import { icons } from "../../../assets/icons/exports";

const FinnancialOverview = () => {
  const rows = [
    {
      id: 1,
      title: "Accounting Dashboard",
      subtitle: "Complete Financial overview",
      badge: { text: "Accounting Dashboard", color: "bg-orange-500" },
      icon: icons.Monitoring,
    },
    {
      id: 2,
      title: "Create Invoice",
      subtitle: "Generate new billing",
      badge: { text: "Create Invoice", color: "bg-purple-600" },
      icon: icons.RequestQuote,
    },
  ];
  return (
    <>
      <div className="mb-4 flex justify-between">
        <h3 className="text-gray-700 font-semibold">Financial Overview</h3>
        <p className="text-sm border border-[#E5E7EB] rounded-md px-3 py-1 flex items-center gap-2 ">
          <Calendar1 size={16} /> This Week
        </p>
      </div>
      <hr className="border border-[#E5E7EB] mb-5" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pr-2 mb-2">
        <div className="h-[300px] items-center flex flex-col justify-center  border border-[#E5E7EB] p-6 rounded-lg">
          <DollarSign
            size={80}
            className=" p-6 bg-green-600/10 border justify-center border-green-600 rounded-3xl text-green-600 "
          />
          <h2 className="text-green-600 text-3xl font-bold mt-4">$12,600</h2>
          <p className="text-[#6B7280] mt-2">Monthly Revenue</p>
        </div>
        <div className="h-[300px] items-center flex flex-col justify-center  border border-[#E5E7EB] p-6 rounded-lg">
          <TriangleAlert
            size={80}
            className=" p-6 bg-red-600/10 border justify-center border-red-600 rounded-3xl text-red-600 "
          />
          <h2 className="text-red-600 text-3xl font-bold mt-4">$1,800</h2>
          <p className="text-[#6B7280] mt-2">Overdue Amount</p>
        </div>
      </div>
      <DynamicSubMenuItems rows={rows} />
    </>
  );
};

export default FinnancialOverview;
