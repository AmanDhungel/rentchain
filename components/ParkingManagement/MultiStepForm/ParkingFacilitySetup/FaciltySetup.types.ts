import { z } from "zod";

// --- Smallest unit schema: Parking Space ---
// Used for the Bulk Add dialog
export const SingleSpaceSchema = z.object({
  id: z.string().optional(),
  spaceNumber: z.string().min(1, "Space Number is required."),
  isOccupied: z.boolean().default(false),
});

export const BulkAddSchema = z.object({
  // Bulk Add tab fields (for steps 9 and 10)
  startSpaceNumber: z.string().min(1, "Start Space Number is required."),
  endSpaceNumber: z.string().min(1, "End Space Number is required."),
  spaceType: z.enum(["standard", "handicapped", "electric"]),
  isReservable: z.boolean().default(false),
  note: z.string().optional(),
});

// --- Row Schema ---
export const RowSchema = z.object({
  id: z
    .string()
    .uuid()
    .default(() => crypto.randomUUID()),
  name: z.string().min(1, "Row Name is required."),
  spaces: z.array(SingleSpaceSchema).default([]),
});

export const AddRowSchema = RowSchema.pick({ name: true });

// --- Zone Schema ---
export const ZoneSchema = z.object({
  id: z
    .string()
    .uuid()
    .default(() => crypto.randomUUID()),
  name: z.string().min(1, "Zone Name is required."),
  rows: z.array(RowSchema).default([]),
});

export const AddZoneSchema = ZoneSchema.pick({ name: true });

// --- Level Schema ---
export const LevelSchema = z.object({
  id: z
    .string()
    .uuid()
    .default(() => crypto.randomUUID()),
  name: z.string().min(1, "Level Name is required."), // e.g., "Ground Floor"
  zones: z.array(ZoneSchema).default([]),
});

export const AddLevelSchema = LevelSchema.pick({ name: true });

// --- Main Structure Schema (The full form state) ---
export const StructureSchema = z.object({
  levels: z.array(LevelSchema).default([]),
});

// --- TypeScript Types ---
export type StructureFormValues = z.infer<typeof StructureSchema>;
export type Level = z.infer<typeof LevelSchema>;
export type Zone = z.infer<typeof ZoneSchema>;
export type Row = z.infer<typeof RowSchema>;
export type AddLevelValues = z.infer<typeof AddLevelSchema>;
export type AddZoneValues = z.infer<typeof AddZoneSchema>;
export type AddRowValues = z.infer<typeof AddRowSchema>;
export type BulkAddValues = z.infer<typeof BulkAddSchema>;
export type SingleSpace = z.infer<typeof SingleSpaceSchema>;
