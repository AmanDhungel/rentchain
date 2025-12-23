import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Upload,
  Calendar,
  X,
  Facebook,
  Instagram,
  Twitter,
  MessageCircle,
  PinIcon,
  Linkedin,
} from "lucide-react";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { Input, Label } from "@/components/ui";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import DocumentUploadStep from "./DocumentUploadStep";
import EmergencyHealthStep from "./EmergencyHealthStep";
import { FormData } from "./schema";
import StayDetailsStep from "./StayDetailsStep";

const StepIndicator = ({ currentStep }: { currentStep: number }) => {
  const steps = [
    "Personal & Contact Info",
    "Relationship & Stay Details",
    "Emergency Contact & Health Info",
    "Document Upload",
    "Review & Submit",
  ];
  return (
    <div className="flex justify-between items-start mb-8 px-4">
      {steps.map((label, index) => (
        <div
          key={index}
          className="flex flex-col items-center flex-1 text-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center border-2 mb-2 font-bold
            ${
              currentStep === index + 1
                ? "bg-orange-500 border-orange-500 text-white"
                : "border-slate-300 text-slate-400"
            }`}>
            {index + 1}
          </div>
          <span
            className={`text-[10px] uppercase font-bold max-w-[80px] leading-tight
            ${
              currentStep === index + 1 ? "text-orange-500" : "text-slate-400"
            }`}>
            {label}
          </span>
        </div>
      ))}
    </div>
  );
};

export function AddOccupantDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
}) {
  const [step, setStep] = useState(1);
  const methods = useForm<FormData>({
    mode: "onChange",
  });

  useEffect(() => {
    if (!open) {
      methods.reset();
    }
  }, [open, methods]);

  const next = async () => {
    const isStepValid = await methods.trigger();
    if (isStepValid) setStep((s) => Math.min(s + 1, 5));
  };

  const back = () => setStep((s) => Math.max(s - 1, 1));

  const onSubmit = (data: FormData) => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-slate-800">
            Add Long-term Occupant
          </DialogTitle>
        </DialogHeader>

        <StepIndicator currentStep={step} />

        <FormProvider {...methods}>
          <form className="space-y-6 min-h-[400px]">
            {step === 1 && <PersonalInfoStep />}
            {step === 2 && <StayDetailsStep />}
            {step === 3 && <EmergencyHealthStep />}
            {step === 4 && <DocumentUploadStep />}
            {step === 5 && <ReviewStep />}
          </form>
        </FormProvider>

        <DialogFooter className="flex justify-between items-center border-t pt-4">
          <Button
            variant="outline"
            onClick={back}
            disabled={step === 1}
            className="bg-slate-500 text-white hover:bg-slate-600 border-none px-8">
            <ArrowLeft className="mr-2 h-4 w-4" /> Previous
          </Button>

          {step < 5 ? (
            <Button
              onClick={next}
              className="bg-orange-500 hover:bg-orange-600 px-8">
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={methods.handleSubmit(onSubmit)}
              className="bg-orange-500 hover:bg-orange-600 px-8">
              Submit Application
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const SocialInput = React.forwardRef(
  ({ icon, label, ...props }: any, ref: any) => (
    <div className="space-y-2">
      <Label className="text-xs font-bold text-[#334155]">{label}</Label>
      <div className="relative flex items-center">
        <div className="absolute left-3">{icon}</div>
        <Input
          ref={ref}
          placeholder="https://instagram.com/username or @username"
          className="pl-10 bg-[#f8fafc] border-[#e2e8f0] h-11 focus-visible:ring-[#f26522]"
          {...props}
        />
      </div>
    </div>
  )
);

SocialInput.displayName = "SocialInput";

const PersonalInfoStep = () => {
  const { register, watch } = useFormContext();
  const photo = watch("photo");

  const preview = useMemo(() => {
    if (!photo || !photo[0]) return null;
    return URL.createObjectURL(photo[0]);
  }, [photo]);

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      <div className="p-4 border-2 border-dashed rounded-lg flex items-center gap-4">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
          {preview ? (
            <Image
              src={preview}
              alt="profile photo"
              width={100}
              height={100}
              className="rounded-full"
            />
          ) : (
            <Upload className="h-6 w-6" />
          )}
        </div>
        <div>
          <Label
            htmlFor="photo"
            className="bg-orange-500 p-2 rounded-md w-fit text-white cursor-pointer">
            Upload Photo
          </Label>
          <Input id="photo" type="file" {...register("photo")} hidden />{" "}
          <p className="text-xs text-slate-400 mt-1">
            Clear photo JPG, PNG up to 5MB
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <InputWithLabel label="First Name *" {...register("firstName")} />
        <InputWithLabel label="Last Name *" {...register("lastName")} />
      </div>
      <InputWithLabel
        label="Date of Birth *"
        type="date"
        {...register("dob")}
      />
      <InputWithLabel label="Nationality *" {...register("nationality")} />
      <InputWithLabel
        label="Government ID Number *"
        {...register("idNumber")}
      />
      <InputWithLabel label="Place of Birth *" {...register("idNumber")} />

      {/* Contact Information Section */}
      <div className="p-6 border rounded-xl bg-white space-y-6">
        <h3 className="font-bold text-slate-800">Contact Information</h3>
        <div className="space-y-4">
          <InputWithLabel
            label="Phone Number"
            placeholder="Enter phone number"
            {...register("phone")}
          />
          <InputWithLabel
            label="Email Address"
            placeholder="Enter email"
            {...register("email")}
          />
          <InputWithLabel
            label="Alternate Phone"
            placeholder="Enter alternate phone"
            {...register("alternatePhone")}
          />
        </div>
      </div>

      <div className="p-6 border rounded-xl bg-white space-y-6">
        <h3 className="font-bold text-slate-800">
          Social Media & Communication
        </h3>
        <div className="space-y-4">
          <SocialInput
            icon={<Facebook className="text-blue-600 fill-blue-600" />}
            label="Facebook Profile"
            {...register("facebook")}
          />
          <SocialInput
            icon={<Instagram className="text-pink-600" />}
            label="Instagram Profile"
            {...register("instagram")}
          />
          <SocialInput
            icon={<Twitter className="text-black" />}
            label="X (Twitter) Profile"
            {...register("twitter")}
          />
          <SocialInput
            icon={<MessageCircle className="text-green-500 fill-green-500" />}
            label="WhatsApp Number"
            {...register("whatsapp")}
          />
          <SocialInput
            icon={<PinIcon className="text-red-600 fill-red-600" />}
            label="pinterest Profile"
            {...register("pinterest")}
          />
          <SocialInput
            icon={<Linkedin className="text-blue-700 fill-blue-700" />}
            label="LinkedIn Profile"
            {...register("linkedin")}
          />
        </div>

        <div className="p-3 bg-[#fff0e6] border border-[#ffd8bf] rounded-lg flex items-center gap-3">
          <div className="flex-1 text-[11px] text-[#f26522] font-medium leading-relaxed">
            Social media information is optional and helps with verification and
            communication. All information will be kept confidential.
          </div>
        </div>
      </div>
    </div>
  );
};

const ReviewStep = () => {
  const { getValues } = useFormContext();
  const vals = getValues();
  return (
    <div className="space-y-4">
      <ReviewSection
        title="Personal Information"
        items={[
          { label: "Name", value: `${vals.firstName} ${vals.lastName}` },
          { label: "Date of Birth", value: vals.dob },
          { label: "Nationality", value: vals.nationality },
          { label: "Relationship", value: vals.relationship },
        ]}
      />
      <ReviewSection
        title="Stay Information"
        items={[
          { label: "Move-in Date", value: vals.moveInDate },
          { label: "Duration", value: vals.duration },
          { label: "Urgency", value: vals.urgency },
        ]}
      />
      <div className="p-4 border rounded-lg bg-slate-50 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded text-blue-600">
            <CheckCircle2 className="h-4 w-4" />
          </div>
          <span className="text-sm font-medium">government_id.pdf</span>
        </div>
        <span className="text-xs text-slate-400">Uploaded: Jan 10, 2024</span>
      </div>
    </div>
  );
};

export const InputWithLabel = React.forwardRef(
  ({ label, ...props }: any, ref) => (
    <div className="space-y-2">
      <label className="text-sm font-bold text-slate-700">{label}</label>
      <Input
        ref={ref}
        {...props}
        className="w-full p-2 bg-blue-50/50 border border-blue-100 rounded-md outline-none focus:ring-2 ring-blue-500"
      />
    </div>
  )
);

InputWithLabel.displayName = "InputWithLabel";

const ReviewSection = ({
  title,
  items,
}: {
  title: string;
  items: { label: string; value: string }[];
}) => (
  <div className="p-4 border rounded-lg">
    <h4 className="text-sm font-bold text-slate-800 mb-3">{title}</h4>
    <div className="grid grid-cols-2 gap-y-3">
      {items.map((it, i) => (
        <div key={i}>
          <p className="text-xs text-slate-400">{it.label}</p>
          <p className="text-sm font-medium text-slate-700">
            {it.value || "Not provided"}
          </p>
        </div>
      ))}
    </div>
  </div>
);
