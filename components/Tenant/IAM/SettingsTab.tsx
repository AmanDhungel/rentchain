import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";

const SettingsTab = () => (
  <div className="space-y-6">
    <Card className="p-6">
      <h3 className="font-semibold mb-4">Security Settings</h3>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium">Require Multi-Factor Authentication</p>
            <p className="text-sm text-muted-foreground">
              Enforce MFA for all users
            </p>
          </div>
          <Switch />
        </div>
        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium">Password Requirements</p>
            <p className="text-sm text-muted-foreground">
              Enforce strong passwords
            </p>
          </div>
          <Switch defaultChecked />
        </div>
      </div>
    </Card>

    <Card className="p-6">
      <h3 className="font-semibold mb-4">Audit & Logging</h3>
      <div className="flex justify-between items-center">
        <div>
          <p className="font-medium">Log User Actions</p>
          <p className="text-sm text-muted-foreground">
            Track all user activities
          </p>
        </div>
        <Switch defaultChecked />
      </div>
    </Card>
  </div>
);
export default SettingsTab;
