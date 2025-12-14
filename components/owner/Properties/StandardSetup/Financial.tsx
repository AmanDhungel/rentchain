import { useFormContext } from "react-hook-form";
import { Label } from "../../../ui/label";
import { Input } from "../../../ui/input";
import { Calendar } from "../../../ui/calendar";
import { Button } from "../../../ui/button";

interface FinancialProps {
  acquisitionDate?: string;
  propertyValuation: number;
  monthlyTargetRevenue: number;
}
const Financial = () => {
  const { register } = useFormContext<FinancialProps>();
  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <Label>Acquisition Date</Label>
        <Input
          type="date"
          {...register("acquisitionDate")}
          placeholder="e.g INS-123456"
        />
      </div>
      <div className="space-y-4">
        <Label>Property Valuation</Label>
        <Input {...register("propertyValuation")} placeholder="e.g 500000" />
      </div>
      <div className="space-y-4">
        <Label>Monthly Target Revenue</Label>
        <Input {...register("monthlyTargetRevenue")} placeholder="e.g e02500" />
      </div>
    </div>
  );
};

export default Financial;
