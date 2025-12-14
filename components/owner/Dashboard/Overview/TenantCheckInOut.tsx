"use client";
import { useState } from "react";
import { CalendarDays } from "lucide-react";

const tenantsData = [
  {
    id: 1,
    name: "John Doe",
    property: "Greenleaf Villa",
    type: "Long Term",
    typeColor: "bg-red-500",
    checkIn: "Oct 2025",
    checkOut: "Sept 2026",
    duration: "10/25 - 09/26",
    late: true,
    daysLate: 2,
  },
  {
    id: 2,
    name: "Alex Carter",
    property: "Summit",
    type: "Short Term",
    typeColor: "bg-green-500",
    checkIn: "Oct 2025",
    checkOut: "Sept 2025",
    duration: "10/25 - 09/26",
    late: false,
  },
  {
    id: 3,
    name: "Sophia Lee",
    property: "Maple Residency",
    type: "Long Term",
    typeColor: "bg-red-500",
    checkIn: "Jan 2025",
    checkOut: "Dec 2025",
    duration: "01/25 - 12/25",
    late: false,
  },
];

const TenantsCheckInOut = () => {
  const [filter, setFilter] = useState("All");

  const filteredTenants =
    filter === "All"
      ? tenantsData
      : tenantsData.filter((t) => t.type === filter);

  return (
    <div className="bg-white shadow rounded-2xl p-4 w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-semibold text-xs text-gray-700">
          Tenants Check-In/Out
        </h2>

        <div className="flex items-center gap-2 ">
          {/* Filter Buttons */}
          <div className="flex p-2 text-xs bg-slate-100 border border-slate-100 rounded-lg">
            {["All", "Short Term", "Long Term"].map((item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                className={`text-xs font-medium px-3 py-1 rounded-lg  ${
                  filter === item
                    ? "bg-white text-black border-slate-200"
                    : "text-gray-500 hover:bg-gray-100"
                }`}>
                {item}
              </button>
            ))}
          </div>

          <button className="flex items-center gap-1 text-sm text-gray-500 border rounded-md px-2 py-1">
            <CalendarDays size={16} /> 10/25 - 09/26
          </button>
        </div>
      </div>

      {/* Tenant Cards */}
      <div className="space-y-3 mt-3">
        {filteredTenants.length > 0 ? (
          filteredTenants.map((tenant) => (
            <div
              key={tenant.id}
              className="border rounded-lg p-3 flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-gray-700">{tenant.name}</h3>
                  <p className="text-xs text-gray-500">{tenant.property}</p>
                </div>
                <span
                  className={`text-white text-xs font-medium px-2 py-1 rounded-full ${tenant.typeColor}`}>
                  {tenant.type}
                </span>
              </div>

              <div className="flex justify-between text-xs text-gray-600">
                <span>Check In: {tenant.checkIn}</span>
                <span>Check Out: {tenant.checkOut}</span>
                <span>Duration: {tenant.duration}</span>
              </div>

              {tenant.late && (
                <div className="text-xs text-red-500 font-medium">
                  ⏰ Late by {tenant.daysLate} days
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-sm text-gray-500 py-6">
            No tenants found for this filter.
          </p>
        )}
      </div>

      <button className="bg-slate-100 hover:bg-slate-200 w-full py-2 mt-4 text-gray-700 font-medium rounded-lg">
        View Details
      </button>
    </div>
  );
};

export default TenantsCheckInOut;
