"use client";
import {
  ArrowLeft,
  User,
  Check,
  X,
  Eye,
  Verified,
  AlertTriangle,
  LucideIcon,
} from "lucide-react";
import React, { useState, useCallback } from "react";
import { Button, Card } from "../../ui";
import { Badge } from "../../ui/badge";
import { Textarea } from "../../ui/textarea";
import Link from "next/link";

// const Badge = ({ children, variant, className = "" }) => {
//   let style =
//     "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors";

//   switch (variant) {
//     case "success":
//       style +=
//         " border-transparent bg-green-500 text-white hover:bg-green-500/80";
//       break;
//     case "destructive":
//       style += " border-transparent bg-red-500 text-white hover:bg-red-500/80";
//       break;
//     case "outline":
//       style += " border border-gray-300 bg-white text-gray-700";
//       break;
//     case "verified":
//       style += " border-transparent bg-green-100 text-green-700 font-medium";
//       break;
//     case "high-priority":
//       style +=
//         " border-transparent bg-red-600 text-white font-medium shadow-md";
//       break;
//     default:
//       style += " bg-gray-100 text-gray-800";
//       break;
//   }

//   return <div className={`${style} ${className}`}>{children}</div>;
// };

// const Button = ({
//   children,
//   variant = "default",
//   size = "default",
//   onClick,
//   className = "",
//   disabled = false,
// }) => {
//   let baseStyle =
//     "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50";
//   let sizeStyle = size === "sm" ? "h-9 px-4" : "h-10 py-2 px-4";
//   let variantStyle = "";

//   switch (variant) {
//     case "outline":
//       variantStyle =
//         "border border-input bg-background hover:bg-accent hover:text-accent-foreground";
//       break;
//     case "destructive":
//       variantStyle =
//         "bg-red-600 text-white shadow-md hover:bg-red-700 focus-visible:ring-red-500";
//       break;
//     case "success":
//       variantStyle =
//         "bg-green-500 text-white shadow-md hover:bg-green-600 focus-visible:ring-green-500";
//       break;
//     case "secondary":
//       variantStyle = "bg-gray-600 text-white shadow-md hover:bg-gray-700";
//       break;
//     case "ghost":
//       variantStyle = "hover:bg-gray-100 text-gray-700";
//       break;
//     case "default":
//     default:
//       variantStyle = "bg-black text-white shadow-md hover:bg-gray-800/90";
//       break;
//   }

//   return (
//     <button
//       className={`${baseStyle} ${sizeStyle} ${variantStyle} ${className}`}
//       onClick={onClick}
//       disabled={disabled}>
//       {children}
//     </button>
//   );
// };

const Alert = ({
  variant,
  icon: Icon,
  title,
  children,
  className = "",
}: {
  variant: "success" | "destructive" | "";
  icon?: LucideIcon;
  title?: string;
  children: React.ReactNode;
  className?: string;
}) => {
  let colorClass = "";
  switch (variant) {
    case "success":
      colorClass = "bg-green-50 border-green-200 text-green-700";
      break;
    case "destructive":
      colorClass = "bg-red-50 border-red-200 text-red-700";
      break;
    default:
      colorClass = "bg-orange-50 border-orange-200 text-orange-700";
      break;
  }

  return (
    <div
      className={`p-4 border rounded-xl flex items-start space-x-3 ${colorClass} ${className}`}>
      {Icon && <Icon className="h-5 w-5 shrink-0 mt-0.5" />}
      <div>
        {title && <h5 className="text-sm font-semibold">{title}</h5>}
        <div className="text-sm">{children}</div>
      </div>
    </div>
  );
};

// --- MOCK DATA ---

