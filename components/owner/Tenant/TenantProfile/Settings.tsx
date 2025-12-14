"use client";
import { Switch } from "@/components/ui";
import React, { FC, useState } from "react";

// --- TYPE DEFINITIONS ---

/**
 * Defines the structure for the overall tenant settings state.
 */
interface TenantSettings {
  portalAccess: boolean;
  mobileAccess: boolean;
  canAddOccupants: boolean;
  canRequestMaintenance: boolean;
  canAccessDocuments: boolean;
  canMakePayments: boolean;
  canSublet: boolean;
  canModifyLease: boolean;
  reminders: boolean;
  maintenanceUpdates: boolean;
  propertyAnnouncements: boolean;
  autoPayEnabled: boolean;
}

/**
 * Interface for a single setting item within a section.
 */
interface SettingItem {
  key: keyof TenantSettings;
  title: string;
  description: string;
  defaultState: boolean;
}

// --- MOCK DATA / DEFAULT STATE ---

// Define the initial state based on the image provided (where orange means ON/true)
const INITIAL_SETTINGS: TenantSettings = {
  portalAccess: true, // Orange switch is ON
  mobileAccess: true, // Orange switch is ON
  canAddOccupants: false, // Gray switch is OFF
  canRequestMaintenance: true, // Orange switch is ON
  canAccessDocuments: true, // Orange switch is ON
  canMakePayments: false, // Gray switch is OFF
  canSublet: true, // Orange switch is ON
  canModifyLease: true, // Orange switch is ON
  reminders: true, // Orange switch is ON
  maintenanceUpdates: true, // Orange switch is ON
  propertyAnnouncements: true, // Orange switch is ON
  autoPayEnabled: true, // Orange switch is ON
};

const portalAccessSettings: SettingItem[] = [
  {
    key: "portalAccess",
    title: "Portal Access",
    description: "Allow tenant to access the tenant portal",
    defaultState: INITIAL_SETTINGS.portalAccess,
  },
  {
    key: "mobileAccess",
    title: "Mobile App Access",
    description: "Enable mobile app login for tenant",
    defaultState: INITIAL_SETTINGS.mobileAccess,
  },
];

const permissionSettings: SettingItem[] = [
  {
    key: "canAddOccupants",
    title: "Can Add Occupants",
    description: "Allow tenant to add additional occupants",
    defaultState: INITIAL_SETTINGS.canAddOccupants,
  },
  {
    key: "canRequestMaintenance",
    title: "Can Request Maintenance",
    description: "Allow tenant to submit maintenance requests",
    defaultState: INITIAL_SETTINGS.canRequestMaintenance,
  },
  {
    key: "canAccessDocuments",
    title: "Can Access Documents",
    description: "Allow tenant to view and download documents",
    defaultState: INITIAL_SETTINGS.canAccessDocuments,
  },
  {
    key: "canMakePayments",
    title: "Can Make Payments",
    description: "Allow tenant to make online payments",
    defaultState: INITIAL_SETTINGS.canMakePayments,
  },
  {
    key: "canSublet",
    title: "Can Sublet",
    description: "Allow tenant to sublet the property",
    defaultState: INITIAL_SETTINGS.canSublet,
  },
  {
    key: "canModifyLease",
    title: "Can Modify Lease",
    description: "Allow tenant to request leave modifications",
    defaultState: INITIAL_SETTINGS.canModifyLease,
  },
];

const notificationSettings: SettingItem[] = [
  {
    key: "reminders",
    title: "Payment Reminders",
    description: "Send automatic payment reminders",
    defaultState: INITIAL_SETTINGS.reminders,
  },
  {
    key: "maintenanceUpdates",
    title: "Maintenance Updates",
    description: "Notify about maintenance request updates",
    defaultState: INITIAL_SETTINGS.maintenanceUpdates,
  },
  {
    key: "propertyAnnouncements",
    title: "Property Announcements",
    description: "Receive property wide-announcements",
    defaultState: INITIAL_SETTINGS.propertyAnnouncements,
  },
];

// --- ICON COMPONENTS ---

// Define type for SVG props
type IconProps = React.SVGProps<SVGSVGElement>;

const SettingsIcon: FC<IconProps> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.09a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.15a2 2 0 0 1 0 2.72l-.15.15a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.09a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.09a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.15a2 2 0 0 1 0-2.72l.15-.15a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.09a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

