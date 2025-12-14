"use client";
import React, { useState } from "react";
import {
  DollarSign,
  Briefcase,
  Search,
  Plus,
  ChevronDown,
  Eye,
  PenLine,
  ChevronRight,
  ClipboardList,
  ArrowRight,
  BookOpen,
  MoveLeft,
} from "lucide-react";

// Shadcn imports (assuming they are available)
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

// --- Data Structure ---
interface AccountEntry {
  id: string;
  code: string;
  name: string;
  description: string;
  amount: number;
  status: "Active" | "Inactive";
  canEdit: boolean;
  isCollapsible?: boolean;
}

interface AccountGroup {
  id: string;
  name: string;
  icon: React.ElementType;
  balance: number;
  color: string;
  isOpen: boolean;
  entries: AccountEntry[];
}

// --- Mock Data (Based on the image) ---
const mockAccounts: AccountGroup[] = [
  {
    id: "assets",
    name: "Assets",
    icon: Briefcase,
    balance: 2917400,
    color: "text-blue-600",
    isOpen: true,
    entries: [
      {
        id: "4100",
        code: "4100",
        name: "Rental Income",
        description: "Primary rental income from tenants",
        amount: 156000,
        status: "Active",
        canEdit: true,
      },
      {
        id: "4200",
        code: "4200",
        name: "Service Charges",
        description: "Additional service charges and fees",
        amount: 156000,
        status: "Active",
        canEdit: true,
      },
      {
        id: "4300",
        code: "4300",
        name: "Late Payment Fees",
        description: "Fees collected for late rent payments",
        amount: 156000,
        status: "Active",
        canEdit: true,
      },
      {
        id: "4400",
        code: "4400",
        name: "Utility Reimbursements",
        description: "Utility costs recovered from tenants",
        amount: 156000,
        status: "Active",
        canEdit: true,
      },
    ],
  },
  {
    id: "liabilities",
    name: "Liabilities",
    icon: ClipboardList,
    balance: 44900,
    color: "text-red-500",
    isOpen: false,
    entries: [],
  },
  {
    id: "income",
    name: "Income",
    icon: DollarSign,
    balance: 189450,
    color: "text-green-600",
    isOpen: false,
    entries: [],
  },
  {
    id: "expenses",
    name: "Expenses",
    icon: BookOpen,
    balance: 90550,
    color: "text-yellow-600",
    isOpen: false,
    entries: [],
  },
];

// --- Utility Functions ---
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

// --- Components ---

// Summary Card Component
const SummaryCard: React.FC<{
  title: string;
  amount: number;
  icon: React.ElementType;
  iconColor: string;
  amountColor: string;
}> = ({ title, amount, icon: Icon, iconColor, amountColor }) => (
  <Card className="flex items-center p-4 shadow-sm hover:shadow-md transition-shadow">
    <div
      className={`p-3 rounded-xl ${iconColor} bg-opacity-10`}
      style={{ backgroundColor: `${iconColor}10` }}>
      <Icon className={`h-6 w-6 ${iconColor}`} />
    </div>
    <div className="ml-4">
      <p className="text-sm text-gray-500">{title}</p>
      <p className={`text-2xl font-bold ${amountColor}`}>
        {formatCurrency(amount)}
      </p>
    </div>
  </Card>
);

