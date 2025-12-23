import * as z from "zod";

export const stepSchema = [
  // Step 1: Personal & Contact
  z.object({
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    dob: z.string().min(1, "Date of birth is required"),
    nationality: z.string().min(1, "Nationality is required"),
    idNumber: z.string().min(1, "ID Number is required"),
    phone: z.string().min(10, "Valid phone number required"),
    email: z.string().email("Invalid email address"),
    photo: z.any().optional(),
    alternatePhone: z.string().optional(),
    facebook: z.string().optional(),
    instagram: z.string().optional(),
    twitter: z.string().optional(),
    whatsapp: z.string().optional(),
    pinterest: z.string().optional(),
    linkedin: z.string().optional(),
  }),
  // Step 2: Relationship & Stay
  z.object({
    relationship: z.string().min(1, "Relationship is required"),
    moveInDate: z.string().min(1, "Move-in date is required"),
    duration: z.string().min(1, "Expected duration is required"),
    urgency: z.enum(["Low", "Medium", "High"]),
    reason: z.string().min(10, "Please provide a more detailed reason"),
  }),
  // Step 3: Emergency & Health
  z.object({
    emergencyName: z.string().min(2, "Emergency contact name is required"),
    emergencyRelation: z.string().min(1, "Relationship is required"),
    emergencyPhone: z.string().min(10, "Valid phone required"),
    medicalConditions: z.string().optional(),
  }),
  // Step 4: Documents
  z.object({
    govId: z.any().refine((file) => file !== null, "Government ID is required"),
    incomeProof: z.any().optional(),
    healthCert: z.any().optional(),
  }),
  // Step 5: Review (No schema needed, just display)
  z.object({}),
];

export type FormData = z.infer<(typeof stepSchema)[0]> &
  z.infer<(typeof stepSchema)[1]> &
  z.infer<(typeof stepSchema)[2]> &
  z.infer<(typeof stepSchema)[3]>;
