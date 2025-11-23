import React, { FC } from "react";

interface DocumentRecord {
  id: number;
  name: string;
  category: string;
  format: "PDF" | "DOCX" | "JPEG";
  uploadedDate: string;
  // Status can be Verified or Pending
  status: "Verified" | "Pending";
}

interface DocumentCardProps {
  document: DocumentRecord;
}

const mockDocuments: DocumentRecord[] = [
  {
    id: 1,
    name: "Government ID",
    category: "Identity",
    format: "PDF",
    uploadedDate: "2024-01-01",
    status: "Verified",
  },
  {
    id: 2,
    name: "Employment Letter",
    category: "Income Verification",
    format: "PDF",
    uploadedDate: "2024-01-01",
    status: "Verified",
  },
  {
    id: 3,
    name: "Bank Statement",
    category: "Financial",
    format: "PDF",
    uploadedDate: "2024-01-01",
    status: "Verified",
  },
  {
    id: 4,
    name: "Reference Letter",
    category: "References",
    format: "PDF",
    uploadedDate: "2024-01-01",
    status: "Pending",
  },
];

type IconProps = React.SVGProps<SVGSVGElement>;

const UploadIcon: FC<IconProps> = (props) => (
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
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" x2="12" y1="3" y2="15" />
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

const DeleteIcon: FC<IconProps> = (props) => (
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
    <path d="M3 6h18" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
    <path d="M10 11v6" />
    <path d="M14 11v6" />
    <path d="M15 6V4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v2" />
  </svg>
);

const DocumentIcon: FC<IconProps> = (props) => (
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
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
);

const StatusBadge: FC<{ status: DocumentRecord["status"] }> = ({ status }) => {
  const isVerified: boolean = status === "Verified";
  const colorClasses: string = isVerified
    ? "bg-green-100 text-green-700"
    : "bg-orange-100 text-orange-700";

  return (
    <div
      className={`inline-flex items-center rounded-full px-3 py-0.5 text-xs font-medium ${colorClasses}`}>
      {status}
    </div>
  );
};

const DocumentCard: FC<DocumentCardProps> = ({ document }) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 transition-shadow duration-200">
      <div className="flex justify-between items-center">
        <div className="flex items-start space-x-4 flex-1 min-w-0 pr-4">
          <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-50 text-blue-600">
            <DocumentIcon className="w-5 h-5" strokeWidth={2} />
          </div>

          <div className="flex flex-col text-sm text-gray-500 truncate">
            <span className="text-base font-semibold text-gray-800 truncate">
              {document.name}
            </span>
            <div className="text-xs text-gray-600">
              <span className="capitalize">{document.category}</span>
              <span className="mx-2">•</span>
              <span className="uppercase">{document.format}</span>
            </div>
            <span className="text-xs mt-1 text-gray-500">
              Uploaded: {document.uploadedDate}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-5">
          <StatusBadge status={document.status} />

          <div className="flex space-x-2 text-gray-400">
            <button
              className="hover:text-blue-600 transition-colors"
              title="View Document">
              <ViewIcon className="w-4 h-4" />
            </button>
            <button
              className="hover:text-blue-600 transition-colors"
              title="Download Document">
              <DownloadIcon className="w-4 h-4" />
            </button>
            <button
              className="hover:text-red-600 transition-colors"
              title="Delete Document">
              <DeleteIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Documents: FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8 font-sans">
      <header className="flex justify-between items-center mb-8 md:mb-10 max-w-5xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Tenant Documents
        </h1>
        <button className="flex items-center bg-orange-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-orange-600 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-orange-300">
          <UploadIcon className="w-5 h-5 mr-2" />
          Upload Document
        </button>
      </header>

      <main className="space-y-4 max-w-5xl mx-auto">
        {mockDocuments.map((doc) => (
          <DocumentCard key={doc.id} document={doc} />
        ))}
      </main>

      <div className="pb-12"></div>
    </div>
  );
};

export default Documents;
