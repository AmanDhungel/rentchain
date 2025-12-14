// src/components/forms/AddSpaceDialog.tsx
import React, { useState } from "react";
import {
  useForm,
  useFieldArray,
  FormProvider,
  useFormContext,
} from "react-hook-form";
import { useParking } from "./ParkingContext";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SingleSpaceSchema,
  BulkAddSchema,
  SingleSpaceData,
  BulkAddData,
  BaseRatesSchema,
  PricingStrategySchema,
} from "./Facility.types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

interface AddSpaceDialogProps {
  children: React.ReactNode;
  levelId: string;
  zoneId: string;
  rowId: string;
}

const spaceTypes = ["Standard", "EV Charging", "Accessible"];

const PricingStrategyFields: React.FC<{ form: any }> = ({ form }) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold">Pricing Strategy</h3>

    <FormField
      control={form.control}
      name="pricingStrategy.description"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Description</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Dynamic Pricing" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="Dynamic Pricing">Dynamic Pricing</SelectItem>
              <SelectItem value="Fixed Pricing">Fixed Pricing</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />

    <h4 className="font-medium mt-4">Base Rates (AED)</h4>
    <div className="grid grid-cols-3 gap-4">
      {["hourly", "daily", "monthly", "quarterly", "yearly"].map((rate) => (
        <FormField
          key={rate}
          control={form.control}
          name={`pricingStrategy.baseRates.${rate}` as const}
          render={({ field }) => (
            <FormItem
              className={
                rate === "quarterly" || rate === "yearly" ? "mt-4" : ""
              }>
              <FormLabel>
                {rate.charAt(0).toUpperCase() + rate.slice(1)} Rate
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
    </div>

    <h4 className="font-medium mt-4">Dynamic Pricing Factors</h4>
    <div className="grid grid-cols-2 gap-4">
      {[
        { name: "peakHours", label: "Peak Hours" },
        { name: "events", label: "Events" },
        { name: "weatherConditions", label: "Weather Conditions" },
        { name: "occupancyRate", label: "Occupancy Rate" },
        { name: "seasonalDemand", label: "Seasonal Demand" },
        { name: "dayOfWeek", label: "Day of Week" },
        { name: "specialOccasions", label: "Special Occasions" },
        { name: "localTraffic", label: "Local Traffic" },
      ].map(({ name, label }) => (
        <FormField
          key={name}
          control={form.control}
          name={`pricingStrategy.dynamicFactors.${name}` as const}
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
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
);

// --- Single Space Form Content ---
const SingleSpaceForm: React.FC<{
  levelId: string;
  zoneId: string;
  rowId: string;
  setOpen: (open: boolean) => void;
}> = ({ levelId, zoneId, rowId, setOpen }) => {
  const { addSingleSpace } = useParking();
  const form = useFormContext<SingleSpaceData>();

  const onSubmit = (data: SingleSpaceData) => {
    addSingleSpace(levelId, zoneId, rowId, data);
    form.reset();
    setOpen(false);
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="spaceNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Space Number *</FormLabel>
              <FormControl>
                <Input placeholder="e.g., A-001" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="spaceType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Space Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {spaceTypes.map((type) => (
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

      {/* Dimensions */}
      <div className="grid grid-cols-3 gap-4">
        {["width", "length", "height"].map((dim) => (
          <FormField
            key={dim}
            control={form.control}
            name={dim as keyof SingleSpaceData}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {dim.charAt(0).toUpperCase() + dim.slice(1)} (m)
                </FormLabel>
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
        ))}
      </div>

      {/* Space Features */}
      <div className="space-y-2">
        <FormLabel className="text-base">Space Features</FormLabel>
        <div className="flex gap-8">
          {[
            { name: "isCovered", label: "Covered" },
            { name: "hasEVCharger", label: "EV Charger" },
            { name: "isAccessible", label: "Accessible" },
          ].map(({ name, label }) => (
            <FormField
              key={name}
              control={form.control}
              name={name as keyof SingleSpaceData}
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

      {/* Note */}
      <FormField
        control={form.control}
        name="note"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Note</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Additional notes or special requirements"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Separator />

      {/* Pricing Strategy */}
      <PricingStrategyFields form={form} />

      {/* Buttons */}
      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button type="submit" onClick={() => onSubmit(form.getValues())}>
          Add Space
        </Button>
      </div>
    </>
  );
};

// --- Bulk Add Form Content ---
const BulkAddForm: React.FC<{
  levelId: string;
  zoneId: string;
  rowId: string;
  setOpen: (open: boolean) => void;
}> = ({ levelId, zoneId, rowId, setOpen }) => {
  // Schema for Bulk Add includes all fields except spaceNumber, plus startingNumber
  const { bulkAddSpaces } = useParking();
  const form = useFormContext<BulkAddData & { count: number }>();

  const onSubmit = (data: BulkAddData & { count: number }) => {
    // Separate count from space data for the bulkAddSpaces handler
    const { count, ...spaceData } = data;
    bulkAddSpaces(levelId, zoneId, rowId, count, spaceData as BulkAddData);
    form.reset();
    setOpen(false);
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        <FormField
          control={form.control}
          name="count"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of Spaces *</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="10"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="startingNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Starting Number</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="10"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="prefix"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prefix (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="e.g., A- or P-" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Space Type */}
      <FormField
        control={form.control}
        name="spaceType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Space Type</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {spaceTypes.map((type) => (
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
      <div className="grid grid-cols-3 gap-4">
        {["width", "length", "height"].map((dim) => (
          <FormField
            key={dim}
            control={form.control}
            name={dim as keyof BulkAddData}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {dim.charAt(0).toUpperCase() + dim.slice(1)} (m)
                </FormLabel>
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
        ))}
      </div>

      {/* Space Features */}
      <div className="space-y-2">
        <FormLabel className="text-base">Common Features</FormLabel>
        <div className="flex gap-8">
          {[
            { name: "isCovered", label: "Covered" },
            { name: "hasEVCharger", label: "EV Charger" },
            { name: "isAccessible", label: "Accessible" },
          ].map(({ name, label }) => (
            <FormField
              key={name}
              control={form.control}
              name={name as keyof BulkAddData}
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

      {/* Note */}
      <FormField
        control={form.control}
        name="note"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Note</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Additional notes or special requirements"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Separator />

      {/* Pricing Strategy */}
      <PricingStrategyFields form={form} />

      {/* Buttons */}
      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button type="submit" onClick={() => onSubmit(form.getValues())}>
          Add {form.getValues("count")} Spaces
        </Button>
      </div>
    </>
  );
};

// --- Main Dialog Component with Tabs ---
export const AddSpaceDialog: React.FC<AddSpaceDialogProps> = ({
  children,
  levelId,
  zoneId,
  rowId,
}) => {
  const [open, setOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState<"single" | "bulk">("single");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Parking Space</DialogTitle>
        </DialogHeader>

        <Tabs
          value={currentTab}
          onValueChange={(value) => setCurrentTab(value as "single" | "bulk")}
          className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="single">Single Space</TabsTrigger>
            <TabsTrigger value="bulk">Bulk Add</TabsTrigger>
          </TabsList>

          <TabsContent value="single" className="mt-4">
            <SingleSpaceForm
              levelId={levelId}
              zoneId={zoneId}
              rowId={rowId}
              setOpen={setOpen}
            />
          </TabsContent>

          <TabsContent value="bulk" className="mt-4">
            <BulkAddForm
              levelId={levelId}
              zoneId={zoneId}
              rowId={rowId}
              setOpen={setOpen}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
