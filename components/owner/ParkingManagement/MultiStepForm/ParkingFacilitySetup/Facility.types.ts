// src/lib/schemas.ts
import { z } from "zod";

// --- Pricing Strategy Schemas ---
export const BaseRatesSchema = z.object({
  hourly: z.number().min(0, "Must be non-negative").default(15),
  daily: z.number().min(0, "Must be non-negative").default(80),
  monthly: z.number().min(0, "Must be non-negative").default(1200),
  quarterly: z.number().min(0, "Must be non-negative").default(3200),
  yearly: z.number().min(0, "Must be non-negative").default(1200),
});

export const DynamicPricingFactorsSchema = z.object({
  peakHours: z.boolean().default(false),
  events: z.boolean().default(false),
  weatherConditions: z.boolean().default(false),
  occupancyRate: z.boolean().default(false),
  seasonalDemand: z.boolean().default(false),
  dayOfWeek: z.boolean().default(false),
  specialOccasions: z.boolean().default(false),
  localTraffic: z.boolean().default(false),
});

export const PricingStrategySchema = z.object({
  description: z
    .enum(["Dynamic Pricing", "Fixed Pricing"])
    .default("Dynamic Pricing"),
  baseRates: BaseRatesSchema,
  dynamicFactors: DynamicPricingFactorsSchema,
});

// --- Space Schemas (Nested) ---

// Base schema for both Single and Bulk Add
const BaseSpaceSchema = z.object({
  id: z.string().uuid().optional(),
  spaceType: z
    .enum(["Standard", "EV Charging", "Accessible"])
    .default("Standard"),
  width: z.number().min(0.5, "Min width is 0.5m"),
  length: z.number().min(1, "Min length is 1m"),
  height: z.number().min(0, "Min height is 0m"),
  isCovered: z.boolean().default(false),
  hasEVCharger: z.boolean().default(false),
  isAccessible: z.boolean().default(false),
  note: z.string().optional(),
  pricingStrategy: PricingStrategySchema,
});

// 1. Single Space Schema
export const SingleSpaceSchema = BaseSpaceSchema.extend({
  spaceNumber: z.string().min(1, "Space Number is required"),
});

export type SingleSpaceData = z.infer<typeof SingleSpaceSchema>;

// 2. Bulk Add Schema (for form validation only)
export const BulkAddSchema = BaseSpaceSchema.extend({
  startingNumber: z.number().min(1, "Starting number must be at least 1"),
  prefix: z.string().optional(),
  // Note: We don't include spaceNumber here, as it's generated on submission.
});

export type BulkAddData = z.infer<typeof BulkAddSchema>;

// The actual data structure for a Space (after number generation)
export const SpaceSchema = BaseSpaceSchema.extend({
  spaceNumber: z.string(),
});
export type Space = z.infer<typeof SpaceSchema>;

// --- Row Schema (Nested) ---
export const RowSchema = z.object({
  id: z.string().uuid().optional(),
  rowName: z.string().min(1, "Row Name is required"),
  rowCode: z.string().min(1, "Row Code is required"),
  parkingOrientation: z
    .enum(["Perpendicular", "Angled", "Parallel"])
    .default("Perpendicular"),
  spacingWidth: z.number().min(0.5, "Min spacing width is 0.5m"),
  aisleWidth: z.number().min(1, "Min aisle width is 1m"),
  spaces: z.array(SpaceSchema).default([]),
});
export type Row = z.infer<typeof RowSchema>;
export type AddRowData = z.infer<typeof RowSchema>;

// --- Zone Schema (Nested) ---
export const ZoneSchema = z.object({
  id: z.string().uuid().optional(),
  zoneName: z.string().min(1, "Zone Name is required"),
  zoneCode: z.string().min(1, "Zone Code is required"),
  zoneType: z
    .enum(["VIP", "Standard", "Staff", "Motorcycle"])
    .default("Standard"),
  area: z.number().min(1, "Area must be greater than 0"),
  hasLighting: z.boolean().default(false),
  hasCCTV: z.boolean().default(false),
  hasWeatherProtection: z.boolean().default(false),
  rows: z.array(RowSchema).default([]),
});
export type Zone = z.infer<typeof ZoneSchema>;
export type AddZoneData = z.infer<typeof ZoneSchema>;

// --- Level Schema (Nested) ---
export const LevelSchema = z.object({
  id: z.string().uuid().optional(),
  levelName: z.string().min(1, "Level Name is required"),
  levelNumber: z.number().default(0),
  levelType: z
    .enum(["Elevated", "Underground", "Ground Floor"])
    .default("Ground Floor"),
  heightClearance: z.number().min(1.5, "Min clearance is 1.5m"),
  surfaceType: z.enum(["Asphalt", "Concrete", "Gravel"]).default("Concrete"),
  lightingType: z.enum(["LED", "Fluorescent", "Natural"]).default("LED"),
  hasElevator: z.boolean().default(false),
  hasStairs: z.boolean().default(false),
  hasVehicleLift: z.boolean().default(false),
  hasFireSafety: z.boolean().default(false),
  hasSprinklerSystem: z.boolean().default(false),
  zones: z.array(ZoneSchema).default([]),
});
export type Level = z.infer<typeof LevelSchema>;
export type AddLevelData = z.infer<typeof LevelSchema>;

// --- Facility Schema (Root) ---
export const FacilitySchema = z.object({
  name: z.string().default("Plaza Tower Parking"),
  levels: z.array(LevelSchema).default([]),
});
export type Facility = z.infer<typeof FacilitySchema>;

// Utility function to generate a unique ID
export const generateId = () => crypto.randomUUID();
