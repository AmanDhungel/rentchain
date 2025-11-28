"use client";
import React, { useState, useMemo, JSX } from "react";
import {
  Download,
  Send,
  Users,
  Plus,
  ChevronDown,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  Search,
  Home,
  ChevronRight,
  Ban,
} from "lucide-react";
import { Input } from "../ui";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AddTenantDialog from "./TenantProfile/AddTenantForm";

type TenantStatus = "Active" | "Applicant" | "Moved Out";
type KycStatus = "Verified" | "Expired" | "Pending" | "Rejected";
type SubleaseStatus = "Enabled" | "Disabled";

interface Tenant {
  id: number;
  name: string;
  avatar: string;
  contact: string;
  phone: string;
  unit: string;
  aptType: string;
  status: TenantStatus;
  overdue: number | null;
  overdueDays: number | null;
  sublease: SubleaseStatus;
  kyc: KycStatus;
  kycId: KycStatus;
}

interface ActionButtonProps {
  label: string;
  icon: React.ElementType;
  primary?: boolean;
  large?: boolean;
}

interface TenantRowProps {
  tenant: Tenant;
}

interface FilterSelectProps {
  label: string;
  options: string[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

// --- MOCK DATA ---
const mockTenantsData: Tenant[] = [
  {
    id: 1,
    name: "Michael Walker",
    avatar: "MW",
    contact: "lorem@email.com",
    phone: "+1 (555) 123-4567",
    unit: "Apt 4B",
    aptType: "Skyline Towers",
    status: "Active",
    overdue: 1200,
    overdueDays: 15,
    sublease: "Enabled",
    kyc: "Verified",
    kycId: "Verified",
  },
  {
    id: 2,
    name: "Sophia Headrick",
    avatar: "SH",
    contact: "lorem@email.com",
    phone: "+1 (555) 123-4567",
    unit: "Unit 12A",
    aptType: "Downtown Lofts",
    status: "Active",
    overdue: 1200,
    overdueDays: 15,
    sublease: "Disabled",
    kyc: "Expired",
    kycId: "Expired",
  },
  {
    id: 3,
    name: "Cameron Drake",
    avatar: "CD",
    contact: "lorem@email.com",
    phone: "+1 (555) 123-4567",
    unit: "Not assigned",
    aptType: "Skyline Towers",
    status: "Active",
    overdue: null,
    overdueDays: null,
    sublease: "Enabled",
    kyc: "Pending",
    kycId: "Pending",
  },
  {
    id: 4,
    name: "Doris Crowley",
    avatar: "DC",
    contact: "lorem@email.com",
    phone: "+1 (555) 123-4567",
    unit: "Studio 5",
    aptType: "Garden Apartments",
    status: "Active",
    overdue: 6200,
    overdueDays: 60,
    sublease: "Enabled",
    kyc: "Verified",
    kycId: "Verified",
  },
  {
    id: 5,
    name: "Thomas Bordelon",
    avatar: "TB",
    contact: "lorem@email.com",
    phone: "+1 (555) 123-4567",
    unit: "Penthouse A",
    aptType: "Skyline Towers",
    status: "Active",
    overdue: null,
    overdueDays: null,
    sublease: "Disabled",
    kyc: "Expired",
    kycId: "Expired",
  },
  {
    id: 6,
    name: "Kathleen Gutierrez",
    avatar: "KG",
    contact: "lorem@email.com",
    phone: "+1 (555) 123-4567",
    unit: "Studio 5",
    aptType: "Garden Apartments",
    status: "Active",
    overdue: 3200,
    overdueDays: 35,
    sublease: "Disabled",
    kyc: "Rejected",
    kycId: "Rejected",
  },
  {
    id: 7,
    name: "Bruce Wright",
    avatar: "BW",
    contact: "lorem@email.com",
    phone: "+1 (555) 123-4567",
    unit: "Studio 5",
    aptType: "Garden Apartments",
    status: "Applicant",
    overdue: null,
    overdueDays: null,
    sublease: "Disabled",
    kyc: "Pending",
    kycId: "Pending",
  },
  {
    id: 8,
    name: "Estelle Morgan",
    avatar: "EM",
    contact: "lorem@email.com",
    phone: "+1 (555) 123-4567",
    unit: "Studio 5",
    aptType: "Garden Apartments",
    status: "Moved Out",
    overdue: 1200,
    overdueDays: 15,
    sublease: "Enabled",
    kyc: "Verified",
    kycId: "Verified",
  },
  {
    id: 9,
    name: "Stephen Dias",
    avatar: "SD",
    contact: "lorem@email.com",
    phone: "+1 (555) 123-4567",
    unit: "Studio 5",
    aptType: "Garden Apartments",
    status: "Active",
    overdue: null,
    overdueDays: null,
    sublease: "Disabled",
    kyc: "Rejected",
    kycId: "Rejected",
  },
  {
    id: 10,
    name: "Angela Thomas",
    avatar: "AT",
    contact: "lorem@email.com",
    phone: "+1 (555) 123-4567",
    unit: "Studio 5",
    aptType: "Garden Apartments",
    status: "Active",
    overdue: 1200,
    overdueDays: 15,
    sublease: "Enabled",
    kyc: "Verified",
    kycId: "Verified",
  },
  // Additional entries for pagination count
  {
    id: 11,
    name: "Daniel Smith",
    avatar: "DS",
    contact: "lorem@email.com",
    phone: "+1 (555) 123-4567",
    unit: "Unit 3B",
    aptType: "Skyline Towers",
    status: "Active",
    overdue: 500,
    overdueDays: 5,
    sublease: "Disabled",
    kyc: "Verified",
    kycId: "Verified",
  },
  {
    id: 12,
    name: "Jessica Alba",
    avatar: "JA",
    contact: "lorem@email.com",
    phone: "+1 (555) 123-4567",
    unit: "Apt 9C",
    aptType: "Downtown Lofts",
    status: "Applicant",
    overdue: null,
    overdueDays: null,
    sublease: "Enabled",
    kyc: "Pending",
    kycId: "Pending",
  },
  {
    id: 13,
    name: "Robert Downey",
    avatar: "RD",
    contact: "lorem@email.com",
    phone: "+1 (555) 123-4567",
    unit: "Studio 2",
    aptType: "Garden Apartments",
    status: "Moved Out",
    overdue: 800,
    overdueDays: 30,
    sublease: "Disabled",
    kyc: "Expired",
    kycId: "Expired",
  },
  {
    id: 14,
    name: "Chris Evans",
    avatar: "CE",
    contact: "lorem@email.com",
    phone: "+1 (555) 123-4567",
    unit: "Penthouse B",
    aptType: "Skyline Towers",
    status: "Active",
    overdue: null,
    overdueDays: null,
    sublease: "Enabled",
    kyc: "Verified",
    kycId: "Verified",
  },
  {
    id: 15,
    name: "Mark Ruffalo",
    avatar: "MR",
    contact: "lorem@email.com",
    phone: "+1 (555) 123-4567",
    unit: "Unit 1B",
    aptType: "Downtown Lofts",
    status: "Active",
    overdue: 250,
    overdueDays: 7,
    sublease: "Disabled",
    kyc: "Rejected",
    kycId: "Rejected",
  },
  {
    id: 16,
    name: "Scarlett Johansson",
    avatar: "SJ",
    contact: "lorem@email.com",
    phone: "+1 (555) 123-4567",
    unit: "Studio 8",
    aptType: "Garden Apartments",
    status: "Applicant",
    overdue: null,
    overdueDays: null,
    sublease: "Enabled",
    kyc: "Pending",
    kycId: "Pending",
  },
  {
    id: 17,
    name: "Jeremy Renner",
    avatar: "JR",
    contact: "lorem@email.com",
    phone: "+1 (555) 123-4567",
    unit: "Apt 7A",
    aptType: "Skyline Towers",
    status: "Active",
    overdue: 1500,
    overdueDays: 45,
    sublease: "Disabled",
    kyc: "Expired",
    kycId: "Expired",
  },
  {
    id: 18,
    name: "Tom Holland",
    avatar: "TH",
    contact: "lorem@email.com",
    phone: "+1 (555) 123-4567",
    unit: "Unit 10D",
    aptType: "Downtown Lofts",
    status: "Active",
    overdue: null,
    overdueDays: null,
    sublease: "Enabled",
    kyc: "Verified",
    kycId: "Verified",
  },
];

const FilterSelect: React.FC<FilterSelectProps> = ({
  label,
  options,
  value,
  onChange,
}) => (
  <div className="relative">
    <select
      value={value}
      onChange={onChange}
      className="appearance-none flex items-center w-full min-w-[120px] px-3 pr-8 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition duration-150 cursor-pointer focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
      <option value="" disabled className="text-gray-400">
        {label}
      </option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-500 pointer-events-none" />
  </div>
);

const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  icon: Icon,
  primary = false,
  large = false,
}) => {
  const baseClasses =
    "flex items-center space-x-2 font-semibold transition duration-150 rounded-lg shadow-sm";

  const secondaryColorClasses = primary
    ? "bg-orange-600 text-white hover:bg-orange-700 border border-orange-600"
    : "bg-white text-indigo-700 hover:bg-gray-50 border border-indigo-700";

  const primaryColorClasses =
    "bg-orange-600 text-white hover:bg-orange-700 border-orange-600";

  const sizeClasses = large ? "px-5 py-2.5" : "px-4 py-2";

  return (
    <button
      className={`${baseClasses} ${
        primary ? primaryColorClasses : secondaryColorClasses
      } ${sizeClasses}`}>
      <Icon
        className={`w-5 h-5 ${primary ? "text-white" : "text-indigo-700"}`}
      />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
};

const Breadcrumb: React.FC = () => (
  <div className="flex items-center text-sm text-gray-500 space-x-1.5">
    <Home className="w-4 h-4 text-gray-400" />
    <ChevronRight className="w-3 h-3 text-gray-400" />
    <span>Tenants</span>
    <ChevronRight className="w-3 h-3 text-gray-400" />
    <span className="font-semibold text-gray-700">Manage Tenants</span>
  </div>
);

const TenantStatusBadge: React.FC<{ status: TenantStatus }> = ({ status }) => {
  let classes =
    "inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full";
  let dotClasses = "w-2 h-2 rounded-full mr-1";
  const text = status;

  switch (status) {
    case "Active":
      classes += " bg-green-100 text-green-800";
      dotClasses += " bg-green-500";
      break;
    case "Applicant":
      classes += " bg-blue-100 text-blue-800";
      dotClasses += " bg-blue-500";
      break;
    case "Moved Out":
      classes += " bg-red-100 text-red-800";
      dotClasses += " bg-red-500";
      break;
  }

  return (
    <span className={classes}>
      <span className={dotClasses}></span>
      {text}
    </span>
  );
};

const OverdueStatus: React.FC<{
  amount: number | null;
  days: number | null;
}> = ({ amount, days }) => {
  if (amount === null) {
    return <span className="text-gray-500 font-medium">Current</span>;
  }
  return (
    <div className="flex flex-col text-right">
      <span className="text-red-600 font-semibold">
        ${amount.toLocaleString("en-US")}
      </span>
      <span className="text-red-500 text-xs mt-0.5">{days} days</span>
    </div>
  );
};

const SubleaseStatusBadge: React.FC<{ status: SubleaseStatus }> = ({
  status,
}) => {
  const classes = "px-2 py-0.5 text-xs font-medium rounded-lg";
  let colorClass = "";

  switch (status) {
    case "Enabled":
      colorClass = "bg-orange-100 text-orange-700";
      break;
    case "Disabled":
      colorClass = "bg-gray-200 text-gray-600";
      break;
  }

  return <span className={`${classes} ${colorClass}`}>{status}</span>;
};

const KycStatusIcon: React.FC<{ status: KycStatus }> = ({ status }) => {
  const IconProps = { className: "w-4 h-4", fill: "none", strokeWidth: 2 };
  let icon: JSX.Element;
  let color = "text-gray-500";

  switch (status) {
    case "Verified":
      icon = (
        <CheckCircle
          {...IconProps}
          className={`${IconProps.className} text-green-500`}
          fill="currentColor"
        />
      );
      color = "text-green-600";
      break;
    case "Pending":
      icon = (
        <Clock
          {...IconProps}
          className={`${IconProps.className} text-orange-500`}
        />
      );
      color = "text-orange-600";
      break;
    case "Rejected":
      icon = (
        <XCircle
          {...IconProps}
          className={`${IconProps.className} text-red-500`}
        />
      );
      color = "text-red-600";
      break;
    case "Expired":
      icon = (
        <Ban {...IconProps} className={`${IconProps.className} text-red-500`} />
      );
      color = "text-red-600";
      break;
    default:
      icon = (
        <AlertCircle
          {...IconProps}
          className={`${IconProps.className} text-gray-500`}
        />
      );
      color = "text-gray-500";
  }

  return (
    <div className="flex items-center justify-center space-x-1">
      {icon}
      <span className={`text-sm font-medium ${color} hidden lg:inline`}>
        {status}
      </span>
    </div>
  );
};

const TenantRow: React.FC<TenantRowProps> = ({ tenant }) => {
  const router = useRouter();
  return (
    <tr
      className="border-b hover:bg-gray-50 transition duration-100 cursor-pointer"
      onClick={() => {
        router.push(`/tenant/managetenant/${tenant.id}`);
      }}>
      <td className="p-4 w-12 text-center">
        <input
          type="checkbox"
          className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
        />
      </td>

      <td className="p-4 w-1/5">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-sm font-semibold text-indigo-700">
            {tenant.avatar}
          </div>
          <div className="flex flex-col">
            <span className="text-gray-900 font-semibold">{tenant.name}</span>
            <span className="text-gray-500 text-xs">ID: {tenant.id}</span>
          </div>
        </div>
      </td>

      <td className="p-4 w-1/5">
        <div className="flex flex-col text-sm">
          <span className="text-gray-700 flex items-center space-x-1">
            <Clock className="w-3 h-3 text-gray-400" />
            <span>{tenant.contact}</span>
          </span>
          <span className="text-gray-500 flex items-center space-x-1 mt-0.5">
            <Send className="w-3 h-3 text-gray-400 transform rotate-[30deg]" />
            <span>{tenant.phone}</span>
          </span>
        </div>
      </td>

      <td className="p-4 w-1/5">
        <div className="flex flex-col text-sm">
          <span className="text-gray-900 font-medium">{tenant.unit}</span>
          <span className="text-gray-500 text-xs mt-0.5">{tenant.aptType}</span>
        </div>
      </td>

      <td className="p-4 text-center">
        <TenantStatusBadge status={tenant.status} />
      </td>

      <td className="p-4 text-right pr-6">
        <OverdueStatus amount={tenant.overdue} days={tenant.overdueDays} />
      </td>

      <td className="p-4 text-center">
        <SubleaseStatusBadge status={tenant.sublease} />
      </td>

      <td className="p-4 text-center">
        <KycStatusIcon status={tenant.kyc} />
      </td>

      <td className="p-4 text-center">
        <KycStatusIcon status={tenant.kycId} />
      </td>
    </tr>
  );
};

const Pagination: React.FC = () => {
  const pages: (number | "...")[] = [1, 2, 3, 4, "...", 15];
  const currentPage = 4;

  return (
    <nav className="flex items-center space-x-1" aria-label="Pagination">
      <button
        className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
        disabled>
        <ChevronRight className="w-5 h-5 transform rotate-180" />
      </button>
      {pages.map((page, index) => {
        const isCurrent = page === currentPage;
        const classes = `w-8 h-8 flex items-center justify-center text-sm rounded-lg font-medium transition duration-150`;

        if (page === "...") {
          return (
            <span key={index} className="text-gray-400 px-2 py-1">
              ...
            </span>
          );
        }

        return (
          <button
            key={index}
            className={`${classes} ${
              isCurrent
                ? "bg-indigo-600 text-white shadow-md"
                : "text-gray-600 hover:bg-gray-100"
            }`}>
            {page}
          </button>
        );
      })}
      <button className="p-2 text-gray-500 hover:text-gray-700">
        <ChevronRight className="w-5 h-5" />
      </button>
    </nav>
  );
};

export default function ManageTenant() {
  const [currentPage] = useState(1);
  const rowsPerPage = 10;
  const totalEntries = mockTenantsData.length;

  const [statusFilter, setStatusFilter] = useState("");
  const [kycFilter, setKycFilter] = useState("");
  const [propertyFilter, setPropertyFilter] = useState("");
  const [sortFilter, setSortFilter] = useState("Last 7 Days");

  const statusOptions = ["All Status", "Active", "Applicant", "Moved Out"];
  const kycOptions = ["All KYC", "Verified", "Expired", "Pending", "Rejected"];
  const propertyOptions = [
    "All Properties",
    "Skyline Towers",
    "Downtown Lofts",
    "Garden Apartments",
  ];
  const sortOptions = [
    "Sort By - Last 7 Days",
    "Sort By - Last 30 Days",
    "Sort By - Last 90 Days",
  ];

  const currentTenants: Tenant[] = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return mockTenantsData.slice(start, start + rowsPerPage);
  }, [currentPage, rowsPerPage]);

  return (
    <div className="min-h-screen ">
      <header className="bg-white border-b  ">
        <div className=" py-4 flex flex-col md:flex-row items-start md:items-center justify-between">
          <div className="flex flex-col space-y-2">
            <h1 className="text-2xl font-bold text-gray-900">
              Tenants Management
            </h1>
            <Breadcrumb />
          </div>
          <div className="mt-4 md:mt-0 flex flex-wrap space-x-2 sm:space-x-4">
            <ActionButton label="Export" icon={Download} />
            <ActionButton label="Invitations" icon={Send} />
            <ActionButton label="Directory" icon={Users} />
            <AddTenantDialog />
          </div>
        </div>
      </header>

      <main className=" mx-auto sm:px-4 sm:pl-0 py-6">
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200">
          <div className="mb-6 flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl font-semibold text-gray-900 mr-4 whitespace-nowrap">
                Tenants List
              </h2>

              <FilterSelect
                label="All Status"
                options={statusOptions}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              />
              <FilterSelect
                label="All KYC"
                options={kycOptions}
                value={kycFilter}
                onChange={(e) => setKycFilter(e.target.value)}
              />
              <FilterSelect
                label="All Properties"
                options={propertyOptions}
                value={propertyFilter}
                onChange={(e) => setPropertyFilter(e.target.value)}
              />
              <FilterSelect
                label="Sort By - Last 7 Days"
                options={sortOptions}
                value={sortFilter}
                onChange={(e) => setSortFilter(e.target.value)}
              />
            </div>

            <div className="flex items-center bg-[#f6f9ff] p-2 rounded-xl w-full lg:w-72">
              <Search className=" w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search"
                className="w-full pl-10 pr-4 py-2 text-sm shadow-none  rounded-lg focus-visible:ring-0"
              />
            </div>
          </div>

          <div className="mb-4 flex items-center space-x-2 text-sm text-gray-600">
            <span>Row Per Page</span>
            <select className="px-2 py-1 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
            <span>Entries</span>
          </div>

          <div className="overflow-x-auto relative rounded-xl border border-gray-200 shadow-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-4 w-12 text-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5">
                    Tenant
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5">
                    Contact
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5">
                    <div className="flex items-center space-x-1">
                      <span>Unit</span>
                      <ChevronDown className="w-3 h-3 text-gray-400" />
                    </div>
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider pr-6">
                    Overdue
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sublease
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    KYC
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    KYC ID
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentTenants.map((tenant) => (
                  <TenantRow key={tenant.id} tenant={tenant} />
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="text-sm text-gray-600">
              Showing 1 to {currentTenants.length} of {totalEntries} entries
            </div>
            <Pagination />
          </div>
        </div>
      </main>
    </div>
  );
}
