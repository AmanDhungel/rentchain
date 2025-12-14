"use client";
import {
  ArrowLeft,
  Upload,
  FileText,
  CheckCircle,
  Clock,
  ChevronDown,
  Camera,
} from "lucide-react";
import React, { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "../../ui";
import Link from "next/link";

const USER_COMPLAINTS: Array<{
  id: string;
  title: string;
  description: string;
  filedDate: string;
  priority: string;
  status: "default" | "progress" | "high" | "low";
}> = [
  {
    id: "TKT-2025-004",
    title: "Leaky Faucet in Kitchen",
    description:
      "The kitchen faucet has been dripping constantly for the past week.",
    filedDate: "1/20/2025",
    priority: "Medium",
    status: "progress",
  },
  {
    id: "TKT-2025-005",
    title: "Heating System Not Working",
    description:
      "The heating system in the living room is not functioning properly.",
    filedDate: "1/18/2025",
    priority: "High",
    status: "default",
  },
  {
    id: "TKT-2025-006",
    title: "Noise Complaint from Neighbors",
    description:
      "Neighbors upstairs are making excessive noise during late hours.",
    filedDate: "1/15/2025",
    priority: "Low",
    status: "progress",
  },
];

const ISSUE_CATEGORIES = ["Maintenance", "Noise", "Billing", "Amenities"];
const PRIORITY_LEVELS = ["Low", "Medium", "High", "Urgent"];

const MyComplaintItem = ({
  complaint,
}: {
  complaint: {
    status: "progress" | "default" | "high" | "low";
    priority:
      | "default"
      | "destructive"
      | "success"
      | "outline"
      | "secondary"
      | "warning"
      | "verified"
      | "highpriority"
      | null
      | undefined
      | string;
    title: string;
    description: string;
    filedDate: string;
    id: string;
  };
}) => {
  const statusToVariant = ({
    status,
  }: {
    status: "progress" | "default" | "high" | "low";
  }) => {
    if (status === "progress") return "progress";
    if (status === "high") return "high";
    if (status === "default") return "low";
    return "default";
  };

  const priorityVariant =
    complaint?.priority && complaint.priority.toLowerCase();

  return (
    <div className="flex flex-col sm:flex-row justify-between p-4 bg-white border border-gray-200 rounded-xl shadow-sm mb-3">
      <div className="grow space-y-1">
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {complaint.title}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-1">
          {complaint.description}
        </p>

        <div className="flex items-center space-x-3 pt-1">
          <span className="text-sm text-gray-500">
            Filed on {complaint.filedDate}
          </span>
          <Badge variant={priorityVariant} className="text-[10px] uppercase">
            {complaint.priority} Priority
          </Badge>
        </div>
      </div>

      <div className="flex items-center space-x-4 pt-3 sm:pt-0 sm:ml-4">
        <Badge
          variant={statusToVariant(complaint.status)}
          className="text-[11px] h-6 px-3 flex items-center">
          {complaint.status === "default" && (
            <CheckCircle className="h-3 w-3 mr-1" />
          )}
          {complaint.status === "progress" && (
            <Clock className="h-3 w-3 mr-1" />
          )}
          {complaint.status === "high" && <FileText className="h-3 w-3 mr-1" />}
          {complaint.status}
        </Badge>
        <Button variant="outline" size="sm" className="hidden sm:inline-flex">
          View Details
        </Button>
        <FileText className="h-5 w-5 text-gray-500 sm:hidden" />
      </div>
    </div>
  );
};

const MyComplaintsList = () => (
  <div>
    <h2 className="text-xl font-bold text-gray-800 mb-4">Your Complaints</h2>
    <div className="space-y-4">
      {USER_COMPLAINTS.map((complaint) => (
        <MyComplaintItem key={complaint.id} complaint={complaint} />
      ))}
    </div>
  </div>
);

const NewComplaintForm = () => {
  const [formState, setFormState] = useState({
    issueTitle: "",
    category: "",
    priority: "",
    description: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Complaint submitted! (Check console for payload)");
    setFormState({
      issueTitle: "",
      category: "",
      priority: "",
      description: "",
    });
  };

  const alert = ({ message }: { message: string }) => {
    console.log("ALERT:", message);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 ">
      <h2 className="text-xl font-bold text-gray-800">File a New Complaint</h2>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Issue Title</label>
        <Input placeholder="Brief description of the issue" required />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Category</label>
          <Select required>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {ISSUE_CATEGORIES.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Priority Level
          </label>
          <Select required>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a priority level" />
            </SelectTrigger>
            <SelectContent>
              {PRIORITY_LEVELS.map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          Detailed Description
        </label>
        <Textarea
          placeholder="Please provide detailed information about the issue..."
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          Attach Photo (Optional)
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center bg-gray-50">
          <Camera className="h-8 w-8 mx-auto text-gray-400 mb-2" />
          <p className="text-sm text-gray-500 mb-4">
            Add photos to help us understand the issue
          </p>
          <Label
            htmlFor="file-upload"
            className="justify-center cursor-pointer">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="pointer-events-none bg-white">
              <Upload className="h-4 w-4 mr-2" />
              Choose Photos
            </Button>
          </Label>
          <Input
            id="file-upload"
            type="file"
            accept="image/*"
            multiple
            className="hidden"
          />
        </div>
      </div>

      <Button
        type="submit"
        variant="default"
        size="lg"
        className="w-full text-lg h-12">
        Submit Complaint
      </Button>
    </form>
  );
};

const ComplaintsIssues = () => {
  const totalTickets = USER_COMPLAINTS.length;

  return (
    <div className="min-h-screen bg-white p-4 pl-0 sm:p-6 lg:p-8 lg:pl-0 font-sans">
      <div className="">
        <header className="flex flex-col justify-between items-start pb-4">
          <div className="flex items-center space-x-4 mb-4">
            <Link href="/complaints/complaint-and-dispute">
              <ArrowLeft className="h-6 w-6 text-gray-500 cursor-pointer" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Complaints & Issues
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">
                {totalTickets} tickets
              </p>
            </div>
          </div>
        </header>

        <Tabs defaultValue="file-new">
          <TabsList className="w-full bg-white">
            <TabsTrigger
              value="file-new"
              className="data-[state=active]:border-b-2 data-[state=active]:border-b-orange-500 rounded-none shadow-none! ">
              File New Complaint
            </TabsTrigger>
            <TabsTrigger
              value="my-complaints"
              className="data-[state=active]:border-b-2 data-[state=active]:border-b-orange-500 rounded-none shadow-none!">
              My Complaints
            </TabsTrigger>
          </TabsList>
          <TabsContent value="file-new">
            <NewComplaintForm />
          </TabsContent>
          <TabsContent value="my-complaints">
            <MyComplaintsList />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ComplaintsIssues;
