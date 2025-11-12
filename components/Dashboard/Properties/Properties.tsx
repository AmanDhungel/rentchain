import { icons } from "../../../assets/icons/exports";
import PropertiesGraphIcon from "../../../assets/icons/PropertiesGraphIcon";
import DynamicSubMenuItems from "./DynamicSubMenuItems";

export default function PropertyOverviewDashboard() {
  const stats = [
    {
      id: 1,
      label: "Total Properties",
      value: 3,
      letter: "P",
      color: "#AB47BC",
      percent: "+19.01%",
      variant: "pink",
      bgcolor: "#F7EEF9",
    },
    {
      id: 2,
      label: "Active Leases",
      value: 5,
      letter: "L",
      percent: "+19.01%",
      variant: "green",
      color: "#F26522",
      bgcolor: "#FEF1EB",
    },
    {
      id: 3,
      label: "Avg Occupancy",
      value: "80%",
      letter: "O",
      percent: "+19.01%",
      variant: "red",
      color: "#212529",
      bgcolor: "#E8E9EA",
    },
  ];

  const rows = [
    {
      id: 1,
      title: "Manage All Properties",
      subtitle: "View details, edit, and manage units",
      badge: { text: "Manage All Properties", color: "bg-orange-500" },
      icon: icons.Apartment,
    },
    {
      id: 2,
      title: "Enhanced Property Management",
      subtitle: "Multi-party ownership and advanced features",
      badge: { text: "Enhanced Property Management", color: "bg-purple-600" },
      icon: icons.Crown,
    },
  ];

  return (
    <div className="max-w-full w-full p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {stats.map((s) => (
          <div
            key={s.id}
            className="flex items-center justify-between bg-white border border-[#E5E7EB] rounded-md gap-4 px-5 py-4 shadow-sm">
            <div className="flex items-center gap-4">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-md border ${
                  s.variant === "pink"
                    ? "border-pink-300 text-pink-600 bg-pink-600/10"
                    : s.variant === "green"
                    ? "border-green-300 text-green-600 bg-green-600/10"
                    : "border-red-300 text-red-600 bg-red-600/20"
                } font-medium`}>
                {s.letter}
              </div>
              <div>
                <div className="text-sm text-gray-500">{s.label}</div>
                <div className="text-xl font-semibold">{s.value}</div>
              </div>
            </div>

            <div className="flex flex-col gap-2 items-end">
              <div
                style={{ background: s.bgcolor }}
                className="text-xs flex px-3 gap-1 items-center py-1 rounded-md text-gray-500">
                <PropertiesGraphIcon color={s.color} />
                {s.percent}
              </div>
            </div>
          </div>
        ))}
      </div>

      <DynamicSubMenuItems Title="Properties Overview" rows={rows} />
    </div>
  );
}
