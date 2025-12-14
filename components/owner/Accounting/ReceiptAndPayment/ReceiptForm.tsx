import React, { useState } from "react";
import { useForm, Resolver } from "react-hook-form";
import { Calendar as CalendarIcon, X, DollarSign } from "lucide-react";

// SIMULATED IMPORTS from your project's component directory (@/components/ui)
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// --- TYPE DEFINITION ---
interface PaymentFormValues {
  tenant: string;
  amount: number | string; // Use string for input field, convert to number on submit
  method: string;
  date: string;
  reference?: string;
}

// --- MOCK DATA ---
const mockTenants = [
  { value: "john_doe", label: "John Doe (Apt 101)" },
  { value: "jane_smith", label: "Jane Smith (Apt 205)" },
  { value: "alex_chen", label: "Alex Chen (House 3B)" },
];

const mockMethods = [
  { value: "bank_transfer", label: "Bank Transfer" },
  { value: "credit_card", label: "Credit Card" },
  { value: "cash", label: "Cash" },
  { value: "cheque", label: "Cheque" },
];

// --- CUSTOM RESOLVER (Manual Validation) ---
const paymentResolver: Resolver<PaymentFormValues> = async (values) => {
  const errors: Record<string, any> = {};
  const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/; // mm/dd/yyyy

  // 1. Tenant validation
  if (!values.tenant) {
    errors.tenant = { type: "required", message: "Please select a tenant." };
  }

  // 2. Amount validation
  const amountValue = String(values.amount);
  if (!amountValue || amountValue.trim() === "") {
    errors.amount = { type: "required", message: "Amount is required." };
  } else if (!/^\d+(\.\d{1,2})?$/.test(amountValue)) {
    errors.amount = {
      type: "pattern",
      message: "Invalid currency format (e.g., 1500.00).",
    };
  }

  // 3. Method validation
  if (!values.method) {
    errors.method = {
      type: "required",
      message: "Please select a payment method.",
    };
  }

  // 4. Date validation
  if (!values.date) {
    errors.date = { type: "required", message: "Date is required." };
  } else if (!dateRegex.test(values.date)) {
    errors.date = {
      type: "pattern",
      message: "Date must be in mm/dd/yyyy format.",
    };
  }

  return {
    values: Object.keys(errors).length > 0 ? {} : values,
    errors: errors,
  };
};

const RecordPaymentDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<PaymentFormValues>({
    resolver: paymentResolver,
    defaultValues: {
      tenant: "",
      amount: "",
      method: "",
      date: "",
      reference: "",
    },
    mode: "onTouched",
  });

  const {
    formState: { isSubmitting },
    reset,
  } = form;

  const onSubmit = (data: PaymentFormValues) => {
    const finalData = {
      ...data,
      amount: parseFloat(String(data.amount)),
    };

    console.log("Final Payment Data:", finalData);

    setTimeout(() => {
      console.log("Payment successfully recorded!");
      setIsOpen(false);
      reset();
    }, 1000);
  };

  return (
    <div className="p-4  flex items-center justify-center font-sans">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <p className="text-base font-bold text-white">Record Payment</p>
        </DialogTrigger>

        <DialogContent className="sm:max-w-md md:max-w-lg rounded-xl p-0 bg-white shadow-2xl">
          <DialogHeader className="p-6 border-b border-gray-100">
            <DialogTitle className="text-2xl font-extrabold text-gray-900">
              Record Payment
            </DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 p-6">
              <FormField
                control={form.control}
                name="tenant"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Tenant
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-gray-50 h-12 border-gray-200 text-base">
                          <SelectValue placeholder="Select tenant" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {mockTenants.map((t) => (
                          <SelectItem key={t.value} value={t.value}>
                            {t.label}
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
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Amount ($)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="e.g., 1500.00"
                        className="bg-gray-50 h-12 border-gray-200 placeholder:text-gray-400 text-base"
                        {...field}
                        onChange={(e) => field.onChange(e.target.value)}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="method"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Payment Method
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-gray-50 h-12 border-gray-200 text-base">
                          <SelectValue placeholder="Select method" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {mockMethods.map((m) => (
                          <SelectItem key={m.value} value={m.value}>
                            {m.label}
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
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Payment Date
                    </FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          placeholder="mm/dd/yyyy"
                          maxLength={10}
                          className="pr-10 bg-gray-50 h-12 border-gray-200 placeholder:text-gray-400 text-base"
                          {...field}
                        />
                      </FormControl>
                      <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="reference"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Reference/Transaction ID (Optional)
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter reference number or transaction ID"
                        className="bg-gray-50 h-12 border-gray-200 placeholder:text-gray-400 text-base"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100 -mx-6 px-6">
                <Button
                  type="button"
                  variant="ghost"
                  className="px-6 h-12 text-gray-600 hover:text-gray-900"
                  onClick={() => setIsOpen(false)}
                  disabled={isSubmitting}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="px-6 h-12 bg-orange-500 hover:bg-orange-600 text-white shadow-md transition-colors disabled:opacity-70"
                  disabled={isSubmitting}>
                  {isSubmitting ? "Recording..." : "Record Payment"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RecordPaymentDialog;
