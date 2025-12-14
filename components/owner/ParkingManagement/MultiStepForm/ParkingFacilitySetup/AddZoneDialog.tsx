// src/components/forms/AddZoneDialog.tsx
import React, { useState } from "react";
import { useForm, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZoneSchema, AddZoneData } from "./Facility.types";
import { useParking } from "./ParkingContext";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

interface AddZoneDialogProps {
  children: React.ReactNode;
  levelId: string;
}

const zoneTypes = ["VIP", "Standard", "Staff", "Motorcycle"];

export const AddZoneDialog: React.FC<AddZoneDialogProps> = ({
  children,
  levelId,
}) => {
  const [open, setOpen] = useState(false);
  const { addZone } = useParking();

  const form = useFormContext<AddZoneData>();

  const onSubmit = (data: AddZoneData) => {
    console.log("data", data);
    addZone(levelId, data);
    form.reset();
    // setOpen(false);
  };

  console.log("form values", form.getValues());

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add Parking Zone</DialogTitle>
          <div className="text-sm text-muted-foreground">
            Adding zone to Level ID: {levelId}
          </div>
        </DialogHeader>

        <div className="grid grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="zoneName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Zone Name*</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Zone A" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="zoneCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Zone Code*</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., ZA-1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="zoneType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Zone Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {zoneTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="area"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Area (sqm)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="1"
                  placeholder="1000"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Separator />

        <div className="space-y-2">
          <FormLabel className="text-base">Features</FormLabel>
          <div className="grid grid-cols-3 gap-4">
            {[
              { name: "hasLighting", label: "Has Lighting" },
              { name: "hasCCTV", label: "CCTV Cameras" },
              { name: "hasWeatherProtection", label: "Weather Protection" },
            ].map(({ name, label }) => (
              <FormField
                key={name}
                control={form.control}
                name={name as keyof AddZoneData} // Type assertion for checkbox fields
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value as boolean}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>{label}</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-2 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setOpen(false);
              onSubmit(form.getValues());
            }}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              onSubmit(form.getValues());
              setOpen(false);
            }}>
            Add Zone
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
