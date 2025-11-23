"use client";
import React, { useState } from "react";
import {
  ArrowLeft,
  Search,
  SlidersHorizontal,
  Plus,
  Star,
  Zap,
  Droplet,
  Gauge,
  Phone,
  Mail,
  Users,
  FileText,
  Clock,
  Briefcase,
  Ticket,
  Calendar,
  Eye,
  Edit,
  MoveLeft,
} from "lucide-react";

// Simulated Shadcn component imports
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { icons } from "@/assets/icons/exports";
import Link from "next/link";

const providerData = {
  name: "City Electric Company",
  type: "Electricity Provider",
  serviceAreas: 3,
  activeAccounts: 1,
  reliability: "99.2%",
  responseTime: "4.5h",
  satisfaction: "4.1",
  customerServiceHours: "Mon-Fri 8AM-6PM, Sat 9AM-3PM",
  phone: "+1 (555) 123-4567",
  email: "lorem@email.com",
};

const utilityAccounts = [
  {
    id: "Sunset Towers Main",
    company: "City Electric Company",
    accountNum: "CEC-789456",
    balance: "$150.00 Credit",
    nextBillDate: "2/1/2024",
    properties: "Sunset Towers",
    meters: 1,
    manager: "John Manager",
    phone: "+1 (555) 123-4567",
    email: "lorem@email.com",
    status: "Active",
  },
  {
    id: "Sunset Towers Water",
    company: "Municipal Water Authority",
    accountNum: "MWA-456789",
    balance: "$125.30 Outstanding",
    nextBillDate: "2/1/2024",
    properties: "Sunset Towers",
    meters: 1,
    manager: null,
    status: "Active",
  },
  {
    id: "Garden View Gas Supply",
    company: "National Gas Company",
    accountNum: "NGC-123456",
    balance: "$125.30 Outstanding",
    nextBillDate: "2/1/2024",
    properties: "Garden View",
    meters: 1,
    manager: null,
    status: "Active",
  },
];

const tariffs = [
  {
    id: "Residential Standard",
    provider: "City Electric Company",
    icon: Zap,
    type: "residential",
    structure: "tiered",
    rates: [
      { range: "First 500 kWh", price: "$0.12 per unit" },
      { range: "501-1000 kWh", price: "$0.15 per unit" },
      { range: "Above 1000 kWh", price: "$0.18 per unit" },
    ],
    fixedCharges: [
      {
        name: "Basic Service Charge",
        fee: "$25.00",
        frequency: "Monthly",
        notes: "Monthly connection fee",
      },
    ],
    effectiveDate: "1/1/2024",
  },
  {
    id: "Standard Water Rate",
    provider: "Municipal Water Authority",
    icon: Droplet,
    type: "residential",
    structure: "tiered",
    rates: [
      { range: "First 15 m³", price: "$2.50 per unit" },
      { range: "Above 15 m³", price: "$3.25 per unit" },
    ],
    fixedCharges: [
      {
        name: "Water Service Fee",
        fee: "$15.00",
        frequency: "Monthly",
        notes: "Monthly service charge",
      },
      {
        name: "Sewer Charge",
        fee: "$20.00",
        frequency: "Monthly",
        notes: "Sewerage treatment fee",
      },
    ],
    effectiveDate: "1/1/2024",
  },
];

const serviceTicketData = {
  id: "CEC-2024-001",
  provider: "City Electric Company",
  subject: "billing inquiry",
  description: "Question about increased charges on latest bill",
  property: "Sunset Towers",
  contact: "+1-555-0456",
  requestedBy: "Property Manager",
  requestDate: "1/15/2024",
  priority: "Medium",
  status: "Acknowledged",
};

const StatusChip = ({
  label,
  color,
}: {
  label: string;
  color: "green" | "blue" | "yellow" | "gray";
}) => {
  const colorMap = {
    green: "bg-green-100 text-green-700",
    blue: "bg-blue-100 text-blue-700",
    yellow: "bg-yellow-100 text-yellow-700",
    gray: "bg-gray-200 text-gray-700",
  };
  return (
    <span
      className={`text-xs font-semibold px-3 py-1 rounded-full ${colorMap[color]} whitespace-nowrap`}>
      {label}
    </span>
  );
};

