"use client";
import {
  ChevronLeft,
  Pencil,
  Building,
  DollarSign,
  Zap,
  Home,
  ClipboardCheck,
  Handshake,
  LayoutDashboard,
  TabletSmartphone,
  Landmark,
  ConciergeBell,
  ReceiptText,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { Button, Card, CardContent, CardHeader } from "../../ui";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";

type TabKey =
  | "overview"
  | "units"
  | "rent"
  | "utilities"
  | "sla"
  | "compliance";
type BadgeVariant =
  | "status-active"
  | "status-pending"
  | "excellent"
  | "good"
  | "owner"
  | "tenant"
  | "interest"
  | "no-interest"
  | "safety"
  | "insurance"
  | "legal"
  | "utility-pill"
  | "outline-pill"
  | "included"
  | "default";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant;
  className?: string;
  children: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({
  variant = "status-active",
  className,
  children,
  ...props
}) => {
  const variants: Record<BadgeVariant, string> = {
    "status-active": "bg-orange-500 text-white",
    "status-pending": "bg-yellow-500 text-white",
    excellent: "bg-emerald-500 text-white font-normal",
    good: "bg-orange-500 text-white font-normal!",
    owner: "bg-gray-100 text-gray-600 font-normal",
    tenant: "bg-gray-100 text-gray-600 font-normal",
    interest: "bg-orange-600 text-white font-medium",
    "no-interest": "bg-gray-800 text-white font-medium",
    safety: "bg-gray-100 text-gray-700 border border-gray-200",
    insurance: "bg-gray-100 text-gray-700 border border-gray-200",
    legal: "bg-gray-100 text-gray-700 border border-gray-200",
    "utility-pill": "bg-blue-50 text-blue-600 font-medium",
    "outline-pill": "bg-white text-gray-700 border border-gray-300",
    included: "bg-gray-800 text-white font-medium",
    default: "bg-gray-100 text-gray-700",
  };
  return (
    <div
      className={`inline-flex items-center rounded-sm px-3 py-0.5 text-xs font-semibold transition-colors ${variants[variant]} ${className}`}
      {...props}>
      {children}
    </div>
  );
};

const DetailItem: React.FC<{
  label: string;
  value: React.ReactNode;
  className?: string;
}> = ({ label, value, className }) => (
  <div className={`grid grid-cols-2 gap-4 py-3 ${className}`}>
    <div className="text-sm font-medium text-gray-500">{label}</div>
    <div className="text-sm font-medium text-gray-900 justify-self-end text-right">
      {value}
    </div>
  </div>
);

const PropertyHeader: React.FC<{
  agreementId: string;
  propertyName: string;
  status: "Active" | "Pending";
}> = ({ agreementId, propertyName, status }) => {
  const router = useRouter();
  return (
    <div className="flex justify-between items-center pb-4 border-b border-gray-200">
      <div className="flex items-center space-x-3">
        <ChevronLeft
          className="w-5 h-5 text-gray-500 cursor-pointer"
          onClick={() => {
            router.back();
          }}
        />
        <div>
          <h1 className="text-xl font-semibold text-gray-900">{agreementId}</h1>
          <p className="text-sm text-gray-500">{propertyName}</p>
        </div>
      </div>
      <div className="flex space-x-3">
        <Badge
          variant={status === "Active" ? "status-active" : "status-pending"}
          className="h-8 uppercase px-4 py-1">
          {status}
        </Badge>
        <Button variant="outline" size="sm" className="h-8 px-3">
          <Pencil className="w-4 h-4 mr-1.5" /> Edit
        </Button>
      </div>
    </div>
  );
};

const SectionTitle: React.FC<{
  children: React.ReactNode;
  count?: number;
  badgeVariant?: BadgeVariant;
  title?: string;
}> = ({ children, count, title, badgeVariant = "utility-pill" }) => {
  const label = String(children ?? "");
  const firstWord = label.split(" ")[0].toLowerCase();

  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-semibold text-gray-800">{children}</h2>
      {count !== undefined && (
        <Badge variant={badgeVariant}>
          {count} {title ? title : firstWord}
        </Badge>
      )}
    </div>
  );
};

