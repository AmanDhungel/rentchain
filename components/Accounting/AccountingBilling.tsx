"use client";
import React from "react";
import {
  Clock,
  Receipt,
  CreditCard,
  RotateCcw,
  Banknote,
  Download,
  Mail,
  ListChecks,
  Files,
  Lock,
  BookOpen,
  Building,
  PieChart,
  Activity,
  ArrowDownRight,
  XCircle,
  LucideIcon,
  TriangleAlert,
  MoveRight,
  PlusIcon,
  TrendingUp,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// --- Type Definitions ---

interface Breadcrumb {
  name: string;
  href: string;
}

interface ARAgingItem {
  label: string;
  amount: string;
}

interface ActivityItemData {
  type: string;
  description: string;
  time: string;
  amount: string;
  color: string;
  icon: LucideIcon; // Using LucideIcon type for icons
}

interface DashboardCardProps {
  title?: string;
  children: React.ReactNode;
  icon?: LucideIcon;
  className?: string;
  titleClass?: string;
}

interface ActionButtonProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  className?: string;
  bg?: string;
}

interface LinkItemProps {
  icon: LucideIcon;
  title: string;
  color?: string;
  href?: string;
}

interface ActivityItemProps extends ActivityItemData {}

const AR_AGING_DATA: ARAgingItem[] = [
  { label: "Current (0-30)", amount: "$24,500" },
  { label: "31-60 days", amount: "$8,200" },
  { label: "61-90 days", amount: "$4,100" },
  { label: "90+ days", amount: "$2,100" },
];

const RECENT_ACTIVITY_DATA: ActivityItemData[] = [
  {
    type: "Payment received",
    description: "Sarah Johnson - $1,200",
    time: "4 hours ago",
    amount: "+$1,200",
    color: "text-green-600",
    icon: ArrowDownRight,
  },
  {
    type: "Payment failed",
    description: "Michael Chen - $900",
    time: "4 hours ago",
    amount: "$900",
    color: "text-red-600",
    icon: XCircle,
  },
  {
    type: "Invoice sent",
    description: "Emma Wilson - February rent",
    time: "9 hours ago",
    amount: "$850",
    color: "text-blue-600",
    icon: Mail,
  },
  {
    type: "Refund processed",
    description: "David Rodriguez - $200",
    time: "1 day ago",
    amount: "-$200",
    color: "text-orange-500",
    icon: RotateCcw,
  },
];

// --- Sub-Components ---

// Generic Card Wrapper
const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  children,
  icon: Icon,
  className = "",
  titleClass = "text-gray-500",
}) => (
  <div
    className={`bg-white p-6 rounded-md shadow-sm border border-gray-100 ${className}`}>
    {title && (
      <div className="flex items-center mb-4">
        {Icon && <Icon className="w-4 h-4 mr-2 " />}
        <h3 className={`text-sm font-medium ${titleClass}`}>{title}</h3>
      </div>
    )}
    {children}
  </div>
);

const ARAgingCard: React.FC = () => {
  const router = useRouter();

  return (
    <DashboardCard
      title="AR Aging"
      icon={Clock}
      className="h-full flex flex-col">
      <div className="flex flex-col items-center justify-center text-3xl  text-blue-500 mb-2">
        $38,900
        <span className="text-sm text-gray-500 mb-4">Total Outstanding</span>
      </div>
      <hr className="rounded-md border-gray-400 w-[97%] m-auto my-2" />

      <div className="flex flex-col space-y-2 mb-6 text-sm">
        {AR_AGING_DATA.map((item, index) => (
          <div key={item.label} className="flex justify-between items-center">
            <span
              className={`${
                index === 1 ? "text-orange-600" : "text-gray-900"
              } ${index === 3 ? "text-red-500 font-bold" : ""}`}>
              {item.label}
            </span>
            <span
              className={`${index === 0 ? "text-blue-600" : "text-gray-900"} ${
                index === 3 ? "text-red-500 font-bold" : ""
              }`}>
              {item.amount}
            </span>
          </div>
        ))}
      </div>

      <button
        onClick={() => router.push("/accounting/accountingandbilling/araging")}
        className="w-full bg-orange-600 text-white font-semibold py-3 rounded-xl mt-auto transition hover:bg-orange-700">
        View Details
      </button>
    </DashboardCard>
  );
};

