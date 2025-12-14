// components/action-cards.tsx
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Clock, Download } from "lucide-react";
import { Text, Small, cx } from "@/lib/Typography";

interface ActionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  colorClass: string;
}

const ActionCard: React.FC<ActionCardProps> = ({
  icon,
  title,
  description,
  colorClass,
}) => (
  <Card className="shadow-sm hover:shadow-lg transition-shadow cursor-pointer">
    <CardContent className="flex flex-col items-start p-6">
      <div className={cx("p-3 rounded-full mb-4", colorClass)}>{icon}</div>
      <Text variant="title" className=" mb-1">
        {title}
      </Text>
      <Small className=" text-left">{description}</Small>
    </CardContent>
  </Card>
);

export function ActionCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <ActionCard
        icon={<Mail className="h-6 w-6 text-blue-500" />}
        title="Send Overdue Reminders"
        description="Send reminders to 3 tenants"
        colorClass="bg-blue-500/10"
      />
      <ActionCard
        icon={<Clock className="h-6 w-6 text-green-500" />}
        title="Schedule Follow-ups"
        description="Plan calls for high-priority accounts"
        colorClass="bg-green-500/10"
      />
      <ActionCard
        icon={<Download className="h-6 w-6 text-purple-500" />}
        title="Export Report"
        description="Download detailed aging report"
        colorClass="bg-purple-500/10"
      />
    </div>
  );
}
