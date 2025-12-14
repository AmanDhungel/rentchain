import { Input } from "../../../ui/input";
import { Label } from "../../../ui/label";
import { Checkbox } from "../../../ui/checkbox";
import { Button } from "../../../ui/button";
import { useFormContext } from "react-hook-form";

export default function StepPropertyDetails({
  onPrev,
  onNext,
}: {
  onPrev: () => void;
  onNext: () => void;
}) {
  const { register } = useFormContext();

  return (
    <div>
      <div className="grid grid-cols-1 gap-4">
        <h1 className="text-lg font-medium">Room Attributes</h1>
        <div className="space-y-2">
          <Label>Room Size (sq ft)*</Label>
          <Input {...register("roomSize")} placeholder="e.g., 150" />
        </div>
        <div className="space-y-2">
          <Label>Bed Type</Label>
          <Input
            {...register("bedType")}
            placeholder="e.g., Single, Double Queen"
            className="w-full"
          />
        </div>
        <div className="flex flex-col gap-2 mt-4">
          <Label>Features</Label>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Checkbox {...register("attachedBathroom")} />
              <span>Attached Bathroom</span>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox {...register("airConditioning")} />
              <span>Air Conditioning</span>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox {...register("furnished")} />
              <span>Furnished</span>
            </div>
          </div>
        </div>
        <div className="space-y-3 mt-2 mb-6">
          <Label>Floor Number</Label>
          <Input {...register("floorNumber")} placeholder="e.g., 2" />
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <Button className="bg-[#6B7280] text-white " onClick={onPrev}>
          ← Previous
        </Button>
        <Button onClick={onNext} className="bg-orange-500 hover:bg-orange-600">
          Next →
        </Button>
      </div>
    </div>
  );
}
