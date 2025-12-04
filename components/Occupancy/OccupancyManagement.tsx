"use client";
import {
  User,
  Timer,
  Check,
  X,
  ArrowLeft,
  Search,
  SlidersHorizontal,
  Trash2,
  LucideIcon,
  Users,
  CircleX,
  TrendingUp,
  Clock4,
} from "lucide-react";

import { useState, useMemo } from "react";
import { Button, Card, Input } from "../ui";
import { Badge } from "../ui/badge";
import { useRouter } from "next/navigation";

const mockRequests = [
  {
    id: 1,
    name: "Michael Johnson",
    spouse: "Sarah Johnson",
    property: "Skyline Apartments",
    unit: "Apt 2B",
    moveInDate: "2/1/2024",
    documents: "3 uploaded",
    reason: "Permanent relocation for work",
    status: "Pending",
    urgency: "Medium",
    dateSubmitted: "1/15/2024",
    term: "long-term",
  },
  {
    id: 2,
    name: "Erica Smith",
    spouse: "David Smith",
    property: "Central Towers",
    unit: "PH12",
    moveInDate: "1/28/2024",
    documents: "5 uploaded",
    reason: "Lease renewal and spouse addition",
    status: "Approved",
    urgency: "Low",
    dateSubmitted: "1/05/2024",
    term: "long-term",
  },
  {
    id: 3,
    name: "Kevin Lee",
    spouse: "N/A",
    property: "Oakwood Lofts",
    unit: "Unit 10A",
    moveInDate: "3/1/2024",
    documents: "1 uploaded",
    reason: "Short-term corporate housing",
    status: "Pending",
    urgency: "High",
    dateSubmitted: "1/20/2024",
    term: "short-term",
  },
  {
    id: 4,
    name: "Jennifer Chen",
    spouse: "Alex Chen",
    property: "Skyline Apartments",
    unit: "Apt 4C",
    moveInDate: "2/15/2024",
    documents: "2 uploaded",
    reason: "Transfer from another unit",
    status: "Rejected",
    urgency: "Medium",
    dateSubmitted: "1/10/2024",
    term: "long-term",
  },
];

const calculateStats = () => {
  const total = mockRequests?.length;
  const pending = mockRequests?.filter(
    (r: { status: string }) => r.status === "Pending"
  ).length;
  const approved = mockRequests?.filter((r) => r.status === "Approved").length;
  const rejected = mockRequests?.filter((r) => r.status === "Rejected").length;

  return [
    {
      title: "Total Requests",
      value: total,
      icon: Users,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      iconBgColor: "bg-blue-100",
    },
    {
      title: "Pending Approval",
      value: pending,
      icon: Clock4,
      color: "text-orange-500",
      bgColor: "bg-orange-50",
      iconBgColor: "bg-orange-100",
    },
    {
      title: "Approved",
      value: approved,
      icon: TrendingUp,
      color: "text-green-500",
      bgColor: "bg-green-50",
      iconBgColor: "bg-green-100",
    },
    {
      title: "Rejected",
      value: rejected,
      icon: CircleX,
      color: "text-red-500",
      bgColor: "bg-red-50",
      iconBgColor: "bg-red-100",
    },
  ];
};

const StatCard = ({
  title,
  value,
  icon: Icon,
  color,
  iconBgColor,
}: {
  title: string;
  value: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  iconBgColor: string;
}) => (
  <Card className="flex justify-between h-full p-4 py-10">
    <div className="flex items-center">
      <div className={`p-2 rounded-sm ${iconBgColor}`}>
        <Icon className={`h-6 w-6 ${color}`} />
      </div>
      <Trash2 className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className={`text-3xl font-bold mt-1 ${color}`}>{value}</p>
      </div>
    </div>
  </Card>
);

const DetailItem = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col my-2">
    <p className="text-sm text-gray-600 font-medium">{label}</p>
    <p className="text-base text-gray-800">{value}</p>
  </div>
);