const ProvidersTab = () => (
  <TabsContent value="providers" className="mt-6 space-y-8">
    <div className="flex justify-between items-center space-x-4">
      <div className="flex bg-[#f6f9ff] shadow-sm p-2 rounded-xl items-center w-full max-w-lg">
        <Search className=" h-5 w-5 text-gray-400" />
        <Input
          placeholder="Search providers..."
          className="pl-10 h-12 shadow-none focus-visible:ring-0"
        />
      </div>
      <Button
        variant="outline"
        className="flex items-center space-x-2 h-10 px-4 rounded-xl text-gray-700">
        <span>Filter</span>
        <SlidersHorizontal className="h-4 w-4" />
      </Button>
    </div>

    <Card className="rounded-xl shadow-lg p-6 border-gray-100">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 flex items-center justify-center rounded-md bg-orange-500/10">
            <Zap className="h-5 w-5 text-orange-600" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              {providerData.name}
            </h2>
            <p className="text-sm text-gray-500">{providerData.type}</p>
          </div>
        </div>
        <div className="flex space-x-2 text-xs font-semibold">
          <StatusChip label="Preferred" color="yellow" />
          <StatusChip label="Active" color="green" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-8 text-sm">
        <div>
          <DetailRow
            label="Service Areas"
            value={`${providerData.serviceAreas} areas`}
          />
          <DetailRow
            label="Active Accounts"
            value={`${providerData.activeAccounts}`}
          />
          <DetailRow
            label="Customer Service"
            value={providerData.customerServiceHours}
            isTime={true}
          />
        </div>
        <div className="mt-4 md:mt-0">
          <DetailRow label="Reliability" value={providerData.reliability} />
          <DetailRow label="Response Time" value={providerData.responseTime} />
          <DetailRow
            label="Satisfaction"
            value={`${providerData.satisfaction} / 5`}
            isRating={true}
          />
        </div>
        <div className="flex flex-col justify-end space-y-2 mt-4 md:mt-0">
          <div className="flex items-center space-x-3 text-gray-600">
            <Phone className="h-4 w-4 text-gray-500" />
            <span>{providerData.phone}</span>
          </div>
          <div className="flex items-center space-x-3 text-gray-600">
            <Mail className="h-4 w-4 text-gray-500" />
            <span>{providerData.email}</span>
          </div>
          <div className="flex items-center space-x-3 text-gray-600">
            <Phone className="h-4 w-4 text-gray-500" />
            <span>{providerData.phone}</span>
          </div>
        </div>
      </div>

      <Separator className="my-6" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button
          variant="outline"
          className="flex items-center space-x-2 h-12 text-gray-800 rounded-xl border-gray-300 hover:bg-gray-50">
          <Ticket className="h-5 w-5" />
          <span>+ Service Ticket</span>
        </Button>
        <Button
          variant="outline"
          className="flex items-center space-x-2 h-12 text-gray-800 rounded-xl border-gray-300 hover:bg-gray-50">
          <FileText className="h-5 w-5" />
          <span>Contract</span>
        </Button>
      </div>
    </Card>
  </TabsContent>
);

const DetailRow = ({
  label,
  value,
  isTime = false,
  isRating = false,
}: {
  label: string;
  value: string;
  isTime?: boolean;
  isRating?: boolean;
}) => (
  <div className="flex justify-between py-1 text-sm">
    <span className="text-gray-500 font-medium">{label}</span>
    <span
      className={`font-semibold text-gray-800 flex items-center ${
        isTime ? "text-right" : ""
      }`}>
      {isRating && (
        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
      )}
      {value}
    </span>
  </div>
);

