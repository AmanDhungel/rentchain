"use client";
import {
  Home,
  DollarSign,
  Activity,
  ShieldCheck,
  ChevronDown,
  Pencil,
  Mail,
  MapPin,
  Calendar,
  Copy,
  Instagram,
  Linkedin,
  Facebook,
  Phone,
  Star,
  Verified,
  LucideIcon,
  Twitter,
  TrendingUp,
  Shield,
  MoveLeft,
  KeyRound,
  CreditCard,
  Settings,
  File,
} from "lucide-react";
import Image from "next/image";
import React, { FC } from "react";
import { icons } from "@/assets/icons/exports";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Billing from "./Billing";
import Documents from "./Documents";
import KYC from "./KYC";
import Lease from "./Leases";
import Payments from "./Payments";
import Setting from "./Settings";

interface Stat {
  icon: LucideIcon;
  label: string;
  value: string;
  badge: boolean;
  color: string;
}

interface PersonalInfoItem {
  icon: LucideIcon;
  label: string;
  value: string;
  copyable?: boolean;
}

interface LeaseSummary {
  property: string;
  unit: string;
  monthlyRent: string;
  leasePeriod: string;
  securityDeposit: string;
}

interface PaymentPerformance {
  reliability: number;
  onTime: number;
  late: number;
}

interface RatingBreakdownItem {
  stars: number;
  percentage: number;
}

interface TenantRating {
  average: number;
  totalReviews: string;
  breakdown: RatingBreakdownItem[];
}

interface Contact {
  name: string;
  avatar: string;
}

interface Lease {
  name: string;
  status: "Active" | "Completed";
  startDate: string;
  endDate: string;
  monthlyRent: string;
  deposit: string;
}

interface TenantData {
  name: string;
  status: string;
  verified: boolean;
  profileImageUrl: string;
  stats: Stat[];
  personalInfo: PersonalInfoItem[];
  leaseSummary: LeaseSummary;
  payment: PaymentPerformance;
  rating: TenantRating;
  contacts: Contact[];
  leases: Lease[];
}

type TenantProfileProps = {
  data: TenantData;
};

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "blue" | "red";
  className?: string;
}

