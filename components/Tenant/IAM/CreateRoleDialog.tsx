"use client";
import * as z from "zod";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, PlusCircle } from "lucide-react";
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
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const roleSchema = z.object({
  roleName: z.string().min(1, "Role name is required"),
  roleId: z.string().min(1, "Role ID is required"),
  description: z.string().optional(),
  permissions: z.record(z.string(), z.boolean()),
});

type RoleFormValues = z.infer<typeof roleSchema>;

const PERMISSION_GROUPS = [
  {
    id: "prop_mgmt",
    title: "Property Management",
    items: [
      { id: "v_prop", label: "View Properties", sub: "Access property info" },
      {
        id: "e_prop",
        label: "Edit Properties",
        sub: "Modify property details",
      },
      { id: "m_unit", label: "Manage Units", sub: "Add/remove units" },
      { id: "v_occ", label: "View Occupancy", sub: "Access occupancy reports" },
      {
        id: "m_amen",
        label: "Manage Amenities",
        sub: "Update property features",
      },
      { id: "p_mark", label: "Property Marketing", sub: "Create listings" },
      {
        id: "s_coord",
        label: "Showing Coordination",
        sub: "Schedule viewings",
      },
    ],
  },
  {
    id: "tenant_mgmt",
    title: "Tenant & Sub-tenant Management",
    items: [
      { id: "v_ten", label: "View Tenants", sub: "Access profiles" },
      { id: "i_ten", label: "Invite Tenants", sub: "Send invitations" },
      { id: "m_sub", label: "Manage Sub-tenants", sub: "Handle relationships" },
      { id: "e_ten", label: "Edit Tenant Profiles", sub: "Modify info" },
      { id: "r_ten", label: "Remove Tenants", sub: "End relationships" },
      { id: "t_scr", label: "Tenant Screening", sub: "Background checks" },
      { id: "l_mgmt", label: "Lead Management", sub: "Track prospects" },
    ],
  },
  {
    id: "fin_mgmt",
    title: "Financial & Billing Management",
    items: [
      { id: "v_fin", label: "View Financial Data", sub: "Access reports" },
      { id: "c_inv", label: "Create Invoices", sub: "Generate bills" },
      { id: "p_pay", label: "Process Payments", sub: "Handle transactions" },
      { id: "m_dep", label: "Manage Deposits", sub: "Security deposits" },
      { id: "a_acc", label: "Access Accounting", sub: "Dashboard access" },
      { id: "e_rep", label: "Export Reports", sub: "Download financials" },
    ],
  },
  {
    id: "agr_cont",
    title: "Agreements & Contracts",
    items: [
      { id: "v_agr", label: "View Agreements", sub: "Access leases" },
      { id: "c_agr", label: "Create Agreements", sub: "Draft new ones" },
      { id: "e_agr", label: "Edit Agreements", sub: "Modify existing" },
      { id: "s_agr", label: "Sign Agreements", sub: "Electronic signing" },
      { id: "t_agr", label: "Terminate Agreements", sub: "End early" },
    ],
  },
  {
    id: "maint_serv",
    title: "Maintenance & Services",
    items: [
      { id: "v_work", label: "View Work Orders", sub: "Access requests" },
      { id: "c_work", label: "Create Work Orders", sub: "Submit requests" },
      { id: "a_vend", label: "Assign Vendors", sub: "Manage providers" },
      { id: "a_serv", label: "Approve Services", sub: "Authorize work" },
      { id: "m_util", label: "Manage Utilities", sub: "Utility mgmt" },
    ],
  },
  {
    id: "comp_disp",
    title: "Complaints & Disputes",
    items: [
      { id: "v_comp", label: "View Complaints", sub: "Submission access" },
      { id: "r_comp", label: "Respond to Complaints", sub: "Resolution" },
      { id: "e_disp", label: "Escalate Disputes", sub: "Escalation mgmt" },
      { id: "c_comp", label: "Close Complaints", sub: "Mark resolved" },
    ],
  },
  {
    id: "occ_mgmt",
    title: "Occupancy Management",
    items: [
      { id: "m_occ", label: "Manage Occupants", sub: "Add/remove" },
      { id: "a_gst", label: "Approve Guests", sub: "Guest permissions" },
      { id: "s_stay", label: "Short-term Stays", sub: "Temporary mgmt" },
      { id: "o_rep", label: "Occupancy Reports", sub: "Analytics access" },
    ],
  },
  {
    id: "notif_comm",
    title: "Notifications & Communication",
    items: [
      { id: "s_notif", label: "Send Notifications", sub: "Alerts/messages" },
      { id: "m_ann", label: "Manage Announcements", sub: "Guest perms" },
      { id: "c_logs", label: "Communication Logs", sub: "Message history" },
    ],
  },
  {
    id: "sales_mark",
    title: "Sales & Marketing",
    items: [
      { id: "p_mark_s", label: "Property Marketing", sub: "Create listings" },
      { id: "s_coord_s", label: "Showing Coordination", sub: "Schedule tours" },
      { id: "l_mgmt_s", label: "Lead Management", sub: "Track tenants" },
      { id: "t_scr_s", label: "Tenant Screening", sub: "Credit checks" },
      { id: "c_track", label: "Commission Tracking", sub: "Monitor earnings" },
      { id: "m_anal", label: "Market Analysis", sub: "Pricing trends" },
    ],
  },
];

