"use client";

import {
  Search,
  Filter,
  CheckCircle2,
  Clock,
  XCircle,
  Users,
  UserPlus,
  Calendar,
  FileText,
  Eye,
  LucideIcon,
  ArrowLeft,
  MoveLeft,
} from "lucide-react";
import Image from "next/image";
import React, { useState, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { icons } from "@/assets/icons/exports";
import Link from "next/link";
import { AddOccupantDialog } from "./occupant/AddLongTermOccupantForm/AddOccupantDialog";

export const initialRequests = [
  {
    id: 1,
    name: "Michael Johnson",
    relation: "Spouse of Sarah Johnson",
    status: "Pending",
    priority: "Medium",
    property: "Skyline Apartments",
    unit: "Apt 2B",
    moveInDate: "2/1/2024",
    documents: 3,
    reason: "Permanent relocation for work",
    type: "long-term",
    date: "1/15/2024",
  },
  {
    id: 2,
    name: "Michael Johnson", // Keeping name as per screenshot
    relation: "Sister of Alex Chen",
    status: "Pending",
    priority: "High",
    property: "Metro Heights",
    unit: "Room 3A",
    moveInDate: "1/20/2024",
    documents: 2,
    reason: "Temporary visit while apartment hunting",
    type: "long-term",
    date: "1/15/2024",
  },
  {
    id: 3,
    name: "Michael Johnson",
    relation: "Spouse of Sarah Johnson",
    status: "Approved",
    priority: "High",
    property: "Skyline Apartments",
    unit: "Apt 2B",
    moveInDate: "1/10/2024",
    documents: 4,
    reason: "Permanent relocation for work",
    type: "long-term",
    date: "1/15/2024",
  },
];

const currentOccupants = [
  {
    id: 1,
    name: "Sarah Johnson",
    status: "Active",
    type: "long-term",
    relation: "Spouse",
    moveInDate: "Jan 15, 2024",
    documents: 4,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  },
  {
    id: 2,
    name: "Mike Chen",
    status: "Active",
    type: "short-term",
    relation: "Friend",
    moveInDate: "Jan 15, 2024",
    duration: "2 weeks",
    documents: 2,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
  },
];

const StatCard = ({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactElement<LucideIcon>;
  label: string;
  value: number | string;
  color: string;
}) => (
  <Card className="border-none shadow-sm">
    <CardContent className="flex items-center p-6 gap-4">
      <div className="p-3 bg-gray-50 rounded-lg">{icon}</div>
      <div>
        <p className="text-sm text-gray-500 font-medium">{label}</p>
        <p className={`text-3xl font-bold ${color}`}>{value}</p>
      </div>
    </CardContent>
  </Card>
);

const RequestCard = ({
  data,
}: {
  data: {
    id: number;
    name: string;
    relation: string;
    status: string;
    priority: string;
    property: string;
    unit: string;
    moveInDate: string;
    documents: number;
    reason: string;
    type: string;
    date: string;
  };
}) => (
  <Card className="overflow-hidden border-none shadow-sm">
    <CardContent className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-4">
          <div className="w-12 h-12 bg-slate-200 rounded-full overflow-hidden">
            <Image
              width={48}
              height={48}
              src={icons.ActionAccouting}
              alt="avatar"
            />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-lg text-slate-800">{data.name}</h3>
              <Badge
                variant="outline"
                className={
                  data.status === "Pending"
                    ? "text-purple-600 border-purple-200 bg-purple-50"
                    : "text-green-600 border-green-200 bg-green-50"
                }>
                {data.status}
              </Badge>
              <Badge
                variant="outline"
                className={
                  data.priority === "High"
                    ? "text-red-500 border-red-200"
                    : "text-orange-500 border-orange-200"
                }>
                {data.priority}
              </Badge>
            </div>
            <p className="text-sm text-gray-500">{data.relation}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500 font-medium">{data.date}</p>
          <p className="text-xs text-gray-400 uppercase tracking-wider">
            {data.type}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
        <div>
          <p className="text-xs text-gray-400 uppercase font-bold mb-1">
            Property
          </p>
          <p className="font-semibold text-slate-700">{data.property}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400 uppercase font-bold mb-1">Unit</p>
          <p className="font-semibold text-slate-700">{data.unit}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400 uppercase font-bold mb-1">
            Move-in Date
          </p>
          <p className="font-semibold text-slate-700">{data.moveInDate}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400 uppercase font-bold mb-1">
            Documents
          </p>
          <p className="font-semibold text-slate-700">
            {data.documents} uploaded
          </p>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-xs text-gray-400 uppercase font-bold mb-1">Reason</p>
        <p className="text-slate-700">{data.reason}</p>
      </div>

      <div className="flex gap-3">
        <Button
          size="sm"
          className="bg-emerald-500 hover:bg-emerald-600 text-white flex gap-1">
          <CheckCircle2 className="h-4 w-4" /> Approve
        </Button>
        <Button
          size="sm"
          variant="destructive"
          className="bg-red-500 hover:bg-red-600">
          Reject
        </Button>
        <Link href={`/tenant/occupancy/requests/${data.id}`}>
          <Button size="sm" variant="outline" className="text-gray-600">
            Review Details
          </Button>
        </Link>
      </div>
    </CardContent>
  </Card>
);

const OccupancyDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [open, onOpenChange] = useState(false);
  const [filterStatus, setFilterStatus] = useState("All");
  const stats = useMemo(
    () => ({
      total: currentOccupants.length,
      pending: currentOccupants.filter((r) => r.status === "Pending").length,
      approved: currentOccupants.filter((r) => r.status === "Approved").length,
      rejected: currentOccupants.filter((r) => r.status === "Rejected").length,
    }),
    []
  );

  const filteredData = initialRequests.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.unit.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterStatus === "All" || item.status === filterStatus;

    return matchesSearch && matchesFilter;
  });
  return (
    <div className="p-8  min-h-screen font-sans">
      <div className="mb-8">
        <h1 className="flex items-end text-2xl font-bold text-slate-800">
          <MoveLeft className="mt-2" /> Occupancy Management
        </h1>
        <p className="text-gray-500 text-sm ml-7">
          Review and approve occupancy requests
        </p>
      </div>

      <Tabs defaultValue="requests" className="w-full">
        <TabsList className="bg-transparent border-b w-full justify-start rounded-none h-auto p-0 mb-6">
          <TabsTrigger
            value="requests"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-orange-500 data-[state=active]:text-orange-500 data-[state=active]:bg-transparent px-6 py-2">
            Requests from Lessee
          </TabsTrigger>
          <TabsTrigger
            value="occupants"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-orange-500 data-[state=active]:text-orange-500 data-[state=active]:bg-transparent px-6 py-2">
            Current Occupants
          </TabsTrigger>
        </TabsList>

        <TabsContent value="requests">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-8">
            <StatCard
              icon={<Users className="text-blue-500" />}
              label="Total Requests"
              value={stats.total}
              color="text-blue-600"
            />
            <StatCard
              icon={<Clock className="text-orange-500" />}
              label="Pending Approval"
              value={stats.pending}
              color="text-orange-600"
            />
            <StatCard
              icon={<CheckCircle2 className="text-green-500" />}
              label="Approved"
              value={stats.approved}
              color="text-green-600"
            />
            <StatCard
              icon={<XCircle className="text-red-500" />}
              label="Rejected"
              value={stats.rejected}
              color="text-red-600"
            />
          </div>

          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                className="pl-10 bg-white"
                placeholder="Search by occupant, tenant, or property name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="flex gap-2">
              <Filter className="h-4 w-4" /> Filter
            </Button>
          </div>

          <div className="space-y-4">
            {filteredData.map((request) => (
              <RequestCard key={request.id} data={request} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="occupants">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-8">
            <StatCard
              icon={<Users className="text-blue-500" />}
              label="Total Occupants"
              value="2"
              color="text-blue-600"
            />
            <StatCard
              icon={<CheckCircle2 className="text-emerald-500" />}
              label="Active"
              value="2"
              color="text-emerald-600"
            />
            <StatCard
              icon={<Users className="text-purple-500" />}
              label="Long-term"
              value="1"
              color="text-purple-600"
            />
            <StatCard
              icon={<Calendar className="text-orange-500" />}
              label="Short-term"
              value="1"
              color="text-orange-600"
            />
          </div>

          <Card className="mb-8 border-none shadow-sm">
            <CardContent className="p-6">
              <h3 className="font-bold text-slate-800 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button
                  className="bg-none w-full p-0 mb-4"
                  onClick={() => onOpenChange(true)}>
                  <QuickActionButton
                    icon={<UserPlus className="h-4 w-4" />}
                    label="Add Long-term Occupant"
                  />
                </Button>
                <AddOccupantDialog open={open} onOpenChange={onOpenChange} />
                <QuickActionButton
                  icon={<Calendar className="h-4 w-4" />}
                  label="Request Short-term Stay"
                />
                <QuickActionButton
                  icon={<FileText className="h-4 w-4" />}
                  label="Manage Occupant Documents"
                />
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            {currentOccupants.map((occ) => (
              <OccupantCard key={occ.id} occ={occ} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const QuickActionButton = ({
  icon,
  label,
}: {
  icon: React.ReactElement<LucideIcon>;
  label: string;
}) => (
  <Button
    variant="outline"
    className="w-full justify-start text-slate-700 font-semibold py-6 border-gray-200">
    <span className="mr-3 text-slate-500">{icon}</span>
    {label}
  </Button>
);

const OccupantCard = ({
  occ,
}: {
  occ: {
    id: number;
    name: string;
    status: string;
    type: string;
    relation: string;
    moveInDate: string;
    documents: number;
    avatar: string;
    duration?: undefined | string;
  };
}) => (
  <Card className="border-none shadow-sm">
    <CardContent className="p-6">
      <div className="flex justify-between items-start">
        <div className="flex gap-4">
          <Image
            width={48}
            height={48}
            src={occ.avatar}
            className="w-12 h-12 rounded-full bg-slate-100"
            alt={occ.name}
          />
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-lg text-slate-800">{occ.name}</h3>
              <Badge className="bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-50">
                {occ.status}
              </Badge>
              <Badge
                variant="outline"
                className={
                  occ.type === "long-term"
                    ? "text-blue-500 border-blue-200"
                    : "text-orange-500 border-orange-200"
                }>
                {occ.type}
              </Badge>
            </div>
            <p className="text-sm text-gray-500 font-medium">
              {occ.relation} <span className="mx-1">•</span> Moved in{" "}
              {occ.moveInDate}
            </p>
            {occ.duration && (
              <p className="text-sm text-gray-500 font-medium mt-1">
                Duration: {occ.duration}
              </p>
            )}
          </div>
        </div>
        <p className="text-sm font-bold text-slate-700">
          {occ.documents} documents
        </p>
      </div>

      <div className="flex gap-3 mt-6">
        <Link href={`/tenant/occupancy/occupant/${occ.id}`}>
          <Button
            variant="outline"
            size="sm"
            className="text-slate-600 border-gray-200">
            <Eye className="h-4 w-4 mr-2" /> View Details
          </Button>
        </Link>
        <Button
          variant="outline"
          size="sm"
          className="text-slate-600 border-gray-200">
          <FileText className="h-4 w-4 mr-2" /> Documents
        </Button>
      </div>
    </CardContent>
  </Card>
);

export default OccupancyDashboard;
