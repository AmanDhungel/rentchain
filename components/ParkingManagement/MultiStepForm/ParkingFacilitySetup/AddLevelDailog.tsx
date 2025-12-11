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
import { AddLevelSchema, AddLevelValues } from "./FaciltySetup.types";

interface AddLevelDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (data: AddLevelValues) => void;
}

export function AddLevelDialog({
  isOpen,
  onClose,
  onAdd,
}: AddLevelDialogProps) {
  const form = useForm<AddLevelValues>({
    resolver: zodResolver(AddLevelSchema),
    defaultValues: { name: "" },
  });

  const onSubmit = (data: AddLevelValues) => {
    onAdd(data);
    form.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Parking Level</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Level Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Ground Floor, P1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700">
              Add Level
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
