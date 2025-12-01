"use client";
import React, { useMemo, useState } from "react";
import {
  BasicInfoStep,
  ClausesComplianceStep,
  FormValues,
  initialValues,
  PartiesStep,
  RentDepositsStep,
  ReviewValidateStep,
  SLATermsStep,
  Stepper,
  StepProps,
  UnitsSpacesStep,
  UtilitiesServicesStep,
} from "./EnhancedAgreementCreation";
import { Button } from "../ui";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";

const PageEnhancedAgreementCreation = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const { register, control, watch, setValue, handleSubmit, getValues } =
    useForm({ defaultValues: initialValues });

  const isSaveDisabled = !watch("confirmReview") || !watch("confirmAgreement");

  const goToNextStep = () => {
    if (currentStep < 8) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = (data: FormValues) => {
    console.log("Form Submitted:", data);
  };

  const stepProps: StepProps = useMemo(
    () => ({ register, control, watch, setValue }),
    [register, control, watch, setValue]
  );

  const stepsMap: Record<number, React.ReactNode> = {
    1: <BasicInfoStep {...stepProps} />,
    2: <PartiesStep {...stepProps} />,
    3: <UnitsSpacesStep {...stepProps} />,
    4: <RentDepositsStep {...stepProps} />,
    5: <UtilitiesServicesStep {...stepProps} />,
    6: <SLATermsStep {...stepProps} />,
    7: <ClausesComplianceStep {...stepProps} />,
    8: <ReviewValidateStep {...stepProps} />,
  };

  const isStep8 = currentStep === 8;
  return (
    <div className="mb-5">
      <Stepper currentStep={currentStep} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="py-4">{stepsMap[currentStep]}</div>
        <div className="flex justify-between">
          <Button
            variant="secondary"
            onClick={goToPreviousStep}
            disabled={currentStep === 1}
            className="space-x-1"
            type="button">
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </Button>

          {isStep8 ? (
            <div className="flex w-full space-x-3 justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => console.log("Save as Draft:", getValues())}>
                Save as Draft
              </Button>

              <Button
                type="submit"
                className="space-x-1"
                disabled={isSaveDisabled}>
                <span>Create Agreement</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <Button type="button" onClick={goToNextStep} className="space-x-1">
              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default PageEnhancedAgreementCreation;
