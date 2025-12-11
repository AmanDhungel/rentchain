import { useForm, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Check,
  Building,
  Car,
  Home,
  Factory,
  Warehouse,
  Globe,
  Zap,
  Network,
  ParkingSquare,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";

import { facilityFormSchema, FacilityFormValues } from "./Parking.types";

interface FacilityOption {
  value: FacilityFormValues["facilityType"];
  label: string;
  icon: React.ElementType;
}

const facilityTypes: FacilityOption[] = [
  {
    value: "Multi-Storey Building",
    label: "Multi-Storey Building",
    icon: Building,
  },
  { value: "Hydraulic/Automated", label: "Hydraulic/Automated", icon: Zap },
  { value: "Surface Parking", label: "Surface Parking", icon: ParkingSquare },
  { value: "Underground Garage", label: "Underground Garage", icon: Warehouse },
  { value: "Covered Parking", label: "Covered Parking", icon: Home },
  { value: "Open Air Parking", label: "Open Air Parking", icon: Globe },
  { value: "Mechanical System", label: "Mechanical System", icon: Network },
];

interface OwnershipOption {
  value: FacilityFormValues["ownershipModel"];
  label: string;
  description: string;
}

const ownershipModels: OwnershipOption[] = [
  {
    value: "Building Owned",
    label: "Building Owned",
    description: "Parking owned by the building management",
  },
  {
    value: "Service Purchased",
    label: "Service Purchased",
    description: "Parking service purchased from external provider",
  },
  {
    value: "Separate Facility",
    label: "Separate Facility",
    description: "Independent parking facility",
  },
  {
    value: "Co-Owned",
    label: "Co-Owned",
    description: "Shared ownership model",
  },
];

interface FacilityTypeCardProps extends FacilityOption {
  onSelect: (value: FacilityFormValues["facilityType"]) => void;
  isSelected: boolean;
}

const FacilityTypeCard: React.FC<FacilityTypeCardProps> = ({
  value,
  label,
  icon: Icon,
  onSelect,
  isSelected,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer transition-all h-28 w-full relative",
        isSelected
          ? "border-orange-500 bg-orange-50 text-orange-700 shadow-md ring-2 ring-orange-500"
          : "border-gray-200 hover:border-gray-400 bg-white"
      )}
      onClick={() => onSelect(value)}>
      <Icon className="w-6 h-6 mb-2" />
      <span className="text-sm font-medium text-center">{label}</span>
      {isSelected && (
        <div className="absolute top-2 right-2 rounded-full bg-orange-500 p-0.5 shadow-sm">
          <Check className="w-3 h-3 text-white" />
        </div>
      )}
    </div>
  );
};

interface OwnershipModelCardProps extends OwnershipOption {
  onSelect: (value: FacilityFormValues["ownershipModel"]) => void;
  isSelected: boolean;
}

const OwnershipModelCard: React.FC<OwnershipModelCardProps> = ({
  value,
  label,
  description,
  onSelect,
  isSelected,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col p-4 border rounded-lg cursor-pointer transition-all w-full relative",
        isSelected
          ? "border-orange-500 bg-orange-500 text-white shadow-lg"
          : "border-gray-200 hover:border-gray-400 bg-white"
      )}
      onClick={() => onSelect(value)}>
      <div className="flex items-center justify-between">
        <div className="flex flex-col text-left">
          <span
            className={cn(
              "text-base font-semibold",
              isSelected ? "text-white" : "text-gray-900"
            )}>
            {label}
          </span>
          <span
            className={cn(
              "text-sm",
              isSelected ? "text-orange-200" : "text-gray-500"
            )}>
            {description}
          </span>
        </div>
        <div
          className={cn(
            "w-5 h-5 rounded-sm border flex items-center justify-center transition-colors shrink-0 ml-4", // Added shrink-0 to prevent button collapse
            isSelected
              ? "border-white bg-white"
              : "border-gray-300 bg-transparent"
          )}>
          {isSelected && <Check className="w-3 h-3 text-orange-500" />}
        </div>
      </div>
    </div>
  );
};

export function FacilityForm() {
  const form = useFormContext<FacilityFormValues>();

  function onSubmit(data: FacilityFormValues) {
    console.log("Form Submitted:", data);
  }

  return (
    <>
      <Card className="p-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Basic Information
        </h3>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="facilityName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Facility Name *</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Plaza Tower Parking" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="facilityCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Facility Code *</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., PLAZA-PARK-01" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Brief description of the parking facility"
                  className="resize-none min-h-[80px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </Card>

      <Card className="p-6 space-y-6">
        <h3 className="text-lg font-semibold text-gray-800">
          Facility Type & Ownership
        </h3>
        <FormField
          control={form.control}
          name="facilityType"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-base">Facility Type *</FormLabel>
              <div className="grid grid-cols-3 gap-3">
                {facilityTypes.map((type) => (
                  <FacilityTypeCard
                    key={type.value}
                    {...type}
                    onSelect={(selectedValue) => field.onChange(selectedValue)}
                    isSelected={field.value === type.value}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="pt-2"></div> {/* Visual separation */}
        {/* Ownership Model Selection (Stack) */}
        <FormField
          control={form.control}
          name="ownershipModel"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-base">Ownership Model *</FormLabel>
              <div className="space-y-2">
                {ownershipModels.map((model) => (
                  <OwnershipModelCard
                    key={model.value}
                    {...model}
                    onSelect={(selectedValue) => field.onChange(selectedValue)}
                    isSelected={field.value === model.value}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </Card>
    </>
  );
}
