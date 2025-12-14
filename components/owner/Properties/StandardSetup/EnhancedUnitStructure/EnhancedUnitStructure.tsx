import { FormProvider, useForm } from "react-hook-form";
import { v4 as uuid } from "uuid";
import FloorCard from "./Floors";
import QuickAddSection from "./QuickAddSection";
import UnitCard from "./Unit";
import RoomCard from "./Room";
import { BedspacesForm } from "./BedSpaceForm";
import CommonAreaCard from "./CommonArea";
import { useEffect, useState } from "react";
import { Button } from "../../../../ui";
import { Checkbox } from "@/components/ui/checkbox";

export type FloorType = {
  id: string;
  name: string;
  number: string;
  description: string;
  isEnabled: boolean;
  units: UnitType[];
  commonAreas: any[];
};

export type UnitType = {
  id: string;
  name: string;
  type: string;
  area: string;
  isEnabled: boolean;
  rooms: RoomType[];
};

export type RoomType = {
  id: string;
  name: string;
  type: string;
  area: string;
  isEnabled: boolean;
  bedspaces: BedspaceType[];
};

export type BedspaceType = {
  id: string;
  name: string;
  type: string;
};

export type FormValues = {
  floors: FloorType[];
};

const EnhancedUnitStructure = () => {
  const [localFloors, setLocalFloors] = useState<FloorType[]>([]);

  const methods = useForm<FormValues>({
    defaultValues: {
      floors: [
        {
          id: uuid(),
          name: "Floor 1",
          number: "1",
          description: "",
          isEnabled: false,
          units: [],
          commonAreas: [],
        },
      ],
    },
  });

  const { setValue, watch } = methods;
  const formFloors = watch("floors");

  useEffect(() => {
    setLocalFloors(formFloors);
  }, [formFloors]);

  // // Update form when local state changes
  // useEffect(() => {
  //   if (localFloors.length > 0) {
  //     setValue("floors", localFloors, {
  //       shouldDirty: true,
  //       shouldValidate: true,
  //     });
  //   }
  // }, [localFloors, setValue]);

  const updateLocalFloors = (updatedFloors: FloorType[]) => {
    setLocalFloors(updatedFloors);
  };

  const addFloor = () => {
    const currentFloors = [...localFloors];
    const newFloor: FloorType = {
      id: uuid(),
      name: `Floor ${currentFloors.length + 1}`,
      number: `${currentFloors.length + 1}`,
      description: "",
      isEnabled: false,
      units: [],
      commonAreas: [],
    };
    updateLocalFloors([...currentFloors, newFloor]);
  };

  const addUnit = (floorId: string) => {
    const updatedFloors = localFloors.map((floor) => {
      if (floor.id === floorId) {
        const newUnit: UnitType = {
          id: uuid(),
          name: `Unit ${floor.units.length + 1}`,
          type: "studio",
          area: "",
          isEnabled: false,
          rooms: [],
        };
        return {
          ...floor,
          units: [...floor.units, newUnit],
        };
      }
      return floor;
    });
    updateLocalFloors(updatedFloors);
  };

  const addRoom = (floorId: string, unitId: string) => {
    const updatedFloors = localFloors.map((floor) => {
      if (floor.id === floorId) {
        const updatedUnits = floor.units.map((unit) => {
          if (unit.id === unitId) {
            const newRoom: RoomType = {
              id: uuid(),
              name: `Room ${unit.rooms.length + 1}`,
              type: "bedroom",
              area: "",
              isEnabled: false,
              bedspaces: [],
            };
            return {
              ...unit,
              rooms: [...unit.rooms, newRoom],
            };
          }
          return unit;
        });
        return {
          ...floor,
          units: updatedUnits,
        };
      }
      return floor;
    });
    updateLocalFloors(updatedFloors);
  };

  const addBedspace = (floorId: string, unitId: string, roomId: string) => {
    const updatedFloors = localFloors.map((floor) => {
      if (floor.id === floorId) {
        const updatedUnits = floor.units.map((unit) => {
          if (unit.id === unitId) {
            const updatedRooms = unit.rooms.map((room) => {
              if (room.id === roomId) {
                const newBedspace: BedspaceType = {
                  id: uuid(),
                  name: `Bed ${room.bedspaces.length + 1}`,
                  type: "Single Bed",
                };
                return {
                  ...room,
                  bedspaces: [...room.bedspaces, newBedspace],
                };
              }
              return room;
            });
            return {
              ...unit,
              rooms: updatedRooms,
            };
          }
          return unit;
        });
        return {
          ...floor,
          units: updatedUnits,
        };
      }
      return floor;
    });
    updateLocalFloors(updatedFloors);
  };

  const addCommonArea = (floorId: string) => {
    const updatedFloors = localFloors.map((floor) => {
      if (floor.id === floorId) {
        return {
          ...floor,
          commonAreas: [
            {
              id: uuid(),
              name: "Common Area",
              type: "General",
              area: "",
              isEnabled: true,
            },
          ],
        };
      }
      return floor;
    });
    updateLocalFloors(updatedFloors);
  };

  const removeFloor = (floorId: string) => {
    const updatedFloors = localFloors.filter((floor) => floor.id !== floorId);
    updateLocalFloors(updatedFloors);
  };

  const removeUnit = (floorId: string, unitId: string) => {
    const updatedFloors = localFloors.map((floor) => {
      if (floor.id === floorId) {
        return {
          ...floor,
          units: floor.units.filter((unit) => unit.id !== unitId),
        };
      }
      return floor;
    });
    updateLocalFloors(updatedFloors);
  };

  const removeRoom = (floorId: string, unitId: string, roomId: string) => {
    const updatedFloors = localFloors.map((floor) => {
      if (floor.id === floorId) {
        const updatedUnits = floor.units.map((unit) => {
          if (unit.id === unitId) {
            return {
              ...unit,
              rooms: unit.rooms.filter((room) => room.id !== roomId),
            };
          }
          return unit;
        });
        return {
          ...floor,
          units: updatedUnits,
        };
      }
      return floor;
    });
    updateLocalFloors(updatedFloors);
  };

  const removeCommonArea = (floorId: string) => {
    const updatedFloors = localFloors.map((floor) => {
      if (floor.id === floorId) {
        return {
          ...floor,
          commonAreas: [], // Remove all common areas for this floor
        };
      }
      return floor;
    });
    updateLocalFloors(updatedFloors);
  };

  const removeBedspace = (
    floorId: string,
    unitId: string,
    roomId: string,
    bedspaceId: string
  ) => {
    const updatedFloors = localFloors.map((floor) => {
      if (floor.id === floorId) {
        const updatedUnits = floor.units.map((unit) => {
          if (unit.id === unitId) {
            const updatedRooms = unit.rooms.map((room) => {
              if (room.id === roomId) {
                return {
                  ...room,
                  bedspaces: room.bedspaces.filter(
                    (bedspace) => bedspace.id !== bedspaceId
                  ),
                };
              }
              return room;
            });
            return {
              ...unit,
              rooms: updatedRooms,
            };
          }
          return unit;
        });
        return {
          ...floor,
          units: updatedUnits,
        };
      }
      return floor;
    });
    updateLocalFloors(updatedFloors);
  };

  return (
    <>
      <FormProvider {...methods}>
        <div className="space-y-6">
          <h1 className="text-lg font-semibold">
            Enhanced Unit Structure Setup
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Create a detailed hierarchical structure for your property with
            floors, apartments, and common areas.
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
          {localFloors.map((floor) => (
            <div key={floor.id} className="space-y-4">
              <FloorCard
                floor={floor}
                onAddUnit={() => addUnit(floor.id)}
                onAddCommonArea={() => addCommonArea(floor.id)}
                onRemove={() => removeFloor(floor.id)}
              />

              {/* Units for this floor */}
              <div className="ml-8 space-y-4">
                {floor.units.map((unit) => (
                  <div key={unit.id}>
                    <UnitCard
                      unit={unit}
                      onAddRoom={() => addRoom(floor.id, unit.id)}
                      onRemove={() => removeUnit(floor.id, unit.id)}
                    />

                    {/* Rooms for this unit */}
                    <div className="ml-8 space-y-4">
                      {unit.rooms.map((room) => (
                        <div key={room.id}>
                          <RoomCard
                            room={room}
                            onAddBedspace={() =>
                              addBedspace(floor.id, unit.id, room.id)
                            }
                            onRemove={() =>
                              removeRoom(floor.id, unit.id, room.id)
                            }
                          />

                          {/* Bedspaces for this room */}
                          <div className="ml-8">
                            {room.bedspaces.map((bedspace) => (
                              <BedspacesForm
                                key={bedspace.id}
                                bedspace={bedspace}
                                onAddCommonArea={() => addCommonArea(floor.id)}
                                removeBedspace={() =>
                                  removeBedspace(
                                    floor.id,
                                    unit.id,
                                    room.id,
                                    bedspace.id
                                  )
                                }
                              />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {floor.commonAreas.length > 0 && (
                <div className="ml-8">
                  <CommonAreaCard
                    removeCommonArea={() => removeCommonArea(floor.id)}
                  />
                </div>
              )}
            </div>
          ))}

          <div className="flex justify-center mt-8">
            <QuickAddSection onAddFloor={addFloor} />
          </div>
        </div>
      </FormProvider>
    </>
  );
};

export default EnhancedUnitStructure;
