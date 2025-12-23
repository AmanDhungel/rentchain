"use client";
import {
  ArrowLeft,
  Phone,
  MessageSquare,
  MapPin,
  Zap,
  Flame,
  FileText,
  Home,
  Settings,
  Grid,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { NextRouter } from "next/router";

interface Lessor {
  name: string;
  phone: string;
  email: string;
  avatar: string;
}

interface Meter {
  type: string;
  provider: string;
  unit: string;
  value: string;
  date: string;
  icon: React.ElementType;
  color: string;
  bg: string;
}

interface Amenity {
  name: string;
  detail: string;
}

interface Doc {
  name: string;
  type: string;
  date: string;
}

interface ActivityItem {
  title: string;
  date: string;
}

interface PropertyData {
  title: string;
  id: string;
  address: string;
  coverage: string;
  lessor: Lessor;
  meters: Meter[];
  amenities: Amenity[];
  docs: Doc[];
  activity: ActivityItem[];
}

// --- Mock Data ---

const propertyData: PropertyData = {
  title: "Skyline Apartments",
  id: "SKY-A2B-BR1",
  address: "123 Main Street, Downtown",
  coverage: "Building A → Floor 2 → Unit 2B → Bedroom 1",
  lessor: {
    name: "Sophie Headrick",
    phone: "+1 (555) 123-4567",
    email: "contact@johnsmithproperties.com",
    avatar: "https://i.pravatar.cc/150?u=sophie",
  },
  meters: [
    {
      type: "Electricity",
      provider: "City Electric Company",
      unit: "Electricity Provider",
      value: "1245.7 kWh",
      date: "8/15/2024",
      icon: Zap,
      color: "text-orange-500",
      bg: "bg-orange-100",
    },
    {
      type: "Gas",
      provider: "Gas",
      unit: "Unit 2B",
      value: "567.2 therms",
      date: "8/15/2024",
      icon: Flame,
      color: "text-purple-500",
      bg: "bg-purple-100",
    },
  ],
  amenities: [
    { name: "Parking Slot", detail: "Space #A-24" },
    { name: "Mailbox", detail: "Box #2B-1" },
    { name: "Storage Unit", detail: "5x5 ft locker" },
    { name: "Access Card", detail: "Card #1234" },
  ],
  docs: [
    { name: "Building Manual.pdf", type: "Manual", date: "1/15/2024" },
    { name: "House Rules.pdf", type: "Rules", date: "1/15/2024" },
    { name: "Emergency Procedures.pdf", type: "Emergency", date: "1/15/2024" },
    {
      name: "Unit Inspection Report.pdf",
      type: "Inspection",
      date: "1/15/2024",
    },
  ],
  activity: [
    { title: "Electricity meter reading submitted", date: "8/15/2024" },
    { title: "Bedroom partition request approved", date: "8/15/2024" },
    { title: "Sub-unit BED-001 listed for sublease", date: "8/15/2024" },
    { title: "Monthly rent payment processed", date: "8/15/2024" },
  ],
};

const OverviewTab = ({ data }: { data: PropertyData }) => (
  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
    <Card className="shadow-sm border-gray-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold text-gray-800">
          Lessor Information
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-start gap-4">
        <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
          <AvatarImage src={data.lessor.avatar} />
          <AvatarFallback>SH</AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <div className="font-bold text-gray-900">{data.lessor.name}</div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Phone className="h-3 w-3" /> {data.lessor.phone}
            </div>
            <div className="flex items-center gap-1">
              <MessageSquare className="h-3 w-3" /> {data.lessor.email}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    <Card className="shadow-sm border-gray-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold text-gray-800">
          Utilities Policy
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <span className="text-sm font-medium text-green-600 mb-2 block">
            Included in Rent
          </span>
          <div className="flex gap-2">
            {["Water", "Trash", "Internet"].map((item) => (
              <Badge
                key={item}
                variant="secondary"
                className="font-normal text-gray-600 bg-gray-100 hover:bg-gray-200 border-0">
                {item}
              </Badge>
            ))}
          </div>
        </div>
        <div>
          <span className="text-sm font-medium text-red-500 mb-2 block">
            Metered/Separate Billing
          </span>
          <div className="flex gap-2">
            {["Electricity", "Gas"].map((item) => (
              <Badge
                key={item}
                variant="secondary"
                className="font-normal text-gray-600 bg-gray-100 hover:bg-gray-200 border-0">
                {item}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>

    <Card className="shadow-sm border-gray-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold text-gray-800">
          House Rules
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc list-inside text-sm text-gray-500 space-y-1 ml-1">
          <li>No smoking inside the building</li>
          <li>Quiet hours: 10 PM - 8 AM</li>
          <li>Maximum 2 guests at a time</li>
          <li>No pets without prior approval</li>
        </ul>
      </CardContent>
    </Card>

    {/* Occupancy */}
    <Card className="shadow-sm border-gray-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold text-gray-800">
          Occupancy Information
        </CardTitle>
      </CardHeader>
      <CardContent className="flex justify-between items-center text-sm">
        <span className="text-gray-600">Current Occupancy</span>
        <span className="font-medium text-gray-900">1 / 2 people</span>
      </CardContent>
    </Card>
  </div>
);

const LayoutTab = ({ router }: any) => {
  return (
    <Card className="shadow-sm border-gray-200 min-h-[300px] flex flex-col items-center justify-center p-8 text-center bg-gray-50/50 animate-in fade-in duration-500">
      <div className="mb-4 text-gray-400">
        <Home className="h-16 w-16 mx-auto stroke-1" />
      </div>
      <h3 className="text-lg font-medium text-gray-700 mb-1">
        Interactive Layout
      </h3>
      <p className="text-sm text-gray-500 mb-8 max-w-sm mx-auto">
        Interactive layout viewer will be displayed here. View and manage your
        leased space subdivision.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl">
        <Button
          onClick={() => router.push("/tenant/properties/modificationrequest")}
          variant="outline"
          className="flex-1 h-12 gap-2 text-gray-700 bg-white hover:text-blue-600 hover:border-blue-200">
          <Settings className="h-4 w-4" /> Modification Requests
        </Button>
        <Button
          variant="outline"
          className="flex-1 h-12 gap-2 text-gray-700 bg-white hover:text-blue-600 hover:border-blue-200">
          <Grid className="h-4 w-4" /> Sub-Unit Catalog
        </Button>
      </div>
    </Card>
  );
};

const MetersTab = ({ data }: { data: PropertyData }) => (
  <div className="space-y-4 animate-in fade-in duration-500">
    {data.meters.map((meter, index) => (
      <Card key={index} className="shadow-sm border-gray-200">
        <div className="p-4 sm:p-6 flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <div className="flex gap-4">
              <div
                className={`w-10 h-10 rounded-lg ${meter.bg} flex items-center justify-center`}>
                <meter.icon className={`h-5 w-5 ${meter.color}`} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">
                  {meter.provider}
                </h4>
                <p className="text-sm text-gray-500">{meter.unit}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-gray-900">{meter.value}</div>
              <div className="text-xs text-gray-400">{meter.date}</div>
            </div>
          </div>
          <Button
            variant="outline"
            className="w-full text-blue-950 font-medium hover:bg-gray-50">
            Submit Reading
          </Button>
        </div>
      </Card>
    ))}
  </div>
);

const AmenitiesTab = ({ data }: { data: PropertyData }) => (
  <div className="space-y-3 animate-in fade-in duration-500">
    {data.amenities.map((item, index) => (
      <Card key={index} className="shadow-sm border-gray-200">
        <div className="p-4 flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-blue-950">{item.name}</h4>
            <p className="text-sm text-gray-500">{item.detail}</p>
          </div>
          <Badge
            variant="outline"
            className="text-green-600 border-green-200 bg-green-50 px-3 py-1 font-normal capitalize">
            assigned
          </Badge>
        </div>
      </Card>
    ))}
  </div>
);

const DocsTab = ({ data }: { data: PropertyData }) => (
  <div className="space-y-3 animate-in fade-in duration-500">
    {data.docs.map((doc, index) => (
      <Card
        key={index}
        className="shadow-sm border-gray-200 hover:border-blue-300 cursor-pointer transition-all">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded bg-orange-50 flex items-center justify-center">
              <FileText className="h-5 w-5 text-orange-500" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">{doc.name}</h4>
              <p className="text-xs text-gray-500">{doc.type}</p>
            </div>
          </div>
          <span className="text-xs text-gray-400 font-mono">{doc.date}</span>
        </div>
      </Card>
    ))}
  </div>
);

const ActivityTab = ({ data }: { data: PropertyData }) => (
  <div className="space-y-3 animate-in fade-in duration-500">
    {data.activity.map((act, index) => (
      <Card key={index} className="shadow-sm border-gray-200">
        <div className="p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center shrink-0">
            <div className="h-2.5 w-2.5 rounded-full bg-purple-500 relative">
              <div className="absolute top-0 right-0 -mt-1 -mr-1 w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping opacity-75"></div>
            </div>
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-gray-900">{act.title}</h4>
            <p className="text-xs text-gray-500">{act.date}</p>
          </div>
        </div>
      </Card>
    ))}
  </div>
);

export default function PropertyDetailsPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white pb-20 font-sans text-gray-900">
      <div className="sticky top-0 bg-white z-20 border-b border-gray-100 px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <Button
            onClick={() => router.back()}
            variant="ghost"
            size="icon"
            className="text-gray-600 hover:bg-gray-100 rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-lg font-bold leading-tight">
              {propertyData.title}
            </h1>
            <p className="text-xs text-gray-400 font-mono tracking-wide">
              {propertyData.id}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="rounded-lg h-9 w-9 text-gray-600 border-gray-200">
            <Phone className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-lg h-9 w-9 text-gray-600 border-gray-200">
            <MessageSquare className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="w-full aspect-[2/1] md:aspect-[3/1] bg-gray-100 overflow-hidden relative">
        <Image
          width={500}
          height={500}
          src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=2000"
          alt="Property"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 gradient-to-t from-black/20 to-transparent pointer-events-none" />
      </div>

      <div className="px-4 py-5 mx-auto">
        <div className="flex items-center gap-2 text-gray-700 mb-2">
          <MapPin className="h-5 w-5 text-gray-400" />
          <span className="font-medium">{propertyData.address}</span>
        </div>
        <div className="text-xs sm:text-sm text-gray-500 pl-7">
          <span className="font-medium text-gray-700">Lease Coverage: </span>
          {propertyData.coverage}
        </div>
      </div>

      <div className="px-4  mx-auto mt-2">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="w-full overflow-x-auto scrollbar-hide border-b border-gray-100 mb-6">
            <TabsList className="h-auto w-full justify-start bg-transparent p-0 gap-8">
              {[
                "Overview",
                "Layout",
                "Meters",
                "Amenities",
                "Docs",
                "Activity",
              ].map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab.toLowerCase()}
                  className="rounded-none border-b-2 border-transparent px-1 pb-3 pt-2 font-medium text-gray-500 
                           data-[state=active]:border-orange-500 data-[state=active]:text-orange-600 
                           hover:text-gray-800 transition-colors bg-transparent shadow-none">
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <div className="min-h-[400px]">
            <TabsContent value="overview">
              <OverviewTab data={propertyData} />
            </TabsContent>

            <TabsContent value="layout">
              <LayoutTab router={router} />
            </TabsContent>

            <TabsContent value="meters">
              <MetersTab data={propertyData} />
            </TabsContent>

            <TabsContent value="amenities">
              <AmenitiesTab data={propertyData} />
            </TabsContent>

            <TabsContent value="docs">
              <DocsTab data={propertyData} />
            </TabsContent>

            <TabsContent value="activity">
              <ActivityTab data={propertyData} />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
