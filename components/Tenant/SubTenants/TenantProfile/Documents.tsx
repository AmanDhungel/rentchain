import React from "react";
import { FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const DocumentList = () => {
  const documents = [
    { title: "Sublease Agreement", date: "2024-01-10", status: "Signed" },
    { title: "KYC Verification", date: "2024-01-12", status: "Verified" },
    { title: "Income Verification", date: "2024-01-08", status: "Approved" },
    { title: "References Check", date: "2024-01-09", status: "Completed" },
  ];

  return (
    <Card className="w-full  border-none shadow-sm bg-white">
      <CardHeader>
        <CardTitle className="text-[#1e293b] text-xl font-bold">
          Documents
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {documents.map((doc, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-4">
              {/* Icon Container */}
              <div className="bg-[#e0f2fe] p-2.5 rounded-lg">
                <FileText
                  className="w-6 h-6 text-[#3b82f6]"
                  strokeWidth={1.5}
                />
              </div>

              <div className="space-y-1">
                <p className="font-semibold text-[#334155]">{doc.title}</p>
                <p className="text-sm text-slate-400">{doc.date}</p>
              </div>
            </div>

            <Badge
              variant="outline"
              className="px-4 py-1.5 text-slate-500 border-slate-200 font-medium rounded-lg">
              {doc.status}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default DocumentList;
