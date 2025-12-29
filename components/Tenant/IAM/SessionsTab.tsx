import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Laptop, Smartphone, Tablet } from "lucide-react";

const SessionsTab = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-xl font-bold">Active Sessions</h2>
        <p className="text-sm text-muted-foreground">
          Monitor and manage all active user sessions across devices
        </p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline">Refresh</Button>
        <Button variant="outline" className="text-red-500">
          Terminate All
        </Button>
      </div>
    </div>

    {/* Session Stats */}
    <div className="grid grid-cols-4 gap-4">
      <Card className="p-4">
        <p className="text-xs text-muted-foreground">Total Sessions</p>
        <p className="text-2xl font-bold">3</p>
      </Card>
      <Card className="p-4">
        <p className="text-xs text-muted-foreground text-green-600">
          Active Now
        </p>
        <p className="text-2xl font-bold">2</p>
      </Card>
      <Card className="p-4">
        <p className="text-xs text-muted-foreground text-red-500">Expired</p>
        <p className="text-2xl font-bold">1</p>
      </Card>
      <Card className="p-4">
        <p className="text-xs text-muted-foreground">Unique Devices</p>
        <p className="text-2xl font-bold">3</p>
      </Card>
    </div>

    {/* Device List */}
    <Card className="p-5 border-orange-200 bg-orange-50/20">
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <div className="p-3 bg-orange-100 rounded-lg text-orange-600">
            <Laptop />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold">Chrome on MacBook Pro</span>
              <Badge variant="secondary">Current Session</Badge>
              <Badge className="bg-green-500 text-[10px]">Active</Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              192.168.1.100 • New York, NY
            </p>
            <p className="text-[10px] text-slate-400 mt-1">
              Login: 1/29/2025, 3:15:00 PM
            </p>
          </div>
        </div>
        <Button variant="outline" size="sm">
          View Details
        </Button>
      </div>
    </Card>

    <Card className="p-5">
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <div className="p-3 bg-slate-100 rounded-lg text-slate-600">
            <Smartphone />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold">iPhone 15 Pro</span>
              <Badge className="bg-green-500 text-[10px]">Active</Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              10.0.1.45 • New York, NY
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            View Details
          </Button>
          <Button variant="outline" size="sm" className="text-red-500">
            Terminate
          </Button>
        </div>
      </div>
    </Card>
  </div>
);
export default SessionsTab;
