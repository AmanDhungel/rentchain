import { z } from "zod";
import { ACCESS_METHODS, AccessMethodId } from "./data";

// Type-safe Zod schema for AccessMethodId array
const AccessMethodIdSchema = z.enum(
  ACCESS_METHODS.map((m) => m.id) as [AccessMethodId, ...AccessMethodId[]]
);

// Main form schema
export const accessControlSchema = z.object({
  // Access Methods (Multiple Select Cards)
  access_methods: z
    .array(AccessMethodIdSchema)
    .min(1, { message: "Please select at least one access method." }),

  // Security Level (Select/Dropdown)
  security_level: z.enum(["basic", "standard", "advanced"], {
    message: "Please select a security level.",
  }),

  // Number of Cameras (Input)
  number_of_cameras: z.coerce
    .number()
    .int()
    .min(1, { message: "Must be at least 1 camera." })
    .max(999, { message: "Must be less than 1000." }),

  // Security Features (Checkboxes)
  security_features: z.object({
    entry_exit_barriers: z.boolean(),
    security_guard_on_duty: z.boolean(),
    emergency_access_system: z.boolean(),
  }),
});

// Type extraction for TypeScript safety
export type AccessControlFormValues = z.infer<typeof accessControlSchema>;
