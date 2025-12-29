import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Download, CheckCircle2 } from "lucide-react";

export function RequestHistory() {
  const historyItems = [
    {
      id: "MNT-2023-085",
      title: "Broken Door Lock",
      property: "Garden Villa - Unit 12",
      category: "Security",
      resolvedDate: "2024-01-10",
      rating: 5,
    },
    {
      id: "MNT-2023-082",
      title: "AC Filter Replacement",
      property: "Skyline Towers - Unit 502",
      category: "HVAC",
      resolvedDate: "2024-01-05",
      rating: 4,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Advanced Filter Header */}
      <Card className="p-4 bg-white border-slate-100">
        <div className="flex flex-wrap gap-4">
          <div className="relative flex-1 min-w-[300px]">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input placeholder="Search history..." className="pl-10" />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="plumbing">Plumbing</SelectItem>
              <SelectItem value="hvac">HVAC</SelectItem>
              <SelectItem value="security">Security</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" /> Export CSV
          </Button>
        </div>
      </Card>

      {/* History List */}
      <div className="space-y-3">
        {historyItems.map((item) => (
          <Card
            key={item.id}
            className="p-5 flex items-center justify-between border-slate-100 hover:bg-slate-50/50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-slate-800">{item.title}</h4>
                  <span className="text-[10px] font-bold text-slate-400">
                    {item.id}
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  {item.property} • {item.category}
                </p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Resolved On
              </p>
              <p className="text-sm font-bold text-slate-700">
                {item.resolvedDate}
              </p>
              <div className="flex gap-0.5 mt-1 justify-end">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-xs ${
                      i < item.rating ? "text-orange-400" : "text-slate-200"
                    }`}>
                    ★
                  </span>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
