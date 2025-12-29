"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { PlusCircle, Info } from "lucide-react";

import {
  Dialog,
  DialogContent,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";

const API_CATEGORIES = [
  { id: "prop", label: "Property Management", total: 7 },
  { id: "tenant", label: "Tenant & Sub-tenant Management", total: 7 },
  { id: "fin", label: "Financial & Billing Management", total: 6 },
  { id: "agr", label: "Agreements & Contracts", total: 5 },
  { id: "maint", label: "Maintenance & Services", total: 5 },
  { id: "comp", label: "Complaints & Disputes", total: 4 },
  { id: "occu", label: "Occupancy Management", total: 4 },
  { id: "notif", label: "Notifications & Communication", total: 3 },
  { id: "sales", label: "Sales & Marketing", total: 6 },
];

const tokenSchema = z.object({
  tokenName: z.string().min(1, "Token name is required"),
  description: z.string().optional(),
  expiration: z.string().min(1, "Please select an expiration period"),
  permissions: z.record(z.string(), z.boolean()),
});

type TokenFormValues = z.infer<typeof tokenSchema>;

export function CreateTokenDialog() {
  const form = useForm<TokenFormValues>({
    resolver: zodResolver(tokenSchema),
    defaultValues: {
      tokenName: "",
      description: "",
      expiration: "30",
      permissions: {},
    },
  });

  // Function to handle global "Select All"
  const handleSelectAll = () => {
    const allTrue = API_CATEGORIES.reduce((acc, cat) => {
      acc[cat.id] = true;
      return acc;
    }, {} as Record<string, boolean>);
    form.setValue("permissions", allTrue);
  };

  // Function to handle global "Clear All"
  const handleClearAll = () => {
    const allFalse = API_CATEGORIES.reduce((acc, cat) => {
      acc[cat.id] = false;
      return acc;
    }, {} as Record<string, boolean>);
    form.setValue("permissions", allFalse);
  };

  const onSubmit = (values: TokenFormValues) => {
    console.log("Token Created:", values);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-orange-500 hover:bg-orange-600 gap-2 font-bold px-6 py-5 rounded-xl transition-all">
          <PlusCircle className="h-5 w-5" />
          Create Token
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-[700px] max-h-[90vh] overflow-y-auto p-0 border-none">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="p-8 space-y-8">
            <DialogHeader>
              <DialogTitle className="text-3xl font-extrabold text-slate-900">
                Create API Token
              </DialogTitle>
              <p className="text-slate-500">
                Generate a new API token for integration with external services
              </p>
            </DialogHeader>

            {/* Basic Info Card */}
            <Card className="p-6 space-y-6 bg-slate-50/40 border-slate-100">
              <FormField
                control={form.control}
                name="tokenName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Token Name *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Mobile App Integration"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe what this token will be used for..."
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="expiration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Expiration *</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select expiration" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="30">30 days</SelectItem>
                        <SelectItem value="60">60 days</SelectItem>
                        <SelectItem value="90">90 days</SelectItem>
                        <SelectItem value="never">Never</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </Card>

            {/* Permissions Section */}
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2">
                <h3 className="text-lg font-bold text-slate-900">
                  API Permissions
                </h3>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleSelectAll}>
                    Select All
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleClearAll}>
                    Clear All
                  </Button>
                </div>
              </div>

              <Card className="divide-y divide-slate-100 border-slate-100">
                {API_CATEGORIES.map((cat) => (
                  <FormField
                    key={cat.id}
                    control={form.control}
                    name={`permissions.${cat.id}`}
                    render={({ field }) => (
                      <div className="flex items-center justify-between p-4 hover:bg-slate-50/50 transition-colors">
                        <div>
                          <p className="font-bold text-slate-800">
                            {cat.label}
                          </p>
                          <p className="text-xs text-slate-400">
                            {field.value ? cat.total : 0} of {cat.total}{" "}
                            permissions selected
                          </p>
                        </div>
                        <FormControl>
                          <Switch
                            checked={!!field.value}
                            onCheckedChange={field.onChange}
                            className="data-[state=checked]:bg-orange-500"
                          />
                        </FormControl>
                      </div>
                    )}
                  />
                ))}
              </Card>
            </div>

            <DialogFooter className="flex gap-4 pt-6">
              <Button
                type="button"
                className="flex-1 bg-slate-500 hover:bg-slate-600 text-white py-6"
                onClick={() => form.reset()}>
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-6 shadow-lg shadow-orange-100">
                Generate Token
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
