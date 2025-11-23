"use client";
import React, { useState } from "react";
import {
  Home,
  Calendar,
  ChevronDown,
  Download,
  FileText,
  ChevronsUp,
  ChevronsDown,
} from "lucide-react";
import { usePathname } from "next/navigation";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface ExportOption {
  label: string;
  value: string;
  icon: React.ReactNode;
}

const AdminHeaderSection: React.FC = () => {
  const [isSectionOpen, setIsSectionOpen] = useState<boolean>(true);
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<string>("2025-01-15");

  const pathname = usePathname();

  const breadcrumbs: BreadcrumbItem[] = [
    { label: "", href: "/" },
    {
      label: pathname.startsWith("/dashboard") ? "Dashboard" : "Properties",
      href: pathname.startsWith("/dashboard")
        ? "/dashboard/overview"
        : "/properties/manageproperties",
    },
    { label: pathname.split("/").pop() || "Overview" },
  ];

  const exportOptions: ExportOption[] = [
    {
      label: "Export as PDF",
      value: "pdf",
      icon: <FileText size={16} />,
    },
    {
      label: "Export as Excel",
      value: "excel",
      icon: <Download size={16} />,
    },
  ];

  const handleExport = (format: string) => {
    console.log(`Exporting as ${format}`);
    setIsExportOpen(false);
    // Add your export logic here
  };

  const toggleSection = () => {
    setIsSectionOpen(!isSectionOpen);
  };

  if (!isSectionOpen) {
    return (
      <div className="w-full bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-semibold text-gray-800">
              Admin Dashboard
            </h1>
          </div>
          <button
            onClick={toggleSection}
            className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors"
            aria-label="Open section">
            <ChevronsDown size={20} className="text-gray-600" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white px-6 py-4 ">
      {/* Main Header */}
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>

        <div className="flex items-center gap-3 max-md:hidden">
          {/* Export Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsExportOpen(!isExportOpen)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 bg-white  rounded-lg hover:bg-gray-100 transition-colors">
              <Download size={16} />
              <span>Export</span>
              <ChevronDown size={16} />
            </button>

            {isExportOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsExportOpen(false)}
                />
                <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
                  {exportOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleExport(option.value)}
                      className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors">
                      {option.icon}
                      <span className="text-gray-700 ">{option.label}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Calendar size={16} className="text-gray-600" />
            <span className="text-gray-700">{selectedDate}</span>
          </button>

          <button
            onClick={toggleSection}
            className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors"
            aria-label="Close section">
            <ChevronsUp size={20} className="text-gray-600" />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-600">
        {breadcrumbs.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            {index === 0 ? <Home size={16} className="text-gray-400" /> : "/"}

            {item.href ? (
              <a
                href={item.href}
                className="hover:text-blue-600 transition-colors">
                {item.label}
              </a>
            ) : (
              <span className="text-gray-900 font-medium capitalize">
                {item.label}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminHeaderSection;