const requestData = {
  requestID: "SR-2024-101",
  tenantName: "Alex Chen",
  tenantID: "T2023-04A",
  dateSubmitted: "1/14/2024",
  priority: "High",
  status: "Pending", // 'Pending', 'Approved', 'Rejected'

  // Overview
  occupantName: "Lisa Chen",
  relationship: "Sister",
  requestType: "short-term",
  checkInDate: "Saturday, January 20, 2024",
  checkOutDate: "Saturday, February 3, 2024",
  duration: "2 weeks",
  property: "Metro Heights",
  unit: "Room 3A",
  reason:
    "Temporary visit while apartment hunting in the city. Need temporary accommodation during the search process.",
  documents: [
    { name: "Government ID", status: "verified", uploaded: "1/14/2024" },
    { name: "Travel Itinerary", status: "verified", uploaded: "1/14/2024" },
  ],
  terms: {
    charges: "$25/night",
    cleaningFee: "Required",
    houseRules: [
      "Respect quiet hours: 10:00 PM – 8:00 AM",
      "Keep common areas clean",
      "No overnight guests",
      "Check-out by 11:00 AM on departure",
    ],
    utilities: "Included",
    securityDeposit: "Not required",
  },

  // Occupant Info
  occupantInfo: {
    fullName: "Lisa Chen",
    dob: "7/22/1992",
    nationality: "Canadian Citizen",
    idNumber: "PP987654321",
    phone: "+1 (555) 123-4567",
    email: "lorem@email.com",
    occupation: "Marketing Consultant",
    employer: "Freelance",
  },
  emergencyContact: {
    name: "David Chen",
    relationship: "Father",
    phone: "+1 (555) 123-4567",
    address: "456 Maple Ave, Toronto, ON M5V 2A1, Canada",
  },

  // Tenant Info (Alex Chen)
  tenantInfo: {
    id: "WTR-2024-001",
    property: "Sunset Towers",
    leasePeriod: "9/1/2023 – 9/1/2024",
    paymentHistory: "good",
    rentStatus: "current",
    violations: 0,
    standing: true,
  },
};

// --- HELPER COMPONENTS ---

const DetailField = ({
  label,
  value,
  className = "",
}: {
  label: string;
  value: string | React.ReactNode;
  className?: string;
}) => (
  <div className={`flex flex-col ${className}`}>
    <p className="text-sm text-gray-500 font-medium">{label}</p>
    <p className="text-base font-semibold text-gray-800 mt-1">{value}</p>
  </div>
);

const DetailFieldRow = ({
  label,
  value,
  className = "",
}: {
  label: string;
  value: string;
  className?: string;
}) => (
  <div className={`flex justify-between items-start py-3 ${className}`}>
    <p className="text-sm text-gray-500 font-medium w-1/3">{label}</p>
    <p className="text-base font-semibold text-gray-800 w-2/3">{value}</p>
  </div>
);

