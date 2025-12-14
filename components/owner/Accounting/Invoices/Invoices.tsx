"use client";

import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

import {
  ArrowLeft,
  Plus,
  Upload,
  Search,
  Eye,
  Edit,
  MoreVertical,
  AlertCircle,
  Send,
  FileText,
  CheckCircle,
  MoveLeft,
} from "lucide-react";
import Link from "next/link";

export type InvoiceStatus = "Paid" | "Overdue" | "Sent" | "Draft";

export interface Invoice {
  id: string;
  invoiceNumber: string;
  issueDate: string;
  tenantName: string;
  tenantAvatar: string; // URL to avatar
  propertyName: string;
  unit: string;
  amount: number;
  dueAmount?: number; // Optional, for cases like partially paid or overdue
  dueDate: string;
  status: InvoiceStatus;
  overdueDays?: number; // Optional, for overdue status
}

export const mockInvoices: Invoice[] = [
  {
    id: "1",
    invoiceNumber: "INV-2025-001",
    issueDate: "1/1/2025",
    tenantName: "Michael Walker",
    tenantAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=MW",
    propertyName: "Skyline Towers",
    unit: "Apt 4B",
    amount: 1200,
    dueDate: "1/31/2025",
    status: "Paid",
  },
  {
    id: "2",
    invoiceNumber: "INV-2025-002",
    issueDate: "1/1/2025",
    tenantName: "Cameron Drake",
    tenantAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=CD",
    propertyName: "Downtown Lofts",
    unit: "Unit 12A",
    amount: 1650,
    dueAmount: 1650, // All due
    dueDate: "1/31/2025",
    status: "Overdue",
    overdueDays: 274, // Example value
  },
  {
    id: "3",
    invoiceNumber: "INV-2025-003",
    issueDate: "1/1/2025",
    tenantName: "Doris Crowley",
    tenantAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=DC",
    propertyName: "Skyline Towers",
    unit: "Apt 2C",
    amount: 1150,
    dueAmount: 1150, // All due
    dueDate: "2/27/2025",
    status: "Sent",
  },
  {
    id: "4",
    invoiceNumber: "INV-2025-004",
    issueDate: "1/1/2025",
    tenantName: "Thomas Bordelon",
    tenantAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=TB",
    propertyName: "Penthouse A",
    unit: "Penthouse A",
    amount: 3700,
    dueAmount: 3700, // All due
    dueDate: "3/1/2025",
    status: "Draft",
  },
  {
    id: "5",
    invoiceNumber: "INV-2025-005",
    issueDate: "1/5/2025",
    tenantName: "Alice Johnson",
    tenantAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=AJ",
    propertyName: "Greenwood Apartments",
    unit: "Apt 10",
    amount: 800,
    dueDate: "2/5/2025",
    status: "Paid",
  },
  {
    id: "6",
    invoiceNumber: "INV-2025-006",
    issueDate: "1/6/2025",
    tenantName: "Bob Williams",
    tenantAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=BW",
    propertyName: "Riverbend Condos",
    unit: "Unit 5B",
    amount: 1500,
    dueAmount: 1500,
    dueDate: "2/6/2025",
    status: "Sent",
  },
  {
    id: "7",
    invoiceNumber: "INV-2025-007",
    issueDate: "1/7/2025",
    tenantName: "Charlie Brown",
    tenantAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=CB",
    propertyName: "Oakwood Estates",
    unit: "House 3",
    amount: 2200,
    dueAmount: 2200,
    dueDate: "2/7/2025",
    status: "Draft",
  },
  {
    id: "8",
    invoiceNumber: "INV-2025-008",
    issueDate: "1/8/2025",
    tenantName: "Diana Prince",
    tenantAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=DP",
    propertyName: "Paradise Island",
    unit: "Villa 1",
    amount: 5000,
    dueAmount: 5000,
    dueDate: "2/8/2025",
    status: "Overdue",
    overdueDays: 150,
  },
  {
    id: "9",
    invoiceNumber: "INV-2025-009",
    issueDate: "1/9/2025",
    tenantName: "Eve Adams",
    tenantAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=EA",
    propertyName: "Star City Flats",
    unit: "Apt 22B",
    amount: 950,
    dueDate: "2/9/2025",
    status: "Paid",
  },
  {
    id: "10",
    invoiceNumber: "INV-2025-010",
    issueDate: "1/10/2025",
    tenantName: "Frank White",
    tenantAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=FW",
    propertyName: "Gotham Towers",
    unit: "Penthouse B",
    amount: 4500,
    dueAmount: 4500,
    dueDate: "2/10/2025",
    status: "Sent",
  },
];

