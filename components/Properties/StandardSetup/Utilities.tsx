import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Card, CardHeader, CardTitle, CardContent } from "../../ui/card";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../ui/select";
import { Checkbox } from "../../ui/checkbox";
import { Button } from "../../ui/button";
import { X } from "lucide-react";

type FormValues = {
  useExistingMeter: boolean;
  addNewMeter: boolean;
  utilityType: string;
  providerName: string;
  meterSerial: string;
  meterType: string;
  billingResponsibility: string;
  gfShare: number;
  tenantShare: number;
  ownerShare: number;
};

export default function UtilitiesAssignment({
  onNext,
  onPrev,
}: {
  onNext: () => void;
  onPrev: () => void;
}) {
  const { register, handleSubmit, control } = useForm<FormValues>({
    defaultValues: {
      useExistingMeter: false,
      addNewMeter: false,
      utilityType: "",
      providerName: "",
      meterSerial: "",
      meterType: "Manual Reading",
      billingResponsibility: "Shared/Split",
      gfShare: 100,
      tenantShare: 50,
      ownerShare: 50,
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("submit", data);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between ">
              <CardTitle className="flex flex-col gap-2">
                Utilities Assignment
                <p className="text-sm font-normal text-muted-foreground">
                  Configure utility meters and assign them to specific areas
                </p>
              </CardTitle>
            </div>
          </CardHeader>

          <CardContent>
            {/* Meter Configuration toggles */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Controller
                  control={control}
                  name="useExistingMeter"
                  render={({ field }) => (
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(v) => field.onChange(v)}
                    />
                  )}
                />
                <span>Use Existing Meter</span>
              </div>

              <div className="flex items-center gap-2">
                <Controller
                  control={control}
                  name="addNewMeter"
                  render={({ field }) => (
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(v) => field.onChange(v)}
                    />
                  )}
                />
                <span>Add New Meter</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Utility Type</Label>
                <Controller
                  control={control}
                  name="utilityType"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select utility" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Water">Water</SelectItem>
                        <SelectItem value="Electricity">Electricity</SelectItem>
                        <SelectItem value="Gas">Gas</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div>
                <Label>Provider Name</Label>
                <Input
                  {...register("providerName")}
                  placeholder="e.g., City Electric Co."
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Meter Serial</Label>
                <Input
                  {...register("meterSerial")}
                  placeholder="e.g., MTR-123456"
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Meter Type</Label>
                <Controller
                  control={control}
                  name="meterType"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select meter type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Manual Reading">
                          Manual Reading
                        </SelectItem>
                        <SelectItem value="Smart Meter">Smart Meter</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>

            {/* Assignment area */}
            <div className="mt-6 border rounded-md p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Air Conditioning</p>
                  <p className="text-xs text-muted-foreground">
                    Select which areas have this amenity
                  </p>
                </div>
                <button type="button" className="text-muted-foreground">
                  <X />
                </button>
              </div>

              <div className="mt-3 space-y-2">
                <div className="flex items-center gap-2">
                  <Checkbox checked />
                  <span>Building 123</span>
                </div>
                <div className="flex items-center gap-2 ml-6">
                  <Checkbox />
                  <span>Floor 3232</span>
                </div>
                <div className="flex items-center gap-2 ml-10">
                  <Checkbox />
                  <span>Room 5</span>
                </div>
              </div>
            </div>

            {/* Billing Responsibility */}
            <div className="mt-6">
              <Label>Billing Responsibility</Label>
              <Controller
                control={control}
                name="billingResponsibility"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Shared/Split" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Shared/Split">Shared/Split</SelectItem>
                      <SelectItem value="Owner">Owner</SelectItem>
                      <SelectItem value="Tenant">Tenant</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            {/* Billing Split Configuration */}
            <div className="mt-4 bg-gray-50 dark:bg-slate-800 p-4 rounded-md">
              <p className="text-sm font-medium">Billing Split Configuration</p>

              <div className="grid grid-cols-4 items-center gap-3 mt-3">
                <p className="whitespace-nowrap">GF</p>
                <div>
                  <Label>Share %</Label>
                  <Input
                    type="number"
                    {...register("gfShare", { valueAsNumber: true })}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>Tenant %</Label>
                  <Input
                    type="number"
                    {...register("tenantShare", { valueAsNumber: true })}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>Owner %</Label>
                  <Input
                    type="number"
                    {...register("ownerShare", { valueAsNumber: true })}
                    className="mt-2"
                  />
                </div>
              </div>
            </div>

            {/* Configured Utilities list */}
            <div className="mt-6 border rounded-md p-4">
              <div className="flex items-center justify-between">
                <p className="font-medium">Configured Utilities</p>
                <button type="button" className="text-sm text-muted-foreground">
                  Add
                </button>
              </div>

              <div className="mt-3">
                <div className="bg-white dark:bg-slate-900 p-3 rounded-md shadow-sm border">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium">
                        Water{" "}
                        <span className="ml-2 text-xs text-amber-600">
                          Hierarchical
                        </span>
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Municipal Water
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Meter: MTR-5434346 (Manual) — existing
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Assigned to: 1 assignment | 10:90 split
                      </p>
                    </div>
                    <button className="text-muted-foreground">
                      <X />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-6">
              <Button variant="outline" onClick={onPrev} type="button">
                Previous
              </Button>

              <div className="flex items-center gap-3">
                <Button className="bg-orange-500" onClick={onNext}>
                  Next →
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
