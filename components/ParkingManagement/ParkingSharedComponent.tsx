import {
  ArrowLeft,
  Settings,
  Database,
  Filter,
  Plus,
  Eye,
  Pencil,
  LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { icons } from "@/assets/icons/exports";
import ParkingSetupDialog from "./MultiStepForm/ParkingSetupDailog";

export function AppHeader() {
  return (
    <header className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center space-x-4">
        <ArrowLeft className="h-6 w-6 text-gray-500 cursor-pointer" />
        <div>
          <h1 className="text-xl font-bold">Parking Management</h1>
          <p className="text-sm text-gray-500">
            Comprehensive parking system with smart access control and revenue
            optimization
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="outline" className="text-sm text-gray-700">
          <Database className="mr-2 h-4 w-4" /> Export Data
        </Button>
        <Button variant="outline" className="text-sm text-gray-700">
          <Settings className="mr-2 h-4 w-4" /> Settings
        </Button>

        <ParkingSetupDialog />
      </div>
    </header>
  );
}

export function InfoCard({
  icon: Icon,
  title,
  value,
  unit,
  color,
  growth,
}: {
  icon?: LucideIcon;
  title: string;
  value: string;
  unit?: string;
  color?: string;
  growth?: string;
}) {
  return (
    <Card className="flex! flex-row min-w-[200px]">
      {Icon && (
        <Icon
          className={`h-7 w-7 ml-5 flex items-center my-auto ${
            color || "text-gray-500"
          }`}
        />
      )}
      <CardContent className="pl-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={`text-2xl font-bold text-black`}>
          {unit === "AED" && (
            <span className="text-lg font-normal mr-1">{unit}</span>
          )}
          {value}
          {unit === "%" && (
            <span className="text-lg font-normal ml-1">{unit}</span>
          )}
        </div>
        {growth && (
          <p
            className={`text-xs ${
              growth.includes("+") ? "text-green-500" : "text-red-500"
            }`}>
            {growth}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export function SearchFilterBar() {
  return (
    <div className="flex items-center space-x-2 my-4">
      <Input placeholder="Search..." className="flex-1 max-w-sm" />
      <Button
        variant="outline"
        className="flex items-center text-sm text-gray-700">
        <Filter className="mr-2 h-4 w-4" /> Filter
      </Button>
    </div>
  );
}

export function ProgressBarItem({
  label,
  value,
  percentage,
  progressValue,
  colorClass = "bg-orange-500",
}: {
  label: string;
  value: string;
  percentage: string;
  progressValue: number;
  colorClass?: string;
}) {
  return (
    <div className="space-y-1 py-1">
      <div className="flex justify-between items-center text-sm">
        <span className="font-medium">{label}</span>
        <span>
          {value} <span className="text-gray-500">({percentage})</span>
        </span>
      </div>
      <Progress
        value={progressValue}
        className={`h-2 [&>div]:${colorClass} bg-slate-200`}
      />
    </div>
  );
}
