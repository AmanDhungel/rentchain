import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import { InviteUserDialog } from "./InviteUserDialog";

const UsersTab = () => (
  <div className="space-y-4">
    <div className="flex justify-between items-center">
      <h2 className="text-lg font-semibold">Team Members</h2>
      <InviteUserDialog />
    </div>
    <Input placeholder="Search users..." className="max-w-md" />

    {[
      {
        name: "Sarah Johnson",
        email: "sarah.j@gmail.com",
        role: "Property Manager",
        status: "Active",
        properties: "Skyline Towers, Garden Villa",
        permissions: 5,
        lastlogin: "2025-01-28 14:30",
        joined: "2024-12-15",
      },

      {
        name: "Mike Chen",
        email: "lorem@gmail.com",
        role: "Financial Assistant",
        status: "Active",
        properties: "All Properties",
        permissions: 3,
        lastlogin: "2025-12-15 14:30",
        joined: "2023-01-05",
      },
      {
        name: "David Laid",
        email: "david@gmail.com",
        role: "Manager Assistant",
        status: "Pending",
        properties: "All Properties",
        permissions: 5,
        lastlogin: "2025-12-15 14:30",
        joined: "2025-02-05",
      },
    ].map((user) => (
      <Card key={user.name} className="p-4 flex justify-between ">
        <div className="flex flex-col gap-4">
          <div className="flex">
            <div className="h-10 w-10 rounded-full bg-slate-200" />
            <div className="flex justify-between w-full">
              <div className="flex flex-col ml-4 gap-2">
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                <p className="flex gap-2 text-sm text-muted-foreground">
                  {user.role}
                  <Badge
                    variant="secondary"
                    className={`${
                      user.status === "Active"
                        ? "bg-green-500"
                        : "bg-orange-500"
                    } text-white rounded-sm`}>
                    {user.status}
                  </Badge>
                </p>
              </div>
              <div className="flex gap-3 items-center">
                <div className="flex flex-col text-end">
                  <h2 className="text-[15px] text-gray-400">
                    Last login:{user.lastlogin}
                  </h2>
                  <h2 className="text-[15px] text-gray-400">
                    Joined: {user.joined}
                  </h2>
                </div>
                <Button variant="outline" size="sm">
                  <Eye /> View
                </Button>
              </div>
            </div>
          </div>
          <hr />
          <div className="flex justify-between">
            <p className="text-xs mt-2 text-slate-500">
              Property Access:{" "}
              <span className="text-black font-medium">{user.properties}</span>
            </p>
            <p className="text-xs mt-2 text-slate-500">
              Permissions:{" "}
              <span className="text-black font-medium">
                {user.permissions} active
              </span>
            </p>
          </div>
        </div>
      </Card>
    ))}
  </div>
);
export default UsersTab;
