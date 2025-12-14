"use client";
import { Bell, Download, MoveLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { H2, Small } from "@/lib/Typography";
import { useRouter } from "next/navigation";

export function ReportHeader() {
  const router = useRouter();
  return (
    <div className="border-b pb-4 mb-6">
      <div className="flex justify-between items-center mb-1">
        <div className="flex items-center space-x-3">
          <Button
            onClick={() => router.back()}
            variant="ghost"
            size="icon"
            className="hover:bg-transparent cursor-pointer">
            <MoveLeft className="h-5 w-5 text-gray-700 cursor-pointer" />
          </Button>
          <H2 className="font-bold">AR Aging Report</H2>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="text-sm font-semibold">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold">
            <Bell className="h-4 w-4 mr-2" />
            Bulk Reminders
          </Button>
        </div>
      </div>
      <div className="pl-12">
        <Small>$38,900 total outstanding • 14 accounts</Small>
      </div>
    </div>
  );
}
