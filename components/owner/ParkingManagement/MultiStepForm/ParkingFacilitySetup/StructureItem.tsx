// src/components/StructureItem.tsx
import React, { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  LayoutGrid,
  Layers,
  Scale,
  Car,
  Trash2,
  Copy,
} from "lucide-react";
import { Level, Zone, Row, Space } from "./Facility.types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useParking } from "./ParkingContext";
import { AddZoneDialog } from "./AddZoneDialog";
import { AddRowDialog } from "./AddRowDialog";
import { AddSpaceDialog } from "./AddSpaceDialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type ItemType = Level | Zone | Row;
type ItemKey = "level" | "zone" | "row";

interface StructureItemProps {
  item: ItemType;
  type: ItemKey;
  parentIds?: { levelId?: string; zoneId?: string };
}

// Utility to get count for display
const getChildrenCount = (item: ItemType): string => {
  if ("zones" in item) return `${item.zones.length} Zones`;
  if ("rows" in item) return `${item.rows.length} Rows`;
  if ("spaces" in item) return `${item.spaces.length} Spaces`;
  return "";
};

// Utility to get details for display
const getDetails = (item: ItemType): string => {
  if ("levelType" in item)
    return `${item.levelType} • ${item.heightClearance}m clearance`;
  if ("zoneType" in item) return `${item.zoneCode} • ${item.zoneType}`;
  if ("parkingOrientation" in item)
    return `${item.rowCode} • ${item.parkingOrientation}`;
  return "";
};

// --- Space Renderer Component ---
const SpaceRenderer: React.FC<{ spaces: Space[] }> = ({ spaces }) => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 pt-4">
    {spaces.map((space) => (
      <Card key={space.id} className="p-2 text-xs bg-gray-50 dark:bg-gray-800">
        <div className="font-semibold text-primary">{space.spaceNumber}</div>
        <div className="text-muted-foreground">{space.spaceType}</div>
        <div className="text-[10px]">
          {space.width}m x {space.length}m
        </div>
      </Card>
    ))}
    {spaces.length === 0 && (
      <p className="text-muted-foreground italic col-span-full">
        No spaces defined yet.
      </p>
    )}
  </div>
);

const getIcon = (itemType: ItemKey) => {
  switch (itemType) {
    case "level":
      return Layers;
    case "zone":
      return LayoutGrid;
    case "row":
      return Scale;
    default:
      return Car;
  }
};

const Icon = getIcon("level");

export const StructureItem: React.FC<StructureItemProps> = ({
  item,
  type,
  parentIds,
}) => {
  const [isExpanded, setIsExpanded] = useState(type !== "row");
  const { deleteItem, copyZone } = useParking();

  // Determine children to render
  const children =
    type === "level"
      ? (item as Level).zones
      : type === "zone"
      ? (item as Zone).rows
      : null;

  const levelId = type === "level" ? item.id : parentIds?.levelId;
  const zoneId = type === "zone" ? item.id : parentIds?.zoneId;
  const rowId = type === "row" ? item.id : undefined;

  // --- Deletion Dialog ---
  const DeleteDialog = (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-destructive hover:text-destructive">
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the **
            {type.toUpperCase()}** `
            {"levelName" in item
              ? item.levelName
              : "zoneName" in item
              ? item.zoneName
              : "rowName" in item
              ? item.rowName
              : "Item"}
            ` and all its nested children.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() =>
              deleteItem(type, item.id!, { levelId, zoneId, rowId })
            }
            className="bg-destructive hover:bg-destructive/90">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  return (
    <div className="relative">
      <Card
        className={`transition-all ${type !== "level" ? "border-l-4" : ""} ${
          type === "level"
            ? "border-primary/50"
            : type === "zone"
            ? "border-orange-500/50"
            : "border-slate-500/50"
        }`}>
        <CardHeader className="flex flex-row items-center justify-between p-3 sm:p-4">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
            <Icon
              className={`h-5 w-5 ${
                type === "level"
                  ? "text-primary"
                  : type === "zone"
                  ? "text-orange-500"
                  : "text-slate-500"
              }`}
            />

            <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
              <CardTitle className="text-base font-semibold">
                {"levelName" in item
                  ? item.levelName
                  : "zoneName" in item
                  ? item.zoneName
                  : (item as Row).rowName}
              </CardTitle>
              <span className="text-sm font-normal text-muted-foreground">
                {getDetails(item)} • {getChildrenCount(item)}
              </span>
            </div>
          </div>

          {/* --- Action Buttons --- */}
          <div className="flex items-center gap-1">
            {/* Copy Zone Button */}
            {type === "zone" && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => levelId && copyZone(levelId, item.id!)}
                title="Copy Zone">
                <Copy className="h-4 w-4" />
              </Button>
            )}

            {/* Add Child Dialog Trigger */}
            {type === "level" && levelId && (
              <AddZoneDialog levelId={levelId}>
                <Button variant="outline" size="sm">
                  Add Zone
                </Button>
              </AddZoneDialog>
            )}
            {type === "zone" && levelId && zoneId && (
              <AddRowDialog levelId={levelId} zoneId={zoneId}>
                <Button variant="outline" size="sm">
                  Add Row
                </Button>
              </AddRowDialog>
            )}
            {type === "row" && levelId && zoneId && rowId && (
              <AddSpaceDialog levelId={levelId} zoneId={zoneId} rowId={rowId}>
                <Button variant="outline" size="sm">
                  Add Space
                </Button>
              </AddSpaceDialog>
            )}

            {/* Delete Button */}
            {DeleteDialog}
          </div>
        </CardHeader>

        {/* --- Content Area (Expanded) --- */}
        {isExpanded && (
          <CardContent className={`pt-2 ${children ? "space-y-4" : ""}`}>
            {type === "row" && <SpaceRenderer spaces={(item as Row).spaces} />}

            {children && children.length > 0 && (
              <div className="space-y-3 pl-4 border-l border-dashed ml-3">
                <Separator className="my-2" />
                {children.map((child: ItemType) => (
                  <StructureItem
                    key={child.id}
                    item={child}
                    type={type === "level" ? "zone" : "row"}
                    parentIds={{ levelId, zoneId }}
                  />
                ))}
              </div>
            )}
          </CardContent>
        )}
      </Card>
    </div>
  );
};
