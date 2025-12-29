import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import * as z from "zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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

const formSchema = z.object({
  amount: z.number().min(0.01, "Amount must be greater than 0"),
  reason: z
    .string()
    .min(5, "Please provide a detailed reason for the application"),
});

type DepositFormValues = z.infer<typeof formSchema>;

interface ApplyDepositProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ApplyDepositDialog: React.FC<ApplyDepositProps> = ({
  open,
  onOpenChange,
}) => {
  const form = useForm<DepositFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
      reason: "",
    },
  });

  const onSubmit = (values: DepositFormValues) => {
    console.log("Applying deposit:", values);
    onOpenChange(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden border-none shadow-2xl">
        <div className="p-8">
          <DialogHeader className="mb-8">
            <DialogTitle className="text-2xl font-bold text-slate-800">
              Apply Deposit
            </DialogTitle>
            <p className="text-sm text-slate-500 font-medium">
              Apply deposit amount to damages or arrears
            </p>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-bold text-slate-700">
                      Amount to Apply
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                          $
                        </span>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          className="pl-8 h-12 bg-slate-50 border-none focus-visible:ring-orange-500 font-medium"
                          {...field}
                          onChange={(e) =>
                            field.onChange(e.target.valueAsNumber)
                          }
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-bold text-slate-700">
                      Reason
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the damages or arrears..."
                        className="bg-slate-50 border-none min-h-[100px] focus-visible:ring-orange-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="submit"
                  className="flex-1 bg-orange-500 hover:bg-orange-600 h-12 font-bold">
                  Apply Amount
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="h-12 font-bold text-slate-600 border-slate-200"
                  onClick={() => {
                    onOpenChange(false);
                    form.reset();
                  }}>
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApplyDepositDialog;
