import { Card, CardContent } from "@/components/ui/card";
import { SearchFilterBar, InfoCard } from "./ParkingSharedComponent";

function EmptyContentCard({ title }: { title: string }) {
  return (
    <Card className="min-h-[300px]">
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold">{title}</h2>
        <div className="flex items-center justify-center h-[200px] text-gray-400">
          [Placeholder for Chart/Graph]
        </div>
      </CardContent>
    </Card>
  );
}

export default function AnalyticsTab() {
  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center space-x-2 my-4">
        <SearchFilterBar />
      </div>

      <EmptyContentCard title="Occupancy Trends" />

      <EmptyContentCard title="Revenue Analytics" />

      <section>
        <h2 className="text-lg font-semibold mb-4">Performance Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <InfoCard
            title="Average Occupancy"
            value="92.5"
            unit="%"
            color="text-green-500"
          />
          <InfoCard
            title="Avg Stay Duration"
            value="4.2"
            unit="h"
            color="text-blue-500"
          />
          <InfoCard
            title="Payment Success Rate"
            value="98.1"
            unit="%"
            color="text-purple-500"
          />
          <InfoCard
            title="No-Show Rate"
            value="1.2"
            unit="%"
            color="text-red-500"
          />
        </div>
      </section>
    </div>
  );
}
