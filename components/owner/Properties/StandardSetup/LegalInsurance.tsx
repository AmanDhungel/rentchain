import { useFormContext } from "react-hook-form";
import { Label } from "../../../ui/label";
import { Input } from "../../../ui/input";
import { Button } from "../../../ui/button";

interface FinancialProps {
  insurancePolicyNumber: string;
  insuranceExpiryDate: Date;
  permitNumber: string;
  permitExpiryDate: Date;
  TaxZoneCode: string;
}
const LegalInsurance = () => {
  const { register } = useFormContext<FinancialProps>();
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2">
        <Label>Insurance Policy Number</Label>
        <Input
          {...register("insurancePolicyNumber")}
          placeholder="e.g 500000"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label>Insurance Expiry Date</Label>
        <Input
          type="date"
          {...register("insuranceExpiryDate")}
          placeholder="e.g INS-123456"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label>Permit/License Number</Label>
        <Input {...register("permitNumber")} placeholder="e.g 500000" />
      </div>
      <div className="flex flex-col gap-2">
        <Label>Permit Expiry Date</Label>
        <Input
          type="date"
          {...register("permitExpiryDate")}
          placeholder="e.g INS-123456"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label>Tax Zone Code</Label>
        <Input {...register("TaxZoneCode")} placeholder="e.g e02500" />
      </div>
    </div>
  );
};

export default LegalInsurance;
