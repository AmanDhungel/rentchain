"use client";
import React, { useState, useMemo, useCallback } from "react";
import {
  Search,
  Users,
  Hand,
  Clock,
  DollarSign,
  Activity,
  ChevronLeft,
  ChevronRight,
  Eye,
  FileText,
  Mail,
  Building2,
  House,
  RefreshCw,
  LucideIcon,
  UserStar,
  MessageSquareWarning,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { Button, Card, CardContent, Input } from "../ui";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { MultiStepTenantInvitationForm } from "./InviteTenant";
import { useRouter } from "next/navigation";

const FilterSelect: React.FC<{
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}> = ({ options, value, onChange, placeholder, className = "" }) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className={`flex h-10 w-fit rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-black focus:ring-black focus:outline-none ${className}`}>
    <option value="">{placeholder}</option>
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

const initialTenants = [
  {
    id: 1,
    name: "Michael Walker",
    email: "lorem@email.com",
    property: "Skyline Towers",
    unit: "Apt 4B",
    status: "Applicant",
    leaseAndRent: "$1200/month, 18 months tenure",
    paymentScore: 4,
    renewalProb: 0,
    kyc: true,
    avatarUrl: "https://placehold.co/40x40/5c5c8a/ffffff?text=MW",
  },
  {
    id: 2,
    name: "Sophie Headrick",
    email: "lorem@email.com",
    property: "Skyline Towers",
    unit: "Apt 4B",
    status: "Moved Out",
    leaseAndRent: "$1200/month, 0 months tenure",
    paymentScore: 5,
    renewalProb: 0,
    kyc: true,
    avatarUrl: "https://placehold.co/40x40/9966cc/ffffff?text=SH",
  },
  {
    id: 3,
    name: "Cameron Drake",
    email: "lorem@email.com",
    property: "Central Park",
    unit: "Unit 1A",
    status: "Active",
    leaseAndRent: "$1500/month, 16 months tenure",
    paymentScore: 4,
    renewalProb: 40,
    kyc: true,
    avatarUrl: "https://placehold.co/40x40/4c7590/ffffff?text=CD",
  },
  {
    id: 4,
    name: "Doris Crowley",
    email: "lorem@email.com",
    property: "Central Park",
    unit: "Unit 1A",
    status: "Active",
    leaseAndRent: "$1500/month, 36 months tenure",
    paymentScore: 5,
    renewalProb: 60,
    kyc: true,
    avatarUrl: "https://placehold.co/40x40/cc9966/ffffff?text=DC",
  },
  {
    id: 5,
    name: "Thomas Bordelon",
    email: "lorem@email.com",
    property: "Skyline Towers",
    unit: "Apt 4B",
    status: "Active",
    leaseAndRent: "$1200/month, 36 months tenure",
    paymentScore: 3,
    renewalProb: 85,
    kyc: true,
    avatarUrl: "https://placehold.co/40x40/66cc99/ffffff?text=TB",
  },
  // Adding more data for better pagination/filtering demo
  {
    id: 6,
    name: "Alice Johnson",
    email: "alice@email.com",
    property: "Riverwalk",
    unit: "PH-1",
    status: "Active",
    leaseAndRent: "$2500/month, 6 months tenure",
    paymentScore: 5,
    renewalProb: 90,
    kyc: false,
    avatarUrl: "https://placehold.co/40x40/cc6666/ffffff?text=AJ",
  },
  {
    id: 7,
    name: "Bob Smith",
    email: "bob@email.com",
    property: "Skyline Towers",
    unit: "Apt 12C",
    status: "Overdue",
    leaseAndRent: "$1800/month, 24 months tenure",
    paymentScore: 2,
    renewalProb: 10,
    kyc: true,
    avatarUrl: "https://placehold.co/40x40/6688cc/ffffff?text=BS",
  },
  {
    id: 8,
    name: "Clara Oswald",
    email: "clara@email.com",
    property: "Central Park",
    unit: "Unit 5F",
    status: "Applicant",
    leaseAndRent: "$1400/month, 0 months tenure",
    paymentScore: 4,
    renewalProb: 0,
    kyc: false,
    avatarUrl: "https://placehold.co/40x40/8c4c70/ffffff?text=CO",
  },
  {
    id: 9,
    name: "David Jones",
    email: "david@email.com",
    property: "Riverwalk",
    unit: "Apt 2B",
    status: "Active",
    leaseAndRent: "$1900/month, 12 months tenure",
    paymentScore: 5,
    renewalProb: 75,
    kyc: true,
    avatarUrl: "https://placehold.co/40x40/70904c/ffffff?text=DJ",
  },
  {
    id: 10,
    name: "Eva Green",
    email: "eva@email.com",
    property: "Skyline Towers",
    unit: "Apt 7A",
    status: "Overdue",
    leaseAndRent: "$1300/month, 3 months tenure",
    paymentScore: 1,
    renewalProb: 5,
    kyc: true,
    avatarUrl: "https://placehold.co/40x40/904c70/ffffff?text=EG",
  },
];

const statusOptions = [
  { value: "Active", label: "Active" },
  { value: "Applicant", label: "Applicant" },
  { value: "Moved Out", label: "Moved Out" },
  { value: "Overdue", label: "Overdue" },
];

const propertyOptions = [
  { value: "Skyline Towers", label: "Skyline Towers" },
  { value: "Central Park", label: "Central Park" },
  { value: "Riverwalk", label: "Riverwalk" },
];

// --- HELPER COMPONENTS ---

const StatBadge = ({ status }: { status: string }) => {
  let color = "bg-gray-100 text-gray-800";
  if (status === "Active") color = "bg-green-500 text-white";
  if (status === "Applicant") color = "bg-sky-500 text-white";
  if (status === "Moved Out") color = "bg-red-500 text-white";
  if (status === "Overdue") color = "bg-red-500 text-white";

  return (
    <span
      className={`flex itesm-center w-fit px-3 py-1  text-xs font-semibold rounded-sm ${color}`}>
      <p className="h-2 w-2 mt-1 mr-2 rounded-full bg-white" /> {status}
    </span>
  );
};

const PaymentScoreStars = ({ score }: { score: number }) => {
  return (
    <div className="flex space-x-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${
            i <= score
              ? "text-orange-500 fill-orange-500"
              : "text-gray-300 fill-gray-300"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor">
          <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279L12 18.295l-7.416 3.918 1.48-8.279L.004 9.306l8.332-1.151L12 .587z" />
        </svg>
      ))}
    </div>
  );
};

