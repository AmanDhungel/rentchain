export interface ParkingStructureSummary {
  totalFacilities: number;
  totalLevels: number;
  totalZones: number;
  totalSpaces: number;
}

export interface BasicInfo {
  facilityName: string | null;
  facilityCode: string | null;
  type: string | null;
  ownership: string | null;
}

export interface AccessSecurity {
  access_methods: AccessMethodId[];
  security_level: "basic" | "standard" | "advanced";
  operatingHours: "24/7" | "Limited Hours" | "Not set"; // Simplified for display
}

export interface AmenitiesFeatures {
  selected_amenities: AmenityId[];
}

// The unified type for the entire form
export interface CompleteFormValues
  extends BasicInfo,
    AccessSecurity,
    AmenitiesFeatures {
  // We'll treat the summary as separate state or computed value for this component
  parkingSummary: ParkingStructureSummary;
}

import { useFormContext } from "react-hook-form";

// shadcn/ui imports
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// Local imports (assuming you have a unified type and data)
import { AMENITIES_LIST, AmenityId } from "./AmenitiesandPricing/data"; // Assumed list
import {
  ACCESS_METHODS,
  AccessMethodId,
  SECURITY_LEVELS,
} from "./AccessControl/data"; // Assumed list

// --- Helper Functions to translate IDs to Labels ---

// Finds human-readable label for a given ID (e.g., 'valet_service' -> 'Valet Service')
const getAmenityLabel = (id: string): string => {
  const amenity = AMENITIES_LIST.find((a) => a.id === id);
  return amenity ? amenity.label : id;
};

// Finds human-readable label for access method ID (e.g., 'rfid' -> 'RFID Cards')
const getAccessMethodLabel = (id: string): string => {
  const method = ACCESS_METHODS.find((m) => m.id === id);
  return method ? method.label : id;
};

// --- Parking Structure Summary Card Component ---
const SummaryCard: React.FC<{ label: string; value: number }> = ({
  label,
  value,
}) => (
  <Card className="flex flex-col items-center justify-center p-4 min-h-[100px] shadow-none border-dashed border-2 border-gray-300">
    <div className="text-sm text-gray-500 mb-1">{label}</div>
    <div
      className={`text-3xl font-bold ${
        value > 0 ? "text-green-600" : "text-gray-500"
      }`}>
      {value}
    </div>
  </Card>
);

// --- Review & Submit Component ---
const ReviewSubmitForm = () => {
  // Use form context to access all form data
  const form = useFormContext<CompleteFormValues>();
  const allFormData = form.watch();

  // Extract sections and apply fallbacks for display
  const {
    parkingSummary,
    facilityName,
    facilityCode,
    type,
    ownership,
    access_methods,
    security_level,
    operatingHours,
    selected_amenities,
  } = allFormData;

  // NOTE: For the parkingSummary, we will use the default data from the image
  // since this data typically comes from a separate state calculation, not user input.
  const summaryData: ParkingStructureSummary = parkingSummary || {
    totalFacilities: 3,
    totalLevels: 0,
    totalZones: 3,
    totalSpaces: 0,
  };

  // Helper for displaying 'Not set' or actual value
  const displayValue = (value: string | number | null) =>
    value === null || value === "" || value === 0 ? (
      <span className="text-gray-400">Not set</span>
    ) : (
      value
    );

  // Render the component
  return (
    <div className="max-w-4xl mx-auto p-8 rounded-xl shadow-lg border bg-white">
      <h2 className="text-2xl font-semibold mb-8">Review & Submit</h2>

      {/* ====================================
          1. Parking Structure Summary
          ==================================== */}
      <section className="mb-8">
        <h3 className="text-xl font-medium mb-4">Parking Structure Summary</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <SummaryCard
            label="Total Facilities"
            value={summaryData.totalFacilities}
          />
          <SummaryCard label="Total Levels" value={summaryData.totalLevels} />
          <SummaryCard label="Total Zones" value={summaryData.totalZones} />
          <SummaryCard label="Total Spaces" value={summaryData.totalSpaces} />
        </div>
      </section>

      <Separator className="my-6" />

      {/* ====================================
          2. Basic Information
          ==================================== */}
      <section className="mb-8">
        <h3 className="text-xl font-medium mb-4">Basic Information</h3>
        <div className="grid grid-cols-2 gap-y-3">
          <div className="text-gray-600">Facility Name:</div>
          <div className="font-medium text-right">
            {displayValue(facilityName)}
          </div>

          <div className="text-gray-600">Facility Code:</div>
          <div className="font-medium text-right">
            {displayValue(facilityCode)}
          </div>

          <div className="text-gray-600">Type:</div>
          <div className="font-medium text-right">{displayValue(type)}</div>

          <div className="text-gray-600">Ownership:</div>
          <div className="font-medium text-right">
            {displayValue(ownership)}
          </div>
        </div>
      </section>

      <Separator className="my-6" />

      {/* ====================================
          3. Access & Security
          ==================================== */}
      <section className="mb-8">
        <h3 className="text-xl font-medium mb-4">Access & Security</h3>
        <div className="grid grid-cols-2 gap-y-3">
          <div className="text-gray-600">Access Method:</div>
          <div className="font-medium text-right">
            {access_methods && access_methods.length > 0 ? (
              // Display a comma-separated list of selected access methods
              access_methods.map(getAccessMethodLabel).join(", ")
            ) : (
              <span className="text-gray-400">Not set</span>
            )}
          </div>

          <div className="text-gray-600">Security Level:</div>
          <div className="font-medium text-right">
            {displayValue(security_level)}
          </div>

          <div className="text-gray-600">Operating Hours:</div>
          <div className="font-medium text-right">
            {displayValue(operatingHours || "Limited Hours")}
            {/* operatingHours would need to be passed from the OperatingHours component */}
          </div>
        </div>
      </section>

      <Separator className="my-6" />

      {/* ====================================
          4. Amenities
          ==================================== */}
      <section className="mb-8">
        <h3 className="text-xl font-medium mb-4">Amenities</h3>
        <div className="flex flex-wrap gap-2">
          {selected_amenities && selected_amenities.length > 0 ? (
            selected_amenities.map((id) => (
              <Badge
                key={id}
                variant="secondary"
                className="bg-gray-100 text-gray-700 font-normal border border-gray-300">
                {getAmenityLabel(id)}
              </Badge>
            ))
          ) : (
            <span className="text-gray-400">No amenities selected</span>
          )}
        </div>
      </section>
    </div>
  );
};

export default ReviewSubmitForm;
