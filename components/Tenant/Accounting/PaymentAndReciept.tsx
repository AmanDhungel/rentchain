"use client";
import {
  ArrowLeft,
  Search,
  Filter,
  CreditCard,
  Wallet,
  Landmark,
  MoreHorizontal,
  Plus,
  FileText,
  Eye,
  AlertTriangle,
  ShieldCheck,
  X,
} from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";

type TransactionStatus = "Completed" | "Failed";

interface Transaction {
  id: string;
  title: string;
  entity: string;
  date: string;
  method: string;
  amount: string;
  status: TransactionStatus;
  type: "payment" | "collection" | "refund";
}

interface PaymentMethod {
  id: string;
  name: string;
  lastFour?: string;
  isDefault?: boolean;
  type: "card" | "bank" | "paypal";
}

// --- Main Page Component ---

const PaymentsPage: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  return (
    <div className=" mx-auto p-6 bg-white min-h-screen font-sans">
      {/* Header */}
      <header className="flex items-start gap-4 mb-8">
        <Button
          variant="ghost"
          size="icon"
          className="mt-1"
          onClick={() => router.back()}>
          <ArrowLeft size={20} />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Payments & Receipts
          </h1>
          <p className="text-sm text-slate-500 font-medium">
            Payment methods and transaction history
          </p>
        </div>
      </header>

      <Tabs defaultValue="transactions" className="w-full">
        <TabsList className="w-full justify-start bg-transparent border-b rounded-none h-12 p-0 mb-6 gap-8">
          <TabsTrigger value="transactions" className="tab-style">
            Transactions
          </TabsTrigger>
          <TabsTrigger value="methods" className="tab-style">
            Payment Methods
          </TabsTrigger>
          <TabsTrigger value="failed" className="tab-style">
            Failed Payments
          </TabsTrigger>
        </TabsList>

        {/* --- Tab 1: Transactions --- */}
        <TabsContent value="transactions" className="space-y-4">
          <div className="flex gap-2 mb-6">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={16}
              />
              <Input
                placeholder="Search by occupant, tenant, or property name..."
                className="pl-10 border-slate-200"
              />
            </div>
            <Button
              variant="outline"
              className="gap-2 border-slate-200 text-slate-600">
              Filter <Filter size={14} />
            </Button>
          </div>

          <TransactionRow
            title="Rent Payment - Apt 4B"
            subtitle="Metro Properties LLC"
            date="1/31/2024"
            method="Visa •••• 4242"
            amount="-$1200"
            status="Completed"
            icon={<CreditCard className="text-red-500" />}
          />
          <TransactionRow
            title="Rent Collection - Room A"
            subtitle="John Smith"
            date="1/28/2024"
            method="Bank Transfer"
            amount="+$600"
            status="Completed"
            icon={<Landmark className="text-emerald-500" />}
          />
          <TransactionRow
            title="Failed Payment - Utilities"
            subtitle="Metro Properties LLC"
            date="1/20/2024"
            method="Visa •••• 4242"
            amount="+$85"
            status="Failed"
            icon={<AlertTriangle className="text-red-500" />}
          />
        </TabsContent>

        {/* --- Tab 2: Payment Methods --- */}
        <TabsContent value="methods" className="space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-slate-800">
              Payment Records
            </h2>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white gap-2 rounded-lg">
                  <Plus size={16} /> Add Method
                </Button>
              </DialogTrigger>
              <AddMethodDialog onClose={() => setIsDialogOpen(false)} />
            </Dialog>
          </div>

          <div className="space-y-3">
            <MethodCard name="Visa ending in 4242" isDefault type="card" />
            <MethodCard name="Chase Checking" type="bank" />
            <MethodCard name="PayPal Account" type="paypal" />
          </div>

          <Card className="mt-8 border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-bold text-slate-800">
                Autopay Rules
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-600">
                  Auto-pay rent
                </span>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-600">
                  Auto-pay utilities
                </span>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="text-sm font-semibold text-slate-600">
                  Days before due date
                </span>
                <Input
                  type="number"
                  defaultValue={1}
                  className="w-20 bg-slate-50 border-none h-8 text-center"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* --- Tab 3: Failed Payments --- */}
        <TabsContent value="failed">
          <Card className="border-red-500 bg-white">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex gap-4">
                  <div className="p-2 bg-red-50 rounded-lg">
                    <AlertTriangle className="text-red-500" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">
                      Failed Payment - Utilities
                    </h4>
                    <p className="text-xs text-slate-500 font-medium">
                      Metro Properties LLC
                    </p>
                    <div className="flex gap-2 mt-4">
                      <Button
                        size="sm"
                        className="bg-red-600 hover:bg-red-700 text-white font-bold">
                        Retry Payment
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-slate-200 text-slate-600">
                        Update Method
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-800">+$85</p>
                  <Badge className="bg-red-100 text-red-600 border-none mt-1">
                    Failed
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// --- Sub-Components ---