const QUICK_TEMPLATES = [
  {
    name: "Property Manager",
    perms: [
      "v_prop",
      "e_prop",
      "m_unit",
      "v_occ",
      "m_amen",
      "p_mark",
      "s_coord",
      "v_fin",
      "c_inv",
      "v_work",
      "a_vend",
    ],
    count: 21,
  },
  {
    name: "Real Estate Agent",
    perms: [
      "v_prop",
      "v_occ",
      "p_mark",
      "s_coord",
      "l_mgmt",
      "v_agr",
      "p_mark_s",
      "s_coord_s",
      "l_mgmt_s",
      "t_scr_s",
    ],
    count: 29,
  },
  {
    name: "Financial Assistant",
    perms: ["v_fin", "c_inv", "p_pay", "m_dep", "a_acc", "e_rep", "c_track"],
    count: 7,
  },
  {
    name: "Maintenance Coordinator",
    perms: ["v_work", "c_work", "a_vend", "a_serv", "m_util"],
    count: 7,
  },
  {
    name: "Tenant Liaison",
    perms: [
      "v_ten",
      "i_ten",
      "m_sub",
      "e_ten",
      "v_comp",
      "r_comp",
      "s_notif",
      "m_ann",
    ],
    count: 10,
  },
  {
    name: "Administrative Assistant",
    perms: ["v_prop", "v_ten", "v_agr", "s_notif", "c_logs"],
    count: 6,
  },
];

export function CreateRoleDialog() {
  const form = useForm<RoleFormValues>({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      roleName: "",
      roleId: "",
      description: "",
      permissions: {},
    },
  });

  const handleClearAll = () => {
    const allPermissionIds = PERMISSION_GROUPS.flatMap((group) =>
      group.items.map((item) => item.id)
    );

    const resetPermissions = allPermissionIds.reduce((acc, id) => {
      acc[id] = false;
      return acc;
    }, {} as Record<string, boolean>);

    form.setValue("permissions", resetPermissions, {
      shouldDirty: true,
      shouldTouch: true,
    });
  };
  const handleSelectAll = (groupId: string, itemIds: string[]) => {
    const currentValues = form.getValues("permissions");
    const newValues = { ...currentValues };
    itemIds.forEach((id) => (newValues[id] = true));
    form.setValue("permissions", newValues);
  };

  const applyTemplate = (perms: string[]) => {
    const newPerms: Record<string, boolean> = {};
    perms.forEach((id) => (newPerms[id] = true));
    form.setValue("permissions", newPerms);
  };

  const handleTemplateClick = (perms: string[]) => {
    const updated: Record<string, boolean> = {};
    perms.forEach((id) => (updated[id] = true));
    form.setValue("permissions", updated);
  };

  const onSubmit = (data: RoleFormValues) => console.log(data);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-orange-500 hover:bg-orange-600 gap-2">
          <PlusCircle className="h-5 w-5" />
          Create Role
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 border-none">
        <div className="p-8 space-y-8">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-slate-900">
              Create Custom Role
            </DialogTitle>
            <p className="text-slate-500">
              Define a new role with specific permissions for your property
              management needs
            </p>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <Card className="p-6 space-y-4 bg-slate-50/30">
                <div className="grid grid-cols-1 gap-4">
                  <FormField
                    control={form.control}
                    name="roleName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold">Role Name *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. Assistant Manager"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="roleId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold">Role ID *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. assistant_manager"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe the responsibilities..."
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </Card>

              <div className="space-y-6">
                <div className="flex justify-between items-center border-b pb-2">
                  <h3 className="text-xl font-bold">Permissions</h3>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        handleClearAll();
                      }}>
                      Clear All
                    </Button>
                  </div>
                </div>

                {PERMISSION_GROUPS.map((group) => (
                  <Card key={group.id} className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <h4 className="font-bold text-lg">{group.title}</h4>
                        <p className="text-xs text-slate-400">
                          0 of {group.items.length} permissions selected
                        </p>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          handleSelectAll(
                            group.id,
                            group.items.map((i) => i.id)
                          )
                        }>
                        Select All
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                      {group.items.map((item) => (
                        <FormField
                          key={item.id}
                          control={form.control}
                          name={`permissions.${item.id}`}
                          render={({ field }) => {
                            return (
                              <FormItem className="flex flex-row items-center justify-between space-y-0 rounded-lg border p-3">
                                <div className="space-y-0.5">
                                  <FormLabel className="font-semibold text-sm cursor-pointer">
                                    {item.label}
                                  </FormLabel>
                                  <p className="text-[10px] text-slate-400">
                                    {item.sub}
                                  </p>
                                </div>
                                <FormControl>
                                  <Switch
                                    checked={!!field.value}
                                    onCheckedChange={field.onChange}
                                    className="data-[state=checked]:bg-orange-500"
                                  />
                                </FormControl>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </div>
                  </Card>
                ))}
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-lg">Quick Templates</h3>
                <p className="text-sm text-slate-500">
                  Start with a predefined role template and customize as needed
                </p>
                <div className="grid grid-cols-3 gap-4">
                  {QUICK_TEMPLATES.map((template) => (
                    <Card
                      key={template.name}
                      className="p-5 cursor-pointer border-2 border-transparent hover:border-orange-500 hover:bg-orange-50/10 transition-all"
                      onClick={() => handleTemplateClick(template.perms)}>
                      <h5 className="font-bold text-slate-800 text-sm">
                        {template.name}
                      </h5>
                      <p className="text-xs text-slate-400 mt-2">
                        Start with common permissions
                      </p>
                      <p className="text-xs text-orange-500 font-bold mt-4">
                        {template.count} permissions
                      </p>
                    </Card>
                  ))}
                </div>
              </div>

              <DialogFooter className="flex gap-4 pt-6 border-t">
                <Button
                  type="button"
                  variant="ghost"
                  className="bg-slate-500 hover:bg-slate-600 text-white flex-1">
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white flex-1">
                  Create Role
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
