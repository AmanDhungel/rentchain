"use client";
import React, { useState } from "react";
import {
  useForm,
  Controller,
  FieldValues,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";
import {
  Input,
  Select,
  Switch,
  Button,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "../ui";
import { SelectGroup, SelectItem, SelectLabel } from "../ui/select";
import { Textarea } from "../ui/textarea";

type RateStructure = "Flat Rate" | "Tiered Rate";
type ServiceRateStructure = "Flat Rate" | "Per Job";

interface FormData {
  meterNumber: string;
  utilityType: string;
  meterType: string;
  brand: string;
  model: string;
  installationDate: string;
  property: string;
  unit: string;
  specificLocation: string;
  accessInstructions: string;
  capacity: string;
  measurementUnits: string;
  accuracyClass: string;
  isSmart: boolean;
  isDigital: boolean;
  isRemoteReading: boolean;
  initialReading: number;
  multiplierFactor: number;
  rateStructure: RateStructure | string;
  basServiceFee: number;
  perUnitRate: number;
  serviceRateStructure: ServiceRateStructure | string;
  lastServiceDate: string;
  nextServiceDate: string;
  warrantyExpiry: string;
  serviceProvider: string;
  enableBilling: boolean;
  tenantAccess: boolean;
  automaticCalculation: boolean;
  usageAlerts: boolean;
  additionalNotes: string;
}

const STEPS = [
  { id: 1, title: "Basic Info", name: "basic" },
  { id: 2, title: "Location", name: "location" },
  { id: 3, title: "Technical", name: "technical" },
  { id: 4, title: "Configuration", name: "config" },
  { id: 5, title: "Review", name: "review" },
];

const initialFormData: FormData = {
  meterNumber: "",
  utilityType: "",
  meterType: "",
  brand: "",
  model: "",
  installationDate: "",
  property: "",
  unit: "",
  specificLocation: "",
  accessInstructions: "",
  capacity: "",
  measurementUnits: "",
  accuracyClass: "",
  isSmart: false,
  isDigital: false,
  isRemoteReading: false,
  initialReading: 0,
  multiplierFactor: 1,
  rateStructure: "Flat Rate",
  basServiceFee: 0,
  perUnitRate: 0,
  serviceRateStructure: "Flat Rate",
  lastServiceDate: "",
  nextServiceDate: "",
  warrantyExpiry: "",
  serviceProvider: "",
  enableBilling: true,
  tenantAccess: false,
  automaticCalculation: true,
  usageAlerts: false,
  additionalNotes: "",
};

const ArrowRight: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);
const ArrowLeft: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <path d="m12 19-7-7 7-7" />
    <path d="M19 12H5" />
  </svg>
);

const FormField: React.FC<{
  label?: string;
  children: React.ReactNode;
  description?: string;
}> = ({ label, children, description }) => (
  <div className="space-y-1.5 mb-6">
    {label && (
      <label className="text-sm font-medium leading-none">{label}</label>
    )}
    {children}
    {description && <p className="text-xs text-gray-500 mt-1">{description}</p>}
  </div>
);

const STEP_FIELD_NAMES: Record<number, (keyof FormData)[]> = {
  1: ["meterNumber", "utilityType", "meterType"],
  2: ["property", "unit"],
  3: [],
  4: ["initialReading"],
  5: [],
};

