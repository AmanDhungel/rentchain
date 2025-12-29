import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2, Plus, ArrowLeft, Send, Save, Eye } from "lucide-react";
import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const invoiceSchema = z.object({
  subTenant: z.string().min(1, "Required"),
  billingPeriod: z.string(),
  dueDate: z.string(),
  items: z.array(
    z.object({
      description: z.string(),
      category: z.string(),
      amount: z.number().min(0),
    })
  ),
  notes: z.string().optional(),
});

const CreateInvoice: React.FC = () => {
  const form = useForm<z.infer<typeof invoiceSchema>>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      items: [
        { description: "Utilities Share", category: "Utilities", amount: 0 },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  const subtotal = form
    .watch("items")
    .reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);

  return (
    <div className="max-w-5xl mx-auto p-6 bg-slate-50 min-h-screen">
      <header className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <ArrowLeft />
          </Button>
          <h1 className="text-2xl font-bold">Create Invoice</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Eye size={16} /> Preview
          </Button>
          <Button variant="outline" className="gap-2">
            <Save size={16} /> Save Draft
          </Button>
          <Button className="bg-orange-500 hover:bg-orange-600 gap-2">
            <Send size={16} /> Send Invoice
          </Button>
        </div>
      </header>

      <Form {...form}>
        <form className="space-y-6">
          {/* Design 5: Basic Information */}
          <Card className="shadow-none border-slate-200">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-bold text-slate-800">Basic Information</h3>
              <FormField
                control={form.control}
                name="subTenant"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-bold text-slate-500 uppercase">
                      Sub-tenant
                    </FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select sub-tenant" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="john">John Smith</SelectItem>
                        <SelectItem value="sarah">Sarah Johnson</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="billingPeriod"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-bold text-slate-500 uppercase">
                        Billing Period
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., February 2024" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dueDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-bold text-slate-500 uppercase">
                        Due Date
                      </FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Design 6: Line Items & Summary */}
          <Card className="shadow-none border-slate-200">
            <CardContent className="p-6 space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                  Line Items
                </h3>
                <Button
                  type="button"
                  size="sm"
                  onClick={() =>
                    append({
                      description: "",
                      category: "Utilities",
                      amount: 0,
                    })
                  }
                  className="bg-orange-500">
                  <Plus size={14} className="mr-1" /> Add Item
                </Button>
              </div>

              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="p-4 border rounded-lg relative bg-white space-y-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2 text-red-500"
                    onClick={() => remove(index)}>
                    <Trash2 size={16} />
                  </Button>
                  <div className="grid grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name={`items.${index}.description`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[10px] font-bold">
                            Description
                          </FormLabel>
                          <Input {...field} />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`items.${index}.category`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[10px] font-bold">
                            Category
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Utilities">
                                Utilities
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`items.${index}.amount`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[10px] font-bold">
                            Amount
                          </FormLabel>
                          <div className="relative">
                            <span className="absolute left-3 top-2 text-slate-400">
                              $
                            </span>
                            <Input
                              type="number"
                              className="pl-7"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseFloat(e.target.value))
                              }
                            />
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              ))}

              <div className="pt-6 border-t space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Subtotal:</span>
                  <span className="font-bold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-2">
                  <span>Total Amount:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
};

export default CreateInvoice;
