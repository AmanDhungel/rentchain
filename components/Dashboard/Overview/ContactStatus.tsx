"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  CalendarDays,
  ChevronDown,
  Plus,
  FileText,
  Hourglass,
  XCircle,
  CheckCircle,
  Clock,
  User,
} from "lucide-react";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import Image from "next/image";
import { icons } from "@/assets/icons/exports";

const contractStatusData = {
  total: 154,
  active: 112,
  renewed: 112,
  underReview: 12,
  expired: 4,
};

const workOrderData = {
  totalTickets: 120,
  breakdown: [
    { name: "Completed", value: 59, color: "#2ecc71" },
    { name: "Under review", value: 21, color: "#f1c40f" },
    { name: "In Progress", value: 15, color: "#3498db" },
    { name: "Requested", value: 25, color: "#e74c3c" },
  ],
  providers: [
    {
      name: "Provider A",
      avatar: "https://placehold.co/40x40/3b82f6/ffffff?text=A",
    },
    {
      name: "Provider B",
      avatar: "https://placehold.co/40x40/ef4444/ffffff?text=B",
    },
    {
      name: "Provider C",
      avatar: "https://placehold.co/40x40/22c55e/ffffff?text=C",
    },
  ],
};

const totalWorkOrderValue = workOrderData.breakdown.reduce(
  (sum, item) => sum + item.value,
  0
);

const tenantsCheckInOut = {
  upcoming: [
    {
      id: "t1",
      name: "John Doe",
      property: "Greenleaf Villa",
      avatar: "https://placehold.co/40x40/1f2937/ffffff?text=JD",
      term: "Long Term",
      checkIn: "Oct 2025",
      checkOut: "Sept 2026",
      duration: "10/25 - 09/26",
      badgeColor: "bg-orange-100 text-orange-800",
    },
    {
      id: "t2",
      name: "Alex Carter",
      property: "Summit",
      avatar: "https://placehold.co/40x40/4f46e5/ffffff?text=AC",
      term: "Short Term",
      checkIn: "Oct 2025",
      checkOut: "Sept 2026",
      duration: "10/25 - 09/26",
      badgeColor: "bg-green-100 text-green-800",
    },
  ],
  late: [
    {
      id: "t3",
      name: "John Doe",
      property: "Greenleaf Villa",
      avatar: "https://placehold.co/40x40/dc2626/ffffff?text=JD",
      term: "12 Jan 2025 - 12 Jan 2026",
      checkIn: "Oct 2025",
      checkOut: "Sept 2026",
      duration: "10/25 - 09/26",
      daysLate: "2 days",
      badgeColor: "bg-red-100 text-red-800",
    },
  ],
};

const CustomPieTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    if (data.name === "invisible") return null;

    const percentage = ((data.value / totalWorkOrderValue) * 100).toFixed(0);
    return (
      <div className="custom-tooltip bg-white p-2 rounded-md shadow-lg text-sm border border-gray-200 ">
        <p className="font-semibold" style={{ color: data.color }}>
          {data.name}: {data.value} tickets ({percentage}%)
        </p>
      </div>
    );
  }
  return null;
};

