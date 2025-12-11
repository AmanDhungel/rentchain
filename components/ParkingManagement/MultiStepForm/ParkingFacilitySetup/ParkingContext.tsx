import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
} from "react";
import {
  Facility,
  Level,
  Zone,
  Row,
  Space,
  AddLevelData,
  AddZoneData,
  AddRowData,
  SingleSpaceData,
  BulkAddData,
  generateId,
} from "./Facility.types";

type ParkingState = Facility;

type DeleteType = "level" | "zone" | "row" | "space";

interface ParkingContextType {
  state: ParkingState;
  addLevel: (data: AddLevelData) => void;
  addZone: (levelId: string, data: AddZoneData) => void;
  addRow: (levelId: string, zoneId: string, data: AddRowData) => void;
  addSingleSpace: (
    levelId: string,
    zoneId: string,
    rowId: string,
    data: SingleSpaceData
  ) => void;
  bulkAddSpaces: (
    levelId: string,
    zoneId: string,
    rowId: string,
    count: number,
    data: BulkAddData
  ) => void;
  deleteItem: (
    type: DeleteType,
    itemId: string,
    parentIds?: { levelId?: string; zoneId?: string; rowId?: string }
  ) => void;
  copyZone: (levelId: string, zoneId: string) => void;
  // Utility for counts
  getTotalSpaces: () => number;
  getTotalLevels: () => number;
  getTotalZones: () => number;
  getTotalRows: () => number;
}

// --- Initial State ---
const initialState: ParkingState = {
  name: "Plaza Tower Parking",
  levels: [
    // Initial structure to match the screenshot for Level 1, Zone 1, Row 1
    {
      id: "level-1",
      levelName: "Level 1",
      levelNumber: 1,
      levelType: "Elevated",
      heightClearance: 0.3,
      surfaceType: "Concrete",
      lightingType: "LED",
      hasElevator: false,
      hasStairs: false,
      hasVehicleLift: false,
      hasFireSafety: false,
      hasSprinklerSystem: false,
      zones: [
        {
          id: "zone-1",
          zoneName: "Zone1",
          zoneCode: "Z-A",
          zoneType: "VIP",
          area: 0,
          hasLighting: true,
          hasCCTV: true,
          hasWeatherProtection: false,
          rows: [
            {
              id: "row-1",
              rowName: "Row1",
              rowCode: "r1",
              parkingOrientation: "Perpendicular",
              spacingWidth: 2.5,
              aisleWidth: 5,
              spaces: [],
            },
          ],
        },
      ],
    },
  ],
};

const ParkingContext = createContext<ParkingContextType | undefined>(undefined);

// --- Reducer Actions ---
type Action =
  | { type: "ADD_LEVEL"; payload: Level }
  | { type: "ADD_ZONE"; payload: { levelId: string; zone: Zone } }
  | { type: "ADD_ROW"; payload: { levelId: string; zoneId: string; row: Row } }
  | {
      type: "ADD_SPACE";
      payload: {
        levelId: string;
        zoneId: string;
        rowId: string;
        spaces: Space[];
      };
    }
  | {
      type: "DELETE_ITEM";
      payload: {
        type: DeleteType;
        itemId: string;
        parentIds?: { levelId?: string; zoneId?: string; rowId?: string };
      };
    }
  | { type: "COPY_ZONE"; payload: { levelId: string; zone: Zone } };

