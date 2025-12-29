import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Edit2 } from "lucide-react";
import { CreateRoleDialog } from "./CreateRoleDialog";

const RolesTab = () => {
  const roles = [
    {
      name: "Property Manager",
      type: "Predefined",
      desc: "Full property management with financial oversight",
      perms: 21,
    },
    {
      name: "Real Estate Agent",
      type: "Predefined",
      desc: "Property marketing, tenant acquisition, and agreement management",
      perms: 29,
    },
    {
      name: "Financial Assistant",
      type: "Predefined",
      desc: "Handles billing, payments, and financial reporting",
      perms: 7,
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">Access Roles</h2>
          <p className="text-sm text-muted-foreground">
            Predefined and custom roles for property management
          </p>
        </div>
        <CreateRoleDialog />
      </div>

      <section>
        <h3 className="text-lg font-semibold mb-4">Predefined Roles</h3>
        <div className="space-y-3">
          {roles.map((role) => (
            <Card
              key={role.name}
              className="p-5 flex flex-row justify-between items-center">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-slate-700">{role.name}</span>
                  <Badge
                    variant="outline"
                    className="text-[10px] font-normal uppercase rounded-sm">
                    Predefined
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{role.desc}</p>
                <p className="text-xs text-slate-400 mt-2">
                  {role.perms} permissions included
                </p>
              </div>
              <Button variant="outline" size="sm" className="gap-2">
                <Eye className="h-4 w-4" /> View Details
              </Button>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-4">Custom Roles</h3>
        <Card className="p-5 flex flex-row justify-between items-center">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-bold text-slate-700">
                Senior Property Coordinator
              </span>
              <Badge
                variant="outline"
                className="text-[10px] font-normal uppercase bg-slate-50">
                Custom
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Enhanced property management with tenant oversight
            </p>
            <p className="text-xs text-slate-400 mt-2">
              7 permissions • 1 user(s) • Created: 2025-01-20
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Eye className="h-4 w-4" /> View Details
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Edit2 className="h-4 w-4" /> Edit
            </Button>
          </div>
        </Card>
      </section>
    </div>
  );
};
export default RolesTab;
