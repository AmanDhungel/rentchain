"use client";
import React, { useState } from "react";
import { FileText, ChevronsDown, Plus } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { icons } from "@/assets/icons/exports";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

const AccountingHeaderSection: React.FC = () => {
  const [isSectionOpen, setIsSectionOpen] = useState<boolean>(true);
  const router = useRouter();

  const pathname = usePathname();

  const breadcrumbs: BreadcrumbItem[] = [
    { label: "", href: "/" },
    { label: "Accounting", href: "owner/accounting/accountingandbilling" },
    {
      label:
        pathname.split("/").pop() ||
        pathname.split("/").pop() === "accountingandbilling"
          ? "Accounting & Billing"
          : "",
    },
  ];

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
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>

        <div className="flex items-center gap-3">
          <header className="flex justify-between items-center mb-6">
            <div className="flex space-x-3">
              <button
                onClick={() =>
                  router.push(
                    "/owner/accounting/accountingandbilling/financialreport"
                  )
                }
                className="flex items-center bg-white border border-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md shadow-sm hover:bg-gray-100 transition">
                <FileText className="w-4 h-4 mr-2" />
                Reports
              </button>
              <button className="flex items-center bg-orange-500 text-white font-medium py-2 px-4 rounded-md shadow-md hover:bg-red-700 transition">
                <Plus className="w-4 h-4 mr-2  border border-white rounded-full" />
                New Invoice
              </button>
            </div>
          </header>
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-600">
        {breadcrumbs.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            {index === 0 ? (
              <Image
                src={icons.Checkbook}
                alt="checkbox"
                className="text-gray-400"
              />
            ) : (
              "/"
            )}

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

export default AccountingHeaderSection;