// --- Reducer Function ---
const parkingReducer = (state: ParkingState, action: Action): ParkingState => {
  switch (action.type) {
    case "ADD_LEVEL":
      return { ...state, levels: [...state.levels, action.payload] };

    case "ADD_ZONE":
      return {
        ...state,
        levels: state.levels.map((level) =>
          level.id === action.payload.levelId
            ? { ...level, zones: [...level.zones, action.payload.zone] }
            : level
        ),
      };

    case "ADD_ROW":
      return {
        ...state,
        levels: state.levels.map((level) =>
          level.id === action.payload.levelId
            ? {
                ...level,
                zones: level.zones.map((zone) =>
                  zone.id === action.payload.zoneId
                    ? { ...zone, rows: [...zone.rows, action.payload.row] }
                    : zone
                ),
              }
            : level
        ),
      };

    case "ADD_SPACE":
      return {
        ...state,
        levels: state.levels.map((level) =>
          level.id === action.payload.levelId
            ? {
                ...level,
                zones: level.zones.map((zone) =>
                  zone.id === action.payload.zoneId
                    ? {
                        ...zone,
                        rows: zone.rows.map((row) =>
                          row.id === action.payload.rowId
                            ? {
                                ...row,
                                spaces: [
                                  ...row.spaces,
                                  ...action.payload.spaces,
                                ],
                              }
                            : row
                        ),
                      }
                    : zone
                ),
              }
            : level
        ),
      };

    case "DELETE_ITEM": {
      const { type, itemId, parentIds } = action.payload;

      if (type === "level") {
        return {
          ...state,
          levels: state.levels.filter((l) => l.id !== itemId),
        };
      }

      if (type === "zone" && parentIds?.levelId) {
        return {
          ...state,
          levels: state.levels.map((level) =>
            level.id === parentIds.levelId
              ? { ...level, zones: level.zones.filter((z) => z.id !== itemId) }
              : level
          ),
        };
      }

      if (type === "row" && parentIds?.levelId && parentIds?.zoneId) {
        return {
          ...state,
          levels: state.levels.map((level) =>
            level.id === parentIds.levelId
              ? {
                  ...level,
                  zones: level.zones.map((zone) =>
                    zone.id === parentIds.zoneId
                      ? {
                          ...zone,
                          rows: zone.rows.filter((r) => r.id !== itemId),
                        }
                      : zone
                  ),
                }
              : level
          ),
        };
      }

      if (
        type === "space" &&
        parentIds?.levelId &&
        parentIds?.zoneId &&
        parentIds?.rowId
      ) {
        return {
          ...state,
          levels: state.levels.map((level) =>
            level.id === parentIds.levelId
              ? {
                  ...level,
                  zones: level.zones.map((zone) =>
                    zone.id === parentIds.zoneId
                      ? {
                          ...zone,
                          rows: zone.rows.map((row) =>
                            row.id === parentIds.rowId
                              ? {
                                  ...row,
                                  spaces: row.spaces.filter(
                                    (s) => s.id !== itemId
                                  ),
                                }
                              : row
                          ),
                        }
                      : zone
                  ),
                }
              : level
          ),
        };
      }
      return state;
    }

    case "COPY_ZONE": {
      return {
        ...state,
        levels: state.levels.map((level) =>
          level.id === action.payload.levelId
            ? { ...level, zones: [...level.zones, action.payload.zone] }
            : level
        ),
      };
    }

    default:
      return state;
  }
};