// Receipts and Failed Payments Card
const ReceiptsCard: React.FC = () => {
  const failedAmount = 750;
  const failedCount = 3;
  const totalReceipts = 3600;
  const failedPercentage = (failedAmount / totalReceipts) * 100;
  const router = useRouter();

  return (
    <DashboardCard
      title="Today's Receipts"
      icon={Receipt}
      className="h-full flex flex-col">
      <div className="text-3xl font-bold text-gray-900 mb-2">$3,600</div>
      <p className="text-sm text-gray-500 mb-6">{8} transactions</p>

      <div className="flex justify-between items-end text-sm text-gray-900 font-medium mb-1">
        <span>Failed Payments</span>
        <span>
          ${failedAmount.toLocaleString()} ({failedCount})
        </span>
      </div>

      {/* Mock Bar Chart for Failed Payments */}
      <div className="h-2 bg-gray-200 rounded-full mb-6">
        <div
          className="h-full bg-red-500 rounded-full"
          style={{ width: `${Math.min(failedPercentage, 100)}%` }} // Ensure it doesn't exceed 100%
        ></div>
      </div>

      <button
        onClick={() =>
          router.push("/accounting/accountingandbilling/receiptandpayment")
        }
        className="w-full bg-orange-600 text-white font-semibold py-3 rounded-xl mt-auto transition hover:bg-orange-700">
        View Payments
      </button>
    </DashboardCard>
  );
};

// Monthly Collection Performance Card
const MonthlyCollectionCard: React.FC = () => (
  <DashboardCard
    title="Monthly Collection Performance"
    icon={TrendingUp}
    className="md:col-span-2">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-11/12 m-auto items-center">
      <div>
        <div className="text-3xl font-bold text-blue-500">$42,000</div>
        <p className="text-sm text-gray-500">Expected</p>
      </div>

      <div className="flex flex-col items-center">
        <div className="text-3xl font-bold text-green-600">$38,400</div>
        <p className="text-sm text-gray-500">Collected</p>
      </div>

      <div className="flex flex-col items-end">
        <div className="text-3xl font-bold text-purple-800">91.4%</div>
        <p className="text-sm text-gray-500">Collection Rate</p>
      </div>
    </div>

    <div className="flex justify-between text-xs text-gray-500 mt-4">
      <span>Payment Reliability</span>
      <span className="text-gray-500 font-medium">91.4%</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1 relative">
      <div
        className="h-2.5 bg-gray-200 rounded-full absolute"
        style={{ width: "100%", opacity: 0.6 }} // Expected/Target line
      ></div>
      <div
        className="h-2.5 bg-orange-500 rounded-full absolute"
        style={{ width: "91.4%" }} // Collected progress
      ></div>
    </div>
  </DashboardCard>
);

const ActionButton: React.FC<ActionButtonProps> = ({
  icon: Icon,
  title,
  subtitle,
  className = "",
  bg,
}) => (
  <button className="flex flex-col items-center p-4 rounded-xl border border-gray-200 transition-all hover:bg-blue-50 hover:border-blue-300 shadow-sm text-center">
    <div className={`${bg} p-3   rounded-full shadow-md mb-2 `}>
      <Icon className={`w-6 h-6 text-blue-500 ${className}`} />
    </div>
    <p className="font-semibold text-gray-800 text-sm">{title}</p>
    <p className="text-xs text-gray-500">{subtitle}</p>
  </button>
);

// Link Item Component
const LinkItem: React.FC<LinkItemProps> = ({
  icon: Icon,
  title,
  color = "text-gray-600",
  href,
}) => (
  <Link
    href={href ? href : ""}
    className="flex items-center  p-3  border border-gray-200 shadow-sm rounded-lg transition hover:bg-gray-50 text-gray-800">
    <Icon className={`w-5 h-5 mr-3 ${color}`} />
    <span className="text-sm">{title}</span>
  </Link>
);

const ActivityItem: React.FC<ActivityItemProps> = ({
  type,
  description,
  time,
  amount,
  color,
  icon: Icon,
}) => (
  <div className="flex justify-between items-start py-3 border-b last:border-b-0">
    <div className="flex items-start">
      <div
        className={`p-1 rounded-full mr-3 mt-1 ${color
          .replace("text", "bg")
          .replace("-600", "-100")
          .replace("-500", "-100")}`}>
        <Icon className={`w-4 h-4 ${color}`} />
      </div>
      <div>
        <p className="font-medium text-sm text-gray-900">{type}</p>
        <p className="text-xs text-gray-500">{description}</p>
        <p className="text-xs text-gray-400 mt-0.5">{time}</p>
      </div>
    </div>
    <span className={`font-semibold text-sm ${color}`}>{amount}</span>
  </div>
);

