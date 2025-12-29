import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, History, Send } from "lucide-react";

const subleases = [
  {
    name: "John Smith",
    unit: "101-A",
    spot: "P1-A-001",
    status: "Current",
    cost: 150,
    sublease: 150,
    profit: 50,
    margin: "33.3%",
    start: "2/1/2024",
    end: "1/31/2025",
    nextDue: "12/1/2024",
    total: 1800,
    vehicle: { model: "Toyota Camry", color: "Silver", plate: "ABC-1234" },
  },
  {
    name: "Jane Doe",
    unit: "102-A",
    spot: "P1-A-002",
    status: "Overdue",
    cost: 150,
    sublease: 180,
    profit: 30,
    margin: "20.0%",
    start: "2/1/2024",
    end: "1/31/2025",
    nextDue: "12/1/2024",
    total: 1440,
    vehicle: { model: "Honda Civic", color: "Blue", plate: "XYZ-5678" },
  },
];

export function SubleasesTab() {
  return (
    <div className="space-y-6">
      <Card className="border-orange-200 bg-orange-50/30">
        <CardContent className="pt-6 flex justify-between items-center">
          <div>
            <p className="text-orange-600 font-semibold text-lg">
              Active Sublease Agreements
            </p>
            <p className="text-sm text-muted-foreground">
              3 of 6 spots subleased
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-orange-600">$660</p>
            <p className="text-xs text-muted-foreground uppercase">
              Monthly Revenue
            </p>
          </div>
        </CardContent>
      </Card>

      {subleases.map((lease, i) => (
        <Card key={i} className="overflow-hidden">
          <CardHeader className="flex flex-row items-center space-x-4">
            <div className="w-10 h-10 bg-green-100 rounded flex items-center justify-center text-green-600">
              <FileText size={20} />
            </div>
            <div className="flex-1">
              <CardTitle className="text-base">{lease.name}</CardTitle>
              <p className="text-xs text-muted-foreground">Unit {lease.unit}</p>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex gap-2">
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-700">
                Active
              </Badge>
              <Badge
                variant="secondary"
                className={
                  lease.status === "Overdue"
                    ? "bg-red-100 text-red-700"
                    : "bg-blue-100 text-blue-700"
                }>
                {lease.status}
              </Badge>
              <Badge variant="outline">{lease.spot}</Badge>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <StatBox label="Your Cost" value={`$${lease.cost}`} />
              <StatBox label="Sublease Price" value={`$${lease.sublease}`} />
              <StatBox
                label="Profit"
                value={`$${lease.profit}`}
                className="bg-green-50 border-green-200 text-green-700"
              />
              <StatBox
                label="Margin"
                value={lease.margin}
                className="bg-blue-50 border-blue-200 text-blue-700"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 border rounded-md">
                <p className="text-xs text-muted-foreground">Start Date</p>
                <p className="font-semibold">{lease.start}</p>
              </div>
              <div className="p-3 border rounded-md">
                <p className="text-xs text-muted-foreground">End Date</p>
                <p className="font-semibold">{lease.end}</p>
              </div>
            </div>

            <Card className="border-orange-200">
              <CardContent className="p-4 grid grid-cols-2 text-sm">
                <div>
                  <p className="text-muted-foreground font-medium">
                    Vehicle Information
                  </p>
                  <p className="font-bold">{lease.vehicle.model}</p>
                  <p className="text-xs">License: {lease.vehicle.plate}</p>
                </div>
                <div className="text-right flex flex-col justify-end">
                  <p className="text-muted-foreground">
                    Color:{" "}
                    <span className="text-foreground font-semibold">
                      {lease.vehicle.color}
                    </span>
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 gap-2">
                <FileText size={16} /> View Contract
              </Button>
              <Button variant="outline" className="flex-1 gap-2">
                <History size={16} /> Payment History
              </Button>
              {lease.status === "Overdue" && (
                <Button className="flex-1 gap-2 bg-orange-500 hover:bg-orange-600">
                  <Send size={16} /> Send Reminder
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function StatBox({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={`p-4 border rounded-lg ${className}`}>
      <p className="text-xs opacity-80">{label}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}
