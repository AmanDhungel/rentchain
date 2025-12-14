// components/ReportHistory.jsx
import React from "react";

const historyData = [
  {
    title: "Monthly Cash Flow Report - January 2025",
    details: "Generated on 2/1/2025 by Property Manager",
    period: "1/1/2025 - 1/31/2025",
    status: "Completed",
  },
  {
    title: "Property P&L - Skyline Towers Q4 2024",
    details: "Generated on 1/5/2025 by Property Manager",
    period: "10/1/2024 - 12/31/2024",
    status: "Completed",
  },
];

function ReportHistory() {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Recent Reports
      </h2>
      <div className="space-y-4">
        {historyData.map((report, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border border-gray-200">
            {/* Report Info */}
            <div>
              <div className="flex items-center text-base font-medium text-gray-700">
                <span className="mr-2 text-blue-500">📄</span> {report.title}
              </div>
              <p className="text-xs text-gray-500 mt-1">{report.details}</p>
              <p className="text-xs text-gray-400 mt-1">
                Period: {report.period}
              </p>
            </div>

            {/* Status and Download */}
            <div className="flex items-center space-x-3">
              <span className="px-3 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
                {report.status}
              </span>
              <button className="flex items-center px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded hover:bg-orange-600">
                Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default ReportHistory;
