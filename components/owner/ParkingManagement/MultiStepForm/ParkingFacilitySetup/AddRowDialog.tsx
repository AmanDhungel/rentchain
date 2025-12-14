// src/components/forms/AddRowDialog.tsx
import React, { useState } from "react";
import { useForm, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RowSchema, AddRowData } from "./Facility.types";
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

interface AddRowDialogProps {
  children: React.ReactNode;
  levelId: string;
  zoneId: string;
}

const orientationTypes = ["Perpendicular", "Angled", "Parallel"];

export const AddRowDialog: React.FC<AddRowDialogProps> = ({
  children,
  levelId,
  zoneId,
}) => {
  const [open, setOpen] = useState(false);
  const { addRow } = useParking();

  const form = useFormContext<AddRowData>();

  const onSubmit = (data: AddRowData) => {
    // We only pass the required data; spaces array is handled in the context.
    console.log(data);
    try {
      addRow(levelId, zoneId, data);
    } catch (error) {
    } finally {
      form.reset();
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Parking Row</DialogTitle>
          <div className="text-sm text-muted-foreground">
            Adding row to Level ID: {levelId} / Zone ID: {zoneId}
          </div>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="rowName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Row Name*</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Row A" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rowCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Row Code*</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., RA" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="parkingOrientation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Parking Orientation</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select orientation" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {orientationTypes.map((type) => (
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

        {/* Dimensions */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="spacingWidth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Spacing Width (m)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="2.5"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="aisleWidth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Aisle Width (m)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="5.5"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button type="submit" onClick={() => onSubmit(form.getValues())}>
            Add Row
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