const Badge: FC<BadgeProps> = ({
  children,
  variant = "default",
  className = "",
}) => {
  let variantClasses = "bg-gray-100 text-gray-800";
  switch (variant) {
    case "success":
      variantClasses = "bg-green-100 text-green-700 font-semibold";
      break;
    case "blue":
      variantClasses = "bg-blue-100 text-blue-700 font-semibold";
      break;
    case "red":
      variantClasses = "bg-red-100 text-red-700 font-semibold";
      break;
  }
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variantClasses} ${className}`}>
      {children}
    </span>
  );
};

const Progress: FC<{ value: number; className?: string }> = ({
  value,
  className = "",
}) => (
  <div
    className={`relative h-2 w-full overflow-hidden rounded-full bg-gray-200 ${className}`}>
    <div
      className="h-full bg-orange-500 transition-all duration-500"
      style={{ width: `${value}%` }}
    />
  </div>
);

const tenantData: TenantData = {
  name: "Michael Walker",
  status: "Tenant Profile Management",
  verified: true,
  profileImageUrl: "https://placehold.co/100x100/f97316/ffffff?text=MW",
  stats: [
    {
      icon: Home,
      label: "Active Leases",
      value: "1",
      badge: true,
      color: "blue-500",
    },
    {
      icon: DollarSign,
      label: "Total Paid",
      value: "$7,850",
      badge: false,
      color: "green-500",
    },
    {
      icon: TrendingUp,
      label: "Payment Reliability",
      value: "75%",
      badge: false,
      color: "purple-500",
    },
    {
      icon: Shield,
      label: "KYC Status",
      value: "Verified",
      badge: false,
      color: "red-500",
    },
  ],
  personalInfo: [
    { icon: Phone, label: "Phone", value: "+1 (555) 123-4567" },
    { icon: Mail, label: "Email", value: "lorem@example.com", copyable: true },
    {
      icon: MapPin,
      label: "Current Address",
      value: "Skyline Towers - Apt 4B",
    },
    { icon: Calendar, label: "Tenant Since", value: "24 July 2024, 11:45 pm" },
  ],
  leaseSummary: {
    property: "Skyline Towers",
    unit: "Apt 4B",
    monthlyRent: "$2500",
    leasePeriod: "2024-01-01 2025-12-31",
    securityDeposit: "$5000",
  },
  payment: {
    reliability: 75,
    onTime: 3,
    late: 1,
  },
  rating: {
    average: 4.5,
    totalReviews: "2,256,896",
    breakdown: [
      { stars: 5, percentage: 70 },
      { stars: 4, percentage: 15 },
      { stars: 3, percentage: 5 },
      { stars: 2, percentage: 5 },
      { stars: 1, percentage: 5 },
    ],
  },
  contacts: [
    {
      name: "Sharon Roy",
      avatar: "https://placehold.co/40x40/FFD700/000000?text=SR",
    },
    {
      name: "Vaughan Lewis",
      avatar: "https://placehold.co/40x40/ADD8E6/000000?text=VL",
    },
  ],
  leases: [
    {
      name: "Skyline Towers - Apt 4B",
      status: "Active",
      startDate: "2024-01-01",
      endDate: "2025-12-31",
      monthlyRent: "$2500",
      deposit: "$5000",
    },
    {
      name: "Downtown Lofts - Loft 12",
      status: "Completed",
      startDate: "2024-01-01",
      endDate: "2025-12-31",
      monthlyRent: "$2500",
      deposit: "$5000",
    },
  ],
};

interface InfoItemProps {
  Icon: LucideIcon;
  label: string;
  value: string;
  copyable?: boolean;
  className?: string;
}

const InfoItem: FC<InfoItemProps> = ({
  Icon,
  label,
  value,
  copyable = false,
  className = "",
}) => (
  <div className={`flex  items-center  justify-between text-sm ${className}`}>
    <div className="flex items-center text-gray-500">
      <Icon className="h-4 w-4 mr-3" />
      {label}
    </div>
    <div className="flex items-center font-medium text-gray-900">
      <span>{value}</span>
      {copyable && (
        <Copy
          className="h-3 w-3 ml-2 text-gray-400 hover:text-gray-600 cursor-pointer"
          onClick={() => {
            const tempInput = document.createElement("textarea");
            tempInput.value = value;
            document.body.appendChild(tempInput);
            tempInput.select();
            document.execCommand("copy");
            document.body.removeChild(tempInput);
          }}
        />
      )}
    </div>
  </div>
);

const StatCard: FC<Stat> = ({ icon: Icon, label, value, color }) => {
  return (
    <Card className="flex h-24 items-start justify-center p-4">
      <div className="flex items-center">
        <div className={`text-${color}`}>
          <Icon className="h-8 w-8" />
        </div>
        <div className="-mt-3 ml-2">
          <div
            className={`text-sm text-white py-1 px-4 rounded-md mt-1 bg-${color}`}>
            {label}
          </div>
          <div className="text-xl  text-gray-900 ml-2">{value}</div>
        </div>
      </div>
    </Card>
  );
};

const RatingBar: FC<RatingBreakdownItem> = ({ stars, percentage }) => (
  <div className="flex items-center space-x-2">
    <span className="text-xs text-gray-500 w-2">{stars}</span>
    <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
    <Progress value={percentage} className="grow h-1.5" />
    <span className="text-xs font-medium text-gray-700 w-8 text-right">
      {percentage}%
    </span>
  </div>
);

const ProfileSidebar: React.FC<TenantProfileProps> = ({
  data,
}: {
  data: TenantData;
}) => (
  <div className="space-y-6">
    <Card className="overflow-hidden pt-0">
      <div
        className={`h-24 w-full p-0 bg-cover bg-[url('@/assets/tenant-profile-img.png')]`}></div>
      <div className="p-6 pt-0 flex flex-col items-center -mt-12">
        <Avatar className="w-24 h-24 rounded-full border-4 border-white object-cover shadow-lg">
          <AvatarImage src={data.profileImageUrl} alt={data.name} />
          <AvatarFallback className="bg-gray-400 text-white font-medium">
            {data.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="flex items-center mt-3">
          <h1 className="text-xl font-bold">{data.name}</h1>
          <Verified className="h-4 w-4 text-green-500 ml-2" />
        </div>
        <p className="text-sm text-gray-500">{data.status}</p>
      </div>
    </Card>

    <Card className="-mt-10 rounded-t-none">
      <CardHeader className="flex flex-row justify-between items-center pb-3">
        <CardTitle>Personal Information</CardTitle>
        <div className="flex space-x-2 text-gray-500">
          <Pencil className="h-4 w-4 cursor-pointer" />
          <ChevronDown className="h-4 w-4 cursor-pointer" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {data.personalInfo.map((item, index) => (
          <InfoItem
            key={index}
            Icon={item.icon}
            label={item.label}
            value={item.value}
            copyable={item.copyable}
          />
        ))}
      </CardContent>
    </Card>

    <Card className="-mt-10 rounded-t-none">
      <CardHeader className="flex flex-row justify-between items-center pb-3">
        <CardTitle>Current Lease Summary</CardTitle>
        <div className="flex space-x-2 text-gray-500">
          <Pencil className="h-4 w-4 cursor-pointer" />
          <ChevronDown className="h-4 w-4 cursor-pointer" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        {(
          Object.entries(data.leaseSummary) as [keyof LeaseSummary, string][]
        ).map(([key, value]) => (
          <div key={key} className="flex justify-between items-center">
            <span className="text-gray-500 capitalize">
              {key.replace(/([A-Z])/g, " $1").trim()}
            </span>
            <span className="font-medium text-gray-900">{value}</span>
          </div>
        ))}
      </CardContent>
    </Card>

    <Card className="-mt-10 rounded-t-none">
      <CardHeader className="flex flex-row justify-between items-center pb-3">
        <CardTitle>Payment Performance</CardTitle>
        <div className="flex space-x-2 text-gray-500">
          <Pencil className="h-4 w-4 cursor-pointer" />
          <ChevronDown className="h-4 w-4 cursor-pointer" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium">Payment Reliability</span>
            <span className="text-sm font-semibold text-orange-500">
              {data.payment.reliability}%
            </span>
          </div>
          <Progress value={data.payment.reliability} />
        </div>
        <div className="flex justify-start space-x-4">
          <Badge variant="success">
            {data.payment.onTime} On-Time Payments
          </Badge>
          <Badge variant="red">{data.payment.late} Late Payments</Badge>
        </div>
      </CardContent>
    </Card>

    <Card className="-mt-10 rounded-t-none">
      <CardHeader className="pb-3">
        <CardTitle>Tenant Rating</CardTitle>
        <p className="text-xs text-gray-500">
          Rating and reviews are verified and are from people who live here.
        </p>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4">
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold text-gray-900">
              {data.rating.average}
            </span>
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(data.rating.average) ? "fill-current" : ""
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500 mt-1">
              {data.rating.totalReviews}
            </span>
          </div>
          <div className="grow space-y-1">
            {data.rating.breakdown.map((item, index) => (
              <RatingBar
                key={index}
                stars={item.stars}
                percentage={item.percentage}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>

    <Card className="-mt-10 rounded-t-none">
      <CardHeader className="flex flex-row justify-between items-center pb-3">
        <CardTitle>Contact</CardTitle>
        <Button
          variant="link"
          size="sm"
          className="text-orange-500 hover:text-orange-600 p-0 h-auto">
          Add New
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {data.contacts.map((contact, index) => (
          <div key={index} className="flex items-center space-x-3">
            <Avatar className="w-8 h-8 rounded-full object-cover">
              <AvatarImage src={contact.avatar} alt={contact.name} />
              <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">{contact.name}</span>
          </div>
        ))}
      </CardContent>
    </Card>

    <Card className="-mt-10 rounded-t-none">
      <CardHeader className="flex flex-row justify-between items-center pb-3">
        <CardTitle>Social Links</CardTitle>
        <div className="flex space-x-2 text-gray-500">
          <Pencil className="h-4 w-4 cursor-pointer" />
          <ChevronDown className="h-4 w-4 cursor-pointer" />
        </div>
      </CardHeader>
      <CardContent className="flex space-x-4">
        <Image
          src={icons.Instagram}
          alt="Instagram"
          width={500}
          height={500}
          className="w-10 h-10"
        />
        <Image
          src={icons.Twitter}
          alt="Twitter"
          width={500}
          height={500}
          className="w-10 h-10"
        />
        <Image
          src={icons.Whatsapp}
          alt="Whatsapp"
          width={500}
          height={500}
          className="w-10 h-10"
        />
        <Image
          src={icons.Pintrest}
          alt="Whatsapp"
          width={500}
          height={500}
          className="w-10 h-10"
        />
        <Image
          src={icons.LinkedIn}
          alt="Linkedin"
          width={500}
          height={500}
          className="w-10 h-10"
        />
        <Image
          src={icons.Facebook}
          alt="Facebook"
          width={500}
          height={500}
          className="w-10 h-10"
        />
      </CardContent>
    </Card>
  </div>
);

const MainContent: React.FC<TenantProfileProps> = ({ data }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {data.stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>

    <Tabs defaultValue="leases" className="space-y-4">
      <TabsList className="w-full flex justify-between border-b border-gray-200 rounded-none bg-transparent p-0">
        <TabsTrigger
          value="leases"
          className="text-gray-600 data-[state=active]:border-b-2 data-[state=active]:border-b-orange-600 data-[state=active]:text-orange-600 data-[state=active]:shadow-none rounded-none">
          <KeyRound className="-rotate-45" /> Leases
        </TabsTrigger>
        <TabsTrigger
          value="payments"
          className="text-gray-600 data-[state=active]:border-b-2 data-[state=active]:border-b-orange-600 data-[state=active]:text-orange-600 data-[state=active]:shadow-none rounded-none">
          <Image src={icons.CreditScore} alt="Credit Card" /> Payments
        </TabsTrigger>
        <TabsTrigger
          value="kyc"
          className="text-gray-600 data-[state=active]:border-b-2 data-[state=active]:border-b-orange-600 data-[state=active]:text-orange-600 data-[state=active]:shadow-none rounded-none">
          <Image src={icons.FilePresent} alt="RequestQuote" /> KYC
        </TabsTrigger>
        <TabsTrigger
          value="documents"
          className="text-gray-600 data-[state=active]:border-b-2 data-[state=active]:border-b-orange-600 data-[state=active]:text-orange-600 data-[state=active]:shadow-none rounded-none">
          <Image src={icons.Description} alt="Description" />
          Documents
        </TabsTrigger>
        <TabsTrigger
          value="billing"
          className="text-gray-600 data-[state=active]:border-b-2 data-[state=active]:border-b-orange-600 data-[state=active]:text-orange-600 data-[state=active]:shadow-none rounded-none">
          {/* <Image
            src={icons.RequestQuote}
            alt="Description"
            className="w-5 h-5"
          />{" "} */}
          <div>
            <File />
            <DollarSign size={1} className="w-1 h-1 bottom-2.5" />
          </div>
          Billing
        </TabsTrigger>
        <TabsTrigger
          value="settings"
          className="text-gray-600 data-[state=active]:border-b-2 data-[state=active]:border-b-orange-600 data-[state=active]:text-orange-600 data-[state=active]:shadow-none rounded-none">
          <Settings />
          Settings
        </TabsTrigger>
      </TabsList>

      <TabsContent value="leases">
        <Lease />
      </TabsContent>
      <TabsContent value="payments">
        <Payments />
      </TabsContent>
      <TabsContent value="kyc">
        <KYC />
      </TabsContent>
      <TabsContent value="documents">
        <Documents />
      </TabsContent>
      <TabsContent value="billing">
        <Billing />
      </TabsContent>
      <TabsContent value="settings">
        <Setting />
      </TabsContent>
    </Tabs>
  </div>
);

const TenantProfile: FC = () => {
  const data: TenantData = tenantData;

  return (
    <div className="min-h-screen pl-0 md:pl-0  p-4 md:p-8 font-sans">
      <div className="flex justify-between items-center mb-10 ">
        <h1 className="flex gap-2">
          <MoveLeft /> Companies
          <span className="text-gray-400"> / BrightWave Innovations </span>
        </h1>
        <div className="flex gap-2 pt-0 -mt-5">
          <Button className="mt-4 h-10 bg-orange-500 hover:bg-orange-600 text-white">
            <Image
              src={icons.RoundedPlusIcon}
              alt="back"
              width={20}
              height={20}
            />{" "}
            Add Deal
          </Button>
          <Button className="mt-4 h-10 bg-black text-white">
            <Mail /> Send Email
          </Button>
        </div>
      </div>
      <div className="mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <ProfileSidebar data={data} />
        </div>

        <div className="lg:col-span-2">
          <MainContent data={data} />
        </div>
      </div>

      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-t shadow-2xl flex justify-around space-x-4">
        <Button variant="secondary" className="w-full">
          Share
        </Button>
        <Button variant="default" className="w-full">
          Delete
        </Button>
      </div>
    </div>
  );
};

export default TenantProfile;
