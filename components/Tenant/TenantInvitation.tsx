"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import {
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  Eye,
  FilePlusCorner,
  FileText,
  MoveLeft,
  OctagonX,
  RefreshCcw,
  Send,
  SendHorizontal,
  TriangleAlert,
  UserPlus,
  UserRoundSearch,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Checkbox } from "../ui/checkbox";
import { MultiStepTenantInvitationForm } from "./InviteTenant";

const INVITATIONS = [
  {
    id: 1,
    name: "Michael Walker",
    email: "lorem@email.com",
    phone: "+1 (555) 123-4567",
    property: "Skyline Towers",
    unit: "Apt 4B",
    status: "Sent",
    lease: "$1200/month",
    duration: "12 months",
    start: "2025-02-01",
    sent: "2025-01-25",
    expires: "2025-02-08",
  },
  {
    id: 2,
    name: "Sophie Headrick",
    email: "lorem@email.com",
    phone: "+1 (555) 123-4567",
    property: "Skyline Towers",
    unit: "Apt 4B",
    status: "Declined",
    lease: "$1200/month",
    duration: "12 months",
    start: "2025-02-01",
    sent: "2025-01-25",
    viewed: "2025-01-16",
    response: "2025-01-18",
    expires: "2025-02-08",
  },
  {
    id: 3,
    name: "Cameron Drake",
    email: "lorem@email.com",
    phone: "+1 (555) 123-4567",
    property: "Skyline Towers",
    unit: "Apt 4B",
    status: "Viewed",
    lease: "$1500/month",
    duration: "6 months",
    start: "2025-02-15",
    sent: "2025-01-25",
    expires: "2025-02-08",
  },
  {
    id: 4,
    name: "Doris Crowley",
    email: "lorem@email.com",
    phone: "+1 (555) 123-4567",
    property: "Skyline Towers",
    unit: "Apt 4B",
    status: "Accepted",
    lease: "$1200/month",
    duration: "12 months",
    start: "2025-02-01",
    sent: "2025-01-25",
    expires: "2025-02-08",
  },
  {
    id: 5,
    name: "Thomas Bordelon",
    email: "lorem@email.com",
    phone: "+1 (555) 123-4567",
    property: "Skyline Towers",
    unit: "Apt 4B",
    status: "Expired",
    lease: "$1200/month",
    duration: "12 months",
    start: "2025-02-01",
    sent: "2025-01-25",
    expires: "2025-02-08",
  },
];

const statusColors = {
  Sent: "text-blue-500",
  Viewed: "text-orange-500",
  Accepted: "text-green-600",
  Declined: "text-red-500",
  Expired: "text-gray-500",
};

const cardData = [
  {
    title: "Total",
    icon: UserRoundSearch,
    amount: 5,
    color: "blue-500",
  },
  {
    title: "Sent",
    icon: SendHorizontal,
    amount: 1,
    color: "blue-500",
  },
  {
    title: "Viewed",
    icon: Eye,
    amount: 5,
    color: "orange-500",
  },
  {
    title: "Accepted",
    icon: CircleCheck,
    amount: 5,
    color: "green-500",
  },
  {
    title: "Declined",
    icon: OctagonX,
    amount: 5,
    color: "red-500",
  },
  {
    title: "Expired",
    icon: TriangleAlert,
    amount: 5,
    color: "red-500",
  },
];

export default function TenantInvitations() {
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const paginated = INVITATIONS.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(INVITATIONS.length / pageSize);

  return (
    <div className="w-full p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className=" flex items-center gap-2 text-2xl font-semibold">
            <MoveLeft /> Tenant Invitations
          </h1>
          <p className="text-sm text-gray-500">
            Manage and track tenant invitations
          </p>
        </div>
        <div className="flex gap-2 ">
          <Select>
            <SelectTrigger className="w-[110px] bg-white border border-gray-700 shadow-sm ">
              <div className="flex items-center gap-2">
                <FilePlusCorner />
                <Select>Export</Select>
              </div>
            </SelectTrigger>
            <SelectContent className="border border-gray-500">
              <SelectGroup>
                <SelectItem value="pdf">Export as Pdf</SelectItem>
                <SelectItem value="excel">Export as Excel</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {/* <Button
            variant={"outline"}
            className=" hover:bg-orange-600 text-black">
            <FilePlusCorner />
            <Select>Export</Select>
          </Button> */}
          <MultiStepTenantInvitationForm />
        </div>
      </div>

      <div className="grid grid-cols-6 gap-4 ">
        {cardData.map(({ title, icon: Icon, amount, color }, idx) => (
          <Card key={idx} className="shadow-sm h-30">
            <CardContent className="flex p-4 text-center">
              <Icon className={` w-8 h-8 text-${color}`} />
              <div className="flex flex-col items-start -mt-1.5 ml-4">
                <p
                  className={` text-sm text-white py-1 rounded-sm px-4 bg-${color}`}>
                  {title}
                </p>
                <p className="text-2xl font-bold">{amount}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="w-64">
          <Input placeholder="Search invitations..." />
        </div>
        <div className="flex gap-3">
          <Select>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Properties" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Properties</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-44">
              <SelectValue placeholder="Sort By: Last 7 Days" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex gap-6 border-b text-sm">
        <button className="pb-2 border-b-2 border-orange-500 text-orange-500 font-medium">
          All (5)
        </button>
        <button className="pb-2 text-gray-600">Active (2)</button>
        <button className="pb-2 text-gray-600">Completed (2)</button>
        <button className="pb-2 text-gray-600">Expired (1)</button>
      </div>

      <div className="w-full overflow-auto  border rounded-2xl">
        <Table className="  ">
          <TableHeader className="bg-gray-200">
            <TableRow>
              <TableHead>
                <Checkbox className="bg-white" />
              </TableHead>
              <TableHead>Invitee</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Property & Unit</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Lease Terms</TableHead>
              <TableHead>Timeline</TableHead>
              <TableHead>KYC</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-300" />
                    <div>
                      <p className="font-medium">{row.name}</p>
                      <p className="text-xs text-gray-500">ID: {row.id}</p>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <p>{row.email}</p>
                  <p className="text-xs text-gray-500">{row.phone}</p>
                </TableCell>

                <TableCell>
                  <p>{row.property}</p>
                  <p className="text-xs text-gray-500">{row.unit}</p>
                </TableCell>

                <TableCell
                  className={
                    (statusColors as Record<string, string>)[row.status]
                  }>
                  {row.status}
                </TableCell>

                <TableCell>
                  <p>{row.lease}</p>
                  <p className="text-xs text-gray-500">{row.duration}</p>
                </TableCell>

                <TableCell>
                  <p className="text-xs text-gray-600">Sent: {row.sent}</p>
                  {row.viewed && (
                    <p className="text-xs text-orange-500">
                      Viewed: {row.viewed}
                    </p>
                  )}
                  {row.response && (
                    <p className="text-xs text-blue-500">
                      Response: {row.response}
                    </p>
                  )}
                  <p className="text-xs text-red-500">Expires: {row.expires}</p>
                </TableCell>

                <TableCell>
                  <div className="flex gap-2 text-gray-600">
                    <Eye size={16} className="cursor-pointer" />
                    <RefreshCcw size={16} className="cursor-pointer" />
                    <FileText size={16} className="cursor-pointer" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between mt-4 text-sm">
        <p>
          Showing {paginated.length} of {INVITATIONS.length} entries
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}>
            <ChevronLeft size={16} />
          </Button>

          <span>
            Page {page} of {totalPages}
          </span>

          <Button
            variant="outline"
            size="sm"
            disabled={page === totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}
