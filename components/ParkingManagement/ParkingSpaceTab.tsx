import { Eye, Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SearchFilterBar } from "./ParkingSharedComponent";

export default function ParkingSpacesTab() {
  return (
    <div className="space-y-4 p-4">
      <SearchFilterBar />

      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-3">
              <span className="text-2xl font-bold bg-gray-200 p-2 rounded">
                P
              </span>
              <div>
                <h3 className="text-lg font-bold">L1-A-001</h3>
                <p className="text-sm text-gray-500">Plaza Tower Parking</p>
              </div>
            </div>
            <Badge className="bg-red-500 text-white hover:bg-red-600">
              Occupied
            </Badge>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 text-sm">
            <div className="space-y-1">
              <p className="text-gray-500">Type:</p>
              <p className="font-medium">Standard</p>
            </div>
            <div className="space-y-1">
              <p className="text-gray-500">Level:</p>
              <p className="font-medium">L1 - Zone A</p>
            </div>
            <div className="space-y-1">
              <p className="text-gray-500">Size:</p>
              <p className="font-medium">5.5m &times; 2.5m</p>
            </div>
            <div className="space-y-1">
              <p className="text-gray-500">Rate:</p>
              <p className="font-medium">AED 1,200/monthly</p>
            </div>
          </div>

          <div className="flex justify-between items-center mt-6 pt-4 border-t">
            <div>
              <p className="text-gray-500 text-sm">Assigned:</p>
              <p className="font-medium text-orange-500">Tenant-Assigned</p>
              <div className="flex space-x-2 mt-2">
                <Badge variant="outline">Covered</Badge>
                <Badge variant="outline">Electric Outlet</Badge>
              </div>
            </div>
            <div className="flex space-x-3">
              <Eye className="h-5 w-5 text-gray-500 cursor-pointer" />
              <Pencil className="h-5 w-5 text-gray-500 cursor-pointer" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
