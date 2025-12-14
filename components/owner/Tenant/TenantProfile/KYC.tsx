import React, { FC } from "react";

interface VerificationCheck {
  id: number;
  title: string;
  subtitle: string;
  iconPath: string;
  isVerified: boolean;
}

interface SummaryCard {
  id: number;
  title: string;
  detail: string;
  status: "Verified" | "Pending";
}

const mockSummaryCards: SummaryCard[] = [
  {
    id: 1,
    title: "Identity Verification",
    detail: "Government ID verified",
    status: "Verified",
  },
  {
    id: 2,
    title: "Background Check",
    detail: "Completed on 2024-01-01",
    status: "Verified",
  },
  {
    id: 3,
    title: "Credit Score",
    detail: "Excellent credit rating",
    status: "Verified",
  },
];

const mockVerificationChecks: VerificationCheck[] = [
  {
    id: 1,
    title: "Skyline Towers - Apt 4B",
    subtitle: "Verified employer and income",
    iconPath: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM10 13l2 2 4-4",
    isVerified: true,
  },
  {
    id: 2,
    title: "References Check",
    subtitle: "Previous landlord references",
    iconPath:
      "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M18 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM4 7a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm10 0a2 2 0 1 1 4 0 2 2 0 0 1-4 0Z",
    isVerified: true,
  },
];

type IconProps = React.SVGProps<SVGSVGElement>;

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

const ViewIcon: FC<IconProps> = (props) => (
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

const StatusIndicator: FC<{ status: SummaryCard["status"] }> = ({ status }) => {
  const isVerified = status === "Verified";

  if (isVerified) {
    return (
      <div className="text-green-500">
        <CheckCircleIcon className="w-5 h-5 fill-none" />
      </div>
    );
  }
  return (
    <div className="text-gray-400">
      <CheckCircleIcon className="w-5 h-5 fill-none" />
    </div>
  );
};

const SummaryStatusCard: FC<{ card: SummaryCard }> = ({ card }) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between h-full">
      <div className="flex justify-between items-start">
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-700 mb-1">
            {card.title}
          </span>
          <p className="text-xs text-gray-500">{card.detail}</p>
        </div>
        <StatusIndicator status={card.status} />
      </div>
    </div>
  );
};

const VerificationItem: FC<{ check: VerificationCheck }> = ({ check }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-shadow duration-200">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4 flex-1 min-w-0 pr-4">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round">
              <path d={check.iconPath} />
            </svg>
          </div>

          <div className="flex flex-col text-sm text-gray-500 truncate">
            <span className="text-base font-semibold text-gray-800 truncate">
              {check.title}
            </span>
            <span className="text-xs">{check.subtitle}</span>
          </div>
        </div>

        {check.isVerified && (
          <div className="inline-flex items-center rounded-full px-3 py-0.5 text-xs font-medium bg-green-100 text-green-700">
            Verified
          </div>
        )}
      </div>
    </div>
  );
};

const KYC: FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8 font-sans">
      <header className="mb-8 md:mb-10 max-w-5xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          KYC & Verification Status
        </h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 md:mb-8 max-w-5xl mx-auto">
        {mockSummaryCards.map((card) => (
          <SummaryStatusCard key={card.id} card={card} />
        ))}
      </div>

      <main className="space-y-4 mb-8 max-w-5xl mx-auto">
        {mockVerificationChecks.map((check) => (
          <VerificationItem key={check.id} check={check} />
        ))}
      </main>

      <footer className="flex space-x-3 max-w-5xl mx-auto">
        <button className="flex items-center bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-gray-300">
          <ViewIcon className="w-5 h-5 mr-2" />
          View Full Report
        </button>

        <button className="flex items-center bg-teal-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-teal-700 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-teal-300">
          <DownloadIcon className="w-5 h-5 mr-2" />
          Download Report
        </button>
      </footer>

      <div className="pb-12"></div>
    </div>
  );
};

export default KYC;
