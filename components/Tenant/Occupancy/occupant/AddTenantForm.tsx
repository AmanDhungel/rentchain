"use client";

import React, { FC, Fragment, useMemo, useState } from "react";
import { useForm, Controller, FormProvider } from "react-hook-form";
import {
  User,
  Briefcase,
  PhoneCall,
  Settings,
  Check,
  ArrowLeft,
  ArrowRight,
  Calendar,
  Upload,
  LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils"; // optional helper for classNames, remove if not present
import Image from "next/image";
import { icons } from "@/assets/icons/exports";
import useDialogOpen from "@/context/Dialog";

/* ---------------------------
   Types & initial values
   --------------------------- */

type IncomeRange = "30-40k" | "40-60k" | "60-80k" | "";
type Relationship = "Parent" | "Sibling" | "Friend" | "Spouse" | "";
type TenantStatus = "Applicant" | "Approved" | "Active";
type Language = "English" | "Spanish" | "French";
type PaymentMethod = "Bank Transfer" | "Credit Card" | "Cash";

interface TenantFormData {
  // step 1
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dob: string;
  nationality: string;

  // step 2
  employer: string;
  jobTitle: string;
  incomeRange: IncomeRange;
  propertyAssignment: string;
  unitAssignment: string;

  // step 3
  emergencyContactName: string;
  relationship: Relationship;
  emergencyContactPhone: string;

  // step 4
  tenantStatus: TenantStatus;
  language: Language;
  paymentMethod: PaymentMethod;
  autoPayEnabled: boolean;
  subleaseEnabled: boolean;
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  additionalNotes: string;
}

const INITIAL_VALUES: TenantFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  dob: "",
  nationality: "",
  employer: "",
  jobTitle: "",
  incomeRange: "",
  propertyAssignment: "",
  unitAssignment: "",
  emergencyContactName: "",
  relationship: "",
  emergencyContactPhone: "",
  tenantStatus: "Applicant",
  language: "English",
  paymentMethod: "Bank Transfer",
  autoPayEnabled: false,
  subleaseEnabled: false,
  emailNotifications: true,
  smsNotifications: true,
  pushNotifications: true,
  additionalNotes: "",
};

interface Step {
  id: number;
  icon: LucideIcon;
  title: string;
  requiredFields: (keyof TenantFormData)[];
}

const STEPS: Step[] = [
  {
    id: 1,
    icon: User,
    title: "Personal Information",
    requiredFields: ["firstName", "lastName", "email", "phoneNumber"],
  },
  {
    id: 2,
    icon: Briefcase,
    title: "Employment & Property",
    requiredFields: ["employer", "incomeRange"],
  },
  {
    id: 3,
    icon: PhoneCall,
    title: "Emergency Contact",
    requiredFields: ["emergencyContactName", "emergencyContactPhone"],
  },
  {
    id: 4,
    icon: Settings,
    title: "Preferences & Settings",
    requiredFields: [],
  },
];

const Stepper: FC<{ currentStep: number }> = ({ currentStep }) => {
  return (
    <div className="flex justify-between items-center space-x-2 mb-8 mt-4">
      {STEPS.map((step, index) => {
        const isActive = currentStep === step.id;
        const isComplete = index < currentStep - 1;
        return (
          <Fragment key={step.id}>
            <div className="flex flex-col items-center flex-1 min-w-0">
              <div
                className={cn(
                  "w-full relative h-1 transition-colors duration-200",
                  isComplete ? "bg-orange-500" : "bg-gray-200"
                )}
              />
              <div
                className={cn(
                  "relative flex flex-col items-center transition-colors duration-300",
                  isActive ? "text-orange-600" : "text-gray-500"
                )}>
                <div
                  className={cn(
                    "absolute -top-6 flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300",
                    isActive
                      ? "border-orange-600 bg-orange-50 text-orange-600"
                      : isComplete
                      ? "border-orange-500 bg-orange-500 text-white"
                      : "border-gray-300 bg-white text-gray-500"
                  )}>
                  {isComplete ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <step.icon className="h-5 w-5" />
                  )}
                </div>

                <span
                  className={cn(
                    "mt-8 text-xs font-medium text-center whitespace-nowrap transition-colors duration-300",
                    isActive
                      ? "text-orange-600"
                      : isComplete
                      ? "text-gray-700"
                      : "text-gray-500"
                  )}>
                  {step.title}
                </span>
              </div>
            </div>
            {index < STEPS.length - 1 && <div className="flex-shrink-0 w-0" />}
          </Fragment>
        );
      })}
    </div>
  );
};

