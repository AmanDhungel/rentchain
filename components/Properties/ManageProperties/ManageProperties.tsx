"use client";
import { DollarSign, Funnel, Search, TriangleAlert, Users } from "lucide-react";
import React, { useMemo, useState } from "react";
import { icons } from "../../../assets/icons/exports";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";

interface Metrics {
  unitsFilledPercent: number;
  units: string;
  monthly: number;
  outstanding: number;
}

interface Property {
  id: string;
  title: string;
  city: string;
  type: string;
  occupancy: string;
  status: "Active" | "Maintenance";
  dueDate: string;
  address: string;
  tags: string[];
  image: string;
  metrics: Metrics;
  tenants: string[];
  messages: number;
  attachments: number;
}

const sampleProperties: Property[] = [
  {
    id: "ST001",
    title: "Sunset Towers",
    city: "Downtown",
    type: "Building",
    occupancy: "Short Term",
    status: "Active",
    dueDate: "2024-04-18",
    address: "123 Main Street, Downtown",
    tags: ["Premium", "Downtown"],
    image:
      "https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=bd5b2f8e3b0f7c1c8f2f12c03a8a4cd8",
    metrics: {
      unitsFilledPercent: 75,
      units: "18/24",
      monthly: 36000,
      outstanding: 2400,
    },
    tenants: [
      "https://randomuser.me/api/portraits/men/31.jpg",
      "https://randomuser.me/api/portraits/women/34.jpg",
      "https://randomuser.me/api/portraits/men/45.jpg",
      "https://randomuser.me/api/portraits/men/55.jpg",
      "https://randomuser.me/api/portraits/women/56.jpg",
      "https://randomuser.me/api/portraits/women/56.jpg",
    ],
    messages: 14,
    attachments: 14,
  },
  {
    id: "ST002",
    title: "Sunset Villas",
    city: "Uptown",
    type: "Building",
    occupancy: "Long Term",
    status: "Maintenance",
    dueDate: "2024-04-18",
    address: "272 Sunset Blvd, Uptown",
    tags: ["Premium"],
    image:
      "https://images.unsplash.com/photo-1505691723518-36a0b6b7d2b8?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=2a2b869d6c9b2d82c7f4e3f3e379f6c1",
    metrics: {
      unitsFilledPercent: 60,
      units: "12/20",
      monthly: 28000,
      outstanding: 5400,
    },
    tenants: [
      "https://randomuser.me/api/portraits/men/22.jpg",
      "https://randomuser.me/api/portraits/women/65.jpg",
      "https://randomuser.me/api/portraits/men/12.jpg",
    ],
    messages: 7,
    attachments: 9,
  },
];

const statusColor = (status: Property["status"]) =>
  status === "Active" ? "bg-green-600" : "bg-red-600";

function formatCurrency(num: number) {
  if (num >= 1000) {
    const k = num / 1000;
    const isWhole = Number.isInteger(k);
    return `$${isWhole ? k.toFixed(0) : k.toFixed(1)}k`;
  }
  return `$${num}`;
}

const Header: React.FC<{
  totalValue: number;
  totalProperties: number;
  completed: number;
  search: string;
  setSearch: (s: string) => void;
  tenents: string[];
}> = ({
  totalValue,
  totalProperties,
  completed,
  search,
  setSearch,
  tenents,
}) => {
  const moreCount = Math.max(0, tenents.length - 4);
  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
      <h2 className="text-lg font-semibold">Properties Portfolio</h2>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span className="text-gray-300">
            <div className="flex items-center -space-x3">
              <div className="flex items-center">
                {tenents.slice(0, 4).map((t, i) => (
                  <Avatar
                    key={t}
                    className={`w-9 h-9 rounded-full border-2 border-white object-cover`}
                    style={{ marginLeft: i === 0 ? 0 : -10 }}>
                    <AvatarImage src={t} alt={t} />
                    <AvatarFallback className="bg-orange-500 text-white">
                      ?
                    </AvatarFallback>
                  </Avatar>
                ))}
                {moreCount > 0 && (
                  <div
                    className="w-9 h-9 z-50 rounded-full border-2 border-white flex items-center justify-center text-xs text-white font-medium"
                    style={{
                      marginLeft: -10,
                      background: "#FF7A3D",
                    }}>
                    +{moreCount}
                  </div>
                )}
              </div>
            </div>
          </span>
          <span>
            Total Value: <strong>${totalValue.toLocaleString()}</strong>
          </span>
          <span className="text-gray-300">|</span>
          <span>{totalProperties} properties found</span>
          <span className="text-gray-300">|</span>
          <span>Completed: {completed}</span>
        </div>

        <div className="ml-4 flex items-center gap-2 border border-gray-300 rounded-md px-3 py-0">
          <Search className="text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Project"
            className=" rounded-md  py-2 bg-white!  focus:outline-none focus:border-none"
          />
        </div>
      </div>
    </div>
  );
};

