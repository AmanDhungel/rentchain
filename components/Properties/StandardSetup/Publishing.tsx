import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Plus, Trash, Check, Image, Tag } from "lucide-react";

// shadcn/ui style components (assumed available in the project)
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Checkbox } from "../../ui/checkbox";
import { Switch } from "../../ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Card, CardHeader, CardContent, CardTitle } from "../../ui/card";

// NOTE: Replace the imports above with your project's actual shadcn component paths if different.

type FormValues = {
  publishingStatus: {
    draft: boolean;
    published: boolean;
    unlisted: boolean;
    archived: boolean;
  };
  unitSelected: boolean;
  pricing: {
    saleActive: boolean;
    rentActive: boolean;
    leaseActive: boolean;
    saleAmount: number | "";
    rentAmount: number | "";
    leaseAmount: number | "";
  };
  availability: {
    availableFrom?: string;
    availableTo?: string;
    bookingLimits?: number;
    advanceBookingDays?: number;
    blackoutFrom?: string;
    blackoutTo?: string;
    recurringPattern?: string;
  };
  features: {
    instantBooking: boolean;
    virtualTours: boolean;
    smartPricing: boolean;
    autoRenewal: boolean;
  };
  channels: {
    rentchain: boolean;
    partnerPortals: boolean;
    internalOnly: boolean;
  };
  targetAudience: {
    professionals: boolean;
    students: boolean;
    families: boolean;
    expatriates: boolean;
    corporate: boolean;
    seniors: boolean;
  };
  tags: string[];
};

const defaultValues: FormValues = {
  publishingStatus: {
    draft: false,
    published: true,
    unlisted: false,
    archived: false,
  },
  unitSelected: true,
  pricing: {
    saleActive: true,
    rentActive: false,
    leaseActive: true,
    saleAmount: "",
    rentAmount: "",
    leaseAmount: "",
  },
  availability: {},
  features: {
    instantBooking: false,
    virtualTours: false,
    smartPricing: false,
    autoRenewal: false,
  },
  channels: { rentchain: true, partnerPortals: false, internalOnly: true },
  targetAudience: {
    professionals: false,
    students: true,
    families: true,
    expatriates: true,
    corporate: false,
    seniors: true,
  },
  tags: ["Nearby Facilities", "Parking"],
};

