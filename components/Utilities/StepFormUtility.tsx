"use client";
import React, { useState, useCallback, FormEvent } from "react";
import { Input, Select } from "../ui";

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
  rateStructure: "Flat Rate" | "Tiered Rate" | string;
  basServiceFee: number;
  perUnitRate: number;
  serviceRateStructure: "Flat Rate" | "Per Job" | string;
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

interface StepProps {
  data: FormData;
  onChange: (key: keyof FormData, value: any) => void;
}

const Form: React.FC<{
  onSubmit: (e: FormEvent) => void;
  className?: string;
  children: React.ReactNode;
}> = ({ onSubmit, className, children }) => (
  <form onSubmit={onSubmit} className={className}>
    {children}
  </form>
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

// --- 3. STEP DATA AND VALIDATION UTILS ---

const STEPS = [
  { id: 1, title: "Basic Info", name: "basic" },
  { id: 2, title: "Location", name: "location" },
  { id: 3, title: "Technical", name: "technical" },
  { id: 4, title: "Configuration", name: "config" },
  { id: 5, title: "Review", name: "review" },
];

const initialFormData: FormData = {
  // Step 1: Basic Info
  meterNumber: "",
  utilityType: "",
  meterType: "",
  brand: "",
  model: "",
  installationDate: "",
  // Step 2: Location
  property: "",
  unit: "",
  specificLocation: "",
  accessInstructions: "",
  // Step 3: Technical
  capacity: "",
  measurementUnits: "",
  accuracyClass: "",
  isSmart: false,
  isDigital: false,
  isRemoteReading: false,
  // Step 4: Configuration
  initialReading: 0.0,
  multiplierFactor: 1,
  rateStructure: "Flat Rate",
  basServiceFee: 0.0,
  perUnitRate: 0.0,
  serviceRateStructure: "Flat Rate",
  lastServiceDate: "",
  nextServiceDate: "",
  warrantyExpiry: "",
  serviceProvider: "",
  // Step 5: Review
  enableBilling: true,
  tenantAccess: false,
  automaticCalculation: true,
  usageAlerts: false,
  additionalNotes: "",
};

const validateStep = (stepId: number, data: FormData): boolean => {
  switch (stepId) {
    case 1:
      return !!data.meterNumber && !!data.utilityType && !!data.meterType;
    case 2:
      return !!data.property && !!data.unit;
    case 3:
      return true;
    case 4:
      return data.initialReading !== undefined && data.initialReading !== null;
    default:
      return true;
  }
};

// --- 4. STEP COMPONENTS ---

const Step1BasicInfo: React.FC<StepProps> = ({ data, onChange }) => (
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
            value={data.meterNumber}
            onChange={(val) => onChange("meterNumber", val)}
            required
          />
        </FormField>
      </div>

      <FormField label="Utility Type">
        <Select
          id="utilityType"
          placeholder="Select utility type"
          value={data.utilityType}
          onChange={(val) => onChange("utilityType", val)}
          options={[
            { value: "electricity", label: "Electricity" },
            { value: "water", label: "Water" },
            { value: "gas", label: "Gas" },
          ]}
          required
        />
      </FormField>

      <FormField label="Meter Type">
        <Select
          id="meterType"
          placeholder="Select meter type"
          value={data.meterType}
          onChange={(val) => onChange("meterType", val)}
          options={[
            { value: "digital", label: "Digital" },
            { value: "analog", label: "Analog" },
          ]}
          required
        />
      </FormField>

      <FormField label="Brand">
        <Input
          id="brand"
          placeholder="e.g., Siemens, Schneider Electric"
          value={data.brand}
          onChange={(val) => onChange("brand", val)}
        />
      </FormField>

      <FormField label="Model">
        <Input
          id="model"
          placeholder="e.g., PowerLogic ION7650"
          value={data.model}
          onChange={(val) => onChange("model", val)}
        />
      </FormField>

      <div className="md:col-span-2">
        <DatePicker
          label="Installation Date"
          id="installationDate"
          value={data.installationDate}
          onChange={(val) => onChange("installationDate", val)}
        />
      </div>
    </div>
  </div>
);

const Step2Location: React.FC<StepProps> = ({ data, onChange }) => (
  <div className="space-y-6">
    <h3 className="text-lg font-semibold text-gray-800">
      Location & Assignment
    </h3>
    <div className="grid grid-cols-1 gap-4">
      <FormField label="Property">
        <Select
          id="property"
          placeholder="Select property"
          value={data.property}
          onChange={(val) => onChange("property", val)}
          options={[
            { value: "prop_a", label: "Property A" },
            { value: "prop_b", label: "Property B" },
          ]}
          required
        />
      </FormField>

      <FormField label="Unit">
        <Select
          id="unit"
          placeholder="Select property first"
          value={data.unit}
          onChange={(val) => onChange("unit", val)}
          options={
            data.property
              ? [
                  { value: "unit_1a", label: "Unit 1A" },
                  { value: "unit_2b", label: "Unit 2B" },
                ]
              : []
          }
          disabled={!data.property}
          required
        />
      </FormField>

      <FormField label="Specific Location">
        <Input
          id="specificLocation"
          placeholder="e.g., Basement electrical room, Kitchen pantry, Balcony"
          value={data.specificLocation}
          onChange={(val) => onChange("specificLocation", val)}
        />
      </FormField>

      <FormField label="Access Instructions">
        <Textarea
          id="accessInstructions"
          placeholder="Describe how to access the meter for readings and maintenance..."
          value={data.accessInstructions}
          onChange={(val) => onChange("accessInstructions", val)}
        />
      </FormField>
    </div>
  </div>
);

const Step3Technical: React.FC<StepProps> = ({ data, onChange }) => (
  <div className="space-y-6">
    <h3 className="text-lg font-semibold text-gray-800">
      Technical Specifications
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField label="Capacity">
        <Input
          id="capacity"
          placeholder="e.g., 100A, 50 GPM"
          value={data.capacity}
          onChange={(val) => onChange("capacity", val)}
        />
      </FormField>

      <FormField label="Measurement Units">
        <Input
          id="measurementUnits"
          placeholder="e.g., kWh, gallons, therms"
          value={data.measurementUnits}
          onChange={(val) => onChange("measurementUnits", val)}
        />
      </FormField>

      <div className="md:col-span-2">
        <FormField label="Accuracy Class">
          <Input
            id="accuracyClass"
            placeholder="e.g., ±1%, Class 1, IEC 62052-11"
            value={data.accuracyClass}
            onChange={(val) => onChange("accuracyClass", val)}
          />
        </FormField>
      </div>
    </div>

    <h3 className="text-lg font-semibold text-gray-800 mt-8 pt-4 border-t border-gray-100">
      Meter Features
    </h3>
    <div className="space-y-2">
      <Switch
        label="Smart Meter"
        description="Advanced metering infrastructure (AMI)"
        checked={data.isSmart}
        onCheckedChange={(val) => onChange("isSmart", val)}
      />
      <Switch
        label="Digital Display"
        description="LCD/LED display for local readings"
        checked={data.isDigital}
        onCheckedChange={(val) => onChange("isDigital", val)}
      />
      <Switch
        label="Remote Reading Capable"
        description="Can be read remotely via communication"
        checked={data.isRemoteReading}
        onCheckedChange={(val) => onChange("isRemoteReading", val)}
      />
    </div>
  </div>
);

const Step4Configuration: React.FC<StepProps> = ({ data, onChange }) => (
  <div className="space-y-6">
    <h3 className="text-lg font-semibold text-gray-800">
      Initial Reading & Configuration
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField label="Initial Reading">
        <Input
          id="initialReading"
          type="number"
          placeholder="0.00"
          value={data.initialReading}
          onChange={(val) =>
            onChange("initialReading", parseFloat(val as string) || 0)
          }
          required
        />
      </FormField>

      <FormField
        label="Multiplier Factor"
        description="Factor to convert meter readings to billing units.">
        <Input
          id="multiplierFactor"
          type="number"
          placeholder="1"
          value={data.multiplierFactor}
          onChange={(val) =>
            onChange("multiplierFactor", parseFloat(val as string) || 1)
          }
        />
      </FormField>
    </div>

    <h3 className="text-lg font-semibold text-gray-800 mt-8 pt-4 border-t border-gray-100">
      Billing Configuration
    </h3>
    <FormField label="Rate Structure">
      <Select
        id="rateStructure"
        placeholder="Select rate structure"
        value={data.rateStructure}
        onChange={(val) => onChange("rateStructure", val)}
        options={[
          { value: "Flat Rate", label: "Flat Rate (Fixed rate per unit)" },
          { value: "Tiered", label: "Tiered Rate" },
        ]}
      />
    </FormField>
    {data.rateStructure === "Flat Rate" && (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Bas/Service Fee">
          <Input
            id="basServiceFee"
            type="number"
            placeholder="0.00"
            value={data.basServiceFee}
            onChange={(val) =>
              onChange("basServiceFee", parseFloat(val as string) || 0)
            }
          />
        </FormField>
        <FormField label="Per Unit Rate">
          <Input
            id="perUnitRate"
            type="number"
            placeholder="0.00"
            value={data.perUnitRate}
            onChange={(val) =>
              onChange("perUnitRate", parseFloat(val as string) || 0)
            }
          />
        </FormField>
      </div>
    )}

    <h3 className="text-lg font-semibold text-gray-800 mt-8 pt-4 border-t border-gray-100">
      Service Information
    </h3>
    <FormField label="Rate Structure">
      <Select
        id="serviceRateStructure"
        placeholder="Select rate structure"
        value={data.serviceRateStructure}
        onChange={(val) => onChange("serviceRateStructure", val)}
        options={[
          { value: "Flat Rate", label: "Flat Rate" },
          { value: "Per Job", label: "Per Job" },
        ]}
      />
    </FormField>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <DatePicker
        label="Last Service Date"
        id="lastServiceDate"
        value={data.lastServiceDate}
        onChange={(val) => onChange("lastServiceDate", val)}
      />

      <DatePicker
        label="Next Service Date"
        id="nextServiceDate"
        value={data.nextServiceDate}
        onChange={(val) => onChange("nextServiceDate", val)}
      />

      <DatePicker
        label="Warranty Expiry"
        id="warrantyExpiry"
        value={data.warrantyExpiry}
        onChange={(val) => onChange("warrantyExpiry", val)}
      />

      <FormField label="Service Provider">
        <Input
          id="serviceProvider"
          placeholder="e.g., ABC Meter Services"
          value={data.serviceProvider}
          onChange={(val) => onChange("serviceProvider", val)}
        />
      </FormField>
    </div>
  </div>
);

const ReviewItem: React.FC<{ label: string; value: string | number }> = ({
  label,
  value,
}) => (
  <div className="flex justify-between py-2 border-b border-gray-100">
    <span className="text-sm text-gray-500">{label}</span>
    <span className="text-sm font-medium text-gray-800">{value}</span>
  </div>
);

const Step5Review: React.FC<StepProps> = ({ data, onChange }) => {
  // Mock data display based on captured data
  const meterName = data.meterNumber || "Not Set";
  const utilityType = data.utilityType
    ? data.utilityType.charAt(0).toUpperCase() + data.utilityType.slice(1)
    : "Not Set";
  const meterType = data.meterType
    ? data.meterType.charAt(0).toUpperCase() + data.meterType.slice(1)
    : "Not Set";
  const location =
    data.property && data.unit ? `${data.property} - ${data.unit}` : "Not Set";
  const brandModel =
    data.brand || data.model
      ? `${data.brand || "N/A"} & ${data.model || "N/A"}`
      : "Not Set";
  const installDate = data.installationDate || "Not set";

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800">Review & Settings</h3>

      {/* Summary Card */}
      <div className="p-4 bg-gray-50 rounded-xl space-y-3 shadow-inner">
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
              {utilityType} &middot; {meterType}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-y-1 text-sm pt-2">
          <p className="text-gray-500">Location</p>
          <p className="font-medium text-right">{location}</p>
          <p className="text-gray-500">Initial Reading</p>
          <p className="font-medium text-right">{data.initialReading}</p>
          <p className="text-gray-500">Brand & Model</p>
          <p className="font-medium text-right text-xs truncate">
            {brandModel}
          </p>
          <p className="text-gray-500">Installation Date</p>
          <p className="font-medium text-right">{installDate}</p>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-gray-800 mt-8 pt-4 border-t border-gray-100">
        Additional Settings
      </h3>
      <div className="space-y-2">
        <Switch
          label="Enable Billing"
          description="Include this meter in billing calculations"
          checked={data.enableBilling}
          onCheckedChange={(val) => onChange("enableBilling", val)}
          className="border-b border-gray-100 pb-2"
        />
        <Switch
          label="Tenant Access"
          description="Allow tenants to view readings and usage"
          checked={data.tenantAccess}
          onCheckedChange={(val) => onChange("tenantAccess", val)}
          className="border-b border-gray-100 pb-2"
        />
        <Switch
          label="Automatic Calculation"
          description="Automatically calculate consumption and costs"
          checked={data.automaticCalculation}
          onCheckedChange={(val) => onChange("automaticCalculation", val)}
          className="border-b border-gray-100 pb-2"
        />
        <Switch
          label="Usage Alerts"
          description="Send alerts for unusual usage patterns"
          checked={data.usageAlerts}
          onCheckedChange={(val) => onChange("usageAlerts", val)}
        />
      </div>

      <FormField label="Additional Notes">
        <Textarea
          id="additionalNotes"
          placeholder="Any additional information about this meter..."
          value={data.additionalNotes}
          onChange={(val) => onChange("additionalNotes", val)}
        />
      </FormField>
    </div>
  );
};