const Filters: React.FC<{
  filters: FiltersState;
  setFilters: React.Dispatch<React.SetStateAction<FiltersState>>;
  cities: string[];
  types: string[];
}> = ({ filters, setFilters, cities, types }) => {
  return (
    <div className="flex items-center justify-between px-6 py-4">
      <div>
        <span className="text-sm font-medium">Priority</span>
      </div>

      <div className="flex gap-3 items-center">
        <Select
          value={filters.city}
          onValueChange={(value) => setFilters((p) => ({ ...p, city: value }))}>
          <SelectTrigger className="bg-white ring-1 data-placeholder:text-black! ring-gray-200 py-6! w-[170px] rounded-md px-3">
            <SelectValue placeholder="All Cities" />
          </SelectTrigger>
          <SelectContent>
            {cities.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={filters.status}
          onValueChange={(value) =>
            setFilters((p) => ({ ...p, status: value }))
          }>
          <SelectTrigger className="bg-white ring-1 data-placeholder:text-black! ring-gray-200 py-6! w-[170px] rounded-md px-3">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Maintenance">Maintenance</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={filters.type}
          onValueChange={(value) => setFilters((p) => ({ ...p, type: value }))}>
          <SelectTrigger className="bg-white ring-1 data-placeholder:text-black! ring-gray-200 py-6! w-[170px] rounded-md px-3">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>

          <SelectContent>
            {types.map((t) => (
              <SelectItem key={t} value={t}>
                {t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={filters.occupancy}
          onValueChange={(value) =>
            setFilters((p) => ({ ...p, occupancy: value }))
          }>
          <SelectTrigger className="bg-white ring-1 data-placeholder:text-black! ring-gray-200 py-6! w-[170px] rounded-md px-3">
            <SelectValue placeholder="All Occupancy" className="" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="Short Term">Short Term</SelectItem>
            <SelectItem value="Long Term">Long Term</SelectItem>
          </SelectContent>
        </Select>
        <button
          className="px-3 py-3 border border-gray-200 rounded-md flex gap-2"
          onClick={() =>
            setFilters({ city: "", status: "", type: "", occupancy: "" })
          }>
          {" "}
          <Funnel /> Filters
        </button>
      </div>
    </div>
  );
};

type FiltersState = {
  city: string;
  status: string;
  type: string;
  occupancy: string;
};

const PropertyCard: React.FC<{ p: Property }> = ({ p }) => {
  const moreCount = Math.max(0, p.tenants.length - 4);
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
      <div className="flex items-center mb-2">
        <button
          className={`text-black border rounded-md px-3 py-1 mr-2 text-sm`}>
          Lorem Ipsium
        </button>
        <button
          className={`text-white px-3 py-1 rounded-md text-sm flex items-center gap-1 ${statusColor(
            p.status
          )}`}>
          <span className="leading-none items-center text-center w-2 h-2 rounded-full bg-white"></span>
          {p.status}
        </button>
      </div>
      <div className="flex justify-between items-start">
        <div className="flex gap-2 items-center">
          <h3 className="text-sm font-semibold">{p.title}</h3>
        </div>
      </div>

      <div className="mt-3 md:flex md:gap-6">
        <div className="md:w-1/2">
          <Image
            width={500}
            height={500}
            src={p.image}
            alt={p.title}
            className="rounded-lg w-full h-44 object-cover"
          />

          <div className="mt-3 flex items-center justify-between text-sm text-gray-600">
            <div>
              <div className="text-xs text-gray-400">
                Due on :{" "}
                <span className="text-black font-medium">
                  {new Intl.DateTimeFormat("en-GB", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                  }).format(new Date(p.dueDate))}
                </span>
              </div>
              <div className="mt-2 text-sm flex items-center gap-2 text-gray-500">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="opacity-80">
                  <path
                    d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="12"
                    cy="9"
                    r="2.5"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  />
                </svg>
                <span className="">{p.address}</span>
              </div>
            </div>

            <div className="text-right">
              <div className="flex items-center gap-2">
                <Image
                  width={20}
                  height={20}
                  src={icons.PropertiesBuilding}
                  alt="PropertiesBuilding"
                />
                <span className="text-sm">
                  {p.type} · {p.id}
                </span>
              </div>

              <div className="mt-2 flex gap-2">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="border px-2 py-1 rounded-md text-xs bg-white">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="md:w-1/2 mt-4 md:mt-0 flex flex-col justify-between">
          <div className="grid grid-cols-3 gap-4 items-center">
            <div className="text-center">
              <div className="inline-flex items-center justify-center border border-orange-500 bg-orange-50 rounded-xl w-14 h-14">
                <Users className="w-6 h-6 text-orange-500" />
              </div>
              <div className="text-2xl font-semibold mt-1 text-orange-600">
                {p.metrics.unitsFilledPercent}%
              </div>
              <div className="text-xs text-gray-400">{p.metrics.units}</div>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center border border-green-500 bg-green-50 rounded-xl w-14 h-14">
                <div className="text-green-600 font-bold text-lg">
                  <DollarSign className="w-6 h-6" />
                </div>
              </div>
              <div className="text-2xl font-semibold mt-1 text-green-600">
                {formatCurrency(p.metrics.monthly)}
              </div>
              <div className="text-xs text-gray-400">Monthly</div>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center border border-red-500 bg-red-50 rounded-xl w-14 h-14">
                <TriangleAlert className="text-red-600" />
              </div>
              <div className="text-2xl  font-semibold mt-1 text-red-600">
                {formatCurrency(p.metrics.outstanding)}
              </div>
              <div className="text-xs text-gray-400">Outstanding</div>
            </div>
          </div>

          <div className="mt-4">
            <div className="border-t border-gray-200 w-4/5 mx-auto"></div>

            <div className="mt-4 w-4/5 m-auto flex items-center justify-between">
              <div className="flex items-center -space-x3">
                <div className="flex items-center">
                  {p.tenants.slice(0, 4).map((t, i) => (
                    <Avatar
                      key={t}
                      className={`w-9 h-9 rounded-full border-2 border-white object-cover`}
                      style={{ marginLeft: i === 0 ? 0 : -10 }}>
                      <AvatarImage src={t} alt={t} />
                      <AvatarFallback className="bg-orange-500 text-white">
                        ?
                      </AvatarFallback>
                    </Avatar>
                  ))}

                  {moreCount > 0 && (
                    <div
                      className="w-9 h-9 z-50 rounded-full border-2 border-white flex items-center justify-center text-xs text-white font-medium"
                      style={{
                        marginLeft: -10,
                        background: "#FF7A3D",
                      }}>
                      +{moreCount}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-5 text-gray-600">
                <div className="flex items-center gap-2">
                  <Image
                    width={100}
                    height={100}
                    src={icons.PropertiesMessage}
                    alt="messages"
                    className="w-6 h-6"
                  />
                  <span className="text-sm">{p.messages}</span>
                </div>

                <div className="flex items-center gap-2">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M21.44 11.05L12.7 19.79a5 5 0 0 1-7.07-7.07l7.78-7.78a3.5 3.5 0 0 1 4.95 4.95l-7.07 7.07a2.5 2.5 0 1 1-3.54-3.54l6.36-6.36"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-sm">{p.attachments}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ManageProperties: React.FC = () => {
  const [data] = useState<Property[]>(sampleProperties);
  const [search, setSearch] = useState<string>("");
  const [filters, setFilters] = useState<FiltersState>({
    city: "",
    status: "",
    type: "",
    occupancy: "",
  });

  const cities = useMemo(() => [...new Set(data.map((d) => d.city))], [data]);
  const types = useMemo(() => [...new Set(data.map((d) => d.type))], [data]);

  const filtered = useMemo(() => {
    return data.filter((p) => {
      if (filters.city && p.city !== filters.city) return false;
      if (filters.status && p.status !== (filters.status as any)) return false;
      if (filters.type && p.type !== filters.type) return false;
      if (filters.occupancy && p.occupancy !== filters.occupancy) return false;
      if (search && !p.title.toLowerCase().includes(search.toLowerCase()))
        return false;
      return true;
    });
  }, [data, filters, search]);

  return (
    <div className="min-h-screen border border-gray-200 mb-5 rounded-sm">
      <div className=" py-6 space-y-6">
        <Header
          totalValue={8500000}
          totalProperties={data.length}
          completed={40}
          search={search}
          setSearch={setSearch}
          tenents={sampleProperties[0]?.tenants}
        />
        <div className="bg-white rounded-lg">
          <Filters
            filters={filters}
            setFilters={setFilters}
            cities={cities}
            types={types}
          />
          <div className="p-6 space-y-6">
            {filtered.map((p) => (
              <PropertyCard key={p.id} p={p} />
            ))}

            {filtered.length === 0 && (
              <div className="text-center text-gray-500 py-10">
                No properties match filters.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageProperties;
