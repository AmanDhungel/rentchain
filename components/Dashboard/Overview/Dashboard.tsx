import {
  AppWindow,
  CalendarPlus,
  CircleDollarSign,
  Languages,
  ListCheck,
  UserStar,
} from "lucide-react";
import StatsCard from "./DynamicCard";
import TenantsByPropertiesChart from "./EmployeesByDepartment";

const OwnerDashboard = () => {
  const StatCardData = [
    {
      icon: CalendarPlus,
      iconBgColor: "#F26522",
      title: "Today's Collections",
      value: "$21445",
      percentage: 10.2,
    },
    {
      icon: AppWindow,
      iconBgColor: "#3B7080",
      title: " Work Orders",
      value: "120/154 ",
      percentage: 2.1,
    },
    {
      icon: Languages,
      iconBgColor: "#1B84FF",
      title: "Total No of Properties",
      value: "69/86",
      percentage: -11.2,
    },
    {
      icon: ListCheck,
      iconBgColor: "#FD3995",
      title: "Occupancy Request",
      value: "225/28",
      percentage: 11.2,
    },
    {
      icon: CircleDollarSign,
      iconBgColor: "#AB47BC",
      title: "Monthly Revenue",
      value: "$21445",
      percentage: 10.2,
    },
    {
      icon: AppWindow,
      iconBgColor: "#E70D0D",
      title: "Complaints",
      value: "$5,544",
      percentage: 2.1,
    },
    {
      icon: Languages,
      iconBgColor: "#03C95A",
      title: "Tenant Applicatns",
      value: "98",
      percentage: 2.1,
    },
    {
      icon: UserStar,
      iconBgColor: "#212529",
      title: "New Tenant",
      value: "45/48",
      percentage: -11.1,
    },
  ];
  return (
    <div className=" flex-1">
      <div className="flex justify-between gap-4 max-2xl:flex-col 2xl:h-[53.5vh]">
        <div
          className={
            "grid grid-cols-2 md:grid-cols-2 max-lg:justify-between lg:grid-cols-3 2xl:grid-cols-4 gap-3 p-6 pl-0 pr-0"
          }>
          {StatCardData.map((card, index) => (
            <StatsCard
              key={index}
              {...card}
              className={index % 2 !== 0 ? "max-lg:items-start " : ""}
            />
          ))}
        </div>
        <div className="flex-1  ml-auto mt-6">
          <TenantsByPropertiesChart />
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;
