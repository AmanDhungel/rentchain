import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Label } from "../../ui/label";
import { Switch } from "../../ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Checkbox } from "../../ui/checkbox";
import { Plus, X } from "lucide-react";
import { icons } from "../../../assets/icons/exports";

type FormValues = {
  enabled: boolean;
  spaceId: string;
  spaceType: string;
  vehicleType: string;
  billingFrequency: string;
  amount: number;
  currency: string;
  assignmentType: string;
  assignBuilding: boolean;
  assignFloor: boolean;
  assignRoom: boolean;
  accessMethod: string;
  locationDescription: string;
  IndividualName: string;
  assignToTenant: string;
};

export default function ParkingManagement({
  onNext,
  onPrev,
}: {
  onNext: () => void;
  onPrev: () => void;
}) {
  const { register, handleSubmit, control, setValue } = useForm<FormValues>({
    defaultValues: {
      enabled: true,
      spaceId: "PS-1",
      spaceType: "Open",
      vehicleType: "Car",
      billingFrequency: "Monthly",
      amount: 0,
      currency: "USD",
      assignmentType: "Property/Floor/Unit",
      assignBuilding: true,
      assignFloor: false,
      assignRoom: false,
      accessMethod: "Key",
      locationDescription: "",
      IndividualName: "",
      assignToTenant: "",
    },
  });

  const [assignmentType, setAssignmentType] = useState("");
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const [chips, setChips] = useState<string[]>([
    "Building 123",
    "Floor 3232",
    "Room 5",
  ]);

  function onSubmit(data: FormValues) {
    console.log("submit", data);
    alert(JSON.stringify(data, null, 2));
  }

  function addChip() {
    const id = `New ${chips.length + 1}`;
    setChips((s) => [...s, id]);
  }

  function removeChip(idx: number) {
    setChips((s) => s.filter((_, i) => i !== idx));
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardHeader>
          <div className="flex flex-col ">
            <CardTitle className="flex flex-col gap-2">
              Parking Management
              <span className="text-sm font-normal text-muted-foreground">
                Configure and manage all parking spaces for your
                propertyproperty
              </span>
            </CardTitle>
            <div className="flex justify-between items-center  mt-5 gap-4">
              <h2 className=" flex gap-2">
                <img src={icons.GarageMoney} alt="" />
                <p className="text-[15px] flex flex-col ">
                  Enable Parking Management
                  <span className="text-xs text-muted-foreground">
                    Centralized parking space configuration for entire property
                  </span>
                </p>
              </h2>

              <Switch onCheckedChange={(res) => setIsSwitchOn(res)} />
            </div>
          </div>
        </CardHeader>

        <div className="flex justify-end mb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setValue(
                "spaceId",
                "PS-" + (Math.floor(Math.random() * 900) + 100)
              )
            }>
            <Plus className="mr-2" size={14} /> Add Parking Space
          </Button>
        </div>
        {isSwitchOn && (
          <div className="bg-white dark:bg-slate-900 rounded-lg p-6 ">
            <div className="flex items-start justify-between">
              <div className="flex gap-2">
                <img src={icons.GarageMoney} />
                <span>
                  <h3 className="text-lg font-medium">Parking Space 1</h3>
                  <p className="text-sm text-green-600">Available</p>
                </span>
              </div>
              <button
                type="button"
                className="text-slate-400 hover:text-slate-700">
                <X />
              </button>
            </div>

            {/* Grid form */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div>
                <Label>Space ID/Number</Label>
                <Input {...register("spaceId")} className="mt-2" />
              </div>

              <div>
                <Label>Space Type</Label>
                <Controller
                  control={control}
                  name="spaceType"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Open">Open</SelectItem>
                        <SelectItem value="Covered">Covered</SelectItem>
                        <SelectItem value="Reserved">Reserved</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div>
                <Label>Vehicle Type</Label>
                <Controller
                  control={control}
                  name="vehicleType"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select vehicle" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Car">Car</SelectItem>
                        <SelectItem value="Motorbike">Motorbike</SelectItem>
                        <SelectItem value="Bicycle">Bicycle</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div>
                <Label>Billing Frequency</Label>
                <Controller
                  control={control}
                  name="billingFrequency"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Daily">Daily</SelectItem>
                        <SelectItem value="Weekly">Weekly</SelectItem>
                        <SelectItem value="Monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div>
                <Label>Amount (USD)</Label>
                <Input
                  type="number"
                  {...register("amount", { valueAsNumber: true })}
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Currency</Label>
                <Controller
                  control={control}
                  name="currency"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                        <SelectItem value="NPR">NPR</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>

            <div className="mt-6">
              <div className="flex gap-10">
                <div className="flex flex-col ">
                  <Label className="text-sm text-green-600">
                    Assignment Type
                  </Label>
                  <Controller
                    control={control}
                    name="assignmentType"
                    render={({ field }) => (
                      <Select
                        onValueChange={(value) => {
                          setAssignmentType(value);
                          field.onChange(value);
                        }}
                        value={field.value}>
                        <SelectTrigger className="mt-2 w-fit">
                          <SelectValue placeholder="Select assignment" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Property/Floor/Unit">
                            Property/Floor/Unit
                          </SelectItem>
                          <SelectItem value="Property/Unit">
                            Property/Unit
                          </SelectItem>
                          <SelectItem value="Individual">Individual</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                {assignmentType === "Property/Floor/Unit" && (
                  <div>
                    <Label className="text-sm text-green-600">
                      Assign to Tenant
                    </Label>
                    <Input
                      {...register("assignToTenant")}
                      placeholder="Name"
                      className="mt-2"
                    />
                  </div>
                )}
                {assignmentType === "Individual" && (
                  <div>
                    <Label className="text-sm text-green-600">
                      Assign to Individual
                    </Label>
                    <Input
                      {...register("IndividualName")}
                      placeholder="Name"
                      className="mt-2"
                    />
                  </div>
                )}
              </div>

              {assignmentType === "Property/Unit" && (
                <div className="border rounded-md p-4 mt-4">
                  <p className="text-sm text-muted-foreground">Assign To</p>
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <Checkbox checked defaultChecked />
                      <span>Building 123</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox />
                      <span>Floor 3232</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox />
                      <span>Room 5</span>
                    </div>
                  </div>
                </div>
              )}

              {/* chips */}
              <div className="flex flex-wrap gap-2 mt-4">
                {chips.map((c, i) => (
                  <div
                    key={c}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm">
                    <span>{c}</span>
                    <button type="button" onClick={() => removeChip(i)}>
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex gap-2">
                <Button size="sm" onClick={addChip} variant="ghost">
                  <Plus size={14} /> Add Tag
                </Button>
              </div>
            </div>

            {/* Access Method and Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div>
                <Label>Access Method</Label>
                <Controller
                  control={control}
                  name="accessMethod"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Key">Key</SelectItem>
                        <SelectItem value="Fob">Fob</SelectItem>
                        <SelectItem value="Card">Card</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div>
                <Label>Location Description</Label>
                <Input
                  {...register("locationDescription")}
                  placeholder="e.g., Ground floor, near entrance"
                  className="mt-2"
                />
              </div>
            </div>

            {/* Summary row */}
            <div className="flex items-center justify-between mt-6 border-t pt-4">
              <div className="flex gap-6">
                <div>
                  <p className="text-xs text-muted-foreground">Total Spaces</p>
                  <p className="font-medium">1</p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">Available</p>
                  <p className="font-medium">1</p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">Assigned</p>
                  <p className="font-medium">1</p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-xs text-muted-foreground">
                  Est. Monthly Revenue
                </p>
                <p className="font-medium">0 USD</p>
              </div>
            </div>
          </div>
        )}
      </form>
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
    </div>
  );
}
