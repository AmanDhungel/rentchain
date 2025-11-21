"use client";
import React from "react";
import { CalendarDays, ChevronDown } from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";
import { NameType, ValueType } from "recharts/types/component/Tooltip";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui";

interface ChartData {
  name: string;
  value: number;
  progress: number;
}

interface CustomYAxisTickProps {
  x?: number;
  y?: number;
  payload?: {
    value: string;
  };
}

const chartData: ChartData[] = [
  { name: "Oakview", value: 95, progress: 79.2 },
  { name: "Hilltop", value: 30, progress: 25 },
  { name: "BlueStone", value: 25, progress: 20.8 },
  { name: "Greenleaf", value: 65, progress: 54.2 },
  { name: "Riverbay", value: 40, progress: 33.3 },
  { name: "Summit", value: 35, progress: 29.2 },
];

const maxChartValue = Math.max(...chartData.map((d) => d.value));
const xAxisDomainMax = Math.ceil(maxChartValue / 20) * 20;
const finalXAxisMax = Math.max(xAxisDomainMax, 120);

const CustomBarTooltip: React.FC<TooltipProps<ValueType, NameType>> = ({
  active,
  payload,
  label,
}) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload as ChartData;
    return (
      <div className="custom-tooltip bg-white p-2 rounded-md shadow-lg text-sm border border-gray-200">
        <p className="font-semibold text-gray-800">{label}</p>
        <p className="text-gray-700">{`Value: ${data.value}`}</p>
      </div>
    );
  }
  return null;
};

const CustomYAxisTick: React.FC<CustomYAxisTickProps> = (props) => {
  const { x, y, payload } = props;

  if (!payload) return null;

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={-10}
        y={0}
        dy={5}
        textAnchor="end"
        fill="#4b5563"
        className="text-sm font-medium">
        {payload.value}
      </text>
    </g>
  );
};

const TenantsByPropertiesChart: React.FC = () => {
  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <CardTitle>Tenants by Properties</CardTitle>
        <Button variant={"outline"}>
          <CalendarDays className="h-4 w-4 mr-2 text-gray-500" />
          This Year
          <ChevronDown className="h-4 w-4 ml-2 text-gray-500" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="w-full" style={{ height: "300px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              barCategoryGap="20%">
              <CartesianGrid
                strokeDasharray="3 3"
                horizontal={false}
                stroke="#e0e0e0"
              />

              <XAxis
                type="number"
                stroke="#a0a0a0"
                axisLine={true}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#6b7280" }}
                domain={[0, finalXAxisMax]}
                interval="preserveStartEnd"
                ticks={[0, 20, 40, 60, 80, 100, 120]}
              />
              <YAxis
                dataKey="name"
                type="category"
                tick={<CustomYAxisTick />}
                axisLine={false}
                tickLine={false}
                width={100}
              />
              <Tooltip
                cursor={{ fill: "rgba(255, 119, 40, 0.1)" }}
                contentStyle={{
                  border: "none",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  fontSize: "12px",
                }}
                content={
                  <CustomBarTooltip
                    active={undefined}
                    payload={undefined}
                    label={undefined}
                  />
                }
              />
              <Bar
                dataKey="value"
                fill="#ff7728"
                barSize={16}
                radius={[4, 4, 4, 4]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 border-t border-gray-100 pt-4 px-2">
          <div className="flex items-center text-xs text-gray-600">
            <span
              className="w-2 h-2 rounded-full mr-2"
              style={{ backgroundColor: "#ff7728" }}></span>
            No of Tenants increased by{" "}
            <span className="font-semibold text-green-600 mx-1">+20%</span> from
            last year
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TenantsByPropertiesChart;
