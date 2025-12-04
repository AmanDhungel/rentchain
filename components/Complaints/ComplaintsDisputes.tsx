"use client";
import {
  ArrowLeft,
  Search,
  Filter,
  Eye,
  AlertTriangle,
  Building,
  User,
  Clock,
  Package,
  Hash,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { icons } from "@/assets/icons/exports";
import { Button, Input } from "../ui";
import { Badge } from "../ui/badge";

const METRICS = [
  {
    label: "SLA Breaches",
    count: 3,
    color: "text-red-600",
    borderColor: "border-red-400",
  },
  {
    label: "Urgent",
    count: 1,
    color: "text-orange-500",
    borderColor: "border-orange-400",
  },
  {
    label: "Open",
    count: 2,
    color: "text-blue-500",
    borderColor: "border-blue-400",
  },
  {
    label: "Resolved",
    count: 0,
    color: "text-green-600",
    borderColor: "border-green-400",
  },
];

const TICKETS = [
  {
    id: "TKT-2024-001",
    title: "Heating system not working",
    status: "In Progress",
    priority: "success",
    description:
      "The heating system in my apartment has stopped working completely. The temperature has dropped significantly.",
    location: "Sunset Towers",
    apartment: "Apt 101",
    category: "warning",
    daysAgo: 664,
    assignedTo: "John Smith",
    isSLABreach: true,
    workOrders: 1,
  },
  {
    id: "TKT-2024-002",
    title: "Noise complaint from upstairs neighbor",
    status: "Assigned",
    priority: "destructive",
    description:
      "Excessive noise from the apartment above, especially during late hours. This has been ongoing for over a week.",
    location: "Sunset Towers",
    apartment: "Apt 201",
    category: "Noise",
    daysAgo: 665,
    assignedTo: "Jane Doe",
    isSLABreach: true,
    workOrders: 0,
  },
  {
    id: "TKT-2024-003",
    title: "Common area lighting broken",
    status: "Open",
    priority: "warning",
    description:
      "The light fixture in the hallway on the 5th floor is flickering and occasionally turns off completely.",
    location: "Building A",
    apartment: "Hallway 5F",
    category: "Electrical",
    daysAgo: 12,
    assignedTo: "Unassigned",
    isSLABreach: false,
    workOrders: 0,
  },
];

const MetricCard = ({
  label,
  count,
  color,
  borderColor,
}: {
  label: string;
  count: number;
  color: string;
  borderColor: string;
}) => (
  <div
    className={`p-4 rounded-xl border-2 hover:shadow-lg transition-shadow ${borderColor} bg-white`}>
    <div className={`text-4xl font-bold ${color} mb-1`}>{count}</div>
    <div className="text-sm font-medium text-gray-500">{label}</div>
  </div>
);

const TicketItem = ({
  ticket,
}: {
  ticket: {
    status: string;
    priority:
      | "secondary"
      | "default"
      | "success"
      | "warning"
      | "destructive"
      | "outline"
      | "verified"
      | "highpriority"
      | null
      | undefined;
    id: string;
    title: string;
    location: string;
    description: string;
    apartment: string;
    category: string;
    daysAgo: number;
    assignedTo: string;
    isSLABreach: boolean;
    workOrders: number;
  };
}) => {
  const statusVariant =
    ticket.status === "In Progress" ? "secondary" : "default";

  return (
    <Link
      href={`/complaints/${ticket.id}`}
      className="flex flex-col lg:flex-row justify-between p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 mt-4">
      <div className="grow space-y-3 lg:space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 flex-wrap">
            <h3 className="text-lg font-semibold text-gray-800 truncate">
              {ticket.id}
            </h3>
            <Badge variant={statusVariant} className="text-[10px] uppercase">
              {ticket.status}
            </Badge>
            <Badge variant={ticket.priority} className="text-[10px] uppercase">
              {ticket.priority}
            </Badge>
          </div>
          <Eye className="h-5 w-5 text-gray-500 cursor-pointer hover:text-gray-700 transition-colors hidden lg:block" />
        </div>

        <h4 className="text-base font-medium text-gray-900">{ticket.title}</h4>
        <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
          {ticket.description}
        </p>

        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 text-sm text-gray-600 pt-1">
          <div className="flex items-center space-x-2">
            <Building className="h-4 w-4 text-gray-500" />
            <span className="font-medium">{ticket.location}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Hash className="h-4 w-4 text-gray-500" />
            <span className="font-medium">{ticket.apartment}</span>
          </div>
          <div className="flex items-center space-x-2 mt-2 sm:mt-0">
            <User className="h-4 w-4 text-gray-500" />
            <span className="font-medium">{ticket.assignedTo}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center space-x-4 text-xs text-gray-500 pt-2 border-t border-gray-100 mt-2">
          <Badge variant="default">{ticket.category}</Badge>
          <div className="flex items-center space-x-1">
            <Clock className="h-3.5 w-3.5" />
            <span>{ticket.daysAgo}d ago</span>
          </div>
          {ticket.workOrders > 0 && (
            <span className="text-xs">
              Assigned to: TECH-001 {ticket.workOrders} work order(s)
            </span>
          )}
        </div>
      </div>

      <div className="flex lg:flex-col items-start lg:items-end justify-between lg:justify-start pt-4 lg:pt-0 lg:ml-6 space-x-4 lg:space-x-0 lg:space-y-4 border-t lg:border-t-0 border-gray-100 mt-4 lg:mt-0">
        {ticket.isSLABreach && (
          <div className="flex items-center space-x-1 text-red-600 bg-red-50 p-2 rounded-full font-semibold text-xs border border-red-300/50">
            <AlertTriangle className="h-4 w-4 fill-red-600/10" />
            <span>SLA Breach</span>
          </div>
        )}
        <Eye className="h-5 w-5 text-gray-500 cursor-pointer hover:text-gray-700 transition-colors block lg:hidden" />
      </div>
    </Link>
  );
};

const ComplaintsDispute = () => {
  const [tickets, setTickets] = useState(TICKETS);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTickets = tickets.filter(
    (t) =>
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen pl-0 p-4 sm:p-6 sm:pl-0 lg:pl-0 lg:p-8 font-sans">
      <div className="mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b border-gray-200 mb-6">
          <div className="flex items-center space-x-4">
            <ArrowLeft className="h-6 w-6 text-gray-500 cursor-pointer" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Complaints & Disputes
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">
                {tickets.length} tickets
              </p>
            </div>
          </div>
          <Link href="/complaints/complaint-and-dispute/new-ticket">
            <Button variant="default" className="bg-orange-500 mt-4 sm:mt-0">
              <Image
                src={icons.RoundedPlusIcon}
                alt="roundedPlus"
                className="h-4 w-4 mr-2"
              />
              New Ticket
            </Button>
          </Link>
        </header>

        <div className="flex gap-2">
          <div className="flex items-center space-x-2 w-full mb-6 p-1 border border-gray-200 rounded-lg">
            <Search className="h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search tickets..."
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchTerm(e.target.value)
              }
              className="grow bg-white! shadow-none focus-visible:ring-0"
            />
          </div>

          <Button variant="outline" size="icon" className="w-fit p-2 h-11.5 ">
            Filter <Filter className="h-8 w-8" />
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {METRICS.map((metric) => (
            <MetricCard key={metric.label} {...metric} />
          ))}
        </div>

        <div className="space-y-4">
          {filteredTickets.length > 0 ? (
            filteredTickets.map((ticket) => (
              <TicketItem key={ticket.id} ticket={ticket} />
            ))
          ) : (
            <div className="text-center p-10 bg-white rounded-xl shadow-sm text-gray-500">
              No tickets match your search criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComplaintsDispute;
