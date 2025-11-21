"use client";
import React, { useState } from "react";
import {
  ArrowLeft,
  Calendar,
  Zap,
  AlertTriangle,
  Search,
  SlidersHorizontal,
  Plus,
  Target,
  Camera,
  Settings,
  ListChecks,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  Download,
  Upload,
  User,
  Gauge,
  Droplet,
  MoveLeft,
} from "lucide-react";

// Simulated Shadcn component imports
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

// --- MOCK DATA ---

// Data for the 'Meters' tab (from previous image)
const meterDetailData = {
  id: "ELC-2024-001",
  type: "Electricity Meter",
  property: "Sunset Towers",
  location: "Main electrical panel - lobby area",
  provider: "City Electric Company",
  lastReading: "15,420 kWh",
  consumption: "528 kWh",
  readingDate: "662 days ago",
  anomalyCount: 1,
  isSmart: true,
  status: "Active",
  connection: "Connected",
  lastSyncDate: "1/16/2024, 2:15:00 PM",
};

// Data for the 'Readings' tab (from image_2e67f6.png)
const recentReadings = [
  {
    id: "ELC-2024-001",
    property: "Sunset Towers",
    type: "Electricity",
    icon: Zap,
    unit: "kWh",
    current: 15420,
    consumption: 528,
    quality: 91.4,
    source: "System Auto",
    date: "1/15/2024",
    tag: "Lot",
  },
  {
    id: "WTR-2024-001",
    property: "Sunset Towers",
    type: "Water",
    icon: Droplet,
    unit: "m³",
    current: 2847,
    consumption: 55,
    quality: 91.4,
    source: "John Technician",
    date: "1/15/2024",
    tag: "Manual",
  },
  {
    id: "GAS-2024-001",
    property: "Garden View",
    type: "Gas",
    icon: Gauge,
    unit: "m³",
    current: 1256,
    consumption: 58,
    quality: 91.4,
    source: "Sarah Inspector",
    date: "1/15/2024",
    tag: "Manual",
  },
];

// Data for the 'Allocations' tab (from image_2e6817.png)
const allocationRules = [
  {
    id: "ELC-2024-001",
    type: "Electricity",
    icon: Zap,
    allocation: "Apartment 101",
    rule: "percentage - 30%",
    readBy: "System Auto",
    status: "Active",
    billingEnabled: true,
    lastBilledDate: "1/15/2024",
  },
];

// Data for the 'Anomalies' tab (from image_2e683a.png)
const detectedAnomalies = [
  {
    id: "ELC-2024-001",
    property: "Sunset Towers",
    severity: "Medium",
    description: "Consumption 25% higher than average for this period",
    expectedValue: "450 kWh",
    actualValue: "580 kWh",
    deviation: "+28.9%",
    detectedDate: "1/12/2024",
    status: "Investigating",
    assignedTo: "TECH-001",
  },
];

// --- UTILITY/STYLE COMPONENTS ---

/**
 * Renders a small status chip (like 'Active', 'Connected', 'Medium').
 */
const StatusChip = ({
  label,
  color,
}: {
  label: string;
  color: "green" | "blue" | "red" | "yellow";
}) => {
  const colorMap = {
    green: "bg-green-100 text-green-700",
    blue: "bg-blue-100 text-blue-700",
    red: "bg-red-100 text-red-700",
    yellow: "bg-yellow-100 text-yellow-700",
  };
  return (
    <span
      className={`text-xs font-semibold px-3 py-1 rounded-full ${colorMap[color]} whitespace-nowrap`}>
      {label}
    </span>
  );
};

// --- TAB CONTENT COMPONENTS ---

/**
 * Renders the 'Meters' Tab Content (List View).
 */
