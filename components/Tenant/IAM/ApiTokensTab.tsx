import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreateTokenDialog } from "./CreateTokenDialog";

const ApiTokensTab = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-lg font-semibold">API Tokens</h2>
        <p className="text-sm text-muted-foreground">
          Manage API tokens for integrations
        </p>
      </div>
      <CreateTokenDialog />
    </div>

    <div className="grid grid-cols-4 gap-4 mb-6">
      {/* Small stats cards like 'Total Tokens: 4' would go here */}
    </div>

    <Card className="p-6 space-y-4">
      <div className="flex justify-between items-start">
        <div className="flex gap-4">
          <div className="p-2 bg-orange-50 rounded text-orange-500">🔑</div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">Mobile App Integration</h3>
              <Badge className="bg-green-500">Active</Badge>
              <Badge
                variant="outline"
                className="text-orange-500 border-orange-500">
                Expires Soon
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Token for RentChain mobile application
            </p>
            <div className="flex gap-2 mt-2">
              {["Properties:Read", "Tenants:Read"].map((s) => (
                <Badge key={s} variant="secondary">
                  {s}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            View
          </Button>
          <Button variant="outline" size="sm">
            Regenerate
          </Button>
          <Button variant="outline" size="sm" className="text-red-500">
            Revoke
          </Button>
        </div>
      </div>
    </Card>
  </div>
);
export default ApiTokensTab;
