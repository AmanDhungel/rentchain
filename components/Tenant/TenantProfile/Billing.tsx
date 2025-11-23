import React, { FC } from "react";

// --- TYPE DEFINITIONS ---

/**
 * Defines the structure for a single Invoice Record object.
 */
interface InvoiceRecord {
  id: number;
  title: string;
  date: string;
  amount: string;
  status: "Paid" | "Pending" | "Overdue";
}

// --- MOCK DATA ---

const mockInvoices: InvoiceRecord[] = [
  {
    id: 1,
    title: "January Rent",
    date: "2025-01-01",
    amount: "$2500",
    status: "Paid",
  },
  {
    id: 2,
    title: "December Rent",
    date: "2024-12-01",
    amount: "$2500",
    status: "Paid",
  },
  {
    id: 3,
    title: "November Rent",
    date: "2024-11-01",
    amount: "$2500",
    status: "Paid",
  },
];

type IconProps = React.SVGProps<SVGSVGElement>;

const PlusIcon: FC<IconProps> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const CheckCircleIcon: FC<IconProps> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const InvoiceIcon: FC<IconProps> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6" />
    <path d="M10 15h4M10 19h4" />
  </svg>
);

const EyeIcon: FC<IconProps> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const OutstandingBalanceCard: FC = () => (
  <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex justify-between items-center mb-6">
    <div className="flex flex-col">
      <div className="text-gray-500 font-medium mb-1">Outstanding Balance</div>
      <div className="text-3xl font-bold text-gray-900 mb-1">$0.00</div>
      <div className="text-sm text-gray-500">All payments up to date</div>
    </div>

    <div className="text-green-500">
      <CheckCircleIcon className="w-8 h-8 fill-none" />
    </div>
  </div>
);

const StatusBadge: FC<{ status: InvoiceRecord["status"] }> = ({ status }) => {
  let colorClasses: string;
  switch (status) {
    case "Paid":
      colorClasses = "bg-green-100 text-green-700";
      break;
    case "Pending":
      colorClasses = "bg-yellow-100 text-yellow-700";
      break;
    case "Overdue":
      colorClasses = "bg-red-100 text-red-700";
      break;
  }

  return (
    <div
      className={`inline-flex items-center rounded-full px-3 py-0.5 text-xs font-medium ${colorClasses}`}>
      {status}
    </div>
  );
};

const InvoiceCard: FC<{ invoice: InvoiceRecord }> = ({ invoice }) => (
  <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 transition-shadow duration-200">
    <div className="flex justify-between items-center">
      <div className="flex items-start space-x-4 flex-1 min-w-0 pr-4">
        <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
          <InvoiceIcon className="w-5 h-5" strokeWidth={2} />
        </div>

        <div className="flex flex-col text-sm text-gray-500 truncate">
          <span className="text-base font-semibold text-gray-800 truncate">
            {invoice.title}
          </span>
          <span className="text-xs mt-0.5 text-gray-500">{invoice.date}</span>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="text-base font-semibold text-gray-900 min-w-[70px] text-right">
          {invoice.amount}
        </div>

        <StatusBadge status={invoice.status} />

        <button
          className="text-gray-400 hover:text-blue-600 transition-colors"
          title="View Invoice">
          <EyeIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
);

const PaymentPlansSection: FC = () => (
  <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 mt-8">
    <div className="text-lg font-semibold text-gray-800 mb-4">
      Payment Plans
    </div>
    <div className="text-sm text-gray-500 mb-6">No active payment plans</div>

    {/* Create Payment Plan Button */}
    <button className="flex items-center bg-gray-700 text-white font-semibold py-2.5 px-5 rounded-lg shadow-md hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-gray-300">
      <PlusIcon className="w-5 h-5 mr-2" />
      Create Payment Plan
    </button>
  </div>
);

const Billing: FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8 font-sans">
      <header className="flex justify-between items-center mb-8 max-w-5xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Billing & Invoices
        </h1>
        <button className="flex items-center bg-orange-500 text-white font-semibold py-2.5 px-5 rounded-lg shadow-md hover:bg-orange-600 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-orange-300">
          <PlusIcon className="w-5 h-5 mr-2" />
          Create Invoice
        </button>
      </header>

      <main className="max-w-5xl mx-auto">
        <OutstandingBalanceCard />

        <h2 className="text-lg font-semibold text-gray-800 mb-4 mt-6">
          Recent Invoices
        </h2>

        <div className="space-y-4">
          {mockInvoices.map((invoice) => (
            <InvoiceCard key={invoice.id} invoice={invoice} />
          ))}
        </div>

        <PaymentPlansSection />
      </main>

      <div className="pb-12"></div>
    </div>
  );
};

export default Billing;
