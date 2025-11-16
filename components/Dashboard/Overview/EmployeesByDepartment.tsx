import React from "react";
import { Calendar } from "lucide-react";

interface DepartmentData {
  name: string;
  value: number;
  progress: number; // Progress percentage (0-100) or actual value
}

interface EmployeesByDepartmentProps {
  title?: string;
  buttonText?: string;
  data?: DepartmentData[];
  maxValue?: number;
  increasePercentage?: number;
  className?: string;
}

const EmployeesByDepartment: React.FC<EmployeesByDepartmentProps> = ({
  title = "Employees By Department",
  buttonText = "This Week",
  data = [
    { name: "UI/UX", value: 45, progress: 37.5 },
    { name: "Development", value: 120, progress: 100 },
    { name: "Management", value: 25, progress: 20.8 },
    { name: "HR", value: 35, progress: 29.2 },
    { name: "Testing", value: 60, progress: 50 },
    { name: "Marketing", value: 80, progress: 66.7 },
  ],
  increasePercentage = 20,
  className = "",
}) => {
  const isPositiveIncrease = increasePercentage >= 0;

  return (
    <div
      className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          <Calendar size={16} className="text-gray-600" />
          <span className="text-sm text-gray-700">{buttonText}</span>
        </button>
      </div>

      <div className="border-t border-gray-200 mb-6"></div>
      <div className="space-y-4">
        {data.map((department, index) => (
          <div key={index} className="flex items-center department-size-border">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[7.83px] font-medium text-gray-700 w-20 text-right mr-4">
                {department.name}
              </span>
            </div>
            <div className=" w-full bg-gray-200 rounded-full h-1.5 ">
              <div
                className="bg-orange-500 h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${department.progress}%` }}></div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between  text-gray-500 mt-4 px-1 ml-24 text-[9.4px]">
        <span>0</span>
        <span>20</span>
        <span>40</span>
        <span>60</span>
        <span>80</span>
        <span>100</span>
        <span>120</span>
      </div>

      <div className="flex items-center gap-2 text-[9.26px] mt-6 pt-4 border-t border-gray-200">
        <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
        <span className="text-sm text-gray-600 text-[9.26px]">
          No of Employees increased by{" "}
          <span
            className={`font-medium text-[9.26px] ${
              isPositiveIncrease ? "text-green-500" : "text-red-500"
            }`}>
            {isPositiveIncrease ? "+" : ""}
            {increasePercentage}%
          </span>{" "}
          from last Week
        </span>
      </div>
    </div>
  );
};

export default EmployeesByDepartment;
