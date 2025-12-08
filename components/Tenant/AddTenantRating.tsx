import React, { useState, useMemo, useCallback } from "react";

// --- 1. Star Icon (Simulating Lucide Star) ---
const StarIcon = ({ fill }: { fill: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={fill}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5 transition-colors duration-100">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

// --- 2. Interfaces and Types ---

interface PerformanceRating {
  key: string;
  label: string;
  description: string;
  value: number;
}

interface FormData {
  tenantName: string;
  property: string;
  unit: string;
  tenancyDuration: number | null;
  performance: Record<string, number>;
  writtenReview: string;
  positiveAspects: string;
  areasForImprovement: string;
  recommendTenant: boolean;
  makeRatingPublic: boolean;
}

// --- 3. Custom Components (Shadcn Simulation) ---

interface StarRatingProps {
  initialValue: number;
  onValueChange: (value: number) => void;
  readOnly?: boolean;
}

const StarRating: React.FC<StarRatingProps> = ({
  initialValue,
  onValueChange,
  readOnly = false,
}) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const displayValue = hoverValue !== null ? hoverValue : initialValue;

  const handleClick = (index: number) => {
    if (!readOnly) {
      onValueChange(index + 1);
    }
  };

  const handleMouseEnter = (index: number) => {
    if (!readOnly) setHoverValue(index + 1);
  };

  const handleMouseLeave = () => {
    if (!readOnly) setHoverValue(null);
  };

  const roundedValue = initialValue.toFixed(1);

  return (
    <div className="flex items-center space-x-1">
      <div className="flex">
        {Array.from({ length: 5 }).map((_, index) => {
          const isFilled = displayValue > index;
          const fill = isFilled ? "rgb(251 191 36)" : "rgb(209 213 219)"; // Amber-400 / Gray-300
          return (
            <div
              key={index}
              onClick={() => handleClick(index)}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              className={`cursor-pointer ${readOnly ? "cursor-default" : ""}`}>
              <StarIcon fill={fill} />
            </div>
          );
        })}
      </div>
      <span className="text-sm font-medium text-gray-700 ml-2 min-w-[30px]">
        {roundedValue}
      </span>
    </div>
  );
};

interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

const Switch: React.FC<SwitchProps> = ({ checked, onCheckedChange }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    onClick={() => onCheckedChange(!checked)}
    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 ${
      checked ? "bg-orange-500" : "bg-gray-200"
    }`}>
    <span
      aria-hidden="true"
      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
        checked ? "translate-x-5" : "translate-x-0"
      }`}
    />
  </button>
);

// --- 4. Main Component (App) ---

