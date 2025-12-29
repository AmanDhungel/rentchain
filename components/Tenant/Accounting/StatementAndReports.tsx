"use client";
import React from "react";
import {
  ArrowLeft,
  FileText,
  Download,
  Filter,
  Search,
  Calendar,
  Printer,
  Share2,
  ChevronRight,
  FileSpreadsheet,
  FilePieChart,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { ReportGeneratorForm } from "./ReportGeneratorForm";

const StatementsAndReports: React.FC = () => {
  return (
    <div className="mx-auto p-8 bg-[#F8FAFC] min-h-screen font-sans">
      <header className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-5">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-white shadow-sm border border-slate-100">
            <ArrowLeft size={20} className="text-slate-600" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Statements & Reports
            </h1>
            <p className="text-sm text-slate-500 font-medium">
              Access and generate your property financial documents
            </p>
          </div>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-[#FF6B00] hover:bg-[#E66000] text-white px-6 h-11 font-bold rounded-lg shadow-lg shadow-orange-100 gap-2">
              <FilePieChart size={18} /> Generate Report
            </Button>
          </DialogTrigger>
          <ReportGeneratorForm />
        </Dialog>
      </header>

      <Tabs defaultValue="property-statements" className="w-full">
        <TabsList className="w-full justify-start bg-transparent border-b border-slate-200 rounded-none h-auto p-0 mb-8 gap-10">
          <TabsTrigger value="property-statements" className="tab-style">
            Property Statements
          </TabsTrigger>
          <TabsTrigger value="financial-reports" className="tab-style">
            Financial Reports
          </TabsTrigger>
          <TabsTrigger value="tax-documents" className="tab-style">
            Tax Documents
          </TabsTrigger>
        </TabsList>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <Input
              placeholder="Search documents..."
              className="pl-10 h-11 bg-white border-slate-200 rounded-xl"
            />
          </div>
          <Button
            variant="outline"
            className="h-11 rounded-xl bg-white border-slate-200 gap-2 font-bold text-slate-600">
            <Filter size={18} /> Filters
          </Button>
        </div>

        {/* Tab 1: Property Statements (Design 1) */}
        <TabsContent
          value="property-statements"
          className="space-y-4 outline-none">
          <StatementItem
            title="Monthly Owner Statement - Nov 2023"
            date="Dec 05, 2023"
            size="2.4 MB"
            type="PDF"
          />
          <StatementItem
            title="Monthly Owner Statement - Oct 2023"
            date="Nov 03, 2023"
            size="2.1 MB"
            type="PDF"
          />
        </TabsContent>

        {/* Tab 2: Financial Reports (Design 2) */}
        <TabsContent
          value="financial-reports"
          className="grid grid-cols-1 md:grid-cols-2 gap-6 outline-none">
          <ReportCard
            title="Profit & Loss"
            desc="Detailed income and expense breakdown"
            icon={<FileSpreadsheet className="text-blue-500" />}
          />
          <ReportCard
            title="Rent Roll"
            desc="Current occupancy and rental rates"
            icon={<FileText className="text-orange-500" />}
          />
        </TabsContent>

        {/* Tab 3: Tax Documents (Design 3) */}
        <TabsContent value="tax-documents" className="space-y-4 outline-none">
          <Card className="border-none shadow-sm rounded-2xl p-6 bg-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-red-50 text-red-500 rounded-xl">
                  <FileText size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">
                    2023 1099-MISC Form
                  </h4>
                  <p className="text-xs text-slate-500">
                    Available for download on Jan 31, 2024
                  </p>
                </div>
              </div>
              <Button variant="ghost" disabled className="font-bold">
                Pending
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Internal Components
const StatementItem = ({ title, date, size, type }: any) => (
  <Card className="border-none shadow-sm rounded-2xl p-5 bg-white hover:shadow-md transition-all">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-slate-50 text-slate-500 rounded-xl">
          <FileText size={22} />
        </div>
        <div>
          <h4 className="font-bold text-slate-800">{title}</h4>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-xs text-slate-400 font-medium">{date}</span>
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
              {size} • {type}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="text-slate-400">
          <Download size={18} />
        </Button>
        <Button variant="ghost" size="icon" className="text-slate-400">
          <Printer size={18} />
        </Button>
        <Button variant="ghost" size="icon" className="text-slate-400">
          <Share2 size={18} />
        </Button>
      </div>
    </div>
  </Card>
);

const ReportCard = ({ title, desc, icon }: any) => (
  <Card className="border-none shadow-sm rounded-2xl p-6 bg-white hover:ring-2 hover:ring-orange-100 transition-all cursor-pointer group">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-slate-50 rounded-xl group-hover:bg-white transition-colors">
          {icon}
        </div>
        <div>
          <h4 className="font-bold text-slate-800">{title}</h4>
          <p className="text-sm text-slate-500">{desc}</p>
        </div>
      </div>
      <ChevronRight className="text-slate-300" size={20} />
    </div>
  </Card>
);

export default StatementsAndReports;
