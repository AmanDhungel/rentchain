import { Bus, Eye, Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SearchFilterBar } from "./ParkingSharedComponent";

export default function ReservationsTab() {
  return (
    <div className="space-y-4 p-4">
      <SearchFilterBar />

      <h2 className="text-lg font-semibold">Active Reservations</h2>

      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <Bus className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <h3 className="text-lg font-bold">
                  L1-A-001 - Plaza Tower Parking
                </h3>
                <p className="text-sm text-gray-500">
                  Tenant: tenant_123 &bull; ABC123 &bull; Toyota Camry
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className="bg-green-500 text-white hover:bg-green-600">
                Active
              </Badge>
              <Badge className="bg-blue-500 text-white hover:bg-blue-600">
                Paid
              </Badge>
              <Eye className="h-5 w-5 text-gray-500 cursor-pointer" />
              <Pencil className="h-5 w-5 text-gray-500 cursor-pointer" />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm font-medium">
            <div className="space-y-1">
              <p className="text-gray-500">Start Time</p>
              <p>1/20/2024, 1:45:00 PM</p>
            </div>
            <div className="space-y-1">
              <p className="text-gray-500">End Time</p>
              <p>1/20/2024, 11:45:00 PM</p>
            </div>
            <div className="space-y-1">
              <p className="text-gray-500">Amount</p>
              <p>AED 50</p>
            </div>
            <div className="space-y-1">
              <p className="text-gray-500">Duration</p>
              <p className="text-lg font-bold text-orange-500">10h</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