const renderHeader = (
  meterName: string,
  utilityType: string,
  meterType: string,
  location: string,
  initialReading: number,
  brandModel: string,
  installDate: string
) => (
  <div>
    <div className="flex items-center space-x-2">
      <span className="text-blue-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round">
          <path d="M12 2a10 10 0 0 0-9.8 12.5A4 4 0 0 0 6 18h12a4 4 0 0 0 3.8-3.5A10 10 0 0 0 12 2z" />
          <path d="M12 18v4" />
          <path d="M10 22h4" />
        </svg>
      </span>
      <div>
        <p className="font-semibold text-gray-800">{meterName}</p>
        <p className="text-xs text-gray-600">
          {utilityType} · {meterType}
        </p>
      </div>
    </div>
    <div className="grid grid-cols-2 gap-y-1 text-sm pt-2">
      <p className="text-gray-500">Location</p>
      <p className="font-medium text-right">{location}</p>
      <p className="text-gray-500">Initial Reading</p>
      <p className="font-medium text-right">{initialReading}</p>
      <p className="text-gray-500">Brand & Model</p>
      <p className="font-medium text-right text-xs truncate">{brandModel}</p>
      <p className="text-gray-500">Installation Date</p>
      <p className="font-medium text-right">{installDate}</p>
    </div>
  </div>
);

const UtilityStepForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  const form = useForm<FormData>({
    defaultValues: initialFormData,
    mode: "onTouched",
  });

  const {
    register,
    control,
    handleSubmit,
    trigger,
    getValues,
    watch,
    formState: { errors },
  } = form;

  // watch some values for UI decisions
  const rateStructure = watch("rateStructure");
  const property = watch("property");
  const meterNumber = watch("meterNumber");
  const utilityType = watch("utilityType");
  const meterType = watch("meterType");
  const initialReading = watch("initialReading");
  const brand = watch("brand");
  const model = watch("model");
  const installationDate = watch("installationDate");
  const locationStr =
    property && watch("unit") ? `${property} - ${watch("unit")}` : "Not Set";

  const onNext = async () => {
    const fieldsToValidate = STEP_FIELD_NAMES[currentStep] ?? [];
    if (fieldsToValidate.length === 0) {
      setCurrentStep((s) => Math.min(s + 1, STEPS.length));
      return;
    }
    const ok = await trigger(fieldsToValidate as any);
    if (ok) setCurrentStep((s) => Math.min(s + 1, STEPS.length));
  };

  const onPrevious = () => setCurrentStep((s) => Math.max(s - 1, 1));

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log("Final form submit:", data);
    window.alert("Meter added successfully!");
  };

  const Step1BasicInfo = ({ form }: { form: UseFormReturn<FormData> }) => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800">Basic Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <FormField
            label="Meter Number"
            description="e.g., EL-001, WM-123, GM-456">
            <Input
              id="meterNumber"
              placeholder="e.g., EL-001, WM-123, GM-456"
              {...register("meterNumber", {
                required: "Meter number is required",
              })}
            />
            {errors.meterNumber && (
              <p className="text-xs text-red-600 mt-1">
                {errors.meterNumber.message}
              </p>
            )}
          </FormField>
        </div>

        <FormField label="Utility Type">
          {/* Select — use Controller because custom Select likely needs controlled value */}
          <Controller
            control={control}
            name="utilityType"
            rules={{ required: "Utility type required" }}
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={(val) => field.onChange(val)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select utility type" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Service Rate</SelectLabel>
                    <SelectItem value="electricity">Electricity</SelectItem>
                    <SelectItem value="water">Water</SelectItem>
                    <SelectItem value="gas">Gas</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          {errors.utilityType && (
            <p className="text-xs text-red-600 mt-1">
              {(errors.utilityType as any).message}
            </p>
          )}
        </FormField>

        <FormField label="Meter Type">
          <Controller
            control={control}
            name="meterType"
            rules={{ required: "Meter type required" }}
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={(val) => field.onChange(val)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select meter type" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Service Rate</SelectLabel>
                    <SelectItem value="digital">Digital</SelectItem>
                    <SelectItem value="analog">Analog</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          {errors.meterType && (
            <p className="text-xs text-red-600 mt-1">
              {(errors.meterType as any).message}
            </p>
          )}
        </FormField>

        <FormField label="Brand">
          <Input
            id="brand"
            placeholder="e.g., Siemens"
            {...register("brand")}
          />
        </FormField>

        <FormField label="Model">
          <Input
            id="model"
            placeholder="e.g., PowerLogic ION7650"
            {...register("model")}
          />
        </FormField>

        <div className="md:col-span-2">
          <Controller
            control={control}
            name="installationDate"
            render={({ field }) => (
              <Input
                type="date"
                id="installationDate"
                value={field.value}
                onChange={(v) => field.onChange(v)}
              />
            )}
          />
        </div>
      </div>
    </div>
  );

  const Step2Location = ({ form }: { form: UseFormReturn<FormData> }) => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800">
        Location & Assignment
      </h3>
      <div className="grid grid-cols-1 gap-4">
        <FormField label="Property">
          <Controller
            control={control}
            name="property"
            rules={{ required: "Property is required" }}
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={(val) => field.onChange(val)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Property " />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Service Rate</SelectLabel>
                    <SelectItem value="prop_a">Property A</SelectItem>
                    <SelectItem value="prop_b">Property B</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          {errors.property && (
            <p className="text-xs text-red-600 mt-1">
              {(errors.property as any).message}
            </p>
          )}
        </FormField>

        <FormField label="Unit">
          <Controller
            control={control}
            name="unit"
            rules={{ required: "Unit is required" }}
            render={({ field }) => (
              // <Select
              //   id="unit"
              //   placeholder="Select property first"
              //   value={field.value}
              //   onChange={(v) => field.onChange(v)}
              //   options={
              //     property
              //       ? [
              //           { value: "unit_1a", label: "Unit 1A" },
              //           { value: "unit_2b", label: "Unit 2B" },
              //         ]
              //       : []
              //   }
              //   disabled={!property}
              // />
              <Select
                value={field.value}
                onValueChange={(val) => field.onChange(val)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select property first" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Service Rate</SelectLabel>
                    <SelectItem value="unit_1a">Unit 1A</SelectItem>
                    <SelectItem value="unit_2b">Unit 2B</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          {errors.unit && (
            <p className="text-xs text-red-600 mt-1">
              {(errors.unit as any).message}
            </p>
          )}
        </FormField>

        <FormField label="Specific Location">
          <Input
            id="specificLocation"
            placeholder="e.g., Basement electrical room"
            {...register("specificLocation")}
          />
        </FormField>

        <FormField label="Access Instructions">
          <Controller
            control={control}
            name="accessInstructions"
            render={({ field }) => (
              <Textarea
                id="accessInstructions"
                placeholder="Describe how to access the meter..."
                value={field.value}
                onChange={(v) => field.onChange(v)}
              />
            )}
          />
        </FormField>
      </div>
    </div>
  );

  const Step3Technical = ({ form }: { form: UseFormReturn<FormData> }) => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800">
        Technical Specifications
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Capacity">
          <Input
            id="capacity"
            placeholder="e.g., 100A, 50 GPM"
            {...register("capacity")}
          />
        </FormField>

        <FormField label="Measurement Units">
          <Input
            id="measurementUnits"
            placeholder="e.g., kWh, gallons"
            {...register("measurementUnits")}
          />
        </FormField>

        <div className="md:col-span-2">
          <FormField label="Accuracy Class">
            <Input
              id="accuracyClass"
              placeholder="e.g., ±1%, Class 1"
              {...register("accuracyClass")}
            />
          </FormField>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-gray-800 mt-8 pt-4 border-t border-gray-100">
        Meter Features
      </h3>
      <div className="space-y-2">
        <Controller
          control={control}
          name="isSmart"
          render={({ field }) => (
            <Switch
              checked={field.value}
              onCheckedChange={(v) => field.onChange(v)}
            />
          )}
        />
        <Controller
          control={control}
          name="isDigital"
          render={({ field }) => (
            <Switch
              checked={field.value}
              onCheckedChange={(v) => field.onChange(v)}
            />
          )}
        />
        <Controller
          control={control}
          name="isRemoteReading"
          render={({ field }) => (
            <Switch
              checked={field.value}
              onCheckedChange={(v) => field.onChange(v)}
            />
          )}
        />
      </div>
    </div>
  );

  const Step4Configuration = ({ form }: { form: UseFormReturn<FormData> }) => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800">
        Initial Reading & Configuration
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Initial Reading">
          {/* numeric Input with register — Input must forward ref */}
          <Input
            id="initialReading"
            type="number"
            placeholder="0.00"
            {...register("initialReading", {
              valueAsNumber: true,
              required: "Initial reading required",
            })}
          />
          {errors.initialReading && (
            <p className="text-xs text-red-600 mt-1">
              {(errors.initialReading as any).message}
            </p>
          )}
        </FormField>

        <FormField
          label="Multiplier Factor"
          description="Factor to convert meter readings to billing units.">
          <Input
            id="multiplierFactor"
            type="number"
            placeholder="1"
            {...register("multiplierFactor", { valueAsNumber: true })}
          />
        </FormField>
      </div>

      <h3 className="text-lg font-semibold text-gray-800 mt-8 pt-4 border-t border-gray-100">
        Billing Configuration
      </h3>
      <FormField label="Rate Structure">
        <Controller
          control={control}
          name="rateStructure"
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={(val) => field.onChange(val)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select rate structure" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Service Rate</SelectLabel>
                  <SelectItem value="Flat Rate">Flat Rate</SelectItem>
                  <SelectItem value="Tiered Rate">Tiered Rate</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
      </FormField>

      {rateStructure === "Flat Rate" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Bas/Service Fee">
            <Input
              id="basServiceFee"
              type="number"
              placeholder="0.00"
              {...register("basServiceFee", { valueAsNumber: true })}
            />
          </FormField>
          <FormField label="Per Unit Rate">
            <Input
              id="perUnitRate"
              type="number"
              placeholder="0.00"
              {...register("perUnitRate", { valueAsNumber: true })}
            />
          </FormField>
        </div>
      )}

      <h3 className="text-lg font-semibold text-gray-800 mt-8 pt-4 border-t border-gray-100">
        Service Information
      </h3>
      <FormField label="Rate Structure">
        <Controller
          control={control}
          name="serviceRateStructure"
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={(val) => field.onChange(val)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select rate structure" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Service Rate</SelectLabel>
                  <SelectItem value="Flat Rate">Flat Rate</SelectItem>
                  <SelectItem value="Per Job">Per Job</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
      </FormField>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Controller
          control={control}
          name="lastServiceDate"
          render={({ field }) => (
            <Input
              type="date"
              id="lastServiceDate"
              value={field.value}
              onChange={(v) => field.onChange(v)}
            />
          )}
        />
        <Controller
          control={control}
          name="nextServiceDate"
          render={({ field }) => (
            <Input
              type="date"
              id="nextServiceDate"
              value={field.value}
              onChange={(v) => field.onChange(v)}
            />
          )}
        />
        <Controller
          control={control}
          name="warrantyExpiry"
          render={({ field }) => (
            <Input
              type="date"
              id="warrantyExpiry"
              value={field.value}
              onChange={(v) => field.onChange(v)}
            />
          )}
        />
        <FormField label="Service Provider">
          <Input
            id="serviceProvider"
            placeholder="e.g., ABC Meter Services"
            {...register("serviceProvider")}
          />
        </FormField>
      </div>
    </div>
  );

  const Step5Review = ({ form }: { form: UseFormReturn<FormData> }) => {
    const brandModel =
      brand || model ? `${brand || "N/A"} & ${model || "N/A"}` : "Not Set";
    const installDate = installationDate || "Not set";
    return (
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-800">
          Review & Settings
        </h3>

        <div className="p-4 bg-gray-50 rounded-xl space-y-3 shadow-inner">
          {renderHeader(
            meterNumber || "Not Set",
            utilityType
              ? utilityType.charAt(0).toUpperCase() + utilityType.slice(1)
              : "Not Set",
            meterType
              ? meterType.charAt(0).toUpperCase() + meterType.slice(1)
              : "Not Set",
            locationStr,
            initialReading,
            brandModel,
            installDate
          )}
        </div>

        <h3 className="text-lg font-semibold text-gray-800 mt-8 pt-4 border-t border-gray-100">
          Additional Settings
        </h3>
        <div className="space-y-2">
          <Controller
            control={control}
            name="enableBilling"
            render={({ field }) => (
              <Switch
                checked={field.value}
                onCheckedChange={(v) => field.onChange(v)}
                className="border-b border-gray-100 pb-2"
              />
            )}
          />
          <Controller
            control={control}
            name="tenantAccess"
            render={({ field }) => (
              <Switch
                checked={field.value}
                onCheckedChange={(v) => field.onChange(v)}
                className="border-b border-gray-100 pb-2"
              />
            )}
          />
          <Controller
            control={control}
            name="automaticCalculation"
            render={({ field }) => (
              <Switch
                checked={field.value}
                onCheckedChange={(v) => field.onChange(v)}
                className="border-b border-gray-100 pb-2"
              />
            )}
          />
          <Controller
            control={control}
            name="usageAlerts"
            render={({ field }) => (
              <Switch
                checked={field.value}
                onCheckedChange={(v) => field.onChange(v)}
              />
            )}
          />
        </div>

        <FormField label="Additional Notes">
          <Controller
            control={control}
            name="additionalNotes"
            render={({ field }) => (
              <Textarea
                id="additionalNotes"
                placeholder="Any additional information about this meter..."
                value={field.value}
                onChange={(v) => field.onChange(v)}
              />
            )}
          />
        </FormField>
      </div>
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="  flex items-center justify-center ">
      <div className="w-full bg-white rounded-2xl  overflow-hidden">
        <div className="flex justify-between p-6">
          {STEPS.map((step) => {
            const isActive = step.id === currentStep;
            const isCompleted = step.id < currentStep;
            const statusClass = isCompleted
              ? "bg-orange-500 text-white"
              : isActive
              ? "bg-orange-500 text-white shadow-md"
              : "bg-white text-gray-500 border border-gray-300";
            const textClass = isActive
              ? "text-orange-600 font-semibold"
              : "text-gray-600";
            return (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300 ${statusClass}`}>
                    {isCompleted ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    ) : (
                      step.id
                    )}
                  </div>
                  <p
                    className={`mt-2 text-xs sm:text-sm transition-colors ${textClass}`}>
                    {step.title}
                  </p>
                </div>
                {step.id < STEPS.length && (
                  <div
                    className={`flex-1 h-0.5 mt-4 mx-1 transition-colors duration-300 ${
                      isCompleted ? "bg-orange-500" : "bg-gray-200"
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>

        <div className="p-6 pt-0 min-h-[400px]">
          {currentStep === 1 && <Step1BasicInfo form={form} />}
          {currentStep === 2 && <Step2Location form={form} />}
          {currentStep === 3 && <Step3Technical form={form} />}
          {currentStep === 4 && <Step4Configuration form={form} />}
          {currentStep === 5 && <Step5Review form={form} />}
        </div>

        <div className="flex justify-between items-center pt-6 border-t border-gray-100 p-6">
          {currentStep > 1 ? (
            <Button
              type="button"
              variant="secondary"
              onClick={onPrevious}
              className="flex items-center space-x-2">
              <ArrowLeft />
              <span>Previous</span>
            </Button>
          ) : (
            <div className="invisible" />
          )}

          {currentStep < STEPS.length ? (
            <Button
              type="button"
              variant="outline"
              onClick={onNext}
              className="flex items-center space-x-2 ml-auto">
              <span>Next</span>
              <ArrowRight />
            </Button>
          ) : (
            <div className="flex space-x-3 ml-auto">
              <Button
                type="button"
                variant="outline"
                onClick={() => console.log("Cancel clicked")}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant="outline"
                className="flex items-center space-x-2 bg-red-500 hover:bg-red-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span>Add Meter</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </form>
  );
};

export default UtilityStepForm;
