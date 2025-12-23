"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Home,
  FileText,
  Upload,
  ChevronRight,
  ChevronLeft,
  X,
  CheckCircle2,
  UserPlus,
  Eye,
} from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";

type DocumentKey =
  | "photoId"
  | "incomeVerification"
  | "employmentLetter"
  | "bankStatement"
  | "references";

type FormValues = {
  // Step 1
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
  nationality: string;
  idType: string;
  idNumber: string;

  // Step 2
  employmentStatus: string;
  employer: string;
  monthlyIncome: string;
  incomeRange: string;
  contactName: string;
  relationship: string;
  contactPhone: string;

  // Step 3
  selectedSpaceId: string | null;
  selectedBed: number | null;

  // Step 4
  moveInDate: string;
  leaseDuration: string;
  monthlyRent: string;
  securityDeposit: string;
  utilitiesIncluded: boolean;
  quietHours: boolean;
  petFriendly: boolean;
  smokingPolicy: string;
  guestPolicy: string;
  specialRequests: string;

  // Step 5
  documents: Record<DocumentKey, File | null>;
};

/* =======================
   Component
======================= */

const CreateSubTenantForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  const { register, control, watch, setValue, handleSubmit } =
    useForm<FormValues>({
      defaultValues: {
        nationality: "Nepal",
        idType: "Passport",
        leaseDuration: "12 months",
        utilitiesIncluded: true,
        quietHours: true,
        petFriendly: true,
        smokingPolicy: "No Smoking",
        guestPolicy: "Limited (with notice)",
        selectedSpaceId: null,
        selectedBed: null,
        documents: {
          photoId: null,
          incomeVerification: null,
          employmentLetter: null,
          bankStatement: null,
          references: null,
        },
      },
    });

  const data = watch();

  const nextStep = () => setCurrentStep((s) => Math.min(s + 1, 5));
  const prevStep = () => setCurrentStep((s) => Math.max(s - 1, 1));

  /* =======================
     Step 1 – Personal Info
  ======================= */

  const Step1 = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-bold">Personal Information</h3>

      <div className="grid grid-cols-2 gap-4">
        <Input {...register("firstName")} placeholder="First Name" />
        <Input {...register("lastName")} placeholder="Last Name" />
        <Input {...register("email")} placeholder="Email" />
        <Input {...register("phone")} placeholder="Phone" />
        <Input type="date" {...register("dob")} />

        {/* Nationality */}
        <Controller
          name="nationality"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select nationality" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Nepal">Nepal</SelectItem>
                <SelectItem value="USA">USA</SelectItem>
                <SelectItem value="UK">UK</SelectItem>
              </SelectContent>
            </Select>
          )}
        />

        {/* ID Type */}
        <Controller
          name="idType"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select ID type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Passport">Passport</SelectItem>
                <SelectItem value="Driver License">Driver License</SelectItem>
                <SelectItem value="National ID">National ID</SelectItem>
              </SelectContent>
            </Select>
          )}
        />

        <Input {...register("idNumber")} placeholder="ID Number" />
      </div>
    </div>
  );

  const Step2 = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-bold">Employment Information</h3>

      <div className="grid grid-cols-2 gap-4">
        {/* Employment Status */}
        <Controller
          name="employmentStatus"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Employment Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Employed">Employed</SelectItem>
                <SelectItem value="Self-employed">Self-employed</SelectItem>
                <SelectItem value="Student">Student</SelectItem>
                <SelectItem value="Unemployed">Unemployed</SelectItem>
              </SelectContent>
            </Select>
          )}
        />

        {/* Employer */}
        <Input
          {...register("employer")}
          placeholder="Employer / Company Name"
        />

        {/* Monthly Income */}
        <Input
          {...register("monthlyIncome")}
          placeholder="Monthly Income"
          type="number"
        />

        {/* Income Range */}
        <Controller
          name="incomeRange"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Income Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Below $1000">Below $1000</SelectItem>
                <SelectItem value="$1000 - $2000">$1000 - $2000</SelectItem>
                <SelectItem value="$2000 - $3000">$2000 - $3000</SelectItem>
                <SelectItem value="$3000+">$3000+</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>

      {/* Emergency Contact */}
      <div className="pt-4 border-t">
        <h4 className="text-sm font-bold text-slate-600 mb-4">
          Emergency Contact
        </h4>

        <div className="grid grid-cols-2 gap-4">
          <Input {...register("contactName")} placeholder="Contact Name" />

          <Controller
            name="relationship"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Relationship" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Parent">Parent</SelectItem>
                  <SelectItem value="Sibling">Sibling</SelectItem>
                  <SelectItem value="Spouse">Spouse</SelectItem>
                  <SelectItem value="Friend">Friend</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            )}
          />

          <Input {...register("contactPhone")} placeholder="Contact Phone" />
        </div>
      </div>
    </div>
  );

  /* =======================
     Step 3 – Space
  ======================= */

  const Step3 = () => {
    const spaces = [
      { id: "2A", name: "Apartment 2B - Room A", beds: 2, price: 850 },
      { id: "2B", name: "Apartment 2B - Room B", beds: 1, price: 900 },
    ];

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-bold">Space Assignment</h3>

        {spaces.map((space) => (
          <div
            key={space.id}
            onClick={() => setValue("selectedSpaceId", space.id)}
            className={`p-4 border rounded-xl cursor-pointer ${
              data.selectedSpaceId === space.id
                ? "border-orange-500 ring-1 ring-orange-500"
                : "border-slate-200"
            }`}>
            <div className="flex justify-between">
              <div>
                <p className="font-bold">{space.name}</p>
                <p className="text-sm text-slate-400">${space.price}/month</p>
              </div>
              {data.selectedSpaceId === space.id && (
                <CheckCircle2 className="text-orange-500" />
              )}
            </div>

            {data.selectedSpaceId === space.id && space.beds > 1 && (
              <div className="mt-4 flex gap-2">
                {[...Array(space.beds)].map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setValue("selectedBed", i + 1);
                    }}
                    className={`flex-1 py-2 rounded-lg font-bold ${
                      data.selectedBed === i + 1
                        ? "bg-orange-500 text-white"
                        : "border"
                    }`}>
                    Bed {i + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const Step4 = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-bold">Lease Terms</h3>

      {/* Lease Details */}
      <div className="grid grid-cols-2 gap-4">
        <Input
          type="date"
          {...register("moveInDate")}
          placeholder="Move-in Date"
        />

        <Controller
          name="leaseDuration"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Lease Duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="6 months">6 months</SelectItem>
                <SelectItem value="12 months">12 months</SelectItem>
                <SelectItem value="18 months">18 months</SelectItem>
                <SelectItem value="24 months">24 months</SelectItem>
              </SelectContent>
            </Select>
          )}
        />

        <Input
          type="number"
          {...register("monthlyRent")}
          placeholder="Monthly Rent"
        />

        <Input
          type="number"
          {...register("securityDeposit")}
          placeholder="Security Deposit"
        />
      </div>

      {/* Policies */}
      <div className="pt-4 border-t">
        <h4 className="text-sm font-bold text-slate-600 mb-4">
          House Rules & Policies
        </h4>

        <div className="grid grid-cols-2 gap-4">
          {/* Utilities Included */}
          <label className="flex items-center gap-3 border rounded-lg px-4 py-3 cursor-pointer">
            <Checkbox
              {...register("utilitiesIncluded")}
              className="accent-orange-500"
            />
            <span className="text-sm font-medium">Utilities Included</span>
          </label>

          {/* Quiet Hours */}
          <label className="flex items-center gap-3 border rounded-lg px-4 py-3 cursor-pointer">
            <Checkbox
              {...register("quietHours")}
              className="accent-orange-500"
            />
            <span className="text-sm font-medium">Quiet Hours Enforced</span>
          </label>

          {/* Pet Friendly */}
          <label className="flex items-center gap-3 border rounded-lg px-4 py-3 cursor-pointer">
            <Checkbox
              {...register("petFriendly")}
              className="accent-orange-500"
            />
            <span className="text-sm font-medium">Pet Friendly</span>
          </label>
        </div>
      </div>

      {/* Additional Policies */}
      <div className="grid grid-cols-2 gap-4 pt-4 border-t">
        <Controller
          name="smokingPolicy"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Smoking Policy" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="No Smoking">No Smoking</SelectItem>
                <SelectItem value="Outdoor Only">Outdoor Only</SelectItem>
                <SelectItem value="Allowed">Allowed</SelectItem>
              </SelectContent>
            </Select>
          )}
        />

        <Controller
          name="guestPolicy"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Guest Policy" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="No Guests">No Guests</SelectItem>
                <SelectItem value="Limited (with notice)">
                  Limited (with notice)
                </SelectItem>
                <SelectItem value="Allowed">Allowed</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>

      {/* Special Requests */}
      <div className="pt-4 border-t">
        <textarea
          {...register("specialRequests")}
          placeholder="Special requests or notes..."
          className="w-full min-h-[100px] border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>
    </div>
  );

  /* =======================
     Step 5 – Documents
  ======================= */

  const Step5 = () => {
    const [previewImage, setPreviewImage] = React.useState<string | null>(null);

    const docs: { id: DocumentKey; label: string }[] = [
      { id: "photoId", label: "Photo ID" },
      { id: "incomeVerification", label: "Income Verification" },
      { id: "employmentLetter", label: "Employment Letter" },
      { id: "bankStatement", label: "Bank Statement" },
      { id: "references", label: "References" },
    ];

    const openPreview = (file: File) => {
      const url = URL.createObjectURL(file);
      setPreviewImage(url);
    };

    const closePreview = () => {
      if (previewImage) URL.revokeObjectURL(previewImage);
      setPreviewImage(null);
    };

    return (
      <>
        <div className="space-y-4">
          <h3 className="text-lg font-bold">Documents</h3>

          {docs.map((doc) => {
            const file = data.documents[doc.id];
            const isImage = file?.type.startsWith("image/");

            return (
              <div key={doc.id} className="p-4 border rounded-xl bg-white">
                <div className="flex justify-between items-center">
                  <p className="font-bold">{doc.label}</p>

                  <label className="cursor-pointer bg-orange-500 text-white px-3 py-1 rounded text-sm flex items-center gap-2">
                    Upload
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={(e) =>
                        setValue(
                          `documents.${doc.id}`,
                          e.target.files?.[0] ?? null
                        )
                      }
                    />
                  </label>
                </div>

                {/* Uploaded File */}
                {file && (
                  <div className="mt-3 flex items-center justify-between bg-orange-50 border border-orange-200 p-2 rounded-lg">
                    <div className="flex items-center gap-3">
                      {isImage && (
                        <Image
                          width={500}
                          height={500}
                          src={URL.createObjectURL(file)}
                          alt="preview"
                          className="w-10 h-10 rounded object-cover"
                        />
                      )}
                      <span className="text-sm font-medium truncate max-w-[160px]">
                        {file.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      {isImage && (
                        <button
                          type="button"
                          onClick={() => openPreview(file)}
                          className="text-slate-600 hover:text-orange-600">
                          <Eye size={18} />
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => setValue(`documents.${doc.id}`, null)}
                        className="text-slate-600 hover:text-red-500">
                        <X size={18} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <Dialog open={!!previewImage} onOpenChange={closePreview}>
          <DialogOverlay />
          <DialogContent className="max-w-lg max-h-96 p-0 bg-transparent border-none shadow-none">
            {previewImage && (
              <Image
                width={500}
                height={500}
                src={previewImage}
                alt="Full Preview"
                className="max-w-lg mx-auto h-auto rounded-xl"
              />
            )}
          </DialogContent>
        </Dialog>
      </>
    );
  };

  const onSubmit = (values: FormValues) => {
    console.log("SUBMITTED DATA:", values);
    alert("Invitation Sent!");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-orange-500 hover:bg-orange-600 text-white gap-2 h-10 px-4 font-semibold">
          <UserPlus className="w-4 h-4" /> Create Sub-Tenant
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Sub-Tenant</DialogTitle>
          <DialogDescription>
            Add a new sub-tenant to your managed space.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className=" p-6 bg-white">
          {currentStep === 1 && <Step1 />}
          {currentStep === 2 && <Step2 />}
          {currentStep === 3 && <Step3 />}
          {currentStep === 4 && <Step4 />}
          {currentStep === 5 && <Step5 />}

          <div className="flex justify-between mt-10">
            <Button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-6 py-2 bg-slate-500 text-white rounded disabled:opacity-30">
              <ChevronLeft size={18} /> Previous
            </Button>

            <Button
              type={currentStep === 5 ? "submit" : "button"}
              onClick={currentStep === 5 ? undefined : nextStep}
              className="px-6 py-2 bg-orange-600 text-white rounded">
              {currentStep === 5 ? "Send Invitation" : "Next"}{" "}
              <ChevronRight size={18} />
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateSubTenantForm;
