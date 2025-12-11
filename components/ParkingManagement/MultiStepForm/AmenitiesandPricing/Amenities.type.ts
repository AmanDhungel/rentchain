import { z } from "zod";
import { AMENITIES_LIST, AmenityId } from "./data";

// 1. Create a Zod Enum from the list of all valid Amenity IDs
const AmenityIdSchema = z.enum(
  AMENITIES_LIST.map((a) => a.id) as [AmenityId, ...AmenityId[]]
);

// 2. Main form schema
export const amenitiesSchema = z.object({
  // 'selected_amenities' will be an array of strings (AmenityIds)
  selected_amenities: z.array(AmenityIdSchema).default([]), // Ensure it defaults to an empty array
  // You could add .min(1, "Select at least one amenity.") if required
});

// Type extraction for TypeScript safety
export type AmenitiesFormValues = z.infer<typeof amenitiesSchema>;