/* ---------------------------
   Step Content Components
   using Controller + shadcn components
   --------------------------- */

const Step1PersonalInfo: FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ControllerFieldText
        name="firstName"
        label="First Name*"
        placeholder="Enter first name"
      />
      <ControllerFieldText
        name="lastName"
        label="Last Name*"
        placeholder="Enter last name"
      />
      <ControllerFieldText
        name="email"
        label="Email*"
        placeholder="Enter email"
        type="email"
      />
      <ControllerFieldText
        name="phoneNumber"
        label="Phone Number*"
        placeholder="Enter phone number"
        type="tel"
      />
      <ControllerFieldDate
        name="dob"
        label="Date of Birth"
        placeholder="Select date of birth"
      />
      <ControllerFieldSelect
        name="nationality"
        label="Nationality"
        placeholder="Select nationality"
        items={[
          { value: "Nepal", label: "Nepal" },
          { value: "USA", label: "USA" },
          { value: "Canada", label: "Canada" },
        ]}
      />
    </div>
  );
};

const Step2EmploymentProperty: FC = () => {
  return (
    <div className="space-y-6">
      <ControllerFieldText
        name="employer"
        label="Employer *"
        placeholder="Enter employer name"
      />
      <ControllerFieldText
        name="jobTitle"
        label="Job Title"
        placeholder="Enter job title"
      />
      <ControllerFieldSelect
        name="incomeRange"
        label="Income Range*"
        placeholder="Select income range"
        items={[
          { value: "30-40k", label: "$30,000 - $40,000" },
          { value: "40-60k", label: "$40,000 - $60,000" },
          { value: "60-80k", label: "$60,000 - $80,000" },
        ]}
      />
      <ControllerFieldSelect
        name="propertyAssignment"
        label="Property Assignment"
        placeholder="Select property"
        items={[
          { value: "Downtown Lofts", label: "Downtown Lofts" },
          { value: "Skyline Towers", label: "Skyline Towers" },
        ]}
      />
      <ControllerFieldSelect
        name="unitAssignment"
        label="Unit Assignment"
        placeholder="Select unit"
        items={[
          { value: "Studio 8", label: "Studio 8" },
          { value: "Apt 4B", label: "Apt 4B" },
        ]}
      />
    </div>
  );
};

const Step3EmergencyContact: FC = () => {
  return (
    <div className="space-y-6">
      <ControllerFieldText
        name="emergencyContactName"
        label="Emergency Contact Name *"
        placeholder="Enter contact name"
      />
      <ControllerFieldSelect
        name="relationship"
        label="Relationship"
        placeholder="Select relationship"
        items={[
          { value: "Parent", label: "Parent" },
          { value: "Sibling", label: "Sibling" },
          { value: "Friend", label: "Friend" },
          { value: "Spouse", label: "Spouse" },
        ]}
      />
      <ControllerFieldText
        name="emergencyContactPhone"
        label="Emergency Contact Phone *"
        placeholder="Enter contact phone"
        type="tel"
      />

      <div className="pt-4 border-t border-gray-100">
        <Label className="block mb-3">Upload Documents (Optional)</Label>
        <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
          <Upload className="h-6 w-6 text-gray-500 mb-2" />
          <p className="text-sm text-gray-700 font-medium">
            Click to upload files
          </p>
          <p className="text-xs text-gray-500">
            PDF, DOCX, PNG, or JPG (Max 5MB)
          </p>
        </div>
      </div>
    </div>
  );
};

