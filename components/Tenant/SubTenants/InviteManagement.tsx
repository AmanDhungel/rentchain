import { ArrowLeft, Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button, Card } from "@/components/ui";
import { InviteCard } from "./InviteCard";
export type InviteStatus = "sent" | "viewed" | "accepted" | "expired";

export interface Invite {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  status: InviteStatus;
  method: "Email" | "SMS" | "Link";
  location: string;
  price: string;
  sentDate: string;
  viewedDate?: string;
  respondedDate?: string;
  expiryDate: string;
  progress?: number;
  statusMessage?: string;
}

const MOCK_DATA: Invite[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@email.com",
    status: "accepted",
    method: "Email",
    location: "3B-Room-A",
    price: "$600/month",
    sentDate: "1/10/2024",
    viewedDate: "1/11/2024",
    respondedDate: "1/12/2024",
    expiryDate: "1/24/2024",
    progress: 100,
  },
  {
    id: "2",
    name: "Mike Chen",
    email: "mike.chen@email.com",
    status: "accepted",
    method: "Link",
    location: "3B-Living-Space",
    price: "$350/month",
    sentDate: "1/10/2024",
    viewedDate: "1/11/2024",
    respondedDate: "1/12/2024",
    expiryDate: "1/24/2024",
    progress: 75,
    statusMessage: "KYC verification in progress",
  },
  {
    id: "3",
    name: "Emma Davis",
    email: "emma.davis@email.com",
    status: "viewed",
    method: "SMS",
    location: "3B-Room-C",
    price: "$600/month",
    sentDate: "1/10/2024",
    viewedDate: "1/11/2024",
    expiryDate: "1/24/2024",
    statusMessage: "Interested but reviewing terms",
  },
  {
    id: "4",
    name: "Alex Thompson",
    email: "alex.thompson@email.com",
    status: "sent",
    method: "Email",
    location: "3B-Storage-Space",
    price: "$200/month",
    sentDate: "1/10/2024",
    expiryDate: "1/24/2024",
  },
];

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed rounded-xl border-slate-100 bg-slate-50/30">
      <p className="text-slate-400 text-sm">{message}</p>
    </div>
  );
}

export default function InviteManagement() {
  return (
    <div className=" mx-auto p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <div className="p-2 border rounded-lg cursor-pointer hover:bg-slate-50">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">
              Invite Management
            </h1>
            <p className="text-xs text-slate-500">
              Track invitation status & onboarding
            </p>
          </div>
        </div>
        <Button className="bg-orange-500 hover:bg-orange-600 text-white gap-2 h-9 px-4">
          <Plus className="w-4 h-4" /> New Invite
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Sent", value: "8", color: "blue" },
          { label: "Pending", value: "3", color: "orange" },
          { label: "Accepted", value: "4", color: "green" },
          { label: "Success Rate", value: "50%", color: "purple" },
        ].map((stat, i) => (
          <Card key={i} className="p-4 shadow-sm">
            <p className="text-xs text-slate-500 mb-1">{stat.label}</p>
            <p className="text-2xl font-bold">{stat.value}</p>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="all-invites" className="w-full">
        <TabsList className="bg-transparent border-b w-full justify-start rounded-none h-11 p-0 gap-8">
          {["All Invites", "Sent", "Viewed", "Accepted", "Expired"].map(
            (tab) => (
              <TabsTrigger
                key={tab}
                value={tab.toLowerCase().replace(" ", "-")}
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-orange-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 text-sm h-11">
                {tab}
              </TabsTrigger>
            )
          )}
        </TabsList>

        <TabsContent value="all-invites" className="mt-6">
          {MOCK_DATA.map((invite) => (
            <InviteCard key={invite.id} invite={invite} />
          ))}
        </TabsContent>

        <TabsContent value="sent" className="mt-6">
          {MOCK_DATA.filter((i) => i.status === "sent").map((invite) => (
            <InviteCard key={invite.id} invite={invite} />
          ))}
        </TabsContent>

        <TabsContent value="all" className="mt-6 space-y-4">
          {MOCK_DATA.length > 0 ? (
            MOCK_DATA.map((invite) => (
              <InviteCard key={invite.id} invite={invite} />
            ))
          ) : (
            <EmptyState message="No invites found" />
          )}
        </TabsContent>

        {/* Sent Tab */}
        <TabsContent value="sent" className="mt-6 space-y-4">
          {MOCK_DATA.filter((i) => i.status === "sent").length > 0 ? (
            MOCK_DATA.filter((i) => i.status === "sent").map((invite) => (
              <InviteCard key={invite.id} invite={invite} />
            ))
          ) : (
            <EmptyState message="No sent invites" />
          )}
        </TabsContent>

        {/* Viewed Tab */}
        <TabsContent value="viewed" className="mt-6 space-y-4">
          {MOCK_DATA.filter((i) => i.status === "viewed").length > 0 ? (
            MOCK_DATA.filter((i) => i.status === "viewed").map((invite) => (
              <InviteCard key={invite.id} invite={invite} />
            ))
          ) : (
            <EmptyState message="No viewed invites" />
          )}
        </TabsContent>

        {/* Accepted Tab */}
        <TabsContent value="accepted" className="mt-6 space-y-4">
          {MOCK_DATA.filter((i) => i.status === "accepted").length > 0 ? (
            MOCK_DATA.filter((i) => i.status === "accepted").map((invite) => (
              <InviteCard key={invite.id} invite={invite} />
            ))
          ) : (
            <EmptyState message="No accepted invites yet" />
          )}
        </TabsContent>

        {/* Expired Tab */}
        <TabsContent value="expired" className="mt-6 space-y-4">
          {MOCK_DATA.filter((i) => i.status === "expired").length > 0 ? (
            MOCK_DATA.filter((i) => i.status === "expired").map((invite) => (
              <InviteCard key={invite.id} invite={invite} />
            ))
          ) : (
            <EmptyState message="No expired invites" />
          )}
        </TabsContent>

        {/* Additional TabsContent filters would go here */}
      </Tabs>
    </div>
  );
}