const RequestDetailCard = ({
  data,
  onUpdateStatus,
}: {
  data: (typeof mockRequests)[0];
  onUpdateStatus: ({
    id,
    newStatus,
  }: {
    id: number;
    newStatus: string;
  }) => void;
}) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pending":
        return <Badge variant="warning">{status}</Badge>;
      case "Approved":
        return <Badge variant="success">{status}</Badge>;
      case "Rejected":
        return <Badge variant="destructive">{status}</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case "Medium":
        return (
          <Badge
            variant="secondary"
            className="bg-orange-100 text-orange-700 border-orange-200">
            {urgency}
          </Badge>
        );
      case "High":
        return (
          <Badge
            variant="destructive"
            className="bg-red-100 text-red-700 border-red-200">
            {urgency}
          </Badge>
        );
      default:
        return <Badge variant="secondary">{urgency}</Badge>;
    }
  };

  const router = useRouter();

  return (
    <Card className="mt-4 p-6 cursor-pointer hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start border-b pb-4 mb-4">
        <div>
          <h4 className="text-xl font-semibold text-gray-900">{data.name}</h4>
          <div className="flex items-center space-x-2 mt-1">
            {getStatusBadge(data.status)}
            {getUrgencyBadge(data.urgency)}
          </div>
          <p className="text-sm text-gray-500 mt-1">Spouse of {data.spouse}</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-gray-800">
            {data.dateSubmitted}
          </p>
          <Badge variant="secondary" className="mt-1 bg-gray-100 text-gray-600">
            {data.term}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4">
        <div className="space-y-3">
          <DetailItem label="Property" value={data.property} />
          <DetailItem label="Move-in Date" value={data.moveInDate} />
          <DetailItem label="Reason" value={data.reason} />
        </div>
        {/* Right Column */}
        <div className="space-y-3">
          <DetailItem label="Unit" value={data.unit} />
          <DetailItem label="Documents" value={data.documents} />
        </div>
      </div>

      <div className="mt-6 pt-4 border-t flex space-x-3">
        <Button
          variant="success"
          size="sm"
          onClick={() => onUpdateStatus({ id: data.id, newStatus: "Approved" })}
          className="rounded-full"
          disabled={data.status === "Approved" ? true : false}>
          <Check className="h-4 w-4 mr-2" /> Approve
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onUpdateStatus({ id: data.id, newStatus: "Rejected" })}
          className="rounded-full"
          disabled={data.status === "Rejected" ? true : false}>
          <X className="h-4 w-4 mr-2" /> Reject
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push(`/occupancy/occupants/${data.name}`)}
          className="rounded-full cursor-pointer">
          Review Details
        </Button>
      </div>
    </Card>
  );
};

const OccupancyManagementDashboard = () => {
  const [requests, setRequests] = useState(mockRequests);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  const filteredRequests = useMemo(() => {
    return requests.filter((request) => {
      const matchesStatus =
        filterStatus === "All" || request.status === filterStatus;

      const lowerSearchTerm = searchTerm.toLowerCase();
      const matchesSearch =
        request.name.toLowerCase().includes(lowerSearchTerm) ||
        request.spouse.toLowerCase().includes(lowerSearchTerm) ||
        request.property.toLowerCase().includes(lowerSearchTerm) ||
        request.unit.toLowerCase().includes(lowerSearchTerm);

      return matchesStatus && matchesSearch;
    });
  }, [requests, searchTerm, filterStatus]);

  const handleUpdateStatus = ({
    id,
    newStatus,
  }: {
    id: number;
    newStatus: string;
  }) => {
    setRequests((prevRequests) =>
      prevRequests.map((req) =>
        req.id === id ? { ...req, status: newStatus } : req
      )
    );
    alert(`${newStatus} request for ID ${id}!`);
  };

  const currentStats = calculateStats();

  const availableStatuses = ["All", "Pending", "Approved", "Rejected"];

  return (
    <div className="min-h-screen p-4 pl-0 md:pl-0 md:p-8 font-sans">
      <div className="flex items-center mb-8">
        <ArrowLeft className="h-5 w-5 text-gray-500 mr-4 cursor-pointer hover:text-gray-700" />
        <div className="flex flex-col ">
          <h1 className="text-2xl font-bold text-gray-900">
            Occupancy Management
          </h1>
          <p className="text-sm text-gray-600">
            Review and approve occupancy requests
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-2 gap-4 mb-8">
        {currentStats.map((stat, index) => (
          <StatCard key={index} {...stat} value={stat?.value?.toString()} />
        ))}
      </div>

      <div className="flex flex-col md:flex-row items-stretch md:items-center space-y-4 md:space-y-0 md:space-x-4 mb-6 relative">
        <div className="flex w-full bg-white border border-gray-300 px-3 py-1 rounded-sm items-center space-x-2 flex-1">
          <Search className="h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search by occupant, tenant, or property name..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300  rounded-xl focus-visible:ring-0 shadow-none text-sm bg-white!"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Button
          variant="outline"
          className="flex items-center rounded-xl border-gray-300 bg-white shadow-sm relative"
          onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}>
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          Filter: {filterStatus}
        </Button>

        {isFilterMenuOpen && (
          <div className="absolute right-0 top-full z-10 mt-2 w-48 rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="py-1">
              {availableStatuses.map((status) => (
                <button
                  key={status}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    filterStatus === status
                      ? "bg-orange-50 text-orange-600 font-semibold"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => {
                    setFilterStatus(status);
                    setIsFilterMenuOpen(false);
                  }}>
                  {status}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {filteredRequests.length > 0 ? (
          filteredRequests.map((request) => (
            <RequestDetailCard
              key={request.id}
              data={request}
              onUpdateStatus={handleUpdateStatus}
            />
          ))
        ) : (
          <Card className="text-center p-12 text-gray-500">
            <p className="font-semibold text-lg">
              No requests match the current filters.
            </p>
            <p className="mt-2 text-sm">
              Try adjusting the search term or changing the status filter.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default OccupancyManagementDashboard;
