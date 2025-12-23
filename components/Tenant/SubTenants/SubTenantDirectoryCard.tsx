"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Phone,
  MessageSquare,
  Star,
  FileText,
  Calendar as CalendarIcon,
  ShieldCheck,
  ShieldAlert,
  ShieldQuestion,
  PenTool,
} from "lucide-react";
import { PaymentHistory, SubTenant } from "./SubTenantDirectory";

export function SubTenantCard({ tenant }: { tenant: SubTenant }) {
  const getHistoryColor = (history: PaymentHistory) => {
    switch (history) {
      case "Excellent":
        return "text-green-600";
      case "Good":
        return "text-blue-500";
      case "Fair":
        return "text-red-500";
      default:
        return "text-slate-500";
    }
  };

  return (
    <Card className="mb-4 overflow-hidden border-slate-200 shadow-sm">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-6">
          <div className="flex gap-4">
            <Avatar className="h-12 w-12 border">
              <AvatarImage src={tenant.avatar} />
              <AvatarFallback>{tenant.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-800">{tenant.name}</h3>
                <div className="flex items-center gap-1 text-sm font-medium text-slate-500">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />{" "}
                  {tenant.rating}
                </div>
              </div>
              <p className="text-sm text-slate-500">{tenant.room}</p>

              <div className="flex gap-2 mt-2">
                {tenant.kycStatus === "verified" && (
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700 border-green-100 gap-1 text-[10px] py-0 px-2">
                    <ShieldCheck className="w-3 h-3" /> KYC: verified
                  </Badge>
                )}
                {tenant.kycStatus === "pending" && (
                  <Badge
                    variant="outline"
                    className="bg-orange-50 text-orange-700 border-orange-100 gap-1 text-[10px] py-0 px-2">
                    <ShieldQuestion className="w-3 h-3" /> KYC: pending
                  </Badge>
                )}
                {tenant.kycStatus === "incomplete" && (
                  <Badge
                    variant="outline"
                    className="bg-red-50 text-red-700 border-red-100 gap-1 text-[10px] py-0 px-2">
                    <ShieldAlert className="w-3 h-3" /> KYC: incomplete
                  </Badge>
                )}
                {tenant.isSigned && (
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700 border-green-100 gap-1 text-[10px] py-0 px-2">
                    <PenTool className="w-3 h-3" /> signed
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 text-slate-600">
              <Phone className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 text-slate-600">
              <MessageSquare className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-3 py-4 border-t border-b border-slate-50">
          <div>
            <p className="text-lg font-bold text-slate-800">
              ${tenant.monthlyRent}
            </p>
            <p className="text-xs text-slate-400">Monthly Rent</p>
          </div>
          <div>
            <p
              className={`text-lg font-bold ${
                tenant.outstanding > 0 ? "text-red-500" : "text-green-600"
              }`}>
              ${tenant.outstanding}
            </p>
            <p className="text-xs text-slate-400">Outstanding</p>
          </div>
          <div className="text-right">
            <p
              className={`text-lg font-bold ${getHistoryColor(
                tenant.paymentHistory
              )}`}>
              {tenant.paymentHistory}
            </p>
            <p className="text-xs text-slate-400">Payment History</p>
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <Button
            variant="outline"
            className="flex-1 font-semibold text-slate-700 gap-2 border-slate-200">
            <FileText className="w-4 h-4" /> Create Invoice
          </Button>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="flex-1 font-semibold text-slate-700 gap-2 border-slate-200">
                <CalendarIcon className="w-4 h-4" /> Schedule Payment
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar mode="single" />
            </PopoverContent>
          </Popover>
        </div>

        {tenant.latestNote && (
          <div className="mt-4 pt-4 border-t border-slate-50">
            <p className="text-xs text-slate-400">
              Latest Note:{" "}
              <span className="text-slate-600">{tenant.latestNote}</span>
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
