"use client";
import React, { useState, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Building2,
  MapPin,
  CalendarDays,
  MessageSquare,
  Paperclip,
  MessageCircle,
  Calendar,
} from "lucide-react";
import Image from "next/image";
import { Search, Filter, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { icons } from "@/assets/icons/exports";
import Link from "next/link";

interface PropertyCardProps {
  property: Property;
}
export type PropertyStatus = "Active" | "Inactive" | "Pending";
export type PropertyType = "Apartment" | "House" | "Commercial";
export type OccupancyStatus = "Occupied" | "Vacant";

export interface UserAvatarData {
  id: string;
  src: string;
  fallback: string;
}

export interface Property {
  id: string;
  title: string;
  imageUrl: string;
  status: PropertyStatus;
  type: PropertyType;
  propertyIdStr: string;
  address: string;
  city: string;
  coveragePath: string;
  price: number;
  date: string;
  isSubleaseOk: boolean;
  leaseIdStr: string;
  assignedUsers: UserAvatarData[];
  totalUsersAssigned: number;
  commentsCount: number;
  attachmentsCount: number;
  occupancy: OccupancyStatus;
}

const avatarPool = [
  { id: "u1", src: "https://i.pravatar.cc/150?u=1", fallback: "JD" },
  { id: "u2", src: "https://i.pravatar.cc/150?u=2", fallback: "SM" },
  { id: "u3", src: "https://i.pravatar.cc/150?u=3", fallback: "AJ" },
  { id: "u4", src: "https://i.pravatar.cc/150?u=4", fallback: "RK" },
  { id: "u5", src: "https://i.pravatar.cc/150?u=5", fallback: "TB" },
];

export const propertiesData: Property[] = [
  {
    id: "1",
    title: "Skyline Apartments",
    imageUrl:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1000", // High-rise image
    status: "Active",
    type: "Apartment",
    propertyIdStr: "ST001",
    address: "123 Main Street, Downtown",
    city: "Downtown",
    coveragePath: "Building A → Floor 2 → Unit 2B → Bedroom 1",
    price: 1200,
    date: "12/31/2024",
    isSubleaseOk: true,
    leaseIdStr: "LSE-2024-001",
    assignedUsers: [avatarPool[0], avatarPool[1], avatarPool[2], avatarPool[3]],
    totalUsersAssigned: 7, // Shows 1+ badge
    commentsCount: 14,
    attachmentsCount: 14,
    occupancy: "Occupied",
  },
  {
    id: "2",
    title: "Sunset Villa",
    imageUrl:
      "https://images.unsplash.com/photo-1613977257377-988262976324?auto=format&fit=crop&q=80&w=1000", // House image
    status: "Pending",
    type: "House",
    propertyIdStr: "SV002",
    address: "456 Oak Lane, Suburbia",
    city: "Suburbia",
    coveragePath: "Entire Premise → Main Floor",
    price: 2500,
    date: "01/15/2025",
    isSubleaseOk: false,
    leaseIdStr: "LSE-2025-04B",
    assignedUsers: [avatarPool[4], avatarPool[0]],
    totalUsersAssigned: 2, // No + badge
    commentsCount: 5,
    attachmentsCount: 2,
    occupancy: "Vacant",
  },
  {
    id: "3",
    title: "Tech Hub Office Space",
    imageUrl:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=1000", // Office image
    status: "Active",
    type: "Commercial",
    propertyIdStr: "COM105",
    address: "789 Tech Park Blvd, Uptown",
    city: "Uptown",
    coveragePath: "Building C → Suite 400",
    price: 4500,
    date: "11/30/2024",
    isSubleaseOk: true,
    leaseIdStr: "LSE-2024-CX9",
    assignedUsers: [avatarPool[1], avatarPool[2], avatarPool[3]],
    totalUsersAssigned: 3,
    commentsCount: 22,
    attachmentsCount: 8,
    occupancy: "Occupied",
  },
  {
    id: "4",
    title: "Lakeside Condo",
    imageUrl:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=1000",
    status: "Inactive",
    type: "Apartment",
    propertyIdStr: "LC992",
    address: "32 Lakeview Dr, Downtown",
    city: "Downtown",
    coveragePath: "Tower 1 → Floor 15 → Unit 15A",
    price: 1800,
    date: "10/01/2024",
    isSubleaseOk: false,
    leaseIdStr: "LSE-ARCHIVED",
    assignedUsers: [avatarPool[0]],
    totalUsersAssigned: 1,
    commentsCount: 0,
    attachmentsCount: 1,
    occupancy: "Vacant",
  },
];

const statusColorMap: Record<PropertyStatus, string> = {
  Active: "bg-green-500 hover:bg-green-600",
  Inactive: "bg-gray-500 hover:bg-gray-600",
  Pending: "bg-yellow-500 hover:bg-yellow-600",
};

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const visibleUsers = property.assignedUsers.slice(0, 4);
  const remainingUsersCount = property.totalUsersAssigned - visibleUsers.length;

  return (
    <Link
      href={`/tenant/properties/myrentals/${property.id}`}
      className="bg-white rounded-lg border shadow-sm overflow-hidden flex flex-col md:flex-row">
      <div className="w-full md:w-[70%] relative p-5  md:aspect-auto ">
        <h3 className="text-xl font-bold text-blue-900">{property.title}</h3>
        <Image
          width={400}
          height={400}
          src={property.imageUrl}
          alt={property.title}
          className="object-cover aspect-2/1 w-full inset-0"
        />
      </div>

      <div className="w-full md:w-3/5 p-6 flex flex-col ">
        <div>
          <div className="flex justify-end items-start mb-4">
            <Badge
              className={`${
                statusColorMap[property.status]
              } text-white border-none rounded-sm p-2`}>
              <div className="w-1.5 h-1.5 rounded-full bg-white mr-1.5"></div>
              {property.status}
            </Badge>
          </div>

          {/* Info Rows */}
          <div className="space-y-3 text-sm text-gray-400">
            <div className="flex items-center gap-2 justify-end">
              <div className="flex items-center gap-2">
                <Image src={icons.PropertiesBuilding} alt="building" />
                <span className="">{property.type}</span>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mr-1.5"></div>
              <span className="text-gray-400 font-mono mt-0.5">
                {property.propertyIdStr}
              </span>
            </div>

            <div className="text-xs flex text-gray-500">
              <span className="font-medium">Coverage: </span>
              {property.coveragePath}
              <div className="flex items-center gap-2 ml-7">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span>{property.address}</span>
              </div>
            </div>
          </div>
        </div>

        <div className=" space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-lg font-semibold text-gray-700">
              $ {property.price.toLocaleString()}
              <span className="text-sm font-normal text-gray-500">/month</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="h-4 w-4 text-gray-400" />
              {property.date}
            </div>
          </div>

          <div className="flex justify-end gap-2 text-xs">
            {property.isSubleaseOk && (
              <div className="px-3 py-1 border rounded-sm text-gray-600 ">
                Sublease OK
              </div>
            )}
            <div className="px-3 py-1 border rounded-sm text-gray-500 font-mono ">
              ID: {property.leaseIdStr}
            </div>
          </div>

          <Separator className="my-4" />

          <div className="flex items-center justify-between">
            <div className="flex items-center -space-x-2">
              {visibleUsers.map((user) => (
                <Avatar key={user.id} className="border-2 border-white w-8 h-8">
                  <AvatarImage src={user.src} alt={user.fallback || "User"} />
                  <AvatarFallback>{user.fallback}</AvatarFallback>
                </Avatar>
              ))}
              {remainingUsersCount > 0 && (
                <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-white bg-orange-500 text-xs font-medium text-white z-10">
                  {remainingUsersCount}+
                </div>
              )}
            </div>

            <div className="flex items-center gap-4 text-gray-500">
              <div className="flex items-center gap-1.5">
                <MessageCircle className="h-5 w-5" />
                <span className="text-lg font-semibold">
                  {property.commentsCount}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Paperclip className="h-5 w-5 rotate-45" />
                <span className="text-lg font-semibold">
                  {property.attachmentsCount}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

function MyRentals() {
  const [searchText, setSearchText] = useState("");
  const [cityFilter, setCityFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<PropertyStatus | "all">(
    "all"
  );
  const [typeFilter, setTypeFilter] = useState<PropertyType | "all">("all");
  const [occupancyFilter, setOccupancyFilter] = useState<
    OccupancyStatus | "all"
  >("all");

  const uniqueCities = useMemo(() => {
    const cities = new Set(propertiesData.map((p) => p.city));
    return Array.from(cities);
  }, []);

  const filteredProperties = useMemo(() => {
    return propertiesData.filter((property) => {
      const searchContent =
        `${property.title} ${property.address} ${property.propertyIdStr}`.toLowerCase();
      const matchesSearch = searchContent.includes(searchText.toLowerCase());

      const matchesCity = cityFilter === "all" || property.city === cityFilter;
      const matchesStatus =
        statusFilter === "all" || property.status === statusFilter;
      const matchesType = typeFilter === "all" || property.type === typeFilter;
      const matchesOccupancy =
        occupancyFilter === "all" || property.occupancy === occupancyFilter;

      return (
        matchesSearch &&
        matchesCity &&
        matchesStatus &&
        matchesType &&
        matchesOccupancy
      );
    });
  }, [searchText, cityFilter, statusFilter, typeFilter, occupancyFilter]);

  const totalValue = filteredProperties.reduce(
    (sum, prop) => sum + prop.price,
    0
  );

  return (
    <div className="min-h-screen font-sans">
      <header className="bg-white border-b px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-blue-950">
          Properties Portfolio
        </h1>
        <div className="flex items-center gap-6 text-sm text-gray-600">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              <Avatar className="border-2 border-white w-8 h-8">
                <AvatarImage src="https://i.pravatar.cc/150?u=a" />
                <AvatarFallback>U1</AvatarFallback>
              </Avatar>
              <Avatar className="border-2 border-white w-8 h-8">
                <AvatarImage src="https://i.pravatar.cc/150?u=b" />
                <AvatarFallback>U2</AvatarFallback>
              </Avatar>
              <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-white bg-orange-500 text-xs font-medium text-white z-10">
                1+
              </div>
            </div>
            <div>
              <span className="block font-semibold text-gray-800">
                Total Value: ${totalValue.toLocaleString()}
              </span>
              <span className="text-gray-500">
                {filteredProperties.length} properties found
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="p-6  mx-auto">
        <div className="bg-white p-4 rounded-lg border shadow-sm mb-6 flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="relative w-full lg:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search deposits..."
              className="pl-10 bg-gray-50 border-gray-200"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-3 w-full lg:w-auto justify-end">
            <Select value={cityFilter} onValueChange={setCityFilter}>
              <SelectTrigger className="w-[130px] bg-gray-50 border-gray-200 text-gray-600 font-medium">
                <SelectValue placeholder="All Cities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cities</SelectItem>
                {uniqueCities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={statusFilter}
              onValueChange={(val) =>
                setStatusFilter(val as PropertyStatus | "all")
              }>
              <SelectTrigger className="w-[130px] bg-gray-50 border-gray-200 text-gray-600 font-medium">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={typeFilter}
              onValueChange={(val) =>
                setTypeFilter(val as PropertyType | "all")
              }>
              <SelectTrigger className="w-[130px] bg-gray-50 border-gray-200 text-gray-600 font-medium">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Apartment">Apartment</SelectItem>
                <SelectItem value="House">House</SelectItem>
                <SelectItem value="Commercial">Commercial</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={occupancyFilter}
              onValueChange={(val) =>
                setOccupancyFilter(val as OccupancyStatus | "all")
              }>
              <SelectTrigger className="w-[150px] bg-gray-50 border-gray-200 text-gray-600 font-medium">
                <SelectValue placeholder="All Occupancy" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Occupancy</SelectItem>
                <SelectItem value="Occupied">Occupied</SelectItem>
                <SelectItem value="Vacant">Vacant</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              className="gap-2 bg-gray-50 border-gray-200 text-gray-600 font-medium">
              <Filter className="h-4 w-4" /> Filters
            </Button>
          </div>
        </div>

        <div className="mb-4">
          <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wide">
            Priority
          </h2>
        </div>

        <div className="space-y-6">
          {filteredProperties.length > 0 ? (
            filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))
          ) : (
            <div className="text-center py-12 text-gray-500 bg-white rounded-lg border">
              No properties found matching filters.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default MyRentals;
