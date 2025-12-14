// components/aging-details-table.tsx
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Phone, ArrowRight } from "lucide-react";
import { Text, Small, cx } from "@/lib/Typography";

interface Tenant {
  id: number;
  name: string;
  details: string;
  avatarUrl: string;
  property: string;
  propertyDetails: string;
  totalOwed: string;
  daysPastDue: number | "Overdue";
  oldestInvoice: string;
  oldestInvoiceRef: string;
  contactAttempts: string;
  lastContact: string;
  kyc: boolean;
}

const tenants: Tenant[] = [
  {
    id: 1,
    name: "Michael Walker",
    details: "Skyline Towers",
    avatarUrl: "/avatars/michael.jpg", // Placeholder
    property: "Apt 4B",
    propertyDetails: "Skyline Towers",
    totalOwed: "$1,200",
    daysPastDue: 18,
    oldestInvoice: "1/15/2025",
    oldestInvoiceRef: "INV-2025-010",
    contactAttempts: "0 attempts",
    lastContact: "N/A",
    kyc: true,
  },
  {
    id: 2,
    name: "Cameron Drake",
    details: "Downtown Lofts",
    avatarUrl: "/avatars/cameron.jpg", // Placeholder
    property: "Unit 12A",
    propertyDetails: "Downtown Lofts",
    totalOwed: "$1,650",
    daysPastDue: "Overdue",
    oldestInvoice: "12/1/2024",
    oldestInvoiceRef: "INV-2024-120",
    contactAttempts: "2 attempts",
    lastContact: "1/20/2025",
    kyc: true,
  },
  {
    id: 3,
    name: "Doris Crowley",
    details: "Skyline Towers",
    avatarUrl: "/avatars/doris.jpg", // Placeholder
    property: "Penthouse A",
    propertyDetails: "Skyline Towers",
    totalOwed: "$3,600",
    daysPastDue: 120,
    oldestInvoice: "9/1/2024",
    oldestInvoiceRef: "INV-2024-090",
    contactAttempts: "5 attempts",
    lastContact: "1/26/2025",
    kyc: true,
  },
];

const getBadgeClass = (days: number | "Overdue"): string => {
  if (days === "Overdue") return "bg-red-500/10 text-red-700";
  if (days <= 30) return "bg-green-500/10 text-green-700";
  if (days <= 90) return "bg-amber-500/10 text-amber-700";
  return "bg-red-500/10 text-red-700";
};

export function AgingDetailsTable() {
  return (
    <div className="mb-8">
      <Text variant="title" as="h3" className="mb-4">
        Aging Details by Tenant
      </Text>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox />
              </TableHead>
              <TableHead>Tenant</TableHead>
              <TableHead>Property/Unit</TableHead>
              <TableHead>Total Owed</TableHead>
              <TableHead>Days Past Due</TableHead>
              <TableHead>Oldest Invoice</TableHead>
              <TableHead>Contact Attempts</TableHead>
              <TableHead className="text-center">KYC</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tenants.map((tenant) => (
              <TableRow key={tenant.id}>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={tenant.avatarUrl} alt={tenant.name} />
                      {/* Using first letters for fallback */}
                      <AvatarFallback>
                        {tenant.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <Text variant="body" className="font-semibold mb-0 ">
                        {tenant.name}
                      </Text>
                      <Small>{tenant.details}</Small>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Text variant="body" className="font-medium mb-0 ">
                    {tenant.property}
                  </Text>
                  <Small>{tenant.propertyDetails}</Small>
                </TableCell>
                <TableCell>
                  <Text variant="body" className="text-red-600 font-semibold">
                    {tenant.totalOwed}
                  </Text>
                </TableCell>
                <TableCell>
                  <span
                    className={cx(
                      "inline-block rounded-full px-3 py-1 text-xs font-medium",
                      getBadgeClass(tenant.daysPastDue)
                    )}>
                    {tenant.daysPastDue}
                    {typeof tenant.daysPastDue === "number" ? " days" : ""}
                  </span>
                </TableCell>
                <TableCell>
                  <Text variant="body" className="mb-0 ">
                    {tenant.oldestInvoice}
                  </Text>
                  <Small>{tenant.oldestInvoiceRef}</Small>
                </TableCell>
                <TableCell>
                  <Text variant="body" className="mb-0 ">
                    {tenant.contactAttempts}
                  </Text>
                  <Small>Last: {tenant.lastContact}</Small>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center space-x-2 text-gray-500">
                    <Mail className="h-4 w-4 hover:text-blue-500 cursor-pointer" />
                    <Phone className="h-4 w-4 hover:text-blue-500 cursor-pointer" />
                    <ArrowRight className="h-4 w-4 hover:text-blue-500 cursor-pointer" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
