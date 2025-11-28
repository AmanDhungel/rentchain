"use client";
import React, { useState } from "react";
import {
  ChevronLeft,
  Search,
  Filter,
  Eye,
  Pencil,
  Calendar,
  User,
  Building,
  DollarSign,
  Loader2,
  ChevronRight,
} from "lucide-react";
import { Button, Card, CardContent, Input } from "../ui";
import { Badge } from "../ui/badge";
import Link from "next/link";
import EnhancedAgreementCreation from "./EnhancedAgreementCreation";

type BadgeVariant = "success" | "pending" | "info" | "default" | "outline";

interface Tag {
  label: string;
  variant: BadgeVariant;
}

interface Agreement {
  id: string;
  status: "Active" | "Pending";
  tenant: string;
  property: string;
  unit: string;
  bed: string;
  price: string;
  startDate: string;
  endDate: string;
  tags: Tag[];
  amountDue: string;
}

interface AgreementCardProps {
  agreement: Agreement;
}

const initialAgreements: Agreement[] = [
  {
    id: "RC-ENH-2024-001",
    status: "Active",
    tenant: "John Smith",
    property: "Sunset Towers",
    unit: "Master Bedroom",
    bed: "Bed 1",
    price: "$25/daily",
    startDate: "Feb 1, 2024",
    endDate: "Jan 31, 2025",
    tags: [
      { label: "Sublease OK", variant: "success" },
      { label: "Deposit Pending", variant: "pending" },
      { label: "Deposit Collected", variant: "info" },
    ],
    amountDue: "$900",
  },
  {
    id: "RC-ENH-2024-002",
    status: "Active",
    tenant: "Jane Doe",
    property: "Ocean View",
    unit: "Studio Loft",
    bed: "N/A",
    price: "$45/daily",
    startDate: "Mar 15, 2024",
    endDate: "Mar 14, 2025",
    tags: [
      { label: "Sublease Not Allowed", variant: "pending" },
      { label: "Deposit Collected", variant: "success" },
    ],
    amountDue: "$1200",
  },
  {
    id: "RC-ENH-2024-003",
    status: "Pending",
    tenant: "Mike Ross",
    property: "Midtown Lofts",
    unit: "Room 4A",
    bed: "Bed 2",
    price: "$20/daily",
    startDate: "Oct 1, 2024",
    endDate: "Sep 30, 2025",
    tags: [
      { label: "Credit Check Pending", variant: "pending" },
      { label: "Deposit Pending", variant: "pending" },
      { label: "Application Received", variant: "info" },
    ],
    amountDue: "$750",
  },
];

const AgreementCard: React.FC<AgreementCardProps> = ({ agreement }) => {
  const {
    id,
    status,
    tenant,
    property,
    unit,
    bed,
    price,
    startDate,
    endDate,
    tags,
    amountDue,
  } = agreement;

  const statusColor = status === "Active" ? "bg-emerald-500" : "bg-yellow-500";

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 w-full">
      <CardContent className="p-4 sm:p-6 grid gap-4 sm:gap-6">
        <div className="flex justify-between items-start border-b pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-3">
            <div className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              {id}
            </div>
            <Badge
              className={`h-5 w-auto text-white ${statusColor} text-xs uppercase hover:${statusColor}`}
              variant="default">
              {status}
            </Badge>
          </div>
          <div className="flex space-x-2 text-gray-400">
            <Eye className="w-5 h-5 cursor-pointer hover:text-blue-500 transition-colors" />
            <Pencil className="w-5 h-5 cursor-pointer hover:text-blue-500 transition-colors" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-6">
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
              <Building className="w-4 h-4 mr-2 text-gray-500" />
              <span className="font-medium mr-1">{property}</span>
              <ChevronRight className="w-3 h-3 text-gray-400 mx-1" />
              <span>{unit}</span>
              <ChevronRight className="w-3 h-3 text-gray-400 mx-1" />
              <span>{bed}</span>
            </div>

            <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
              <User className="w-4 h-4 mr-2 text-gray-500" />
              <span className="font-semibold">{tenant}</span>
            </div>

            <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
              <Calendar className="w-4 h-4 mr-2 text-gray-500" />
              <span>
                {startDate} - {endDate}
              </span>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {tags.map((tag, index) => (
                <Badge key={index} className="text-xs uppercase font-medium">
                  {tag.label}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-start md:items-end justify-between space-y-3">
            <div className="flex flex-col items-start md:items-end">
              <div className="text-xl font-semibold text-gray-800 dark:text-gray-100 flex items-center">
                <DollarSign className="w-5 h-5 mr-1" />
                {price.replace("$", "")}
              </div>
              <div className="text-sm text-gray-500">Per Period</div>
            </div>

            <div className="text-xl font-bold text-red-600 dark:text-red-400">
              {amountDue}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const RentLease: React.FC = () => {
  const [agreements, setAgreements] = useState<Agreement[]>(initialAgreements);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // const [db, setDb] = useState<unknown>(null);
  // const [auth, setAuth] = useState<unknown>(null);
  // const [userId, setUserId] = useState<string | null>(null);

  const filteredAgreements = agreements.filter(
    (agreement) =>
      agreement.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agreement.tenant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agreement.property.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen p-4 pl-0 pt-0 sm:pl-0 sm:pt-0 md:pl-0  sm:p-6 md:p-8 mx-auto space-y-6">
      <div className="flex justify-between items-center pb-4 border-b">
        <div className="flex items-center space-x-2">
          <ChevronLeft className="w-5 h-5 text-gray-500 cursor-pointer" />
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-100">
            Rent/Lease Agreements
          </h1>
        </div>
        <Button className="bg-orange-600 hover:bg-orange-700 text-white shadow-lg shadow-orange-500/50">
          <Pencil className="w-4 h-4 mr-2" />
          Enhanced Agreement Builder
        </Button>
        <EnhancedAgreementCreation />
      </div>

      <div className="flex flex-col items-center sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="flex items-center bg-[#f6f9ff] p-2 rounded-md">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search agreements..."
            className="w-full pl-9 shadow-none border-0 focus-visible:ring-0 focus:ring-offset-0 bg-[#f6f9ff]"
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchTerm(e.target.value)
            }
          />
        </div>
        <Button
          variant="outline"
          className="w-full sm:w-auto p-6 flex items-center">
          Filter
          <Filter className="w-4 h-4 ml-2" />
        </Button>
      </div>

      <div className="space-y-4">
        {isLoading && (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="ml-3 text-lg text-gray-500">Loading Agreements...</p>
          </div>
        )}
        {error && (
          <div className="text-red-500 p-4 border border-red-300 rounded-lg bg-red-50">
            Error loading data: {error}
          </div>
        )}
        {!isLoading && filteredAgreements.length === 0 && (
          <div className="text-center text-gray-500 py-10 border border-dashed rounded-lg">
            No agreements found matching `{searchTerm}`.
          </div>
        )}
        <div className="flex flex-col gap-3">
          {filteredAgreements.map((agreement, index) => (
            <Link
              href={`/agreement/manageagreement/${agreement.id}`}
              key={index}>
              <AgreementCard key={index} agreement={agreement} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RentLease;
