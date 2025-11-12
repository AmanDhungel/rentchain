"use client";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import StepIndicator from "./StepIndicator";
import StepBasicInfo from "./SetupBasicInfo";
import StepLocation from "./StepLocation";
import StepPropertyDetails from "./StepPropertyDetails";
import "./quickadd.css";
import MediaFiles from "./MediaFles";
import Amenities from "./Amenities";
import StepPublishing from "./Publishing";
import ReviewCreateProperty from "./ReviewCreate";

export default function QuickPropertySetup() {
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
          <StepPropertyDetails onNext={handleNext} onPrev={handlePrev} />
        )}
        {step === 4 && <MediaFiles onNext={handleNext} onPrev={handlePrev} />}
        {step === 5 && <Amenities onNext={handleNext} onPrev={handlePrev} />}
        {step === 6 && (
          <StepPublishing onNext={handleNext} onPrev={handlePrev} />
        )}
        {step === 7 && <ReviewCreateProperty onPrev={handlePrev} />}
      </div>
    </FormProvider>
  );
}
