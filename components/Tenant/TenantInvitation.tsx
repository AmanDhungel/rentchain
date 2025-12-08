"use client";
import React, { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ArrowUpDown,
  Eye,
  FileText,
  Clock,
  Send,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Menu,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronLast,
  User,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MultiStepTenantInvitationForm } from "./InviteTenant";

// --- Types ---
type Status = "Sent" | "Viewed" | "Accepted" | "Declined" | "Expired";
type TabKey = "All" | "Active" | "Completed" | "Expired";

interface Invitation {
  id: number;
  name: string;
  email: string;
  phone: string;
  property: string;
  unit: string;
  status: Status;
  leaseTerm: string;
  leaseStart: string;
  dateSent: string;
  dateViewed?: string;
  dateResponse?: string;
  dateExpires: string;
  avatarFallback: string;
  isKycVerified: boolean;
}

const mockInvitations: Invitation[] = [
  {
    id: 1,
    name: "Michael Walker",
    email: "lorem@email.com",
    phone: "(555) 123-4567",
    property: "Skyline Towers",
    unit: "Apt. 4B",
    status: "Sent",
    leaseTerm: "12 months",
    leaseStart: "2025-02-01",
    dateSent: "2025-01-25",
    dateExpires: "2025-02-08",
    avatarFallback: "MW",
    isKycVerified: false,
  },
  {
    id: 2,
    name: "Sophie Headrick",
    email: "lorem@email.com",
    phone: "(555) 123-4567",
    property: "Skyline Towers",
    unit: "Apt. 4B",
    status: "Declined",
    leaseTerm: "12 months",
    leaseStart: "2025-02-01",
    dateSent: "2025-01-25",
    dateViewed: "2025-01-16",
    dateResponse: "2025-01-18",
    dateExpires: "2025-02-08",
    avatarFallback: "SH",
    isKycVerified: true,
  },
  {
    id: 3,
    name: "Cameron Drake",
    email: "lorem@email.com",
    phone: "(555) 123-4567",
    property: "Skyline Towers",
    unit: "Apt. 4B",
    status: "Viewed",
    leaseTerm: "6 months",
    leaseStart: "2025-02-15",
    dateSent: "2025-01-25",
    dateExpires: "2025-02-08",
    avatarFallback: "CD",
    isKycVerified: false,
  },
  {
    id: 4,
    name: "Doris Crowley",
    email: "lorem@email.com",
    phone: "(555) 123-4567",
    property: "Skyline Towers",
    unit: "Apt. 4B",
    status: "Accepted",
    leaseTerm: "12 months",
    leaseStart: "2025-02-01",
    dateSent: "2025-01-25",
    dateExpires: "2025-02-08",
    avatarFallback: "DC",
    isKycVerified: true,
  },
  {
    id: 5,
    name: "Thomas Bordelon",
    email: "lorem@email.com",
    phone: "(555) 123-4567",
    property: "Skyline Towers",
    unit: "Apt. 4B",
    status: "Expired",
    leaseTerm: "12 months",
    leaseStart: "2025-02-01",
    dateSent: "2025-01-25",
    dateExpires: "2025-02-08",
    avatarFallback: "TB",
    isKycVerified: true,
  },
];

const getStatusBadge = (status: Status) => {
  let icon: React.ReactNode;
  let text: string;
  let colorClass: string;

  switch (status) {
    case "Sent":
      icon = <Send className="h-3 w-3 mr-1" />;
      text = "Sent";
      colorClass =
        "bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-300";
      break;
    case "Viewed":
      icon = <Eye className="h-3 w-3 mr-1" />;
      text = "Viewed";
      colorClass =
        "bg-orange-100 text-orange-700 hover:bg-orange-200 border-orange-300";
      break;
    case "Accepted":
      icon = <CheckCircle className="h-3 w-3 mr-1" />;
      text = "Accepted";
      colorClass =
        "bg-green-100 text-green-700 hover:bg-green-200 border-green-300";
      break;
    case "Declined":
      icon = <XCircle className="h-3 w-3 mr-1" />;
      text = "Declined";
      colorClass = "bg-red-100 text-red-700 hover:bg-red-200 border-red-300";
      break;
    case "Expired":
      icon = <AlertTriangle className="h-3 w-3 mr-1" />;
      text = "Expired";
      colorClass = "bg-red-500 text-white hover:bg-red-600 border-red-700";
      break;
  }

  return (
    <Badge
      variant="outline"
      className={`min-w-[80px] justify-center capitalize font-semibold ${colorClass}`}>
      {status === "Sent" || status === "Declined" || status === "Expired" ? (
        <span className="text-xs">{text}</span>
      ) : (
        <>
          {icon}
          <span className="text-xs">{text}</span>
        </>
      )}
    </Badge>
  );
};

