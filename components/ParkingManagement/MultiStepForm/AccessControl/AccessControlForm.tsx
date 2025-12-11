import { useForm, Controller, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronDown } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

// Local imports
import {
  accessControlSchema,
  AccessControlFormValues,
} from "./AccessControl.type";
import { ACCESS_METHODS, SECURITY_LEVELS, AccessMethodId } from "./data";

interface AccessMethodCardProps {
  method: (typeof ACCESS_METHODS)[number];
  isSelected: boolean;
  onClick: () => void;
}

const AccessMethodCard: React.FC<AccessMethodCardProps> = ({
  method,
  isSelected,
  onClick,
}) => {
  const Icon = method.icon;
  const selectedClass = isSelected
    ? "bg-orange-50 border-orange-500 text-orange-600 ring-2 ring-orange-500"
    : "hover:bg-gray-50 border-gray-200 text-gray-700";

  return (
    <Card
      onClick={onClick}
      className={`relative flex flex-col items-center justify-center p-4 cursor-pointer transition-all duration-200 ${selectedClass}`}>
      <Icon className="w-8 h-8 mb-2" />
      <p className="text-sm font-medium text-center">{method.label}</p>
      {isSelected && (
        <Check className="absolute top-1 right-1 w-4 h-4 text-orange-600" />
      )}
    </Card>
  );
};

const AccessControlForm = () => {
  const form = useFormContext<AccessControlFormValues>();

  const { watch, setValue } = form;

  const selectedMethods = watch("access_methods") ?? [];

  const handleCardClick = (id: AccessMethodId) => {
    const isSelected = selectedMethods.includes(id);
    const newSelection = isSelected
      ? selectedMethods.filter((method) => method !== id) // Deselect
      : [...selectedMethods, id]; // Select

    setValue("access_methods", newSelection, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const onSubmit = (data: AccessControlFormValues) => {
    console.log("Access Control Configuration Submitted:", data);
  };

  return (
    <div className="mx-auto p-8 border mt-4 rounded-sm  bg-white">
      <h2 className="text-xl font-semibold mb-6">Access Control System</h2>

      <>
        <FormField
          control={form.control}
          name="access_methods"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium">
                Access Method *
              </FormLabel>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2">
                {ACCESS_METHODS.map((method) => (
                  <AccessMethodCard
                    key={method.id}
                    method={method}
                    isSelected={
                      selectedMethods?.includes(method.id) ? true : false
                    }
                    onClick={() => handleCardClick(method.id)}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* --- Security Level and Number of Cameras (Side-by-Side) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {/* Security Level Dropdown */}
          <FormField
            control={form.control}
            name="security_level"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">
                  Security Level
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Select a security level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {SECURITY_LEVELS.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        <div className="flex items-center">
                          <level.icon className="mr-2 h-4 w-4" />
                          {level.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Number of Cameras Input */}
          <FormField
            control={form.control}
            name="number_of_cameras"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">
                  Number of Cameras
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., 15"
                    type="number"
                    {...field}
                    onChange={(e) => {
                      // Ensure input is coerced to a number for RHF/Zod
                      field.onChange(
                        e.target.value ? parseInt(e.target.value) : undefined
                      );
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* --- Security Features (Checkboxes) --- */}
        <div className="mt-4">
          <Separator />
          <FormLabel className="text-base font-medium mb-4 block">
            Security Features
          </FormLabel>
          <div className="space-y-3">
            {/* Entry/Exit Barriers Checkbox */}
            <FormField
              control={form.control}
              name="security_features.entry_exit_barriers"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="leading-none pt-0.5">
                    <FormLabel className="font-normal cursor-pointer">
                      Entry/Exit Barriers
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />

            {/* Security Guard Checkbox */}
            <FormField
              control={form.control}
              name="security_features.security_guard_on_duty"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="leading-none pt-0.5">
                    <FormLabel className="font-normal cursor-pointer">
                      Security Guard on Duty
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />

            {/* Emergency Access System Checkbox */}
            <FormField
              control={form.control}
              name="security_features.emergency_access_system"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="leading-none pt-0.5">
                    <FormLabel className="font-normal cursor-pointer">
                      Emergency Access System
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
          </div>
        </div>
      </>
    </div>
  );
};

export default AccessControlForm;
