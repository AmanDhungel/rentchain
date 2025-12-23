import { useFormContext } from "react-hook-form";
import { Label } from "@/components/ui";
import { Textarea } from "@/components/ui/textarea";
import { InputWithLabel } from "./AddOccupantDialog";

const EmergencyHealthStep = () => {
  const { register } = useFormContext();
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="space-y-4 p-4 border rounded-lg">
        <h3 className="font-bold text-slate-800">
          Emergency Contact Information
        </h3>
        <InputWithLabel
          label="Emergency Contact Name *"
          placeholder="Full name"
          {...register("emergencyName")}
        />
        <div className="grid grid-cols-2 gap-4">
          <InputWithLabel
            label="Relationship *"
            placeholder="Relationship to occupant"
            {...register("emergencyRelation")}
          />
          <InputWithLabel
            label="Phone Number *"
            placeholder="Enter phone number"
            {...register("emergencyPhone")}
          />
        </div>
        <InputWithLabel
          label="Address"
          placeholder="Emergency contact address"
          {...register("emergencyAddress")}
        />
      </div>

      <div className="space-y-4 p-4 border rounded-lg">
        <h3 className="font-bold text-slate-800">
          Health & Special Requirements
        </h3>
        <div className="space-y-2">
          <Label className="font-bold text-slate-700">Medical Conditions</Label>
          <Textarea
            placeholder="Any medical conditions or allergies..."
            className="bg-blue-50/30 border-blue-100"
            {...register("medicalConditions")}
          />
        </div>
        <div className="space-y-2">
          <Label className="font-bold text-slate-700">
            Special Requirements
          </Label>
          <Textarea
            placeholder="Any special accommodations needed..."
            className="bg-blue-50/30 border-blue-100"
            {...register("specialRequirements")}
          />
        </div>
      </div>
    </div>
  );
};

export default EmergencyHealthStep;
