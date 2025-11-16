import Image from "next/image";
import { icons } from "../../../assets/icons/exports";
import { Button } from "../../ui/button";
import { Checkbox } from "../../ui/checkbox";

interface CardItem {
  title: string;
  icon: string;
  bottomleftIcon: string;
  color: string;
  bgColor: string;
}

const UnitStructure = ({
  onNext,
  onPrev,
}: {
  onNext: () => void;
  onPrev: () => void;
}) => {
  const cardItems: CardItem[] = [
    {
      title: "Floors",
      icon: icons.Stairs2,

      bottomleftIcon: icons.RectangleFloors,
      color: "#F26522",
      bgColor: "#FEF1EB",
    },
    {
      title: "Units/Apartments",

      icon: icons.Domain,
      bottomleftIcon: icons.RectangleUnits,
      color: "#1B84FF",
      bgColor: "#EBF7FE",
    },
    {
      title: "Rooms",
      icon: icons.SensorDoor,
      bottomleftIcon: icons.RectangleRooms,
      color: "#AB47BC",
      bgColor: "#FEEBFE",
    },
    {
      title: "Bedspaces",
      icon: icons.AirlineSeatFlat,
      bottomleftIcon: icons.RectangleBedspaces,
      color: "#FD3995",
      bgColor: "#FEEBF5",
    },
    {
      title: "Common Area",
      icon: icons.RestArea,
      bottomleftIcon: icons.RectangleCommonArea,
      color: "#16C86F",
      bgColor: "#F0FEEB",
    },
  ];
  return (
    <div className="max-w-4xl mx-auto py-8 px-6">
      <h1 className="text-lg font-semibold">Enhanced Unit Structure Setup</h1>
      <p className="text-sm text-gray-500 mt-1">
        Create a detailed hierarchical structure for your property with floors,
        apartments, and common areas.
      </p>

      <div className="mt-6 space-y-4">
        <div className="flex items-center gap-2">
          <Checkbox defaultChecked />
          <span> Create enhanced hierarchical unit structure</span>
        </div>
      </div>

      <h1 className="my-4">Building Overview</h1>
      <div className="flex justify-between mt-4">
        <h2 className="flex flex-col font-medium text-orange-500 items-center">
          1 <span className="text-[#202C4B]">Floors</span>
        </h2>
        <h2 className="flex flex-col font-medium text-orange-500 items-center">
          0 <span className="text-[#202C4B]">Apartments</span>
        </h2>
        <h2 className="flex flex-col font-medium text-orange-500 items-center">
          0 <span className="text-[#202C4B]">Common Areas</span>
        </h2>
        <h2 className="flex flex-col font-medium text-orange-500 items-center">
          0 <span className="text-[#202C4B]">Rooms</span>
        </h2>
        <h2 className="flex flex-col font-medium text-orange-500 items-center">
          0 <span className="text-[#202C4B]">Bedspace</span>
        </h2>
      </div>

      <div className="my-4 p-4 border border-gray-300 rounded-md">
        <h1 className="font-medium">Add Building Elements</h1>
        <div className="flex justify-between">
          {cardItems.map((item) => (
            <div
              key={item.title}
              className="flex flex-col items-center border border-gray-300 overflow-hidden h-[99.92px] w-[122.76px] rounded-md mt-4">
              <div className="m-auto mt-5 ">
                <div
                  style={{
                    backgroundColor: `${item.bgColor}`,
                    borderColor: `${item.color}`,
                  }}
                  className={`bg-[${item.bgColor}] border border-[${item.color}] items-center justify-center flex rounded-full w-8 h-8 m-auto p-1 `}>
                  <Image alt={item.title} src={item.icon} className="w-5 h-5" />
                </div>
                <p className="text-sm mt-2">{item.title}</p>
              </div>
              <Image
                alt={item.title}
                src={item.bottomleftIcon}
                className="relative right-10 -top-[18px] "
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between mt-6">
        <Button variant="outline" onClick={onPrev} type="button">
          Previous
        </Button>

        <div className="flex items-center gap-3">
          <Button className="bg-orange-500" onClick={onNext}>
            Next →
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UnitStructure;
