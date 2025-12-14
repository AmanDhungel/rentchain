"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { DollarSign, UploadCloud, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// --- TEMPORARY TYPOGRAPHY DEFINITIONS to resolve import error ---
// In a real project, these would come from "@/lib/typography"
const cx = (...classes: (string | false | null | undefined)[]) =>
  classes.filter(Boolean).join(" ");

const Text: React.FC<
  React.PropsWithChildren<{
    variant?: "body" | "title";
    as?: React.ElementType;
    className?: string;
  }>
> = ({ children, variant = "body", as = "p", className }) => {
  const Component = as;
  const baseStyle =
    variant === "title"
      ? "text-lg font-semibold text-gray-800"
      : "text-sm text-gray-700";
  return <Component className={cx(baseStyle, className)}>{children}</Component>;
};
const Small: React.FC<
  React.PropsWithChildren<{ variant?: "small"; className?: string }>
> = ({ children, className }) => (
  <small className={cx("text-xs text-gray-500", className)}>{children}</small>
);

// --- Form Schema ---
interface FormData {
  tenant: string;
  tenantEmail: string;
  property: string;
  unit: string;
  depositType: string;
  amount: number;
  holdingAccount: string;
  interestRate: number;
  paymentMethod: string;
  paymentReference: string;
  collectionDate: string;
  dueDate: string;
  notes: string;
}

// --- Mock Data ---
const mockTenants = [
  { id: "1", name: "Michael Walker", email: "michael@example.com" },
  { id: "2", name: "Cameron Drake", email: "cameron@example.com" },
];
const mockProperties = ["Skyline Towers", "Downtown Lofts"];
const mockUnits = ["Apt 4B", "Unit 12A", "Penthouse A"];
const mockDepositTypes = [
  "Security Deposit",
  "Pet Deposit",
  "Last Month's Rent",
];
const mockPaymentMethods = ["Bank Transfer", "Credit Card", "Cash"];

// --- Shared Components ---

// A simple utility to format the amount for display
const formatCurrency = (value: number | string) => {
  const num = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(num)) return "$0.00";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(num);
};