const TenantCheckInOutItem = ({ tenant, isLate = false }) => (
  <div className="flex items-start">
    <Avatar className="h-10 w-10 shrink-0 mr-3">
      <AvatarImage
        src={tenant.avatar}
        alt={tenant.name}
        onError={(e) => (e.currentTarget.style.display = "none")}
      />
      <AvatarFallback className="bg-gray-200 text-gray-700 text-sm font-medium">
        {tenant.name
          .split(" ")
          .map((n) => n[0])
          .join("")}
      </AvatarFallback>
    </Avatar>
    <div className="flex-grow">
      <div className="flex justify-between items-center">
        <p className="text-sm font-semibold text-gray-900">{tenant.name}</p>
        <Badge
          className={`px-2 py-0.5 text-xs font-medium rounded-full ${tenant.badgeColor}`}>
          {isLate ? `${tenant.daysLate}` : tenant.term}
        </Badge>
      </div>
      <p className="text-xs text-gray-500">{tenant.property}</p>

      <div className="grid grid-cols-3 gap-2 text-xs text-gray-600 mt-3 border-t border-gray-100 pt-2">
        <div className="flex items-center space-x-1">
          <Clock className="h-3 w-3 text-gray-400" />
          <span className="font-medium text-gray-900">Check In</span>
        </div>
        <div className="flex items-center space-x-1">
          <Clock className="h-3 w-3 text-gray-400" />
          <span className="font-medium text-gray-900">Check Out</span>
        </div>
        <div className="flex items-center space-x-1">
          <CalendarDays className="h-3 w-3 text-gray-400" />
          <span className="font-medium text-gray-900">Duration</span>
        </div>
        <div className="col-span-1 text-gray-500 font-medium">
          {tenant.checkIn}
        </div>
        <div className="col-span-1 text-gray-500 font-medium">
          {tenant.checkOut}
        </div>
        <div className="col-span-1 text-gray-500 font-medium">
          {tenant.duration}
        </div>
      </div>
    </div>
  </div>
);