const MetersTab = () => (
  <TabsContent value="meters" className="mt-6 space-y-8">
    {/* Search and Filter */}
    <div className="flex justify-between items-center space-x-4">
      <div className="relative w-full max-w-lg">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input
          placeholder="Search meters..."
          className="pl-10 h-12 rounded-xl border-gray-200 shadow-sm focus-visible:ring-orange-500/50"
        />
      </div>
      <Button
        variant="outline"
        className="flex items-center space-x-2 h-10 px-4 rounded-xl text-gray-700">
        <span>Filter</span>
        <SlidersHorizontal className="h-4 w-4" />
      </Button>
    </div>

    {/* Status Cards Row */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Smart Meters Card */}
      <Card className="flex-1 p-6 rounded-xl shadow-lg border-2 border-blue-100">
        <div className="flex justify-between items-center mb-4">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500/10">
            <Zap className="h-5 w-5 text-blue-600" />
          </div>
        </div>
        <div className="text-4xl font-extrabold text-gray-900">1</div>
        <p className="text-sm font-medium text-blue-600">Smart Meters</p>
      </Card>
      {/* Anomalies Card */}
      <Card className="flex-1 p-6 rounded-xl shadow-lg border-2 border-red-100">
        <div className="flex justify-between items-center mb-4">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-red-500/10">
            <AlertTriangle className="h-5 w-5 text-red-600" />
          </div>
        </div>
        <div className="text-4xl font-extrabold text-gray-900">1</div>
        <p className="text-sm font-medium text-red-600">Anomalies</p>
      </Card>
    </div>

    {/* Detailed Meter Panel */}
    <Card className="rounded-xl shadow-lg p-6 border-gray-100">
      {/* Meter Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 flex items-center justify-center rounded-md bg-orange-500/10">
            <Zap className="h-5 w-5 text-orange-600" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              {meterDetailData.id}
            </h2>
            <p className="text-sm text-gray-500">{meterDetailData.type}</p>
          </div>
        </div>
        <div className="flex space-x-2 text-xs font-semibold">
          <StatusChip label={meterDetailData.status} color="green" />
          <StatusChip label={meterDetailData.connection} color="blue" />
        </div>
      </div>

      <Separator className="my-4" />

      <div className=" gap-x-8 gap-y-1">
        <div>
          <MeterDetailRow label="Property" value={meterDetailData.property} />
          <MeterDetailRow label="Location" value={meterDetailData.location} />
          <MeterDetailRow label="Provider" value={meterDetailData.provider} />
          <MeterDetailRow
            label="Last Reading"
            value={meterDetailData.lastReading}
          />
          <MeterDetailRow
            label="Consumption"
            value={meterDetailData.consumption}
          />
          <MeterDetailRow
            label="Reading Date"
            value={meterDetailData.readingDate}
            overdue={true}
          />
        </div>
      </div>

      <Separator className="my-4" />

      {/* Anomaly and Sync Status */}
      <div className="space-y-3">
        {/* Anomaly Detected */}
        <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded-lg flex items-center space-x-3">
          <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0" />
          <span className="text-sm font-medium text-red-800">
            <span className="font-bold">
              {meterDetailData.anomalyCount} anomaly detected
            </span>
          </span>
        </div>
        {/* Last Sync */}
        <div className="bg-green-50 border-l-4 border-green-500 p-3 rounded-lg flex items-center space-x-3">
          <Calendar className="h-5 w-5 text-green-600 flex-shrink-0" />
          <span className="text-sm font-medium text-green-800">
            Last sync:{" "}
            <span className="font-bold">{meterDetailData.lastSyncDate}</span>
          </span>
        </div>
      </div>

      <Separator className="my-4" />

      {/* Action Buttons Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <ActionButton icon={ListChecks} label="Manual Reading" />
        <ActionButton icon={Camera} label="Photo Reading" />
        <ActionButton icon={Target} label="Allocation" />
        <ActionButton icon={Settings} label="Settings" />
      </div>
    </Card>
  </TabsContent>
);

// Helper for Meters Tab Detail Row
const MeterDetailRow = ({
  label,
  value,
  overdue,
}: {
  label: string;
  value: string;
  overdue?: boolean;
}) => (
  <div className="flex justify-between py-1.5 text-sm">
    <span className="text-gray-500 font-medium">{label}</span>
    <span
      className={`font-semibold ${
        overdue
          ? "text-red-600 bg-red-100 px-2 py-0.5 rounded-full text-xs"
          : "text-gray-800"
      }`}>
      {value}
    </span>
  </div>
);

// Helper for Action Button
const ActionButton = ({
  icon: Icon,
  label,
}: {
  icon: React.ElementType;
  label: string;
}) => (
  <Button
    variant="outline"
    className="flex flex-col h-24 w-full p-2 justify-center items-center rounded-xl border-gray-200 hover:bg-gray-50 transition-colors shadow-sm">
    <Icon className="h-6 w-6 text-gray-600 mb-1" />
    <span className="text-sm font-medium text-gray-800">{label}</span>
  </Button>
);

/**
 * Renders the 'Readings' Tab Content (List of Recent Readings).
 */
const ReadingsTab = () => (
  <TabsContent value="readings" className="mt-6 space-y-6">
    {/* Actions */}
    <div className="flex justify-end space-x-3">
      <Button
        variant="outline"
        className="flex items-center space-x-2 h-10 px-4 rounded-xl text-gray-700">
        <Upload className="h-4 w-4" />
        <span>Bulk Import</span>
      </Button>
      <Button className="bg-orange-600 hover:bg-orange-700 text-white shadow-lg shadow-orange-500/30 h-10 px-4 flex items-center space-x-2">
        <Camera className="h-4 w-4" />
        <span>Photo Reading</span>
      </Button>
    </div>

    <h3 className="text-lg font-bold text-gray-800">Recent Readings</h3>

    {/* Reading List */}
    {recentReadings.map((reading) => (
      <Card
        key={reading.id}
        className="rounded-xl p-5 border-gray-100 shadow-md">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 flex items-center justify-center rounded-md bg-orange-500/10">
              <reading.icon className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-gray-900">{reading.id}</h4>
              <p className="text-sm text-gray-500">{reading.property}</p>
            </div>
          </div>
          <StatusChip
            label={reading.tag}
            color={reading.tag === "Lot" ? "blue" : "yellow"}
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          {/* Current Reading */}
          <div>
            <p className="text-gray-500">Current Reading</p>
            <p className="font-semibold text-gray-800">
              {reading.current} {reading.unit}
            </p>
          </div>
          {/* Consumption */}
          <div>
            <p className="text-gray-500">Consumption</p>
            <p className="font-semibold text-gray-800">
              {reading.consumption} {reading.unit}
            </p>
          </div>
          {/* Quality Score */}
          <div>
            <p className="text-gray-500">Quality Score</p>
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-gray-800">
                {reading.quality}%
              </span>
              {/* Simple progress bar mock */}
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-orange-500 rounded-full h-2"
                  style={{ width: `${reading.quality}%` }}></div>
              </div>
            </div>
          </div>
          {/* Date */}
          <div className="text-right">
            <p className="text-gray-500">Date</p>
            <p className="font-semibold text-gray-800">{reading.date}</p>
          </div>
        </div>

        <div className="mt-2 text-sm text-gray-600">
          <span className="text-gray-500">Read by:</span> {reading.source}
        </div>
      </Card>
    ))}
  </TabsContent>
);

/**
 * Renders the 'Allocations' Tab Content (Allocation Rules).
 */
const AllocationsTab = () => (
  <TabsContent value="allocations" className="mt-6 space-y-6">
    {/* Actions */}
    <div className="flex justify-end">
      <Button className="bg-orange-600 hover:bg-orange-700 text-white shadow-lg shadow-orange-500/30 h-10 px-4 flex items-center space-x-2">
        <Target className="h-4 w-4" />
        <span>Auto Allocate</span>
      </Button>
    </div>

    <h3 className="text-lg font-bold text-gray-800">Allocation Rules</h3>

    {/* Allocation List */}
    {allocationRules.map((rule) => (
      <Card key={rule.id} className="rounded-xl p-5 border-gray-100 shadow-md">
        <div className="flex justify-between items-start">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 flex items-center justify-center rounded-md bg-orange-500/10 flex-shrink-0">
              <rule.icon className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-gray-900">{rule.id}</h4>
              <p className="text-sm text-gray-600 mt-1">{rule.allocation}</p>
              <p className="text-base font-semibold text-gray-800">
                {rule.rule}
              </p>
              <p className="text-sm text-gray-500">Read by: {rule.readBy}</p>
            </div>
          </div>

          <div className="text-right space-y-1">
            <StatusChip label={rule.status} color="green" />
            <p className="text-sm text-gray-600 font-medium">
              Auto-billing enabled
            </p>
            <p className="text-sm text-gray-500">1/15/2024</p>
          </div>
        </div>
      </Card>
    ))}
  </TabsContent>
);

/**
 * Renders the 'Anomalies' Tab Content (Detected Anomalies).
 */
const AnomaliesTab = () => (
  <TabsContent value="anomalies" className="mt-6 space-y-6">
    {/* Actions */}
    <div className="flex justify-end">
      <Button
        variant="outline"
        className="flex items-center space-x-2 h-10 px-4 rounded-xl text-gray-700">
        <Settings className="h-4 w-4" />
        <span>Detection Settings</span>
      </Button>
    </div>

    <h3 className="text-lg font-bold text-gray-800">Detected Anomalies</h3>

    {/* Anomaly Card */}
    {detectedAnomalies.map((anomaly) => (
      <Card
        key={anomaly.id}
        className="rounded-xl p-5 border-gray-100 shadow-md">
        <div className="flex justify-between items-start">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-6 w-6 text-red-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-base font-semibold text-red-700">
                {anomaly.description}
              </p>
              <p className="text-sm text-gray-500">
                {anomaly.id} &bull; {anomaly.property}
              </p>
            </div>
          </div>

          <StatusChip label={anomaly.severity} color="yellow" />
        </div>

        <Separator className="my-4" />

        <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
          {/* Left Column */}
          <div>
            <p className="text-gray-500">Expected Value</p>
            <p className="text-lg font-bold text-gray-800">
              {anomaly.expectedValue}
            </p>
          </div>
          {/* Right Column */}
          <div className="text-right">
            <p className="text-gray-500">Actual Value</p>
            <p className="text-lg font-bold text-gray-800">
              {anomaly.actualValue}
            </p>
          </div>

          {/* Deviation */}
          <div>
            <p className="text-gray-500">Deviation</p>
            <p className="flex items-center text-red-500 font-bold">
              <TrendingUp className="h-4 w-4 mr-1" />
              {anomaly.deviation}
            </p>
          </div>

          {/* Status */}
          <div className="text-right">
            <p className="text-gray-500">Status</p>
            <p className="text-blue-600 font-bold">{anomaly.status}</p>
          </div>

          {/* Detected Date */}
          <div>
            <p className="text-gray-500">Detected:</p>
            <p className="font-semibold text-gray-800">
              {anomaly.detectedDate}
            </p>
          </div>

          {/* Assigned To */}
          <div className="text-right">
            <p className="text-gray-500">Assigned to:</p>
            <p className="flex justify-end items-center font-semibold text-gray-800">
              <User className="h-4 w-4 mr-1 text-gray-500" />
              {anomaly.assignedTo}
            </p>
          </div>
        </div>
      </Card>
    ))}
  </TabsContent>
);

const MetersAndBillingDashboard = () => {
  const [activeTab, setActiveTab] = useState("meters");

  return (
    <div className="min-h-screen w-full -ml-4 font-sans">
      <header className="bg-white p-4   top-0 z-10">
        <div className=" mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <MoveLeft className="h-5 w-5 text-gray-500 cursor-pointer" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Meters & Billing
              </h1>
              <p className="text-sm text-gray-500">3 meters</p>
            </div>
          </div>
          <div className="flex items-center text-center space-x-3">
            <Link
              href={"/utilities/metersandbilling/utilityprovider"}
              className="text-sm font-medium text-gray-700 h-10 p-2  mt-a text-center rounded-xl">
              Providers
            </Link>
            <Button className="bg-orange-600 hover:bg-orange-700 text-white shadow-lg shadow-orange-500/30 h-10 px-4 flex items-center space-x-2 rounded-xl">
              <Plus className="h-4 w-4" />
              <span>Add Meter</span>
            </Button>
          </div>
        </div>
      </header>

      <main className=" mx-auto p-4 pl-0 md:pl-0 md:p-8">
        {/* 2. Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-transparent h-auto w-full p-0 justify-start border-b border-gray-200">
            <TabsTrigger
              value="meters"
              className="text-base font-semibold data-[state=active]:text-orange-600 data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-b-orange-600 data-[state=active]:bg-transparent py-3 px-6 transition-all rounded-none text-gray-600">
              Meters
            </TabsTrigger>
            <TabsTrigger
              value="readings"
              className="text-base font-semibold data-[state=active]:text-orange-600 data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-b-orange-600 data-[state=active]:bg-transparent py-3 px-6 transition-all rounded-none text-gray-600">
              Readings
            </TabsTrigger>
            <TabsTrigger
              value="allocations"
              className="text-base font-semibold data-[state=active]:text-orange-600 data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-b-orange-600 data-[state=active]:bg-transparent py-3 px-6 transition-all rounded-none text-gray-600">
              Allocations
            </TabsTrigger>
            <TabsTrigger
              value="anomalies"
              className="text-base font-semibold data-[state=active]:text-orange-600 data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-b-orange-600 data-[state=active]:bg-transparent py-3 px-6 transition-all rounded-none text-gray-600">
              Anomalies
            </TabsTrigger>
          </TabsList>

          {/* 3. Tab Content */}
          <MetersTab />
          <ReadingsTab />
          <AllocationsTab />
          <AnomaliesTab />
        </Tabs>
      </main>
    </div>
  );
};

export default MetersAndBillingDashboard;
