// src/components/ParkingStructureBuilder.tsx
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useParking, ParkingProvider } from "./ParkingContext";
import { StructureItem } from "./StructureItem";
import { AddLevelDialog } from "./AddLevelDialog";
import {
  ArrowRight,
  Car,
  HardHat,
  Layers,
  LayoutGrid,
  Scale,
} from "lucide-react";
import { Facility } from "./Facility.types";

// --- Total Stats Component ---
const StatsCard: React.FC<{
  title: string;
  value: number;
  icon: React.ReactNode;
}> = ({ title, value, icon }) => (
  <Card className="flex-1 min-w-[150px]">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
    </CardContent>
  </Card>
);

// --- Main Builder Content ---
const ParkingStructureBuilderContent: React.FC = () => {
  const { state, getTotalLevels, getTotalZones, getTotalRows, getTotalSpaces } =
    useParking();

  const facility: Facility = state; // Facility is the root of the state

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-3xl font-bold">Parking Structure Builder</h1>
      <p className="text-muted-foreground">
        Build your parking facility with hierarchical structure: Facility →
        Levels → Zones → Rows → Spaces
      </p>

      {/* --- Stats Row --- */}
      <div className="flex flex-wrap gap-4">
        <StatsCard
          title="Total Spaces"
          value={getTotalSpaces()}
          icon={<Car className="h-4 w-4 text-primary" />}
        />
        <StatsCard
          title="Total Levels"
          value={getTotalLevels()}
          icon={<Layers className="h-4 w-4 text-primary" />}
        />
        <StatsCard
          title="Total Zones"
          value={getTotalZones()}
          icon={<LayoutGrid className="h-4 w-4 text-primary" />}
        />
        <StatsCard
          title="Total Rows"
          value={getTotalRows()}
          icon={<Scale className="h-4 w-4 text-primary" />}
        />
      </div>

      {/* --- Facility Card (Root) --- */}
      <Card className="border-2 border-primary/50">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <HardHat className="h-6 w-6 text-primary" />
            {facility.name}
          </CardTitle>
          <AddLevelDialog>
            <Button>Add Level</Button>
          </AddLevelDialog>
        </CardHeader>

        <CardContent className="space-y-4 pt-4">
          {/* --- Render Levels --- */}
          {facility.levels.map((level) => (
            <StructureItem key={level.id} item={level} type="level" />
          ))}

          {/* Next Button */}
          <div className="flex justify-end pt-4">
            <Button size="lg">
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export const ParkingStructureBuilder: React.FC = () => (
  <ParkingProvider>
    <ParkingStructureBuilderContent />
  </ParkingProvider>
);
