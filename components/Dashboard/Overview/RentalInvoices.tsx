"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown, Filter, Plus } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const rentalApplicants = [
  {
    id: "1",
    name: "Riya Sharma",
    phone: "9812345678",
    email: "riya.sharma@email.com",
    avatar: "/placeholder-user.jpg",
    property: "Everest Residency",
    location: "Kathmandu",
    status: "Rent",
    statusColor: "bg-blue-100 text-blue-800",
  },
  {
    id: "2",
    name: "Aarav Thapa",
    phone: "9812345678",
    email: "aarav.thapa@email.com",
    avatar: "/placeholder-user.jpg",
    property: "Maple Villa",
    location: "Pokhara",
    status: "Buy",
    statusColor: "bg-indigo-100 text-indigo-800",
  },
  {
    id: "3",
    name: "Rabin Lama",
    phone: "9812345678",
    email: "rabin.lama@email.com",
    avatar: "/placeholder-user.jpg",
    property: "Skyline Apartment",
    location: "Lalitpur",
    status: "Sell",
    statusColor: "bg-pink-100 text-pink-800",
  },
  {
    id: "4",
    name: "Sneha Gurung",
    phone: "9812345678",
    email: "sneha.gurung@email.com",
    avatar: "/placeholder-user.jpg",
    property: "Horizon Tower",
    location: "Chitwan",
    status: "Sub-lease",
    statusColor: "bg-purple-100 text-purple-800",
  },
];

const tenantsRecent = [
  {
    id: "1",
    name: "Anthony Lewis",
    joined: "Since: 2023/01/05",
    avatar: "/placeholder-user.jpg",
    property: "Oakview",
    location: "Kathmandu",
    type: "Active",
    typeColor: "bg-green-100 text-green-800",
  },
  {
    id: "2",
    name: "Brian Villalobos",
    joined: "On: 2023/01/05",
    avatar: "/placeholder-user.jpg",
    property: "Hilltop",
    location: "Pokhara",
    type: "Applicant",
    typeColor: "bg-red-100 text-red-800",
  },
  {
    id: "3",
    name: "Stephan Peralt",
    joined: "Since: 2023/01/05",
    avatar: "/placeholder-user.jpg",
    property: "Bluestone",
    location: "Kathmandu",
    type: "Active",
    typeColor: "bg-green-100 text-green-800",
  },
  {
    id: "4",
    name: "Douglas Martini",
    joined: "On: 2023/01/05",
    avatar: "/placeholder-user.jpg",
    property: "Greenleaf",
    location: "Chitwan",
    type: "Moved Out",
    typeColor: "bg-yellow-100 text-yellow-800",
  },
  {
    id: "5",
    name: "Anthony Lewis",
    joined: "On: 2023/01/05",
    avatar: "/placeholder-user.jpg",
    property: "Riverbay",
    location: "Kathmandu",
    type: "Applicant",
    typeColor: "bg-red-100 text-red-800",
  },
];

const financialData = [
  { month: "Jan", income: 40, expenses: 30 },
  { month: "Feb", income: 60, expenses: 40 },
  { month: "Mar", income: 80, expenses: 50 },
  { month: "Apr", income: 70, expenses: 60 },
  { month: "May", income: 90, expenses: 70 },
  { month: "Jun", income: 85, expenses: 65 },
  { month: "Jul", income: 95, expenses: 75 },
  { month: "Aug", income: 80, expenses: 60 },
  { month: "Sep", income: 70, expenses: 50 },
  { month: "Oct", income: 60, expenses: 40 },
  { month: "Nov", income: 20, expenses: 15 },
  { month: "Dec", income: 75, expenses: 55 },
];

