"use client";
import {
  ArrowLeft,
  Search,
  Eye,
  FileText,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ApplyDepositDialog from "./ApplyDepositDialog";
import { useRouter } from "next/navigation";

const DepositsDashboard: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="mx-auto p-6  min-h-screen font-sans">
      <header className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft size={20} />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Deposits Management
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Security deposits held and collected
          </p>
        </div>
      </header>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard title="Deposits Held" value="$3,600" />
        <StatCard title="Incoming Total" value="$5,400" />
        <StatCard title="Outgoing Total" value="$3,100" />
      </div>

      <Tabs defaultValue="held-by-lessor" className="w-full">
        <TabsList className="w-full justify-start data-[state=active]:border-b-2 data-[state=active]:border-b-orange-500 bg-transparent h-12 p-0 mb-6 gap-8">
          <TabsTrigger
            value="held-by-lessor"
            className="tab-style data-[state=active]:border-b-2 data-[state=active]:border-b-orange-500 rounded-none shadow-none">
            Deposits Held by Lessor
          </TabsTrigger>
          <TabsTrigger
            value="from-subtenants"
            className="tab-style data-[state=active]:border-b-2 data-[state=active]:border-b-orange-500 rounded-none">
            Deposits from Sub-tenants
          </TabsTrigger>
        </TabsList>

        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={16}
            />
            <Input
              placeholder="Search deposits..."
              className="pl-10 bg-white"
            />
          </div>
          <Button variant="outline" className="bg-white">
            All Status
          </Button>
        </div>

        {/* Tab 1: Deposits Held by Lessor (image_c83f0a.png) */}
        <TabsContent value="held-by-lessor" className="space-y-4">
          <DepositRecord
            id="DEP-IN-001"
            property="Apt 4B - Skyline Towers"
            date="1/15/2024"
            amount="$2,400"
            status="Held"
            interest="2.5% APY(+$12.50 earned)"
            onApply={() => setIsDialogOpen(true)}
          />
        </TabsContent>

        {/* Tab 2: Deposits from Sub-tenants (image_c83f2f.png) */}
        <TabsContent value="from-subtenants" className="space-y-4">
          <DepositRecord
            id="DEP-OUT-001"
            name="John Smith"
            property="3B-Room-A"
            date="1/15/2024"
            amount="$2,400"
            status="Held"
            onApply={() => setIsDialogOpen(true)}
          />
        </TabsContent>
      </Tabs>

      {/* Apply Deposit Form Dialog */}
      <ApplyDepositDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </div>
  );
};

const StatCard = ({ title, value }: { title: string; value: string }) => (
  <Card className="border-none shadow-sm">
    <CardContent className="p-6 text-center">
      <p className="text-3xl font-bold text-slate-800 mb-1">{value}</p>
      <p className="text-xs font-bold text-slate-400 uppercase tracking-tight">
        {title}
      </p>
    </CardContent>
  </Card>
);

const DepositRecord = ({
  id,
  property,
  date,
  amount,
  status,
  interest,
  name,
  onApply,
}: any) => (
  <Card className="border-slate-200 shadow-none overflow-hidden">
    <CardContent className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-sm font-bold text-slate-800 mb-1">{id}</h3>
          {name && <p className="text-xs text-slate-500 mb-2">{name}</p>}
          <div className="space-y-1">
            <p className="text-xs text-slate-600">
              <span className="font-bold">Property:</span> {property}
            </p>
            <p className="text-xs text-slate-600">
              <span className="font-bold">Date:</span> {date}
            </p>
            {interest && (
              <p className="text-xs text-slate-600">
                <span className="font-bold">Interest Rate:</span> {interest}
              </p>
            )}
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-slate-800">{amount}</p>
          <Badge className="bg-blue-50 text-blue-600 border-none text-[10px] uppercase font-bold px-2 py-0">
            {status}
          </Badge>
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="h-9 gap-2 text-xs font-bold">
          <Eye size={14} /> View Details
        </Button>
        <Button
          size="sm"
          className="h-9 bg-orange-500 hover:bg-orange-600 text-xs font-bold"
          onClick={onApply}>
          Apply to Damages
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="h-9 gap-2 text-xs font-bold">
          <FileText size={14} /> Report
        </Button>
      </div>
    </CardContent>
  </Card>
);

export default DepositsDashboard;