const OverviewTab: React.FC = () => {
  const agreement = {
    startDate: "Feb 1, 2024",
    endDate: "Jan 31, 2025",
    tenantName: "John Smith",
    tenantEmail: "john.smith@email.com",
    ownerName: "Sunset Property Management LLC",
    ownerEmail: "owner@sunsetproperties.com",
    property: "Sunset Towers",
    propertyAddress: "123 Sunset Boulevard, Metro City",
    totalRent: "$25.00/daily",
    paymentDue: "1",
    noticePeriod: "30 days",
    autoRenewal: "Disabled",
    rentEscalation: "3% yearly",
    subleasing: "Yes",
    maxOccupants: "1",
    scope: "Bedspace",
    requiresApproval: "Yes",
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="p-4 pt-6">
          <h3 className="text-base font-medium text-gray-800">
            Agreement Progress
          </h3>
          <div className="flex justify-between text-sm font-medium text-gray-500 pt-2">
            <span>Start: {agreement.startDate}</span>
            <span>End: {agreement.endDate}</span>
          </div>
        </CardHeader>
        <CardContent className="pt-0 px-6 pb-6">
          <div className="h-2 bg-orange-200 rounded-full mb-2">
            <div
              className="h-2 bg-orange-600 rounded-full"
              style={{ width: "100%" }}></div>
          </div>
          <div className="text-center text-sm font-medium text-gray-600">
            100% complete
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-base font-medium text-gray-800">
            Agreement Details
          </h3>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
            <div className="space-y-4 pr-6 border-r border-gray-100 md:border-none">
              <h4 className="text-sm font-semibold text-gray-700">
                Primary Parties
              </h4>
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-900">
                  {agreement.tenantName}
                </p>
                <p className="text-xs text-gray-500">
                  Tenant • {agreement.tenantEmail}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-900">
                  {agreement.ownerName}
                </p>
                <p className="text-xs text-gray-500">
                  Owner • {agreement.ownerEmail}
                </p>
              </div>
            </div>

            {/* Right Column: Property Info */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-gray-700">
                Property Information
              </h4>
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-900">
                  {agreement.property}
                </p>
                <p className="text-xs text-gray-500">
                  {agreement.propertyAddress}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-100 grid grid-cols-2 md:grid-cols-4 gap-4 divide-y md:divide-y-0 md:divide-x divide-gray-100">
            <DetailItem
              label="Total Rent"
              value={agreement.totalRent}
              className="grid-cols-1! md:grid-cols-2! pt-4"
            />
            <DetailItem
              label="Payment Due"
              value={agreement.paymentDue}
              className="grid-cols-1! md:grid-cols-2! pt-4 pl-0 md:pl-4"
            />
            <DetailItem
              label="Notice Period"
              value={agreement.noticePeriod}
              className="grid-cols-1! md:grid-cols-2! pt-4 pl-0 md:pl-4"
            />
            <DetailItem
              label="Auto-Renewal"
              value={agreement.autoRenewal}
              className="grid-cols-1! md:grid-cols-2! pt-4 pl-0 md:pl-4"
            />
            <DetailItem
              label="Rent Escalation"
              value={agreement.rentEscalation}
              className="grid-cols-1! md:grid-cols-2! border-t md:border-t-0 pt-4"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-base font-medium text-gray-800">
            Sub-lease Permissions
          </h3>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DetailItem
            label="Sub-leasing Allowed"
            value={agreement.subleasing}
            className="grid-cols-2! border-b border-gray-100 md:border-none"
          />
          <DetailItem
            label="Maximum Occupants"
            value={agreement.maxOccupants}
            className="grid-cols-2! border-b border-gray-100 md:border-none"
          />
          <DetailItem
            label="Scope"
            value={agreement.scope}
            className="grid-cols-2! border-b border-gray-100 md:border-none"
          />
          <DetailItem
            label="Requires Approval"
            value={agreement.requiresApproval}
            className="grid-cols-2! border-b border-gray-100 md:border-none"
          />
        </CardContent>
      </Card>
    </div>
  );
};

const UnitsSpacesTab: React.FC = () => {
  const unitData = {
    unitId: "Apartment 101",
    unitType: "Bedspace",
    path: "Sunset Towers → Ground Floor → Apartment 101 → Master Bedroom → Bed 1",
    area: "120 sqft",
    capacity: "1 occupants",
    furnishing: "Full-Furnished",
    items: [
      {
        name: "Queen Size Bed",
        type: "Furniture",
        condition: "Excellent",
        responsible: "Owner",
      },
      {
        name: "Study Desk",
        type: "Furniture",
        condition: "Good",
        responsible: "Owner",
      },
      {
        name: "Wall-mounted AC Unit",
        type: "Electronics",
        condition: "Excellent",
        responsible: "Owner",
      },
      {
        name: "Mini Refrigerator",
        type: "Appliance",
        condition: "Good",
        responsible: "Tenant",
      },
    ],
    conditions: [
      { aspect: "Walls", condition: "Excellent" },
      { aspect: "Flooring", condition: "Good" },
      { aspect: "Plumbing", condition: "Good" },
      { aspect: "Electrical", condition: "Excellent" },
      { aspect: "Windows Doors", condition: "Good" },
      { aspect: "Fixtures", condition: "Excellent" },
    ],
    notes:
      "Newly renovated room with premium finishes. Minor scuff on east wall.",
  };

  const getConditionBadge = (condition: string) => {
    if (condition === "Excellent") return "excellent";
    if (condition === "Good") return "good";
    return "default";
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h3 className="text-base font-medium text-gray-800">
            Unit Mappings & Hierarchical Structure
          </h3>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-semibold text-gray-900">
              {unitData.unitId}
            </span>
            <Badge variant="owner" className="uppercase">
              {unitData.unitType}
            </Badge>
          </div>
          <p className="text-sm text-gray-600">{unitData.path}</p>

          <div className="grid grid-cols-3 gap-4 text-sm border-t pt-4">
            <div>
              <div className="text-gray-500">Area:</div>
              <div className="font-semibold text-gray-900">{unitData.area}</div>
            </div>
            <div>
              <div className="text-gray-500">Capacity:</div>
              <div className="font-semibold text-gray-900">
                {unitData.capacity}
              </div>
            </div>
            <div>
              <div className="text-gray-500">Furnishing:</div>
              <div className="font-semibold text-gray-900">
                {unitData.furnishing}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-base font-medium text-gray-800">
            Furnished Items ({unitData.items.length})
          </h3>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {unitData.items.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-3 bg-[#F6F8FF] rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">{item.name}</p>
                  <p className="text-xs text-gray-500">{item.type}</p>
                </div>
                <div className="flex flex-col items-end space-x-2 ">
                  <Badge
                    variant={getConditionBadge(item.condition)}
                    className="uppercase rounded-[5px]! text-white! p-2! px-5!">
                    {item.condition}
                  </Badge>
                  <Badge className="bg-transparent! text-gray-400! uppercase font-normal! text-xs!">
                    {item.responsible}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-base font-medium text-gray-800">
            Condition Report
          </h3>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {unitData.conditions.map((c, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-[#F6F8FF] p-2 py-4! rounded-sm  pb-2">
                <span className="text-sm text-gray-700 font-bold">
                  {c.aspect}:
                </span>
                <Badge
                  variant={getConditionBadge(c.condition)}
                  className="uppercase px-5 py-2">
                  {c.condition}
                </Badge>
              </div>
            ))}
          </div>
          <div>
            <h4 className="font-medium text-gray-800 mb-1">Notes:</h4>
            <p className="text-sm text-gray-600">{unitData.notes}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const RentDepositsTab: React.FC = () => {
  const rentData = {
    baseRent: "$25.00",
    frequency: "Daily",
    dueDay: "1",
    gracePeriod: "5 days",
    lateFeeType: "Percentage",
    lateFeeCap: "$100.00",
    lateFeeAmount: "5%",
    securityDepositAmount: "$500.00",
    securityDepositDetails:
      "Refundable upon satisfactory condition check and key return",
    securityDepositInterest: "Interest Bearing",
    keyDepositAmount: "$50.00",
    keyDepositDetails: "Refundable upon key return",
    keyDepositInterest: "No Interest",
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h3 className="text-base font-medium text-gray-800">Rent Schedule</h3>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-x-12">
            <DetailItem label="Base Rent" value={rentData.baseRent} />
            <DetailItem label="Frequency" value={rentData.frequency} />
            <DetailItem label="Due Day" value={rentData.dueDay} />
            <DetailItem label="Grace Period" value={rentData.gracePeriod} />
          </div>

          <div className="pt-4 mt-4 border-t border-gray-100">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">
              Late Fee Policy
            </h4>
            <div className="grid grid-cols-2 gap-x-12 bg-[#F6F8FF] p-2 rounded-sm">
              <DetailItem label="Type" value={rentData.lateFeeType} />
              <DetailItem label="Amount" value={rentData.lateFeeAmount} />
              <DetailItem label="Cap" value={rentData.lateFeeCap} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-base font-medium text-gray-800">
            Security Deposits
          </h3>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-start p-4 bg-[#F6F8FF] rounded-lg">
            <div className="space-y-0.5">
              <p className="font-medium text-gray-800">Security Deposit</p>
              <p className="text-sm text-gray-600">
                {rentData.securityDepositDetails}
              </p>
            </div>
            <div className="flex flex-col items-end space-y-1">
              <p className="font-semibold text-lg text-gray-900">
                {rentData.securityDepositAmount}
              </p>
              <Badge variant="interest" className="uppercase">
                {rentData.securityDepositInterest}
              </Badge>
            </div>
          </div>

          <div className="flex justify-between items-start p-4 bg-[#F6F8FF] rounded-lg">
            <div className="space-y-0.5">
              <p className="font-medium text-gray-800">Key Deposit</p>
              <p className="text-sm text-gray-600">
                {rentData.keyDepositDetails}
              </p>
            </div>
            <div className="flex flex-col items-end space-y-1">
              <p className="font-semibold text-lg text-gray-900">
                {rentData.keyDepositAmount}
              </p>
              <Badge variant="no-interest" className="uppercase">
                {rentData.keyDepositInterest}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const UtilitiesTab: React.FC = () => {
  const utilitiesData = [
    {
      name: "Electricity",
      type: "Meter-Based",
      responsibility: "Shared responsibility",
      details: [
        { label: "Sharing", value: "Percentage" },
        { label: "Tenant Share", value: "25%" },
        { label: "Rate", value: "$0.12/kWh" },
        { label: "Deposit Required", value: "$100.00" },
      ],
      badge: "4 utilities",
    },
    {
      name: "Water",
      type: "Fixed-Amount",
      responsibility: "Tenant responsibility",
      details: [{ label: "Fixed Amount", value: "$30.00/month" }],
      badge: "Fixed-Amount",
    },
    {
      name: "Internet",
      type: "Included",
      responsibility: "Owner responsibility",
      details: [],
      badge: "Included",
    },
    {
      name: "Waste Management",
      type: "Per-Unit-Rate",
      responsibility: "Shared responsibility",
      details: [
        { label: "Sharing", value: "Equal-Split" },
        { label: "Rate", value: "$25.00/monthly" },
      ],
      badge: "Per-Unit-Rate",
    },
  ];

  const getUtilityBadgeVariant = (badge: string): BadgeVariant => {
    if (badge === "Included") return "included";
    if (badge === "Fixed-Amount" || badge === "Per-Unit-Rate")
      return "outline-pill";
    return "utility-pill";
  };

  const UtilityCard: React.FC<{
    utility: {
      name: string;
      type: string;
      responsibility: string;
      details: { label: string; value: string }[];
      badge: string;
    };
  }> = ({ utility }) => (
    <Card>
      <CardContent className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div className="space-y-1 mb-4 sm:mb-0">
          <p className="text-lg font-medium text-gray-900">{utility.name}</p>
          <p className="text-sm text-gray-500">
            {utility.type} • {utility.responsibility}
          </p>

          {utility.details.length > 0 && (
            <div
              className={`mt-4 grid grid-cols-2 md:grid-cols-${
                utility.name === "Electricity" ? 3 : 2
              } gap-x-12 gap-y-2 text-sm`}>
              {utility.details.map(
                (detail: { label: string; value: string }, index: number) => (
                  <div key={index}>
                    <span className="text-gray-500 mr-2">{detail.label}:</span>
                    <span className="font-medium text-gray-800">
                      {detail.value}
                    </span>
                  </div>
                )
              )}
            </div>
          )}
        </div>
        {utility.badge && (
          <Badge
            variant={getUtilityBadgeVariant(utility.badge)}
            className="uppercase shrink-0">
            {utility.badge}
          </Badge>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <SectionTitle count={utilitiesData.length}>
        Utility Management
      </SectionTitle>
      <div className="space-y-4">
        {utilitiesData.map((utility, index) => (
          <UtilityCard key={index} utility={utility} />
        ))}
      </div>
    </div>
  );
};

const SLATermsTab: React.FC = () => {
  const services = [
    {
      name: "Maintenance",
      sub: "General maintenance and repair services",
      time: "Business Hours (9 AM - 6 PM)",
      response: "24h",
      resolution: "72h",
      contact: "Maintenance Team",
      phone: "+1234567892",
      escalation: "If not resolved within 72h, escalate to Property Manager",
    },
    {
      name: "Security",
      sub: "24/7 security monitoring and emergency response",
      time: "24/7",
      response: "1h",
      resolution: "2h",
      contact: "Security Desk",
      phone: "+1234567894",
      escalation: "Immediate escalation to security supervisor",
    },
    {
      name: "Cleaning",
      sub: "Common area cleaning and sanitation",
      time: "Daily (8 AM - 10 PM)",
      response: "4h",
      resolution: "8h",
      contact: "Cleaning Supervisor",
      phone: "+1234567895",
      escalation: "Report to facility manager if not addressed",
    },
  ];

  const terms = [
    {
      title: "Termination Clause",
      detail: "Either party may terminate with 30 days written notice.",
    },
    {
      title: "Renewal Terms",
      detail:
        "Agreement automatically renews for additional 30-day periods unless terminated.",
    },
    {
      title: "Modification Policy",
      detail: "Modifications require written consent from both parties.",
    },
    {
      title: "Dispute Resolution",
      detail: "Disputes shall be resolved through binding arbitration.",
    },
    {
      title: "Governing Law",
      detail: "This agreement is governed by State Laws.",
    },
    {
      title: "Force Majeure",
      detail:
        "Neither party liable for delays due to circumstances beyond reasonable control.",
    },
    {
      title: "Privacy Policy",
      detail: "Personal information handled according to Privacy Policy.",
    },
    {
      title: "Data Protection",
      detail:
        "Data protected according to applicable data protection regulations.",
    },
  ];

  const ServiceCard: React.FC<{
    service: {
      name: string;
      sub: string;
      time: string;
      response: string;
      resolution: string;
      contact: string;
      phone: string;
      escalation: string;
    };
  }> = ({ service }) => (
    <Card>
      <CardContent className="p-4 sm:p-6 space-y-4">
        <div className="flex justify-between items-start border-b pb-3">
          <div className="space-y-0.5">
            <p className="text-lg font-medium text-gray-900">{service.name}</p>
            <p className="text-sm text-gray-500">{service.sub}</p>
          </div>
          <Badge
            variant={service.time === "24/7" ? "included" : "outline-pill"}
            className="shrink-0">
            {service.time}
          </Badge>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="space-y-1">
            <div className="text-gray-500">Response Time:</div>
            <div className="font-semibold text-gray-800">
              {service.response}
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-gray-500">Resolution Time:</div>
            <div className="font-semibold text-gray-800">
              {service.resolution}
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-gray-500">Contact:</div>
            <div className="font-semibold text-gray-800">{service.contact}</div>
          </div>
          <div className="space-y-1">
            <div className="text-gray-500">Phone:</div>
            <div className="font-semibold text-gray-800">{service.phone}</div>
          </div>
        </div>

        <div className="text-sm pt-2 border-t border-gray-100">
          <div className="text-gray-500 mb-1">Escalation Procedure:</div>
          <div className="text-gray-800">{service.escalation}</div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">
          Service Level Agreements
        </h3>
        <div className="space-y-4">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">
          Service Level Agreements
        </h3>{" "}
        <Card>
          <CardContent className="p-6 space-y-4">
            {terms.map((term, index) => (
              <div key={index} className="space-y-0.5">
                <p className="font-medium text-gray-800">{term.title}</p>
                <p className="text-sm text-gray-600">{term.detail}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const ComplianceTab: React.FC = () => {
  const complianceData = [
    {
      title: "Fire safety equipment inspection",
      responsibility: "Owner responsibility",
      dueDate: "Jun 30, 2024",
      renewal: "Annually",
      documentation: "Required",
      penalty: "Agreement termination and safety violations",
      category: "Safety",
    },
    {
      title: "Renters insurance coverage",
      responsibility: "Tenant responsibility",
      dueDate: "Feb 15, 2024",
      renewal: "Annually",
      documentation: "Required",
      penalty: "Monthly penalty fee of $25",
      category: "Insurance",
    },
    {
      title: "Occupancy permit compliance",
      responsibility: "Tenant responsibility",
      dueDate: "Every 3 years",
      renewal: "Required",
      documentation: "Required",
      penalty: "",
      category: "Legal",
    },
  ];

  const getComplianceBadge = (category: string): BadgeVariant => {
    if (category === "Safety") return "safety";
    if (category === "Insurance") return "insurance";
    if (category === "Legal") return "legal";
    return "default";
  };

  return (
    <div className="space-y-6">
      <SectionTitle count={complianceData.length} title="requirements">
        Compliance Requirements
      </SectionTitle>
      <div className="space-y-4">
        {complianceData.map((item, index) => (
          <Card key={index}>
            <CardContent className="p-4 sm:p-6 space-y-3">
              <div className="flex justify-between items-start">
                <div className="space-y-0.5">
                  <p className="text-lg font-medium text-gray-900">
                    {item.title}
                  </p>
                  <p className="text-sm text-gray-500">{item.responsibility}</p>
                </div>
                <Badge
                  variant={getComplianceBadge(item.category)}
                  className="shrink-0">
                  {item.category}
                </Badge>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm pt-2 border-t border-gray-100">
                <div className="space-y-1">
                  <div className="text-gray-500">Due Date:</div>
                  <div className="font-medium text-gray-800">
                    {item.dueDate}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-gray-500">Renewal:</div>
                  <div className="font-medium text-gray-800">
                    {item.renewal}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-gray-500">Documentation:</div>
                  <div className="font-medium text-gray-800">
                    {item.documentation}
                  </div>
                </div>
              </div>

              {item.penalty && (
                <div className="text-sm pt-2 border-t border-gray-100">
                  <div className="text-gray-500 mb-1">
                    Penalty for Non-Compliance:
                  </div>
                  <div className="text-gray-800">{item.penalty}</div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const AgreementDetailDashboard: React.FC = () => {
  const tabs: {
    key: TabKey;
    label: string;
    icon: React.ReactNode;
    component: React.ReactNode;
  }[] = [
    {
      key: "overview",
      label: "Overview",
      icon: <LayoutDashboard className="w-4 h-4 mr-2" />,
      component: <OverviewTab />,
    },
    {
      key: "units",
      label: "Units & Spaces",
      icon: <TabletSmartphone className="w-4 h-4 mr-2" />,
      component: <UnitsSpacesTab />,
    },
    {
      key: "rent",
      label: "Rent & Deposits",
      icon: <Landmark className="w-4 h-4 mr-2" />,
      component: <RentDepositsTab />,
    },
    {
      key: "utilities",
      label: "Utilities",
      icon: <ConciergeBell className="w-4 h-4 mr-2" />,
      component: <UtilitiesTab />,
    },
    {
      key: "sla",
      label: "SLA & Terms",
      icon: <Handshake className="w-4 h-4 mr-2" />,
      component: <SLATermsTab />,
    },
    {
      key: "compliance",
      label: "Compliance",
      icon: <ReceiptText className="w-4 h-4 mr-2" />,
      component: <ComplianceTab />,
    },
  ];

  return (
    <div className="min-h-screen bg-white pl-0 md:pl-0 mx-auto p-4 sm:p-6 md:p-8">
      <PropertyHeader
        agreementId="RC-ENH-2024-001"
        propertyName="Sunset Towers"
        status="Active"
      />

      <Tabs defaultValue="overview">
        <div className="mt-4  w-full  flex justify-between">
          <TabsList defaultValue="units" className="w-full bg-white! ">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.key}
                value={tab.key}
                className="shadow-none! rounded-none data-[state=active]:border-b-2 data-[state=active]:text-orange-600 data-[state=active]:border-b-orange-600 border-b-2 border-b-gray-200">
                {tab.icon} {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {tabs.map((tab) => (
          <TabsContent key={tab.key} value={tab.key}>
            {tab.component}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default AgreementDetailDashboard;
