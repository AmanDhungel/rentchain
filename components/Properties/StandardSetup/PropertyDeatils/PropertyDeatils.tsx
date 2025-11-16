import { useEffect } from "react";
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
import { Checkbox } from "../../../ui/checkbox";
import { icons } from "../../../../assets/icons/exports";
import Image from "next/image";

type CustomAttr = {
  id?: string;
  title: string;
  type: "text" | "number" | "boolean";
  value: string;
  completed?: boolean;
};

type FormValues = {
  roomsize?: string;
  bedType?: string;
  attachedBathroom?: boolean;
  airConditioning?: boolean;
  furnished?: boolean;
  floorNumber?: number;
  customAttributes: CustomAttr[];
};

export default function PropertyDetailsStep({
  onPrev,
  onNext,
}: {
  defaultValues?: Partial<FormValues>;
  onPrev?: () => void;
  onNext: (data: FormValues) => void;
}) {
  const { register, control, handleSubmit, reset, watch } =
    useFormContext<FormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "customAttributes",
  });

  // load saved draft from localStorage (if present)
  useEffect(() => {
    try {
      const raw = localStorage.getItem("property_details_step");
      if (raw) reset(JSON.parse(raw));
    } catch (e) {
      // ignore
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const watched = watch();
  useEffect(() => {
    try {
      localStorage.setItem("property_details_step", JSON.stringify(watched));
    } catch (e) {
      // ignore
    }
  }, [watched]);

  const onSubmit = (data: FormValues) => {
    try {
      localStorage.setItem("property_details_step", JSON.stringify(data));
    } catch (e) {
      // ignore
    }
    onNext(data);
  };

  const addAttribute = () => {
    append({ title: "", type: "text", value: "", completed: false });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto bg-white p-6 rounded-md ">
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
            Room Attributes
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4 ">
            <div className="space-y-2">
              <Label>Room Size (sq ft) *</Label>
              <Select {...register("roomsize")}>
                <SelectTrigger className="w-full border-none rounded-md bg-[#F6F9FF] ">
                  <SelectValue
                    placeholder="e.g. 150"
                    className="placeholder:text-gray-300"
                  />
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
              <Label>Bed Type</Label>
              <Input
                {...register("bedType")}
                placeholder="e.g. Single, Double Queen"
              />
            </div>

            <div className="space-y-4 mb-4">
              <h1 className="text-[17px] font-medium">Attached Bathroom</h1>
              <div className="flex items-center ml-3">
                <Checkbox {...register("attachedBathroom")} className="mr-2" />
                <span className="text-sm font-medium text-gray-700">
                  Attached Bathroom
                </span>
              </div>
            </div>
            <div className="space-y-2 mb-4">
              <h1 className="text-[17px] font-medium">Air Conditioning</h1>
              <div className="flex items-center ml-3">
                <Checkbox {...register("airConditioning")} className="mr-2" />
                <span className="text-sm font-medium text-gray-700">
                  Air Conditioning
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <h1 className="text-[17px] font-medium">Furnished</h1>
              <div className="flex items-center ml-3">
                <Checkbox {...register("furnished")} className="mr-2" />
                <span className="text-sm font-medium text-gray-700">
                  Furnished
                </span>
              </div>
            </div>

            <div className="space-y-2 my-4">
              <Label>Floor Number</Label>
              <Select {...register("floorNumber")}>
                <SelectTrigger className="w-full border-none rounded-md bg-[#F6F9FF] ">
                  <SelectValue
                    placeholder="e.g. 150"
                    className="placeholder:text-gray-300"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="8">8</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="12">12</SelectItem>
                  <SelectItem value="14">14</SelectItem>
                  <SelectItem value="18">18</SelectItem>
                </SelectContent>
              </Select>
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
                <Image
                  alt="roundedIcon"
                  src={icons.RoundedPlusIcon}
                  className="scale-200"
                />{" "}
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
              <div className="p-3 border border-blue-700 rounded text-sm text-blue-700">
                <div className="font-medium mb-2">
                  {fields.length} custom attribute{fields.length > 1 ? "s" : ""}{" "}
                  added
                </div>
                <div className="text-xs text-blue-700">
                  No completed attributes yet. Fill in the attribute details
                  above to see them listed here.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-6">
        <Button variant="outline" type="button" onClick={onPrev}>
          Previous
        </Button>

        <div className="flex items-center gap-3">
          <Button type="submit" className="bg-orange-500 text-white">
            Next →
          </Button>
        </div>
      </div>
    </form>
  );
}
