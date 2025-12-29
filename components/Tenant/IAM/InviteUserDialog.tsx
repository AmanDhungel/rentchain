"use client";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";

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
import Image from "next/image";
import { icons } from "@/assets/icons/exports";

const formSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  role: z.string().min(1, { message: "Please select a role" }),
  propertyAccess: z
    .string()
    .min(1, { message: "Please select property access" }),
  welcomeMessage: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function InviteUserDialog() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      role: "",
      propertyAccess: "",
      welcomeMessage: "",
    },
  });

  function onSubmit(values: FormValues) {
    console.log("Form Submitted:", values);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-orange-500 hover:bg-orange-600 gap-2">
          <Image
            src={icons.RoundedPlusIcon}
            width={15}
            height={15}
            alt="roundedplus"
          />
          Invite User
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[550px] p-8">
        <DialogHeader className="relative">
          <DialogTitle className="text-2xl font-bold text-slate-900">
            Invite Team Member
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Send an invitation to join your property management team.
          </p>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 mt-4">
            {/* Email Address */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-slate-700">
                    Email Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter email address"
                      className="bg-slate-50/50 border-slate-100"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Assign Role */}
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-slate-700">
                    Assign Role
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-slate-50/50 border-slate-100 text-slate-400">
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="manager">Property Manager</SelectItem>
                      <SelectItem value="agent">Real Estate Agent</SelectItem>
                      <SelectItem value="maintenance">
                        Maintenance Coordinator
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Property Access */}
            <FormField
              control={form.control}
              name="propertyAccess"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-slate-700">
                    Property Access
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-slate-50/50 border-slate-100 text-slate-400">
                        <SelectValue placeholder="Select properties" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="all">All Properties</SelectItem>
                      <SelectItem value="skyline">Skyline Towers</SelectItem>
                      <SelectItem value="garden">Garden Villa</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Welcome Message */}
            <FormField
              control={form.control}
              name="welcomeMessage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-slate-700">
                    Welcome Message (Optional)
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Welcome to our property management team."
                      className="min-h-[100px] bg-slate-50/50 border-slate-100"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Footer Buttons */}
            <div className="flex gap-4 pt-4">
              <DialogClose asChild>
                <Button
                  type="button"
                  className="flex-1 bg-slate-500 hover:bg-slate-600 text-white">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white">
                Send Invitation
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
