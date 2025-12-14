"use client";

import React, { useState } from "react";
import {
  ArrowLeft,
  Download,
  Search,
  ChevronDown,
  CheckCircle,
  XCircle,
  Plus,
  MoveLeft,
} from "lucide-react";
import { H2, Small, Text, cx } from "@/lib/Typography";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import RecordPaymentDialog from "./ReceiptForm";

// --- 1. Data Structures ---

type Tab = "Payments" | "Refunds" | "Adjustments";

interface TabButtonProps {
  tab: Tab;
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

interface Tenant {
  name: string;
  invoiceRef: string;
  avatarInitials: string;
}

interface PaymentRecord {
  id: number;
  tenant: Tenant;
  date: string;
  amount: string;
  method: string;
  status: "Completed" | "Failed";
  reference: string;
}

interface RefundRecord {
  id: number;
  tenant: Tenant;
  date: string;
  amount: string;
  reason: string;
  method: string;
  status: "Completed";
}

interface AdjustmentRecord {
  id: number;
  tenant: Tenant;
  date: string;
  amount: string;
  method: string;
  reason: string;
  status: "Approved";
}

// --- Mock Data ---

const tenants = {
  michael: {
    name: "Michael Walker",
    invoiceRef: "INV-2025-001",
    avatarInitials: "MW",
  },
  cameron: {
    name: "Cameron Drake",
    invoiceRef: "INV-2025-002",
    avatarInitials: "CD",
  },
  doris: {
    name: "Doris Crowley",
    invoiceRef: "INV-2025-003",
    avatarInitials: "DC",
  },
};

const payments: PaymentRecord[] = [
  {
    id: 1,
    tenant: tenants.michael,
    date: "1/1/2025",
    amount: "$1,200",
    method: "$ Bank Transfer",
    status: "Completed",
    reference: "TXN123456",
  },
  {
    id: 2,
    tenant: tenants.cameron,
    date: "1/15/2025",
    amount: "$750",
    method: "Card",
    status: "Failed",
    reference: "PAY-002",
  },
  {
    id: 3,
    tenant: tenants.doris,
    date: "1/20/2025",
    amount: "$575",
    method: "$ Bank Transfer",
    status: "Completed",
    reference: "TXN789012",
  },
];

const refunds: RefundRecord[] = [
  {
    id: 1,
    tenant: tenants.michael,
    date: "1/1/2025",
    amount: "1,200",
    reason: "Overpayment Refund",
    method: "$ Bank Transfer",
    status: "Completed",
  },
];

const adjustments: AdjustmentRecord[] = [
  {
    id: 1,
    tenant: tenants.michael,
    date: "1/1/2025",
    amount: "+50",
    method: "Card",
    reason: "Late Fee Waiver",
    status: "Approved",
  },
];

// --- 2. Shared Components ---

// Status Badge Component
const StatusBadge: React.FC<{
  status: "Completed" | "Failed" | "Approved";
}> = ({ status }) => {
  const icon =
    status === "Completed" || status === "Approved" ? (
      <CheckCircle className="w-3 h-3 mr-1" />
    ) : (
      <XCircle className="w-3 h-3 mr-1" />
    );
  const className =
    status === "Completed"
      ? "bg-green-100 text-green-700 hover:bg-green-100"
      : status === "Failed"
      ? "bg-red-100 text-red-700 hover:bg-red-100"
      : "bg-green-100 text-green-700 hover:bg-green-100"; // Approved

  return (
    <Badge
      className={cx("flex items-center justify-center font-medium", className)}>
      {icon}
      {status}
    </Badge>
  );
};

// Tenant Cell Component
const TenantCell: React.FC<{ tenant: Tenant }> = ({ tenant }) => (
  <div className="flex items-center space-x-3">
    <Avatar className="h-7 w-7">
      <AvatarFallback className="bg-orange-200 text-xs font-semibold text-orange-700">
        {tenant.avatarInitials}
      </AvatarFallback>
    </Avatar>
    <div>
      <Text variant="body" className="font-medium mb-0 ">
        {tenant.name}
      </Text>
      <Small>{tenant.invoiceRef}</Small>
    </div>
  </div>
);

// --- 3. Table Views ---

const PaymentTable: React.FC = () => (
  <>
    <div className="flex justify-between items-center mb-4">
      <Text variant="title" as="h3">
        Payment Records
      </Text>
      <Button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold">
        Process Refund
      </Button>
    </div>
    <div className="border rounded-lg">
      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox />
            </TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Tenant</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Reference</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.map((record) => (
            <TableRow key={record.id}>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell>
                <Text variant="body">{record.date}</Text>
              </TableCell>
              <TableCell>
                <TenantCell tenant={record.tenant} />
              </TableCell>
              <TableCell>
                <Text variant="body" className="font-semibold">
                  {record.amount}
                </Text>
              </TableCell>
              <TableCell>
                <Text variant="body">{record.method}</Text>
              </TableCell>
              <TableCell>
                <StatusBadge status={record.status} />
              </TableCell>
              <TableCell>
                <Text variant="body">{record.reference}</Text>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  </>
);

const RefundTable: React.FC = () => (
  <>
    <Text variant="title" as="h3" className="mb-4">
      Refund Records
    </Text>
    <div className="border rounded-lg">
      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox />
            </TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Tenant</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Reason</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {refunds.map((record) => (
            <TableRow key={record.id}>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell>
                <Text variant="body">{record.date}</Text>
              </TableCell>
              <TableCell>
                <TenantCell tenant={record.tenant} />
              </TableCell>
              <TableCell>
                <Text variant="body" className="font-semibold text-red-600">
                  -${record.amount}
                </Text>
              </TableCell>
              <TableCell>
                <Text variant="body">{record.reason}</Text>
              </TableCell>
              <TableCell>
                <Text variant="body">{record.method}</Text>
              </TableCell>
              <TableCell>
                <StatusBadge status={record.status} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  </>
);

const AdjustmentTable: React.FC = () => (
  <>
    <div className="flex justify-between items-center mb-4">
      <Text variant="title" as="h3">
        Account Adjustments
      </Text>
      <Button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold">
        <Plus className="w-4 h-4 mr-2" />
        New Adjustment
      </Button>
    </div>
    <div className="border rounded-lg">
      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox />
            </TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Tenant</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Reason</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {adjustments.map((record) => (
            <TableRow key={record.id}>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell>
                <Text variant="body">{record.date}</Text>
              </TableCell>
              <TableCell>
                <TenantCell tenant={record.tenant} />
              </TableCell>
              <TableCell>
                <Text variant="body" className="font-semibold text-green-600">
                  {record.amount}
                </Text>
              </TableCell>
              <TableCell>
                <Text variant="body">{record.method}</Text>
              </TableCell>
              <TableCell>
                <Text variant="body">{record.reason}</Text>
              </TableCell>
              <TableCell>
                <StatusBadge status={record.status} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  </>
);
const TabButton: React.FC<TabButtonProps> = ({
  tab,
  activeTab,
  setActiveTab,
}) => (
  <button
    onClick={() => setActiveTab(tab)}
    className={cx(
      "relative py-2 px-6 font-semibold transition-colors duration-200",
      activeTab === tab
        ? "text-orange-500"
        : "text-gray-500 hover:text-gray-700"
    )}>
    <Text variant="body">{tab}</Text>
    {activeTab === tab && (
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500"></div>
    )}
  </button>
);

const SummaryCard: React.FC<{
  title: string;
  amount: string;
  color: string;
}> = ({ title, amount, color }) => (
  <Card className="shadow-sm">
    <CardContent className="flex flex-col items-start p-6">
      <Text variant="h2" className={cx(" font-extrabold mb-1", color)}>
        {amount}
      </Text>
      <Small className=" text-gray-500">{title}</Small>
    </CardContent>
  </Card>
);

export function ReceiptsPaymentsDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("Payments");
  const router = useRouter();

  const renderTable = () => {
    switch (activeTab) {
      case "Payments":
        return <PaymentTable />;
      case "Refunds":
        return <RefundTable />;
      case "Adjustments":
        return <AdjustmentTable />;
      default:
        return null;
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-10 lg:p-12 lg:pl-0 md:pl-0 sm:pl-0">
      <div className="flex justify-between items-center border-b pb-4 mb-6">
        <div className="flex items-center space-x-3">
          <Button
            onClick={() => router.back()}
            variant="ghost"
            size="icon"
            className="hover:bg-transparent cursor-pointer">
            <MoveLeft className="h-7 w-7 text-gray-700" />
          </Button>
          <div>
            <H2 className=" font-bold">Receipts & Payments</H2>
            <Small>Manage payment records and adjustments</Small>
          </div>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="text-sm font-semibold">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold">
            <RecordPaymentDialog />
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <SummaryCard
          title="Today's Receipts"
          amount="$1,975"
          color="text-green-600"
        />
        <SummaryCard title="This Month" amount="$8,400" color="text-gray-800" />
        <SummaryCard
          title="Failed Payments"
          amount="$750"
          color="text-red-600"
        />
        <SummaryCard
          title="Total Refunds"
          amount="$200"
          color="text-gray-800"
        />
      </div>

      {/* Search and Filters */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input placeholder="Search payments..." className="pl-10" />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-4 font-normal">
              All Status
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
            {/* Add filter items here */}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 mb-6">
        <TabButton
          tab="Payments"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <TabButton
          tab="Refunds"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <TabButton
          tab="Adjustments"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>

      {/* Dynamic Content (Tables) */}
      <div className="min-h-[400px]">{renderTable()}</div>
    </div>
  );
}
