import { useFieldArray, useFormContext } from "react-hook-form";

import { Input } from "../../../ui/input";
import { Label } from "../../../ui/label";
import { Button } from "../../../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../ui/select";

type CustomAttr = {
  id?: string;
  title: string;
  type: "text" | "number" | "boolean";
  value: string;
  completed?: boolean;
};

type FormValues = {
  totalUnits?: string;
  totalFloors?: string;
  yearBuilt?: string;
  lotSize?: string;
  parkingSpaces?: string;
  elevators?: string;
  customAttributes: CustomAttr[];
};

export default function BuildingPropertyDetailsStep({
  onPrev,
  onNext,
}: {
  defaultValues?: Partial<FormValues>;
  onPrev?: () => void;
  onNext: () => void;
}) {
  const { register, control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "customAttributes",
  });

  const addAttribute = () => {
    append({ title: "", type: "text", value: "", completed: false });
  };

  return (
    <>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800">
          Property Details
        </h3>
        <p className="text-sm text-gray-500">
          Configure apartment specific attributes
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h1 className="text-[17.5px] font-medium text-gray-700 mb-3">
            Building Attributes
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label>Total Units *</Label>
              <Select {...register("totalUnits")}>
                <SelectTrigger className="w-full border-none rounded-md bg-[#F6F9FF] ">
                  <SelectValue placeholder="e.g. 150" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                  <SelectItem value="150">150</SelectItem>
                  <SelectItem value="200">200</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Total Floors *</Label>
              <Input {...register("totalFloors")} placeholder="e.g. 10" />
            </div>

            <div className="space-y-2">
              <Label>Year Built</Label>
              <Input {...register("yearBuilt")} placeholder="e.g., 2020" />
            </div>

            <div className="space-y-2">
              <Label>Lot Size (sq ft)</Label>
              <Input {...register("lotSize")} placeholder="e.g., 5000" />
            </div>

            <div className="space-y-2">
              <Label>Parking Spaces</Label>
              <Input {...register("parkingSpaces")} placeholder="e.g., 50" />
            </div>

            <div className="space-y-2">
              <Label>Number of Elevators</Label>
              <Input {...register("elevators")} placeholder="e.g., 5" />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t" />

        <div>
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-sm font-medium text-gray-700">
                Custom Building Attributes
              </div>
              <p className="text-xs text-gray-400">
                Add custom attributes specific to your building
              </p>
            </div>
            <div>
              <Button
                type="button"
                onClick={addAttribute}
                className="bg-orange-500 text-white">
                Add Attribute
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <div className="grid grid-cols-12 gap-3 items-center text-xs text-gray-500 bg-gray-50 p-3 rounded">
              <div className="col-span-5 font-medium">Attribute Title</div>
              <div className="col-span-4 font-medium">Content Type</div>
              <div className="col-span-2 font-medium">Value</div>
              <div className="col-span-1 font-medium text-right">Actions</div>
            </div>

            {fields.length === 0 && (
              <div className="p-4 border rounded text-sm text-blue-700 bg-blue-50">
                No custom attributes added yet. Fill in the attribute details
                above to see them listed here.
              </div>
            )}

            {fields.map((f, idx) => (
              <div key={f.id} className="grid grid-cols-12 gap-3 items-center">
                <div className="col-span-5">
                  <Input
                    {...register(`customAttributes.${idx}.title` as const)}
                    placeholder="e.g., Building Age"
                  />
                </div>
                <div className="col-span-4">
                  <select
                    className="h-10 w-full rounded border px-2"
                    {...register(`customAttributes.${idx}.type` as const)}>
                    <option value="text">Text</option>
                    <option value="number">Number</option>
                    <option value="boolean">Boolean</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <Input
                    {...register(`customAttributes.${idx}.value` as const)}
                    placeholder="Enter value..."
                  />
                </div>
                <div className="col-span-1 text-right">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => remove(idx)}>
                    Remove
                  </Button>
                </div>
              </div>
            ))}

            {fields.length > 0 && (
              <div className="p-3 border rounded text-sm">
                <div className="font-medium mb-2">
                  {fields.length} custom attribute{fields.length > 1 ? "s" : ""}{" "}
                  added
                </div>
                <div className="text-xs text-gray-500">
                  No completed attributes yet. Fill in the attribute details
                  above to see them listed here.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-6">
        <Button variant="ghost" type="button" onClick={onPrev}>
          Previous
        </Button>

        <div className="flex items-center gap-3">
          <Button className="bg-orange-500 text-white" onClick={onNext}>
            Next →
          </Button>
        </div>
      </div>
    </>
  );
}
