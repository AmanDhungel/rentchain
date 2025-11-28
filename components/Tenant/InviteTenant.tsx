import React, { useState } from "react";
import {
  useForm,
  FormProvider,
  useFormContext,
  FieldValues,
} from "react-hook-form";
import { format } from "date-fns";

// ----------------------------------------------------
// 1. Component Imports (Assuming you have configured Shadcn components)
// ----------------------------------------------------
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "../ui/checkbox";

// Placeholder for a Date Picker component (you would use one like shadcn's DatePicker)
const DatePicker = ({ field }: { field: FieldValues }) => (
  <Input
    type="date"
    value={field.value ? format(field.value, "yyyy-MM-dd") : ""}
    onChange={(e) => field.onChange(new Date(e.target.value))}
  />
);

// ----------------------------------------------------
// 2. Type Definition (Replaced Zod)
// ----------------------------------------------------
export interface TenantInvitationFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  propertyId: string;
  unitId: string;
  leaseStartDate?: Date;
  leaseDurationMonths: number;
  monthlyRent: number;
  securityDeposit: number;
  invitationMessage?: string;
  invitationExpiresInDays: number;
  autoReminders: boolean;
  includeVirtualTour: boolean;
  requireKYC: boolean;
  sendWelcomePacket: boolean;
}

