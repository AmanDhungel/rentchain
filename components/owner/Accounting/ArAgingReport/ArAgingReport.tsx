// app/page.tsx
import { ReportHeader } from "@/components/owner/Accounting/ArAgingReport/ReportHeader";
import { AgingSummary } from "@/components/owner/Accounting/ArAgingReport/AgingSummary";
import { AgingDetailsTable } from "@/components/owner/Accounting/ArAgingReport/AgingTable";
import { ActionCards } from "@/components/owner/Accounting/ArAgingReport/ActionCard";

export default function AgingReportPage() {
  return (
    <div className="p-4 pl-0 md:pl-0 lg:pl-0 sm:p-6 md:p-10 lg:p-12  w-full">
      <ReportHeader />
      <AgingSummary />
      <AgingDetailsTable />
      <ActionCards />
    </div>
  );
}