const Step4PreferencesSettings: FC = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Tenant Status</h3>
        <ControllerFieldSelect
          name="tenantStatus"
          label="Status"
          placeholder="Select status"
          items={[
            { value: "Applicant", label: "Applicant" },
            { value: "Approved", label: "Approved" },
            { value: "Active", label: "Active Tenant" },
          ]}
        />
      </div>

      <div className="space-y-4 pt-4 border-t border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800">Preferences</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ControllerFieldSelect
            name="language"
            label="Language"
            placeholder="English"
            items={[
              { value: "English", label: "English" },
              { value: "Spanish", label: "Spanish" },
            ]}
          />
          <ControllerFieldSelect
            name="paymentMethod"
            label="Payment Method"
            placeholder="Bank Transfer"
            items={[
              { value: "Bank Transfer", label: "Bank Transfer" },
              { value: "Credit Card", label: "Credit Card" },
            ]}
          />
        </div>
        <ControllerSwitch name="autoPayEnabled" label="Auto-pay Enabled" />
        <ControllerSwitch name="subleaseEnabled" label="Sublease Enabled" />
      </div>

      <div className="space-y-4 pt-4 border-t border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
        <ControllerSwitch
          name="emailNotifications"
          label="Email Notifications"
        />
        <ControllerSwitch name="smsNotifications" label="SMS Notifications" />
        <ControllerSwitch name="pushNotifications" label="Push Notifications" />
      </div>

      <div className="space-y-4 pt-4 border-t border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800">
          Additional Notes
        </h3>
        <ControllerFieldTextarea
          name="additionalNotes"
          label="Notes"
          placeholder="Enter any additional notes..."
        />
      </div>
    </div>
  );
};

// function useRHFContext() {
//   const methods = React.useContext(FormProvider);
//   return methods;
// }

const ControllerFieldText: FC<{
  name: keyof TenantFormData;
  label: string;
  placeholder?: string;
  type?: "text" | "email" | "tel";
}> = ({ name, label, placeholder = "", type = "text" }) => {
  return (
    <div>
      <Label
        htmlFor={name as string}
        className="text-sm font-medium text-gray-700 block mb-2">
        {label}
      </Label>
      <Controller
        name={name}
        rules={{
          required: label.includes("*")
            ? `${label.replace("*", "").trim()} is required`
            : false,
        }}
        render={({ field, fieldState }) => (
          <>
            <Input
              id={name as string}
              placeholder={placeholder}
              value={field.value as string}
              onChange={field.onChange}
              onBlur={field.onBlur}
              type={type}
            />
            {fieldState.error && (
              <p className="text-xs text-red-500 mt-1">
                {fieldState.error.message}
              </p>
            )}
          </>
        )}
      />
    </div>
  );
};

const ControllerFieldDate: FC<{
  name: keyof TenantFormData;
  label: string;
  placeholder?: string;
}> = ({ name, label, placeholder = "" }) => {
  return (
    <div>
      <Label
        htmlFor={name as string}
        className="text-sm font-medium text-gray-700 block mb-2">
        {label}
      </Label>
      <Controller
        name={name}
        render={({ field, fieldState }) => (
          <div className="relative">
            <Input
              id={name as string}
              type="date"
              placeholder={placeholder}
              value={field.value || ""}
              onChange={field.onChange}
              onBlur={field.onBlur}
              className="pr-10"
            />
            <Calendar className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
            {fieldState.error && (
              <p className="text-xs text-red-500 mt-1">
                {fieldState.error.message}
              </p>
            )}
          </div>
        )}
      />
    </div>
  );
};

