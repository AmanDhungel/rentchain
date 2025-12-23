import { zodResolver } from "@hookform/resolvers/zod";
import {
  X,
  Upload,
  Calendar as CalendarIcon,
  ChevronDown,
  Plus,
} from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Label } from "@/components/ui";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  requestType: z.string().min(1, "Please select a type"),
  targetArea: z.string().min(1, "Target area is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  reason: z.string().min(1, "Please provide a reason"),
  effectiveDate: z.string().min(1, "Please select a date"),
});

type FormValues = z.infer<typeof formSchema>;

export default function CreateModificationRequest() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      requestType: "",
      targetArea: "",
      description: "",
      reason: "",
      effectiveDate: "",
    },
  });

  function onSubmit(values: FormValues) {
    console.log("Form Submitted:", values);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#FF7043] hover:bg-[#F4511E] text-white px-4 py-2 gap-2 text-sm font-semibold rounded-md shadow-sm">
          <Plus className="h-4 w-4" /> New Request
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[550px] p-0 overflow-hidden border-none shadow-2xl">
        <div className="p-6 pb-2">
          <div className="flex items-center justify-between mb-1">
            <DialogTitle className="text-2xl font-bold text-[#1e293b]">
              Create Modification Request
            </DialogTitle>
          </div>
          <p className="text-sm text-gray-500 font-medium">
            Submit a request to modify your leased space for subdivision or
            improvements.
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="p-6 pt-2 space-y-5">
            <FormField
              control={form.control}
              name="requestType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold text-[#1e293b] uppercase tracking-tight">
                    Visitor Spots Limit
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-[#f8fafc] border-gray-100 h-11 text-gray-400">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="partition">
                        Partition Request
                      </SelectItem>
                      <SelectItem value="fixture">Fixture Request</SelectItem>
                      <SelectItem value="allocation">
                        Allocation Request
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Target Area/Scope */}
            <FormField
              control={form.control}
              name="targetArea"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold text-[#1e293b] uppercase tracking-tight">
                    Target Area/Scope
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Bedroom → 2 bedspaces"
                      className="bg-[#f8fafc] border-gray-100 h-11 placeholder:text-gray-300"
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
                  <FormLabel className="text-xs font-bold text-[#1e293b] uppercase tracking-tight">
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the proposed modification..."
                      className="bg-[#f8fafc] border-gray-100 min-h-[80px] resize-none placeholder:text-gray-300"
                      {...field}
                    />
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
                  <FormLabel className="text-xs font-bold text-[#1e293b] uppercase tracking-tight">
                    Reason/Justification
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Explain why this modification is needed..."
                      className="bg-[#f8fafc] border-gray-100 min-h-[80px] resize-none placeholder:text-gray-300"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="effectiveDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold text-[#1e293b] uppercase tracking-tight">
                    Requested Effective Date
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="mm/dd/yyyy"
                        className="bg-[#f8fafc] border-gray-100 h-11 placeholder:text-gray-300 pr-10"
                        {...field}
                      />
                      <CalendarIcon className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Label
              htmlFor="upload-items"
              className="border-2 border-dashed border-gray-100 rounded-xl p-8 flex flex-col items-center justify-center bg-[#f8fafc] cursor-pointer hover:bg-gray-50 transition-colors">
              <Upload className="h-6 w-6 text-gray-400 mb-2" />
              <span className="text-sm text-gray-400 font-medium">
                Click to upload files
              </span>
              <Input type="file" className="hidden" id="upload-items" />
            </Label>

            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1 h-12 bg-[#64748b] text-white hover:bg-[#475569] border-none font-bold">
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 h-12 bg-[#f97316] hover:bg-[#ea580c] text-white border-none font-bold">
                Submit Request
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