export default function ContractStatus() {
  const pieChartData = workOrderData.breakdown;

  const totalSegmentWidth = workOrderData.breakdown.reduce(
    (sum, item) => sum + (item.value / totalWorkOrderValue) * 100,
    0
  );

  const [filter, setFilter] = useState("All");

  // const filteredTenants =
  //   filter === "All"
  //     ? tenantsData
  //     : tenantsData.filter((t) => t.type === filter);

  return (
    <div className="p-4 md:p-8 px-0 md:px-0  min-h-screen font-sans">
      <div className="grid grid-cols-1 2xl:grid-cols-3 gap-6">
        <Card className="shadow-lg border-gray-100 rounded-xl transition-shadow duration-300 hover:shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-gray-100">
            <CardTitle className="text-lg font-semibold text-gray-800">
              Contract Status
            </CardTitle>
            <Button
              variant="outline"
              className="text-gray-700 border-gray-300 h-8 px-3 text-sm flex items-center shadow-sm hover:bg-gray-50 rounded-xl">
              <CalendarDays className="h-4 w-4 mr-2 text-gray-500" />
              This Year
              <ChevronDown className="h-4 w-4 ml-2 text-gray-500" />
            </Button>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500 mb-1">Total Contracts</p>
              <p className="text-4xl font-extrabold text-gray-900 mb-6">
                {contractStatusData.total}
              </p>
            </div>

            <div className="flex w-full h-7 rounded-md overflow-hidden mb-6">
              {workOrderData.breakdown.map((item, index) => {
                const segmentWidth = (item.value / totalWorkOrderValue) * 100;
                return (
                  <div
                    key={`contract-segment-${index}`}
                    style={{
                      width: `${segmentWidth}%`,
                      backgroundColor: item.color,
                    }}
                    className="h-full"></div>
                );
              })}

              <div
                style={{
                  width: `${Math.max(0, 100 - totalSegmentWidth)}%`,
                  backgroundColor: "#e0e0e0",
                }}
                className="h-full"></div>
            </div>

            <div className="grid grid-cols-2   mb-8">
              <div className="flex flex-col  space-x-3 border border-gray-100 p-2">
                <div className="flex items-center mb-2">
                  <Image
                    src={icons.ActivityZone}
                    alt="activityzone"
                    className="h-4 w-4 mr-2"
                  />
                  <p className="text-xs text-gray-500">Active</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900">
                    {contractStatusData.active}
                  </p>
                </div>
              </div>
              <div className="flex flex-col text-right  space-x-3 border border-gray-100 p-2">
                <div className="flex items-center mb-2 text-right justify-end ">
                  <Image
                    src={icons.AutoPause}
                    alt="activityzone"
                    className="h-4 w-4 mr-2"
                  />
                  <p className="text-xs text-gray-500">Renewed</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900">
                    {contractStatusData.renewed}
                  </p>
                </div>
              </div>
              <div className="flex flex-col  space-x-3 border border-gray-100 p-2">
                <div className="flex items-center mb-2">
                  <Image
                    src={icons.DataLossPrevention}
                    alt="activityzone"
                    className="h-4 w-4 mr-2"
                  />
                  <p className="text-xs text-gray-500">Under Review</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900">
                    {contractStatusData.underReview}
                  </p>
                </div>
              </div>
              <div className="flex flex-col  space-x-3 text-right border border-gray-100 p-2">
                <div className="flex items-center mb-2 text-right justify-end ">
                  <Image
                    src={icons.CreditCardClock}
                    alt="activityzone"
                    className="h-4 w-4 mr-2"
                  />
                  <p className="text-xs text-gray-500">Expired</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900">
                    {contractStatusData.expired}
                  </p>
                </div>
              </div>
            </div>

            <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-sm flex items-center justify-center transition shadow-md shadow-orange-200">
              <Image
                src={icons.RoundedPlusIcon}
                alt="roundedplus"
                className="h-6 w-6 mr-2"
              />{" "}
              Enhanced Agreement Builder
            </Button>
            <Button
              variant="ghost"
              className="w-full text-slate-700 hover:bg-blue-50 hover:text-slate-800 mt-3 font-semibold rounded-sm bg-gray-100">
              View All Contracts
            </Button>
          </CardContent>
        </Card>

        {/* 2. Work Order Overview Card */}
        <Card className="shadow-lg border-gray-100 rounded-xl transition-shadow duration-300 hover:shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-gray-100">
            <CardTitle className="text-lg font-semibold text-gray-800">
              Work Order Overview
            </CardTitle>
            <Button
              variant="outline"
              className="text-gray-700 border-gray-300 h-8 px-3 text-sm flex items-center shadow-sm hover:bg-gray-50 rounded-xl">
              <CalendarDays className="h-4 w-4 mr-2 text-gray-500" />
              Today
              <ChevronDown className="h-4 w-4 ml-2 text-gray-500" />
            </Button>
          </CardHeader>
          <CardContent className="pt-6  flex flex-col items-center">
            <div className="relative w-full max-w-[200px] h-[100px] flex items-center justify-center mb-6">
              <ResponsiveContainer width="100%" height="200%">
                <PieChart>
                  <Pie
                    data={[{ value: totalWorkOrderValue }]}
                    cx="50%"
                    cy="100%"
                    startAngle={180}
                    endAngle={0}
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    fill="white"
                  />
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="95%"
                    startAngle={185}
                    endAngle={-5}
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={4}
                    cornerRadius={5}
                    dataKey="value"
                    stroke="none"
                    animationDuration={500}>
                    {pieChartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                        className="rounded-xl"
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomPieTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute top-[100%] left-1/2 -translate-x-1/2 -translate-y-1/2 mt-4 text-center">
                <p className="text-3xl font-bold text-gray-900">
                  {workOrderData.totalTickets}
                </p>
                <p className="text-xs text-gray-500">Total Tickets</p>
              </div>
            </div>

            <div className="w-full space-y-3 mb-8 px-2 mt-10">
              {workOrderData.breakdown.map((item) => (
                <div
                  key={item.name}
                  className="flex justify-between items-center text-sm">
                  <div className="flex items-center">
                    <span
                      className="w-2.5 h-2.5 rounded-full mr-3"
                      style={{ backgroundColor: item.color }}></span>
                    <span className="text-gray-700 font-medium">
                      {item.name}
                    </span>
                  </div>
                  <span className="font-semibold text-gray-900">
                    {((item.value / totalWorkOrderValue) * 100).toFixed(0)}%
                  </span>
                </div>
              ))}
            </div>

            <div className="w-full flex justify-between items-center border-t border-gray-100 pt-4">
              <div className="flex items-center -space-x-3">
                <p className="mr-7">Providers</p>
                {workOrderData.providers.map((provider, index) => (
                  <Avatar
                    key={index}
                    className="h-9 w-9 border-2 border-white shadow-sm transition transform hover:scale-105">
                    <AvatarImage
                      src={provider.avatar}
                      alt={provider.name}
                      onError={(e) => (e.currentTarget.style.display = "none")}
                    />
                    <AvatarFallback className="text-xs bg-gray-200 text-gray-600 border border-gray-300">
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                ))}
                {workOrderData.providers.length > 3 && (
                  <Badge className="bg-gray-100 text-gray-600 text-xs font-medium h-7 px-2.5 border border-gray-200">
                    +{workOrderData.providers.length - 3}
                  </Badge>
                )}
              </div>
              <Button
                variant="ghost"
                className="text-blue-600 hover:bg-blue-50 hover:text-blue-700 h-9 px-4 text-sm font-semibold rounded-xl">
                View Details
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-gray-100 rounded-xl transition-shadow duration-300 hover:shadow-xl">
          <CardHeader className="pb-4 border-b border-gray-100">
            <CardTitle className="text-lg font-semibold text-gray-800 mb-4">
              Tenants Check-in/Out
            </CardTitle>
            <div className="flex flex-wrap items-center gap-2">
              <h1>Tenant</h1>
              <div>
                <div className="flex items-center gap-2 ">
                  {/* Filter Buttons */}
                  <div className="flex p-2 text-xs bg-slate-100 border border-slate-100 rounded-lg">
                    {["All", "Short Term", "Long Term"].map((item) => (
                      <button
                        key={item}
                        onClick={() => setFilter(item)}
                        className={`text-xs font-medium px-3 py-1 rounded-lg  ${
                          filter === item
                            ? "bg-white text-black border-slate-200"
                            : "text-gray-500 hover:bg-gray-100"
                        }`}>
                        {item}
                      </button>
                    ))}
                  </div>

                  <button className="flex items-center gap-1 text-sm text-gray-500 border rounded-md px-2 py-1">
                    <CalendarDays size={16} /> 10/25 - 09/26
                  </button>
                </div>
              </div>
              {/* <Button
                  variant="outline"
                  size="sm"
                  className="h-8 px-3 text-xs text-gray-700 border-gray-300 shadow-sm hover:bg-gray-50 rounded-xl">
                  All
                </Button>

              <Button
                variant="outline"
                size="sm"
                className="h-8 px-3 text-xs text-gray-700 border-gray-300 shadow-sm hover:bg-gray-50 rounded-xl">
                Short Term
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-8 px-3 text-xs text-gray-700 border-gray-300 shadow-sm hover:bg-gray-50 rounded-xl">
                Long Term
              </Button> */}
              <Button
                variant="outline"
                className="text-gray-700 border-gray-300 h-8 px-3 text-sm flex items-center shadow-sm hover:bg-gray-50 rounded-xl">
                <CalendarDays className="h-4 w-4 mr-2 text-gray-500" />
                10/25 - 09/26
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-sm font-bold text-gray-900 mb-4">Upcoming</p>
            <div className="space-y-6">
              {tenantsCheckInOut.upcoming.map((tenant) => (
                <TenantCheckInOutItem key={tenant.id} tenant={tenant} />
              ))}
            </div>

            <p className="text-sm font-bold text-gray-900 mt-8 mb-4">Late</p>
            <div className="space-y-6">
              {tenantsCheckInOut.late.map((tenant) => (
                <TenantCheckInOutItem
                  key={tenant.id}
                  tenant={tenant}
                  isLate={true}
                />
              ))}
            </div>

            <Button
              variant="ghost"
              className="w-full text-blue-600 hover:bg-blue-50 hover:text-blue-700 mt-6 font-semibold rounded-xl">
              View Details
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
