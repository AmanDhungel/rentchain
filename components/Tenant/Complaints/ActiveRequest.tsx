import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Filter, Clock, ArrowRight } from "lucide-react";

export function ActiveRequests() {
  const activeItems = [
    {
      id: "MNT-2024-001",
      title: "Leaking Kitchen Faucet",
      property: "Sunset Apartments - Unit 304",
      priority: "High",
      status: "In Progress",
      progress: 70,
      updated: "2 hours ago",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Search and Filter Row */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search by ID, title or property..."
            className="pl-10 bg-white"
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" /> Filter
        </Button>
      </div>

      {/* List of Active Requests */}
      <div className="space-y-4">
        {activeItems.map((item) => (
          <Card
            key={item.id}
            className="p-6 hover:shadow-md transition-shadow cursor-pointer border-slate-100">
            <div className="flex justify-between items-start">
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-3">
                  <Badge className="bg-red-500 hover:bg-red-600 font-bold">
                    {item.priority}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="text-orange-500 border-orange-200 bg-orange-50/30">
                    {item.status}
                  </Badge>
                  <span className="text-xs font-bold text-slate-400">
                    {item.id}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-800">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-500 font-medium">
                    {item.property}
                  </p>
                </div>

                {/* Progress Section */}
                <div className="max-w-md space-y-2">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-wider">
                    <span className="text-slate-400">Resolution Progress</span>
                    <span className="text-orange-500">{item.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-orange-500 h-full transition-all duration-500"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end gap-4">
                <div className="flex items-center gap-1 text-slate-400">
                  <Clock className="h-3 w-3" />
                  <span className="text-[10px] font-bold uppercase">
                    Updated {item.updated}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-orange-500 font-bold hover:text-orange-600 hover:bg-orange-50">
                  View Details <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
