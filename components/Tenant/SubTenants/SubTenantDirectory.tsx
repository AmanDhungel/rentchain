import {
  DollarSign,
  ShieldCheck,
  AlertCircle,
  TrendingUp,
  UserPlus,
  Send,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button, Card } from "@/components/ui";
import { SubTenantCard } from "./SubTenantDirectoryCard";
import CreateSubTenantForm from "./AddSubTenant";
export type PaymentHistory = "Excellent" | "Good" | "Fair" | "Poor";
export type KYCStatus = "verified" | "pending" | "incomplete";

export interface SubTenant {
  id: string;
  name: string;
  avatar?: string;
  room: string;
  rating: number;
  isSigned: boolean;
  kycStatus: KYCStatus;
  monthlyRent: number;
  outstanding: number;
  paymentHistory: PaymentHistory;
  latestNote?: string;
  hasIssues?: boolean;
}

const SUB_TENANT_DATA: SubTenant[] = [
  {
    id: "1",
    name: "John Smith",
    room: "3B-Room-A",
    rating: 4.8,
    isSigned: true,
    kycStatus: "verified",
    monthlyRent: 600,
    outstanding: 0,
    paymentHistory: "Excellent",
    latestNote: "Excellent tenant",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    room: "3B-Room-B",
    rating: 4.2,
    isSigned: true,
    kycStatus: "verified",
    monthlyRent: 550,
    outstanding: 275,
    paymentHistory: "Good",
    latestNote: "Generally good tenant",
  },
  {
    id: "3",
    name: "Mike Chen",
    room: "3B-Living-Space",
    rating: 4.5,
    isSigned: true,
    kycStatus: "pending",
    monthlyRent: 350,
    outstanding: 0,
    paymentHistory: "Good",
    latestNote: "KYC verification in progress",
    hasIssues: false,
  },
  {
    id: "4",
    name: "Emma Davis",
    room: "3B-Room-C",
    rating: 0,
    isSigned: false,
    kycStatus: "incomplete",
    monthlyRent: 600,
    outstanding: 1200,
    paymentHistory: "Fair",
    latestNote: "New tenant",
    hasIssues: true,
  },
];

export default function SubTenantsDirectory() {
  const stats = [
    {
      label: "Monthly Rent",
      value: "$2100",
      icon: <DollarSign className="text-green-500" />,
      color: "green",
    },
    {
      label: "Verified KYC",
      value: "2/4",
      icon: <ShieldCheck className="text-blue-500" />,
      color: "blue",
    },
    {
      label: "Outstanding",
      value: "$1475",
      icon: <AlertCircle className="text-red-500" />,
      color: "red",
    },
    {
      label: "Avg Rating",
      value: "4.5",
      icon: <TrendingUp className="text-amber-500" />,
      color: "amber",
    },
  ];

  return (
    <div className=" mx-auto p-8  min-h-screen">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Sub-Tenants Directory
          </h1>
          <p className="text-sm text-slate-500">
            Manage sub-tenant relationships
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2 h-10 px-4 font-medium">
            <Send className="w-4 h-4" /> Invite
          </Button>
          <CreateSubTenantForm />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <Card key={i} className="p-5 shadow-sm border-slate-100">
            <div className="flex gap-4 items-start">
              <div className="p-2 bg-slate-50 rounded-lg">{stat.icon}</div>
              <div>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold text-slate-800">
                  {stat.value}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="all-sub-tenants" className="w-full">
        <TabsList className="bg-transparent border-b w-full justify-start rounded-none h-auto p-0 mb-6 gap-12">
          {["All Sub-tenants", "Verified", "Pending", "Issues"].map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab.toLowerCase().replace(" ", "-")}
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-orange-500 data-[state=active]:bg-transparent px-0 pb-3 text-sm font-medium">
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all-sub-tenants" className="space-y-4">
          {SUB_TENANT_DATA.map((t) => (
            <SubTenantCard key={t.id} tenant={t} />
          ))}
        </TabsContent>

        <TabsContent value="verified" className="space-y-4">
          {SUB_TENANT_DATA.filter((t) => t.kycStatus === "verified").map(
            (t) => (
              <SubTenantCard key={t.id} tenant={t} />
            )
          )}
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          {SUB_TENANT_DATA.filter(
            (t) => t.kycStatus === "pending" || t.kycStatus === "incomplete"
          ).map((t) => (
            <SubTenantCard key={t.id} tenant={t} />
          ))}
        </TabsContent>

        <TabsContent value="issues" className="space-y-4">
          {SUB_TENANT_DATA.filter(
            (t) => t.hasIssues || t.outstanding > 500
          ).map((t) => (
            <SubTenantCard key={t.id} tenant={t} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