const AccountRow: React.FC<{ entry: AccountEntry; isNested: boolean }> = ({
  entry,
  isNested,
}) => (
  <div
    className={
      "flex items-center p-3 border-b border-gray-100 hover:bg-gray-50 transition-colors " +
      (isNested ? "pl-10 text-sm" : "pl-4 text-base font-semibold")
    }>
    <div className="flex-1 flex gap-2 items-center min-w-[150px]   space-y-0.5">
      <p className="text-lg text-gray-500 md:-ml-5 md:mr-5">{entry.code}</p>
      <p className="font-medium text-gray-800">
        {entry.name}
        {entry.description && (
          <p className="text-xs text-gray-500 font-normal">
            {entry.description}
          </p>
        )}
      </p>
    </div>

    <div className="w-24 text-right text-sm font-semibold text-green-600">
      {formatCurrency(entry.amount)}
    </div>

    <div className="w-20 text-center">
      <Badge
        variant="outline"
        className={`text-xs px-2 py-0.5 font-medium ${
          entry.status === "Active"
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}>
        {entry.status}
      </Badge>
    </div>

    <div className="w-20 flex justify-end space-x-2 text-gray-400">
      <button aria-label="View Account">
        <Eye className="h-4 w-4 hover:text-blue-500" />
      </button>
      {entry.canEdit && (
        <button aria-label="Edit Account">
          <PenLine className="h-4 w-4 hover:text-blue-500" />
        </button>
      )}
    </div>
  </div>
);

const AccountGroupHeader: React.FC<{
  group: AccountGroup;
  toggleGroup: (id: string) => void;
}> = ({ group, toggleGroup }) => (
  <div
    className={`flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100 transition-colors border-y`}
    onClick={() => toggleGroup(group.id)}>
    <div className="flex items-center space-x-3">
      <button aria-label={`Toggle ${group.name} section`} className="p-1">
        {group.isOpen ? (
          <ChevronDown className="h-5 w-5 text-gray-600 transition-transform" />
        ) : (
          <ChevronRight className="h-5 w-5 text-gray-600 transition-transform" />
        )}
      </button>
      <group.icon className={`h-5 w-5 ${group.color}`} />
      <h3 className="text-lg font-semibold text-gray-800">{group.name}</h3>
    </div>
    <div className="text-lg font-bold text-gray-800">
      {group.name === "Assets"
        ? formatCurrency(group.balance)
        : formatCurrency(group.balance)}
    </div>
  </div>
);

const ChartOfAccounts: React.FC = () => {
  const [accounts, setAccounts] = useState(mockAccounts);

  const toggleGroup = (id: string) => {
    setAccounts((prev) =>
      prev.map((group) =>
        group.id === id ? { ...group, isOpen: !group.isOpen } : group
      )
    );
  };

  const totalAssets = 2917400; // Calculated from mock data
  const totalIncome = 189450; // Calculated from mock data

  return (
    <div className="p-4 md:p-8 pl-0 md:pl-0 min-h-screen ">
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <h1 className="flex  gap-2 text-2xl font-bold text-gray-900">
            <Link href={"/accounting/accountingandbilling"} className="mt-auto">
              <MoveLeft />
            </Link>
            Chart of Accounts
          </h1>
          <div className="flex space-x-3">
            <Button
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-100">
              <ArrowRight className="h-4 w-4 mr-2 text-gray-500" />
              Export Report
            </Button>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold">
              <Plus className="h-4 w-4 mr-2" />
              Add Account
            </Button>
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-1 ml-9">
          Property accounting structure
        </p>
      </header>
      {/* Search and Filter */}
      <div className="flex items-center space-x-4 mb-8">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input placeholder="Search accounts structure" className="pl-10" />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <SummaryCard
          title="Total Assets"
          amount={totalAssets}
          icon={Briefcase}
          iconColor="text-blue-500"
          amountColor="text-blue-500"
        />
        <SummaryCard
          title="Total Income"
          amount={totalIncome}
          icon={DollarSign}
          iconColor="text-green-500"
          amountColor="text-green-500"
        />
      </div>

      {/* Account Structure List */}
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Account Structure
      </h2>
      <Card className="shadow-lg border-none">
        <CardContent className="p-0 divide-y divide-gray-200">
          {accounts.map((group) => (
            <div key={group.id} className="w-full">
              <AccountGroupHeader group={group} toggleGroup={toggleGroup} />
              {group.isOpen && (
                <div
                  className={`bg-white transition-all duration-300 ease-in-out ${
                    group.entries.length > 0 ? "py-2" : "p-4 text-gray-500"
                  }`}>
                  {/* Special case: Assets list has a nested structure called 'Operating Revenue' */}
                  {group.id === "assets" && (
                    <div className="px-4 py-2 text-gray-700 font-semibold flex justify-between items-center bg-gray-50 border-b">
                      <span className="text-sm">Operating Revenue</span>
                      <span className="text-sm text-blue-600">
                        {formatCurrency(156000)}
                      </span>
                    </div>
                  )}

                  {group.entries.length > 0 ? (
                    group.entries.map((entry) => (
                      <AccountRow
                        key={entry.id}
                        entry={entry}
                        isNested={group.id === "assets"}
                      />
                    ))
                  ) : (
                    <div className="text-center py-4 text-gray-500">
                      {group.id === "assets"
                        ? "No main assets found."
                        : `No ${group.name.toLowerCase()} recorded.`}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default ChartOfAccounts;
