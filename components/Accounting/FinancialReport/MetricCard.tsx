import React from "react";

function MetricCard({ value, label, color }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100 text-center">
      <div className={`text-3xl font-bold ${color}`}>{value}</div>
      <div className="text-sm text-gray-500 mt-1">{label}</div>
    </div>
  );
}
export default MetricCard;
