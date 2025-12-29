import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock } from "lucide-react";

export function PaymentsTab() {
  const transactions = [
    {
      name: "John Smith",
      spot: "P1-A-001",
      id: "PMT-001",
      date: "12/1/2024",
      amount: 200,
      status: "Completed",
      method: "Bank",
    },
    {
      name: "Jane Doe",
      spot: "P1-A-002",
      id: "PMT-002",
      date: "12/1/2024",
      amount: 200,
      status: "Completed",
      method: "Card",
    },
    {
      name: "John Smith",
      spot: "P1-A-001",
      id: "PMT-004",
      date: "12/1/2024",
      amount: 280,
      status: "Pending",
      method: "Bank",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-green-50 border-green-100">
          <CardContent className="pt-6">
            <p className="text-green-600 font-bold flex items-center gap-2">
              <CheckCircle2 size={16} /> Total Collected
            </p>
            <p className="text-3xl font-bold text-green-700">$660</p>
            <p className="text-xs text-green-600/70">From sublease payments</p>
          </CardContent>
        </Card>
        <Card className="bg-red-50 border-red-100">
          <CardContent className="pt-6">
            <p className="text-red-600 font-bold flex items-center gap-2">
              <Clock size={16} /> Overdue
            </p>
            <p className="text-3xl font-bold text-red-700">1</p>
            <p className="text-xs text-red-600/70">Payments pending</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-sm">Payment Transactions</h3>
        {transactions.map((tx, idx) => (
          <Card key={idx}>
            <CardContent className="pt-6 flex justify-between items-center">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <p className="font-bold text-sm">{tx.name}</p>
                  <Badge
                    variant="secondary"
                    className={
                      tx.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-orange-100 text-orange-700"
                    }>
                    {tx.status}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{tx.spot}</p>
                <div className="grid grid-cols-2 gap-8 pt-2">
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase">
                      Transaction ID
                    </p>
                    <p className="text-xs font-bold">{tx.id}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase">
                      Date
                    </p>
                    <p className="text-xs font-bold">{tx.date}</p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold">${tx.amount}</p>
                <p className="text-[10px] text-muted-foreground uppercase">
                  {tx.method}
                </p>
                <p className="text-xs font-bold mt-2">Rent</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