const RenewalIndicator = ({ probability }: { probability: number }) => {
  const isGood = probability >= 50;
  const color = isGood ? "text-green-600" : "text-red-600";
  const arrow = isGood ? (
    <TrendingUp className="w-4 h-4 ml-2" />
  ) : (
    <TrendingDown className="w-4 h-4 ml-2" />
  );

  return (
    <div className={`flex items-center font-semibold ${color}`}>
      {probability}%{arrow}
    </div>
  );
};
const statsData = [
  {
    id: 1,
    icon: UserStar,
    title: "Total Tenants",
    value: "5",
    colorClasses: { bg: "bg-blue-500", text: "text-blue-600" },
  },
  {
    id: 2,
    icon: Hand,
    title: "Active",
    value: "1",
    colorClasses: { bg: "bg-green-500", text: "text-green-600" },
  },
  {
    id: 3,
    icon: MessageSquareWarning,
    title: "Overdue",
    value: "5",
    colorClasses: { bg: "bg-red-500", text: "text-red-600" },
  },
  {
    id: 4,
    icon: DollarSign,
    title: "Avg Payment Score",
    value: "5",
    colorClasses: { bg: "bg-teal-500", text: "text-teal-600" },
  },
  {
    id: 5,
    icon: TrendingUp,
    title: "Avg Renewal Rate",
    value: "37%",
    colorClasses: { bg: "bg-purple-500", text: "text-purple-600" },
  },
];

