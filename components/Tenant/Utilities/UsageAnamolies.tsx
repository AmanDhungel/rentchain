"use client";
import {
  AlertTriangle,
  XCircle,
  MessageSquare,
  Search,
  Filter,
  Eye,
  FileText,
  Camera,
  ArrowLeft,
  TrendingUp,
} from "lucide-react";
import React, { useState } from "react";
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
  Cell,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";

const weeklyTrends = [
  { name: "Dec 1", electricity: 110, water: 75, gas: 25, internet: 15 },
  { name: "Dec 8", electricity: 230, water: 140, gas: 55, internet: 12 },
  { name: "Dec 15", electricity: 215, water: 125, gas: 45, internet: 10 },
  { name: "Dec 22", electricity: 115, water: 115, gas: 35, internet: 10 },
  { name: "Dec 29", electricity: 140, water: 85, gas: 38, internet: 12 },
  { name: "Jan 5", electricity: 170, water: 110, gas: 55, internet: 18 },
  { name: "Jan 12", electricity: 150, water: 95, gas: 25, internet: 10 },
];

const comparisonData = [
  { name: "Electricity", current: 70, average: 75 },
  { name: "Water", current: 45, average: 72 },
  { name: "Gas", current: 78, average: 90 },
  { name: "Internet", current: 98, average: 38 },
];

