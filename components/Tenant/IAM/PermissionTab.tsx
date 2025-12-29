import { Card } from "@/components/ui/card";

const PermissionCategory = ({
  title,
  count,
  items,
}: {
  title: string;
  count: number;
  items: string[];
}) => (
  <Card className="p-6 mb-6">
    <div className="mb-4">
      <h3 className="font-bold text-slate-800">{title}</h3>
      <p className="text-xs text-muted-foreground">
        {count} permissions available
      </p>
    </div>
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item} className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-orange-500" />
          <div>
            <p className="text-sm font-medium text-slate-700">{item}</p>
            <p className="text-xs text-slate-400">
              Access and modify related data and settings
            </p>
          </div>
        </div>
      ))}
    </div>
  </Card>
);

const PermissionsTab = () => (
  <div>
    <h2 className="text-xl font-bold mb-1">Permission Categories</h2>
    <p className="text-sm text-muted-foreground mb-6">
      Available permissions for property management access control
    </p>

    <PermissionCategory
      title="Property Management"
      count={7}
      items={[
        "View Properties",
        "Edit Properties",
        "Manage Units",
        "View Occupancy",
      ]}
    />
    <PermissionCategory
      title="Tenant & Sub-tenant Management"
      count={7}
      items={[
        "View Tenants",
        "Invite Tenants",
        "Manage Sub-tenants",
        "Tenant Screening",
      ]}
    />
  </div>
);
export default PermissionsTab;
