import {
  RotateCw,
  AlertTriangle,
  Download,
  Eye,
  X,
  CheckCircle,
  SquareParking,
  DoorClosed,
  RefreshCw,
  TextAlignStart,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  InfoCard,
  SearchFilterBar,
  ProgressBarItem,
} from "./ParkingSharedComponent";

function LogEntry({ entry }: { entry: any }) {
  const isParked = entry.status === "Parked";
  const isOversayed = entry.status === "Overstayed";
  const statusColor = isParked
    ? "text-white"
    : isOversayed
    ? "text-white"
    : "text-gray-500";
  const statusBg = isParked
    ? "bg-slate-700"
    : isOversayed
    ? "bg-red-500"
    : "bg-white border border-gray-200";
  const paidColor =
    entry.paidStatus === "Paid"
      ? "bg-slate-700"
      : entry.paidStatus === "Unpaid"
      ? "bg-red-500"
      : "bg-yellow-500";

  return (
    <Card className="mb-4">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold">{entry.plate}</span>
              <Badge variant="outline" className="bg-gray-100 text-gray-600">
                {entry.type}
              </Badge>
              {entry.isRecurring && (
                <Badge className="bg-orange-100 text-orange-600">
                  <RefreshCw /> Recurring ({entry.recurringCount}x)
                </Badge>
              )}
              {isOversayed && (
                <Badge className="bg-red-500 text-white">Overstayed</Badge>
              )}
            </div>
            <p className="text-sm text-gray-500">
              {entry.carDetails} &bull; {entry.location}
            </p>
            <p className="text-base font-medium">{entry.user}</p>
            <p className="text-sm text-gray-500">Tenant</p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className={`${statusBg} ${statusColor} rounded-sm`}>
              {entry.status}
            </Badge>
            <Eye className="h-4 w-4 text-gray-500 cursor-pointer" />
            <TextAlignStart className="border-[1.5px] h-4 w-4 border-black rounded-[3px]" />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-sm font-medium border-y py-4 my-4">
          <div className="space-y-1">
            <p className="text-gray-500">Entry Time</p>
            <p>{entry.entryTime}</p>
            <p className="text-xs text-gray-400"># QR-Code</p>
          </div>
          <div className="space-y-1">
            <p className="text-gray-500">Exit Time</p>
            <p className={!entry.exitTime ? "text-blue-500" : ""}>
              {entry.exitTime || "Still Parked"}
            </p>
            <p className="text-xs text-gray-400">
              {entry.exitTimeDetails || "Ongoing"}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-gray-500">Duration</p>
            <p className={!entry.duration ? "text-blue-500" : ""}>
              {entry.duration || "In Progress"}
            </p>
            <p className="text-xs text-gray-400">
              {entry.durationMinutes || "Calculating..."}
            </p>
          </div>
          <div className="space-y-1 text-right">
            <Badge className={`${paidColor} text-white rounded-sm`}>
              {entry.paidStatus}
            </Badge>
            <p className="text-lg font-bold">{entry.amount}</p>
            <p className="text-xs text-gray-500">{entry.paymentMethod}</p>
          </div>
        </div>

        <p className="text-sm text-gray-500">Note: {entry.note}</p>
      </CardContent>
    </Card>
  );
}

export default function LogsTab() {
  const logEntries = [
    {
      plate: "DXB-12345",
      type: "Sedan",
      isRecurring: true,
      recurringCount: 45,
      carDetails: "Toyota Camry • Silver",
      location: "Plaza Tower Parking",
      user: "Ahmed Hassan",
      status: "Parked",
      entryTime: "Nov 13, 02:00 PM",
      exitTime: null,
      exitTimeDetails: "Ongoing",
      duration: null,
      durationMinutes: "Calculating...",
      amount: "AED 0",
      paymentMethod: "via Account: TXN-2024-001",
      paidStatus: "Paid",
      note: "Regular tenant - Monthly subscription",
    },
    {
      plate: "AUH-98765",
      type: "SUV",
      isRecurring: false,
      carDetails: "BMW X5 • Black",
      location: "Plaza Tower Parking",
      user: "Sara Mohammed",
      status: "Exited",
      entryTime: "Nov 13, 03:15 PM",
      exitTime: "Nov 13, 05:30 PM",
      exitTimeDetails: "Completed",
      duration: "2h 15m",
      durationMinutes: "135 minutes",
      amount: "AED 45",
      paymentMethod: "via Card: TXN-2024-002",
      paidStatus: "Paid",
      note: "First-time visitor - Hourly payment",
    },
    {
      plate: "AJM-33221",
      type: "Luxury",
      isRecurring: false,
      carDetails: "Mercedes S-Class • Silver",
      location: "Plaza Tower Parking",
      user: "Fatima Ali",
      status: "Overstayed",
      entryTime: "Nov 12, 09:45 PM",
      exitTime: null,
      exitTimeDetails: "Ongoing",
      duration: null,
      durationMinutes: "Calculating...",
      amount: "AED 0",
      paymentMethod: "via Pending",
      paidStatus: "Unpaid",
      note: "Overstayed by 8 hours - Payment pending",
    },
  ];

  return (
    <div className="space-y-6 p-4">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <InfoCard
          icon={DoorClosed}
          title="Total Entries Today"
          value="28"
          color="text-green-500"
        />
        <InfoCard
          icon={SquareParking}
          title="Currently Parked"
          value="3"
          color="text-blue-500"
        />
        <InfoCard
          icon={DoorClosed}
          title="Exited Today"
          value="25"
          color="text-purple-500"
        />
        <InfoCard
          icon={RotateCw}
          title="Recurring Visitors"
          value="18"
          color="text-orange-500"
        />
        <InfoCard
          icon={AlertTriangle}
          title="Violations"
          value="1"
          color="text-red-500"
        />
      </div>

      <SearchFilterBar />

      <section>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold">Parking Activity Logs</h2>
          <Button
            variant="outline"
            className="flex items-center text-sm text-gray-700">
            <Download className="mr-2 h-4 w-4" /> Export Logs
          </Button>
        </div>

        {logEntries.map((entry, index) => (
          <LogEntry key={index} entry={entry} />
        ))}
      </section>

      <section className="grid grid-cols-1 md:grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">
              Parking Activity Logs
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 flex flex-col!">
            {["Sedan", "SUV", "Electric", "Motorcycle", "Luxury", "Van"].map(
              (item) => (
                <ProgressBarItem
                  key={item}
                  label={item}
                  value="2 vehicles"
                  percentage="33%"
                  progressValue={33}
                />
              )
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">
              User Type Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className=" space-y-2">
            {["Tenant", "Owner", "Visitor", "Staff", "Guest"].map((item) => (
              <ProgressBarItem
                key={item}
                label={item}
                value="2 users"
                percentage="33%"
                progressValue={33}
              />
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