// --- Provider Component ---
export const ParkingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(parkingReducer, initialState);

  // --- Utility Functions for Counts ---
  const getTotalSpaces = useCallback(() => {
    return state.levels.reduce(
      (accL, level) =>
        accL +
        level.zones.reduce(
          (accZ, zone) =>
            accZ + zone.rows.reduce((accR, row) => accR + row.spaces.length, 0),
          0
        ),
      0
    );
  }, [state.levels]);

  const getTotalLevels = useCallback(() => state.levels.length, [state.levels]);

  const getTotalZones = useCallback(() => {
    return state.levels.reduce((acc, level) => acc + level.zones.length, 0);
  }, [state.levels]);

  const getTotalRows = useCallback(() => {
    return state.levels.reduce(
      (accL, level) =>
        accL + level.zones.reduce((accZ, zone) => accZ + zone.rows.length, 0),
      0
    );
  }, [state.levels]);

  // --- Action Handlers ---
  const addLevel = useCallback((data: AddLevelData) => {
    dispatch({
      type: "ADD_LEVEL",
      payload: { ...data, id: generateId(), zones: [] } as Level,
    });
  }, []);

  const addZone = useCallback((levelId: string, data: AddZoneData) => {
    dispatch({
      type: "ADD_ZONE",
      payload: {
        levelId,
        zone: { ...data, id: generateId(), rows: [] } as Zone,
      },
    });
  }, []);

  const addRow = useCallback(
    (levelId: string, zoneId: string, data: AddRowData) => {
      dispatch({
        type: "ADD_ROW",
        payload: {
          levelId,
          zoneId,
          row: { ...data, id: generateId(), spaces: [] } as Row,
        },
      });
    },
    []
  );

  const addSingleSpace = useCallback(
    (levelId: string, zoneId: string, rowId: string, data: SingleSpaceData) => {
      const newSpace: Space = { ...data, id: generateId() };
      dispatch({
        type: "ADD_SPACE",
        payload: { levelId, zoneId, rowId, spaces: [newSpace] },
      });
    },
    []
  );

  const bulkAddSpaces = useCallback(
    (
      levelId: string,
      zoneId: string,
      rowId: string,
      count: number,
      data: BulkAddData
    ) => {
      const newSpaces: Space[] = [];
      const prefix = data.prefix ? `${data.prefix}-` : "";
      for (let i = 0; i < count; i++) {
        const spaceNumber = data.startingNumber + i;
        newSpaces.push({
          ...data,
          id: generateId(),
          spaceNumber: `${prefix}${spaceNumber.toString().padStart(3, "0")}`, // Example: P-010
        } as Space);
      }
      dispatch({
        type: "ADD_SPACE",
        payload: { levelId, zoneId, rowId, spaces: newSpaces },
      });
    },
    []
  );

  const deleteItem = useCallback(
    (
      type: DeleteType,
      itemId: string,
      parentIds?: { levelId?: string; zoneId?: string; rowId?: string }
    ) => {
      // Cascading deletion is handled naturally by the filter in the reducer,
      // as parent components calling delete will just be removed, taking children with them.
      // The reducer handles the specific filter logic for each level.
      dispatch({ type: "DELETE_ITEM", payload: { type, itemId, parentIds } });
    },
    []
  );

  const copyZone = useCallback(
    (levelId: string, zoneId: string) => {
      const level = state.levels.find((l) => l.id === levelId);
      if (!level) return;

      const zoneToCopy = level.zones.find((z) => z.id === zoneId);
      if (!zoneToCopy) return;

      // Deep copy logic to generate new unique IDs for the zone and all its descendants
      const deepCopy = (item: any): any => {
        if (!item || typeof item !== "object") return item;
        const newItem = Array.isArray(item) ? [] : { ...item };

        for (const key in item) {
          if (key === "id") {
            newItem[key] = generateId(); // Assign new ID
          } else if (key === "rows" && Array.isArray(item[key])) {
            newItem[key] = item[key].map(deepCopy);
          } else if (key === "spaces" && Array.isArray(item[key])) {
            newItem[key] = item[key].map(deepCopy);
          } else {
            newItem[key] = item[key]; // Copy other properties
          }
        }
        return newItem as Zone;
      };

      const newZone = deepCopy(zoneToCopy);
      newZone.zoneName = `Copy of ${zoneToCopy.zoneName}`; // Rename for clarity

      dispatch({ type: "COPY_ZONE", payload: { levelId, zone: newZone } });
    },
    [state.levels]
  );

  const contextValue = {
    state,
    addLevel,
    addZone,
    addRow,
    addSingleSpace,
    bulkAddSpaces,
    deleteItem,
    copyZone,
    getTotalSpaces,
    getTotalLevels,
    getTotalZones,
    getTotalRows,
  };

  return (
    <ParkingContext.Provider value={contextValue}>
      {children}
    </ParkingContext.Provider>
  );
};

// --- Custom Hook ---
export const useParking = () => {
  const context = useContext(ParkingContext);
  if (context === undefined) {
    throw new Error("useParking must be used within a ParkingProvider");
  }
  return context;
};
