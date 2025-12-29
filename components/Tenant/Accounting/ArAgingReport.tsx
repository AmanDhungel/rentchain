"use client";
import React, { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Search,
  Filter,
  ArrowLeft,
  Mail,
  MessageSquare,
  Calendar,
  DollarSign,
  Clock,
  AlertCircle,
  Send,
  SendHorizontal,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

// --- Types & Mock Data ---

interface TenantAging {
  id: string;
  name: string;
  unit: string;
  totalBalance: number;
  risk: "Low" | "High";
  aging: { current: number; d30: number; d60: number; d90: number };
  status: "Healthy" | "Promise to Pay" | "Overdue";
}

interface dataProps {
  amount: string;
  label: string;
  range: string;
  count: number;
  color: string;
}

const data: dataProps[] = [
  {
    amount: "$1,200",
    label: "Current",
    range: "0-30 days",
    count: 2,
    color: "bg-green-100 text-green-700",
  },
  {
    amount: "$800",
    label: "31-60 Days",
    range: "31-60 days",
    count: 1,
    color: "bg-purple-100 text-purple-700",
  },
  {
    amount: "$550",
    label: "61-90 Days",
    range: "61-90 days",
    count: 1,
    color: "bg-orange-100 text-orange-700",
  },
  {
    amount: "$420",
    label: "90+ Days",
    range: "90+ days",
    count: 1,
    color: "bg-red-100 text-red-700",
  },
];

const MOCK_DATA: TenantAging[] = [
  {
    id: "1",
    name: "Emma Davis",
    unit: "Apt 4B",
    totalBalance: 1200,
    risk: "Low",
    status: "Healthy",
    aging: { current: 1200, d30: 0, d60: 0, d90: 0 },
  },
  {
    id: "2",
    name: "James Wilson",
    unit: "Room A",
    totalBalance: 850,
    risk: "High",
    status: "Overdue",
    aging: { current: 0, d30: 500, d60: 350, d90: 0 },
  },
  {
    id: "3",
    name: "Sarah Miller",
    unit: "Apt 2C",
    totalBalance: 920,
    risk: "Low",
    status: "Promise to Pay",
    aging: { current: 400, d30: 520, d60: 0, d90: 0 },
  },
];

// --- Validation Schemas ---

const remindSchema = z.object({
  message: z.string().min(5, "Message must be at least 5 characters"),
});

const promiseSchema = z.object({
  amount: z.coerce.number().min(1, "Amount is required"),
  date: z.string().min(1, "Date is required"),
  notes: z.string().optional(),
});

// --- Main Component ---

const ARAgingDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedTenant, setSelectedTenant] = useState<TenantAging | null>(
    null
  );
  const [dialogMode, setDialogMode] = useState<"remind" | "promise" | null>(
    null
  );
  const router = useRouter();

  // Filter Logic
  const filteredTenants = useMemo(() => {
    return MOCK_DATA.filter((tenant) => {
      const matchesSearch =
        tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tenant.unit.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || tenant.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  return (
    <div className="p-8 pl-0 min-h-screen font-sans">
      <header className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft />
        </Button>
        <div className="flex justify-between w-full">
          <div>
            <h1 className="text-2xl font-bold">AR Aging Report</h1>
            <p className="text-sm text-slate-500">
              Accounts Receivable and Collection Tracking
            </p>
          </div>

          <Button className="bg-orange-500 ">
            <SendHorizontal />
            Bluk Reminder
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6 ">
        {data.map((item, index) => (
          <Card key={index} className="border-gray-200 shadow-sm">
            <CardContent className="flex flex-col items-center justify-center pt-6 pb-8 space-y-2">
              <div
                className={cn(
                  "px-2.5 py-0.5 rounded text-xs font-bold mb-1",
                  item.color
                )}>
                {item.count}
              </div>

              <h2 className="text-3xl font-bold text-slate-800">
                {item.amount}
              </h2>

              <div className="text-center">
                <p className="text-sm font-medium text-slate-500">
                  {item.label}
                </p>
                <p className="text-xs text-slate-400">{item.range}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="border-none shadow-sm">
          <CardContent className="p-6">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Total Receivables
            </p>
            <h2 className="text-3xl font-bold">$2,970</h2>
            <div className="flex gap-2 mt-4">
              <h2>Across 4 Accounts</h2>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm col-span-1">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <p className="text-xs font-bold text-slate-400 uppercase">
                Collection Health
              </p>
              <Badge className="bg-emerald-100 text-emerald-600 border-none">
                On Track
              </Badge>
            </div>
            <h3 className="text-xl font-bold mb-2">40% of Current Goal</h3>
            <Progress value={80} className="h-2 bg-slate-100" />
            <div className="flex justify-between items-center">
              <p className="text-xs text-slate-500 mt-2 font-medium">
                Good collection Rate
              </p>
              <p className="text-xs text-end items-start text-slate-500 mt-2 font-medium">
                Target: 80%
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section: Tenant List (Design 2) */}
      <Card className="border-none shadow-sm overflow-hidden">
        <CardHeader className="border-b bg-white flex flex-row items-center justify-between space-y-0 py-4">
          <div className="flex gap-4 flex-1">
            <div className="relative max-w-sm w-full">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={16}
              />
              <Input
                placeholder="Search tenant or unit..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select onValueChange={setStatusFilter} defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Healthy">Healthy</SelectItem>
                <SelectItem value="Overdue">Overdue</SelectItem>
                <SelectItem value="Promise to Pay">Promise to Pay</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="p-0 bg-white">
          {filteredTenants.map((tenant) => (
            <div
              key={tenant.id}
              className="border-b last:border-0 p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-6 w-1/3">
                <div
                  className={`p-3 rounded-full ${
                    tenant.risk === "High"
                      ? "bg-red-50 text-red-500"
                      : "bg-blue-50 text-blue-500"
                  }`}>
                  <AlertCircle size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">{tenant.name}</h4>
                  <p className="text-xs text-slate-500 font-medium">
                    {tenant.unit}
                  </p>
                  <Badge
                    variant="outline"
                    className={`mt-2 text-[10px] uppercase font-bold border-none px-2 py-0 ${
                      tenant.status === "Overdue"
                        ? "bg-red-100 text-red-600"
                        : tenant.status === "Promise to Pay"
                        ? "bg-orange-100 text-orange-600"
                        : "bg-emerald-100 text-emerald-600"
                    }`}>
                    {tenant.status}
                  </Badge>
                </div>
              </div>

              <div className="flex-1 grid grid-cols-4 gap-4 px-8 border-x border-slate-100">
                <AgingMiniBlock label="Current" amount={tenant.aging.current} />
                <AgingMiniBlock label="31-60" amount={tenant.aging.d30} />
                <AgingMiniBlock label="61-90" amount={tenant.aging.d60} />
                <AgingMiniBlock label="90+" amount={tenant.aging.d90} />
              </div>

              <div className="w-1/4 text-right pl-8 space-y-2">
                <p className="text-lg font-bold text-slate-800">
                  ${tenant.totalBalance}
                </p>
                <div className="flex gap-2 justify-end">
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 font-bold border-slate-200 text-slate-600"
                    onClick={() => {
                      setSelectedTenant(tenant);
                      setDialogMode("remind");
                    }}>
                    Remind
                  </Button>
                  <Button
                    size="sm"
                    className="h-8 font-bold bg-orange-500 hover:bg-orange-600"
                    onClick={() => {
                      setSelectedTenant(tenant);
                      setDialogMode("promise");
                    }}>
                    Promise
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Modals */}
      <RemindDialog
        tenant={selectedTenant}
        isOpen={dialogMode === "remind"}
        onClose={() => setDialogMode(null)}
      />
      <PromiseDialog
        tenant={selectedTenant}
        isOpen={dialogMode === "promise"}
        onClose={() => setDialogMode(null)}
      />
    </div>
  );
};

// --- Sub-Components ---

const AgingMiniBlock = ({
  label,
  amount,
}: {
  label: string;
  amount: number;
}) => (
  <div className="text-center">
    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">
      {label}
    </p>
    <p
      className={`text-sm font-bold ${
        amount > 0 ? "text-slate-800" : "text-slate-200"
      }`}>
      ${amount}
    </p>
  </div>
);

// Design 3: Remind Dialog
const RemindDialog = ({ tenant, isOpen, onClose }: any) => {
  const form = useForm({ resolver: zodResolver(remindSchema) });
  if (!tenant) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] p-8">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-2xl font-bold">
            Send Reminder
          </DialogTitle>
          <p className="text-sm text-slate-500 font-medium">
            To: {tenant.name} ({tenant.unit})
          </p>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-6">
            <FormField
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-bold">
                    Custom Message
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="bg-slate-50 border-none min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-3">
              <Button className="bg-orange-500 hover:bg-orange-600 font-bold gap-2 h-12">
                <Mail size={18} /> Send Email
              </Button>
              <Button
                variant="outline"
                className="border-slate-200 text-slate-600 font-bold gap-2 h-12">
                <MessageSquare size={18} /> Send SMS
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

// Design 4: Promise to Pay Dialog
const PromiseDialog = ({ tenant, isOpen, onClose }: any) => {
  const form = useForm({
    resolver: zodResolver(promiseSchema),
    defaultValues: { amount: 0, date: "" },
  });
  if (!tenant) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] p-8">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-2xl font-bold">
            Promise to Pay
          </DialogTitle>
          <p className="text-sm text-slate-500 font-medium">
            Record payment commitment for {tenant.name}
          </p>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-bold uppercase text-slate-500">
                      Promised Amount
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <DollarSign
                          className="absolute left-3 top-3 text-slate-400"
                          size={16}
                        />
                        <Input
                          type="number"
                          className="pl-8 bg-slate-50 border-none"
                          {...field}
                        />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-bold uppercase text-slate-500">
                      Expected Date
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Calendar
                          className="absolute left-3 top-3 text-slate-400"
                          size={16}
                        />
                        <Input
                          type="date"
                          className="pl-8 bg-slate-50 border-none"
                          {...field}
                        />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold uppercase text-slate-500">
                    Notes
                  </FormLabel>
                  <FormControl>
                    <Textarea className="bg-slate-50 border-none" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-3">
              <Button className="bg-orange-500 hover:bg-orange-600 font-bold h-12">
                Confirm Promise
              </Button>
              <Button
                variant="outline"
                onClick={onClose}
                className="border-slate-200 text-slate-600 font-bold h-12">
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ARAgingDashboard;