// --- 5. MAIN APP COMPONENT ---

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [validationError, setValidationError] = useState<string>("");

  // Helper to update a single field in the form data
  const updateFormData = useCallback((key: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setValidationError("");
  }, []);

  const handleNext = (): void => {
    if (validateStep(currentStep, formData)) {
      setValidationError("");
      if (currentStep < STEPS.length) {
        setCurrentStep((s) => s + 1);
      }
    } else {
      setValidationError(
        "Please fill out all required fields marked with an asterisk (*)."
      );
    }
  };

  const handlePrevious = (): void => {
    setValidationError("");
    if (currentStep > 1) {
      setCurrentStep((s) => s - 1);
    }
  };

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    if (currentStep === STEPS.length) {
      console.log("Form Submitted! Final Form Data:", formData);
      setValidationError("");
      // Using window.alert for quick feedback as per original JS, but custom modal is preferred
      window.alert("Meter added successfully!");
    }
  };

  const renderStepComponent = (): React.ReactNode => {
    const props: StepProps = { data: formData, onChange: updateFormData };
    switch (currentStep) {
      case 1:
        return <Step1BasicInfo {...props} />;
      case 2:
        return <Step2Location {...props} />;
      case 3:
        return <Step3Technical {...props} />;
      case 4:
        return <Step4Configuration {...props} />;
      case 5:
        return <Step5Review {...props} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header and Step Indicator */}
        <header className="p-6 border-b border-gray-100 flex justify-between items-start">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Add New Meter</h1>
            <p className="text-sm text-gray-500">Install a new utility meter</p>
          </div>
          <button className="text-gray-400 hover:text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </header>

        {/* Step Progress Bar */}
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

        {/* Form Body (using Form mock) */}
        <Form onSubmit={handleSubmit} className="p-6 pt-0">
          <div className="min-h-[400px]">
            {/* Display error message if validation fails */}
            {validationError && (
              <div
                className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg"
                role="alert">
                {validationError}
              </div>
            )}
            {renderStepComponent()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center pt-6 border-t border-gray-100 mt-4">
            {currentStep > 1 && (
              <Button
                onClick={handlePrevious}
                variant="secondary"
                type="button"
                className="flex items-center space-x-2">
                <ArrowLeft />
                <span>Previous</span>
              </Button>
            )}
            {currentStep === 1 && <div className="invisible"></div>}{" "}
            {/* Spacer */}
            {currentStep < STEPS.length ? (
              <Button
                onClick={handleNext}
                variant="primary"
                type="button"
                className="flex items-center space-x-2 ml-auto">
                <span>Next</span>
                <ArrowRight />
              </Button>
            ) : (
              <div className="flex space-x-3 ml-auto">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => console.log("Cancel clicked")}>
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  type="submit"
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
        </Form>
      </div>
    </div>
  );
};

export default App;
