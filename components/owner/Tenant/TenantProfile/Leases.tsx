import React, { FC } from "react";

interface LeaseProps {
  id: number;
  property: string;
  status: "Active" | "Completed";
  startDate: string;
  endDate: string;
  monthlyRent: string;
  deposit: string;
}

interface StatusBadgeProps {
  status: LeaseProps["status"];
}

interface LeaseCardProps {
  lease: LeaseProps;
}

const mockLeases: LeaseProps[] = [
  {
    id: 1,
    property: "Skyline Towers - Apt 4B",
    status: "Active",
    startDate: "2024-01-01",
    endDate: "2025-12-31",
    monthlyRent: "$2500",
    deposit: "$5000",
  },
  {
    id: 2,
    property: "Downtown Lofts - Loft 12",
    status: "Completed",
    startDate: "2024-01-01",
    endDate: "2025-12-31",
    monthlyRent: "$2500",
    deposit: "$5000",
  },
];

type IconProps = React.SVGProps<SVGSVGElement>;

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

const DownloadIcon: FC<IconProps> = (props) => (
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

const StatusBadge: FC<StatusBadgeProps> = ({ status }) => {
  const isCompleted: boolean = status === "Completed";
  const colorClasses: string = isCompleted
    ? "bg-blue-500 text-white hover:bg-blue-600"
    : "bg-green-500 text-white hover:bg-green-600";

  return (
    <div
      className={`inline-flex items-center rounded-full px-3 py-0.5 text-xs font-medium ${colorClasses}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-white mr-1.5"></span>
      {status}
    </div>
  );
};

const LeaseCard: FC<LeaseCardProps> = ({ lease }) => {
  const data: { label: string; value: string }[] = [
    { label: "Start Date", value: lease.startDate },
    { label: "End Date", value: lease.endDate },
    { label: "Monthly Rent", value: lease.monthlyRent },
    { label: "Deposit", value: lease.deposit },
  ];

  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
      <div className="flex justify-between items-start mb-6 flex-wrap">
        <div className="flex items-center space-x-3 min-w-0">
          <h2 className="text-xl font-semibold text-gray-800 truncate">
            {lease.property}
          </h2>
          <StatusBadge status={lease.status} />
        </div>

        <div className="flex space-x-4 mt-3 sm:mt-0">
          <button
            className="text-gray-500 hover:text-indigo-600 transition-colors"
            title="View Lease Details">
            <EyeIcon className="w-5 h-5" />
          </button>
          <button
            className="text-gray-500 hover:text-indigo-600 transition-colors"
            title="Download Lease Agreement">
            <DownloadIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4 text-gray-600">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col">
            <span className="text-sm font-medium text-gray-400 mb-1">
              {item.label}
            </span>
            <span className="text-base font-semibold text-gray-700">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const Lease: FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8 font-sans">
      <header className="flex justify-between items-center mb-8 md:mb-12 max-w-5xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          All Leases
        </h1>
        <button className="flex items-center bg-orange-500 text-white font-semibold py-2.5 px-5 rounded-lg shadow-md hover:bg-orange-600 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-orange-300">
          <svg
            className="w-5 h-5 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add Leases
        </button>
      </header>

      <main className="space-y-6 max-w-5xl mx-auto">
        {mockLeases.map((lease) => (
          <LeaseCard key={lease.id} lease={lease} />
        ))}
      </main>

      <div className="pb-12"></div>
    </div>
  );
};

export default Lease;
