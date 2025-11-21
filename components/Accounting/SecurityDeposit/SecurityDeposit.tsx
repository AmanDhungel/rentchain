// components/SecurityDepositsDashboard.tsx
"use client";

import React from "react";
import {
  ArrowLeft,
  Download,
  Search,
  ChevronDown,
  Eye,
  DollarSign,
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

// --- Data Structures ---

type DepositStatus = "Held" | "Partially Applied" | "Refunded";

interface DepositRecord {
  id: number;
  tenantName: string;
  tenantDetails: string;
  avatarInitials: string;
  property: string;
  originalAmount: string;
  currentBalance: string;
  interest?: string;
  collectedDate: string;
  status: DepositStatus;
}

// --- Mock Data ---

const deposits: DepositRecord[] = [
  {
    id: 1,
    tenantName: "Michael Walker",
    tenantDetails: "Skyline Towers",
    avatarInitials: "MW",
    property: "Apt 4B",
    originalAmount: "$1,200",
    currentBalance: "$2,448.5",
    interest: "+$48.5 interest",
    collectedDate: "6/1/2024",
    status: "Held",
  },
  {
    id: 2,
    tenantName: "Cameron Drake",
    tenantDetails: "Downtown Lofts",
    avatarInitials: "CD",
    property: "Unit 12A",
    originalAmount: "$1,650",
    currentBalance: "$2,850",
    collectedDate: "8/15/2024",
    status: "Partially Applied",
  },
  {
    id: 3,
    tenantName: "Doris Crowley",
    tenantDetails: "Skyline Towers",
    avatarInitials: "DC",
    property: "Penthouse A",
    originalAmount: "$3,600",
    currentBalance: "$1,200",
    collectedDate: "6/1/2023",
    status: "Refunded",
  },
];

// --- Shared Components ---

// Status Badge Component
const StatusBadge: React.FC<{ status: DepositStatus }> = ({ status }) => {
  let className = "";
  switch (status) {
    case "Held":
      className = "bg-blue-100 text-blue-700 hover:bg-blue-100";
      break;
    case "Partially Applied":
      className = "bg-red-100 text-red-700 hover:bg-red-100";
      break;
    case "Refunded":
      className = "bg-green-100 text-green-700 hover:bg-green-100";
      break;
  }

  return <Badge className={cx("font-medium", className)}>{status}</Badge>;
};

// Tenant Cell Component
const TenantCell: React.FC<{ record: DepositRecord }> = ({ record }) => (
  <div className="flex items-center space-x-3">
    <Avatar className="h-9 w-9">
      <AvatarFallback className="bg-orange-200 text-xs font-semibold text-orange-700">
        {record.avatarInitials}
      </AvatarFallback>
    </Avatar>
    <div>
      <Text variant="body" className="font-medium mb-0 ">
        {record.tenantName}
      </Text>
      <Small>{record.tenantDetails}</Small>
    </div>
  </div>
);

// Summary Card Component
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

// --- Main Table Component ---

const DepositsTable: React.FC = () => (
  <div className="border rounded-lg">
    <Table>
      <TableHeader className="bg-gray-50">
        <TableRow>
          <TableHead className="w-[50px]">
            <Checkbox />
          </TableHead>
          <TableHead>Tenant</TableHead>
          <TableHead>Property/Unit</TableHead>
          <TableHead>Original Amount</TableHead>
          <TableHead>Current Balance</TableHead>
          <TableHead>Collected Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>KYC</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {deposits.map((record) => (
          <TableRow key={record.id}>
            <TableCell>
              <Checkbox />
            </TableCell>
            <TableCell>
              <TenantCell record={record} />
            </TableCell>
            <TableCell>
              <Text variant="body" className="font-medium">
                {record.property}
              </Text>
              <Small>{record.tenantDetails}</Small>
            </TableCell>
            <TableCell>
              <Text variant="body" className="font-medium text-gray-700">
                {record.originalAmount}
              </Text>
            </TableCell>
            <TableCell>
              <Text
                variant="body"
                className="font-semibold text-green-600 mb-0 ">
                {record.currentBalance}
              </Text>
              {record.interest && (
                <Small className=" text-green-500">{record.interest}</Small>
              )}
            </TableCell>
            <TableCell>
              <Text variant="body">{record.collectedDate}</Text>
            </TableCell>
            <TableCell>
              <StatusBadge status={record.status} />
            </TableCell>
            <TableCell>
              <Eye className="h-4 w-4 text-gray-500 hover:text-blue-500 cursor-pointer" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

export function SecurityDepositsDashboard() {
  const router = useRouter();
  return (
    <div className="p-4 pl-0 sm:pl-0 md:pl-0 lg:pl-0 sm:p-6 md:p-10 lg:p-12  mx-auto">
      <div className="flex justify-between items-center border-b pb-4 mb-6">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-transparent cursor-pointer"
            onClick={() => router.back()}>
            <MoveLeft className="h-5 w-5 text-gray-700" />
          </Button>
          <div>
            <H2 className=" font-bold">Security Deposits</H2>
            <Small>Manage tenant security deposits</Small>
          </div>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="text-sm font-semibold">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold">
            <DollarSign className="h-4 w-4 mr-2" />
            Collect Deposit
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <SummaryCard
          title="Total Held"
          amount="$5,098.5"
          color="text-blue-600"
        />
        <SummaryCard
          title="Total Applied"
          amount="$350"
          color="text-gray-800"
        />
        <SummaryCard
          title="Total Refunded"
          amount="$1,200"
          color="text-gray-800"
        />
      </div>

      {/* Search and Filters */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input placeholder="Search deposits..." className="pl-10" />
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

      {/* Deposits Table */}
      <DepositsTable />
    </div>
  );
}
