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

export default function StandardPropertySetup() {
  const [step, setStep] = useState(1);
  const formMethods = useForm({ defaultValues: {} });

  const handleNext = () => setStep((prev) => prev + 1);
  const handlePrev = () => setStep((prev) => prev - 1);

  return (
    <FormProvider {...formMethods}>
      <div className="mt-4 space-x-2">
        <StepIndicator currentStep={step} />
        {step === 1 && <StepBasicInfo onNext={handleNext} />}
        {step === 2 && <StepLocation onNext={handleNext} onPrev={handlePrev} />}
        {step === 3 && (
          <PropertyOwnershipStep onNext={handleNext} onPrev={handlePrev} />
        )}
        {step === 4 && (
          <PropertyDetailsStep onNext={handleNext} onPrev={handlePrev} />
        )}
        {step === 5 && (
          <BuildingPropertyDetailsStep
            onNext={handleNext}
            onPrev={handlePrev}
          />
        )}
        {step === 6 && (
          <VillaPropertyDetailsStep onNext={handleNext} onPrev={handlePrev} />
        )}
        {step === 7 && (
          <ApartmentPropertyDetailsStep
            onNext={handleNext}
            onPrev={handlePrev}
          />
        )}
        {step === 8 && (
          <SharedPropertyDetailsStep onNext={handleNext} onPrev={handlePrev} />
        )}
        {step === 9 && (
          <CommercialPropertyDetailsStep
            onNext={handleNext}
            onPrev={handlePrev}
          />
        )}
        {step === 10 && (
          <LandPropertyDetailsStep onNext={handleNext} onPrev={handlePrev} />
        )}
        {step === 11 && <Financial onNext={handleNext} onPrev={handlePrev} />}
        {step === 12 && (
          <LegalInsurance onNext={handleNext} onPrev={handlePrev} />
        )}
        {step === 13 && <MediaFiles onNext={handleNext} onPrev={handlePrev} />}
        {step === 14 && (
          <UnitStructure onNext={handleNext} onPrev={handlePrev} />
        )}
        {step === 15 && (
          <EnhancedUnitStructure onNext={handleNext} onPrev={handlePrev} />
        )}
        {step === 16 && (
          <ParkingManagement onNext={handleNext} onPrev={handlePrev} />
        )}
        {step === 17 && (
          <UtilitiesAssignment onNext={handleNext} onPrev={handlePrev} />
        )}
        {step === 18 && (
          <AmenitiesForm onNext={handleNext} onPrev={handlePrev} />
        )}
        {step === 19 && (
          <PublishingForm onNext={handleNext} onPrev={handlePrev} />
        )}
      </div>
    </FormProvider>
  );
}
