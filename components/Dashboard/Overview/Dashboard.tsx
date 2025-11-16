import React from "react";
import StatsCard from "./DynamicCard";
import {
  AppWindow,
  CalendarPlus,
  CircleDollarSign,
  Languages,
  ListCheck,
  UserStar,
} from "lucide-react";
import EmployeesByDepartment from "./EmployeesByDepartment";

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
      title: "Total No of Clients",
      value: "69/86",
      percentage: -11.2,
    },
    {
      icon: ListCheck,
      iconBgColor: "#FD3995",
      title: "Total No of Tasks",
      value: "225/28",
      percentage: 11.2,
    },
    {
      icon: CircleDollarSign,
      iconBgColor: "#AB47BC",
      title: "Earnings",
      value: "$21445",
      percentage: 10.2,
    },
    {
      icon: AppWindow,
      iconBgColor: "#E70D0D",
      title: "Profit This Week",
      value: "$5,544",
      percentage: 2.1,
    },
    {
      icon: Languages,
      iconBgColor: "#03C95A",
      title: "Job Applicatns",
      value: "98",
      percentage: 2.1,
    },
    {
      icon: UserStar,
      iconBgColor: "#212529",
      title: "New Hire",
      value: "45/48",
      percentage: -11.1,
    },
  ];
  return (
    <div className=" flex-1">
      <div className="flex max-lg:flex-col">
        <div
          className={
            "grid grid-cols-1 md:grid-cols-2 max-lg:justify-between lg:grid-cols-4 gap-3 p-6 pl-0 pr-0"
          }>
          {StatCardData.map((card, index) => (
            <StatsCard
              key={index}
              {...card}
              className={index % 2 !== 0 ? "max-lg:items-start" : ""}
            />
          ))}
        </div>
        <EmployeesByDepartment
          title="Department Size"
          buttonText="This Quarter"
          className="flex-1 gap-6 m-6 mr-0 h-96 max-lg:ml-0"
          data={[
            { name: "Engineering", value: 95, progress: 79.2 },
            { name: "Design", value: 30, progress: 25 },
            { name: "Product", value: 25, progress: 20.8 },
            { name: "Sales", value: 65, progress: 54.2 },
            { name: "Support", value: 40, progress: 33.3 },
            { name: "Operations", value: 35, progress: 29.2 },
          ]}
          increasePercentage={5}
        />
      </div>
    </div>
  );
};

export default OwnerDashboard;