// components/InvoicesDashboard.tsx

// Utility to format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

// Metric Card Component
interface MetricCardProps {
  value: string | number;
  label: string;
  colorClass: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  value,
  label,
  colorClass,
}) => (
  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center justify-center">
    <div className={`text-3xl font-bold ${colorClass}`}>{value}</div>
    <div className="text-sm text-gray-500 mt-1">{label}</div>
  </div>
);

// Status Badge Component
const StatusBadge: React.FC<{
  status: InvoiceStatus;
  overdueDays?: number;
}> = ({ status, overdueDays }) => {
  let badgeClass = "";
  let icon = null;

  switch (status) {
    case "Paid":
      badgeClass = "bg-green-100 text-green-700";
      icon = <CheckCircle className="h-3 w-3 mr-1" />;
      break;
    case "Overdue":
      badgeClass = "bg-red-100 text-red-700";
      icon = <AlertCircle className="h-3 w-3 mr-1" />;
      break;
    case "Sent":
      badgeClass = "bg-blue-100 text-blue-700";
      icon = <Send className="h-3 w-3 mr-1" />;
      break;
    case "Draft":
      badgeClass = "bg-purple-100 text-purple-700";
      icon = <FileText className="h-3 w-3 mr-1" />;
      break;
    default:
      badgeClass = "bg-gray-100 text-gray-700";
  }

  return (
    <Badge
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${badgeClass}`}>
      {icon}
      {status}
      {status === "Overdue" && overdueDays && (
        <span className="ml-1 text-red-600">({overdueDays} days)</span>
      )}
    </Badge>
  );
};

export default function InvoicesDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<InvoiceStatus | "All">(
    "All"
  );
  const [selectedPeriod, setSelectedPeriod] = useState<string>("All"); // e.g., 'All', 'This Month', 'Last Month'
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // As shown in the image

  const filteredInvoices = useMemo(() => {
    let filtered = mockInvoices;

    if (searchTerm) {
      filtered = filtered.filter(
        (invoice) =>
          invoice.invoiceNumber
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          invoice.tenantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          invoice.propertyName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedStatus !== "All") {
      filtered = filtered.filter(
        (invoice) => invoice.status === selectedStatus
      );
    }

    // Period filtering would be more complex, involving date comparisons.
    // For simplicity, we'll just implement a basic placeholder.
    if (selectedPeriod !== "All") {
      // Example: filter by current year (rough implementation)
      const currentYear = new Date().getFullYear().toString();
      filtered = filtered.filter((invoice) =>
        invoice.issueDate.includes(currentYear)
      );
    }

    return filtered;
  }, [searchTerm, selectedStatus, selectedPeriod]);

  const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentInvoices = filteredInvoices.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Calculate metrics
  const totalInvoices = filteredInvoices.length;
  const paidAmount = filteredInvoices
    .filter((inv) => inv.status === "Paid")
    .reduce((sum, inv) => sum + inv.amount, 0);
  const outstandingAmount = filteredInvoices
    .filter((inv) => inv.status !== "Paid" && inv.status !== "Draft")
    .reduce((sum, inv) => sum + (inv.dueAmount || inv.amount), 0); // Sum up due amounts for non-paid/draft
  const overdueInvoices = filteredInvoices.filter(
    (inv) => inv.status === "Overdue"
  ).length;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="p-6 pl-0 min-h-screen font-sans">
      <header className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Link href={"/accounting/accountingandbilling"} className="mr-2">
            <MoveLeft className="h-5 w-5 text-gray-600" />
          </Link>
          <h1 className="text-2xl font-semibold text-gray-800">Invoices</h1>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            className="flex items-center text-sm font-medium text-gray-700">
            <Upload className="h-4 w-4 mr-2" /> Export
          </Button>
          <Button className="flex items-center text-sm font-medium bg-orange-500 hover:bg-orange-600 text-white">
            <Plus className="h-4 w-4 mr-2" /> New Invoice
          </Button>
        </div>
      </header>
      <p className="text-sm text-gray-500 mb-6 pl-10">
        {mockInvoices.length} invoices •{" "}
        {formatCurrency(mockInvoices.reduce((sum, inv) => sum + inv.amount, 0))}{" "}
        total
      </p>

      <div className="grid grid-cols-4 gap-4 mb-8">
        <MetricCard
          value={totalInvoices}
          label="Total Invoices"
          colorClass="text-blue-600"
        />
        <MetricCard
          value={formatCurrency(paidAmount)}
          label="Paid Amount"
          colorClass="text-green-600"
        />
        <MetricCard
          value={formatCurrency(outstandingAmount)}
          label="Outstanding"
          colorClass="text-purple-600"
        />
        <MetricCard
          value={overdueInvoices}
          label="Overdue"
          colorClass="text-red-600"
        />
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search Invoices..."
            className="pl-9 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-3">
          <Select
            onValueChange={(value: InvoiceStatus | "All") =>
              setSelectedStatus(value)
            }
            value={selectedStatus}>
            <SelectTrigger className="w-[180px] border border-gray-300 rounded-md">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Status</SelectItem>
              <SelectItem value="Paid">Paid</SelectItem>
              <SelectItem value="Overdue">Overdue</SelectItem>
              <SelectItem value="Sent">Sent</SelectItem>
              <SelectItem value="Draft">Draft</SelectItem>
            </SelectContent>
          </Select>
          <Select
            onValueChange={(value) => setSelectedPeriod(value)}
            value={selectedPeriod}>
            <SelectTrigger className="w-[180px] border border-gray-300 rounded-md">
              <SelectValue placeholder="All Periods" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Periods</SelectItem>
              <SelectItem value="This Month">This Month</SelectItem>
              <SelectItem value="Last Month">Last Month</SelectItem>
              <SelectItem value="This Year">This Year</SelectItem>
              {/* Add more period options */}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox />
              </TableHead>
              <TableHead>Invoice #</TableHead>
              <TableHead>Tenant</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentInvoices.length > 0 ? (
              currentInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-gray-800">
                      {invoice.invoiceNumber}
                    </div>
                    <div className="text-xs text-gray-500">
                      Issued: {invoice.issueDate}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={invoice.tenantAvatar}
                          alt={invoice.tenantName}
                        />
                        <AvatarFallback>
                          {invoice.tenantName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-gray-800">
                          {invoice.tenantName}
                        </div>
                        <div className="text-xs text-gray-500">
                          {invoice.propertyName}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{invoice.unit}</TableCell>
                  <TableCell>
                    <div className="font-medium text-gray-800">
                      {formatCurrency(invoice.amount)}
                    </div>
                    {invoice.dueAmount &&
                      invoice.amount !== invoice.dueAmount && (
                        <div className="text-xs text-red-500">
                          {formatCurrency(invoice.dueAmount)} due
                        </div>
                      )}
                    {invoice.status === "Overdue" && (
                      <div className="text-xs text-red-500">
                        {formatCurrency(invoice.amount)} due
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-gray-800">
                      {invoice.dueDate}
                    </div>
                    {invoice.status === "Overdue" && invoice.overdueDays && (
                      <div className="text-xs text-red-500">
                        {invoice.overdueDays} days overdue
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <StatusBadge
                      status={invoice.status}
                      overdueDays={invoice.overdueDays}
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="flex items-center">
                          <Eye className="h-4 w-4 mr-2" /> View
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center">
                          <Edit className="h-4 w-4 mr-2" /> Edit
                        </DropdownMenuItem>
                        {/* Add more actions as needed */}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="h-24 text-center text-gray-500">
                  No invoices found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="flex justify-between items-center px-6 py-4 border-t border-gray-100">
          <div className="text-sm text-gray-600">
            Showing {Math.min(startIndex + 1, filteredInvoices.length)} to{" "}
            {Math.min(startIndex + itemsPerPage, filteredInvoices.length)} of{" "}
            {filteredInvoices.length} entries
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(currentPage - 1);
                  }}
                  className={
                    currentPage === 1 ? "pointer-events-none opacity-50" : ""
                  }
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(page);
                      }}
                      isActive={currentPage === page}>
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}
              {totalPages > 5 && currentPage < totalPages - 2 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}{" "}
              {/* Example ellipsis logic */}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(currentPage + 1);
                  }}
                  className={
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}
