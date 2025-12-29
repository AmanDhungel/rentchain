"use client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  Search,
  Filter,
  CreditCard,
  Landmark,
  Wallet,
  MoreHorizontal,
  Plus,
  FileText,
  Eye,
  AlertTriangle,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";

const PaymentsDashboard: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  return (
    <div className=" mx-auto p-6 bg-white min-h-screen font-sans">
      <header className="flex items-start gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft size={20} />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Payments & Receipts</h1>
          <p className="text-xs text-slate-500">
            Payment methods and transaction history
          </p>
        </div>
      </header>

      <Tabs defaultValue="transactions" className="w-full">
        <TabsList className="w-full justify-start border-b rounded-none h-12 bg-transparent p-0 mb-6 gap-8">
          <TabsTrigger
            value="transactions"
            className="data-[state=active]:border-orange-500 border-b-2 border-transparent rounded-none px-0 pb-2 bg-transparent shadow-none">
            Transactions
          </TabsTrigger>
          <TabsTrigger
            value="methods"
            className="data-[state=active]:border-orange-500 border-b-2 border-transparent rounded-none px-0 pb-2 bg-transparent shadow-none">
            Payment Methods
          </TabsTrigger>
          <TabsTrigger
            value="failed"
            className="data-[state=active]:border-orange-500 border-b-2 border-transparent rounded-none px-0 pb-2 bg-transparent shadow-none">
            Failed Payments
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Transactions (Design 1) */}
        <TabsContent value="transactions" className="space-y-4">
          <div className="flex gap-2 mb-4">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={16}
              />
              <Input
                placeholder="Search by occupant, tenant..."
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter size={14} /> Filter
            </Button>
          </div>
          <TransactionItem
            title="Rent Payment - Apt 4B"
            amount="-$1,200"
            status="Completed"
            date="1/31/2024"
            method="Visa •••• 4242"
          />
          <TransactionItem
            title="Rent Collection - Room A"
            amount="+$600"
            status="Completed"
            date="1/28/2024"
            method="Bank Transfer"
            isIncome
          />
        </TabsContent>

        {/* Tab 2: Payment Methods (Design 2) */}
        <TabsContent value="methods" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-slate-800">Payment Records</h2>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-orange-500 hover:bg-orange-600">
                  <Plus size={16} className="mr-2" /> Add Method
                </Button>
              </DialogTrigger>
              {/* Add Payment Method Modal (Design 4) */}
              <DialogContent className="sm:max-w-2xl">
                <div className="p-4">
                  <h2 className="text-2xl font-bold mb-1">
                    Add Payment Method
                  </h2>
                  <p className="text-sm text-slate-500 mb-8">
                    Add a new payment method for autopay and manual payments
                  </p>
                  <div className="grid grid-cols-3 gap-4">
                    <MethodOption icon={<CreditCard />} label="Credit Card" />
                    <MethodOption icon={<Landmark />} label="Bank Account" />
                    <MethodOption icon={<Wallet />} label="Digital Wallet" />
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <MethodRow name="Visa ending in 4242" isDefault />
          <MethodRow name="Chase Checking" />

          <Card className="mt-8 border-slate-100 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-bold">
                Autopay Rules
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Auto-pay rent</span>
                <Switch />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Auto-pay utilities</span>
                <Switch defaultChecked />
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-sm font-medium">
                  Days before due date
                </span>
                <Input type="number" defaultValue={1} className="w-20 h-8" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 3: Failed Payments (Design 3) */}
        <TabsContent value="failed">
          <Card className="border-red-500">
            <CardContent className="p-6 flex justify-between items-start">
              <div className="flex gap-4">
                <div className="p-2 bg-red-50 rounded-lg">
                  <AlertTriangle className="text-red-500" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">
                    Failed Payment - Utilities
                  </h4>
                  <p className="text-xs text-slate-500 mb-4">
                    Metro Properties LLC
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" className="bg-red-600 hover:bg-red-700">
                      Retry Payment
                    </Button>
                    <Button size="sm" variant="outline">
                      Update Method
                    </Button>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold">+$85</p>
                <Badge
                  variant="destructive"
                  className="bg-red-100 text-red-600 border-none">
                  Failed
                </Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Helper Components
const TransactionItem = ({
  title,
  amount,
  status,
  date,
  method,
  isIncome = false,
}: any) => (
  <Card className="shadow-none border-slate-100">
    <CardContent className="p-4 flex justify-between items-center">
      <div className="flex gap-3 items-center">
        <div
          className={`p-2 rounded-full ${
            isIncome
              ? "bg-emerald-50 text-emerald-500"
              : "bg-red-50 text-red-500"
          }`}>
          <CreditCard size={18} />
        </div>
        <div>
          <p className="text-sm font-bold">{title}</p>
          <div className="flex gap-4 text-[10px] text-slate-400 font-bold uppercase mt-1">
            <span>Date: {date}</span>
            <span>Method: {method}</span>
          </div>
        </div>
      </div>
      <div className="text-right">
        <p className="font-bold text-sm">{amount}</p>
        <Badge className="bg-emerald-100 text-emerald-600 border-none text-[10px]">
          {status}
        </Badge>
      </div>
    </CardContent>
  </Card>
);

const MethodRow = ({ name, isDefault }: any) => (
  <Card className="shadow-none border-slate-100">
    <CardContent className="p-4 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <CreditCard className="text-slate-400" />
        <div>
          <p className="text-sm font-bold">{name}</p>
          {isDefault && (
            <Badge className="bg-orange-50 text-orange-600 border-none text-[10px] h-5">
              Default
            </Badge>
          )}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-slate-400">
            Enable Autopay
          </span>
          <Switch defaultChecked={isDefault} />
        </div>
        <Button variant="ghost" size="icon">
          <MoreHorizontal size={18} />
        </Button>
      </div>
    </CardContent>
  </Card>
);

const MethodOption = ({ icon, label }: any) => (
  <div className="flex flex-col items-center justify-center p-8 border rounded-xl hover:border-orange-500 hover:bg-orange-50 cursor-pointer group transition-all">
    <div className="mb-3 text-slate-600 group-hover:text-orange-600">
      {icon}
    </div>
    <span className="font-bold text-sm text-slate-700">{label}</span>
  </div>
);

export default PaymentsDashboard;
