import { useFormContext } from "react-hook-form";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";

interface FinancialProps {
  insurancePolicyNumber: string;
  insuranceExpiryDate: Date;
  permitNumber: string;
  permitExpiryDate: Date;
  TaxZoneCode: string;
}
const LegalInsurance = ({
  onPrev,
  onNext,
}: {
  onPrev?: () => void;
  onNext: () => void;
}) => {
  const { register } = useFormContext<FinancialProps>();
  return (
    <div className="space-y-2">
      <div className="flex flex-col gap-4">
        <Label>Insurance Policy Number</Label>
        <Input
          {...register("insurancePolicyNumber")}
          placeholder="e.g 500000"
        />
      </div>
      <div className="flex flex-col gap-4">
        <Label>Insurance Expiry Date</Label>
        <Input
          type="date"
          {...register("insuranceExpiryDate")}
          placeholder="e.g INS-123456"
        />
      </div>
      <div className="flex flex-col gap-4">
        <Label>Permit/License Number</Label>
        <Input {...register("permitExpiryDate")} placeholder="e.g 500000" />
      </div>
      <div className="flex flex-col gap-4">
        <Label>Tax Zone Code</Label>
        <Input {...register("TaxZoneCode")} placeholder="e.g e02500" />
      </div>

      <div className="flex items-center justify-between mt-6">
        <Button variant="outline" onClick={onPrev} type="button">
          Previous
        </Button>

        <div className="flex items-center gap-3">
          <Button onClick={onNext}>Next →</Button>
        </div>
      </div>
    </div>
  );
};

export default LegalInsurance;
