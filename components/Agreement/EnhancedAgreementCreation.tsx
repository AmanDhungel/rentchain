import React, { useState, useMemo } from "react";
import {
  ArrowRight,
  ArrowLeft,
  X,
  Home,
  Users,
  Building,
  DollarSign,
  Zap,
  ClipboardCheck,
  FileText,
  Plus,
  Settings,
  Check,
  Trash2,
  Clock,
} from "lucide-react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Input,
  Label,
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "../ui";
import {
  Controller,
  Control,
  UseFormRegister,
  UseFormWatch,
  UseFormSetValue,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { Checkbox } from "../ui/checkbox";
import { SelectGroup, SelectItem, SelectLabel } from "../ui/select";
import { Textarea } from "../ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

type StepKey =
  | "basicInfo"
  | "parties"
  | "unitsSpaces"
  | "rentDeposits"
  | "utilitiesServices"
  | "slaTerms"
  | "clausesCompliance"
  | "reviewValidate";

interface Party {
  id: string;
  role: string;
  entityName: string;
  status: string;
  name: string;
  email: string;
  phone: string;
  share: number;
}

interface UnitSelection {
  id: string;
  name: string;
  path: string;
  details: {
    coverageType: string;
    occupancyLimit: number;
    area: number;
    furnishingLevel: string;
  };
  furnishedItems: Array<{ type: string; name: string; condition: string }>;
  conditionReport: {
    walls: string;
    flooring: string;
    plumbing: string;
    electrical: string;
    windowsDoors: string;
    fixtures: string;
    inspectionDate: string;
    inspectedBy: string;
    notes: string;
  };
}

interface Utility {
  id: string;
  utilityType: string;
  billingType: string;
  responsibility: string;
  dueDate: number;
  gracePeriod: number;
  depositRequired: boolean;
  depositAmount: number;
  connectionFee: number;
  disconnectionTerms: string;
}

interface SLA {
  id: string;
  category: string;
  availability: string;
  description: string;
  responseTime: number;
  resolutionTime: number;
  escalationProcedure: string;
  contactPerson: string;
  contactPhone: string;
  penaltyClause: string;
}

interface Clause {
  id: string;
  type: string;
  text: string;
}

export interface Compliance {
  id: string;
  category: string;
  description: string;
  dueDate: string;
  responsibility: string;
  documentationRequired: boolean;
}

export interface FormValues {
  status: string;
  startDate: string;
  endDate: string;
  noticePeriod: number;
  renewalOption: string;
  autoRenew: boolean;
  name?: string;

  parties: Party[];

  units: UnitSelection[];

  rent_frequency: string;
  rent_amount: number;
  rent_currency: string;
  rent_dueDay: number;
  rent_gracePeriod: number;
  rent_enableEscalation: boolean;
  rent_escalationPercent: number;
  rent_escalationFrequency: string;
  lateFee_type: string;
  lateFee_percentage: number;
  lateFee_cap: number;

  utilities: Utility[];

  slas: SLA[];
  terms_termination: string;
  terms_renewal: string;
  terms_modification: string;
  terms_dispute: string;
  terms_governingLaw: string;
  terms_forceMajeure: string;

  clauses: Clause[];
  compliance: Compliance[];

  confirmReview: boolean;
  confirmAgreement: boolean;
}

type FieldPath<TFieldValues extends FormValues> = keyof TFieldValues;

const ProgressStep: React.FC<{
  number: number;
  label: string;
  active: boolean;
  completed: boolean;
}> = ({ number, label, active, completed }) => {
  const statusClasses = active
    ? "bg-orange-600 text-white"
    : completed
    ? "bg-orange-500 bg-white border border-orange-500 text-orange-500"
    : "bg-gray-200 text-gray-500";

  return (
    <div className="flex flex-col items-center space-y-1 w-1/8 shrink-0">
      <div
        className={`w-8 h-8 flex items-center justify-center rounded-full font-bold transition-all duration-300 ${statusClasses}`}>
        {number}
      </div>
      <span
        className={`text-xs text-center font-medium ${
          active ? "text-orange-600" : "text-gray-600"
        }`}>
        {label}
      </span>
    </div>
  );
};

export const Stepper: React.FC<{ currentStep: number }> = ({ currentStep }) => {
  const steps: { key: StepKey; label: string }[] = [
    { key: "basicInfo", label: "Basic Info" },
    { key: "parties", label: "Parties" },
    { key: "unitsSpaces", label: "Units & Spaces" },
    { key: "rentDeposits", label: "Rent & Deposits" },
    { key: "utilitiesServices", label: "Utilities & Services" },
    { key: "slaTerms", label: "SLA & Terms" },
    { key: "clausesCompliance", label: "Clauses & Compliance" },
    { key: "reviewValidate", label: "Review & Validate" },
  ];

  return (
    <div className="flex justify-between items-start pb-8 pt-4">
      <div className="flex justify-between w-full z-10">
        {steps.map((step, index) => (
          <ProgressStep
            key={step.key}
            number={index + 1}
            label={step.label}
            active={currentStep === index + 1}
            completed={currentStep > index + 1}
          />
        ))}
      </div>
    </div>
  );
};

const FormSectionTitle: React.FC<{
  icon: React.ReactNode;
  title: string;
  children?: React.ReactNode;
}> = ({ icon, title, children }) => (
  <div className="flex justify-between items-center mb-6">
    <h2 className="flex items-center text-xl font-semibold text-gray-800">
      {icon}
      <span className="ml-2">{title}</span>
    </h2>
    {children}
  </div>
);

export interface StepProps {
  register: UseFormRegister<FormValues>;
  control: Control<FormValues>;
  watch: UseFormWatch<FormValues>;
  setValue: UseFormSetValue<FormValues>;
}

export const BasicInfoStep: React.FC<StepProps> = ({ register, control }) => {
  return (
    <div className="space-y-8">
      <FormSectionTitle
        icon={<Home className="w-5 h-5" />}
        title="Property Selection"
      />

      <Card className="p-4 border-2 border-orange-100 bg-orange-50/50 cursor-pointer hover:bg-orange-50 transition-colors">
        <div className="flex items-center justify-between">
          Sunset Apartments - Building A
          <p className="text-xs text-gray-500 ml-6">
            Available Units: 2 | Est. Revenue: $5,200/month
          </p>
        </div>
        <div>
          <Button variant="secondary" size="sm" className="h-6 text-xs">
            Building
          </Button>
        </div>
      </Card>

      <Card className="p-4 border-2 border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-gray-900 flex items-center">
              <Building className="w-4 h-4 mr-2" /> Downtown Office Complex
            </p>
            <p className="text-xs text-gray-500 ml-6">
              456 Business Avenue, New York, NY 10002
            </p>
            <p className="text-xs text-gray-500 ml-6">
              Available Units: 1 | Est. Revenue: $3,500/month
            </p>
          </div>
          <Button variant="secondary" size="sm" className="h-6 text-xs">
            Building
          </Button>
        </div>
      </Card>

      <div className="p-2 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="status">Agreement Status</Label>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>

                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <div>
          <Label htmlFor="startDate">Start Date</Label>
          <Input id="startDate" type="date" {...register("startDate")} />
        </div>
        <div>
          <Label htmlFor="endDate">End Date</Label>
          <Input id="endDate" type="date" {...register("endDate")} />
        </div>
        <div>
          <Label htmlFor="noticePeriod">Notice Period (Days)</Label>
          <Input
            id="noticePeriod"
            type="number"
            {...register("noticePeriod", {
              setValueAs: (v) => (v === "" ? undefined : Number(v)),
            })}
          />
        </div>
        <div>
          <Label htmlFor="renewalOption">Renewal Option</Label>
          <Controller
            name="renewalOption"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select transmission" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Transmission</SelectLabel>
                    <SelectItem value="Manual">Manual</SelectItem>
                    <SelectItem value="Automatic">Automatic</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <div className="flex items-end pb-2">
          <div className="flex items-center space-x-2">
            <Controller
              name="autoRenew"
              control={control}
              render={({ field }) => (
                <Checkbox
                  id="autoRenew"
                  checked={!!field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
            <Label htmlFor="autoRenew">Enable auto-renew</Label>
          </div>
        </div>
      </div>
    </div>
  );
};

export const PartiesStep: React.FC<StepProps> = ({ register, control }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "parties",
  });

  const addParty = () => {
    const newParty: Party = {
      id: String(Date.now()),
      role: "Tenant",
      entityName: "Person",
      status: "Active",
      name: "",
      email: "",
      phone: "",
      share: 100,
    };
    append(newParty);
  };

  return (
    <div className="space-y-8">
      <FormSectionTitle
        icon={<Users className="w-5 h-5" />}
        title="Agreement Parties">
        <Button onClick={addParty} className="space-x-1">
          <Plus className="w-4 h-4" />
          <span>Add Party</span>
        </Button>
      </FormSectionTitle>

      <div className="space-y-6">
        {fields.map((field, index) => (
          <Card key={field.id}>
            <CardHeader className="flex justify-between items-center p-4 pb-0">
              <h3 className="text-lg font-medium">Party {index + 1}</h3>
              <Trash2
                className="w-5 h-5 text-red-500 cursor-pointer hover:text-red-700"
                onClick={() => remove(index)}
              />
            </CardHeader>
            <CardContent className="p-4 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <Controller
                  name={`parties.${index}.role`}
                  control={control}
                  render={({ field: controllerField }) => (
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="status">Tenant</Label>
                      <Select
                        value={controllerField.value}
                        onValueChange={controllerField.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Role</SelectLabel>

                            <SelectItem value="Tenant">Tenant</SelectItem>
                            <SelectItem value="Owner">Owner</SelectItem>
                            <SelectItem value="Guarantor">Guarantor</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                />
                <Controller
                  name={`parties.${index}.entityName`}
                  control={control}
                  render={({ field: controllerField }) => (
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="status">Entity Type</Label>
                      <Select
                        value={controllerField.value}
                        onValueChange={controllerField.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select entity type" />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Entity Type</SelectLabel>

                            <SelectItem value="Person">Person</SelectItem>
                            <SelectItem value="Company">Company</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                />
                <Controller
                  name={`parties.${index}.status`}
                  control={control}
                  render={({ field: controllerField }) => (
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="status">Status</Label>
                      <Select
                        value={controllerField.value}
                        onValueChange={controllerField.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Status</SelectLabel>

                            <SelectItem value="Active">Active</SelectItem>
                            <SelectItem value="Inactive">Inactive</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`parties.${index}.name`}>
                    Name / Organization
                  </Label>
                  <Input
                    id={`parties.${index}.name`}
                    placeholder="Enter name/organization"
                    {...register(`parties.${index}.name`)}
                  />
                </div>

                <div>
                  <Label htmlFor={`parties.${index}.email`}>Email</Label>
                  <Input
                    id={`parties.${index}.email`}
                    type="email"
                    placeholder="Enter email"
                    {...register(`parties.${index}.email`)}
                  />
                </div>

                <div>
                  <Label htmlFor={`parties.${index}.phone`}>Phone Number</Label>
                  <Input
                    id={`parties.${index}.phone`}
                    type="tel"
                    placeholder="Enter phone number"
                    {...register(`parties.${index}.phone`)}
                  />
                </div>

                <div>
                  <Label htmlFor={`parties.${index}.share`}>
                    Share Percentage
                  </Label>
                  <Input
                    id={`parties.${index}.share`}
                    type="number"
                    placeholder="Share Percentage"
                    {...register(`parties.${index}.share`, {
                      valueAsNumber: true,
                    })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export const UnitsSpacesStep: React.FC<StepProps> = ({
  register,
  control,
  watch,
}) => {
  const { fields, append, remove } = useFieldArray({ control, name: "units" });

  const mockAvailableUnits = [
    {
      id: "1",
      name: "Ground Floor",
      type: "Floor",
      details: "850 sqft Max: 4$1200/month",
      path: "Sunset Towers -> Ground Floor",
    },
    {
      id: "2",
      name: "Apartment 101",
      type: "Apartment",
      details: "200 sqft Max: 2$600/month",
      path: "Sunset Towers -> Ground Floor -> Apartment 101",
    },
  ];

  const addUnit = (unit: any) => {
    if (!fields.find((u) => u.name === unit.name)) {
      const newUnit: UnitSelection = {
        id: String(Date.now()),
        name: unit.name,
        path: unit.path,
        details: {
          coverageType: "Floor",
          occupancyLimit: 1,
          area: 0,
          furnishingLevel: "Unfurnished",
        },
        furnishedItems: [],
        conditionReport: {
          walls: "Good",
          flooring: "Good",
          plumbing: "Good",
          electrical: "Good",
          windowsDoors: "Good",
          fixtures: "Good",
          inspectionDate: "",
          inspectedBy: "",
          notes: "",
        },
      };
      append(newUnit);
    }
  };

  const UnitDetailForm: React.FC<{ index: number; unit: UnitSelection }> = ({
    index,
    unit,
  }) => (
    <Card className="mt-4 p-4">
      <div className="flex justify-between items-center pb-4 border-b">
        <h4 className="font-semibold text-gray-800">
          {unit.name} ({watch(`units.${index}.details.coverageType`)})
        </h4>
        <Trash2
          className="w-5 h-5 text-red-500 cursor-pointer"
          onClick={() => remove(index)}
        />
      </div>

      <div className="grid grid-cols-3 gap-4 pt-4">
        <div>
          <Label>Coverage Type</Label>
          <Controller
            name={`units.${index}.details.coverageType`}
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select property type" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Property Type</SelectLabel>

                    <SelectItem value="Floor">Floor</SelectItem>
                    <SelectItem value="Apartment">Apartment</SelectItem>
                    <SelectItem value="Bedspace">Bedspace</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <div>
          <Label>Occupancy Limit</Label>
          <Input
            type="number"
            {...register(`units.${index}.details.occupancyLimit`, {
              valueAsNumber: true,
            })}
          />
        </div>
        <div>
          <Label>Area (sqft)</Label>
          <Input
            type="number"
            {...register(`units.${index}.details.area`, {
              valueAsNumber: true,
            })}
          />
        </div>
        <div className="col-span-3">
          <Label>Furnishing Level</Label>
          <Controller
            name={`units.${index}.details.furnishingLevel`}
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select furnishing" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Furnishing</SelectLabel>

                    <SelectItem value="Unfurnished">Unfurnished</SelectItem>
                    <SelectItem value="Semi-Furnished">
                      Semi-Furnished
                    </SelectItem>
                    <SelectItem value="Full-Furnished">
                      Full-Furnished
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <h5 className="font-semibold text-gray-800">
          Property Condition Report
        </h5>
        <div className="grid grid-cols-3 gap-4">
          {[
            "walls",
            "flooring",
            "plumbing",
            "electrical",
            "windowsDoors",
            "fixtures",
          ].map((key) => (
            <div key={key}>
              <Label>
                {key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}
              </Label>

              <Controller
                name={
                  `units.${index}.conditionReport.${key}` as FieldPath<FormValues>
                }
                control={control}
                render={({ field }) => (
                  <Select
                    value={String(field.value)}
                    onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Condition</SelectLabel>

                        <SelectItem value="Excellent">Excellent</SelectItem>
                        <SelectItem value="Good">Good</SelectItem>
                        <SelectItem value="Fair">Fair</SelectItem>
                        <SelectItem value="Poor">Poor</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Inspection Date</Label>
            <Input
              type="date"
              {...register(`units.${index}.conditionReport.inspectionDate`)}
            />
          </div>
          <div>
            <Label>Inspected By</Label>
            <Input
              placeholder="Inspector name"
              {...register(`units.${index}.conditionReport.inspectedBy`)}
            />
          </div>
        </div>
        <div className="pt-2">
          <Label>Additional Notes</Label>
          <Input
            placeholder="Any additional condition notes...."
            {...register(`units.${index}.conditionReport.notes`)}
          />
        </div>
      </div>
    </Card>
  );

  const UnitListItem: React.FC<any> = ({ unit, selected, onSelect }) => (
    <div
      className={`flex justify-between items-center p-3 rounded-lg cursor-pointer transition-colors ${
        selected
          ? "bg-orange-50 border border-orange-300"
          : "bg-gray-50 hover:bg-gray-100"
      }`}
      onClick={() => onSelect(unit)}>
      <div className="flex items-center space-x-2">
        {unit.type === "Apartment" && (
          <Building className="w-4 h-4 text-green-600" />
        )}
        {unit.type === "Floor" && <Home className="w-4 h-4 text-blue-600" />}
        <p className="text-sm font-medium text-gray-800">{unit.name}</p>
      </div>
      <ArrowRight className="w-4 h-4 text-gray-500" />
    </div>
  );

  return (
    <div className="space-y-8">
      <FormSectionTitle
        icon={<Building className="w-5 h-5" />}
        title="Units & Spaces Selection"
      />

      {/* Available Units Selection */}
      <Card>
        <CardHeader>
          <h3 className="text-base font-medium">Available Units & Spaces</h3>
        </CardHeader>
        <CardContent className="pt-0 space-y-2">
          <p className="text-sm text-gray-500 mb-4">
            Select from property hierarchy: Floors → Units → Rooms → Bedspaces
          </p>
          {mockAvailableUnits.map((unit) => (
            <UnitListItem
              key={unit.id}
              unit={unit}
              selected={!!fields.find((u) => u.name === unit.name)}
              onSelect={addUnit}
            />
          ))}
        </CardContent>
      </Card>

      {/* Selected Units Details */}
      <h3 className="text-xl font-semibold text-gray-800">
        Selected Units & Spaces ({fields.length})
      </h3>
      <div className="space-y-6">
        {fields.map((unit, index) => (
          <UnitDetailForm
            key={unit.id}
            index={index}
            unit={unit as UnitSelection}
          />
        ))}
        {fields.length === 0 && (
          <p className="text-center text-gray-500 italic">
            No units selected yet. Please select units above.
          </p>
        )}
      </div>
    </div>
  );
};

export const RentDepositsStep: React.FC<StepProps> = ({
  register,
  control,
  watch,
}) => {
  const enableEscalation = watch("rent_enableEscalation");
  const lateFeeType = watch("lateFee_type");

  return (
    <div className="space-y-8">
      <FormSectionTitle
        icon={<DollarSign className="w-5 h-5" />}
        title="Rent Schedule & Deposits"
      />

      {/* Rent Schedule */}
      <Card>
        <CardHeader>
          <h3 className="text-base font-medium text-gray-800">Rent Schedule</h3>
        </CardHeader>
        <CardContent className="pt-0 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Payment Frequency</Label>
              <Controller
                name="rent_frequency"
                control={control}
                render={({ field }) => (
                  <Select {...field}>
                    <option value="Daily">Daily</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Quarterly">Quarterly</option>
                  </Select>
                )}
              />
            </div>
            <div className="space-y-2">
              <Label>Base Rent Amount</Label>
              <Input
                type="number"
                placeholder="3543"
                {...register("rent_amount", { valueAsNumber: true })}
              />
            </div>
            <div className="space-y-2">
              <Label>Currency</Label>
              <Controller
                name="rent_currency"
                control={control}
                render={({ field }) => (
                  <Select {...field}>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                  </Select>
                )}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Due Day of {watch("rent_frequency").toLowerCase()}</Label>
              <Input
                type="number"
                placeholder="2"
                {...register("rent_dueDay", { valueAsNumber: true })}
              />
            </div>
            <div className="space-y-2">
              <Label>Grace Period (Days)</Label>
              <Input
                type="number"
                placeholder="5"
                {...register("rent_gracePeriod", { valueAsNumber: true })}
              />
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 space-y-4">
            <div className="flex items-center space-x-2">
              <Controller
                name="rent_enableEscalation"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    id="enableEscalation"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <Label htmlFor="enableEscalation">
                Enable automatic rent escalation
              </Label>
            </div>
            {enableEscalation && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Escalation Percentage (%)</Label>
                  <Input
                    type="number"
                    placeholder="e.g. 3.5"
                    {...register("rent_escalationPercent", {
                      valueAsNumber: true,
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Escalation Frequency</Label>
                  <Controller
                    name="rent_escalationFrequency"
                    control={control}
                    render={({ field }) => (
                      <Select {...field}>
                        <option value="Yearly">Yearly</option>
                        <option value="Bi-Annually">Bi-Annually</option>
                      </Select>
                    )}
                  />
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Late Fee Policy */}
      <Card>
        <CardHeader>
          <h3 className="text-base font-medium text-gray-800">
            Late Fee Policy
          </h3>
        </CardHeader>
        <CardContent className="pt-0 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Late Fee Type</Label>
              <Controller
                name="lateFee_type"
                control={control}
                render={({ field }) => (
                  <Select {...field}>
                    <option value="Percentage">Percentage(%)</option>
                    <option value="Fixed">Fixed Amount</option>
                  </Select>
                )}
              />
            </div>
            <div className="space-y-2">
              <Label>
                {lateFeeType === "Percentage"
                  ? "Percentage(%)"
                  : "Fixed Amount"}
              </Label>
              <Input
                type="number"
                placeholder={lateFeeType === "Percentage" ? "5" : "50.00"}
                {...register("lateFee_percentage", { valueAsNumber: true })}
              />
            </div>
            <div className="space-y-2">
              <Label>Maximum Cap (Option)</Label>
              <Input
                type="number"
                placeholder="100"
                {...register("lateFee_cap", { valueAsNumber: true })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Deposits (Simplified) */}
      <Card>
        <CardHeader>
          <h3 className="text-base font-medium text-gray-800">
            Deposits (Mocked)
          </h3>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm text-gray-500">
            Deposit fields are complex and mocked for brevity. They would
            typically involve detailed inputs for amount, interest, and terms.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export const UtilitiesServicesStep: React.FC<StepProps> = ({
  register,
  control,
  watch,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "utilities",
  });

  const addUtility = () => {
    const newUtility: Utility = {
      id: String(Date.now()),
      utilityType: "Electricity",
      billingType: "Excluded (Tenant pays direct)",
      responsibility: "Tenant",
      dueDate: 2,
      gracePeriod: 5,
      depositRequired: true,
      depositAmount: 0.0,
      connectionFee: 0.0,
      disconnectionTerms: "",
    };
    append(newUtility);
  };

  return (
    <div className="space-y-8">
      <FormSectionTitle
        icon={<Zap className="w-5 h-5" />}
        title="Utilities & Services">
        <Button onClick={addUtility} className="space-x-1">
          <Plus className="w-4 h-4" />
          <span>Add Utility</span>
        </Button>
      </FormSectionTitle>

      <div className="space-y-6">
        {fields.map((field, index) => (
          <Card key={field.id}>
            <CardHeader className="flex-row justify-between items-center p-4 pb-0">
              <h3 className="text-lg font-medium">
                Utility {index + 1} - {watch(`utilities.${index}.utilityType`)}
              </h3>
              <Trash2
                className="w-5 h-5 text-red-500 cursor-pointer hover:text-red-700"
                onClick={() => remove(index)}
              />
            </CardHeader>
            <CardContent className="p-4 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <Controller
                  name={`utilities.${index}.utilityType`}
                  control={control}
                  render={({ field: controllerField }) => (
                    <Select {...controllerField}>
                      <option value="Electricity">Electricity</option>
                      <option value="Water">Water</option>
                      <option value="Internet">Internet</option>
                    </Select>
                  )}
                />
                <Controller
                  name={`utilities.${index}.billingType`}
                  control={control}
                  render={({ field: controllerField }) => (
                    <Select {...controllerField}>
                      <option value="Excluded (Tenant pays direct)">
                        Excluded (Tenant pays direct)
                      </option>
                      <option value="Included in Rent">Included in Rent</option>
                      <option value="Shared Responsibility">
                        Shared Responsibility
                      </option>
                    </Select>
                  )}
                />
                <Controller
                  name={`utilities.${index}.responsibility`}
                  control={control}
                  render={({ field: controllerField }) => (
                    <Select {...controllerField}>
                      <option value="Tenant">Tenant</option>
                      <option value="Owner">Owner</option>
                    </Select>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Due Day of daily</Label>
                  <Input
                    type="number"
                    placeholder="2"
                    {...register(`utilities.${index}.dueDate`, {
                      valueAsNumber: true,
                    })}
                  />
                </div>
                <div>
                  <Label>Grace Period (Days)</Label>
                  <Input
                    type="number"
                    placeholder="5"
                    {...register(`utilities.${index}.gracePeriod`, {
                      valueAsNumber: true,
                    })}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2 mt-4 mb-4">
                <Controller
                  name={`utilities.${index}.depositRequired`}
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      id={`deposit-${field.name}`}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <Label
                  htmlFor={`deposit-${field.name}` as FieldPath<FormValues>}>
                  utility deposit required
                </Label>
              </div>
              {watch(`utilities.${index}.depositRequired`) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Deposit Amount</Label>
                    <Input
                      type="number"
                      placeholder="0.00"
                      {...register(`utilities.${index}.depositAmount`, {
                        valueAsNumber: true,
                      })}
                    />
                  </div>
                  <div>
                    <Label>Connection Fee</Label>
                    <Input
                      type="number"
                      placeholder="0.00"
                      {...register(`utilities.${index}.connectionFee`, {
                        valueAsNumber: true,
                      })}
                    />
                  </div>
                </div>
              )}
              <div className="pt-4">
                <Label>Disconnection Terms</Label>
                <Textarea
                  placeholder="Terms and conditions for utility disconnection..."
                  {...register(`utilities.${index}.disconnectionTerms`)}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export const SLATermsStep: React.FC<StepProps> = ({
  register,
  control,
  watch,
}) => {
  const { fields, append, remove } = useFieldArray({ control, name: "slas" });

  const addSLA = () => {
    const newSLA: SLA = {
      id: String(Date.now()),
      category: "Maintenance",
      availability: "Weekdays Only",
      description: "",
      responseTime: 24,
      resolutionTime: 72,
      escalationProcedure: "",
      contactPerson: "",
      contactPhone: "",
      penaltyClause: "",
    };
    append(newSLA);
  };

  return (
    <div className="space-y-8">
      <FormSectionTitle
        icon={<Clock className="w-5 h-5" />}
        title="Service Level Agreements">
        <Button onClick={addSLA} className="space-x-1">
          <Plus className="w-4 h-4" />
          <span>Add SLA</span>
        </Button>
      </FormSectionTitle>

      <div className="space-y-6">
        {fields.map((field, index) => (
          <Card key={field.id}>
            <CardHeader className="flex-row justify-between items-center p-4 pb-0">
              <h3 className="text-lg font-medium">
                SLA {index + 1} - {watch(`slas.${index}.category`)}
              </h3>
              <Trash2
                className="w-5 h-5 text-red-500 cursor-pointer hover:text-red-700"
                onClick={() => remove(index)}
              />
            </CardHeader>
            <CardContent className="p-4 pt-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Controller
                  name={`slas.${index}.category`}
                  control={control}
                  render={({ field: controllerField }) => (
                    <Select {...controllerField}>
                      <option value="Maintenance">Maintenance</option>
                      <option value="Security">Security</option>
                      <option value="Cleaning">Cleaning</option>
                    </Select>
                  )}
                />
                <Controller
                  name={`slas.${index}.availability`}
                  control={control}
                  render={({ field: controllerField }) => (
                    <Select {...controllerField}>
                      <option value="Weekdays Only">Weekdays Only</option>
                      <option value="24/7">24/7</option>
                    </Select>
                  )}
                />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  placeholder="Describe the service level commitment..."
                  {...register(`slas.${index}.description`)}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Response Time (Hours)</Label>
                  <Input
                    type="number"
                    placeholder="24"
                    {...register(`slas.${index}.responseTime`, {
                      valueAsNumber: true,
                    })}
                  />
                </div>
                <div>
                  <Label>Resolution Time (Hours)</Label>
                  <Input
                    type="number"
                    placeholder="72"
                    {...register(`slas.${index}.resolutionTime`, {
                      valueAsNumber: true,
                    })}
                  />
                </div>
              </div>
              <div>
                <Label>Escalation Procedure</Label>
                <Textarea
                  placeholder="Define escalation steps if SLA is breached..."
                  {...register(`slas.${index}.escalationProcedure`)}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Contact Person</Label>
                  <Input
                    placeholder="primary contact name"
                    {...register(`slas.${index}.contactPerson`)}
                  />
                </div>
                <div>
                  <Label>Contact Phone</Label>
                  <Input
                    placeholder="Phone number"
                    {...register(`slas.${index}.contactPhone`)}
                  />
                </div>
              </div>
              <div>
                <Label>Penalty Clause (Optional)</Label>
                <Input
                  placeholder="Penalties for SLA breaches..."
                  {...register(`slas.${index}.penaltyClause`)}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <FormSectionTitle
        icon={<FileText className="w-5 h-5" />}
        title="Agreement Terms & Conditions"
      />
      <div className="space-y-6">
        <div className="space-y-2">
          <Label>Termination Clause</Label>
          <Textarea
            placeholder="Define conditions under which the agreement can be terminated..."
            {...register("terms_termination")}
          />
        </div>
        <div className="space-y-2">
          <Label>Renewal Terms</Label>
          <Textarea
            placeholder="Define how the agreement can be renewed..."
            {...register("terms_renewal")}
          />
        </div>
        <div className="space-y-2">
          <Label>Modification Policy</Label>
          <Textarea
            placeholder="Define how changes to the agreement will be handled..."
            {...register("terms_modification")}
          />
        </div>
        <div className="space-y-2">
          <Label>Dispute Resolution</Label>
          <Textarea
            placeholder="Define dispute resolution mechanisms..."
            {...register("terms_dispute")}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Governing Law</Label>
            <Input
              placeholder="e.g., State of California"
              {...register("terms_governingLaw")}
            />
          </div>
          <div className="space-y-2">
            <Label>Force Majeure</Label>
            <Input
              placeholder="Define Force majeure conditions..."
              {...register("terms_forceMajeure")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export const ClausesComplianceStep: React.FC<StepProps> = ({
  register,
  control,
  watch,
}) => {
  const {
    fields: clauseFields,
    append: appendClause,
    remove: removeClause,
  } = useFieldArray({ control, name: "clauses" });
  const {
    fields: complianceFields,
    append: appendCompliance,
    remove: removeCompliance,
  } = useFieldArray({ control, name: "compliance" });

  const addClause = () => {
    const newClause: Clause = {
      id: String(Date.now()),
      type: "House Rule",
      text: "",
    };
    appendClause(newClause);
  };

  const addCompliance = () => {
    const newCompliance: Compliance = {
      id: String(Date.now()),
      category: "Legal",
      description: "",
      dueDate: "",
      responsibility: "Owner",
      documentationRequired: true,
    };
    appendCompliance(newCompliance);
  };

  return (
    <div className="space-y-8">
      <FormSectionTitle
        icon={<ClipboardCheck className="w-5 h-5" />}
        title="Clauses & Compliance Requirements"
      />

      {/* Agreement Clauses */}
      <h3 className="text-xl font-semibold text-gray-800 flex justify-between items-center">
        Agreement Clauses
        <Button onClick={addClause} className="space-x-1">
          <Plus className="w-4 h-4" />
          <span>Add Clause</span>
        </Button>
      </h3>
      <div className="space-y-6">
        {clauseFields.map((field, index) => (
          <Card key={field.id} className="p-4">
            <div className="flex justify-end mb-3">
              <Trash2
                className="w-5 h-5 text-red-500 cursor-pointer hover:text-red-700"
                onClick={() => removeClause(index)}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="col-span-1">
                <Label>Type</Label>
                <Controller
                  name={`clauses.${index}.type`}
                  control={control}
                  render={({ field: controllerField }) => (
                    <Select {...controllerField}>
                      <option value="House Rule">House Rule</option>
                      <option value="Pet Policy">Pet Policy</option>
                      <option value="Noise Policy">Noise Policy</option>
                    </Select>
                  )}
                />
              </div>
              <div className="col-span-3">
                <Label>Clause Text</Label>
                <Textarea
                  placeholder="Enter clause text..."
                  {...register(
                    `clauses.${index}.text` as FieldPath<FormValues>
                  )}
                />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Compliance Requirements */}
      <h3 className="text-xl font-semibold text-gray-800 flex justify-between items-center pt-4 border-t border-gray-100">
        Compliance Requirements
        <Button onClick={addCompliance} className="space-x-1">
          <Plus className="w-4 h-4" />
          <span>Add Compliance Requirement</span>
        </Button>
      </h3>
      <div className="space-y-6">
        {complianceFields.map((field, index) => (
          <Card key={field.id} className="p-4">
            <div className="flex justify-end mb-3">
              <Trash2
                className="w-5 h-5 text-red-500 cursor-pointer hover:text-red-700"
                onClick={() => removeCompliance(index)}
              />
            </div>
            <div className="grid grid-cols-1 gap-4 mb-4">
              <div className="col-span-1 md:col-span-3">
                <Label>Category</Label>
                <Controller
                  name={`compliance.${index}.category` as FieldPath<FormValues>}
                  control={control}
                  render={({ field: controllerField }) => (
                    <Select
                      value={String(controllerField.value)}
                      onValueChange={controllerField.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Type</SelectLabel>

                          <SelectItem value="Legal">Legal</SelectItem>
                          <SelectItem value="Safety">Safety</SelectItem>
                          <SelectItem value="Insurance">Insurance</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  placeholder="Describe the compliance requirement..."
                  {...register(
                    `compliance.${index}.description` as FieldPath<FormValues>
                  )}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div>
                <Label>Due Date</Label>
                <Input
                  type="date"
                  {...register(
                    `compliance.${index}.dueDate` as FieldPath<FormValues>
                  )}
                />
              </div>
              <div>
                <Label>Responsibility</Label>
                <Controller
                  name={
                    `compliance.${index}.responsibility` as FieldPath<FormValues>
                  }
                  control={control}
                  render={({ field: controllerField }) => (
                    <Select
                      value={String(controllerField.value)}
                      onValueChange={controllerField.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Occupancy" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Occupancy</SelectLabel>

                          <SelectItem value="Owner">Owner</SelectItem>
                          <SelectItem value="Tenant">Tenant</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Controller
                  name={
                    `compliance.${index}.documentationRequired` as FieldPath<FormValues>
                  }
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      id={`doc-${field.name}`}
                      checked={Boolean(field.value)}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <Label
                  htmlFor={`doc-${watch(
                    `compliance.${index}.documentationRequired`
                  )}`}>
                  Documentation Required
                </Label>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

const DetailItem: React.FC<{
  label: string;
  value: React.ReactNode;
  className?: string;
}> = ({ label, value, className }) => (
  <div
    className={`flex justify-between py-2 border-b border-gray-100 last:border-b-0 ${className}`}>
    <div className="text-sm text-gray-500">{label}</div>
    <div className="text-sm font-medium text-gray-800 text-right">{value}</div>
  </div>
);
const ReviewSection: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <Card className="mb-6">
    <CardHeader>
      <h3 className="text-lg font-semibold text-gray-800 flex items-center">
        <Settings className="w-5 h-5 mr-2 text-orange-600" />
        {title}
      </h3>
    </CardHeader>
    <CardContent className="pt-0 space-y-2">{children}</CardContent>
  </Card>
);

export const ReviewValidateStep: React.FC<StepProps> = ({ control, watch }) => {
  const parties = watch("parties");
  const clauses = watch("clauses");
  const compliance = watch("compliance");

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Review & Validate Agreement
      </h2>

      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800">
          Agreement Clauses
        </h3>
        <Button className="space-x-1">
          <Plus className="w-4 h-4" />
          <span>Add Clause</span>
        </Button>
      </div>

      <ReviewSection title="1. Basic Info">
        <DetailItem label="Status" value={watch("status")} />
        <DetailItem
          label="Term"
          value={`${watch("startDate")} to ${watch("endDate")}`}
        />
        <DetailItem
          label="Auto-Renewal"
          value={watch("autoRenew") ? "Enabled" : "Disabled"}
        />
      </ReviewSection>

      <ReviewSection title="2. Parties">
        {parties.map((p: Party) => (
          <DetailItem
            key={p.id}
            label={`${p.role} (${p.entityName})`}
            value={`${p.name} (${p.share}%)`}
          />
        ))}
      </ReviewSection>

      <ReviewSection title="4. Rent & Deposits">
        <DetailItem
          label="Base Rent"
          value={`${watch("rent_currency")} ${watch("rent_amount")}/${watch(
            "rent_frequency"
          )}`}
        />
        <DetailItem label="Late Fee Type" value={watch("lateFee_type")} />
      </ReviewSection>

      <ReviewSection title="7. Compliance">
        <h4 className="font-medium text-gray-700 mb-2 mt-4">
          Clauses ({clauses.length})
        </h4>
        {clauses.slice(0, 2).map((c, i) => (
          <DetailItem
            key={c.id ?? i}
            label={`Clause ${i + 1} (${c.type})`}
            value={
              (c.text ?? "").length > 40
                ? `${c.text.substring(0, 40)}...`
                : c.text ?? ""
            }
          />
        ))}
        <h4 className="font-medium text-gray-700 mb-2 mt-4">
          Compliance ({compliance.length})
        </h4>
        {compliance.slice(0, 2).map((c, i) => (
          <DetailItem
            key={c.id}
            label={`Req ${i + 1} (${c.category})`}
            value={c.description.substring(0, 40) + "..."}
          />
        ))}
      </ReviewSection>

      <div className="mt-8 pt-6 border-t border-gray-200 space-y-4">
        <div className="flex items-center space-x-2">
          <Controller
            name="confirmReview"
            control={control}
            render={({ field }) => (
              <Checkbox
                id="confirmReview"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
          <Label htmlFor="confirmReview">
            I confirm that all data entered is accurate and complete.
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <Controller
            name="confirmAgreement"
            control={control}
            render={({ field }) => (
              <Checkbox
                id="confirmAgreement"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
          <Label htmlFor="confirmAgreement">
            This agreement has been reviewed and is ready for signature.
          </Label>
        </div>
      </div>
    </div>
  );
};

export const initialValues: FormValues = {
  status: "Draft",
  startDate: "2025-01-01",
  endDate: "2026-01-01",
  noticePeriod: 30,
  renewalOption: "Manual",
  autoRenew: false,

  parties: [
    {
      id: "p1",
      role: "Tenant",
      entityName: "Person",
      status: "Active",
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "555-1234",
      share: 100,
    },
  ],

  units: [
    {
      id: "u1",
      name: "Ground Floor",
      path: "Sunset Towers -> Ground Floor",
      details: {
        coverageType: "Floor",
        occupancyLimit: 1,
        area: 850,
        furnishingLevel: "Unfurnished",
      },
      furnishedItems: [],
      conditionReport: {
        walls: "Good",
        flooring: "Good",
        plumbing: "Good",
        electrical: "Good",
        windowsDoors: "Good",
        fixtures: "Good",
        inspectionDate: "2025-01-01",
        inspectedBy: "Inspector J",
        notes: "New",
      },
    },
  ],

  rent_frequency: "Daily",
  rent_amount: 25.0,
  rent_currency: "USD",
  rent_dueDay: 1,
  rent_gracePeriod: 5,
  rent_enableEscalation: true,
  rent_escalationPercent: 3.5,
  rent_escalationFrequency: "Yearly",
  lateFee_type: "Percentage",
  lateFee_percentage: 5,
  lateFee_cap: 100,

  utilities: [
    {
      id: "ut1",
      utilityType: "Electricity",
      billingType: "Excluded (Tenant pays direct)",
      responsibility: "Tenant",
      dueDate: 2,
      gracePeriod: 5,
      depositRequired: true,
      depositAmount: 100.0,
      connectionFee: 50.0,
      disconnectionTerms: "Standard 30-day notice.",
    },
  ],

  slas: [
    {
      id: "s1",
      category: "Maintenance",
      availability: "Weekdays Only",
      description: "General maintenance and repair.",
      responseTime: 24,
      resolutionTime: 72,
      escalationProcedure: "Contact property manager.",
      contactPerson: "Maintenance Team",
      contactPhone: "+1234567890",
      penaltyClause: "N/A",
    },
  ],
  terms_termination: "30 days written notice.",
  terms_renewal: "Automatic 30-day renewal.",
  terms_modification: "Requires written consent.",
  terms_dispute: "Binding arbitration.",
  terms_governingLaw: "State Laws",
  terms_forceMajeure: "Beyond reasonable control.",

  clauses: [
    { id: "c1", type: "House Rule", text: "No smoking allowed indoors." },
  ],
  compliance: [
    {
      id: "com1",
      category: "Safety",
      description: "Annual fire inspection.",
      dueDate: "2025-06-30",
      responsibility: "Owner",
      documentationRequired: true,
    },
  ],

  confirmReview: false,
  confirmAgreement: false,
};

export function EnhancedAgreementCreation() {
  const [currentStep, setCurrentStep] = useState(1);
  const { register, control, watch, setValue, handleSubmit, getValues } =
    useForm({ defaultValues: initialValues });

  const isSaveDisabled = !watch("confirmReview") || !watch("confirmAgreement");

  const goToNextStep = () => {
    if (currentStep < 8) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = (data: FormValues) => {
    console.log("Form Submitted:", data);
  };

  const stepProps: StepProps = useMemo(
    () => ({ register, control, watch, setValue }),
    [register, control, watch, setValue]
  );

  const stepsMap: Record<number, React.ReactNode> = {
    1: <BasicInfoStep {...stepProps} />,
    2: <PartiesStep {...stepProps} />,
    3: <UnitsSpacesStep {...stepProps} />,
    4: <RentDepositsStep {...stepProps} />,
    5: <UtilitiesServicesStep {...stepProps} />,
    6: <SLATermsStep {...stepProps} />,
    7: <ClausesComplianceStep {...stepProps} />,
    8: <ReviewValidateStep {...stepProps} />,
  };

  const isStep8 = currentStep === 8;

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-orange-600 hover:bg-orange-700 text-white shadow-lg shadow-orange-500/50">
            🚀 Enhanced Agreement Builder
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-2xl md:p-10 h-full overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-3xl font-black">
              🚀 Enhanced Agreement Builder
            </DialogTitle>
            <DialogDescription>
              <div className="pb-6 border-b border-gray-200">
                <p className="text-sm text-black mt-1">
                  Step {currentStep} of 8 • Comprehensive Agreement Builder
                </p>
              </div>
            </DialogDescription>
          </DialogHeader>
          <Stepper currentStep={currentStep} />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="py-4">{stepsMap[currentStep]}</div>

            <DialogFooter className="flex justify-between pt-6 border-t border-gray-200">
              <Button
                variant="secondary"
                onClick={goToPreviousStep}
                disabled={currentStep === 1}
                className="space-x-1"
                type="button">
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </Button>

              {isStep8 ? (
                <div className="flex space-x-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => console.log("Save as Draft:", getValues())}>
                    Save as Draft
                  </Button>

                  <Button
                    type="submit"
                    className="space-x-1"
                    disabled={isSaveDisabled}>
                    <span>Create Agreement</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <Button
                  type="button"
                  onClick={goToNextStep}
                  className="space-x-1">
                  <span>Next</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default EnhancedAgreementCreation;