const AccountsTab = () => (
  <TabsContent value="accounts" className="mt-6 space-y-6">
    {utilityAccounts.map((account) => (
      <Card
        key={account.id}
        className="rounded-xl p-6 border-gray-100 shadow-md">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="text-lg font-bold text-gray-900">{account.id}</h4>
            <p className="text-sm text-gray-500">
              {account.company} &bull; {account.accountNum}
            </p>
          </div>
          <StatusChip label={account.status} color="green" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-12 mt-4 text-sm">
          <div>
            <DetailRow label="Current Balance" value={account.balance} />
            <DetailRow label="Properties" value={account.properties} />
            {account.manager && (
              <DetailRow label="Account Manager" value={account.manager} />
            )}
          </div>
          <div className="md:text-right">
            <DetailRow label="Next Bill Date" value={account.nextBillDate} />
            <DetailRow label="Meters" value={`${account.meters} meter(s)`} />
          </div>
        </div>

        {(account.phone || account.email) && (
          <div className="flex items-center space-x-6 mt-4 pt-4 border-t border-gray-100 text-sm">
            {account.phone && (
              <div className="flex items-center space-x-2 text-gray-600">
                <Phone className="h-4 w-4 text-gray-500" />
                <span>{account.phone}</span>
              </div>
            )}
            {account.email && (
              <div className="flex items-center space-x-2 text-gray-600">
                <Mail className="h-4 w-4 text-gray-500" />
                <span>{account.email}</span>
              </div>
            )}
            {account.phone && (
              <div className="flex items-center space-x-2 text-gray-600">
                <Phone className="h-4 w-4 text-gray-500" />
                <span>{account.phone}</span>
              </div>
            )}
          </div>
        )}
      </Card>
    ))}
  </TabsContent>
);

const TariffsTab = () => (
  <TabsContent value="tariffs" className="mt-6 space-y-6">
    {tariffs.map((tariff) => (
      <Card
        key={tariff.id}
        className="rounded-xl p-6 border-gray-100 shadow-md">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500/10">
              <tariff.icon className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-gray-900">{tariff.id}</h4>
              <p className="text-sm text-gray-500">{tariff.provider}</p>
            </div>
          </div>
          <StatusChip label={tariff.type} color="gray" />
        </div>

        <h5 className="text-sm font-bold text-gray-800 mb-2">
          Rate Structure: {tariff.structure}
        </h5>
        {tariff.rates.map((rate, index) => (
          <div key={index} className="flex justify-between text-sm py-1">
            <span className="text-gray-600">{rate.range}</span>
            <span className="font-semibold text-gray-800">{rate.price}</span>
          </div>
        ))}

        <h5 className="text-sm font-bold text-gray-800 mt-4 mb-2">
          Fixed Charges
        </h5>
        {tariff.fixedCharges.map((charge, index) => (
          <div key={index} className="flex justify-between text-sm py-1">
            <span className="text-gray-600">{charge.name}</span>
            <span className="font-semibold text-gray-800 text-right">
              {charge.fee}
              <span className="block text-xs font-normal text-gray-500">
                {charge.frequency}
              </span>
            </span>
          </div>
        ))}

        <p className="text-xs text-gray-400 mt-4">
          Effective from: {tariff.effectiveDate}
        </p>
      </Card>
    ))}
  </TabsContent>
);

