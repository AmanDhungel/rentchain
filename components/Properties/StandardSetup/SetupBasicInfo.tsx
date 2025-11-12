import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../ui/select";
import { Label } from "../../ui/label";
import { Button } from "../../ui/button";
import { useFormContext } from "react-hook-form";
import { useState } from "react";

export default function StepBasicInfo({ onNext }: { onNext: () => void }) {
  const { register, setValue, watch } = useFormContext();

  const [isError, setIsError] = useState(false);

  console.log(watch());

  const handleOnNext = () => {
    if (!watch("propertyName")) {
      setIsError(true);
    } else {
      onNext();
    }
  };

  return (
    <div>
      {isError && (
        <p className="text-red-500 mb-4">
          Please fill all the required fields. *
        </p>
      )}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Property Name*</Label>
          <Input
            {...register("propertyName")}
            placeholder="e.g., Sunset Towers"
            className="w-full mt-2 border-none bg-[#F6F9FF] "
          />
        </div>
        <div>
          <Label>Property Status</Label>
          <Select onValueChange={(v) => setValue("propertyStatus", v)}>
            <SelectTrigger className="w-full mt-2 border-none bg-[#F6F9FF]">
              <SelectValue
                placeholder="Select status"
                className="placeholder:text-black text-black"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Property Code</Label>
          <Input
            {...register("propertyCode")}
            placeholder="e.g., ST001"
            className="w-full mt-2 border-none bg-[#F6F9FF] "
          />
        </div>
        <div className="col-span-1 row-span-2">
          <Label>Property Description</Label>
          <Textarea
            {...register("propertyDescription")}
            placeholder="Describe the property features, location benefits, etc."
            className="h-[84%] mt-2 border-none bg-[#F6F9FF]"
          />
        </div>
        <div>
          <Label>Property Type</Label>
          <Select
            onValueChange={(v) => setValue("propertyType", v)}
            defaultValue={watch("propertyType")}>
            <SelectTrigger className="w-full mt-2 border-none bg-[#F6F9FF] placeholder:text-black text-black">
              <SelectValue placeholder="Select property type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Apartment">Apartment</SelectItem>
              <SelectItem value="House">House</SelectItem>
              <SelectItem value="Villa">Villa</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex justify-end mt-6">
        <Button
          onClick={handleOnNext}
          className="bg-orange-500 hover:bg-orange-600">
          Next →
        </Button>
      </div>

      <div className="border border-black rounded-md bg-[#FFF2F2] p-6 mt-6">
        <h1 className="text-lg mb-2 font-bold">Quick Setup:</h1>
        <p className="text-[15px] font-[400]">
          This streamlined flow includes only the essential steps. You can
          always add more details like ownership management, detailed floor
          plans, utilities, and advanced features later from the property
          management section.
        </p>
      </div>
    </div>
  );
}
