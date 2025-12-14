"use client";

import { useFormContext, Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../ui/select";
import { Checkbox } from "../../../ui/checkbox";
import { Button } from "../../../ui/button";
import { Switch } from "../../../ui/switch";
import { CalendarIcon, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../../../ui/popover";
import { format } from "date-fns";
import { Calendar } from "../../../ui/calendar";
import { cn } from "../../../../lib/utils";

type PublishingFormValues = {
  status: string;
  channels: string[];
  availableFrom: Date | null;
  availableTo: Date | null;
  features: {
    instantBooking: boolean;
    virtualTours: boolean;
    contactInfo: boolean;
    autoRenewal: boolean;
    internalOnly: boolean;
  };
  amenities: string[];
};

const predefinedAmenities = [
  "WiFi",
  "Parking",
  "Pool",
  "Air Conditioning",
  "Gym",
  "Pet Friendly",
  "Breakfast Included",
];

export default function StepPublishing({
  onNext,
  onPrev,
}: {
  onNext: () => void;
  onPrev: () => void;
}) {
  const { control, watch, setValue } = useFormContext<PublishingFormValues>();
  const publishingamenities = watch("publishingAmenities") || [];
  const channels = watch("channels") || [];

  const toggleAmenity = (amenity: string) => {
    const current = watch("amenities") || [];
    if (current.includes(amenity)) {
      setValue(
        "amenities",
        current.filter((a) => a !== amenity),
        { shouldDirty: true, shouldValidate: true }
      );
    } else {
      setValue("amenities", [...current, amenity], {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
  };

  const clearDate = (fieldName: "availableFrom" | "availableTo") => {
    setValue(fieldName, null, { shouldDirty: true, shouldValidate: true });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      {/* PUBLISHING STATUS */}
      <div>
        <h3 className="text-sm font-medium text-gray-800 mb-1">
          Publishing Status
        </h3>
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>

      <div className="mt-6">
        <h3 className="text-sm font-medium text-gray-800 mb-2">
          Publishing Channels
        </h3>
        <p className="text-xs text-gray-500 mb-3">
          Select one or more channels where your property will be published
        </p>

        <Controller
          name="channels"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col gap-3">
              {[
                { label: "RentChain Platform", value: "platform" },
                { label: "Partner Portal", value: "partner" },
                { label: "Internal Only", value: "internal" },
              ].map((ch) => (
                <label key={ch.value} className="flex items-center gap-3">
                  <Checkbox
                    checked={field.value?.includes(ch.value) || false}
                    onCheckedChange={(checked) => {
                      const currentValue = field.value || [];
                      if (checked) {
                        field.onChange([...currentValue, ch.value]);
                      } else {
                        field.onChange(
                          currentValue.filter((v: string) => v !== ch.value)
                        );
                      }
                    }}
                  />
                  <span className="text-sm">{ch.label}</span>
                </label>
              ))}
            </div>
          )}
        />
      </div>

      {/* AVAILABLE DATES */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {["availableFrom", "availableTo"].map((fieldName) => (
          <Controller
            key={fieldName}
            name={fieldName as "availableFrom" | "availableTo"}
            control={control}
            render={({ field }) => (
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">
                  {fieldName === "availableFrom"
                    ? "Available From"
                    : "Available To"}
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <div className="relative">
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-between text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}>
                        <X
                          className="h-4 w-4 mr-2 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            clearDate(
                              fieldName as "availableFrom" | "availableTo"
                            );
                          }}
                        />
                        <span>
                          {field.value
                            ? format(field.value, "MM/dd/yyyy")
                            : "Pick date"}
                        </span>
                        <CalendarIcon className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent align="start" className="p-0">
                    <Calendar
                      mode="single"
                      selected={field.value ?? undefined}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            )}
          />
        ))}
      </div>

      {/* FEATURES */}
      <div className="mt-8">
        <h3 className="text-sm font-medium text-gray-800 mb-2">
          Publishing Features
        </h3>

        <div className="space-y-3">
          {[
            { key: "instantBooking", label: "Instant Booking" },
            { key: "virtualTours", label: "Virtual Tours Enabled" },
            { key: "contactInfo", label: "Contact Info Visible" },
            { key: "autoRenewal", label: "Auto Renewal" },
            { key: "internalOnly", label: "Internal Only" },
          ].map((feat) => (
            <Controller
              key={feat.key}
              name={`features.${feat.key}` as const}
              control={control}
              render={({ field }) => (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">{feat.label}</span>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </div>
              )}
            />
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-sm font-medium text-gray-800 mb-2">Amenities</h3>
        <p className="text-xs text-gray-500 mb-3">Select property amenities</p>

        <div className="flex flex-wrap gap-2">
          {predefinedAmenities.map((amenity) => (
            <button
              key={amenity}
              type="button"
              onClick={() => toggleAmenity(amenity)}
              className={cn(
                "px-3 py-1 rounded-full border text-sm",
                publishingamenities.includes(amenity)
                  ? "bg-gray-800 text-white border-gray-800"
                  : "bg-white text-gray-700 border-gray-300"
              )}>
              {amenity}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {publishingamenities.length === 0 && (
            <span className="text-sm text-gray-400">No amenities selected</span>
          )}
          {publishingamenities.map((label) => (
            <div
              key={label}
              className="flex items-center gap-2 bg-gray-800 text-white px-3 py-1 rounded-full text-sm">
              <span>{label}</span>
              <button
                type="button"
                onClick={() => toggleAmenity(label)}
                className="text-white/70 hover:text-white">
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex justify-between ">
        <Button variant="outline" onClick={onPrev}>
          ← Previous
        </Button>
        <Button
          className="bg-orange-500 hover:bg-orange-600 text-white"
          onClick={onNext}>
          Next →
        </Button>
      </div>
    </div>
  );
}
