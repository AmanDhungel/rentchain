// Define the static list of all available amenities
export const AMENITIES_LIST = [
  { id: "electric_charging", label: "Electric Charging Stations" },
  { id: "valet_service", label: "Valet Service" },
  { id: "car_wash", label: "Car Wash" },
  { id: "security_patrol", label: "Security Patrol" },
  { id: "cctv_monitoring", label: "CCTV Monitoring" },
  { id: "emergency_call", label: "Emergency Call Points" },
  { id: "lighting", label: "Lighting" },
  { id: "weather_protection", label: "Weather Protection" },
  { id: "elevator_access", label: "Elevator Access" },
  { id: "wheelchair_accessible", label: "Wheelchair Accessible" },
  { id: "fire_safety", label: "Fire Safety System" },
  { id: "ventilation", label: "Ventilation System" },
] as const;

// Extract a type for the amenity ID for Zod and TypeScript safety
export type AmenityId = (typeof AMENITIES_LIST)[number]["id"];

// Default form values (e.g., none selected initially)
export const defaultAmenitiesValues = {
  selected_amenities: [] as AmenityId[],
};
