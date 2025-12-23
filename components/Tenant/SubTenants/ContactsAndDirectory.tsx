import React from "react";
import {
  ArrowLeft,
  Phone,
  MessageSquare,
  Users,
  UserCheck,
  Clock,
  Star,
  UserPlus,
  ClipboardList,
  Mail,
  CheckCircle2,
  CircleCheckBig,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

type ContactRole = "Lessor" | "Building Manager" | "Emergency" | "Subtenant";

interface Contact {
  id: string;
  name: string;
  role: string;
  roleType: ContactRole;
  status: string;
  isOnline: boolean;
  avatarUrl: string;
}

const contacts: Contact[] = [
  {
    id: "1",
    name: "Metro Properties LLC",
    role: "Primary Lessor",
    roleType: "Lessor",
    status: "Online now",
    isOnline: true,
    avatarUrl: "/lessor.jpg",
  },
  {
    id: "2",
    name: "James Wilson",
    role: "Building Manager",
    roleType: "Building Manager",
    status: "2h ago",
    isOnline: false,
    avatarUrl: "/manager.jpg",
  },
  {
    id: "3",
    name: "Emergency Services",
    role: "24/7 Emergency Line",
    roleType: "Emergency",
    status: "Available 24/7",
    isOnline: true,
    avatarUrl: "/emergency.jpg",
  },
  {
    id: "4",
    name: "John Smith",
    role: "Room A Sub-tenant",
    roleType: "Subtenant",
    status: "Online now",
    isOnline: true,
    avatarUrl: "/tenant1.jpg",
  },
  {
    id: "5",
    name: "Sarah Johnson",
    role: "Room B Sub-tenant",
    roleType: "Subtenant",
    status: "1d ago",
    isOnline: false,
    avatarUrl: "/tenant2.jpg",
  },
  {
    id: "6",
    name: "Mike Chen",
    role: "Living Space Sub-tenant",
    roleType: "Subtenant",
    status: "3h ago",
    isOnline: false,
    avatarUrl: "/tenant3.jpg",
  },
];

const ContactCard = ({ contact }: { contact: Contact }) => {
  const badgeStyles: Record<ContactRole, string> = {
    Lessor: "bg-blue-50 text-blue-600 border-blue-100",
    "Building Manager": "bg-green-50 text-green-600 border-green-100",
    Emergency: "bg-red-50 text-red-600 border-red-100",
    Subtenant: "bg-purple-50 text-purple-600 border-purple-100",
  };

  return (
    <Card className="flex flex-row items-center justify-between p-4 mb-3 border-gray-100 shadow-sm rounded-xl">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Avatar className="h-12 w-12 border border-gray-100">
            <AvatarImage src={contact.avatarUrl} alt={contact.name} />
            <AvatarFallback>{contact.name[0]}</AvatarFallback>
          </Avatar>
          {contact.isOnline && (
            <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 border-2 border-white rounded-full" />
          )}
        </div>

        <div className="space-y-0.5">
          <div className="flex items-center gap-1.5">
            <h4 className="font-bold text-[#1e293b] text-base">
              {contact.name}
            </h4>
            <CircleCheckBig color="#F26522" className="h-4 w-4 text-white" />
          </div>
          <p className="text-xs fontmedium text-gray-500">{contact.role}</p>

          <div className="flex items-center gap-2 pt-1">
            <Badge
              variant="outline"
              className={`${
                badgeStyles[contact.roleType]
              } border text-[10px] px-1.5 py-0 font-bold uppercase rounded-md`}>
              {contact.roleType}
            </Badge>
            <span
              className={`text-[11px] font-medium ${
                contact.isOnline ? "text-green-500" : "text-gray-400"
              }`}>
              {contact.status}
            </span>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-lg border-gray-200">
          <Phone className="h-4 w-4 text-gray-600" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-lg border-gray-200">
          <MessageSquare className="h-4 w-4 text-gray-600" />
        </Button>
      </div>
    </Card>
  );
};

export default function ContactsDirectory() {
  return (
    <div className=" mx-auto p-6  min-h-screen font-sans">
      <header className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <ArrowLeft className="h-5 w-5 text-gray-700 cursor-pointer" />
          <h1 className="text-xl font-bold text-[#1e293b]">
            Contacts & Directory
          </h1>
        </div>
        <p className="text-xs text-gray-500 font-medium ml-7">
          Manage tenant relationships
        </p>
      </header>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[
          {
            label: "Total Contacts",
            value: "12",
            icon: <Users className="text-blue-500" />,
          },
          {
            label: "Active Sub-tenants",
            value: "3",
            icon: <UserCheck className="text-green-500" />,
          },
          {
            label: "Pending Invites",
            value: "3",
            icon: <Clock className="text-orange-500" />,
          },
          {
            label: "Avg Rating",
            value: "4.7",
            icon: <Star className="text-yellow-500" />,
          },
        ].map((stat, i) => (
          <Card
            key={i}
            className="p-5 py-10 flex flex-row items-center gap-4 border-none shadow-sm">
            <div className="p-2 bg-gray-50 rounded-lg">{stat.icon}</div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                {stat.label}
              </p>
              <p className="text-2xl font-bold text-[#1e293b]">{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <h3 className="font-bold text-[#1e293b] mb-4 text-sm">Quick Actions</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-10">
        {[
          {
            title: "Invite Sub-tenant",
            sub: "Send invitation link",
            icon: <UserPlus className="text-blue-500" />,
            color: "bg-blue-100",
          },
          {
            title: "Sub-tenants",
            sub: "Manage sub-tenants",
            icon: <Users className="text-green-500" />,
            color: "bg-green-100",
          },
          {
            title: "Invitations",
            sub: "Track invites",
            icon: <Mail className="text-purple-500" />,
            color: "bg-purple-100",
          },
          {
            title: "Reviews",
            sub: "Ratings & feedback",
            icon: <Star className="text-orange-500" />,
            color: "bg-orange-100",
          },
        ].map((action, i) => (
          <Card
            key={i}
            className="p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-white transition-all border-none shadow-sm group">
            <div
              className={`mb-3 p-3 bg-gray-50 rounded-full ${action.color} group-hover:bg-white group-hover:shadow-inner`}>
              {action.icon}
            </div>
            <p className="font-bold text-gray-800 text-sm">{action.title}</p>
            <p className="text-[10px] text-gray-400 font-medium">
              {action.sub}
            </p>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-full justify-start bg-transparent border-b border-gray-200 rounded-none h-auto p-0 mb-6 overflow-x-auto">
          {[
            "All Contacts (6)",
            "Lessor (1)",
            "Building (1)",
            "Sub-tenants (3)",
            "Emergency (1)",
          ].map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab.toLowerCase().split(" ")[0]}
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-orange-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-3 font-semibold text-gray-500 data-[state=active]:text-orange-500 transition-all text-sm">
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all" className="mt-0">
          {contacts.map((c) => (
            <ContactCard key={c.id} contact={c} />
          ))}
        </TabsContent>

        <TabsContent value="lessor" className="mt-0">
          {contacts
            .filter((c) => c.roleType === "Lessor")
            .map((c) => (
              <ContactCard key={c.id} contact={c} />
            ))}
        </TabsContent>

        <TabsContent value="building" className="mt-0">
          {contacts
            .filter((c) => c.roleType === "Building Manager")
            .map((c) => (
              <ContactCard key={c.id} contact={c} />
            ))}
        </TabsContent>

        <TabsContent value="sub-tenants" className="mt-0">
          {contacts
            .filter((c) => c.roleType === "Subtenant")
            .map((c) => (
              <ContactCard key={c.id} contact={c} />
            ))}
        </TabsContent>

        <TabsContent value="emergency" className="mt-0">
          {contacts
            .filter((c) => c.roleType === "Emergency")
            .map((c) => (
              <ContactCard key={c.id} contact={c} />
            ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
