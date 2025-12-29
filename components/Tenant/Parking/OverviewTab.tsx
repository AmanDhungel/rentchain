import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react";

export function OverviewTab() {
  const analysis = [
    {
      id: "P1-A-001",
      cost: 150,
      charge: 200,
      profit: 50,
      margin: "33.3%",
      status: "Subleased",
    },
    {
      id: "P1-A-002",
      cost: 150,
      charge: 180,
      profit: 30,
      margin: "20.0%",
      status: "Subleased",
    },
    { id: "P1-B-015", cost: 50, status: "Not Subleased" },
    {
      id: "P2-A-008",
      cost: 200,
      charge: 200,
      profit: 50,
      margin: "33.3%",
      status: "Subleased",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm font-medium text-blue-600 flex items-center gap-2">
              Total Spots
            </p>
            <p className="text-3xl font-bold">6</p>
            <p className="text-xs text-muted-foreground">
              3 subleased • 3 available
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm font-medium text-green-600">Monthly Profit</p>
            <p className="text-3xl font-bold text-red-500">$-140</p>
            <p className="text-xs text-muted-foreground">-17.5% margin</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-bold">
            Financial Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <TrendingDown className="text-red-500" size={16} />{" "}
              <span>Cost to Landlord</span>
            </div>
            <span className="font-bold text-red-500">$800</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <TrendingUp className="text-green-500" size={16} />{" "}
              <span>Revenue from Subleases</span>
            </div>
            <span className="font-bold text-green-500">$660</span>
          </div>
          <div className="border-t pt-4 flex justify-between items-center bg-blue-50/50 p-2 rounded">
            <div className="flex items-center gap-2">
              <DollarSign className="text-blue-600" size={16} />{" "}
              <span className="font-bold">Net Monthly Profit</span>
            </div>
            <span className="font-bold text-blue-600">$-140</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-bold">
            Spot-by-Spot Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {analysis.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b pb-2 last:border-0">
              <div>
                <p className="font-bold text-sm">{item.id}</p>
                <p className="text-[10px] text-muted-foreground">
                  Cost: ${item.cost}{" "}
                  {item.charge && `• Charge: $${item.charge}`}
                </p>
              </div>
              {item.status === "Subleased" ? (
                <div className="text-right">
                  <p className="text-green-600 font-bold text-sm">
                    +${item.profit}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    {item.margin}
                  </p>
                </div>
              ) : (
                <Badge
                  variant="secondary"
                  className="bg-orange-100 text-orange-600 text-[10px]">
                  Not Subleased
                </Badge>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