const TabButton = ({
  tab,
  activeTab,
  onClick,
  children,
}: {
  tab: string;
  activeTab: string;
  onClick: (tab: string) => void;
  children: React.ReactNode;
}) => (
  <button
    onClick={() => onClick(tab)}
    className={`px-4 py-3 text-sm font-medium transition-colors border-b-2
            ${
              activeTab === tab
                ? "border-orange-500 text-orange-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}>
    {children}
  </button>
);

const OverviewContent = () => (
  <div className="space-y-8">
    <Card className="p-5">
      <h3 className="text-lg font-semibold mb-6">Request Summary</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-12">
        <DetailField label="Occupant Name" value={requestData.occupantName} />
        <DetailField label="Relationship" value={requestData.relationship} />
        <DetailField
          label="Request Type"
          value={
            <Badge
              variant="outline"
              className="text-xs bg-orange-50 text-orange-600 border-orange-300">
              short-term
            </Badge>
          }
        />

        <DetailField label="Requesting Tenant" value={requestData.tenantName} />
        <DetailField label="Property" value={requestData.property} />
        <DetailField label="Unit" value={requestData.unit} />

        <DetailField label="Check-in Date" value={requestData.checkInDate} />
        <DetailField label="Check-out Date" value={requestData.checkOutDate} />
        <DetailField label="Duration" value={requestData.duration} />
      </div>

      <div className="mt-6 border-t pt-6">
        <DetailField
          label="Reason for Request"
          value={requestData.reason}
          className="col-span-3"
        />
      </div>
    </Card>

    {/* Submitted Documents */}
    <Card className="p-5">
      <h3 className="text-lg font-semibold mb-4">
        Submitted Documents ({requestData.documents.length})
      </h3>
      {requestData.documents.map((doc, index) => (
        <div
          key={index}
          className="flex justify-between items-center py-3 border-b last:border-b-0">
          <div>
            <p className="font-medium text-gray-800">{doc.name}</p>
            <div className="flex items-center space-x-2 mt-1">
              <Badge variant="verified">
                <Verified className="h-3 w-3 mr-1" /> {doc.status}
              </Badge>
              <p className="text-xs text-gray-500">Uploaded: {doc.uploaded}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => alert(`Viewing document: ${doc.name}`)}>
            <Eye className="h-4 w-4 mr-2" /> View
          </Button>
        </div>
      ))}
    </Card>

    {/* Stay Terms & Conditions */}
    <Card className="p-5">
      <h3 className="text-lg font-semibold mb-6">Stay Terms & Conditions</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-12 mb-6 border-b pb-4">
        <DetailFieldRow
          label="Additional Charges"
          value={requestData.terms.charges}
          className="border-b"
        />
        <DetailFieldRow
          label="Utilities"
          value={requestData.terms.utilities}
          className="border-b"
        />
        <DetailFieldRow
          label="Cleaning Fee"
          value={requestData.terms.cleaningFee}
        />
        <DetailFieldRow
          label="Security Deposit"
          value={requestData.terms.securityDeposit}
        />
      </div>

      <h4 className="font-semibold text-gray-800 mb-3">House Rules</h4>
      <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 pl-4">
        {requestData.terms.houseRules.map((rule, index) => (
          <li key={index}>{rule}</li>
        ))}
      </ul>
    </Card>
  </div>
);

const OccupantInfoContent = () => (
  <div className="space-y-8">
    {/* Occupant Information */}
    <Card className="p-5">
      <h3 className="text-lg font-semibold mb-6">Occupant Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
        <DetailField
          label="Full Name"
          value={requestData.occupantInfo.fullName}
        />
        <DetailField
          label="Date of Birth"
          value={requestData.occupantInfo.dob}
        />
        <DetailField
          label="Nationality"
          value={requestData.occupantInfo.nationality}
        />
        <DetailField
          label="ID Number"
          value={requestData.occupantInfo.idNumber}
        />

        <DetailField label="Phone" value={requestData.occupantInfo.phone} />
        <DetailField label="Email" value={requestData.occupantInfo.email} />
        <DetailField
          label="Occupation"
          value={requestData.occupantInfo.occupation}
        />
        <DetailField
          label="Employer"
          value={requestData.occupantInfo.employer}
        />
      </div>
    </Card>

    {/* Emergency Contact */}
    <Card className="p-5">
      <h3 className="text-lg font-semibold mb-6">Emergency Contact</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
        <DetailField label="Name" value={requestData.emergencyContact.name} />
        <DetailField
          label="Relationship"
          value={requestData.emergencyContact.relationship}
        />
        <DetailField label="Phone" value={requestData.emergencyContact.phone} />
        <DetailField
          label="Address"
          value={requestData.emergencyContact.address}
        />
      </div>
    </Card>
  </div>
);

const TenantInfoContent = () => (
  <div className="space-y-8">
    {/* Tenant Information */}
    <Card className="p-5">
      <h3 className="text-lg font-semibold mb-6 flex items-center">
        <User className="h-5 w-5 mr-2 text-blue-500" />
        Tenant Information
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 pb-6 border-b">
        <DetailField label="WTR ID" value={requestData.tenantInfo.id} />
        <DetailField
          label="Rent Status"
          value={
            <Badge variant="success" className="bg-green-100 text-green-700">
              current
            </Badge>
          }
        />
        <DetailField label="Property" value={requestData.tenantInfo.property} />
        <DetailField
          label="Violations"
          value={requestData.tenantInfo.violations}
        />
        <DetailField
          label="Lease Period"
          value={requestData.tenantInfo.leasePeriod}
        />
        <DetailField
          label="Payment History"
          value={
            <Badge variant="success" className="bg-blue-100 text-blue-700">
              good
            </Badge>
          }
        />
      </div>

      {requestData.tenantInfo.standing && (
        <Alert variant="success" className="mt-6" icon={Check}>
          <p className="font-semibold text-green-700">
            Tenant in Good Standing
          </p>
          <p className="text-sm text-green-600">
            Eligible for lease renewal with excellent track record.
          </p>
        </Alert>
      )}
    </Card>
  </div>
);

// --- REVIEW & DECISION TAB ---

const ReviewDecisionContent = ({
  setRequestStatus,
  setDecisionState,
  decisionState,
  approvalNotes,
  rejectReason,
  setApprovalNotes,
  setRejectReason,
}: {
  setRequestStatus: (status: string) => void;
  setDecisionState: (state: string) => void;
  decisionState: string;
  approvalNotes: string;
  rejectReason: string;
  setApprovalNotes: (notes: string) => void;
  setRejectReason: (reason: string) => void;
}) => {
  const handleConfirm = (status: string) => {
    if (status === "Approved") {
      setRequestStatus("Approved");
      alert(`Request Approved! Notes: ${approvalNotes}`);
    } else if (status === "Rejected") {
      if (!rejectReason) {
        alert("Please provide a reason for rejection.");
        return;
      }
      setRequestStatus("Rejected");
      alert(`Request Rejected! Reason: ${rejectReason}`);
    }
    setDecisionState("initial"); // Reset state after confirmation
  };

  const handleCancel = () => {
    setDecisionState("initial");
    setApprovalNotes("");
    setRejectReason("");
  };

  let content;

  switch (decisionState) {
    case "approving":
      content = (
        <Card className="p-6 mt-6 border-green-300 border-2">
          <Alert
            variant="success"
            icon={Check}
            className="border-0 bg-transparent p-0">
            <p className="text-lg font-semibold text-green-700">
              You have selected to approve this short-term stay request.
            </p>
          </Alert>

          <div className="mt-6">
            <label className="text-sm font-semibold text-gray-700">
              Comments *
            </label>
            <Textarea
              placeholder="Add any conditions or notes for approval (optional)"
              value={approvalNotes}
              onChange={(e) => setApprovalNotes(e.target.value)}
              className="mt-2"
            />
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <Button
              variant="success"
              className="w-1/2"
              onClick={() => handleConfirm("Approved")}
              disabled={!approvalNotes.trim()}>
              Confirm Approval
            </Button>
            <Button
              variant="secondary"
              className="w-1/2 bg-gray-500 hover:bg-gray-600"
              onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </Card>
      );
      break;

    case "rejecting":
      content = (
        <Card className="p-6 mt-6 border-red-300 border-2">
          <Alert
            variant="destructive"
            icon={X}
            className="border-0 bg-transparent p-0">
            <p className="text-lg font-semibold text-red-700">
              You have selected to reject this short-term stay request.
            </p>
          </Alert>

          <div className="mt-6">
            <label className="text-sm font-semibold text-gray-700">
              Comments *
            </label>
            <Textarea
              placeholder="Please provide a reason for rejection (required)"
              required
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="mt-2"
            />
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <Button
              variant="destructive"
              className="w-1/2"
              onClick={() => handleConfirm("Rejected")}
              disabled={!rejectReason.trim()} // Disable if no rejection reason is provided
            >
              Confirm Rejection
            </Button>
            <Button
              variant="secondary"
              className="w-1/2 bg-gray-500 hover:bg-gray-600"
              onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </Card>
      );
      break;

    case "initial":
    default:
      content = (
        <Card className="p-6 mt-6">
          <h4 className="text-lg font-semibold mb-4 text-gray-900">
            Review Decision
          </h4>
          <Alert variant="" icon={AlertTriangle}>
            Please review all the information carefully before making a decision
            on this short-term stay request.
          </Alert>
          <div className="flex justify-center space-x-4 mt-6">
            <Button
              variant="success"
              className="flex-1 max-w-sm h-12 text-lg rounded-xl shadow-lg"
              onClick={() => setDecisionState("approving")}>
              <Check className="h-5 w-5 mr-3" /> Approve Request
            </Button>
            <Button
              variant="destructive"
              className="flex-1 max-w-sm h-12 text-lg rounded-xl shadow-lg"
              onClick={() => setDecisionState("rejecting")}>
              <X className="h-5 w-5 mr-3" /> Reject Request
            </Button>
          </div>
        </Card>
      );
      break;
  }

  return content;
};

const ShortTermRequestDetail = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [requestStatus, setRequestStatus] = useState(requestData.status);
  const [decisionState, setDecisionState] = useState("initial"); // 'initial', 'approving', 'rejecting'
  const [rejectReason, setRejectReason] = useState("");
  const [approvalNotes, setApprovalNotes] = useState("");

  const renderContent = useCallback(() => {
    switch (activeTab) {
      case "overview":
        return <OverviewContent />;
      case "occupant":
        return <OccupantInfoContent />;
      case "tenant":
        return <TenantInfoContent />;
      case "review":
        return (
          <ReviewDecisionContent
            setRequestStatus={setRequestStatus}
            setDecisionState={setDecisionState}
            decisionState={decisionState}
            approvalNotes={approvalNotes}
            rejectReason={rejectReason}
            setApprovalNotes={setApprovalNotes}
            setRejectReason={setRejectReason}
          />
        );
      default:
        return <OverviewContent />;
    }
  }, [activeTab, decisionState, approvalNotes, rejectReason]);

  return (
    <div className="min-h-screen pl-0 md:pl-0 p-4 md:p-8 font-sans">
      <div className="mx-auto">
        <div className="flex justify-between items-start mb-6 border-b pb-4">
          <div>
            <div className="flex items-center  mb-1">
              <Link href="/occupancy/occupants">
                <ArrowLeft className="h-4 w-4 mr-2" />
              </Link>

              <h1 className="text-2xl font-bold text-gray-900">
                Short-term Stay Request
              </h1>
            </div>
            <p className="text-sm text-gray-500">
              Request from {requestData.tenantName} •{" "}
              {requestData.dateSubmitted}
            </p>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <Badge variant="highpriority">High Priority</Badge>
            {requestStatus !== "Pending" && (
              <Badge
                variant={
                  requestStatus === "Approved" ? "success" : "destructive"
                }
                className="text-base px-4 py-1">
                {requestStatus}
              </Badge>
            )}
          </div>
        </div>

        <div className="flex border-b border-gray-200 mb-8 overflow-x-auto">
          <TabButton
            tab="overview"
            activeTab={activeTab}
            onClick={setActiveTab}>
            Overview
          </TabButton>
          <TabButton
            tab="occupant"
            activeTab={activeTab}
            onClick={setActiveTab}>
            Occupant Info
          </TabButton>
          <TabButton tab="tenant" activeTab={activeTab} onClick={setActiveTab}>
            Tenant Info
          </TabButton>
          <TabButton tab="review" activeTab={activeTab} onClick={setActiveTab}>
            Review & Decision
          </TabButton>
        </div>

        <div>{renderContent()}</div>
      </div>
    </div>
  );
};

export default ShortTermRequestDetail;
