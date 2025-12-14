import {
  Zap,
  Bus,
  DollarSign,
  TrendingUp,
  Plus,
  Eye,
  Pencil,
  Settings,
  Building,
  Gauge,
  Car,
  UserCheck,
} from "lucide-react";
import Image from "next/image";
import { icons } from "@/assets/icons/exports";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { InfoCard } from "./ParkingSharedComponent";

export default function OverviewTab() {
  return (
    <div className="space-y-6 p-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <InfoCard
          icon={Building}
          title="Total Spaces"
          value="370"
          color="text-blue-500"
        />
        <InfoCard
          icon={Gauge}
          title="Occupancy Rate"
          value="71.6"
          unit="%"
          color="text-green-500"
        />
        <InfoCard
          icon={DollarSign}
          title="Monthly Revenue"
          value="45,620"
          unit="AED"
          color="text-purple-500"
        />
        <InfoCard
          icon={TrendingUp}
          title="Growth"
          value="+12.5"
          unit="%"
          color="text-green-500"
        />
      </div>

      <section>
        <h2 className="text-lg font-semibold mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Add Facility", icon: Building },
            { label: "Configure Spaces", icon: Car },
            { label: "Assign Spaces", icon: UserCheck },
            { label: "Settings", icon: Settings },
          ].map((action, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="flex flex-row items-center justify-center p-6">
                <action.icon className="h-6 w-6 mr-4 text-gray-600" />
                <p className="text-xl font-medium">{action.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold">Parking Facilities</h2>
          <Button className="bg-orange-500 hover:bg-orange-600">
            <Image
              src={icons.RoundedPlusIcon}
              alt="RoundedIcon"
              className="mr-2 h-4 w-4"
            />{" "}
            Add Facility
          </Button>
        </div>

        {[
          {
            name: "Plaza Tower Parking",
            type: "Multi-Storey",
            spaces: 250,
            available: 45,
            occupied: 180,
            occupancy: "72.0%",
            value: 56,
          },
          {
            name: "Smart Hydraulic Parking",
            type: "Hydraulic",
            spaces: 250,
            available: 45,
            occupied: 180,
            occupancy: "72.0%",
            value: 70,
          },
        ].map((facility, index) => (
          <Card key={index} className="mb-4">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="space-y-1">
                  <h3 className="text-base font-bold">{facility.name}</h3>
                  <p className="text-sm text-gray-500">
                    {facility.type} &bull; Building-Owned &bull; 5 levels
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-5 gap-4 text-sm font-medium mb-2">
                <div>Total Spaces</div>
                <div>Available</div>
                <div>Occupied</div>
                <div>Occupancy</div>
                <div></div> {/* For the progress bar column */}
              </div>
              <div className="grid grid-cols-5 gap-4 text-sm">
                <div className="font-bold">{facility.spaces}</div>
                <div className="font-bold text-green-600">
                  {facility.available}
                </div>
                <div className="font-bold text-red-600">
                  {facility.occupied}
                </div>
                <div className="font-bold">{facility.occupancy}</div>
                <div className="flex items-center space-x-2">
                  <Badge
                    variant="outline"
                    className="bg-green-500 rounded-sm text-white">
                    Active
                  </Badge>
                  <Eye className="h-4 w-4 text-gray-500 cursor-pointer" />
                  <Pencil className="h-4 w-4 text-gray-500 cursor-pointer" />
                </div>
              </div>
              <div className="w-[67%] mt-4">
                <Progress
                  value={facility.value}
                  className="h-3 mt-1 [&>div]:bg-orange-500 bg-slate-200"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