export default function PublishingForm() {
  const { register, handleSubmit, control, watch, setValue, getValues } =
    useForm<FormValues>({ defaultValues });

  const onSubmit = (data: FormValues) => {
    // In a real app, call your API here.
    console.log("Submit", data);
    alert("Form submitted — check console for values");
  };

  const tags = watch("tags");

  const addTag = (value: string) => {
    if (!value) return;
    const current = getValues("tags") || [];
    setValue("tags", Array.from(new Set([...current, value])));
  };

  const removeTag = (tag: string) => {
    const current = getValues("tags") || [];
    setValue(
      "tags",
      current.filter((t) => t !== tag)
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Publishing Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...register("publishingStatus.draft")}
                className="form-checkbox"
              />
              <span>Draft</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...register("publishingStatus.published")}
                className="form-checkbox"
                defaultChecked
              />
              <span>Published</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...register("publishingStatus.unlisted")}
                className="form-checkbox"
              />
              <span>Unlisted</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...register("publishingStatus.archived")}
                className="form-checkbox"
              />
              <span>Archived</span>
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Select Item to Publish / Unit */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Select Item to Publish</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-green-600">
                ✓ Enhanced Property Structure Found!
              </div>
              <div className="mt-2 border rounded p-3">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    {...register("unitSelected")}
                    className="form-checkbox"
                  />
                  <div>
                    <div className="font-medium">
                      Building <span className="text-muted">123</span>
                    </div>
                    <div className="text-xs mt-1 bg-gray-100 inline-block px-2 py-1 rounded">
                      Entire Floor
                    </div>
                  </div>
                </label>
              </div>
            </div>
            <div className="text-right text-sm text-gray-500">
              <button type="button" className="text-orange-500 underline">
                Select All
              </button>
              <span className="mx-2" />
              <button type="button" className="text-gray-400 underline">
                Clear All
              </button>
            </div>
          </div>

          {/* Pricing Configuration */}
          <div className="mt-6">
            <Label className="mb-2">Pricing Configuration</Label>
            <div className="space-y-3">
              <div className="grid grid-cols-6 gap-3 items-center border rounded p-3 bg-white">
                <div className="col-span-1">Type</div>
                <div className="col-span-1">Amount</div>
                <div className="col-span-2">Duration/Terms</div>
                <div className="col-span-1">Currency</div>
                <div className="col-span-1">Active</div>

                {/* Sale row */}
                <div className="col-span-1 text-purple-600">Sale</div>
                <div className="col-span-1">
                  <Input
                    type="number"
                    {...register("pricing.saleAmount", { valueAsNumber: true })}
                  />
                </div>
                <div className="col-span-2">
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Full Payment" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full">Full Payment</SelectItem>
                      <SelectItem value="installment">Installment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-1">
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="AED" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="aed">AED</SelectItem>
                      <SelectItem value="usd">USD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-1">
                  <input
                    type="checkbox"
                    {...register("pricing.saleActive")}
                    className="form-checkbox"
                  />
                </div>

                {/* Rent row */}
                <div className="col-span-1 text-green-600">Rent</div>
                <div className="col-span-1">
                  <Input
                    type="number"
                    {...register("pricing.rentAmount", { valueAsNumber: true })}
                  />
                </div>
                <div className="col-span-2">
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Per Month" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="month">Per Month</SelectItem>
                      <SelectItem value="week">Per Week</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-1">
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="AED" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="aed">AED</SelectItem>
                      <SelectItem value="usd">USD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-1">
                  <input
                    type="checkbox"
                    {...register("pricing.rentActive")}
                    className="form-checkbox"
                  />
                </div>

                {/* Lease row */}
                <div className="col-span-1 text-blue-600">Lease</div>
                <div className="col-span-1">
                  <Input
                    type="number"
                    {...register("pricing.leaseAmount", {
                      valueAsNumber: true,
                    })}
                  />
                </div>
                <div className="col-span-2">
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="1 year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1yr">1 year</SelectItem>
                      <SelectItem value="2yr">2 year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-1">
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="AED" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="aed">AED</SelectItem>
                      <SelectItem value="usd">USD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-1">
                  <input
                    type="checkbox"
                    {...register("pricing.leaseActive")}
                    className="form-checkbox"
                    defaultChecked
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Availability Settings ") */}
      <Card>
        <CardHeader>
          <CardTitle>Availability Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-3 items-center">
              <div>
                <Label>Available Period</Label>
              </div>
              <div className="col-span-2 flex gap-3 items-center">
                <Input
                  type="date"
                  {...register("availability.availableFrom")}
                />
                <Input type="date" {...register("availability.availableTo")} />
                <Controller
                  control={control}
                  name="availability.recurringPattern"
                  render={({ field }) => (
                    <Select onValueChange={(v) => field.onChange(v)}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Long Term" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="long">Long Term</SelectItem>
                        <SelectItem value="short">Short Term</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                <Controller
                  name="features.instantBooking"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 items-center">
              <div>
                <Label>Booking Limits</Label>
              </div>
              <div className="col-span-2 flex gap-3 items-center">
                <Input
                  type="number"
                  {...(register("availability.bookingLimits") as any)}
                  placeholder="Min"
                />
                <Input
                  type="number"
                  {...(register("availability.advanceBookingDays") as any)}
                  placeholder="Max"
                />
                <Select>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Days" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="days">Days</SelectItem>
                    <SelectItem value="months">Months</SelectItem>
                  </SelectContent>
                </Select>
                <Controller
                  name="availability.recurringPattern"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      checked={!!field.value}
                      onCheckedChange={(v) => field.onChange(v ? "weekly" : "")}
                    />
                  )}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 items-center">
              <div>
                <Label>Blackout Dates</Label>
              </div>
              <div className="col-span-2 flex gap-3 items-center">
                <Input type="date" {...register("availability.blackoutFrom")} />
                <Input type="date" {...register("availability.blackoutTo")} />
                <Select>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Maintenance" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="holiday">Holiday</SelectItem>
                  </SelectContent>
                </Select>
                <Switch
                  {...(register("availability.recurringPattern") as any)}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Publishing Features */}
      <Card>
        <CardHeader>
          <CardTitle>Publishing Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">Instant Booking</div>
                  <div className="text-sm text-gray-500">
                    Allow immediate booking without approval
                  </div>
                </div>
                <Controller
                  name="features.instantBooking"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">Virtual Tours</div>
                  <div className="text-sm text-gray-500">
                    Include virtual tour experience
                  </div>
                </div>
                <Controller
                  name="features.virtualTours"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">Smart Pricing</div>
                  <div className="text-sm text-gray-500">
                    Dynamic pricing based on demand
                  </div>
                </div>
                <Controller
                  name="features.smartPricing"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">Auto-Renewal</div>
                  <div className="text-sm text-gray-500">
                    Automatically renew expired listing
                  </div>
                </div>
                <Controller
                  name="features.autoRenewal"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>
            </div>

            {/* Channels & Publishing Options */}
            <div>
              <Label>Publishing Options</Label>
              <div className="mt-3 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-purple-600">
                      RentChain Platform
                    </div>
                    <div className="text-xs text-gray-500">
                      Public marketplace
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      {...register("channels.rentchain")}
                      className="form-checkbox"
                    />
                    <Select>
                      <SelectTrigger className="w-36">
                        <SelectValue placeholder="High" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-green-600">
                      Partner Portals
                    </div>
                    <div className="text-xs text-gray-500">
                      Partner networks
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      {...register("channels.partnerPortals")}
                      className="form-checkbox"
                    />
                    <Select>
                      <SelectTrigger className="w-36">
                        <SelectValue placeholder="Low" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="standard">Standard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-blue-600">Internal Only</div>
                    <div className="text-xs text-gray-500">
                      Private access only
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      {...register("channels.internalOnly")}
                      className="form-checkbox"
                    />
                    <Select>
                      <SelectTrigger className="w-36">
                        <SelectValue placeholder="Standard" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Publishing Attributes & Tags */}
      <Card>
        <CardHeader>
          <CardTitle>Publishing Attributes & Tags</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label>Target Audience</Label>
              <div className="grid grid-cols-3 gap-2 mt-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    {...register("targetAudience.professionals")}
                  />{" "}
                  <span>Professionals</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    {...register("targetAudience.students")}
                  />{" "}
                  <span>Students</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    {...register("targetAudience.families")}
                  />{" "}
                  <span>Families</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    {...register("targetAudience.expatriates")}
                  />{" "}
                  <span>Expatriates</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    {...register("targetAudience.corporate")}
                  />{" "}
                  <span>Corporate</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    {...register("targetAudience.seniors")}
                  />{" "}
                  <span>Seniors</span>
                </label>
              </div>

              <div className="mt-4">
                <Label>SEO & Marketing - Keyword Tags</Label>
                <Input placeholder="luxury, modern, central" />
                <div className="mt-3">
                  <Label>Property Tags</Label>
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {tags.map((t: string) => (
                      <span
                        key={t}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 border">
                        <Tag size={14} />
                        <span className="text-sm">{t}</span>
                        <button
                          type="button"
                          onClick={() => removeTag(t)}
                          className="ml-2 text-xs text-red-500">
                          ×
                        </button>
                      </span>
                    ))}
                  </div>

                  <div className="mt-3 flex gap-2">
                    <Input
                      id="newTag"
                      placeholder="Enter property tags"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addTag((e.target as HTMLInputElement).value);
                          (e.target as HTMLInputElement).value = "";
                        }
                      }}
                    />
                    <Button
                      type="button"
                      onClick={() => {
                        const el = document.getElementById(
                          "newTag"
                        ) as HTMLInputElement | null;
                        if (el) {
                          addTag(el.value);
                          el.value = "";
                        }
                      }}>
                      <Plus size={16} /> Add
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Label>Media & Content</Label>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" /> <span>Photos</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" /> <span>Floor Plans</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" /> <span>360° Tour</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" /> <span>Virtual Staging</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" /> <span>Drone Shots</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" /> <span>Expatriates</span>
                </label>
              </div>

              <div className="mt-4">
                <Label>Building Features</Label>
                <div className="flex flex-col gap-2 mt-2">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" /> <span>Fully Furnished</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" /> <span>Recently Renovated</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" /> <span>Safety Features</span>
                  </label>
                </div>

                <div className="mt-4">
                  <Label>Location & Amenities</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" /> <span>Nearby Facilities</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" /> <span>Unique Features</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" /> <span>Appliances Included</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" /> <span>Transport Links</span>
                    </label>
                  </div>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <Button variant="outline" type="button">
                    Save Draft
                  </Button>
                  <Button variant="ghost" type="button">
                    Preview
                  </Button>
                  <Button type="submit">Publish Now</Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Final small footer inputs */}
      <div className="text-right">
        <Button type="submit">Save & Publish</Button>
      </div>
    </form>
  );
}
