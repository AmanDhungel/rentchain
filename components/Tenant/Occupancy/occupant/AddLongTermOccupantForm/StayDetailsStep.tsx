import { useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { InputWithLabel } from "./AddOccupantDialog";
import { de } from "zod/v4/locales";

const StayDetailsStep = () => {
  const { register, watch, setValue } = useFormContext();
  const urgency = watch("urgency");

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="space-y-4">
        <h3 className="font-bold text-slate-800">Relationship Details</h3>
        <InputWithLabel
          label="Relationship to Tenant *"
          placeholder="Select relationship"
          {...register("relationship")}
        />
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-slate-800">Stay Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <InputWithLabel
            label="Planned Move-in Date *"
            type="date"
            {...register("moveInDate")}
          />
          <InputWithLabel
            label="Expected Stay Duration"
            placeholder="Select duration"
            {...register("duration")}
          />
        </div>
        <div className="space-y-2">
          <Label className="font-bold text-slate-700">Reason for Stay</Label>
          <Textarea
            placeholder="Brief explanation of why this person will be staying..."
            className="bg-blue-50/30 border-blue-100"
            {...register("reason")}
          />
        </div>
      </div>

      <div className="space-y-4">
        <Label className="font-bold text-slate-700">
          Approval Urgency Level *
        </Label>
        <RadioGroup
          value={urgency}
          onValueChange={(val) => setValue("urgency", val)}
          className="space-y-3">
          {["Low", "Medium", "High"].map((level) => (
            <div
              key={level}
              className={`flex items-center justify-between p-4 border rounded-lg transition-all ${
                urgency === level
                  ? "border-orange-500 bg-orange-50/30"
                  : "border-slate-200"
              }`}>
              <div className="flex items-center gap-3">
                <RadioGroupItem value={level} id={level} />
                <div>
                  <div className="flex items-center gap-2">
                    <Label htmlFor={level} className="font-bold cursor-pointer">
                      {level} Priority
                    </Label>
                    <Badge
                      variant="outline"
                      className={
                        level === "High"
                          ? "text-red-500 border-red-200"
                          : "text-blue-500 border-blue-200"
                      }>
                      {level}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-500">
                    {level === "High"
                      ? "Urgent processing (24-48 hours)"
                      : "Standard processing (5-7 days)"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </RadioGroup>
        <div className="p-3 bg-orange-50 border border-orange-100 rounded text-[11px] text-orange-700">
          Higher urgency levels may require additional documentation and
          justification.
        </div>
      </div>
    </div>
  );
};

export default StayDetailsStep;
