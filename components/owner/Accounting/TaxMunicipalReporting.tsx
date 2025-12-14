"use client";
import React, { useState } from "react";
import {
  ArrowLeft,
  Settings,
  Plus,
  ArrowDownToLine,
  FileText,
  Settings as SettingsIcon,
  MoveLeft,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

// --- Utility Functions ---
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

type ViewType = "FILINGS" | "PROFILES";

interface SummaryMetric {
  title: string;
  value: string | number;
  color: string;
}

interface TaxFilingStatusEntry {
  id: number;
  taxType: string;
  jurisdiction: string;
  property: string;
  periodStart: string;
  periodEnd: string;
  dueDate: string;
  taxOwed: number;
  status: "Filed" | "Pending";
  daysOverdue?: number;
}

interface TaxProfileEntry {
  id: number;
  property: string;
  taxType: string;
  jurisdiction: string;
  rate: string;
  filingFrequency: string;
  status: "Active" | "Inactive";
}

const summaryMetrics: SummaryMetric[] = [
  { title: "Active Profiles", value: 2, color: "text-blue-600" },
  { title: "Pending Filings", value: 0, color: "text-orange-600" },
  { title: "Filed This Year", value: 1, color: "text-green-600" },
  { title: "Total Tax Owed", value: 2064.25, color: "text-red-600" },
];

const mockFilingStatus: TaxFilingStatusEntry[] = [
  {
    id: 1,
    taxType: "Property Tax",
    jurisdiction: "New York City",
    property: "Skyline Towers",
    periodStart: "1/1/2024",
    periodEnd: "12/31/2024",
    dueDate: "1/31/2025",
    daysOverdue: 275,
    taxOwed: 897.5,
    status: "Filed",
  },
  {
    id: 2,
    taxType: "Rental Income_tax",
    jurisdiction: "New York State",
    property: "Skyline Towers",
    periodStart: "10/1/2024",
    periodEnd: "12/31/2024",
    dueDate: "1/31/2025",
    taxOwed: 1166.75,
    status: "Pending",
  },
];

const mockTaxProfiles: TaxProfileEntry[] = [
  {
    id: 101,
    property: "Skyline Towers",
    taxType: "Property Tax",
    jurisdiction: "New York City",
    rate: "1.25%",
    filingFrequency: "Annually",
    status: "Active",
  },
  {
    id: 102,
    property: "Skyline Towers",
    taxType: "Rental Income_tax",
    jurisdiction: "New York State",
    rate: "6.5%",
    filingFrequency: "Quarterly",
    status: "Active",
  },
];

const ReportSummaryCard: React.FC<SummaryMetric & { isCurrency: boolean }> = ({
  title,
  value,
  color,
  isCurrency,
}) => (
  <Card className="flex flex-col items-center justify-center p-6 text-center shadow-sm">
    <p className={`text-4xl font-extrabold ${color}`}>
      {isCurrency ? formatCurrency(value as number) : value}
    </p>
    <p className="text-sm font-medium text-gray-500 mt-1">{title}</p>
  </Card>
);

const TabNavigation: React.FC<{
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
}> = ({ activeView, setActiveView }) => (
  <div className="flex border-b border-gray-200 mb-6">
    <button
      className={`py-3 px-6 text-sm font-semibold transition-colors ${
        activeView === "FILINGS"
          ? "text-orange-500 border-b-2 border-orange-500"
          : "text-gray-500 hover:text-gray-700"
      }`}
      onClick={() => setActiveView("FILINGS")}>
      Tax Filing Status
    </button>
    <button
      className={`py-3 px-6 text-sm font-semibold transition-colors ${
        activeView === "PROFILES"
          ? "text-orange-500 border-b-2 border-orange-500"
          : "text-gray-500 hover:text-gray-700"
      }`}
      onClick={() => setActiveView("PROFILES")}>
      Tax Profiles
    </button>
  </div>
);

const TaxFilingStatusTable: React.FC = () => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <h2 className="text-xl font-bold text-gray-800 p-4">Tax Filing Status</h2>
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-10">
            <Checkbox aria-label="Select all" />
          </th>
          {[
            "Tax Type",
            "Property",
            "Period",
            "Period",
            "Tax Owed",
            "Status",
            "Actions",
          ].map((header, index) => (
            <th
              key={index}
              className="py-3 px-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {mockFilingStatus.map((filing) => (
          <tr key={filing.id} className="hover:bg-gray-50 transition-colors">
            <td className="py-4 px-4 whitespace-nowrap w-10">
              <Checkbox aria-label={`Select filing ${filing.id}`} />
            </td>
            <td className="py-4 px-2 whitespace-nowrap text-sm font-medium text-gray-900">
              <p>{filing.taxType}</p>
              <p className="text-xs text-gray-500">{filing.jurisdiction}</p>
            </td>
            <td className="py-4 px-2 whitespace-nowrap text-sm text-gray-900">
              {filing.property}
            </td>
            <td className="py-4 px-2 whitespace-nowrap text-sm text-gray-500">
              {filing.periodStart} to {filing.periodEnd}
            </td>
            <td className="py-4 px-2 whitespace-nowrap text-sm font-medium">
              <p>{filing.dueDate}</p>
              {filing.daysOverdue && (
                <p className="text-xs text-red-500 font-semibold">
                  {filing.daysOverdue} days overdue
                </p>
              )}
            </td>
            <td className="py-4 px-2 whitespace-nowrap text-sm text-gray-900">
              {formatCurrency(filing.taxOwed)}
            </td>
            <td className="py-4 px-2 whitespace-nowrap">
              <Badge
                className={`text-xs font-medium ${
                  filing.status === "Filed"
                    ? "bg-green-100 text-green-700"
                    : "bg-orange-100 text-orange-700"
                }`}>
                {filing.status}
              </Badge>
            </td>
            <td className="py-4 px-2 whitespace-nowrap text-right text-sm font-medium space-x-3 text-gray-500">
              <button
                aria-label="View document"
                className="hover:text-blue-500">
                <FileText className="h-4 w-4 inline" />
              </button>
              <button
                aria-label="Download document"
                className="hover:text-blue-500">
                <ArrowDownToLine className="h-4 w-4 inline" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const TaxProfilesTable: React.FC = () => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <h2 className="text-xl font-bold text-gray-800 p-4">Tax Filings</h2>
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-10">
            <Checkbox aria-label="Select all" />
          </th>
          {[
            "Property",
            "Tax Type",
            "Jurisdiction",
            "Rate",
            "Filing Frequency",
            "Status",
            "Actions",
          ].map((header, index) => (
            <th
              key={index}
              className="py-3 px-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {mockTaxProfiles.map((profile) => (
          <tr key={profile.id} className="hover:bg-gray-50 transition-colors">
            <td className="py-4 px-4 whitespace-nowrap w-10">
              <Checkbox aria-label={`Select profile ${profile.id}`} />
            </td>
            <td className="py-4 px-2 whitespace-nowrap text-sm font-medium text-gray-900">
              {profile.property}
            </td>
            <td className="py-4 px-2 whitespace-nowrap text-sm text-gray-900">
              {profile.taxType}
            </td>
            <td className="py-4 px-2 whitespace-nowrap text-sm text-gray-500">
              {profile.jurisdiction}
            </td>
            <td className="py-4 px-2 whitespace-nowrap text-sm text-gray-900">
              {profile.rate}
            </td>
            <td className="py-4 px-2 whitespace-nowrap text-sm text-gray-900">
              {profile.filingFrequency}
            </td>
            <td className="py-4 px-2 whitespace-nowrap">
              <Badge
                className={`text-xs font-medium ${
                  profile.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}>
                {profile.status}
              </Badge>
            </td>
            <td className="py-4 px-2 whitespace-nowrap text-right text-sm font-medium text-gray-500">
              <button
                aria-label="Profile settings"
                className="hover:text-blue-500">
                <SettingsIcon className="h-4 w-4" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default function TaxMunicipalReporting() {
  const [activeView, setActiveView] = useState<ViewType>("FILINGS");

  const totalTaxOwedMetric = summaryMetrics.find(
    (m) => m.title === "Total Tax Owed"
  );

  return (
    <div className="p-4 md:p-8 md:pl-0 min-h-screen ">
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link
              href={"/accounting/accountingandbilling"}
              aria-label="Go back"
              className="text-gray-500 hover:text-gray-700">
              <MoveLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Tax & Municipal Reporting
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">
                Manage tax filings and compliance
              </p>
            </div>
          </div>
          <div className="flex space-x-3">
            <Button
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-100">
              <Settings className="h-4 w-4 mr-2 text-gray-500" />
              Tax Settings
            </Button>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold">
              <Plus className="h-4 w-4 mr-2" />
              New Filing
            </Button>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {summaryMetrics.map((metric, index) => (
          <ReportSummaryCard
            key={index}
            {...metric}
            isCurrency={metric.title === "Total Tax Owed"}
          />
        ))}
      </div>

      <TabNavigation activeView={activeView} setActiveView={setActiveView} />

      <div className="mt-4">
        {activeView === "FILINGS" ? (
          <TaxFilingStatusTable />
        ) : (
          <TaxProfilesTable />
        )}
      </div>
    </div>
  );
}
