// components/ReportTemplates.jsx
import React from "react";

const templateCards = [
  {
    icon: "📈",
    title: "Cash Flow Statement",
    desc: "Track cash inflows and outflows over time",
  },
  {
    icon: "📊",
    title: "Income Statement",
    desc: "Revenue and expenses breakdown",
  },
  {
    icon: "🏘️",
    title: "Property P&L",
    desc: "Profit and loss by individual property",
  },
  {
    icon: "🧾",
    title: "Tenant Statements",
    desc: "Individual tenant account summaries",
  },
  {
    icon: "📋",
    title: "Audit Trail",
    desc: "Complete transaction history export",
  },
];

function TemplateCard({ icon, title, desc }) {
  return (
    <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm transition hover:shadow-md">
      <div className="flex items-start mb-3">
        <span className="text-xl mr-3">{icon}</span>
        <h3 className="text-base font-semibold text-gray-800">{title}</h3>
      </div>
      <p className="text-sm text-gray-500 mb-4">{desc}</p>
      <button className="px-3 py-1 text-xs font-medium text-orange-600 border border-orange-200 rounded-md hover:bg-orange-50">
        Generate Report
      </button>
    </div>
  );
}

function ReportTemplates() {
  return (
    <div className="grid grid-cols-3 gap-6">
      {templateCards.map((template, index) => (
        <TemplateCard key={index} {...template} />
      ))}
    </div>
  );
}
export default ReportTemplates;
