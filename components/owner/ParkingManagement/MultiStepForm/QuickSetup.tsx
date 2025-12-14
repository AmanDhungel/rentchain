"use client";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import ParkingStepIndicator from "./ParkingStepIndicator";
import { FacilityForm } from "./ParkingBasicInfo";
import { LocationForm } from "./ParkingLocationStep";
import { Button } from "@/components/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { facilityFormSchema, LocationSchema } from "./Parking.types";
import { ParkingStructureBuilder } from "./ParkingFacilitySetup/ParkingStructureBuilder";
import { StructureItem } from "./ParkingFacilitySetup/StructureItem";
import OperatingHoursForm from "./OperatingHours/OperatingHoursForm";
import AccessControlForm from "./AccessControl/AccessControlForm";
import AmenitiesForm from "./AmenitiesandPricing/AmenitiesForm";
import { Check } from "lucide-react";
import ReviewSubmitForm from "./ReviewAndCreate";

export default function ParkingQuickSetup({
  setIsOpen,
  isOpen,
}: {
  setIsOpen: (isOpen: boolean) => void;
  isOpen: boolean;
}) {
  const [step, setStep] = useState(1);
  const FullSchema = facilityFormSchema.extend(LocationSchema.shape);

  type FormValues = z.infer<typeof FullSchema>;
  const methods = useForm<FormValues>({
    resolver: zodResolver(FullSchema),
    mode: "onTouched",
    defaultValues: {
      facilityName: "",
      facilityCode: "",
      description: "",
      facilityType: "Multi-Storey Building",
      ownershipModel: "Building Owned",
      addressLine1: "",
      addressLine2: "",
      stateProvince: "",
      postalCode: "",
      country: "",
      latitude: 0,
      longitude: 0,
      city: "",
    },
  });
  const { handleSubmit, trigger, getValues, formState, setFocus } = methods;

  const handleNext = () => setStep((prev) => prev + 1);
  const handlePrev = () => setStep((prev) => prev - 1);

  function onSubmit(data: FormValues) {
    console.log("Submit", data);
    alert("Submitted! check console for values.");
    setIsOpen(false);
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" mx-auto p-4 space-y-4">
        <div className="mt-4 space-x-2">
          <ParkingStepIndicator currentStep={step} />
          {step === 1 && <FacilityForm />}
          {step === 2 && <LocationForm />}
          {step === 3 && <ParkingStructureBuilder />}
          {step === 4 && <OperatingHoursForm />}
          {step === 5 && <AccessControlForm />}
          {step === 6 && <AmenitiesForm />}
          {step === 7 && <ReviewSubmitForm />}

          <div className="flex justify-between gap-2 mt-4">
            {step > 0 && (
              <Button
                type="button"
                variant="outline"
                onClick={handlePrev}
                className="space-x-2">
                <span className="text-xl">&larr;</span>
                <span>Previous</span>
              </Button>
            )}

            {step < 7 && (
              <Button
                onClick={handleNext}
                className="bg-orange-500 hover:bg-orange-600 font-semibold flex items-center">
                Next
                <span className="ml-2 font-light text-lg">&rarr;</span>
              </Button>
            )}

            {step === 7 && (
              <Button
                type="submit"
                onClick={() => onSubmit(getValues())}
                className="bg-orange-500 hover:bg-orange-600 font-semibold flex items-center">
                <Check /> Complete Setup
              </Button>
            )}
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
