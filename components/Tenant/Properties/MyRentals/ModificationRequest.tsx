"use client";
import {
  ArrowLeft,
  Plus,
  CheckCircle2,
  AlertCircle,
  Clock,
  Calendar,
  MessageSquare,
  User,
} from "lucide-react";

import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import CreateModificationRequest from "./NewRequest";

type RequestStatus = "approved" | "reviewed" | "submitted";

interface ModificationRequest {
  id: string;
  type: string;
  target: string;
  description: string;
  submittedDate: string;
  status: RequestStatus;
  approver: string;
  comment?: string;
  effectiveDate?: string;
}

const requests: ModificationRequest[] = [
  {
    id: "MOD-2024-001",
    type: "Partition Request",
    target: "Bedroom → 2 Bedspaces",
    description:
      "Install a removable partition to create two separate bedspaces for subletting",
    submittedDate: "8/1/2024",
    status: "approved",
    approver: "John Smith",
    comment:
      "Approved with condition: partition must be removable and not permanent",
    effectiveDate: "9/1/2024",
  },
  {
    id: "MOD-2024-002",
    type: "fixture Request",
    target: "Living Room → Desk Installation",
    description: "Install a built-in desk for workspace purposes",
    submittedDate: "8/10/2024",
    status: "reviewed",
    approver: "John Smith",
    comment: "Under review. Please provide detailed installation plans.",
  },
  {
    id: "MOD-2024-003",
    type: "Allocation Request",
    target: "Utility Allocation Change",
    description:
      "Request to change electricity allocation method for sub-units",
    submittedDate: "8/15/2024",
    status: "submitted",
    approver: "Pending Assignment",
  },
];

const StatusIcon = ({ status }: { status: RequestStatus }) => {
  switch (status) {
    case "approved":
      return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    case "reviewed":
      return <AlertCircle className="h-5 w-5 text-orange-500" />;
    case "submitted":
      return <Clock className="h-5 w-5 text-blue-500" />;
  }
};

const StatusBadge = ({ status }: { status: RequestStatus }) => {
  const styles = {
    approved: "bg-green-500 hover:bg-green-600",
    reviewed: "bg-orange-500 hover:bg-orange-600",
    submitted: "bg-blue-500 hover:bg-blue-600",
  };

  return (
    <Badge
      className={`${styles[status]} text-white border-0 px-2 py-0 text-[10px] uppercase font-bold rounded-sm`}>
      {status}
    </Badge>
  );
};

export default function ModificationRequests() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-white font-sans p-4 md:p-6">
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5 text-gray-700" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-gray-900 leading-tight">
              Modification Requests
            </h1>
            <p className="text-xs text-gray-500 font-medium">3 requests</p>
          </div>
        </div>

        <CreateModificationRequest />
      </header>

      <div className=" mx-auto space-y-4">
        {requests.map((req) => (
          <Card
            key={req.id}
            className="p-5 border-gray-100 shadow-none border rounded-lg">
            <div className="flex gap-4">
              <div className="mt-1 shrink-0">
                <StatusIcon status={req.status} />
              </div>

              <div className="grow space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-900 text-base">
                      {req.id}
                    </h3>
                    <p className="text-xs text-gray-400 font-medium">
                      {req.type}
                    </p>
                  </div>
                  <StatusBadge status={req.status} />
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-bold text-gray-800">
                    Target: {req.target}
                  </p>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {req.description}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 pt-2 text-[11px] text-gray-500">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    <span className="font-medium">
                      Submitted: {req.submittedDate}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-medium text-gray-500">
                      Approver: {req.approver}
                    </span>
                  </div>
                </div>

                {req.comment && (
                  <div className="flex gap-2 pt-1">
                    <MessageSquare className="h-3.5 w-3.5 text-gray-400 mt-0.5" />
                    <p className="text-[11px] text-gray-500 italic">
                      {req.comment}
                    </p>
                  </div>
                )}

                {req.effectiveDate && (
                  <div className="pt-1">
                    <p className="text-xs font-bold text-green-500">
                      Effective Date: {req.effectiveDate}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
