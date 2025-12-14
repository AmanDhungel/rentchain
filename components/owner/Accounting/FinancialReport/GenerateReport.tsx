// components/GenerateReport.jsx
import { Button } from "@/components/ui";
import React from "react";

function Dropdown({ label, placeholder }) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700 mb-1">
        {label} {label.includes("*") && <span className="text-red-500"></span>}
      </label>
      <select className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 focus:ring-orange-500 focus:border-orange-500 appearance-none">
        <option>{placeholder}</option>
      </select>
    </div>
  );
}

function GenerateReport() {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-800 mb-6">
        Generate New Report
      </h2>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <Dropdown label="Report Type *" placeholder="Select report type" />
        <Dropdown label="Time Period *" placeholder="Select period" />
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <Dropdown
          label="Properties ( Optional )"
          placeholder="All properties"
        />
        <Dropdown label="Export Format" placeholder="PDF" />
      </div>

      <div className="flex justify-end space-x-4">
        <Button className="flex-1  text-white bg-orange-500 rounded-sm hover:bg-orange-600   shadow-lg">
          <span className="mr-2">📝</span> Generate Report
        </Button>
        <button className="px-6 py-2 text-sm font-medium text-gray-200 bg-slate-800 rounded-sm hover:bg-gray-300">
          Clear
        </button>
      </div>
    </div>
  );
}
export default GenerateReport;