const invoices = [
  {
    id: "INV001",
    title: "Redesign Website",
    ref: "#INV002 - Logistics",
    amount: "$3560",
    status: "Unpaid",
    statusColor: "text-red-500",
    avatar: "/placeholder-user.jpg",
  },
  {
    id: "INV002",
    title: "Module Completion",
    ref: "#INV003 - Yip Corp.",
    amount: "$4175",
    status: "Unpaid",
    statusColor: "text-red-500",
    avatar: "/placeholder-user.jpg",
  },
  {
    id: "INV003",
    title: "Change on Emp Module",
    ref: "#INV004 - Ignite LLP",
    amount: "$6695",
    status: "Unpaid",
    statusColor: "text-red-500",
    avatar: "/placeholder-user.jpg",
  },
  {
    id: "INV004",
    title: "Changes on the Board",
    ref: "#INV005 - Ignite LLP",
    amount: "$1457",
    status: "Unpaid",
    statusColor: "text-red-500",
    avatar: "/placeholder-user.jpg",
  },
  {
    id: "INV005",
    title: "Hospital Management",
    ref: "#INV006 - HCL Corp",
    amount: "$6458",
    status: "Paid",
    statusColor: "text-green-500",
    avatar: "/placeholder-user.jpg",
  },
];

export default function RentalInvoices() {
  return (
    <div className="flex min-h-screen w-full flex-col  px-0 md:px-0 p-4 pt-0 pl-0 md:p-8 md:pl-0 md:pt-0 font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card className="shadow-sm border-gray-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-lg font-semibold text-gray-800">
              Rental Applicants
            </CardTitle>
            <Button
              variant="ghost"
              className="text-blue-600 hover:bg-blue-50 hover:text-blue-700 h-8 px-3">
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow className="border-b-0 hover:bg-gray-50">
                  <TableHead className="w-[45%] text-gray-500 font-medium py-3 rounded-l-lg">
                    Applicants
                  </TableHead>
                  <TableHead className="w-[35%] text-gray-500 font-medium py-3">
                    Property
                  </TableHead>
                  <TableHead className="w-[20%] text-gray-500 font-medium py-3 rounded-r-lg">
                    Openings
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rentalApplicants.map((applicant) => (
                  <TableRow
                    key={applicant.id}
                    className="border-b last:border-b-0 hover:bg-gray-50">
                    <TableCell className="py-3">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage
                            src={applicant.avatar}
                            alt={applicant.name}
                          />
                          <AvatarFallback>
                            {applicant.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-gray-900 text-sm">
                            {applicant.name}
                          </p>
                          <p className="text-gray-500 text-xs">
                            {applicant.phone} &bull; {applicant.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-3">
                      <p className="font-medium text-gray-900 text-sm">
                        {applicant.property}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {applicant.location}
                      </p>
                    </TableCell>
                    <TableCell className="py-3">
                      <Badge
                        className={`px-2 py-1 text-xs font-medium rounded-md ${applicant.statusColor}`}>
                        {applicant.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-gray-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-lg font-semibold text-gray-800">
              Tenants (Recent)
            </CardTitle>
            <Button
              variant="ghost"
              className="text-blue-600 hover:bg-blue-50 hover:text-blue-700 h-8 px-3">
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow className="border-b-0 hover:bg-gray-50">
                  <TableHead className="w-[45%] text-gray-500 font-medium py-3 rounded-l-lg">
                    Name
                  </TableHead>
                  <TableHead className="w-[35%] text-gray-500 font-medium py-3">
                    Property
                  </TableHead>
                  <TableHead className="w-[20%] text-gray-500 font-medium py-3 rounded-r-lg">
                    Type
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tenantsRecent.map((tenant) => (
                  <TableRow
                    key={tenant.id}
                    className="border-b last:border-b-0 hover:bg-gray-50">
                    <TableCell className="py-3">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={tenant.avatar} alt={tenant.name} />
                          <AvatarFallback>
                            {tenant.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-gray-900 text-sm">
                            {tenant.name}
                          </p>
                          <p className="text-gray-500 text-xs">
                            {tenant.joined}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-3">
                      <p className="font-medium text-gray-900 text-sm">
                        {tenant.property}
                      </p>
                      <p className="text-gray-500 text-xs">{tenant.location}</p>
                    </TableCell>
                    <TableCell className="py-3">
                      <Badge
                        className={`px-2 py-1 text-xs font-medium rounded-md ${tenant.typeColor}`}>
                        {tenant.type}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-sm border-gray-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-lg font-semibold text-gray-800">
              Financial Overview
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Select defaultValue="all-properties">
                <SelectTrigger className="w-[120px] h-8 text-xs text-gray-700 border-gray-300">
                  <SelectValue placeholder="All Properties" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-properties">All Properties</SelectItem>
                  <SelectItem value="property-a">Property A</SelectItem>
                  <SelectItem value="property-b">Property B</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="pt-2">
            <Tabs defaultValue="income">
              <div className="flex items-center justify-between mb-4">
                <TabsList className="h-auto p-1 bg-gray-100 rounded-md">
                  <TabsTrigger
                    value="income"
                    className="px-3 py-1.5 text-xs font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    Income
                  </TabsTrigger>
                  <TabsTrigger
                    value="expenses"
                    className="px-3 py-1.5 text-xs font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    Expenses
                  </TabsTrigger>
                </TabsList>
                <p className="text-xs text-gray-500">Last Updated at 11:30PM</p>
              </div>
              <TabsContent value="income">
                <div className="h-[200px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={financialData}
                      margin={{
                        top: 5,
                        right: 10,
                        left: 10,
                        bottom: 5,
                      }}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="#e0e0e0"
                      />
                      <XAxis
                        dataKey="month"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 10, fill: "#6b7280" }}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 10, fill: "#6b7280" }}
                      />
                      <Tooltip
                        cursor={{ fill: "transparent" }}
                        contentStyle={{
                          borderRadius: "8px",
                          border: "none",
                          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                        }}
                      />
                      <Bar
                        dataKey="income"
                        fill="#ef6236"
                        radius={[4, 4, 0, 0]}
                        barSize={15}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
              <TabsContent value="expenses">
                <div className="h-[200px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={financialData}
                      margin={{
                        top: 5,
                        right: 10,
                        left: 10,
                        bottom: 5,
                      }}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="#e0e0e0"
                      />
                      <XAxis
                        dataKey="month"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 10, fill: "#6b7280" }}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 10, fill: "#6b7280" }}
                      />
                      <Tooltip
                        cursor={{ fill: "transparent" }}
                        contentStyle={{
                          borderRadius: "8px",
                          border: "none",
                          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                        }}
                      />
                      <Bar
                        dataKey="expenses"
                        fill="#a8a29e"
                        radius={[4, 4, 0, 0]}
                        barSize={15}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-gray-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-lg font-semibold text-gray-800">
              Invoices
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Select defaultValue="invoices">
                <SelectTrigger className="w-[100px] h-8 text-xs text-gray-700 border-gray-300">
                  <SelectValue placeholder="Invoices" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="invoices">Invoices</SelectItem>
                  <SelectItem value="recent">Recent</SelectItem>
                  <SelectItem value="all">All</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="sm"
                className="h-8 px-3 text-xs text-gray-700 border-gray-300">
                <Filter className="h-3.5 w-3.5 mr-1" /> This Week
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-2">
            {invoices.map((invoice, index) => (
              <div
                key={invoice.id}
                className={`flex items-center justify-between py-3 ${
                  index < invoices.length - 1 ? "border-b border-gray-100" : ""
                }`}>
                <div className="flex items-center space-x-3">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={invoice.avatar} alt={invoice.title} />
                    <AvatarFallback>{invoice.title.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">
                      {invoice.title}
                    </p>
                    <p className="text-gray-500 text-xs">{invoice.ref}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900 text-sm">
                    {invoice.amount}
                  </p>
                  <p className={`text-xs ${invoice.statusColor}`}>
                    &bull; {invoice.status}
                  </p>
                </div>
              </div>
            ))}
            <Button
              variant="ghost"
              className="w-full text-blue-600 hover:bg-blue-50 hover:text-blue-700 mt-4 h-9">
              View All
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
