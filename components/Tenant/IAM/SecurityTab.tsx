import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

const SecurityTab = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-3 gap-4">
      <Card className="p-4 flex flex-col items-center">
        <p className="text-xs text-muted-foreground mb-1">Security Score</p>
        <p className="text-3xl font-bold text-green-600">85%</p>
      </Card>
      <Card className="p-4 flex flex-col items-center">
        <p className="text-xs text-muted-foreground mb-1">
          Failed Logins (24h)
        </p>
        <p className="text-3xl font-bold text-red-500">3</p>
      </Card>
      <Card className="p-4 flex flex-col items-center">
        <p className="text-xs text-muted-foreground mb-1">2FA Enabled Users</p>
        <p className="text-3xl font-bold text-blue-600">2/4</p>
      </Card>
    </div>

    <Card className="p-6">
      <h3 className="font-bold mb-6">Authentication & Access</h3>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium text-sm">Two-Factor Authentication</p>
            <p className="text-xs text-muted-foreground">
              Require 2FA for all users
            </p>
          </div>
          <Switch />
        </div>
        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium text-sm">Login Notifications</p>
            <p className="text-xs text-muted-foreground">
              Send alerts for new login attempts
            </p>
          </div>
          <Switch defaultChecked />
        </div>
      </div>
    </Card>

    <Card className="p-6">
      <h3 className="font-bold mb-4">Recent Security Events</h3>
      <div className="space-y-4">
        {[
          {
            event: "View Work Orders",
            device: "iPhone 15 Pro",
            time: "2 hours ago",
            color: "bg-green-500",
          },
          {
            event: "View Work Orders",
            device: "Unknown IP: 203.0.113.1",
            time: "6 hours ago",
            color: "bg-orange-500",
          },
        ].map((e, i) => (
          <div
            key={i}
            className="flex items-center gap-4 text-sm border-b pb-3 last:border-0">
            <div className={`w-2 h-2 rounded-full ${e.color}`} />
            <div className="flex-1">
              <p className="font-semibold">{e.event}</p>
              <p className="text-xs text-muted-foreground">{e.device}</p>
            </div>
            <span className="text-xs text-slate-400">{e.time}</span>
          </div>
        ))}
      </div>
    </Card>
  </div>
);
export default SecurityTab;