const ControllerFieldSelect: FC<{
  name: keyof TenantFormData;
  label: string;
  placeholder?: string;
  items: { value: string; label: string }[];
}> = ({ name, label, placeholder = "", items }) => {
  return (
    <div>
      <Label
        htmlFor={name as string}
        className="text-sm font-medium text-gray-700 block mb-2">
        {label}
      </Label>

      <Controller
        name={name}
        rules={{
          required: label.includes("*")
            ? `${label.replace("*", "").trim()} is required`
            : false,
        }}
        render={({ field, fieldState }) => {
          return (
            <>
              <Select
                onValueChange={(val) => field.onChange(val)}
                defaultValue={field.value as string}>
                <SelectTrigger id={name as string}>
                  <SelectValue placeholder={placeholder || "Select..."} />
                </SelectTrigger>
                <SelectContent>
                  {items.map((it) => (
                    <SelectItem key={it.value} value={it.value}>
                      {it.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {fieldState.error && (
                <p className="text-xs text-red-500 mt-1">
                  {fieldState.error.message}
                </p>
              )}
            </>
          );
        }}
      />
    </div>
  );
};

const ControllerFieldTextarea: FC<{
  name: keyof TenantFormData;
  label: string;
  placeholder?: string;
}> = ({ name, label, placeholder = "" }) => {
  return (
    <div>
      <Label
        htmlFor={name as string}
        className="text-sm font-medium text-gray-700 block mb-2">
        {label}
      </Label>

      <Controller
        name={name}
        render={({ field }) => (
          <Textarea
            id={name as string}
            placeholder={placeholder}
            value={field.value as string}
            onChange={field.onChange}
          />
        )}
      />
    </div>
  );
};

const ControllerSwitch: FC<{ name: keyof TenantFormData; label: string }> = ({
  name,
  label,
}) => {
  return (
    <div className="flex justify-between items-center py-2">
      <Label
        htmlFor={name as string}
        className="text-sm font-medium text-gray-700">
        {label}
      </Label>
      <Controller
        name={name}
        render={({ field }) => (
          <Switch
            checked={Boolean(field.value)}
            onCheckedChange={(v) => field.onChange(Boolean(v))}
          />
        )}
      />
    </div>
  );
};

const StepContentMap: Record<number, FC> = {
  1: Step1PersonalInfo,
  2: Step2EmploymentProperty,
  3: Step3EmergencyContact,
  4: Step4PreferencesSettings,
};

export const AddTenantDialog: FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  const methods = useForm<TenantFormData>({
    defaultValues: INITIAL_VALUES,
    mode: "onBlur",
  });

  const { trigger, handleSubmit, reset } = methods;

  const totalSteps = STEPS.length;
  const currentStepMeta = STEPS.find((s) => s.id === currentStep)!;

  const handleNext = async () => {
    const result = await trigger(currentStepMeta.requiredFields, {
      shouldFocus: true,
    });
    if (result) {
      setCurrentStep((s) => Math.min(totalSteps, s + 1));
    } else {
    }
  };

  const handlePrevious = () => {
    setCurrentStep((s) => Math.max(1, s - 1));
  };
  const { open, setIsOpen } = useDialogOpen();

  const onSubmit = (data: TenantFormData) => {
    window.alert("Tenant Created Successfully! Check console for data.");
    setIsOpen();
    setCurrentStep(1);
    reset(INITIAL_VALUES);
  };

  const CurrentComponent = StepContentMap[currentStep];

  return (
    <div className=" bg-gray-50 ">
      <Dialog open={open} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-orange-500 text-white rounded-lg hover:bg-[#2C5966] transition-colors">
            <Image
              alt="RoundedPlusIcon"
              src={icons.RoundedPlusIcon}
              className="scale-200"
            />
            <span>Add New Tenant</span>
          </button>
        </DialogTrigger>
        <DialogContent
          className="h-full w-screen rounded-lg  p-0 m-0 flex flex-col overflow-auto text-[#202C4B]"
          style={{ scrollbarWidth: "none" }}>
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="text-xl font-semibold">
              Standard Property Setup
            </DialogTitle>
            <p className="text-sm text-muted-foreground">
              Streamlined property creation with essential steps only
            </p>
          </DialogHeader>
          <div className="w-full p-6 pt-0">
            <div className="pt-2">
              <Stepper currentStep={currentStep} />

              <FormProvider {...methods}>
                <form
                  onSubmit={(e) => {
                    if (currentStep < totalSteps) {
                      e.preventDefault();
                      handleNext();
                    } else {
                      handleSubmit(onSubmit)(e);
                    }
                  }}
                  className="space-y-6">
                  <CurrentComponent />

                  <div className="flex justify-between pt-6 border-t border-gray-100 mt-6">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={handlePrevious}
                      disabled={currentStep === 1}
                      className={`${
                        currentStep === 1 ? "invisible" : ""
                      } bg-gray-100 text-gray-700 hover:bg-gray-200 inline-flex items-center gap-2`}>
                      <ArrowLeft className="h-4 w-4" />
                      Previous
                    </Button>

                    {currentStep < totalSteps ? (
                      <Button
                        type="submit"
                        className="inline-flex items-center gap-2">
                        Next
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        className="inline-flex items-center gap-2">
                        <Check className="h-4 w-4" />
                        Create Tenant
                      </Button>
                    )}
                  </div>
                </form>
              </FormProvider>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddTenantDialog;
