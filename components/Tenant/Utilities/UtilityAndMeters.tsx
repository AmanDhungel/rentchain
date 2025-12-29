"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import {
  Zap,
  Droplets,
  Flame,
  Wifi,
  AlertTriangle,
  Cpu,
  History,
  Plus,
  ArrowLeft,
  Eye,
  LucideIcon,
  FlameIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";

// --- Mock Data ---
const usageTrendData = [
  { name: "Jun", electricity: 110, water: 75, gas: 25, internet: 15 },
  { name: "Aug", electricity: 230, water: 140, gas: 55, internet: 12 },
  { name: "Sep", electricity: 215, water: 125, gas: 45, internet: 10 },
  { name: "Oct", electricity: 205, water: 115, gas: 35, internet: 10 },
  { name: "Nov", electricity: 140, water: 85, gas: 38, internet: 12 },
  { name: "Dec", electricity: 170, water: 110, gas: 55, internet: 18 },
  { name: "Jan", electricity: 150, water: 95, gas: 25, internet: 10 },
];

const breakdownData = [
  { name: "Jan", internet: 10, electricity: 72, water: 35, gas: 12 },
];

export default function UtilityDashboard() {
  const router = useRouter();
  return (
    <div className="min-h-screen pl-0 md:pl-0 p-4 md:p-8 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-white shadow-sm">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-slate-900">
              Utilities & Meters
            </h1>
            <p className="text-sm text-slate-500">
              Track usage, readings, and bills
            </p>
          </div>
        </div>
        <Button className="bg-orange-500 hover:bg-orange-600 text-white gap-2">
          <Plus className="h-4 w-4" /> Add Reading
        </Button>
      </div>

      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {[1, 2].map((i) => (
          <Card key={i} className="relative overflow-hidden">
            <CardContent className="pt-6">
              <Badge
                variant="destructive"
                className="absolute top-4 left-16 text-[10px] h-4">
                1 Overdue
              </Badge>
              <div className="flex items-center gap-4">
                <div
                  className={
                    i === 1
                      ? "p-2 bg-blue-50 text-blue-500 rounded"
                      : "p-2 bg-green-50 text-green-500 rounded"
                  }>
                  {i === 1 ? <Zap size={20} /> : <Flame size={20} />}
                </div>
                <div>
                  <p className="text-xs text-slate-500">Total Monthly Bill</p>
                  <p className="text-2xl font-bold text-slate-800">$220.90</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        <Card>
          <CardContent className="pt-6 flex justify-between items-start">
            <div className="flex gap-4">
              <div className="p-2 bg-red-50 text-red-500 rounded">
                <AlertTriangle size={20} />
              </div>
              <div>
                <p className="text-xs text-slate-500">Usage Alerts</p>
                <p className="text-2xl font-bold text-slate-800">1</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-3/4 mt-8"
              onClick={() => router.push("/tenant/utilities/usageanamolies")}>
              View Alerts
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 flex gap-4">
            <div className="p-2 bg-purple-50 text-purple-500 rounded">
              <Cpu size={20} />
            </div>
            <div>
              <p className="text-xs text-slate-500">IoT Connected</p>
              <p className="text-2xl font-bold text-slate-800">2</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="meters" className="w-full">
        <TabsList className="w-full justify-start bg-transparent border-b rounded-none h-12 p-0 gap-8">
          <TabsTrigger
            value="meters"
            className="data-[state=active]:border-orange-500 data-[state=active]:text-orange-600 border-b-2 border-transparent rounded-none bg-transparent px-8 h-12">
            Meters
          </TabsTrigger>
          <TabsTrigger
            value="bills"
            className="data-[state=active]:border-orange-500 data-[state=active]:text-orange-600 border-b-2 border-transparent rounded-none bg-transparent px-8 h-12">
            Bills
          </TabsTrigger>
          <TabsTrigger
            value="usage"
            className="data-[state=active]:border-orange-500 data-[state=active]:text-orange-600 border-b-2 border-transparent rounded-none bg-transparent px-8 h-12">
            Usage Trends
          </TabsTrigger>
        </TabsList>

        <TabsContent value="meters" className="space-y-4 mt-6">
          <MeterCard
            title="Main Electrical Meter"
            id="ELE-001"
            location="Utility Room"
            val="240 kWh"
            cost="$42.50"
            trend="1.6%"
            status="normal"
            Icon={Zap}
            link={"/tenant/utilities/meterreadings"}
          />
          <MeterCard
            title="WTR-2024-001"
            id="WAT-001"
            location="Main Supply"
            val="8,750 gallons"
            cost="$28.00"
            trend="1.2%"
            status="high"
            Icon={Droplets}
            bgcolor="blue-500"
            link={"/tenant/utilities/meterreadings"}
          />
          <MeterCard
            title="WTR-2024-001"
            id="WAT-001"
            location="Main Supply"
            val="8,750 gallons"
            cost="$28.00"
            trend="1.2%"
            status="overdue"
            Icon={FlameIcon}
            bgcolor="purple-500"
            link={"/tenant/utilities/meterreadings"}
          />
        </TabsContent>

        {/* Bills Tab Content */}
        <TabsContent value="bills" className="space-y-4 mt-6">
          <BillCard
            title="Electricity"
            amount="$42.50"
            usage="240 kWh"
            method="Sub-metered"
            status="Pending"
          />
          <BillCard
            title="Water"
            amount="$28.00"
            usage="100 gallons"
            method="Per-occupant (2 people)"
            status="Pending"
          />
          <BillCard
            title="Gas"
            amount="$85.40"
            usage="70 CCF"
            method="Ratio (40%)"
            status="Overdue"
          />
        </TabsContent>

        {/* Usage Trends Tab Content */}
        <TabsContent value="usage" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold text-slate-700">
                Usage Trends (Last 7 Months)
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={usageTrendData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#f0f0f0"
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#94a3b8" }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#94a3b8" }}
                  />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="electricity"
                    stroke="#f97316"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="water"
                    stroke="#a855f7"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="gas"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="internet"
                    stroke="#22c55e"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-semibold text-slate-700">
                  January 2024 Usage Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={breakdownData} barGap={0}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#f0f0f0"
                    />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip />
                    <Bar
                      dataKey="internet"
                      fill="#22c55e"
                      radius={[2, 2, 0, 0]}
                    />
                    <Bar
                      dataKey="electricity"
                      fill="#f97316"
                      radius={[2, 2, 0, 0]}
                    />
                    <Bar dataKey="water" fill="#a855f7" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="gas" fill="#3b82f6" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-semibold text-slate-700">
                  Usage Efficiency
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 pt-4">
                <EfficiencyItem label="Electricity vs. Average" percent={67} />
                <EfficiencyItem label="Water vs. Average" percent={45} />
                <EfficiencyItem label="Gas vs. Average" percent={82} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function MeterCard({
  title,
  id,
  location,
  val,
  cost,
  trend,
  status,
  Icon,
  bgcolor,
  link,
}: {
  title: string;
  id: string;
  location: string;
  val: string;
  cost: string;
  trend: string;
  status: string;
  Icon: LucideIcon;
  bgcolor?: string;
  link: string;
}) {
  const router = useRouter();
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-6">
          <div className="flex gap-4">
            <div
              className={`p-2 ${
                bgcolor ? `bg-${bgcolor}/10` : "bg-orange-50"
              } text-orange-500 rounded h-fit mt-1`}>
              {Icon && (
                <Icon
                  className={`h-10 w-10 ${bgcolor ? `text-${bgcolor}` : ""}`}
                />
              )}
            </div>
            <div>
              <h3 className="font-bold text-slate-800">{title}</h3>
              <p className="text-xs text-slate-400">
                {id} • {location}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Badge
              className={
                status === "normal"
                  ? "bg-green-500/10 text-green-600 hover:bg-green-500/10"
                  : status === "overdue"
                  ? "bg-red-500 text-white"
                  : "bg-orange-500 text-white"
              }>
              {status}
            </Badge>
            {status === "normal" && (
              <Badge
                variant="secondary"
                className="bg-green-500 text-white font-normal">
                IoT
              </Badge>
            )}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div>
            <p className="text-xs text-slate-400 mb-1">Current Reading</p>
            <p className="font-bold text-slate-700">Ahmed Hassan</p>
            <p className="text-xs text-slate-400">kWh</p>
          </div>
          <div>
            <p className="text-xs text-slate-400 mb-1">Usage This Period</p>
            <p className="font-bold text-slate-700">{val.split(" ")[0]}</p>
            <p className="text-xs text-red-500 font-medium">{trend}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-400 mb-1">Estimated Cost</p>
            <p className="font-bold text-slate-700">{cost}</p>
          </div>
        </div>

        <div className="flex justify-between items-center text-[10px] text-slate-400 mb-4">
          <p>Last Reading: 1/25/2024</p>
          <p>Next Due: 2/1/2024</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            className="gap-2 text-xs h-10 border-slate-200"
            onClick={() => {
              router.push(link);
            }}>
            <Cpu className="h-4 w-4" /> Submit Reading
          </Button>
          <Button
            variant="outline"
            className="gap-2 text-xs h-10 border-slate-200">
            <Eye className="h-4 w-4" /> View History
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function BillCard({ title, amount, usage, method, status }: any) {
  return (
    <Card>
      <CardContent className="p-6 flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <div className="p-2 bg-slate-50 text-slate-400 rounded">
            {title === "Electricity" ? (
              <Zap size={18} />
            ) : title === "Water" ? (
              <Droplets size={18} />
            ) : title === "Internet" ? (
              <Wifi size={18} />
            ) : (
              <Flame size={18} />
            )}
          </div>
          <div>
            <h3 className="font-bold text-slate-800">{title}</h3>
            <p className="text-xs text-slate-400">Jan 2024</p>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <p className="text-xs text-slate-400">Usage</p>
          <p className="font-bold text-slate-700">{usage}</p>
          <p className="text-[10px] text-slate-400">Due: 2/15/2024</p>
        </div>

        <div className="text-right flex flex-col items-end gap-1">
          <p className="font-bold text-slate-800">{amount}</p>
          <Badge
            className={
              status === "Overdue"
                ? "bg-red-100 text-red-600"
                : status === "Paid"
                ? "bg-green-100 text-green-600"
                : "bg-blue-100 text-blue-600"
            }>
            {status}
          </Badge>
          <div className="mt-2 text-right">
            <p className="text-[10px] text-slate-400">Allocation Method</p>
            <p className="text-xs font-bold text-slate-700">{method}</p>
          </div>
          {status !== "Paid" && (
            <Button
              size="sm"
              className="bg-orange-500 hover:bg-orange-600 mt-2">
              Pay Now
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function EfficiencyItem({ label, percent }: any) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs font-medium">
        <span className="text-slate-700">{label}</span>
        <span className="text-slate-400">33% below average</span>
      </div>
      <Progress value={percent} className="h-2 bg-slate-100" />
    </div>
  );
}
