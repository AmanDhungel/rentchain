"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const reportSchema = z.object({
  reportType: z.string().min(1, "Please select a report type"),
  property: z.string().min(1, "Please select a property"),
  period: z.string().min(1, "Please select a period"),
});

export const ReportGeneratorForm: React.FC = () => {
  const form = useForm<z.infer<typeof reportSchema>>({
    resolver: zodResolver(reportSchema),
    defaultValues: { reportType: "", property: "all", period: "last-month" },
  });

  return (
    <DialogContent className="sm:max-w-[480px] p-0 overflow-hidden border-none shadow-2xl rounded-3xl">
      <div className="p-10">
        <DialogHeader className="mb-10 text-left">
          <DialogTitle className="text-2xl font-black text-slate-900">
            Generate Custom Report
          </DialogTitle>
          <p className="text-sm text-slate-500 font-medium">
            Select parameters to create a custom financial document.
          </p>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((d) => console.log(d))}
            className="space-y-6">
            <FormField
              control={form.control}
              name="reportType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Report Template
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-12 bg-slate-50 border-none rounded-xl px-4 font-bold text-slate-700">
                        <SelectValue placeholder="Choose a report..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="p-and-l">
                        Profit & Loss Statement
                      </SelectItem>
                      <SelectItem value="rent-roll">
                        Detailed Rent Roll
                      </SelectItem>
                      <SelectItem value="ledger">Owner Ledger</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="property"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Property
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12 bg-slate-50 border-none rounded-xl font-bold">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="all">All Properties</SelectItem>
                        <SelectItem value="apt-4b">Apt 4B - Skyline</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="period"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Period
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12 bg-slate-50 border-none rounded-xl font-bold">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="last-month">Last Month</SelectItem>
                        <SelectItem value="ytd">Year to Date</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-[#FF6B00] hover:bg-[#E66000] h-12 rounded-xl font-bold text-white shadow-lg shadow-orange-100 gap-2 mt-4">
              <Download size={18} /> Generate PDF
            </Button>
          </form>
        </Form>
      </div>
    </DialogContent>
  );
};
