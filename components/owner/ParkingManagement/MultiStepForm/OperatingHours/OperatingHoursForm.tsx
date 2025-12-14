import { Switch } from "@/components/ui/switch";
import { useForm, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";

// shadcn/ui imports
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

// Local imports
import {
  operatingHoursSchema,
  OperatingHoursFormValues,
} from "./OperatingHours.types";
import { dayKeys, defaultOperatingHours, DayKey } from "./data";

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const OperatingHoursForm = () => {
  const form = useFormContext<OperatingHoursFormValues>();

  const { watch, setValue } = form;

  const is247 = watch("is247");

  const onSubmit = (data: OperatingHoursFormValues) => {
    console.log("Form submitted with:", data);
  };

  const handle247Toggle = (checked: boolean) => {
    setValue("is247", checked);
    if (checked) {
      dayKeys.forEach((day: DayKey) => {
        setValue(`days.${day}.checked`, true);
        setValue(`days.${day}.open`, "00:00");
        setValue(`days.${day}.close`, "23:59");
      });
    }
  };

  return (
    <div className="my-4 mx-auto p-8  bg-white">
      <h2 className="text-2xl font-semibold mb-6">Operating Hours</h2>

      <>
        <div className="flex items-center space-x-4   pb-4">
          <FormField
            control={form.control}
            name="is247"
            render={({ field }) => (
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={handle247Toggle}
                  id="247-switch"
                  className="-mt-2"
                />
              </FormControl>
            )}
          />
          <FormLabel className="text-lg font-medium">24/7 Operation</FormLabel>
        </div>
        <Separator />

        <div className="grid grid-cols-7 gap-4 text-sm font-medium text-gray-500 py-2 border-b">
          <div className="col-span-2">Day</div>
          <div className="col-span-2">Open</div>
          <div className="col-span-2">Close</div>
          <div className="col-span-1"></div>{" "}
        </div>

        {dayKeys.map((day: DayKey) => {
          const isDayChecked = watch(`days.${day}.checked`);

          return (
            <div key={day} className="grid grid-cols-7 gap-4 items-center py-2">
              <div className="col-span-2 flex items-center space-x-3">
                <FormField
                  control={form.control}
                  name={`days.${day}.checked`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={is247}
                          id={day}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormLabel
                  htmlFor={day}
                  className="text-base font-normal cursor-pointer mt-2.5">
                  {capitalize(day)}
                </FormLabel>
              </div>

              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name={`days.${day}.open`}
                  render={({ field }) => (
                    <FormItem>
                      <Input
                        {...field}
                        type="time" // HTML type for time input
                        disabled={!isDayChecked || is247}
                        className="pl-8"
                      />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name={`days.${day}.close`}
                  render={({ field }) => (
                    <FormItem>
                      <Input
                        {...field}
                        type="time" // HTML type for time input
                        disabled={!isDayChecked || is247}
                        className="pl-8"
                      />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-1 flex items-center justify-center"></div>
            </div>
          );
        })}

        <Separator className="mt-6" />
      </>
    </div>
  );
};

export default OperatingHoursForm;
