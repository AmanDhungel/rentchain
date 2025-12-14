"use client";
import React, { useState } from "react";
import MetricCard from "./MetricCard";
import ReportTemplates from "./ReportTemplates";
import GenerateReport from "./GenerateReport";
import ReportHistory from "./ReportHistory";
import { useRouter } from "next/navigation";

const metricsData = [
  { value: "12", label: "Reports Generated", color: "text-blue-600" },
  { value: "$23.5K", label: "Net Cash Flow", color: "text-green-600" },
  { value: "60.6%", label: "Profit Margin", color: "text-purple-600" },
  { value: "5", label: "Properties Tracked", color: "text-red-600" },
];

const tabs = [
  { id: "templates", label: "Report Templates" },
  { id: "generate", label: "Generate Report" },
  { id: "history", label: "Report History" },
];

function FinancialReportsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("templates");

  const renderContent = () => {
    switch (activeTab) {
      case "templates":
        return <ReportTemplates />;
      case "generate":
        return <GenerateReport />;
      case "history":
        return <ReportHistory />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 pl-0  min-h-screen">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          <span
            className="text-xl font-light mr-2 cursor-pointer"
            onClick={() => router.back()}>
            ←
          </span>{" "}
          Financial Reports
        </h1>
        <button className="flex items-center px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-md hover:bg-orange-600 shadow-md">
          <span className="mr-2">📅</span> Schedule Report
        </button>
      </header>
      <p className="text-sm text-gray-500 mb-6">
        Generate and download financial reports
      </p>

      {/* Metrics Summary */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {metricsData.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-gray-200 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "text-orange-600 border-b-2 border-orange-600"
                : "text-gray-500 hover:text-gray-700"
            }`}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        {renderContent()}
      </div>
    </div>
  );
}
export default FinancialReportsPage;
