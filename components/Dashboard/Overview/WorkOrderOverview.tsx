"use client";
import { CalendarDays } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const WorkOrderOverview = () => {
  const data = [
    { name: "Completed", value: 59, color: "#22c55e" },
    { name: "Under Review", value: 21, color: "#0f766e" },
    { name: "In Progress", value: 2, color: "#eab308" },
    { name: "Requested", value: 15, color: "#ef4444" },
  ];

  return (
    <div className="bg-white shadow rounded-2xl p-4 w-full">
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-semibold text-gray-700">Work Order Overview</h2>
        <button className="flex items-center gap-1 text-sm text-gray-500 border rounded-md px-2 py-1">
          <CalendarDays size={16} /> Today
        </button>
      </div>

      <div className="h-[180px] mb-4">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="70%"
              startAngle={180}
              endAngle={0}
              innerRadius={50}
              outerRadius={80}
              dataKey="value"
              stroke="#fff"
              strokeWidth={3}
              className="rounded-lg">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="text-center font-semibold text-lg">
          Total Tickets: 120
        </div>
      </div>

      <div className="space-y-1">
        {data.map((item, i) => (
          <div key={i} className="flex justify-between text-sm">
            <span className="flex items-center gap-2">
              <span
                className="inline-block w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}></span>
              {item.name}
            </span>
            <span>{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkOrderOverview;
