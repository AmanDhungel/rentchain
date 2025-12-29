"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SubleasesTab } from "./SubLeasesTab";
import { SettingsTab } from "./SettingsTab";
import { ArrowLeft } from "lucide-react";
import { OverviewTab } from "./OverviewTab";
import { ParkingSpotsTab } from "./ParkingSpotsTab";
import { PaymentsTab } from "./PaymentsTab";

export default function ParkingManagement() {
  return (
    <div className=" mx-auto p-6 min-h-screen">
      <header className="mb-8 flex items-center gap-4">
        <ArrowLeft className="cursor-pointer" />
        <div>
          <h1 className="text-2xl font-bold">Parking Management</h1>
          <p className="text-sm text-muted-foreground">
            Manage parking spots and sublease assignments with cost tracking
          </p>
        </div>
      </header>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="w-full justify-start bg-transparent border-b rounded-none h-auto p-0 mb-6">
          <TabsTrigger
            value="overview"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-b-orange-500 bg-transparent">
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="spots"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-b-orange-500 bg-transparent">
            Parking Spots
          </TabsTrigger>
          <TabsTrigger
            value="subleases"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-b-orange-500 bg-transparent ">
            Subleases
          </TabsTrigger>
          <TabsTrigger
            value="payments"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-b-orange-500 bg-transparent">
            Payments
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-b-orange-500 bg-transparent">
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <OverviewTab />
        </TabsContent>
        <TabsContent value="spots">
          <ParkingSpotsTab />
        </TabsContent>
        <TabsContent value="subleases">
          <SubleasesTab />
        </TabsContent>
        <TabsContent value="payments">
          <PaymentsTab />
        </TabsContent>
        <TabsContent value="settings">
          <SettingsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