const ServiceTicketsTab = () => (
  <TabsContent value="service-tickets" className="mt-6 space-y-6">
    <div className="flex justify-end">
      <Button className="bg-orange-600 hover:bg-orange-700 text-white shadow-lg shadow-orange-500/30 h-10 px-4 flex items-center space-x-2 rounded-xl">
        <Plus className="h-4 w-4" />
        <span>New Ticket</span>
      </Button>
    </div>

    <h3 className="text-lg font-bold text-gray-800">Service Tickets</h3>

    <Card className="rounded-xl p-6 border-gray-100 shadow-md">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="text-lg font-bold text-gray-900">
            {serviceTicketData.id}
          </h4>
          <p className="text-sm text-gray-500">{serviceTicketData.provider}</p>
        </div>
        <div className="flex space-x-2">
          <StatusChip label={serviceTicketData.priority} color="yellow" />
          <StatusChip label={serviceTicketData.status} color="gray" />
        </div>
      </div>

      <p className="text-base font-semibold text-gray-800">
        {serviceTicketData.subject}
      </p>
      <p className="text-sm text-gray-600 mt-1">
        {serviceTicketData.description}
      </p>

      <Separator className="my-4" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-12 text-sm">
        <div>
          <DetailRow label="Property" value={serviceTicketData.property} />
          <DetailRow label="Contact" value={serviceTicketData.contact} />
        </div>
        <div>
          <DetailRow
            label="Requested By"
            value={serviceTicketData.requestedBy}
          />
          <DetailRow
            label="Request Date"
            value={serviceTicketData.requestDate}
          />
        </div>
      </div>

      <Separator className="my-4" />

      <div className="flex space-x-3">
        <Button
          variant="outline"
          className="flex items-center space-x-2 rounded-xl h-10 text-gray-800 border-gray-300 hover:bg-gray-50">
          <Eye className="h-4 w-4" />
          <span>View Details</span>
        </Button>
        <Button
          variant="outline"
          className="flex items-center space-x-2 rounded-xl h-10 text-gray-800 border-gray-300 hover:bg-gray-50">
          <Edit className="h-4 w-4" />
          <span>Update</span>
        </Button>
      </div>
    </Card>
  </TabsContent>
);

const UtilityProvidersDashboard = () => {
  const [activeTab, setActiveTab] = useState("providers");

  const tabInfo = {
    providers: "3 providers",
    accounts: "3 accounts",
    tariffs: "2 tariffs",
    "service-tickets": "1 active ticket",
  };

  const currentInfo = tabInfo[activeTab] || tabInfo.providers;

  return (
    <div className="min-h-screen w-full font-sans">
      <header className="bg-white p-4 pl-0  sticky top-0 z-10">
        <div className=" mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Link href="/utilities/metersandbilling" className="cursor-pointer">
              <MoveLeft className="h-5 w-5 text-gray-500 cursor-pointer" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Utility Providers
              </h1>
              <p className="text-sm text-gray-500">{currentInfo}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-orange-500 text-white rounded-lg hover:bg-[#2C5966] transition-colors">
              <Image
                alt="RoundedPlusIcon"
                src={icons.RoundedPlusIcon}
                className="scale-200"
              />
              <span>Add Provider</span>
            </button>
          </div>
        </div>
      </header>

      <main className=" mx-auto p-4 pl-0 md:pl-0 md:p-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-transparent h-auto p-0 justify-between border-b border-gray-200 w-full">
            <TabsTrigger
              value="providers"
              className="flex-1 md:flex-none text-base font-semibold data-[state=active]:text-orange-600 data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-b-orange-600 data-[state=active]:bg-transparent py-3 px-6 transition-all rounded-none text-gray-600">
              Providers
            </TabsTrigger>
            <TabsTrigger
              value="accounts"
              className="flex-1 md:flex-none text-base font-semibold data-[state=active]:text-orange-600 data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-b-orange-600 data-[state=active]:bg-transparent py-3 px-6 transition-all rounded-none text-gray-600">
              Accounts
            </TabsTrigger>
            <TabsTrigger
              value="tariffs"
              className="flex-1 md:flex-none text-base font-semibold data-[state=active]:text-orange-600 data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-b-orange-600 data-[state=active]:bg-transparent py-3 px-6 transition-all rounded-none text-gray-600">
              Tariffs
            </TabsTrigger>
            <TabsTrigger
              value="service-tickets"
              className="flex-1 md:flex-none text-base font-semibold data-[state=active]:text-orange-600 data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-b-orange-600 data-[state=active]:bg-transparent py-3 px-6 transition-all rounded-none text-gray-600">
              Service Tickets
            </TabsTrigger>
          </TabsList>

          <ProvidersTab />
          <AccountsTab />
          <TariffsTab />
          <ServiceTicketsTab />
        </Tabs>
      </main>
    </div>
  );
};

export default UtilityProvidersDashboard;
