import { z } from "zod";

export const facilityFormSchema = z.object({
  facilityName: z
    .string()
    .min(2, { message: "Facility Name must be at least 2 characters." }),
  facilityCode: z
    .string()
    .regex(/^[A-Z0-9-]+$/, {
      message:
        "Facility Code can only contain uppercase letters, numbers, and hyphens.",
    })
    .min(4, { message: "Facility Code must be at least 4 characters." }),
  description: z
    .string()
    .max(500, { message: "Description cannot exceed 500 characters." })
    .optional(),

  facilityType: z
    .enum([
      "Multi-Storey Building",
      "Hydraulic/Automated",
      "Surface Parking",
      "Underground Garage",
      "Covered Parking",
      "Open Air Parking",
      "Mechanical System",
    ])
    .refine((val) => val !== undefined, {
      message: "Please select a Facility Type.",
    }),

  ownershipModel: z
    .enum([
      "Building Owned",
      "Service Purchased",
      "Separate Facility",
      "Co-Owned",
    ])
    .refine((val) => val !== undefined, {
      message: "Please select an Ownership Model.",
    }),
});

export type FacilityFormValues = z.infer<typeof facilityFormSchema>;

export const LocationSchema = z.object({
  addressLine1: z.string().min(5, {
    message: "Address Line 1 is required and must be at least 5 characters.",
  }),
  addressLine2: z.string().optional(), // Optional field
  city: z.string().min(2, {
    message: "City is required.",
  }),
  stateProvince: z.string().min(2, {
    message: "State/Province is required.",
  }),
  postalCode: z.string().regex(/^[a-z0-9\s-]{3,10}$/i, {
    message: "Invalid ZIP/Postal Code format.",
  }),
  country: z.string().min(2, {
    message: "Country is required.",
  }),
  location: z.object({ lat: z.number(), lng: z.number() }),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
});

export type LocationFormValues = z.infer<typeof LocationSchema>;
