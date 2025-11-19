// components/aging-summary.tsx
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Text, Small, cx } from "@/lib/Typography";

interface SummaryCardProps {
  days: string;
  amount: string;
  accounts: string;
  percentage: string;
  badgeClass: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  days,
  amount,
  accounts,
  percentage,
  badgeClass,
}) => (
  <Card className="shadow-sm">
    <CardContent className="p-4 sm:p-6 md:p-8">
      <div
        className={cx(
          "inline-block rounded-full px-3 py-1 mb-4 text-xs font-medium text-white",
          badgeClass
        )}>
        {days}
      </div>
      <Text variant="h2" className=" font-extrabold text-gray-800 mb-1">
        {amount}
      </Text>
      <Text variant="body" className="mb-0">
        <span className="font-semibold">{accounts}</span>
      </Text>
      <Small>{percentage} of total</Small>
    </CardContent>
  </Card>
);

export function AgingSummary() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <SummaryCard
        days="0-30 days"
        amount="$24,500"
        accounts="8 accounts"
        percentage="63%"
        badgeClass="bg-green-500"
      />
      <SummaryCard
        days="31-60 days"
        amount="$8,200"
        accounts="3 accounts"
        percentage="21%"
        badgeClass="bg-purple-500"
      />
      <SummaryCard
        days="61-90 days"
        amount="$4,100"
        accounts="2 accounts"
        percentage="11%"
        badgeClass="bg-amber-500"
      />
      <SummaryCard
        days="90+ days"
        amount="$2,100"
        accounts="1 accounts"
        percentage="5%"
        badgeClass="bg-red-500"
      />
    </div>
  );
}
