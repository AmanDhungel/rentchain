"use client";

import { useMemo, useState } from "react";
import { useForm, FormProvider, Controller, useWatch } from "react-hook-form";
import { Checkbox } from "../../../ui/checkbox";
import { Input } from "../../../ui/input";
import { Button } from "../../../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../ui/select";
import { X, Pencil, Trash2, Plus } from "lucide-react";

type Amenity = { id: string; label: string; custom?: boolean };

type Assignment = {
  id: string;
  amenityId: string;
  building?: { enabled: boolean; value?: string };
  floor?: { enabled: boolean; value?: string };
  room?: { enabled: boolean; value?: string };
};

const makeAssignment = (amenityId: string): Assignment => ({
  id: Math.random().toString(36).slice(2, 9),
  amenityId,
  building: { enabled: false, value: "" },
  floor: { enabled: false, value: "" },
  room: { enabled: false, value: "" },
});

type FormValues = {
  amenities: string[];
  customAmenity: string;
  assignments: Assignment[];
  utilityScopeApartment: boolean;
  billingResponsibility: "owner" | "tenants" | "individual";
};

export default function AmenitiesAssignment() {
  const methods = useForm<FormValues>({
    defaultValues: {
      amenities: [],
      customAmenity: "",
      assignments: [],
      utilityScopeApartment: true,
      billingResponsibility: "owner",
    },
  });

  const { register, setValue, control, handleSubmit } = methods;

  const baseAmenities: Amenity[] = useMemo(
    () => [
      { id: "parking", label: "Parking" },
      { id: "security", label: "Security" },
      { id: "playground", label: "Playground" },
      { id: "storage", label: "Storage" },
      { id: "wifi", label: "WiFi" },
      { id: "furnished", label: "Furnished" },
      { id: "gym", label: "Gym" },
      { id: "elevator", label: "Elevator" },
      { id: "bbq", label: "BBQ Area" },
      { id: "hvac", label: "HVAC" },
      { id: "ac", label: "Air Conditioning" },
      { id: "rooftop", label: "Rooftop Access" },
      { id: "pool", label: "Pool" },
      { id: "garden", label: "Garden" },
      { id: "laundry", label: "Laundry" },
      { id: "balcony", label: "Balcony" },
      { id: "heating", label: "Heating" },
      { id: "concierge", label: "Concierge" },
    ],
    []
  );

  const [amenitiesList, setAmenitiesList] = useState<Amenity[]>(baseAmenities);

  const selectedAmenities = useWatch({
    control,
    name: "amenities",
    defaultValue: [],
  });

  const assignments = useWatch({
    control,
    name: "assignments",
    defaultValue: [],
  });

  const customAmenity = useWatch({
    control,
    name: "customAmenity",
    defaultValue: "",
  });

  const toggleAmenity = (id: string) => {
    const currentAmenities = selectedAmenities || [];
    const exists = currentAmenities.includes(id);

    if (exists) {
      // Remove amenity
      const newAmenities = currentAmenities.filter(
        (amenityId) => amenityId !== id
      );
      setValue("amenities", newAmenities);

      // Keep assignments for now (optional: remove assignments when deselected)
      // If you want to remove assignments when deselected, uncomment below:
      // const newAssignments = assignments.filter((a: Assignment) => a.amenityId !== id);
      // setValue("assignments", newAssignments);
    } else {
      // Add amenity
      const newAmenities = [...currentAmenities, id];
      setValue("amenities", newAmenities);

      // Create assignment if it doesn't exist
      const currentAssignments = assignments || [];
      const assignmentExists = currentAssignments.find(
        (a: Assignment) => a.amenityId === id
      );

      if (!assignmentExists) {
        setValue("assignments", [...currentAssignments, makeAssignment(id)]);
      }
    }
  };

  const addCustomAmenity = () => {
    const val = customAmenity?.trim();
    if (!val) return;

    const id = val.toLowerCase().replace(/[^a-z0-9-]+/g, "-");

    // Check if amenity already exists
    const existingAmenity = amenitiesList.find((a) => a.id === id);

    if (existingAmenity) {
      setValue("customAmenity", "");
      // Toggle the existing amenity if not already selected
      if (!selectedAmenities?.includes(id)) {
        toggleAmenity(id);
      }
      return;
    }

    // Add new custom amenity
    const newAmenity: Amenity = { id, label: val, custom: true };
    setAmenitiesList((prev) => [...prev, newAmenity]);
    setValue("customAmenity", "");
    toggleAmenity(id);
  };

  const toggleAssignmentField = (
    assignmentId: string,
    field: "building" | "floor" | "room"
  ) => {
    const currentAssignments = assignments || [];
    const updated = currentAssignments.map((a: Assignment) => {
      if (a.id !== assignmentId) return a;

      const currentField = a[field] || { enabled: false, value: "" };
      return {
        ...a,
        [field]: {
          ...currentField,
          enabled: !currentField.enabled,
        },
      };
    });

    setValue("assignments", updated);
  };

  const updateAssignmentValue = (
    assignmentId: string,
    field: "building" | "floor" | "room",
    value: string
  ) => {
    const currentAssignments = assignments || [];
    const updated = currentAssignments.map((a: Assignment) => {
      if (a.id !== assignmentId) return a;

      return {
        ...a,
        [field]: {
          ...(a[field] || { enabled: false, value: "" }),
          value,
        },
      };
    });

    setValue("assignments", updated);
  };

  const removeAssignment = (assignmentId: string) => {
    const currentAssignments = assignments || [];
    const updatedAssignments = currentAssignments.filter(
      (a: Assignment) => a.id !== assignmentId
    );

    setValue("assignments", updatedAssignments);

    // Also remove the amenity from selected amenities
    const assignmentToRemove = currentAssignments.find(
      (a: Assignment) => a.id === assignmentId
    );
    if (assignmentToRemove) {
      const currentAmenities = selectedAmenities || [];
      const updatedAmenities = currentAmenities.filter(
        (amenityId) => amenityId !== assignmentToRemove.amenityId
      );
      setValue("amenities", updatedAmenities);
    }
  };

  const amenityLabel = (id: string) =>
    amenitiesList.find((a) => a.id === id)?.label ?? id;

  const onSubmit = (data: FormValues) => {
    console.log("Form data:", data);
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="max-w-3xl mx-auto p-6 space-y-6">
            <div>
              <h3 className="text-lg font-semibold">Amenities Assignment</h3>
              <p className="text-sm text-muted-foreground">
                Select amenities and assign them to specific areas
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {amenitiesList.map((a) => {
                const checked = selectedAmenities?.includes(a.id);
                return (
                  <label
                    key={a.id}
                    className="flex items-center gap-2 text-sm select-none">
                    <Checkbox
                      checked={checked}
                      onCheckedChange={() => toggleAmenity(a.id)}
                    />
                    <span>{a.label}</span>
                  </label>
                );
              })}
            </div>

            <h1>Custom Amenities</h1>
            <div className="flex gap-2 ">
              <Input
                placeholder="lorem"
                value={customAmenity || ""}
                onChange={(e) => setValue("customAmenity", e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addCustomAmenity();
                  }
                }}
              />
              <Button
                type="button"
                onClick={addCustomAmenity}
                className="flex bg-orange-500 items-center gap-2">
                <Plus size={14} /> Add
              </Button>
            </div>

            <div className="flex gap-2 flex-wrap mt-4">
              {selectedAmenities?.map((id: string) => (
                <button
                  key={id}
                  type="button"
                  className="px-3 py-1 rounded-full border border-orange-500 bg-orange-500 text-white text-sm flex items-center gap-2"
                  onClick={() => {
                    // Optional: implement scroll to assignment card
                  }}>
                  {amenityLabel(id)}
                </button>
              ))}
            </div>

            {/* dynamic assignment cards */}
            <div className="space-y-3">
              {assignments?.map((assign: Assignment) => (
                <Card key={assign.id} className="border">
                  <CardHeader className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-sm font-medium">
                        {amenityLabel(assign.amenityId)}
                      </CardTitle>
                      <p className="text-xs text-muted-foreground">
                        Select which areas have this amenity:
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        className="text-sm px-2 py-1"
                        aria-label="close"
                        onMouseDown={(e) => e.preventDefault()}>
                        <X />
                      </button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <Checkbox
                            checked={!!assign.building?.enabled}
                            onCheckedChange={() =>
                              toggleAssignmentField(assign.id, "building")
                            }
                          />
                          <span className="text-sm">Building</span>
                        </div>
                        <Input
                          placeholder="123"
                          value={assign.building?.value || ""}
                          onChange={(e) =>
                            updateAssignmentValue(
                              assign.id,
                              "building",
                              e.target.value
                            )
                          }
                          className="w-28"
                          disabled={!assign.building?.enabled}
                        />
                      </div>

                      <div className="flex items-center gap-3 ml-6">
                        <div className="flex items-center gap-2">
                          <Checkbox
                            checked={!!assign.floor?.enabled}
                            onCheckedChange={() =>
                              toggleAssignmentField(assign.id, "floor")
                            }
                          />
                          <span className="text-sm">Floor</span>
                        </div>
                        <Input
                          placeholder="3232"
                          value={assign.floor?.value || ""}
                          onChange={(e) =>
                            updateAssignmentValue(
                              assign.id,
                              "floor",
                              e.target.value
                            )
                          }
                          className="w-28"
                          disabled={!assign.floor?.enabled}
                        />
                      </div>

                      <div className="flex items-center gap-3 ml-6">
                        <div className="flex items-center gap-2">
                          <Checkbox
                            checked={!!assign.room?.enabled}
                            onCheckedChange={() =>
                              toggleAssignmentField(assign.id, "room")
                            }
                          />
                          <span className="text-sm">Room</span>
                        </div>
                        <Input
                          placeholder="5"
                          value={assign.room?.value || ""}
                          onChange={(e) =>
                            updateAssignmentValue(
                              assign.id,
                              "room",
                              e.target.value
                            )
                          }
                          className="w-28"
                          disabled={!assign.room?.enabled}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Amenity Assignment Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">
                  Amenity Assignment Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {assignments?.length === 0 && (
                    <p className="text-sm text-muted-foreground">
                      No assignments yet
                    </p>
                  )}

                  {assignments?.map((a: Assignment) => (
                    <div
                      key={a.id}
                      className="border rounded p-3 flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-medium px-2 py-1 rounded bg-gray-100">
                            {amenityLabel(a.amenityId)}
                          </span>
                          <span className="text-xs rounded px-2 py-1 bg-green-100 text-green-800">
                            Available
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Available at: 4543
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {a.building?.enabled ||
                          a.floor?.enabled ||
                          a.room?.enabled
                            ? "Storage available in selected areas"
                            : "No area selected"}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          • 1 assignment
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button type="button" aria-label="edit">
                          <Pencil size={16} />
                        </button>
                        <button
                          type="button"
                          aria-label="delete"
                          onClick={() => removeAssignment(a.id)}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Utility Scope */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Controller
                  control={control}
                  name="utilityScopeApartment"
                  render={({ field }) => (
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <div>
                  <div className="text-sm font-medium">lorem (Apartment)</div>
                  <div className="text-xs text-muted-foreground">
                    Assign this meter to the entire apartment
                  </div>
                </div>
              </div>
            </div>

            {/* Billing Responsibility */}
            <div className="space-y-2">
              <div className="text-sm font-medium">Billing Responsibility</div>
              <Controller
                control={control}
                name="billingResponsibility"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-64">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="owner">Owner Pays</SelectItem>
                      <SelectItem value="tenants">Tenants</SelectItem>
                      <SelectItem value="individual">Individual</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
