import { useEffect } from "react";
import { useForm, Controller, useFormContext } from "react-hook-form";

import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Button } from "../../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Checkbox } from "../../ui/checkbox";

type FormValues = {
  entityType: string;
  ownershipPercent?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  taxId?: string;
  address?: string;
  city?: string;
  zip?: string;
  managementRights: string[];
  propertyManagerId?: string;
};

export default function PropertyOwnershipStep({
  onPrev,
  onNext,
  defaultValues,
}: {
  onPrev?: () => void;
  onNext: () => void;
  defaultValues?: Partial<FormValues>;
}) {
  const { register, control, watch, reset } = useFormContext();
  useEffect(() => {
    if (defaultValues) reset({ ...defaultValues });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValues]);

  return (
    <>
      {/* Header / stepper */}

      {/* Form fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        <div className="space-y-2">
          <Label>Entity Type</Label>
          <Controller
            control={control}
            name="entityType"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select entity type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Individual">Individual</SelectItem>
                  <SelectItem value="Company">Company</SelectItem>
                  <SelectItem value="Trust">Trust</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div className="space-y-2">
          <Label>Ownership %</Label>
          <Input
            type="text"
            placeholder="e.g. 50"
            {...register("ownershipPercent")}
          />
        </div>

        <div className="space-y-2">
          <Label>First Name *</Label>
          <Input
            {...register("firstName", { required: true })}
            placeholder="John"
          />
        </div>

        <div className="space-y-2">
          <Label>Last Name *</Label>
          <Input
            {...register("lastName", { required: true })}
            placeholder="Doe"
          />
        </div>

        <div className="space-y-2">
          <Label>Email *</Label>
          <Input
            type="email"
            {...register("email", { required: true })}
            placeholder="owner@example.com"
          />
        </div>

        <div className="space-y-2">
          <Label>Phone</Label>
          <Input {...register("phone")} placeholder="98XXXXXXXX" />
        </div>

        <div className="space-y-2">
          <Label>Tax ID / SSN</Label>
          <Input {...register("taxId")} placeholder="XXX-XX-XXXX" />
        </div>

        <div className="space-y-2">
          <Label>Property Manager ID (Optional)</Label>
          <Input
            {...register("propertyManagerId")}
            placeholder="e.g., MGR001"
          />
        </div>

        <div className="md:col-span-1 space-y-2">
          <Label>Address</Label>
          <Input {...register("address")} placeholder="Street Address" />

          <Input {...register("city")} placeholder="City" />
          <Input {...register("zip")} placeholder="ZIP / Postal code" />
        </div>
      </div>

      {/* Management Rights checkboxes */}
      <div className="mt-6">
        <div className="flex flex-col gap-2 text-sm font-medium text-gray-700 mb-3">
          Management Rights
          <span className="text-gray-300">
            Select one or more channels where your property will be published
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-2">
          {[
            { key: "canLease", label: "Can Lease" },
            { key: "canSell", label: "Can Sell" },
            { key: "canModifyProperty", label: "Can Modify Property" },
            { key: "canManageTenants", label: "Can Manage Tenants" },
            { key: "setAsPrimaryOwner", label: "Set as Primary Owner" },
          ].map((opt) => (
            <div key={opt.key} className="flex items-center  gap-2">
              <Controller
                name="managementRights"
                control={control}
                render={({ field }) => {
                  const has = field.value || [];
                  const checked = has.includes(opt.label);
                  return (
                    <Checkbox
                      checked={checked}
                      onCheckedChange={(v) => {
                        let next = Array.isArray(field.value)
                          ? [...field.value]
                          : [];
                        if (v) {
                          next = Array.from(new Set([...next, opt.label]));
                        } else {
                          next = next.filter((i) => i !== opt.label);
                        }
                        field.onChange(next);
                      }}
                    />
                  );
                }}
              />
              <div className="text-sm text-gray-700">{opt.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between mt-6">
        <Button variant="outline" onClick={onPrev} type="button">
          Previous
        </Button>

        <div className="flex items-center gap-3">
          <Button onClick={onNext}>Next →</Button>
        </div>
      </div>
    </>
  );
}
