// QuickAddSection.tsx
import Image from "next/image";
import { icons } from "../../../../assets/icons/exports";

interface CardItem {
  title: string;
  icon: string;
  bottomleftIcon: string;
  color: string;
  bgColor: string;
}

interface QuickAddSectionProps {
  onAddFloor: () => void;
}

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

const QuickAddSection = ({ onAddFloor }: QuickAddSectionProps) => {
  return (
    <div className="flex p-4 border items-center justify-center rounded-md mt-10 border-gray-300">
      <h1 className="mr-7">Quick Add</h1>
      <div className="flex space-x-4">
        {cardItems.map((item) => (
          <div
            key={item.title}
            className="flex flex-col items-center cursor-pointer"
            onClick={item.title === "Floors" ? onAddFloor : undefined}>
            <div className="flex mt-5">
              <span className="mr-2" style={{ color: `${item.color}` }}>
                +
              </span>
              <div
                style={{
                  backgroundColor: `${item.bgColor}`,
                  borderColor: `${item.color}`,
                }}
                className={`bg-[${item.bgColor}] border border-[${item.color}] items-center justify-center flex rounded-full w-8 h-8 m-auto p-1 `}>
                <Image alt="iicons" src={item.icon} className="w-5 h-5" />
              </div>
            </div>
            <p className="text-sm mt-2"> {item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickAddSection;
