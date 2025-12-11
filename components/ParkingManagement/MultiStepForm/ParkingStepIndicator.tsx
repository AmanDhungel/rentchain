const StepItem = ({
  stepNumber,
  label,
  currentStep,
}: {
  stepNumber: number;
  label: string;
  currentStep: number;
}) => {
  const isCompleted = stepNumber < currentStep;
  const isActive = stepNumber === currentStep;

  let circleClasses =
    "w-10 h-10 flex items-center justify-center rounded-full border-2 transition-colors duration-300";
  if (isActive) {
    circleClasses += " bg-orange-500 text-white border-orange-500 font-bold";
  } else if (isCompleted) {
    circleClasses +=
      " bg-white text-orange-500 border-orange-500 font-semibold cursor-pointer hover:bg-orange-50";
  } else {
    circleClasses += " bg-white text-gray-700 border-gray-400 font-semibold";
  }

  let labelClasses = "mt-2 text-sm";
  if (isActive) {
    labelClasses += " text-orange-500 font-semibold";
  } else {
    labelClasses += " text-gray-700";
  }

  const displayContent = isCompleted ? (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5 13l4 4L19 7"></path>
    </svg>
  ) : (
    stepNumber
  );

  return (
    <div className="flex flex-col items-center">
      <div className={circleClasses}>{displayContent}</div>
      <div className={labelClasses}>{label}</div>
    </div>
  );
};

const steps = [
  { id: 1, label: "Basic Info" },
  { id: 2, label: "Location" },
  { id: 3, label: "Structure Builder" },
  { id: 4, label: "Operating Hours" },
  { id: 5, label: "Access Control" },
  { id: 6, label: "Amenities & Pricing" },
  { id: 7, label: "Review" },
];

const ParkingStepIndicator = ({ currentStep = 1 }) => {
  return (
    <div className="flex w-full justify-between  items-start space-x-4 p-4 border-b border-gray-200">
      {steps.map((step) => (
        <StepItem
          key={step.id}
          stepNumber={step.id}
          label={step.label}
          currentStep={currentStep}
        />
      ))}
    </div>
  );
};

export default ParkingStepIndicator;
