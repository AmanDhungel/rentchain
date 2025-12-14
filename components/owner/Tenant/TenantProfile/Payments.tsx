import React, { FC } from "react";

interface PaymentRecord {
  id: number;
  type: "Rent" | "Deposit" | "Fee";
  property: string;
  amount: string;
  method: string;
  date: string;
  status: "Paid" | "Pending" | "Failed";
}

interface PaymentCardProps {
  payment: PaymentRecord;
}

const mockPayments: PaymentRecord[] = [
  {
    id: 1,
    type: "Rent",
    property: "Skyline Towers - Apt 4B",
    amount: "$2500",
    method: "Bank Transfer",
    date: "2025-01-01",
    status: "Paid",
  },
  {
    id: 2,
    type: "Rent",
    property: "Skyline Towers - Apt 4B",
    amount: "$2500",
    method: "Bank Transfer",
    date: "2025-01-01",
    status: "Paid",
  },
  {
    id: 3,
    type: "Rent",
    property: "Skyline Towers - Apt 4B",
    amount: "$2500",
    method: "Bank Transfer",
    date: "2025-01-01",
    status: "Paid",
  },
  {
    id: 4,
    type: "Rent",
    property: "Skyline Towers - Apt 4B",
    amount: "$2500",
    method: "Bank Transfer",
    date: "2025-01-01",
    status: "Paid",
  },
];

type IconProps = React.SVGProps<SVGSVGElement>;

const FilterIcon: FC<IconProps> = (props) => (
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
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);

const ExportIcon: FC<IconProps> = (props) => (
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
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" x2="12" y1="15" y2="3" />
  </svg>
);

const DollarSignIcon: FC<IconProps> = (props) => (
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
    <line x1="12" x2="12" y1="2" y2="22" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const PaidBadge: FC<{ status: PaymentRecord["status"] }> = ({ status }) => {
  const colorClasses: string =
    status === "Paid"
      ? "bg-green-100 text-green-700"
      : "bg-yellow-100 text-yellow-700";

  return (
    <div
      className={`inline-flex items-center rounded-full px-3 py-0.5 text-xs font-medium ${colorClasses}`}>
      {status}
    </div>
  );
};

const PaymentCard: FC<PaymentCardProps> = ({ payment }) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 transition-shadow duration-200">
      <div className="flex justify-between items-start">
        <div className="flex-1 min-w-0 pr-4">
          <div className="text-base font-semibold text-gray-800 mb-1">
            {payment.type}
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-green-50 text-green-600 border border-green-200">
              <DollarSignIcon className="w-4 h-4" strokeWidth={2.5} />
            </div>

            <div className="flex flex-col text-sm text-gray-500 truncate">
              <span className="font-medium text-gray-700 truncate">
                {payment.property}
              </span>
              <span>{payment.method}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end space-y-1">
          <div className="text-lg font-bold text-gray-900">
            {payment.amount}
          </div>
          <div className="text-sm text-gray-500">{payment.date}</div>
          <PaidBadge status={payment.status} />
        </div>
      </div>
    </div>
  );
};

const Payments: FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8 font-sans">
      <header className="flex justify-between items-center mb-8 md:mb-12 max-w-5xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Payment History
        </h1>
        <div className="flex space-x-3">
          <button className="flex items-center border border-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg shadow-sm hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300">
            <FilterIcon className="w-4 h-4 mr-2" />
            Filter
          </button>

          <button className="flex items-center bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-orange-600 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-orange-300">
            <ExportIcon className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </header>

      <main className="space-y-4 max-w-5xl mx-auto">
        {mockPayments.map((payment) => (
          <PaymentCard key={payment.id} payment={payment} />
        ))}
      </main>

      <div className="pb-12"></div>
    </div>
  );
};

export default Payments;
