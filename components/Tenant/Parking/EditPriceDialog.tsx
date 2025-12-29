import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PenLine, X } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
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
import { Button } from "@/components/ui/button";

export const editPriceSchema = z.object({
  newPrice: z.number().min(0, "Price must be a positive number"),
  reason: z.string().optional(),
});

export type EditPriceFormValues = z.infer<typeof editPriceSchema>;

interface EditPriceProps {
  spotId: string;
  yourCost: number;
  currentPrice: number;
}

export function EditPriceDialog({
  spotId,
  yourCost,
  currentPrice,
}: EditPriceProps) {
  const form = useForm<EditPriceFormValues>({
    resolver: zodResolver(editPriceSchema),
    defaultValues: {
      newPrice: currentPrice,
      reason: "",
    },
  });

  const watchedPrice = form.watch("newPrice");
  const calculatedProfit = (watchedPrice || 0) - yourCost;

  const onSubmit = (data: EditPriceFormValues) => {
    console.log("Updated Data:", data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <PenLine className="h-4 w-4 text-slate-500" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px] p-8">
        <DialogHeader className="space-y-1">
          <DialogTitle className="text-2xl font-bold text-[#1e293b]">
            Edit Sublease Price
          </DialogTitle>
          <p className="text-sm font-semibold text-slate-500">{spotId}</p>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 mt-4 mb-6">
          <div className="p-4 rounded-lg border border-red-200 bg-white">
            <p className="text-xs font-medium text-slate-500 mb-1">Your Cost</p>
            <p className="text-xl font-bold text-red-500">${yourCost}</p>
          </div>
          <div className="p-4 rounded-lg border border-green-200 bg-white">
            <p className="text-xs font-medium text-slate-500 mb-1">
              Current Price
            </p>
            <p className="text-xl font-bold text-green-500">${currentPrice}</p>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="newPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-bold text-[#1e293b]">
                    New Sublease Price
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-slate-50 border-none h-12 text-slate-600 focus-visible:ring-1"
                      placeholder="200"
                      {...field}
                    />
                  </FormControl>
                  <p className="text-sm font-medium text-slate-500 pt-1">
                    Profit: ${calculatedProfit}
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-bold text-[#1e293b]">
                    Reason for Change (Optional)
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-slate-50 border-none h-12 text-slate-600 focus-visible:ring-1"
                      placeholder="E.g., Market rate adjustment"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-4 pt-4">
              <DialogClose asChild>
                <Button
                  type="button"
                  className="flex-1 h-12 bg-slate-500 hover:bg-slate-600 text-white font-bold">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className="flex-1 h-12 bg-[#f97316] hover:bg-[#ea580c] text-white font-bold">
                Update Price
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
