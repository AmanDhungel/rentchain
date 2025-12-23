import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface HistoryEntry {
  id: string;
  title: string;
  by: string;
  description: string;
  date: string;
  statusColor: string;
}

const VerificationHistory: React.FC = () => {
  const history: HistoryEntry[] = [
    {
      id: "1",
      title: "Approved",
      by: "Property Manager",
      description: "All documents verified successfully",
      date: "January 15, 2024",
      statusColor: "bg-orange-500",
    },
    {
      id: "2",
      title: "Document Review",
      by: "Verification Team",
      description: "Income statement and ID verified",
      date: "January 12, 2024",
      statusColor: "bg-orange-500",
    },
    {
      id: "3",
      title: "Application Submitted",
      by: "Tenant",
      description: "Initial application with documents",
      date: "January 10, 2024",
      statusColor: "bg-orange-500",
    },
  ];

  return (
    <div className=" mx-auto p-6 bg-white min-h-screen font-sans">
      <h2 className="text-xl font-bold text-slate-800 mb-6 px-1">
        Verification History
      </h2>

      <div className="space-y-4">
        {history.map((item) => (
          <Card
            key={item.id}
            className="border border-slate-100 shadow-sm overflow-hidden">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex gap-3">
                  <div
                    className={`w-2.5 h-2.5 rounded-full mt-2 shrink-0 ${item.statusColor}`}
                  />

                  <div className="space-y-1">
                    <h3 className="font-bold text-slate-700 text-lg">
                      {item.title}
                    </h3>
                    <p className="text-slate-500 font-medium">By: {item.by}</p>
                    <p className="text-slate-500">{item.description}</p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-slate-500 font-semibold">{item.date}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default VerificationHistory;
