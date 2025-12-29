"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  ArrowLeft,
  Zap,
  Droplets,
  Flame,
  Wifi,
  Camera,
  Upload,
  Search,
  Filter,
  Eye,
} from "lucide-react";

const formSchema = z.object({
  meterReading: z.string().min(1, "Meter reading is required"),
  notes: z.string().optional(),
  autoFillOCR: z.boolean(),
});

export default function MeterReadingsPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { meterReading: "", notes: "", autoFillOCR: true },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Submitted Reading:", values);
  }

  return (
    <div className="min-h-screen md:pl-0 p-4 md:p-8 space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-white shadow-sm">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-xl font-bold text-slate-900">Meter Readings</h1>
          <p className="text-sm text-slate-500">
            Submit readings manually or with photo OCR
          </p>
        </div>
      </div>

      <Tabs defaultValue="submit" className="w-full">
        <TabsList className="w-full justify-start bg-transparent border-b rounded-none h-12 p-0 gap-12">
          <TabsTrigger value="submit" className="tab-trigger-custom">
            Submit Reading
          </TabsTrigger>
          <TabsTrigger value="history" className="tab-trigger-custom">
            Reading History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="submit" className="mt-6 space-y-6">
          <Card className="border-none shadow-sm">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-bold text-slate-800 text-sm">Select Meter</h3>
              <div className="space-y-3">
                <MeterSelectCard
                  icon={<Zap className="text-orange-500" />}
                  name="Main Electrical Meter"
                  room="Utility Room"
                  last="15,420 kWh"
                  due="2/1/2024"
                  badges={["normal", "IoT"]}
                />
                <MeterSelectCard
                  icon={<Droplets className="text-blue-500" />}
                  name="Water Meter"
                  room="Main Supply"
                  last="8,750 gallons"
                  due="2/1/2024"
                  badges={["normal"]}
                />
                <MeterSelectCard
                  icon={<Flame className="text-purple-500" />}
                  name="Natural Gas Meter"
                  room="Exterior"
                  last="2,450 CCF"
                  due="2/1/2024"
                  badges={["overdue"]}
                  active
                />
                <MeterSelectCard
                  icon={<Wifi className="text-green-500" />}
                  name="Internet Service"
                  room="Shared"
                  last="1,024 GB"
                  due="2/1/2024"
                  badges={["normal", "IoT"]}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">
                    OCR Settings
                  </h3>
                  <p className="text-xs text-slate-400">
                    Automatically fill reading when OCR completes
                  </p>
                </div>
                <Switch checked={true} />
              </div>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      className="h-24 flex flex-col gap-2 border-dashed border-2">
                      <Camera className="h-6 w-6 text-slate-400" />
                      <span className="text-sm font-bold text-slate-700">
                        Take Photo
                      </span>
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="h-24 flex flex-col gap-2 border-dashed border-2">
                      <Upload className="h-6 w-6 text-slate-400" />
                      <span className="text-sm font-bold text-slate-700">
                        Upload Photo
                      </span>
                    </Button>
                  </div>

                  <FormField
                    control={form.control}
                    name="meterReading"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-bold uppercase text-slate-500">
                          Meter Reading *
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter current reading"
                            {...field}
                            className="bg-slate-50/50 border-slate-100"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-bold uppercase text-slate-500">
                          Notes (Optional)
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Any additional notes about this reading..."
                            {...field}
                            className="bg-slate-50/50 border-slate-100"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full bg-orange-500 hover:bg-orange-600 h-12">
                    Submit Reading
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="mt-6 space-y-4">
          <div className="flex gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <Input placeholder="Search..." className="pl-10 bg-white" />
            </div>
            <Button variant="outline" className="gap-2">
              {" "}
              <Filter className="h-4 w-4" /> Filter{" "}
            </Button>
          </div>

          <HistoryItem
            name="Main Electrical Meter"
            id="RH-001"
            date="1/30/2024"
            value="15,420"
            unit="kWh"
            method="Iot"
            verified
          />
          <HistoryItem
            name="Water Meter"
            id="RH-002"
            date="1/29/2024"
            value="8,750"
            unit="gallons"
            method="Photo"
            verified
            hasPhoto
          />
          <HistoryItem
            name="Natural Gas Meter"
            id="RH-003"
            date="1/29/2024"
            value="2,450"
            unit="CCF"
            method="Manual"
            status="disputed"
          />
          <HistoryItem
            name="Internet Service"
            id="RH-004"
            date="1/30/2024"
            value="1,024"
            unit="GB"
            method="Iot"
            verified
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function MeterSelectCard({ icon, name, room, last, due, badges, active }: any) {
  return (
    <div
      className={`p-4 border rounded-lg flex justify-between items-center transition-all ${
        active
          ? "border-orange-500 ring-1 ring-orange-500"
          : "border-slate-100 bg-white"
      }`}>
      <div className="flex gap-3 items-center">
        <div className="p-2 bg-slate-50 rounded-lg">{icon}</div>
        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-bold text-slate-800">{name}</h4>
            {badges.map((b: string) => (
              <Badge
                key={b}
                className={`text-[10px] h-4 px-1 uppercase ${
                  b === "overdue"
                    ? "bg-red-500"
                    : "bg-green-500 hover:bg-green-500"
                }`}>
                {b}
              </Badge>
            ))}
          </div>
          <p className="text-[10px] text-slate-400 font-medium">
            {room} • Last: {last} Due: {due}
          </p>
        </div>
      </div>
    </div>
  );
}

function HistoryItem({
  name,
  id,
  date,
  value,
  unit,
  method,
  verified,
  hasPhoto,
  status,
}: any) {
  return (
    <Card className="border-none shadow-sm">
      <CardContent className="p-4 flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <div className="p-2 bg-slate-50 text-orange-500 rounded-lg">
            <Zap size={18} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-800">{name}</h4>
            <p className="text-[10px] text-slate-400 font-medium">{id}</p>
            <div className="flex gap-1 mt-1">
              {verified && (
                <Badge className="bg-green-100 text-green-600 hover:bg-green-100 text-[10px] h-4">
                  Verified
                </Badge>
              )}
              {hasPhoto && (
                <Badge
                  variant="outline"
                  className="text-[10px] h-4 border-slate-200 text-slate-400">
                  Photo
                </Badge>
              )}
              {status === "disputed" && (
                <>
                  <Badge className="bg-orange-100 text-orange-600 hover:bg-orange-100 text-[10px] h-4">
                    Pending
                  </Badge>
                  <Badge className="bg-red-500 text-white text-[10px] h-4">
                    Disputed
                  </Badge>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="text-right">
          <p className="text-lg font-bold text-slate-800 leading-none">
            {value}
          </p>
          <p className="text-[10px] text-slate-400 font-medium uppercase">
            {unit}
          </p>
          <div className="mt-2">
            <p className="text-[10px] text-slate-400">Method</p>
            <p className="text-xs font-bold text-slate-800 uppercase">
              {method}
            </p>
          </div>
        </div>
      </CardContent>
      {status === "disputed" && (
        <div className="px-4 pb-4">
          <Button
            variant="outline"
            size="sm"
            className="w-full gap-2 text-xs font-bold border-slate-200">
            <Eye size={14} /> View Dispute Details
          </Button>
        </div>
      )}
    </Card>
  );
}
