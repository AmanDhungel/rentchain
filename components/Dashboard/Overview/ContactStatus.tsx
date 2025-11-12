"use client";
import { useState } from "react";
import { CalendarDays, Plus } from "lucide-react";

const ContractStatus = () => {
  const [contracts] = useState({
    total: 154,
    active: 112,
    renewed: 112,
    underReview: 12,
    expired: 4,
  });

  return (
    <div className="bg-white shadow rounded-2xl p-4 w-full">
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-semibold text-gray-700">Contract Status</h2>
        <button className="flex items-center gap-1 text-sm text-gray-500 border rounded-md px-2 py-1">
          <CalendarDays size={16} /> This Year
        </button>
      </div>

      <p className="text-sm text-gray-400">Total Contracts</p>
      <h3 className="text-2xl font-bold mb-2">{contracts.total}</h3>

      <div className="h-2 rounded-full overflow-hidden flex mb-4">
        <div className="bg-yellow-400 w-2/4"></div>
        <div className="bg-gray-400 w-1/4"></div>
        <div className="bg-red-400 w-1/6"></div>
        <div className="bg-pink-400 flex-1"></div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="text-center">
          <p className="text-gray-500 text-sm">Active</p>
          <p className="text-2xl font-semibold">{contracts.active}</p>
        </div>
        <div className="text-center">
          <p className="text-gray-500 text-sm">Renewed</p>
          <p className="text-2xl font-semibold">{contracts.renewed}</p>
        </div>
        <div className="text-center">
          <p className="text-gray-500 text-sm">Under Review</p>
          <p className="text-2xl font-semibold">{contracts.underReview}</p>
        </div>
        <div className="text-center">
          <p className="text-gray-500 text-sm">Expired</p>
          <p className="text-2xl font-semibold">{contracts.expired}</p>
        </div>
      </div>

      <button className="bg-orange-500 hover:bg-orange-600 text-white font-medium w-full py-2 rounded-lg flex justify-center items-center gap-2 mb-3">
        <Plus size={18} /> Enhanced Agreement Builder
      </button>

      <button className="bg-slate-100 hover:bg-slate-200 w-full py-2 text-gray-700 font-medium rounded-lg">
        View All Contracts
      </button>
    </div>
  );
};

export default ContractStatus;