// --- Step 1: Form Inputs ---
const CollectDepositFormStep1: React.FC<{ form: any }> = ({ form }) => {
  return (
    <div className="space-y-6">
      <section>
        <Text variant="title" as="h3" className="mb-4">
          Tenant Information
        </Text>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="tenant"
            rules={{ required: "Tenant selection is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tenant *</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select tenant" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {mockTenants.map((t) => (
                      <SelectItem key={t.id} value={t.id}>
                        {t.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tenantEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tenant Email</FormLabel>
                <FormControl>
                  <Input placeholder="lorem@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </section>

      <section>
        <Text variant="title" as="h3" className="mb-4">
          Property & Unit Details
        </Text>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="property"
            rules={{ required: "Property selection is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Property & Unit Details *</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a property" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {mockProperties.map((p) => (
                      <SelectItem key={p} value={p}>
                        {p}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="unit"
            rules={{ required: "Unit selection is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Unit *</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a unit" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {mockUnits.map((u) => (
                      <SelectItem key={u} value={u}>
                        {u}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </section>

      <section>
        <Text variant="title" as="h3" className="mb-4">
          Deposit Details
        </Text>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="depositType"
            rules={{ required: "Deposit type is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Deposit Type *</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Security Deposit" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {mockDepositTypes.map((dt) => (
                      <SelectItem key={dt} value={dt}>
                        {dt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            rules={{
              required: "Amount is required",
              min: { value: 0.01, message: "Amount must be greater than zero" },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount ($) *</FormLabel>
                <FormControl>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      $
                    </span>
                    <Input
                      type="number"
                      placeholder="0.00"
                      {...field}
                      // Ensure value is treated as a number
                      value={field.value === 0 ? "" : field.value}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value) || 0)
                      }
                      className="pl-6"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="holdingAccount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Holding Account</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., DPT-TRUDT-001" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="interestRate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Interest Rate (%)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="2.5"
                    {...field}
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
      </section>

      <section>
        <Text variant="title" as="h3" className="mb-4">
          Payment Information
        </Text>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="paymentMethod"
            rules={{ required: "Payment method is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Payment Method *</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Security payment method" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {mockPaymentMethods.map((pm) => (
                      <SelectItem key={pm} value={pm}>
                        {pm}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="paymentReference"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Payment Reference #</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., TXN123456789" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="collectionDate"
            rules={{ required: "Collection date is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Collection Date *</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input placeholder="mm/dd/yyyy" {...field} type="date" />
                    <FileText className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Due Date</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input placeholder="mm/dd/yyyy" {...field} type="date" />
                    <FileText className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </section>

      <section>
        <Text variant="title" as="h3" className="mb-4">
          Notes
        </Text>
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Add any additional notes about this deposit collection..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </section>
    </div>
  );
};

// --- Step 2: Upload and Summary Confirmation ---
const CollectDepositFormStep2: React.FC<{
  data: FormData;
  onBack: () => void;
}> = ({ data, onBack }) => {
  const getTenantName = (id: string) =>
    mockTenants.find((t) => t.id === id)?.name || "Not selected";

  return (
    <div className="space-y-6">
      <DialogHeader>
        <DialogTitle className="text-xl font-bold">
          Upload Receipt/Document
        </DialogTitle>
      </DialogHeader>

      {/* File Upload Area */}
      <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center bg-gray-50">
        <UploadCloud className="h-10 w-10 mx-auto text-gray-400 mb-4" />
        <Text variant="body" className="font-semibold mb-2">
          Click to upload or drag and drop
        </Text>
        <Small variant="small" className="text-gray-500 mb-4">
          PDF, PNG, JPG up to 10MB
        </Small>
        <Button variant="outline" className="text-gray-700 hover:bg-gray-100">
          Browse File
        </Button>
      </div>

      {/* Summary Section */}
      <Card className="shadow-none border-gray-200">
        <CardContent className="p-4 space-y-2">
          <Text variant="title" as="h4" className="mb-2">
            Summary
          </Text>
          <div className="grid grid-cols-2 text-sm">
            <Text variant="body" className="text-gray-500">
              Tenant:
            </Text>
            <Text variant="body" className="text-right font-medium">
              {getTenantName(data.tenant)}
            </Text>
          </div>
          <Separator />
          <div className="grid grid-cols-2 text-sm">
            <Text variant="body" className="text-gray-500">
              Property:
            </Text>
            <Text variant="body" className="text-right font-medium">
              {data.property || "Not selected"}
            </Text>
          </div>
          <div className="grid grid-cols-2 text-sm">
            <Text variant="body" className="text-gray-500">
              Unit:
            </Text>
            <Text variant="body" className="text-right font-medium">
              {data.unit || "Not selected"}
            </Text>
          </div>
          <Separator />
          <div className="grid grid-cols-2 text-sm">
            <Text variant="body" className="text-gray-500">
              Deposit Type:
            </Text>
            <Text variant="body" className="text-right font-medium">
              {data.depositType}
            </Text>
          </div>
          <div className="grid grid-cols-2 text-sm">
            <Text variant="body" className="text-gray-500">
              Amount:
            </Text>
            <Text
              variant="body"
              className="text-right font-bold text-green-600">
              {formatCurrency(data.amount)}
            </Text>
          </div>
        </CardContent>
      </Card>

      <DialogFooter className="mt-6 flex justify-between sm:justify-between space-x-4">
        <Button
          variant="outline"
          type="button"
          onClick={onBack}
          className="w-1/2 md:w-auto">
          Cancel
        </Button>
        <Button
          type="submit"
          className="w-1/2 md:w-auto bg-orange-500 hover:bg-orange-600 text-white font-semibold">
          <DollarSign className="h-4 w-4 mr-2" />
          Collect Deposit
        </Button>
      </DialogFooter>
    </div>
  );
};

// --- Main Modal Component ---
export function CollectSecurityDepositModal() {
  const [step, setStep] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const form = useForm<FormData>({
    defaultValues: {
      tenant: "",
      tenantEmail: "",
      property: "",
      unit: "",
      depositType: "Security Deposit",
      amount: 0,
      holdingAccount: "DPT-TRUDT-001",
      interestRate: 2.5,
      paymentMethod: "",
      paymentReference: "",
      collectionDate: new Date().toISOString().substring(0, 10),
      dueDate: "",
      notes: "",
    },
    // Adding validation mode to ensure errors are shown before moving to step 2
    mode: "onTouched",
  });

  // Added rules directly in FormField above to use 'required'
  const {
    getValues,
    trigger,
    formState: { errors },
  } = form;

  const handleNext = async () => {
    // Manually trigger validation for required fields in step 1
    const isValid = await trigger(
      [
        "tenant",
        "property",
        "unit",
        "depositType",
        "amount",
        "paymentMethod",
        "collectionDate",
      ],
      { shouldFocus: true }
    ); // Focus on the first error field

    if (isValid) {
      setStep(2);
    } else {
      // Find and focus the first invalid field
      const firstErrorKey = Object.keys(errors).find(
        (key) => errors[key as keyof FormData]
      );
      if (firstErrorKey) {
        form.setFocus(firstErrorKey as keyof FormData);
      }
    }
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log("Final Deposit Collection Data:", data);
    setIsModalOpen(false); // Close modal on successful submission
    setStep(1); // Reset step for next time
    form.reset();
  };

  const handleClose = (open: boolean) => {
    if (!open) {
      // Reset state when modal is closed
      setStep(1);
      form.reset();
    }
    setIsModalOpen(open);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold">
          Collect Deposit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {step === 1 ? (
              <>
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold">
                    Collect Security Deposit
                  </DialogTitle>
                  <DialogDescription>
                    Record a new security deposit collection from a tenant
                  </DialogDescription>
                </DialogHeader>
                <CollectDepositFormStep1 form={form} />
                <DialogFooter className="mt-6 flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleClose(false)}>
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-semibold">
                    Next
                  </Button>
                </DialogFooter>
              </>
            ) : (
              <CollectDepositFormStep2
                data={getValues()}
                onBack={() => setStep(1)}
              />
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
