import {
  Key,
  QrCode,
  Smartphone,
  Hand,
  Car,
  Fingerprint,
  Lock,
  Shield,
  Zap,
} from "lucide-react";

// --- Access Methods Data ---
export const ACCESS_METHODS = [
  { id: "rfid", label: "RFID Cards", icon: Key },
  { id: "qr_code", label: "QR Code", icon: QrCode },
  { id: "mobile_app", label: "Mobile App", icon: Smartphone },
  { id: "manual_control", label: "Manual Control", icon: Hand },
  { id: "license_plate", label: "License Plate Recognition", icon: Car },
  { id: "biometric", label: "Biometric Access", icon: Fingerprint },
] as const;

// Extract types for strict TypeScript safety
export type AccessMethodId = (typeof ACCESS_METHODS)[number]["id"];

// --- Security Levels Data ---
export const SECURITY_LEVELS = [
  { value: "basic", label: "Basic", icon: Lock },
  { value: "standard", label: "Standard", icon: Shield },
  { value: "advanced", label: "Advanced", icon: Zap },
];

// --- Default Form Values ---
export const defaultAccessControlValues = {
  // Matches the image: RFID is the only selected card
  access_methods: ["rfid"] as AccessMethodId[],
  security_level: "basic",
  number_of_cameras: 15,
  security_features: {
    entry_exit_barriers: false,
    security_guard_on_duty: false,
    emergency_access_system: false,
  },
};
