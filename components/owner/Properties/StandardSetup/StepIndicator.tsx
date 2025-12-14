import { useEffect, useRef, useState, type ComponentType } from "react";
import { cn } from "../../../../lib/utils";
import { Location } from "../../../../assets/exportsiconsjsx/Location";
import { PropertyDetails } from "../../../../assets/exportsiconsjsx/PropertyDetails";
import { BasicInfo } from "../../../../assets/exportsiconsjsx/BasicInfo";
import { MediaFiles } from "../../../../assets/exportsiconsjsx/MediaFiles";
import { Amenities } from "@/assets/exportsiconsjsx/Amenities";
import { Publishing } from "../../../../assets/exportsiconsjsx/Publishing";
import { ReviewCreate } from "../../../../assets/exportsiconsjsx/ReviewCreate";
import { PropertyOwnershipIcon } from "../../../../assets/exportsiconsjsx/PropertyOwnershipIcon";
import { FinancialIcon } from "../../../../assets/exportsiconsjsx/FinancialIcon";
import { LegalInsuranceIcon } from "../../../../assets/exportsiconsjsx/LegalInsuranceIcon";
import { UtilitiesIcon } from "../../../../assets/exportsiconsjsx/UtilitiesIcon";
import { ParkingIcon } from "../../../../assets/exportsiconsjsx/ParkingIcon";
import { UnitStructureIcon } from "../../../../assets/exportsiconsjsx/UnitStructureIcon";

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
  { id: 3, label: "Property Ownership", icon: PropertyOwnershipIcon },
  { id: 4, label: "Property Details", icon: PropertyDetails },
  { id: 5, label: "Financial", icon: FinancialIcon },
  { id: 6, label: "Legal & Insurance", icon: LegalInsuranceIcon },
  { id: 7, label: "Media & Files", icon: MediaFiles },
  { id: 8, label: "Unit Structure", icon: UnitStructureIcon },
  { id: 9, label: "Parking Management", icon: ParkingIcon },
  { id: 10, label: "Utilities Assignment", icon: UtilitiesIcon },
  { id: 11, label: "Amenities", icon: Amenities },
  { id: 12, label: "Publishing", icon: Publishing },
  { id: 13, label: "Review & Create", icon: ReviewCreate },
];

export default function StepIndicator({
  currentStep,
}: {
  currentStep: number;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const getIndicatorStep = (currentStep: number): number => {
    if (currentStep <= 3) return currentStep;

    if (currentStep >= 4 && currentStep <= 10) return 4;
    if (currentStep === 15) {
      const offset = currentStep - 12;
      return 5 + offset;
    }
    if (currentStep >= 11 && currentStep <= 14) {
      const offset = currentStep - 11;
      return 5 + offset;
    }

    if (currentStep >= 16) {
      const offset = currentStep - 12;
      return 5 + offset;
    }

    return currentStep;
  };
  const indicatorStep = getIndicatorStep(currentStep);

  const getStepCompletionStatus = (stepId: number): boolean => {
    if (stepId <= 3) return currentStep > stepId;

    if (stepId === 4) return currentStep > 10;

    const mappedStep = getIndicatorStep(currentStep);
    return mappedStep > stepId;
  };

  const updateScrollButtons = () => {
    const c = containerRef.current;
    if (!c) return;
    setCanScrollLeft(c.scrollLeft > 5);
    setCanScrollRight(c.scrollLeft + c.clientWidth < c.scrollWidth - 5);
  };

  const scrollByChunk = (direction: "left" | "right") => {
    const c = containerRef.current;
    if (!c) return;
    const chunk = Math.max(c.clientWidth * 0.7, 200);
    const target =
      direction === "left" ? c.scrollLeft - chunk : c.scrollLeft + chunk;
    c.scrollTo({ left: target, behavior: "smooth" });
  };

  useEffect(() => {
    const activeEl = stepRefs.current[indicatorStep - 1];
    const c = containerRef.current;
    if (!activeEl || !c) return;

    try {
      activeEl.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    } catch {
      const elCenter = activeEl.offsetLeft + activeEl.clientWidth / 2;
      const targetScrollLeft = Math.max(0, elCenter - c.clientWidth / 2);
      c.scrollTo({ left: targetScrollLeft, behavior: "smooth" });
    }

    const t = setTimeout(updateScrollButtons, 300);
    return () => clearTimeout(t);
  }, [currentStep]);

  useEffect(() => {
    const c = containerRef.current;
    if (!c) return;

    updateScrollButtons();
    const onScroll = () => updateScrollButtons();
    const onResize = () => updateScrollButtons();

    c.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      c.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="relative">
      {canScrollLeft && (
        <button
          aria-label="scroll left"
          onClick={() => scrollByChunk("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-1 rounded-full shadow-md bg-white/90 hover:scale-105 transition-transform"
          style={{ transformOrigin: "center" }}>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M15 18L9 12L15 6"
              stroke="#202C4B"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}

      {canScrollRight && (
        <button
          aria-label="scroll right"
          onClick={() => scrollByChunk("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-1 rounded-full shadow-md bg-white/90 hover:scale-105 transition-transform">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M9 6L15 12L9 18"
              stroke="#202C4B"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}

      <div
        ref={containerRef}
        className="flex mb-6 overflow-x-auto scroll-smooth no-scrollbar"
        style={{ WebkitOverflowScrolling: "touch" }}
        aria-hidden={false}>
        <div className="flex flex-nowrap justify-between gap-3 ml-5 min-w-max w-full">
          {steps.map((step, index) => {
            const isActive = indicatorStep === step.id;
            const isCompleted = getStepCompletionStatus(step.id);
            const IconComponent = step.icon;

            return (
              <div
                key={step.id}
                ref={(el) => {
                  stepRefs.current[index] = el;
                }}
                className="flex flex-col items-center -ml-8 flex-shrink-0 relative px-4"
                role="listitem">
                <div className="z-10 flex items-center justify-center w-10 h-10 rounded-full">
                  <IconComponent
                    bgfill={
                      isActive ? "#F26522" : isCompleted ? "white" : "none"
                    }
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
                    "mt-2 w-20 text-sm font-medium text-center ",
                    isActive || isCompleted
                      ? "text-orange-500"
                      : "text-[#202C4B]"
                  )}>
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