const Step1PersonalInformation: React.FC = () => {
  const { control } = useFormContext<TenantInvitationFormData>();
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Tenant Information</h3>
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name*</FormLabel>
              <FormControl>
                <Input placeholder="John" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name*</FormLabel>
              <FormControl>
                <Input placeholder="Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email*</FormLabel>
              <FormControl>
                <Input
                  placeholder="john.doe@example.com"
                  type="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="(555) 555-5555" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

const Step2PropertyAndUnit: React.FC = () => {
  const { control, setValue } = useFormContext<TenantInvitationFormData>();
  // Mock data selection since this is just a structure
  const properties = [
    {
      id: "downtown-lofts",
      name: "Downtown Lofts",
      units: ["8C - Studio", "7A - 1BR"],
    },
  ];

  // Simulating selection of unit and setting unitId and propertyId
  const handleSelectUnit = (unit: string) => {
    setValue("propertyId", "downtown-lofts", { shouldValidate: true });
    setValue("unitId", unit, { shouldValidate: true });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Property & Unit Selection</h3>
      <FormField
        control={control}
        name="propertyId"
        render={() => (
          <FormItem>
            <FormLabel>Property*</FormLabel>
            <FormControl>
              <Input value={properties[0].name} readOnly />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="unitId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Unit*</FormLabel>
            <FormControl>
              {/* Simulating a dropdown selection */}
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                onChange={(e) => handleSelectUnit(e.target.value)}
                value={field.value || ""}>
                <option value="">Select a Unit</option>
                {properties[0].units.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

const Step3LeaseTerms: React.FC = () => {
  const { control } = useFormContext<TenantInvitationFormData>();
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Lease Terms</h3>
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={control}
          name="leaseStartDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Date*</FormLabel>
              <FormControl>
                <DatePicker field={field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="leaseDurationMonths"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Duration (months)*</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="12"
                  {...field}
                  value={field.value || ""}
                  onChange={(e) =>
                    field.onChange(parseInt(e.target.value) || 0)
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="monthlyRent"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Monthly Rent* ($)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="800"
                  {...field}
                  value={field.value || ""}
                  onChange={(e) =>
                    field.onChange(parseFloat(e.target.value) || 0)
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="securityDeposit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Security Deposit ($)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="1200"
                  {...field}
                  value={field.value || ""}
                  onChange={(e) =>
                    field.onChange(parseFloat(e.target.value) || 0)
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

const Step4InvitationSetup: React.FC = () => {
  const { control, watch } = useFormContext<TenantInvitationFormData>();
  const expires = watch("invitationExpiresInDays");

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Invitation Setup</h3>

      <FormField
        control={control}
        name="invitationMessage"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Custom Message</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Write a personalized message..."
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="invitationExpiresInDays"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Expires In (Days)</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="14"
                {...field}
                value={field.value || ""}
                onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="space-y-3">
        <h4 className="text-md font-medium">Additional Options</h4>
        {[
          "autoReminders",
          "includeVirtualTour",
          "requireKYC",
          "sendWelcomePacket",
        ].map((key) => (
          <FormField
            key={key}
            control={control}
            name={key as keyof TenantInvitationFormData}
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel>
                    {key
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase())}
                  </FormLabel>
                </div>
                <FormControl>
                  <Checkbox
                    checked={field.value as boolean}
                    onChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        ))}
      </div>
    </div>
  );
};

const Step5ReviewAndSend: React.FC = () => {
  const { watch } = useFormContext<TenantInvitationFormData>();
  const data = watch(); // Get all form data

  const formatDate = (date: Date | undefined) =>
    date ? format(date, "MMMM do, yyyy") : "N/A";
  const formatCurrency = (amount: number | undefined) =>
    amount !== undefined ? `$${amount.toLocaleString()}` : "N/A";

  const leaseEndDate = data.leaseStartDate
    ? new Date(
        data.leaseStartDate.getFullYear(),
        data.leaseStartDate.getMonth() + data.leaseDurationMonths,
        data.leaseStartDate.getDate() - 5
      )
    : "N/A";

  const totalValue = data.monthlyRent * data.leaseDurationMonths;

  return (
    <div className="space-y-6 h-full overflow-y-auto">
      <h3 className="text-lg font-semibold">Final Review</h3>

      <Card>
        <CardHeader>
          <CardTitle className="text-md">Tenant & Property</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-y-1">
          <p>
            <strong>Name:</strong> {data.firstName} {data.lastName}
          </p>
          <p>
            <strong>Email:</strong> {data.email}
          </p>
          <p>
            <strong>Property:</strong> {data.propertyId || "N/A"}
          </p>
          <p>
            <strong>Unit:</strong> {data.unitId || "N/A"}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-md">Lease Terms</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-y-1">
          <p>
            <strong>Start Date:</strong> {formatDate(data.leaseStartDate)}
          </p>
          <p>
            <strong>Duration:</strong> {data.leaseDurationMonths} months
          </p>
          <p>
            <strong>End Date (Est.):</strong> {formatDate(leaseEndDate as Date)}
          </p>
          <p>
            <strong>Monthly Rent:</strong> {formatCurrency(data.monthlyRent)}
          </p>
          <p>
            <strong>Security Deposit:</strong>{" "}
            {formatCurrency(data.securityDeposit)}
          </p>
          <p className="col-span-2 pt-2">
            <strong>Total Value:</strong> {formatCurrency(totalValue)}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-md">Invitation Settings</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-y-1">
          <p>
            <strong>Expires In:</strong> {data.invitationExpiresInDays} days
          </p>
          <p>
            <strong>Auto Reminders:</strong> {data.autoReminders ? "Yes" : "No"}
          </p>
          <p>
            <strong>Virtual Tour:</strong>{" "}
            {data.includeVirtualTour ? "Included" : "No"}
          </p>
          <p>
            <strong>KYC Required:</strong> {data.requireKYC ? "Yes" : "No"}
          </p>
          <p className="col-span-2 pt-2">
            <strong>Message:</strong>{" "}
            {data.invitationMessage || "No custom message."}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

const stepsConfig = [
  { id: 1, label: "Personal Information" },
  { id: 2, label: "Property & Unit" },
  { id: 3, label: "Lease Terms" },
  { id: 4, label: "Invitation Setup" },
  { id: 5, label: "Review & Send" },
];

const ProgressHeader: React.FC<{ currentStep: number }> = ({ currentStep }) => (
  <div className="flex justify-between items-center pb-4 border-b">
    {stepsConfig.map((step) => (
      <div key={step.id} className="flex flex-col items-center">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
            currentStep === step.id
              ? "bg-orange-500 text-white"
              : currentStep > step.id
              ? "bg-orange-100 text-orange-600"
              : "bg-gray-200 text-gray-500"
          }`}>
          {step.id}
        </div>
        <span
          className={`text-xs mt-1 text-center transition-colors ${
            currentStep >= step.id
              ? "text-gray-900 font-medium"
              : "text-gray-500"
          }`}>
          {step.label}
        </span>
      </div>
    ))}
  </div>
);

const Footer: React.FC<{
  step: number;
  totalSteps: number;
  nextStep: () => void;
  prevStep: () => void;
}> = ({ step, totalSteps, nextStep, prevStep }) => {
  const {
    formState: { isValid },
  } = useFormContext();

  return (
    <div className="flex justify-between pt-4  border-t">
      <Button
        onClick={prevStep}
        disabled={step === 1}
        variant="outline"
        type="button">
        ← Previous
      </Button>

      {step < totalSteps ? (
        <Button type="button" onClick={nextStep}>
          Next →
        </Button>
      ) : (
        <Button type="submit">Send Invitation</Button>
      )}
    </div>
  );
};

const stepComponents = [
  Step1PersonalInformation,
  Step2PropertyAndUnit,
  Step3LeaseTerms,
  Step4InvitationSetup,
  Step5ReviewAndSend,
];

export function MultiStepTenantInvitationForm() {
  const [step, setStep] = useState(1);
  const methods = useForm<TenantInvitationFormData>({
    defaultValues: {
      firstName: "lorem",
      lastName: "ipsum",
      email: "lorem@gmail.com",
      propertyId: "Downtown Lofts",
      unitId: "Unit 8C - Studio",
      leaseStartDate: new Date("2025-09-30"),
      leaseDurationMonths: 12,
      monthlyRent: 800,
      securityDeposit: 1201,
      invitationExpiresInDays: 14,
      autoReminders: true,
      includeVirtualTour: true,
      requireKYC: true,
      sendWelcomePacket: false,
      invitationMessage: "lorem",
    },
    mode: "onBlur",
  });

  const fieldsToValidate = {
    1: ["firstName", "lastName", "email"],
    2: ["propertyId", "unitId"],
    3: [
      "leaseStartDate",
      "leaseDurationMonths",
      "monthlyRent",
      "securityDeposit",
    ],
    4: ["invitationExpiresInDays"],
    5: [],
  };

  const nextStep = async () => {
    const fields = fieldsToValidate[
      step as keyof typeof fieldsToValidate
    ] as (keyof TenantInvitationFormData)[];

    const isValid = await methods.trigger(fields as any, { shouldFocus: true });

    if (isValid && step < stepComponents.length) {
      setStep(step + 1);
    } else if (!isValid) {
      console.log("Validation Errors:", methods.formState.errors);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const onSubmit = (data: TenantInvitationFormData) => {
    console.log("✅ FINAL FORM SUBMISSION DATA:", data);
    alert("Invitation Sent! Check console for data.");
  };

  const CurrentStepComponent = stepComponents[step - 1];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-orange-600 hover:bg-orange-700 text-white shadow-lg">
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
          </svg>
          Invite Tenant
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl p-6 h-full overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Invite New Tenant
          </DialogTitle>
        </DialogHeader>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
            <ProgressHeader currentStep={step} />

            <div className="py-4 min-h-[400px]">
              {CurrentStepComponent && <CurrentStepComponent />}
            </div>

            <Footer
              step={step}
              totalSteps={stepComponents.length}
              nextStep={nextStep}
              prevStep={prevStep}
            />
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