const TransactionRow: React.FC<{
  title: string;
  subtitle: string;
  date: string;
  method: string;
  amount: string;
  status: TransactionStatus;
  icon: React.ReactNode;
}> = ({ title, subtitle, date, method, amount, status, icon }) => (
  <Card className="border-slate-200 shadow-none hover:shadow-sm transition-shadow">
    <CardContent className="p-6 flex justify-between items-start">
      <div className="space-y-4">
        <div className="flex gap-3 items-center">
          {icon}
          <div>
            <h4 className="font-bold text-slate-800 text-[15px]">{title}</h4>
            <p className="text-xs text-slate-400 font-semibold">{subtitle}</p>
          </div>
        </div>
        <div className="flex gap-12 ml-8 text-[11px] font-bold text-slate-400">
          <p>• Date: {date}</p>
          <p>• Method: {method}</p>
        </div>
        <div className="flex gap-2 ml-8">
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-[11px] gap-1 font-bold border-slate-200">
            <FileText size={12} /> Receipt
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-[11px] gap-1 font-bold border-slate-200">
            <Eye size={12} /> View Details
          </Button>
        </div>
      </div>
      <div className="text-right">
        <p className="font-bold text-slate-800 text-sm mb-1">{amount}</p>
        <Badge
          className={`border-none ${
            status === "Completed"
              ? "bg-emerald-100 text-emerald-600"
              : "bg-red-100 text-red-600"
          }`}>
          {status}
        </Badge>
      </div>
    </CardContent>
  </Card>
);

const MethodCard: React.FC<{
  name: string;
  isDefault?: boolean;
  type: string;
}> = ({ name, isDefault, type }) => (
  <Card className="border-slate-200 shadow-none">
    <CardContent className="p-4 flex items-center justify-between">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          {type === "card" ? (
            <CreditCard size={18} className="text-slate-400" />
          ) : type === "bank" ? (
            <Landmark size={18} className="text-slate-400" />
          ) : (
            <Wallet size={18} className="text-slate-400" />
          )}
          <h4 className="font-bold text-slate-800 text-sm">{name}</h4>
        </div>
        {isDefault && (
          <Badge className="bg-orange-50 text-orange-600 border-none text-[10px] h-5">
            Default
          </Badge>
        )}
        <div className="flex items-center gap-2 pt-1">
          <span className="text-[10px] font-bold text-slate-500">
            Enable Autopay
          </span>
          <Switch className="scale-75" defaultChecked={isDefault} />
        </div>
      </div>
      <Button variant="ghost" size="icon">
        <MoreHorizontal size={20} className="text-slate-400" />
      </Button>
    </CardContent>
  </Card>
);

const AddMethodDialog: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <DialogContent className="sm:max-w-3xl border-none shadow-2xl p-0 overflow-hidden rounded-xl">
      <div className="p-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Add Payment Method
            </h2>
            <p className="text-sm text-slate-500 font-medium mt-1">
              Add a new payment method for autopay and manual payments
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X size={20} />
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="flex flex-col items-center justify-center p-6 border rounded-xl hover:border-blue-500 cursor-pointer group transition-all">
            <CreditCard className="mb-2 text-slate-800" />
            <span className="font-bold text-slate-800">Credit Card</span>
          </div>
          <div className="flex flex-col items-center justify-center p-6 border rounded-xl hover:border-blue-500 cursor-pointer group transition-all">
            <Landmark className="mb-2 text-slate-800" />
            <span className="font-bold text-slate-800">Bank Account</span>
          </div>
          <div className="flex flex-col items-center justify-center p-6 border rounded-xl hover:border-blue-500 cursor-pointer group transition-all">
            <Wallet className="mb-2 text-slate-800" />
            <span className="font-bold text-slate-800">Digital Wallet</span>
          </div>
        </div>
      </div>
    </DialogContent>
  );
};

export default PaymentsPage;