const App: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    tenantName: "",
    property: "",
    unit: "",
    tenancyDuration: null,
    performance: {
      paymentReliability: 0,
      maintenanceCooperation: 0,
      communication: 0,
      propertyCleanliness: 0,
      compliance: 0,
    },
    writtenReview: "",
    positiveAspects: "",
    areasForImprovement: "",
    recommendTenant: false,
    makeRatingPublic: false,
  });

  const handleChange = useCallback((key: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handlePerformanceChange = useCallback(
    (key: keyof FormData["performance"], value: number) => {
      setFormData((prev) => ({
        ...prev,
        performance: { ...prev.performance, [key]: value },
      }));
    },
    []
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting Form Data:", formData);
    alert("Form submitted! Check console for data.");
  };

  const performanceRatings: PerformanceRating[] = useMemo(
    () => [
      {
        key: "paymentReliability",
        label: "Payment Reliability",
        description: "On-time payments and financial responsibility",
        value: formData.performance.paymentReliability,
      },
      {
        key: "maintenanceCooperation",
        label: "Maintenance Cooperation",
        description: "Response to maintenance requests and property upkeep",
        value: formData.performance.maintenanceCooperation,
      },
      {
        key: "communication",
        label: "Communication",
        description: "Responsiveness and clarity of communication",
        value: formData.performance.communication,
      },
      {
        key: "propertyCleanliness",
        label: "Property Cleanliness",
        description: "Cleanliness and care for the property",
        value: formData.performance.propertyCleanliness,
      },
      {
        key: "compliance",
        label: "Compliance",
        description: "Adherence to lease terms and property rules",
        value: formData.performance.compliance,
      },
    ],
    [formData.performance]
  );

  const overallRating = useMemo(() => {
    const totalRatings = performanceRatings.length;
    if (totalRatings === 0) return 0;
    const sum = performanceRatings.reduce((acc, curr) => acc + curr.value, 0);
    return sum / totalRatings;
  }, [performanceRatings]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 ">
      {/* Shadcn Dialog Simulation (Max Width Container) */}
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl p-6 md:p-8">
        <header className="flex justify-between items-center mb-6 border-b pb-4">
          <h2 className="text-2xl font-bold text-gray-900">
            Add Tenant Rating
          </h2>
          <button className="text-gray-400 hover:text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </header>

        <p className="text-sm text-gray-500 mb-8">
          Provide a comprehensive rating for your tenant`s performance during
          their tenancy.
        </p>

        <form onSubmit={handleSubmit}>
          {/* --- SECTION 1: Tenant & Property Information (Image: cdceac.png - Top Half) --- */}
          <section className="space-y-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-800">
              Tenant & Property Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-1">
                <label
                  htmlFor="tenantName"
                  className="text-sm font-medium text-gray-700 block mb-1">
                  Tenant Name
                </label>
                <input
                  id="tenantName"
                  type="text"
                  placeholder="Enter tenant name"
                  value={formData.tenantName}
                  onChange={(e) => handleChange("tenantName", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-sky-500 focus:border-sky-500 transition duration-150"
                  required
                />
              </div>
              <div className="md:col-span-1">
                <label
                  htmlFor="property"
                  className="text-sm font-medium text-gray-700 block mb-1">
                  Property
                </label>
                {/* Simplified Select (Dropdown arrow simulated) */}
                <div className="relative">
                  <select
                    id="property"
                    value={formData.property}
                    onChange={(e) => handleChange("property", e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm appearance-none pr-8 focus:ring-sky-500 focus:border-sky-500 transition duration-150"
                    required>
                    <option value="">Select property</option>
                    <option value="skyline">Skyline Towers</option>
                    <option value="oakwood">Oakwood Residence</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="md:col-span-1">
                <label
                  htmlFor="unit"
                  className="text-sm font-medium text-gray-700 block mb-1">
                  Unit
                </label>
                <input
                  id="unit"
                  type="text"
                  placeholder="e.g., Apt 4B"
                  value={formData.unit}
                  onChange={(e) => handleChange("unit", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-sky-500 focus:border-sky-500 transition duration-150"
                />
              </div>
              <div className="md:col-span-1">
                <label
                  htmlFor="duration"
                  className="text-sm font-medium text-gray-700 block mb-1">
                  Tenancy Duration (month)
                </label>
                <input
                  id="duration"
                  type="number"
                  placeholder="12"
                  value={
                    formData.tenancyDuration === null
                      ? ""
                      : formData.tenancyDuration
                  }
                  onChange={(e) =>
                    handleChange(
                      "tenancyDuration",
                      e.target.value ? parseInt(e.target.value) : null
                    )
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-sky-500 focus:border-sky-500 transition duration-150"
                  min="1"
                />
              </div>
            </div>
          </section>

          {/* --- SECTION 2: Performance Ratings (Image: cdceac.png - Bottom Half) --- */}
          <section className="space-y-4 mb-8">
            <h3 className="text-lg font-semibold text-gray-800">
              Performance Ratings
            </h3>
            <div className="space-y-3">
              {performanceRatings.map((rating) => (
                <div
                  key={rating.key}
                  className="flex flex-col md:flex-row md:items-center justify-between p-3 border border-gray-100 rounded-lg bg-gray-50">
                  <div className="md:w-3/4">
                    <p className="font-medium text-gray-800">{rating.label}</p>
                    <p className="text-xs text-gray-500">
                      {rating.description}
                    </p>
                  </div>
                  <div className="md:w-1/4 flex justify-start md:justify-end mt-2 md:mt-0">
                    <StarRating
                      initialValue={rating.value}
                      onValueChange={(val) =>
                        handlePerformanceChange(rating.key, val)
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* --- SECTION 3: Written Review (Image: cdce85.png - Top Half) --- */}
          <section className="space-y-4 mb-8">
            <h3 className="text-lg font-semibold text-gray-800">
              Written Review
            </h3>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="writtenReview"
                  className="text-sm font-medium text-gray-700 block mb-1">
                  Overall Review
                </label>
                <textarea
                  id="writtenReview"
                  rows={4}
                  placeholder="Provide a detailed review of the tenant's performance..."
                  value={formData.writtenReview}
                  onChange={(e) =>
                    handleChange("writtenReview", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-sky-500 focus:border-sky-500 transition duration-150 resize-y"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="positiveAspects"
                  className="text-sm font-medium text-gray-700 block mb-1">
                  Positive Aspect (comma-separated)
                </label>
                <input
                  id="positiveAspects"
                  type="text"
                  placeholder="e.g., Punctual payments, Good communication, Clean tenant"
                  value={formData.positiveAspects}
                  onChange={(e) =>
                    handleChange("positiveAspects", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-sky-500 focus:border-sky-500 transition duration-150"
                />
              </div>
              <div>
                <label
                  htmlFor="improvementAreas"
                  className="text-sm font-medium text-gray-700 block mb-1">
                  Areas for Improvement (comma-separated)
                </label>
                <input
                  id="improvementAreas"
                  type="text"
                  placeholder="e.g., Could reduce noise, Better maintenance reporting"
                  value={formData.areasForImprovement}
                  onChange={(e) =>
                    handleChange("areasForImprovement", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-sky-500 focus:border-sky-500 transition duration-150"
                />
              </div>
            </div>
          </section>

          {/* --- SECTION 4: Additional Settings and Overall Rating (Image: cdce85.png - Bottom Half) --- */}
          <section className="space-y-6 mb-8 pt-4 border-t">
            <h3 className="text-lg font-semibold text-gray-800">
              Additional Settings
            </h3>

            {/* Recommend Tenant Toggle */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">
                  Would you recommend this tenant?
                </p>
                <p className="text-sm text-gray-500">
                  Would you rent to this tenant again?
                </p>
              </div>
              <Switch
                checked={formData.recommendTenant}
                onCheckedChange={(val) => handleChange("recommendTenant", val)}
              />
            </div>

            {/* Make Rating Public Toggle */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">Make rating public</p>
                <p className="text-sm text-gray-500">
                  Allow other landlords to view this rating
                </p>
              </div>
              <Switch
                checked={formData.makeRatingPublic}
                onCheckedChange={(val) => handleChange("makeRatingPublic", val)}
              />
            </div>

            {/* Overall Rating Display */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
              <p className="font-bold text-lg text-gray-800">Overall Rating:</p>
              <div className="flex items-center space-x-2">
                <StarRating
                  initialValue={overallRating}
                  onValueChange={() => {}} // Read-only
                  readOnly
                />
                <span className="text-lg font-bold text-gray-700">
                  {overallRating.toFixed(1)}
                </span>
              </div>
            </div>
          </section>

          <div className="flex justify-end space-x-4 pt-4 border-t">
            <button
              type="button"
              onClick={() => console.log("Cancel clicked")}
              className="px-6 py-2 rounded-lg text-white bg-slate-500 hover:bg-slate-600 transition duration-150 font-semibold shadow-md">
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-lg text-white bg-orange-600 hover:bg-orange-700 transition duration-150 font-semibold shadow-md">
              Submit Rating
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default App;