// --- PRESENTATIONAL COMPONENTS ---

/**
 * Custom Switch Component (Mimicking shadcn/ui Switch styling).
 * Uses the primary orange color for the checked state.
 */
interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

/**
 * Component for a single setting item row (Title, Description, Switch).
 */
const SettingRow: FC<{
  item: SettingItem;
  state: TenantSettings;
  setState: React.Dispatch<React.SetStateAction<TenantSettings>>;
}> = ({ item, state, setState }) => {
  const handleToggle = (checked: boolean) => {
    setState((prev) => ({ ...prev, [item.key]: checked }));
  };

  return (
    <div className="flex justify-between items-center py-4 pt-0  border-b border-gray-100 last:border-b-0">
      <div className="flex flex-col flex-1 min-w-0 pr-4">
        <span className="text-base font-semibold text-gray-800">
          {item.title}
        </span>
        <span className="text-sm text-gray-500 mt-1">{item.description}</span>
      </div>

      <Switch checked={state[item.key]} onCheckedChange={handleToggle} />
    </div>
  );
};

const SettingSection: FC<{
  title: string;
  items: SettingItem[];
  state: TenantSettings;
  setState: React.Dispatch<React.SetStateAction<TenantSettings>>;
}> = ({ title, items, state, setState }) => (
  <div className="bg-white p-6 pt-0 rounded-xl shadow-md border border-gray-100 mb-8">
    <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2">{title}</h2>
    <div>
      {items.map((item) => (
        <SettingRow
          key={item.key}
          item={item}
          state={state}
          setState={setState}
        />
      ))}
    </div>
  </div>
);

const PaymentAutomationSection: FC<{
  state: TenantSettings;
  setState: React.Dispatch<React.SetStateAction<TenantSettings>>;
}> = ({ state, setState }) => {
  const item: SettingItem = {
    key: "autoPayEnabled",
    title: "Auto-Pay Enabled",
    description: "Automatically charge rent on due date",
    defaultState: INITIAL_SETTINGS.autoPayEnabled,
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 mb-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2">
        Payment Automation
      </h2>
      <SettingRow item={item} state={state} setState={setState} />
    </div>
  );
};

const Setting: FC = () => {
  const [settings, setSettings] = useState<TenantSettings>(INITIAL_SETTINGS);

  const handleReset = () => {
    setSettings(INITIAL_SETTINGS);
    console.log("Settings reset to default.");
  };

  const handleSave = () => {
    console.log("Settings saved:", settings);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8 font-sans">
      <header className="flex justify-between items-center mb-8 max-w-5xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Tenant Access & Permissions
        </h1>
        <button className="flex items-center bg-orange-500 text-white font-semibold py-2.5 px-5 rounded-lg shadow-md hover:bg-orange-600 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-orange-300">
          <SettingsIcon className="w-5 h-5 mr-2" />
          Advanced Settings
        </button>
      </header>

      <main className="max-w-5xl mx-auto">
        <h2 className="text-xl font-bold text-gray-800 mb-4 mt-8">
          Portal Access
        </h2>
        <SettingSection
          title=" "
          items={portalAccessSettings}
          state={settings}
          setState={setSettings}
        />

        <h2 className="text-xl font-bold text-gray-800 mb-4 mt-8">
          Permissions
        </h2>
        <SettingSection
          title=" "
          items={permissionSettings}
          state={settings}
          setState={setSettings}
        />

        <h2 className="text-xl font-bold text-gray-800 mb-4 mt-8">
          Notification Settings
        </h2>
        <SettingSection
          title=" "
          items={notificationSettings}
          state={settings}
          setState={setSettings}
        />

        <h2 className="text-xl font-bold text-gray-800 mb-4 mt-8">
          Payment Automation
        </h2>
        <PaymentAutomationSection state={settings} setState={setSettings} />
      </main>

      <footer className="flex justify-end space-x-4 max-w-5xl mx-auto mt-6">
        <button
          onClick={handleReset}
          className="bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-gray-300">
          Reset to Default
        </button>

        <button
          onClick={handleSave}
          className="bg-orange-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-orange-600 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-orange-300">
          Save Changes
        </button>
      </footer>

      <div className="pb-12"></div>
    </div>
  );
};

export default Setting;
