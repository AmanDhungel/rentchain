"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Search,
  Filter,
  CreditCard,
  Download,
  MessageSquare,
  Send,
  X,
  Zap,
  Droplets,
} from "lucide-react";
import { useRouter } from "next/navigation";

// --- Interfaces ---

interface Invoice {
  id: string;
  property: string;
  period: string;
  dueDate: string;
  amount: number;
  status: "Pending" | "Paid" | "Overdue";
  lateFee?: number;
}

const InvoicesLessee: React.FC = () => {
  const router = useRouter();
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const invoices: Invoice[] = [
    {
      id: "INV-2024-001",
      property: "Metro Properties LLC",
      period: "February 2024",
      dueDate: "2/1/2024",
      amount: 1350,
      status: "Pending",
    },
    {
      id: "INV-2024-002",
      property: "Metro Properties LLC",
      period: "January 2024",
      dueDate: "1/1/2024",
      amount: 1320,
      status: "Paid",
    },
    {
      id: "INV-2023-012",
      property: "Metro Properties LLC",
      period: "December 2023",
      dueDate: "12/1/2023",
      amount: 1275,
      status: "Overdue",
      lateFee: 50,
    },
  ];

  return (
    <div className="p-8 pl-0 min-h-screen font-sans">
      <header className="flex items-center gap-4 mb-8">
        <ArrowLeft
          className="cursor-pointer text-slate-600"
          onClick={() => router.back()}
        />
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Invoices as Lessee
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Invoices received from lessor
          </p>
        </div>
      </header>

      {/* Search Bar */}
      <div className="flex gap-2 mb-6">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={16}
          />
          <input
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-md text-sm focus:outline-none"
            placeholder="Search invoices..."
          />
        </div>
        <Button
          variant="outline"
          className="gap-2 text-slate-600 border-slate-200 bg-white">
          Filter <Filter size={14} />
        </Button>
      </div>

      {/* Invoice List */}
      <div className="space-y-4">
        {invoices.map((inv) => (
          <Dialog key={inv.id}>
            {/* Conditional Trigger: Only "Paid" or "Overdue" (no pay button) cards 
               act as the trigger for the Detail Dialog.
            */}
            <DialogTrigger asChild>
              <Card className="cursor-pointer hover:border-slate-300 transition-all border-slate-200 shadow-none">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-slate-800">
                        {inv.id}
                      </h3>
                      <p className="text-sm text-slate-500 font-medium">
                        {inv.property}
                      </p>
                    </div>
                    <Badge
                      className={`
                      font-bold text-[10px] px-2 py-0.5 rounded-md border-none
                      ${
                        inv.status === "Paid"
                          ? "bg-emerald-500 text-white"
                          : inv.status === "Pending"
                          ? "bg-orange-500 text-white"
                          : "bg-red-500 text-white"
                      }
                    `}>
                      {inv.status}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-y-4 mb-6">
                    <div>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                        Period
                      </p>
                      <p className="text-sm font-bold text-slate-700">
                        {inv.period}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                        Due Date
                      </p>
                      <p className="text-sm font-bold text-slate-700">
                        {inv.dueDate}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                        Amount
                      </p>
                      <p className="text-base font-bold text-slate-800">
                        ${inv.amount.toLocaleString()}
                      </p>
                    </div>
                    {inv.lateFee && (
                      <div className="text-right">
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                          Late Fee
                        </p>
                        <p className="text-sm font-bold text-red-500">
                          +${inv.lateFee}
                        </p>
                      </div>
                    )}
                  </div>

                  {inv.status === "Pending" && (
                    <div className="flex gap-2">
                      <Button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold h-11">
                        <CreditCard className="mr-2" size={18} /> Pay Now
                      </Button>
                      <Button
                        variant="outline"
                        className="border-slate-200 text-slate-600 font-bold h-11">
                        Set Autopay
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </DialogTrigger>

            {/* --- Invoice Detail Modal (The 2nd Design) --- */}
            <InvoiceDetailModal invoice={inv} />
          </Dialog>
        ))}
      </div>
    </div>
  );
};

// --- Invoice Detail Modal Component ---

const InvoiceDetailModal: React.FC<{ invoice: Invoice }> = ({ invoice }) => (
  <DialogContent className="sm:max-w-[600px] p-0 border-none bg-slate-50 overflow-hidden">
    <div className="p-8">
      <DialogHeader className="flex flex-row justify-between items-start space-y-0 mb-6">
        <div>
          <DialogTitle className="text-2xl font-bold text-slate-800">
            Invoice Details
          </DialogTitle>
          <p className="text-sm text-slate-500 font-medium">
            {invoice.id} - {invoice.period}
          </p>
        </div>
      </DialogHeader>

      {/* Summary Banner */}
      <Card className="bg-orange-50 border-none shadow-none mb-6">
        <CardContent className="p-4 flex justify-between items-center">
          <div>
            <p className="text-sm font-bold text-slate-800">
              {invoice.property}
            </p>
            <p className="text-xs text-slate-500 font-medium">
              {invoice.period}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold text-slate-800">
              ${invoice.amount.toLocaleString()}
            </p>
            <Badge className="bg-emerald-500 text-white text-[10px] h-5 border-none">
              Paid
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Line Items */}
      <Card className="border-slate-200 shadow-none mb-6">
        <CardContent className="p-6 space-y-4">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            Line Items
          </h4>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500 font-medium">
              Base Rent - Apt 4B
            </span>
            <span className="font-bold text-slate-700">$1,200</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500 font-medium">Electricity</span>
            <span className="font-bold text-slate-700">$78</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500 font-medium">Water & Sewer</span>
            <span className="font-bold text-slate-700">$42</span>
          </div>
          <Separator className="bg-slate-100" />
          <div className="flex justify-between text-sm pt-2">
            <span className="font-bold text-slate-800 uppercase">Total</span>
            <span className="font-bold text-slate-800">
              ${invoice.amount.toLocaleString()}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Meter Readings */}
      <div className="space-y-4 mb-8">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Meter Readings
        </h4>

        {/* Electricity Reading */}
        <Card className="border-slate-200 shadow-none">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <Zap size={16} className="text-slate-800" />
              <span className="text-sm font-bold text-slate-800">
                Electricity
              </span>
            </div>
            <div className="grid grid-cols-2 gap-y-4">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">
                  Previous
                </p>
                <p className="text-sm font-bold text-slate-700">1080</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-slate-400 uppercase">
                  Current
                </p>
                <p className="text-sm font-bold text-slate-700">1250</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">
                  Usage
                </p>
                <p className="text-sm font-bold text-slate-700">170 units</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-slate-400 uppercase">
                  Cost
                </p>
                <p className="text-sm font-bold text-slate-700">$78</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Water Reading */}
        <Card className="border-slate-200 shadow-none">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <Droplets size={16} className="text-slate-800" />
              <span className="text-sm font-bold text-slate-800">Water</span>
            </div>
            <div className="grid grid-cols-2 gap-y-4">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">
                  Previous
                </p>
                <p className="text-sm font-bold text-slate-700">8380</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-slate-400 uppercase">
                  Current
                </p>
                <p className="text-sm font-bold text-slate-700">8520</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">
                  Usage
                </p>
                <p className="text-sm font-bold text-slate-700">140 units</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-slate-400 uppercase">
                  Cost
                </p>
                <p className="text-sm font-bold text-slate-700">$42</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Button className="bg-orange-500 hover:bg-orange-600 text-white font-bold h-11">
          <Send size={16} className="mr-2" /> Send Invoice
        </Button>
        <Button
          variant="outline"
          className="border-slate-200 text-slate-600 font-bold h-11">
          <Download size={16} className="mr-2" /> Download
        </Button>
        <Button
          variant="outline"
          className="border-slate-200 text-slate-600 font-bold h-11">
          <MessageSquare size={16} className="mr-2" /> Dispute
        </Button>
      </div>
    </div>
  </DialogContent>
);

export default InvoicesLessee;