export default function UsageAnomalies() {
  const router = useRouter();
  return (
    <div className="min-h-screen pl-2 p-4 md:p-8 md:pl-0 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-white shadow-sm"
          onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-xl font-bold text-slate-900">Usage Anomalies</h1>
          <p className="text-sm text-slate-500">
            Monitor alerts and dispute readings
          </p>
        </div>
      </div>

      {/* Summary Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          icon={<AlertTriangle className="text-red-500" />}
          label="Active Alerts"
          value="1"
        />
        <StatCard
          icon={<XCircle className="text-red-600" />}
          label="Critical"
          value="1"
        />
        <StatCard
          icon={<MessageSquare className="text-purple-500" />}
          label="Disputed"
          value="1"
        />
      </div>

      <Tabs defaultValue="alerts" className="w-full">
        <TabsList className="w-full justify-start bg-transparent border-b rounded-none h-12 p-0 gap-12">
          <TabsTrigger value="alerts" className="tab-trigger">
            Alerts
          </TabsTrigger>
          <TabsTrigger value="trends" className="tab-trigger">
            Usage Trends
          </TabsTrigger>
          <TabsTrigger value="disputes" className="tab-trigger">
            Disputes
          </TabsTrigger>
        </TabsList>

        {/* --- ALERTS TAB --- */}
        <TabsContent value="alerts" className="space-y-6 mt-6">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <Input placeholder="Search..." className="pl-10 bg-white" />
            </div>
            <Button variant="outline" className="gap-2">
              {" "}
              <Filter className="h-4 w-4" /> Filter{" "}
            </Button>
          </div>

          {/* Water Meter Alert Card */}
          <AnomalyCard
            type="Water Meter"
            id="ANOM-00"
            date="Jan 2024"
            severity="HIGH"
            status="Active"
            issue="High Usage"
            percentage="+76.5%"
            value="150 gallons"
            vs="vs 85 avg"
            color="blue"
            description="Water usage is significantly higher than your average consumption. This could indicate a leak or increased household activity."
            recommendation="Check for running toilets, dripping faucets, or other potential leaks. Consider scheduling a plumbing inspection."
            impact="+$42.00"
          />

          {/* Electrical Meter Alert Card */}
          <AnomalyCard
            type="Main Electrical Meter"
            id="ANOM-002"
            date="Jan 25-27, 2024"
            severity="MEDIUM"
            status="Investigating"
            issue="Spike"
            percentage="+80.0%"
            value="45 kWh"
            vs="vs 25 avg"
            color="orange"
            description="Unusual 3-day spike in electricity usage detected. Usage returned to normal levels after Jan 27."
            recommendation="Review activities during Jan 25-27. Check if any high-power appliances were used during this period."
            impact="+$8.00"
          />
        </TabsContent>

        {/* --- USAGE TRENDS TAB --- */}
        <TabsContent value="trends" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-bold">
                Weekly Usage Trends
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyTrends}>
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
                  <Tooltip
                    contentStyle={{
                      borderRadius: "8px",
                      border: "none",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="electricity"
                    stroke="#f97316"
                    strokeWidth={2}
                    dot={{ r: 4, fill: "#fff", strokeWidth: 2 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="water"
                    stroke="#a855f7"
                    strokeWidth={2}
                    dot={{ r: 4, fill: "#fff", strokeWidth: 2 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="gas"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ r: 4, fill: "#fff", strokeWidth: 2 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="internet"
                    stroke="#22c55e"
                    strokeWidth={2}
                    dot={{ r: 4, fill: "#fff", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-bold">
                Current vs Average Usage
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#f0f0f0"
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip />
                  <Bar
                    dataKey="current"
                    fill="#ef4444"
                    radius={[4, 4, 0, 0]}
                    barSize={40}
                  />
                  <Bar
                    dataKey="average"
                    fill="#22c55e"
                    radius={[4, 4, 0, 0]}
                    barSize={40}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* --- DISPUTES TAB --- */}
        <TabsContent value="disputes" className="space-y-6 mt-6">
          <Card className="border-none shadow-none bg-transparent">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-slate-800">
                  Water Meter Dispute
                </h3>
                <p className="text-xs text-slate-500">Disputed on 1/18/2024</p>
              </div>
              <Badge className="bg-purple-100 text-purple-600 hover:bg-purple-100">
                Under Review
              </Badge>
            </div>

            <div className="bg-orange-50/50 border border-orange-100 rounded-lg p-4 mb-6">
              <p className="text-sm font-bold text-slate-800 mb-1">
                Original Alert
              </p>
              <p className="text-sm text-slate-600">
                Potential leak detected based on continuous water flow during
                night hours when no usage should occur.
              </p>
              <p className="text-xs text-slate-400 mt-2">
                Usage: 200 gallons | Increase: +135.3% | Cost: +$65.00
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-sm font-bold text-slate-800">
                Supporting Evidence
              </p>
              <EvidenceCard
                icon={<Camera className="text-slate-500" />}
                name="water_meter_reading.jpg"
                size="2.3 MB"
                date="1/18/2024"
                subtext="Photo of actual water meter reading showing lower consumption"
              />
              <EvidenceCard
                icon={<FileText className="text-slate-500" />}
                name="plumber_inspection_report.pdf"
                size="2.3 MB"
                date="1/18/2024"
                subtext="Professional plumber inspection report confirming no leaks"
              />
            </div>
            <p className="text-xs text-slate-400 mt-6 italic">
              Awaiting review by property management
            </p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// --- Helper Components ---

function StatCard({ icon, label, value }: any) {
  return (
    <Card className="bg-white">
      <CardContent className="p-6 flex items-center gap-4">
        <div className="p-2 bg-slate-50 rounded-lg">{icon}</div>
        <div>
          <p className="text-xs text-slate-500 font-medium">{label}</p>
          <p className="text-2xl font-bold text-slate-900">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function AnomalyCard({
  type,
  id,
  date,
  severity,
  status,
  issue,
  percentage,
  value,
  vs,
  color,
  description,
  recommendation,
  impact,
}: any) {
  const isBlue = color === "blue";
  return (
    <Card
      className={`border-2 ${
        isBlue ? "border-blue-400" : "border-orange-200"
      }`}>
      <CardContent className="p-0">
        <div className="p-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div
              className={`p-2 rounded ${
                isBlue
                  ? "bg-blue-50 text-blue-500"
                  : "bg-orange-50 text-orange-500"
              }`}>
              <TrendingUp size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-800">{type}</span>
                <Badge
                  variant="secondary"
                  className="text-[10px] h-4 px-1 uppercase">
                  {severity}
                </Badge>
              </div>
              <p className="text-[10px] text-slate-400">
                {id} • {date}
              </p>
            </div>
          </div>
          <Badge
            className={
              status === "Active"
                ? "bg-red-100 text-red-600"
                : "bg-orange-100 text-orange-600"
            }>
            {status}
          </Badge>
        </div>

        <div
          className={`mx-4 p-4 rounded-lg flex justify-between items-center ${
            isBlue ? "bg-blue-50" : "bg-orange-50"
          }`}>
          <div className="flex items-center gap-3">
            <TrendingUp
              className={isBlue ? "text-blue-500" : "text-orange-500"}
              size={20}
            />
            <div>
              <p
                className={`font-bold ${
                  isBlue ? "text-blue-700" : "text-orange-700"
                }`}>
                {issue}
              </p>
              <p className="text-xs text-slate-500">
                {percentage} from average
              </p>
            </div>
          </div>
          <div className="text-right">
            <p
              className={`font-bold text-lg ${
                isBlue ? "text-blue-700" : "text-orange-700"
              }`}>
              {value}
            </p>
            <p className="text-[10px] text-slate-400 uppercase">{vs}</p>
          </div>
        </div>

        <div className="px-4 py-3 space-y-4">
          <p className="text-xs text-blue-600 leading-relaxed">{description}</p>
          <div
            className={`p-4 rounded-lg border flex gap-3 ${
              isBlue
                ? "bg-blue-50/30 border-blue-100"
                : "bg-orange-50/30 border-orange-100"
            }`}>
            <AlertTriangle size={16} className="shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-slate-800">
                Recommendation:
              </p>
              <p className="text-xs text-slate-600 mt-1">{recommendation}</p>
            </div>
          </div>
          <div
            className={`p-4 rounded-lg border flex justify-between items-center ${
              isBlue
                ? "bg-blue-50/30 border-blue-100"
                : "bg-orange-50/30 border-orange-100"
            }`}>
            <span className="text-xs text-slate-500">
              Estimated Cost Impact
            </span>
            <span
              className={`font-bold ${
                isBlue ? "text-blue-600" : "text-orange-600"
              }`}>
              {impact}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 border-t">
          <Button
            variant="ghost"
            className="rounded-none border-r py-6 gap-2 text-slate-600">
            {" "}
            <Eye size={16} /> View Details{" "}
          </Button>
          <Button
            variant="ghost"
            className="rounded-none py-6 gap-2 text-slate-600">
            {" "}
            <MessageSquare size={16} /> Dispute{" "}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function EvidenceCard({ icon, name, size, date, subtext }: any) {
  return (
    <div className="border rounded-lg p-4 flex justify-between items-center bg-white group hover:border-blue-400 transition-colors">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-slate-50 rounded-lg">{icon}</div>
        <div>
          <p className="text-sm font-bold text-slate-800">{name}</p>
          <p className="text-xs text-slate-500 mt-0.5">{subtext}</p>
          <p className="text-[10px] text-slate-400 mt-1">
            {size} • {date}
          </p>
        </div>
      </div>
      <Button variant="ghost" size="icon">
        <Eye size={16} className="text-slate-400" />
      </Button>
    </div>
  );
}
