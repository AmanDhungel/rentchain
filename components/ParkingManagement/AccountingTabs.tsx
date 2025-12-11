import { InfoCard, ProgressBarItem } from "./ParkingSharedComponent";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DollarSign,
  Clock,
  AlertTriangle,
  List,
  Eye,
  Zap,
  ArrowRight,
  Download,
  Plus,
} from "lucide-react";

// Component for a single Transaction Record
function TransactionRecord({
  record,
}: {
  record: {
    status: string;
    total: number;
    labels: { label: React.ReactNode | any }[];
    user: string;
    role: string;
    location: string;
    approach: string;
    isAdvanceRequired: boolean;
    spaceId: string;
    spaceType: string;
    period: string;
    periodType: string;
    id: string;
    type: string;
    invoiceId: string;
    paymentMethod: string;
    paymentDate: Date | string;
    paymentStatus: string;
    totalUnits: number;
    dueDate: Date | string;
    base: number;
    tax: number;
    discount: number;
    txnId: number;
  };
}) {
  const totalColor =
    record.status === "Overdue"
      ? "text-red-500"
      : record.status === "Pending"
      ? "text-yellow-500"
      : "text-blue-500";
  const statusColor =
    record.status === "Completed"
      ? "bg-green-500"
      : record.status === "Active"
      ? "bg-blue-500"
      : record.status === "Pending"
      ? "bg-yellow-500"
      : "bg-red-500";
  const totalValue =
    record.status === "Overdue" ? record.total.toFixed(2) : record.total;

  return (
    <Card className="mb-4">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-sm font-bold bg-green-100 p-1 rounded text-green-700">
                {record.invoiceId}
              </span>
              {record.labels.map((label, i) => (
                <Badge
                  key={i}
                  variant="secondary"
                  className="bg-gray-100 text-gray-600">
                  {label}
                </Badge>
              ))}
            </div>
            <p className="text-base font-medium">
              {record.user} &bull; {record.role} &bull; {record.location}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Eye className="h-4 w-4 text-gray-500 cursor-pointer" />
            <ArrowRight className="h-4 w-4 text-gray-500 cursor-pointer" />
          </div>
        </div>

        <div className="grid grid-cols-5 md:grid-cols-5 gap-4 mt-4 text-sm font-medium border-y py-4 my-4">
          <div className="space-y-1">
            <p className="text-gray-500">Payment Approach</p>
            <p className="font-bold">{record.approach}</p>
            {record.isAdvanceRequired && (
              <p className="text-xs text-blue-500 flex items-center">
                <Zap className="h-3 w-3 mr-1" /> Advance Required
              </p>
            )}
          </div>
          <div className="space-y-1">
            <p className="text-gray-500">Space</p>
            <p className="font-bold">{record.spaceId}</p>
            <p className="text-xs text-gray-400">{record.spaceType}</p>
          </div>
          <div className="space-y-1">
            <p className="text-gray-500">Period</p>
            <p className="font-bold">{record.period}</p>
            <p className="text-xs text-gray-400">{record.periodType}</p>
          </div>
          <div className="space-y-1">
            <p className="text-gray-500">Payment Method</p>
            <p className="font-bold">{record.paymentMethod}</p>
            <p className="text-xs text-gray-400">{record.paymentDate}</p>
          </div>
          <div className="space-y-1 text-right">
            <p className="text-gray-500">Total</p>
            <p className={`text-lg font-bold ${totalColor}`}>
              {record.totalUnit} {totalValue}
            </p>
            <Badge className={`${statusColor} text-white`}>
              {record.status}
            </Badge>
          </div>
        </div>

        <div className="flex justify-between items-center text-sm">
          <p className="text-gray-500">
            Due:{" "}
            <span className={record.status === "Overdue" ? "text-red-500" : ""}>
              {record.dueDate}
            </span>
          </p>
          <div className="flex space-x-4">
            <p>
              Base:{" "}
              <span className="font-bold">AED {record.base.toFixed(0)}</span>
            </p>
            <p>
              Tax:{" "}
              <span className="font-bold text-green-600">
                {record.tax >= 0 ? "+" : ""}
                {record.tax}
              </span>
            </p>
            <p>
              Discount:{" "}
              <span className="font-bold text-red-600">{record.discount}</span>
            </p>
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-2">TXN: {record.txnId}</p>
      </CardContent>
    </Card>
  );
}

