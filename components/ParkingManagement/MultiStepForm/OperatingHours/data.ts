// Define the keys for iterating and field naming
export const dayKeys = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const;

// Utility type for a single day key
export type DayKey = (typeof dayKeys)[number];

// Initial default values matching the image
export const defaultOperatingHours: OperatingHoursFormValues = {
  is247: false,
  days: {
    monday: { checked: true, open: "06:00", close: "22:00" },
    tuesday: { checked: true, open: "06:00", close: "22:00" },
    wednesday: { checked: true, open: "06:00", close: "22:00" },
    thursday: { checked: true, open: "06:00", close: "22:00" },
    friday: { checked: true, open: "06:00", close: "22:00" },
    saturday: { checked: true, open: "06:00", close: "22:00" },
    sunday: { checked: true, open: "06:00", close: "22:00" },
  },
};
