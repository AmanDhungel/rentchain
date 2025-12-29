import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2, MapPin, User } from "lucide-react";

export function ParkingSpotsTab() {
  const spots = [
    {
      id: "P1-A-001",
      type: "Covered",
      tenant: "Tom Wilson",
      unit: "101-A",
      cost: 150,
      price: 200,
      profit: 50,
      status: "Subleased",
      color: "text-green-600",
    },
    {
      id: "P1-A-001",
      type: "Covered",
      tenant: "Jane Doe",
      unit: "102-A",
      cost: 150,
      price: 180,
      profit: 30,
      status: "Overdue",
      color: "text-red-600",
    },
    {
      id: "P1-A-001",
      type: "Uncovered",
      status: "Available",
      cost: 50,
      price: 75,
      profit: null,
    },
  ];

  return (
    <div className="space-y-4">
      {spots.map((spot, idx) => (
        <Card key={idx} className="border-l-4 border-l-green-500">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-50 rounded">
                  <MapPin size={18} className="text-green-600" />
                </div>
                <div>
                  <h4 className="font-bold">{spot.id}</h4>
                  <p className="text-xs text-muted-foreground">
                    Level 1, Section A
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Badge variant="outline" className="bg-green-50">
                  {spot.status}
                </Badge>
                <Badge variant="outline">{spot.type}</Badge>
                <Edit2
                  size={16}
                  className="text-muted-foreground cursor-pointer ml-2"
                />
                <Trash2 size={16} className="text-red-400 cursor-pointer" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="p-2 border rounded text-center">
                <p className="text-[10px] uppercase text-muted-foreground">
                  Your Cost
                </p>
                <p className="font-bold text-red-500">${spot.cost}</p>
              </div>
              <div className="p-2 border rounded text-center">
                <p className="text-[10px] uppercase text-muted-foreground">
                  Sublease Price
                </p>
                <p className="font-bold text-green-600">${spot.price}</p>
              </div>
              <div className="p-2 border rounded text-center">
                <p className="text-[10px] uppercase text-muted-foreground">
                  Profit
                </p>
                <p className="font-bold text-blue-600">
                  {spot.profit ? `$${spot.profit}` : "-"}
                </p>
              </div>
            </div>

            {spot.tenant && (
              <div className="flex items-center justify-between border-t pt-3 mt-3 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
                    <User size={14} />
                  </div>
                  <div>
                    <p className="font-semibold">
                      {spot.tenant}{" "}
                      <Badge
                        className="text-[10px] h-4 ml-2"
                        variant={
                          spot.status === "Overdue"
                            ? "destructive"
                            : "secondary"
                        }>
                        {spot.status === "Overdue" ? "Overdue" : "Current"}
                      </Badge>
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      Unit {spot.unit}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-medium">Monthly: ${spot.price}</p>
                  <p className="text-[10px] text-muted-foreground">
                    Next Due: 11/1/2024
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
