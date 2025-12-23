import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FinancialDashboard = () => {
  const payments = [
    {
      name: "March 2024",
      type: "Bank Transfer",
      amount: 600,
      date: "3/1/2024",
      status: "paid",
    },
    {
      name: "February 2024",
      type: "Bank Transfer",
      amount: 600,
      date: "2/1/2024",
      status: "paid",
    },
    {
      name: "January 2024",
      type: "Bank Transfer",
      amount: 600,
      date: "1/15/2024",
      status: "paid",
    },
    {
      name: "Security Deposit",
      type: "Bank Transfer",
      amount: 600,
      date: "1/10/2024",
      status: "paid",
    },
  ];

  return (
    <div className="p-8  mx-auto space-y-6  min-h-screen">
      <Card className="border-none shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-slate-700 text-lg font-semibold">
            Financial Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-between items-end">
          <div>
            <p className="text-2xl font-bold text-slate-800">Excellent</p>
            <p className="text-slate-400 text-sm mt-1">Payment History</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-slate-800">$1200</p>
            <p className="text-slate-400 text-sm mt-1">Deposit Paid</p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle className="text-slate-800 text-lg font-bold">
            Payment History
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {payments.map((payment, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 border border-slate-100 rounded-xl shadow-sm bg-white">
              <div className="space-y-1">
                <p className="font-bold text-slate-800">{payment.name}</p>
                <p className="text-sm text-slate-400 font-medium">
                  {payment.type}
                </p>
              </div>

              <div className="flex items-center gap-12">
                <div className="text-right space-y-1">
                  <p className="font-bold text-slate-800">${payment.amount}</p>
                  <p className="text-xs text-slate-400 font-medium">
                    {payment.date}
                  </p>
                </div>

                <Badge
                  variant="outline"
                  className="px-4 py-1 text-slate-400 border-slate-200 font-normal lowercase">
                  {payment.status}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialDashboard;
