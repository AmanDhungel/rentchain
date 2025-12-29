"use client";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CreditCard,
  FileText,
  RefreshCcw,
  ShieldCheck,
  Clock,
  Download,
} from "lucide-react";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: React.ReactNode;
  isAlert?: boolean;
}

interface ActionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link?: string;
  layout?: "vertical" | "horizontal";
}

interface TransactionItemProps {
  title: string;
  subtitle: string;
  amount: string;
  status: "Paid" | "Pending" | "Overdue";
  isIncome?: boolean;
}

const BillingDashboard: React.FC = () => {
  return (
    <div className="p-8 bg-slate-50 min-h-screen font-sans text-slate-900">
      <header className="mb-8">
        <h1 className="text-2xl font-bold">Billing & Accounting</h1>
        <p className="text-sm text-slate-500 font-medium">
          🏠 / Billing & Accounting
        </p>
      </header>

      {/* --- Top Metrics --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard
          title="Due to Lessor"
          value="$2,700"
          change="+$200"
          trend="up"
          icon={<DollarSign size={18} className="text-red-500" />}
        />
        <MetricCard
          title="Collected from Sub-tenants"
          value="$1,200"
          change="+$300"
          trend="up"
          icon={<TrendingUp size={18} className="text-emerald-500" />}
        />
        <MetricCard
          title="Net Balance"
          value="-$1,500"
          change="-$100"
          trend="down"
          icon={<DollarSign size={18} className="text-orange-500" />}
        />
        <MetricCard
          title="Failed Payments"
          value="2"
          change="+1"
          trend="up"
          icon={<AlertTriangle size={18} className="text-red-500" />}
          isAlert
        />
      </div>

      {/* --- Quick Actions --- */}
      <section className="mb-8">
        <h2 className="text-lg font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <ActionCard
            icon={<CreditCard className="text-blue-500" />}
            title="Pay Rent"
            description="Pay rent to lessor"
          />
          <ActionCard
            icon={<TrendingUp className="text-emerald-500" />}
            title="Generate Invoices"
            description="Create sub-tenant invoices"
          />
          <ActionCard
            icon={<FileText className="text-purple-500" />}
            title="Record Payment"
            description="Log received payment"
          />
          <ActionCard
            icon={<RefreshCcw className="text-orange-500" />}
            title="Refund/Adjustment"
            description="Process refund or adjustment"
          />
        </div>
      </section>

      {/* --- Recent Transactions --- */}
      <Card className="mb-8 border-slate-200">
        <CardHeader className="flex flex-row items-center justify-between py-4">
          <CardTitle className="text-md font-bold">
            Recent Transactions
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            className="text-slate-500 font-bold">
            View All
          </Button>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <TransactionItem
            title="Rent - Apt 4B"
            subtitle="Metro Properties LLC"
            amount="-$1200"
            status="Pending"
          />
          <TransactionItem
            title="Utilities - Apt 4B"
            subtitle="Metro Properties LLC"
            amount="-$150"
            status="Paid"
          />
          <TransactionItem
            title="Rent - Room A"
            subtitle="John Smith"
            amount="+$600"
            status="Paid"
            isIncome
          />
          <TransactionItem
            title="Rent - Room B"
            subtitle="Sarah Johnson"
            amount="+$550"
            status="Overdue"
            isIncome
          />
        </CardContent>
      </Card>

      {/* --- Management Links --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ActionCard
          icon={<FileText className="text-blue-500" />}
          title="Invoices as Lessee"
          description="View invoices from lessor"
          layout="horizontal"
          link="/tenant/accounting/invoicesaslessee"
        />
        <ActionCard
          icon={<TrendingUp className="text-emerald-500" />}
          title="Invoices as Lessor"
          description="Manage sub-tenant invoices"
          layout="horizontal"
          link="/tenant/accounting/invoicesaslessor"
        />
        <ActionCard
          icon={<CreditCard className="text-purple-500" />}
          title="Payments & Receipts"
          description="Payment history & methods"
          layout="horizontal"
          link="/tenant/accounting/payment-receipt"
        />
        <ActionCard
          icon={<ShieldCheck className="text-orange-500" />}
          title="Deposits"
          description="Security deposits management"
          layout="horizontal"
          link="/tenant/accounting/depositmanagement"
        />
        <ActionCard
          icon={<Clock className="text-orange-400" />}
          title="AR Aging"
          description="Accounts receivable aging"
          layout="horizontal"
          link="/tenant/accounting/aragingreport"
        />
        <ActionCard
          icon={<Download className="text-purple-400" />}
          title="Statements & Reports"
          description="Financial statements"
          layout="horizontal"
          link="/tenant/accounting/statementandreports"
        />
      </div>
    </div>
  );
};

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  trend,
  icon,
  isAlert,
}) => (
  <Card className="shadow-none border-slate-200">
    <CardContent className="p-5 flex items-start justify-between">
      <div className="flex gap-4">
        <div
          className={`p-2.5 rounded-lg flex items-center justify-center ${
            isAlert ? "bg-red-50" : "bg-slate-50"
          }`}>
          {icon}
        </div>
        <div>
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            {title}
          </p>
          <h3 className="text-2xl font-bold mt-0.5 tracking-tight">{value}</h3>
        </div>
      </div>
      <div className="flex items-center gap-1 text-[11px] font-bold text-slate-400 mt-1">
        {trend === "up" ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
        {change}
      </div>
    </CardContent>
  </Card>
);

const ActionCard: React.FC<ActionCardProps> = ({
  icon,
  title,
  description,
  layout = "vertical",
  link,
}) => {
  const router = useRouter();
  return (
    <Card
      className="hover:bg-slate-50 transition-colors cursor-pointer border-slate-200 shadow-none"
      onClick={() => router.push(link ? link : "")}>
      <CardContent
        className={`p-6 flex flex-col items-center justify-center text-center gap-1`}>
        <div className="p-2 rounded-lg bg-slate-50 mb-2">{icon}</div>
        <h4 className="text-[15px] font-bold text-slate-800">{title}</h4>
        <p className="text-xs text-slate-400 font-medium">{description}</p>
      </CardContent>
    </Card>
  );
};

const TransactionItem: React.FC<TransactionItemProps> = ({
  title,
  subtitle,
  amount,
  status,
  isIncome = false,
}) => (
  <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100">
    <div className="flex items-center gap-4">
      <div
        className={`p-2 rounded-full ${
          isIncome ? "bg-emerald-50 text-emerald-500" : "bg-red-50 text-red-500"
        }`}>
        <div className="bg-white rounded-full p-0.5 shadow-sm">
          <DollarSign size={14} />
        </div>
      </div>
      <div>
        <p className="text-sm font-bold text-slate-800">{title}</p>
        <p className="text-xs text-slate-400 font-semibold">{subtitle}</p>
      </div>
    </div>
    <div className="text-right">
      <p className="text-sm font-bold text-slate-700 mb-1">{amount}</p>
      <Badge
        variant="outline"
        className={`
        text-[10px] font-bold px-2 py-0 h-5 border-none
        ${
          status === "Paid"
            ? "bg-emerald-100 text-emerald-600"
            : status === "Pending"
            ? "bg-orange-100 text-orange-600"
            : "bg-red-100 text-red-600"
        }
      `}>
        {status}
      </Badge>
    </div>
  </div>
);

export default BillingDashboard;