export default function AccountingTab() {
  const revenueData = [
    { label: "Hourly", value: "AED 251.25", percentage: "1.1%", progress: 5 },
    { label: "Daily", value: "AED 84", percentage: "0.4%", progress: 5 },
    { label: "Weekly", value: "AED 332.5", percentage: "1.4%", progress: 5 },
    { label: "Monthly", value: "AED 1,020", percentage: "4.3%", progress: 15 },
    {
      label: "Quarterly",
      value: "AED 5,225",
      percentage: "22.1%",
      progress: 50,
    },
    {
      label: "Yearly",
      value: "AED 17,000",
      percentage: "72.0%",
      progress: 100,
    },
  ];

  const transactionRecords = [
    {
      invoiceId: "INV-2024-11-001",
      labels: ["Payment", "Monthly"],
      user: "Ahmed Hassan",
      role: "Tenant",
      location: "Plaza Tower Parking",
      approach: "Subscription",
      isAdvanceRequired: true,
      spaceId: "L1-VIP-001",
      spaceType: "Standard",
      period: "Nov 1 - Feb 1",
      periodType: "Monthly",
      paymentMethod: "Bank-Transfer",
      paymentDate: "11/1/2024",
      totalUnit: "Total",
      total: 5225,
      status: "Completed",
      dueDate: "11/15/2024",
      base: 5500,
      tax: 275,
      discount: -550,
      txnId: "BT-2024-Q4-555",
    },
    {
      invoiceId: "INV-2024-11-004",
      labels: ["Payment", "Weekly"],
      user: "John Smith",
      role: "Visitor",
      location: "Plaza Tower Parking",
      approach: "Prepaid-Package",
      isAdvanceRequired: true,
      spaceId: "L3-C-022",
      spaceType: "Weekly",
      period: "Nov 10 - Nov 17",
      periodType: "Weekly",
      paymentMethod: "Digital-Wallet",
      paymentDate: "11/10/2024",
      totalUnit: "Total",
      total: 332.5,
      status: "Active",
      dueDate: "11/15/2024",
      base: 350,
      tax: 17.5,
      discount: -35,
      txnId: "CC-2024-11-888",
    },
    {
      invoiceId: "INV-2024-11-005",
      labels: ["Payment", "Daily", "Spot Booking"],
      user: "Maria Garcia",
      role: "Visitor",
      location: "Plaza Tower Parking",
      approach: "Post-Paid",
      isAdvanceRequired: false,
      spaceId: "L2-A-033",
      spaceType: "Compact",
      period: "Nov 10 - Nov 17",
      periodType: "Daily",
      paymentMethod: "Credit-Card",
      paymentDate: "N/A",
      totalUnit: "Total",
      total: 84,
      status: "Pending",
      dueDate: "11/15/2024",
      base: 80,
      tax: 4,
      discount: 0,
      txnId: "CC-2024-11-888",
    },
  ];

  return (
    <div className="space-y-6 p-4">
      {/* Top Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <InfoCard
          icon={DollarSign}
          title="Total Revenue"
          value="23,624.75"
          unit="AED"
          color="text-green-500"
        />
        <InfoCard
          icon={Clock}
          title="Pending Payments"
          value="288"
          unit="AED"
          color="text-orange-500"
        />
        <InfoCard
          icon={AlertTriangle}
          title="Overdue"
          value="84"
          unit="AED"
          color="text-red-500"
        />
        <InfoCard
          icon={List}
          title="Transactions"
          value="7"
          color="text-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Revenue by Duration Type Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">
              Revenue by Duration Type
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {revenueData.map((item, index) => (
              <ProgressBarItem
                key={index}
                label={item.label}
                value={item.value}
                percentage={item.percentage}
                progressValue={item.progress}
              />
            ))}
          </CardContent>
        </Card>

        {/* Payment Approach Distribution Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">
              Payment Approach Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {[
              "Instant",
              "Booking-Deposit",
              "Subscription",
              "Prepaid-Package",
              "Post-Paid",
            ].map((item, index) => (
              <ProgressBarItem
                key={index}
                label={item}
                value="2"
                percentage="33%"
                progressValue={33}
              />
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Transaction Records */}
      <section>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold">Transaction Records</h2>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              className="flex items-center text-sm text-gray-700">
              <Download className="mr-2 h-4 w-4" /> Export Reports
            </Button>
            <Button className="bg-orange-500 hover:bg-orange-600">
              <Plus className="mr-2 h-4 w-4" /> New Transaction
            </Button>
          </div>
        </div>

        {transactionRecords.map((record, index) => (
          <TransactionRecord key={index} record={record} />
        ))}
      </section>
    </div>
  );
}
