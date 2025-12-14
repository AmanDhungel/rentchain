import {
  CalendarClock,
  CarFront,
  ChartNoAxesCombined,
  FilePen,
  FilePlusCorner,
  LayoutDashboard,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import AccountingTab from "./AccountingTabs";
import AnalyticsTab from "./AnalyticsTabs";
import LogsTab from "./LogsTab";
import OverviewTab from "./OverviewTab";
import { AppHeader } from "./ParkingSharedComponent";
import ParkingSpacesTab from "./ParkingSpaceTab";
import ReservationsTab from "./ReservationTab";

const ParkingManagement = () => {
  return (
    <div className="min-h-screen ">
      <AppHeader />

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="bg-white w-full ">
          <TabsTrigger
            value="overview"
            className="flex items-center space-x-2 py-3 data-[state=active]:border-b-orange-500 rounded-none data-[state=active]:border-b-2 shadow-none!">
            <LayoutDashboard /> Overview
          </TabsTrigger>
          <TabsTrigger
            value="parking-spaces"
            className="flex items-center space-x-2 py-3 data-[state=active]:border-b-orange-500 rounded-none data-[state=active]:border-b-2 shadow-none!">
            <CarFront className=" rounded-[2px] border border-black" /> Parking
            Spaces
          </TabsTrigger>
          <TabsTrigger
            value="reservations"
            className="flex items-center space-x-2 py-3 data-[state=active]:border-b-orange-500 rounded-none data-[state=active]:border-b-2 shadow-none!">
            <CalendarClock /> Reservations
          </TabsTrigger>
          <TabsTrigger
            value="logs"
            className="flex items-center space-x-2 py-3 data-[state=active]:border-b-orange-500 rounded-none data-[state=active]:border-b-2 shadow-none!">
            <FilePlusCorner /> Logs
          </TabsTrigger>
          <TabsTrigger
            value="accounting"
            className="flex items-center space-x-2 py-3 data-[state=active]:border-b-orange-500 rounded-none data-[state=active]:border-b-2 shadow-none!">
            <FilePen /> Accounting
          </TabsTrigger>
          <TabsTrigger
            value="analytics"
            className="flex items-center space-x-2 py-3 data-[state=active]:border-b-orange-500 rounded-none data-[state=active]:border-b-2 shadow-none!">
            <ChartNoAxesCombined />
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <OverviewTab />
        </TabsContent>
        <TabsContent value="parking-spaces">
          <ParkingSpacesTab />
        </TabsContent>
        <TabsContent value="reservations">
          <ReservationsTab />
        </TabsContent>
        <TabsContent value="logs">
          <LogsTab />
        </TabsContent>
        <TabsContent value="accounting">
          <AccountingTab />
        </TabsContent>
        <TabsContent value="analytics">
          <AnalyticsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ParkingManagement;