const AccountingBilling: React.FC = () => {
  const breadcrumbs: Breadcrumb[] = [
    { name: "Accounting", href: "#" },
    { name: "Accounting & Billing", href: "#" },
  ];

  return (
    <div className="min-h-screen pl-0 p-4 sm:p-8 font-['Inter']">
      <div className="bg-red-50 border border-red-500 p-4 rounded-sm mb-8">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <TriangleAlert className="w-4 h-4 text-red-700" />
            <h2 className="text-sm font-semibold text-gray-800">
              Payment Overdue Alerts{" "}
              <span className="p-1 rounded-[3px] bg-red-600 text-white ml-5">
                3
              </span>
            </h2>
          </div>
        </div>
        <div className="mt-3 space-y-2">
          <div className="flex justify-between text-sm">
            <p className="text-gray-800">
              Michael Chen (Unit 12A) - 15 days overdue
            </p>
            <span className="text-gray-800 font-semibold">$1,200</span>
          </div>
          <div className="flex justify-between text-sm">
            <p className="text-gray-800">
              Lisa Anderson (Penthouse A) - 45 days overdue
            </p>
            <span className="text-gray-800 font-semibold">$3,600</span>
          </div>
        </div>
        <a
          href="#"
          className="flex items-center text-sm text-red-500 font-medium mt-4 hover:underline">
          View all 3 overdue accounts
          <MoveRight className="w-4 h-4 ml-2 text-red-600" />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <ARAgingCard />
        <ReceiptsCard />
      </div>

      <div className="mb-8">
        <MonthlyCollectionCard />
      </div>
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        Accounting & Billing
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 mb-10">
        <ActionButton
          icon={PlusIcon}
          title="New Invoice"
          subtitle="Create invoice"
          bg="bg-blue-500/20 rounded-full"
        />
        <ActionButton
          icon={CreditCard}
          title="Record Payment"
          subtitle="Log payment"
          bg="bg-green-500/20"
          className="text-green-500"
        />
        <ActionButton
          icon={RotateCcw}
          title="Process Refund"
          subtitle="Issue refund"
          bg="bg-orange-500/20"
          className="text-orange-500"
        />
        <ActionButton
          icon={Banknote}
          title="Deposit Transfer"
          subtitle="Move deposits"
          bg="bg-purple-500/20"
          className="text-purple-500"
        />
        <ActionButton
          icon={Download}
          title="Export Data"
          subtitle="Financial report"
          bg="bg-pink-500/20"
          className="text-pink-500"
        />
        <ActionButton
          icon={Mail}
          title="Send Reminders"
          subtitle="Payment reminders"
          bg="bg-red-500/20 rounded-full"
          className="text-red-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardCard
          title="Financial Management"
          titleClass="text-gray-600 font-semibold"
          className="lg:col-span-1">
          <div className="flex flex-col space-y-1">
            <LinkItem
              icon={ListChecks}
              title="Chart of Accounts"
              href="/accounting/accountingandbilling/chartsofaccounts"
            />
            <LinkItem
              icon={Files}
              title="Manage Invoices"
              href="/accounting/accountingandbilling/invoices"
            />
            <LinkItem
              icon={Lock}
              title="Security Deposits"
              href="/accounting/accountingandbilling/security-deposits"
            />
          </div>
        </DashboardCard>

        <DashboardCard
          title="Reports & Compliance"
          titleClass="text-gray-600 font-semibold"
          className="lg:col-span-1">
          <div className="flex flex-col space-y-1">
            <LinkItem
              icon={BookOpen}
              title="Financial Reports"
              href="/accounting/accountingandbilling/financialreport"
            />
            <LinkItem
              icon={Building}
              title="Tax & Municipal"
              href="/accounting/accountingandbilling/taxandmunicipalreporting"
            />
            <LinkItem
              icon={PieChart}
              title="AR Aging Analysis"
              href="/accounting/accountingandbilling/araging"
            />
          </div>
        </DashboardCard>
      </div>
      <DashboardCard
        title="Recent Activity"
        icon={Activity}
        titleClass="text-gray-600 font-semibold"
        className="lg:col-span-1 mt-10">
        <div className="divide-y divide-gray-100">
          {RECENT_ACTIVITY_DATA.map((item, index) => (
            <ActivityItem key={index} {...item} />
          ))}
        </div>
      </DashboardCard>

      <div className="h-10"></div>
    </div>
  );
};

export default AccountingBilling;
