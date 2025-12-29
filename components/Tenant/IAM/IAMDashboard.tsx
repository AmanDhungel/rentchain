import { Download, Settings as SettingsIcon } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ApiTokensTab from "./ApiTokensTab";
import PermissionsTab from "./PermissionTab";
import RolesTab from "./RolesTab";
import SecurityTab from "./SecurityTab";
import SessionsTab from "./SessionsTab";
import SettingsTab from "./SettingsTab";
import UsersTab from "./UsersTab";

const IAMDashboard = () => {
  return (
    <div className="p-8  mx-auto space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Identity & Access Management
          </h1>
          <p className="text-muted-foreground">
            Manage team access and permissions for property management
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
          <Button variant="outline" size="sm">
            <SettingsIcon className="mr-2 h-4 w-4" /> Settings
          </Button>
        </div>
      </div>

      {/* Global Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Active Users", value: "3", icon: "👥" },
          { label: "Available Roles", value: "3", icon: "🛡️" },
          { label: "Permissions", value: "3", icon: "🔑" },
          { label: "Properties Managed", value: "3", icon: "🏢" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="p-4 border rounded-xl flex items-center gap-4 bg-card">
            <div className="text-2xl">{stat.icon}</div>
            <div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-2xl font-bold text-blue-600">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Tabs */}
      <Tabs defaultValue="users" className="w-full">
        <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0 space-x-8">
          {[
            "Users",
            "Roles",
            "Permissions",
            "Sessions",
            "API Tokens",
            "Security",
            "Settings",
          ].map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab.toLowerCase().replace(" ", "-")}
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-orange-500 data-[state=active]:bg-transparent px-0 pb-2">
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="mt-6">
          <TabsContent value="users">
            <UsersTab />
          </TabsContent>
          <TabsContent value="roles">
            <RolesTab />
          </TabsContent>
          <TabsContent value="permissions">
            <PermissionsTab />
          </TabsContent>
          <TabsContent value="sessions">
            <SessionsTab />
          </TabsContent>
          <TabsContent value="api-tokens">
            <ApiTokensTab />
          </TabsContent>
          <TabsContent value="security">
            <SecurityTab />
          </TabsContent>
          <TabsContent value="settings">
            <SettingsTab />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default IAMDashboard;
