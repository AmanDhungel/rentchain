import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui";

const maintenanceSchema = z.object({
  property: z.string().min(1),
  category: z.string().min(1),
  priority: z.string().min(1),
  title: z.string().min(5),
  description: z.string().min(10),
});

export function NewRequestForm() {
  const form = useForm<z.infer<typeof maintenanceSchema>>({
    resolver: zodResolver(maintenanceSchema),
  });

  return (
    <Card className="p-10 space-y-8">
      <Form {...form}>
        <form className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <FormField
              name="property"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Property & Unit *</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select property" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="sunset-304">
                        Sunset Apartments - Unit 304
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Category *</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="plumbing">Plumbing</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>

          <FormField
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Issue Title *</FormLabel>
                <Input placeholder="Brief description..." {...field} />
              </FormItem>
            )}
          />

          <FormField
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">
                  Detailed Description *
                </FormLabel>
                <Textarea
                  className="h-32"
                  placeholder="Provide as much detail as possible..."
                  {...field}
                />
              </FormItem>
            )}
          />

          {/* Attachments UI placeholder based on design */}
          <div className="grid grid-cols-2 gap-4">
            <Button
              type="button"
              variant="outline"
              className="h-16 border-dashed">
              Take Photo
            </Button>
            <Button
              type="button"
              variant="outline"
              className="h-16 border-dashed">
              Record Video
            </Button>
          </div>

          <div className="pt-6 border-t">
            <h4 className="text-orange-600 font-bold text-sm mb-2">
              Response Time Guidelines
            </h4>
            <ul className="text-xs text-slate-500 space-y-1 list-disc pl-4">
              <li>Emergency: Within 2 hours</li>
              <li>High Priority: Within 24 hours</li>
            </ul>
          </div>

          <Button
            type="submit"
            className="w-full bg-orange-500 py-6 text-lg font-bold">
            Submit Request
          </Button>
        </form>
      </Form>
    </Card>
  );
}
