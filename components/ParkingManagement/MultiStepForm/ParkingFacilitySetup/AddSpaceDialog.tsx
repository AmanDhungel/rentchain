import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import {
  SingleSpaceSchema,
  BulkAddSchema,
  SingleSpace,
  BulkAddValues,
} from "./FaciltySetup.types";

interface AddSpaceDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSpaces: (data: SingleSpace[] | BulkAddValues) => void;
}

export function AddSpaceDialog({
  isOpen,
  onClose,
  onAddSpaces,
}: AddSpaceDialogProps) {
  // We use two different forms for simplicity and validation accuracy
  const singleSpaceForm = useForm<SingleSpace>({
    resolver: zodResolver(SingleSpaceSchema),
    defaultValues: { spaceNumber: "" },
  });

  const bulkAddForm = useForm<BulkAddValues>({
    resolver: zodResolver(BulkAddSchema),
    defaultValues: {
      startSpaceNumber: "",
      endSpaceNumber: "",
      spaceType: "standard",
      isReservable: false,
    },
  });

  const handleSingleSubmit = (data: SingleSpace) => {
    onAddSpaces([data]);
    singleSpaceForm.reset();
  };

  const handleBulkSubmit = (data: BulkAddValues) => {
    onAddSpaces(data);
    bulkAddForm.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Add Parking Space</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="single">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="single">Single Space</TabsTrigger>
            <TabsTrigger value="bulk">Bulk Add</TabsTrigger>
          </TabsList>

          {/* --- Single Space Tab --- */}
          <TabsContent value="single" className="pt-4">
            <Form {...singleSpaceForm}>
              <form
                onSubmit={singleSpaceForm.handleSubmit(handleSingleSubmit)}
                className="space-y-4">
                <FormField
                  control={singleSpaceForm.control}
                  name="spaceNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Space Number</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., S-101" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700">
                  Add Single Space
                </Button>
              </form>
            </Form>
          </TabsContent>

          {/* --- Bulk Add Tab --- */}
          <TabsContent value="bulk" className="pt-4">
            <Form {...bulkAddForm}>
              <form
                onSubmit={bulkAddForm.handleSubmit(handleBulkSubmit)}
                className="space-y-4">
                {/* Start and End Numbers */}
                <div className="flex space-x-4">
                  <FormField
                    control={bulkAddForm.control}
                    name="startSpaceNumber"
                    render={({ field }) => (
                      <FormItem className="w-1/2">
                        <FormLabel>Start Space Number</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 1" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={bulkAddForm.control}
                    name="endSpaceNumber"
                    render={({ field }) => (
                      <FormItem className="w-1/2">
                        <FormLabel>End Space Number</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 20" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Space Type (Select) */}
                {/* Implement Select component here using shadcn/ui and FormField */}

                {/* Is Reservable (Checkbox) */}
                <FormField
                  control={bulkAddForm.control}
                  name="isReservable"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-md">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Designate as Reservable Spaces</FormLabel>
                        <p className="text-sm text-muted-foreground">
                          Spaces added in this bulk operation can be reserved.
                        </p>
                      </div>
                    </FormItem>
                  )}
                />

                {/* Note (Textarea) */}
                {/* Implement Textarea component here using shadcn/ui and FormField */}

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700">
                  Add Spaces
                </Button>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