const calculateSummary = (data: Invitation[]) => {
  return {
    total: data.length,
    sent: data.filter((i) => i.status === "Sent").length,
    viewed: data.filter((i) => i.status === "Viewed").length,
    accepted: data.filter((i) => i.status === "Accepted").length,
    declined: data.filter((i) => i.status === "Declined").length,
    expired: data.filter((i) => i.status === "Expired").length,
  };
};

// --- Components ---

interface SummaryCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  hasBorder?: boolean;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  icon,
  color,
  hasBorder = true,
}) => (
  <Card className={`flex-1 min-w-[120px] ${hasBorder ? "border-r" : ""}`}>
    <CardContent className="p-1 flex items-center space-x-2">
      <div
        className={`p-1.5 w-10 h-10 rounded-sm ${color}/20 text-${color}-600`}>
        {icon}
      </div>
      <div>
        <div
          className={`text-xs bg-${color}-500 text-white py-1 px-2 rounded-sm`}>
          {title}
        </div>
        <div className="text-xl font-bold">{value}</div>
      </div>
    </CardContent>
  </Card>
);

const InvitationsTable: React.FC<{ data: Invitation[] }> = ({ data }) => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(data.map((i) => i.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev.filter((i) => i.id !== id));
    }
  };

  const isAllSelected = selectedIds.length === data.length && data.length > 0;
  const isIndeterminate =
    selectedIds.length > 0 && selectedIds.length < data.length;

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="w-10">
              <Checkbox
                checked={
                  isAllSelected || isIndeterminate
                    ? "indeterminate"
                    : isAllSelected
                }
                onCheckedChange={handleSelectAll as (checked: boolean) => void}
                aria-label="Select all"
              />
            </TableHead>
            <TableHead>Invitee</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead className="min-w-[150px]">
              Property & Unit
              <ArrowUpDown className="ml-1 h-3 w-3 inline cursor-pointer text-gray-400" />
            </TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="min-w-[150px]">
              Lease Term
              <ArrowUpDown className="ml-1 h-3 w-3 inline cursor-pointer text-gray-400" />
            </TableHead>
            <TableHead className="min-w-[200px]">
              Timeline
              <ArrowUpDown className="ml-1 h-3 w-3 inline cursor-pointer text-gray-400" />
            </TableHead>
            <TableHead className="w-[100px] text-center">KYC</TableHead>
            <TableHead className="w-[40px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((invitation) => (
            <TableRow
              key={invitation.id}
              className={
                invitation.status === "Expired"
                  ? "bg-red-50 hover:bg-red-100"
                  : ""
              }>
              <TableCell>
                <Checkbox
                  checked={selectedIds.includes(invitation.id)}
                  onCheckedChange={(checked) =>
                    handleSelectRow(invitation.id, checked as boolean)
                  }
                  aria-label={`Select row ${invitation.id}`}
                />
              </TableCell>
              <TableCell className="font-medium flex items-center">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage
                    src={`/avatars/${invitation.id}.png`}
                    alt={`@${invitation.name}`}
                  />
                  <AvatarFallback className="bg-gray-200 text-gray-600 text-xs">
                    {invitation.avatarFallback}
                  </AvatarFallback>
                </Avatar>
                <div>
                  {invitation.name}
                  <div className="text-xs text-gray-500">
                    ID: {invitation.id}
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-sm">
                <div className="text-gray-900">{invitation.email}</div>
                <div className="text-gray-500">{invitation.phone}</div>
              </TableCell>
              <TableCell className="text-sm">
                <div className="font-medium">{invitation.property}</div>
                <div className="text-gray-500">{invitation.unit}</div>
              </TableCell>
              <TableCell>{getStatusBadge(invitation.status)}</TableCell>
              <TableCell className="text-sm">
                <div className="font-medium">
                  ${invitation.leaseTerm.includes("months") ? "1200" : "1500"}
                  /month
                </div>
                <div className="text-gray-500">{invitation.leaseTerm}</div>
                <div className="text-xs text-gray-500">
                  Start: {invitation.leaseStart}
                </div>
              </TableCell>
              <TableCell className="text-sm">
                <div className="text-gray-900 flex items-center">
                  <Send className="h-3 w-3 mr-1 text-gray-500" /> Sent:{" "}
                  {invitation.dateSent}
                </div>
                {invitation.status === "Viewed" && (
                  <div className="text-gray-900 flex items-center">
                    <Eye className="h-3 w-3 mr-1 text-gray-500" /> Viewed:{" "}
                    {invitation.dateViewed}
                  </div>
                )}
                {invitation.status === "Declined" && (
                  <div className="text-gray-900 flex items-center">
                    <Clock className="h-3 w-3 mr-1 text-gray-500" /> Response:{" "}
                    {invitation.dateResponse}
                  </div>
                )}
                <div
                  className={`text-xs flex items-center ${
                    invitation.status === "Expired"
                      ? "text-red-600 font-medium"
                      : "text-gray-500"
                  }`}>
                  <AlertTriangle className="h-3 w-3 mr-1" /> Expires:{" "}
                  {invitation.dateExpires}
                </div>
              </TableCell>
              <TableCell className="text-center">
                <div className="flex items-center justify-center space-x-2">
                  <Eye className="h-4 w-4 text-gray-500 cursor-pointer hover:text-gray-700" />
                  <FileText className="h-4 w-4 text-gray-500 cursor-pointer hover:text-gray-700" />
                </div>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <Menu className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>View Invitation</DropdownMenuItem>
                    <DropdownMenuItem>Resend</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      Cancel
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const TenantInvitations: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<TabKey>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All Status");
  const [selectedProperty, setSelectedProperty] =
    useState<string>("All Properties");
  const [selectedSort, setSelectedSort] = useState<string>(
    "Sort By: Last 7 Days"
  );

  const filteredData = useMemo(() => {
    let data = mockInvitations.filter(
      (invitation) =>
        invitation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invitation.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invitation.property.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (selectedStatus !== "All Status") {
      data = data.filter((i) => i.status === selectedStatus);
    }

    if (selectedProperty !== "All Properties") {
      data = data.filter((i) => i.property === selectedProperty);
    }

    // Tab filtering
    switch (activeTab) {
      case "Active":
        return data.filter((i) => i.status === "Sent" || i.status === "Viewed");
      case "Completed":
        return data.filter(
          (i) => i.status === "Accepted" || i.status === "Declined"
        );
      case "Expired":
        return data.filter((i) => i.status === "Expired");
      case "All":
      default:
        return data;
    }
  }, [searchTerm, selectedStatus, selectedProperty, activeTab]);

  const summary = calculateSummary(mockInvitations); // Use original data for global summary

  // Pagination state (simplified)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentItems = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleTabChange = (value: string) => {
    setActiveTab(value as TabKey);
    setCurrentPage(1); // Reset page on tab change
  };

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">
          Tenant Invitations
        </h1>
        <div className="flex space-x-2">
          <Button variant="outline" className="text-sm font-medium">
            <span className="text-gray-700">Export</span>
            <ChevronDown className="ml-2 h-4 w-4 text-gray-500" />
          </Button>
          <MultiStepTenantInvitationForm />
        </div>
      </div>
      <p className="text-sm text-gray-500">
        Manage and track tenant invitations
      </p>

      <div className="flex flex-wrap  rounded-xl gap-3">
        <SummaryCard
          title="Total"
          value={summary.total}
          icon={<User className="h-7 w-7" />}
          color="blue"
        />
        <SummaryCard
          title="Sent"
          value={summary.sent}
          icon={<Send className="h-7 w-7" />}
          color="blue"
        />
        <SummaryCard
          title="Viewed"
          value={summary.viewed}
          icon={<Eye className="h-7 w-7" />}
          color="orange"
        />
        <SummaryCard
          title="Accepted"
          value={summary.accepted}
          icon={<CheckCircle className="h-7 w-7" />}
          color="green"
        />
        <SummaryCard
          title="Declined"
          value={summary.declined}
          icon={<XCircle className="h-7 w-7" />}
          color="red"
        />
        <SummaryCard
          title="Expired"
          value={summary.expired}
          icon={<AlertTriangle className="h-7 w-7" />}
          color="red"
          hasBorder={false}
        />
      </div>

      <div className="flex justify-between items-center space-x-4">
        <div className="flex items-center space-x-2 w-full max-w-sm">
          <Input
            placeholder="Search invitations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="min-w-[120px] justify-between">
                {selectedStatus}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[180px]">
              <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {[
                "All Status",
                "Sent",
                "Viewed",
                "Accepted",
                "Declined",
                "Expired",
              ].map((status) => (
                <DropdownMenuItem
                  key={status}
                  onClick={() => setSelectedStatus(status)}>
                  {status}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="min-w-[150px] justify-between">
                {selectedProperty}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[180px]">
              <DropdownMenuLabel>Filter by Property</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {[
                "All Properties",
                "Skyline Towers",
                "Ocean View",
                "Central Lofts",
              ].map((property) => (
                <DropdownMenuItem
                  key={property}
                  onClick={() => setSelectedProperty(property)}>
                  {property}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="min-w-[200px] justify-between">
                {selectedSort}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[220px]">
              <DropdownMenuLabel>Sort Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {[
                "Sort By: Last 7 Days",
                "Sort By: Newest",
                "Sort By: Oldest",
                "Sort By: Expiration",
              ].map((sort) => (
                <DropdownMenuItem
                  key={sort}
                  onClick={() => setSelectedSort(sort)}>
                  {sort}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="w-full">
        <TabsList className="w-full bg-white">
          <TabsTrigger
            value="All"
            className="data-[state=active]:border-b-2 data-[state=active]:border-b-orange-500 shadow-none! rounded-none data-[state=active]:text-orange-500">
            All ({summary.total})
          </TabsTrigger>
          <TabsTrigger
            value="Active"
            className="data-[state=active]:border-b-2 data-[state=active]:border-b-orange-500 shadow-none! rounded-none data-[state=active]:text-orange-500">
            Active (
            {
              mockInvitations.filter(
                (i) => i.status === "Sent" || i.status === "Viewed"
              ).length
            }
            )
          </TabsTrigger>
          <TabsTrigger
            value="Completed"
            className="data-[state=active]:border-b-2 data-[state=active]:border-b-orange-500 shadow-none! rounded-none data-[state=active]:text-orange-500">
            Completed (
            {
              mockInvitations.filter(
                (i) => i.status === "Accepted" || i.status === "Declined"
              ).length
            }
            )
          </TabsTrigger>
          <TabsTrigger
            value="Expired"
            className="data-[state=active]:border-b-2 data-[state=active]:border-b-orange-500 shadow-none! rounded-none data-[state=active]:text-orange-500">
            Expired ({summary.expired})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="All" className="mt-4">
          <InvitationsTable data={currentItems} />
        </TabsContent>
        <TabsContent value="Active" className="mt-4">
          <InvitationsTable data={currentItems} />
        </TabsContent>
        <TabsContent value="Completed" className="mt-4">
          <InvitationsTable data={currentItems} />
        </TabsContent>
        <TabsContent value="Expired" className="mt-4">
          <InvitationsTable data={currentItems} />
        </TabsContent>
      </Tabs>

      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Showing {currentItems.length} of {filteredData.length} entries
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="text-sm font-medium flex items-center">
            <span className="p-2 border rounded-md bg-orange-500 text-white min-w-[30px] text-center">
              {currentPage}
            </span>
            <span className="mx-2">...</span>
            <span className="p-2 border rounded-md min-w-[30px] text-center">
              {totalPages}
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TenantInvitations;
