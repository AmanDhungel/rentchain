import { z } from "zod";

// Helper schema for a single day's operating hours
const daySchema = z
  .object({
    // Checkbox state (e.g., if Monday is checked)
    checked: z.boolean(),
    // Open time string (e.g., "06:00")
    open: z
      .string()
      .regex(/^([01]\d|2[0-3]):?([0-5]\d)$/, "Invalid time format (HH:MM)"),
    // Close time string (e.g., "22:00")
    close: z
      .string()
      .regex(/^([01]\d|2[0-3]):?([0-5]\d)$/, "Invalid time format (HH:MM)"),
  })
  .refine((data) => data.open < data.close, {
    message: "Close time must be after open time.",
    path: ["close"],
  });

// Main form schema
export const operatingHoursSchema = z.object({
  // Main toggle for 24/7 operation
  is247: z.boolean(),
  // Operating hours for each day
  days: z.object({
    monday: daySchema,
    tuesday: daySchema,
    wednesday: daySchema,
    thursday: daySchema,
    friday: daySchema,
    saturday: daySchema,
    sunday: daySchema,
  }),
});

// Type extraction for TypeScript safety
export type OperatingHoursFormValues = z.infer<typeof operatingHoursSchema>;
