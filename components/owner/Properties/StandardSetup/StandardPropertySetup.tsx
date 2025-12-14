"use client";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import StepIndicator from "./StepIndicator";
import "../QuickAdd/quickadd.css";
import StepBasicInfo from "./SetupBasicInfo";
import StepLocation from "./StepLocation";
import PropertyOwnershipStep from "./PropertyOwnership";
import PropertyDetailsStep from "./PropertyDeatils/PropertyDeatils";
import BuildingPropertyDetailsStep from "./PropertyDeatils/BuildingPropertyDetails";
import VillaPropertyDetailsStep from "./PropertyDeatils/VillaPropertyDetails";
import ApartmentPropertyDetailsStep from "./PropertyDeatils/ApartmentPropertyDetails";
import SharedPropertyDetailsStep from "./PropertyDeatils/SharedSpacePropertyDetails";
import CommercialPropertyDetailsStep from "./PropertyDeatils/CommercialPropertyDetails";
import LandPropertyDetailsStep from "./PropertyDeatils/LandPropertyDetails";
import Financial from "./Financial";
import MediaFiles from "./MediaFles";
import LegalInsurance from "./LegalInsurance";
import UnitStructure from "./UnitStructure";
import EnhancedUnitStructure from "./EnhancedUnitStructure/EnhancedUnitStructure";
import ParkingManagement from "./ParkingManagement";
import UtilitiesAssignment from "./Utilities";
import AmenitiesForm from "./Amenities";
import PublishingForm from "./Publishing";
import { Button } from "@/components/ui";

export default function StandardPropertySetup() {
  const [step, setStep] = useState(1);
  const formMethods = useForm({ defaultValues: {} });

  const handleNext = () => setStep((prev) => prev + 1);
  const handlePrev = () => setStep((prev) => prev - 1);

  return (
    <FormProvider {...formMethods}>
      <div className="mt-4 space-x-2">
        <StepIndicator currentStep={step} />
        {step === 1 && <StepBasicInfo />}
        {step === 2 && <StepLocation />}
        {step === 3 && <PropertyOwnershipStep />}
        {step === 4 && <PropertyDetailsStep />}
        {step === 5 && <BuildingPropertyDetailsStep />}
        {step === 6 && <VillaPropertyDetailsStep />}
        {step === 7 && <ApartmentPropertyDetailsStep />}
        {step === 8 && <SharedPropertyDetailsStep />}
        {step === 9 && <CommercialPropertyDetailsStep />}
        {step === 10 && <LandPropertyDetailsStep />}
        {step === 11 && <Financial />}
        {step === 12 && <LegalInsurance />}
        {step === 13 && <MediaFiles />}
        {step === 14 && <UnitStructure />}
        {step === 15 && <EnhancedUnitStructure />}
        {step === 16 && <ParkingManagement />}
        {step === 17 && <UtilitiesAssignment />}
        {step === 18 && <AmenitiesForm />}
        {step === 19 && <PublishingForm />}

        <div className="flex items-center justify-between mt-6">
          <Button variant="outline" onClick={handlePrev} type="button">
            Previous
          </Button>

          <div className="flex items-center gap-3">
            <Button className="bg-orange-500" onClick={handleNext}>
              Next →
            </Button>
          </div>
        </div>
      </div>
    </FormProvider>
  );
}