const StatCard = ({
  icon: Icon,
  title,
  value,
  colorClasses,
}: {
  icon: LucideIcon;
  title: string;
  value: string;
  colorClasses: { bg: string; text: string };
}) => (
  <Card>
    <CardContent className="flex items-center p-4 space-x-4">
      <div className={`p-3 rounded-full  ${colorClasses.text}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <div
          className={`text-sm text-white rounded-sm py-1 px-4 ${colorClasses.bg}`}>
          {title}
        </div>
        <p className={`text-xl rounded-md font-bold py-1  `}>{value}</p>
      </div>
    </CardContent>
  </Card>
);

const TenantDirectory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [propertyFilter, setPropertyFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredTenants = useMemo(() => {
    let data = initialTenants;

    if (searchTerm) {
      data = data.filter((tenant) =>
        tenant.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter) {
      data = data.filter((tenant) => tenant.status === statusFilter);
    }

    if (propertyFilter) {
      data = data.filter((tenant) => tenant.property === propertyFilter);
    }

    return data;
  }, [searchTerm, statusFilter, propertyFilter]);

  const totalPages = Math.ceil(filteredTenants.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedTenants = filteredTenants.slice(startIndex, endIndex);

  const goToNextPage = useCallback(() => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  }, [totalPages]);

  const goToPrevPage = useCallback(() => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  }, []);

  const totalEntries = initialTenants.length;
  const showingStart = Math.min(filteredTenants.length, startIndex + 1);
  const showingEnd = Math.min(filteredTenants.length, endIndex);
  const router = useRouter();

  return (
    <div className="p-6 pl-0 space-y-8 min-h-screen font-sans">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tenant Directory</h1>
          <p className="text-sm text-gray-500">
            {initialTenants.length} tenants
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" size="sm">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
            </svg>
            Export
          </Button>

          <MultiStepTenantInvitationForm />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {statsData.map((stat) => (
          <StatCard
            key={stat.id}
            icon={stat.icon}
            title={stat.title}
            value={stat.value}
            colorClasses={stat.colorClasses}
          />
        ))}
      </div>

      <div className="flex p-4 border-b border-gray-100  gap-4 items-center">
        <div className="flex border bg-white! border-gray-300 w-full rounded-lg px-3   items-center">
          <Search className="w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search Tenant Directory..."
            className="pl-10 bg-white!  focus:border-0 focus-visible:ring-0"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <div className="flex   gap-3 ml-auto">
          <FilterSelect
            options={statusOptions}
            value={statusFilter}
            onChange={setStatusFilter}
            placeholder="All Status"
          />
          <FilterSelect
            options={propertyOptions}
            value={propertyFilter}
            onChange={setPropertyFilter}
            placeholder="All Properties"
          />
          <Button variant="outline" size="default" className="w-full md:w-auto">
            Name
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"></path>
            </svg>
          </Button>
        </div>
      </div>
      <Table>
        <TableHeader className="bg-gray-200">
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[30px]">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-black shadow-sm focus:ring-black"
              />
            </TableHead>
            <TableHead className="w-[200px]">Tenant</TableHead>
            <TableHead>Property & Unit</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Lease & Rent</TableHead>
            <TableHead>Payment Score</TableHead>
            <TableHead>Renewal Prob</TableHead>
            <TableHead className="text-center">KYC</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedTenants.length > 0 ? (
            paginatedTenants.map((tenant) => (
              <TableRow key={tenant.id} className="cursor-pointer">
                <TableCell>
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-black shadow-sm focus:ring-black"
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10 rounded-full">
                      <AvatarImage src={tenant.avatarUrl} alt="@shadcn" />
                      <AvatarFallback className="bg-gray-200 text-gray-700">
                        {tenant.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-900">
                        {tenant.name}
                      </span>
                      <span className="flex items-center text-xs text-gray-500">
                        <Mail className="w-3 h-3 mr-1" /> {tenant.email}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="flex items-center font-medium">
                      <Building2 className="w-3 h-3 mr-1" />
                      {tenant.property}
                    </span>
                    <span className="flex items-center text-xs text-gray-500">
                      <House className="w-3 h-3 mr-1" /> {tenant.unit}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <StatBadge status={tenant.status} />
                </TableCell>
                <TableCell>
                  <div className="flex flex-col text-sm">
                    <span className="font-medium">
                      {tenant.leaseAndRent.split(",")[0]}
                    </span>
                    <span className="text-xs text-gray-500">
                      {tenant.leaseAndRent.split(",")[1]}
                    </span>
                    {tenant.renewalProb === 40 || tenant.renewalProb === 60 ? (
                      <span className="text-xs text-red-600 font-semibold mt-0.5">
                        $3600 due
                      </span>
                    ) : null}
                  </div>
                </TableCell>
                <TableCell>
                  <PaymentScoreStars score={tenant.paymentScore} />
                </TableCell>
                <TableCell>
                  <RenewalIndicator probability={tenant.renewalProb} />
                </TableCell>
                <TableCell className="">
                  <div className="flex justify-center  space-x-2">
                    <Eye
                      className="w-5 h-5 text-gray-500 hover:text-black cursor-pointer"
                      onClick={() =>
                        router.push(`/tenant/directory/${tenant.id}`)
                      }
                    />
                    <RefreshCw className="w-5 h-5 text-gray-500 hover:text-black cursor-pointer" />
                    <FileText className="w-5 h-5 text-gray-500 hover:text-black cursor-pointer" />
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="h-24 text-center text-gray-500">
                No tenants found matching the current filters.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
        <div className="text-sm text-gray-500">
          {filteredTenants.length > 0
            ? `Showing ${showingStart} to ${showingEnd} of ${filteredTenants.length} entries`
            : "Showing 0 of 0 entries"}
          {filteredTenants.length !== totalEntries && (
            <span className="ml-2">({totalEntries} total)</span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                  page === currentPage
                    ? "bg-red-600 text-white shadow-md"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
                disabled={page === currentPage}>
                {page}
              </button>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            className="h-8 w-8 p-0">
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={goToNextPage}
            disabled={
              currentPage === totalPages || filteredTenants.length === 0
            }
            className="h-8 w-8 p-0">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TenantDirectory;
