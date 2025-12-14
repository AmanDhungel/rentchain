// src/components/forms/AddLevelDialog.tsx
import React, { useState } from "react";
import { useForm, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LevelSchema, AddLevelData } from "./Facility.types";
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

interface AddLevelDialogProps {
  children: React.ReactNode;
}

const levelTypes = ["Elevated", "Underground", "Ground Floor"];
const surfaceTypes = ["Asphalt", "Concrete", "Gravel"];
const lightingTypes = ["LED", "Fluorescent", "Natural"];

export const AddLevelDialog: React.FC<AddLevelDialogProps> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const { addLevel } = useParking();

  // Use the LevelSchema for validation
  const form = useFormContext<AddLevelData>();

  const onSubmit = (data: AddLevelData) => {
    addLevel(data);
    form.reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add Parking Level</DialogTitle>
        </DialogHeader>

        {/* Level Name / Level Number */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="levelName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Level Name*</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Ground Floor" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="levelNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Level Number</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Level Type / Height Clearance */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="levelType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Level Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {levelTypes.map((type) => (
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
          <FormField
            control={form.control}
            name="heightClearance"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Height Clearance (m)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="2.2"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Surface Type / Lighting Type */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="surfaceType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Surface Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select surface" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {surfaceTypes.map((type) => (
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
          <FormField
            control={form.control}
            name="lightingType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lighting Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select lighting" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {lightingTypes.map((type) => (
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

        <Separator />

        {/* Access & Features */}
        <div className="space-y-2">
          <FormLabel className="text-base">Access & Features</FormLabel>
          <div className="grid grid-cols-2 gap-4">
            {[
              { name: "hasElevator", label: "Has Elevator" },
              { name: "hasStairs", label: "Has Stairs" },
              { name: "hasVehicleLift", label: "Vehicle Lift" },
              { name: "hasFireSafety", label: "Fire Safety" },
              { name: "hasSprinklerSystem", label: "Sprinkler System" },
            ].map(({ name, label }) => (
              <FormField
                key={name}
                control={form.control}
                name={name as keyof AddLevelData} // Type assertion for checkbox fields
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
            onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button type="submit" onClick={() => onSubmit(form.getValues())}>
            Add Level
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
