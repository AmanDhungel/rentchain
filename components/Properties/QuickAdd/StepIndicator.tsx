import type { ComponentType } from "react";
import { cn } from "@/lib/utils";
import { Location } from "@/assets/exportsiconsjsx/Location";
import { PropertyDetails } from "@/assets/exportsiconsjsx/PropertyDetails";
import { BasicInfo } from "@/assets/exportsiconsjsx/BasicInfo";
import { MediaFiles } from "@/assets/exportsiconsjsx/MediaFiles";
import { Amenities } from "@/assets/exportsiconsjsx/Amenities";
import { Publishing } from "@/assets/exportsiconsjsx/Publishing";
import { ReviewCreate } from "@/assets/exportsiconsjsx/ReviewCreate";

type CustomIconProps = {
  bgfill?: string;
  imagefill?: string;
  stroke?: string;
};

type Step = {
  id: number;
  label: string;
  icon: ComponentType<CustomIconProps>;
};

const steps: Step[] = [
  { id: 1, label: "Basic Info", icon: BasicInfo },
  { id: 2, label: "Location", icon: Location },
  { id: 3, label: "Property Details", icon: PropertyDetails },
  { id: 4, label: "Media & Files", icon: MediaFiles },
  { id: 5, label: "Amenities", icon: Amenities },
  { id: 6, label: "Publishing", icon: Publishing },
  { id: 7, label: "Review & Create", icon: ReviewCreate },
];

export default function StepIndicator({
  currentStep,
}: {
  currentStep: number;
}) {
  return (
    <div className="flex justify-between mb-6">
      {steps.map((step) => {
        const isActive = currentStep === step.id;
        const isCompleted = currentStep > step.id;

        const IconComponent = step.icon;

        return (
          <div
            key={step.id}
            className="flex flex-col items-center -ml-8 flex-1 relative">
            <div className="z-10 flex items-center justify-center w-10 h-10 rounded-full">
              <IconComponent
                bgfill={isActive ? "#F26522" : isCompleted ? "white" : "none"}
                imagefill={
                  isActive ? "white" : isCompleted ? "#F26522" : "#202C4B"
                }
                stroke={
                  isActive ? "#F26522" : isCompleted ? "#F26522" : "#202C4B"
                }
              />
            </div>

            <span
              className={cn(
                "mt-2 text-sm font-medium text-center",
                isActive || isCompleted ? "text-orange-500" : "text-[#202C4B]"
              )}>
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
