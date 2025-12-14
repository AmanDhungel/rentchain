// Floors.tsx - Updated
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "../../../../ui/input";
import { Textarea } from "../../../../ui/textarea";
import { Button } from "../../../../ui/button";
import { Checkbox } from "../../../../ui/checkbox";
import { Card } from "../../../../ui/card";
import { Switch } from "../../../../ui/switch";
import { Trash2, Copy, GripVertical, ChevronDown, Image } from "lucide-react";
import { Label } from "../../../../ui/label";
import type { FloorType } from "./EnhancedUnitStructure";

interface FloorFormProps {
  floor: FloorType;
  onAddUnit: () => void;
  onAddCommonArea: () => void;
  onRemove: () => void;
}

export default function FloorForm({
  floor,
  onAddUnit,
  onAddCommonArea,
  onRemove,
}: FloorFormProps) {
  const { setValue, watch } = useFormContext();
  const [isSwitchOn, setIsSwitchOn] = useState(floor.isEnabled);

  const floors = watch("floors");
  const floorIndex = floors.findIndex((f) => f.id === floor.id);

  const updateFloor = (updates: Partial<FloorType>) => {
    const updatedFloors = [...floors];
    updatedFloors[floorIndex] = { ...floor, ...updates };
    setValue("floors", updatedFloors);
  };

  const handleSwitchChange = (checked: boolean) => {
    setIsSwitchOn(checked);
    updateFloor({ isEnabled: checked });
  };

  return (
    <Card className="p-4 w-full">
      <div className="flex items-center gap-2 mb-4">
        <GripVertical className="text-gray-600" />
        <ChevronDown className="text-gray-600" />
        <span className="px-4 py-1 bg-orange-500 text-white rounded-md text-sm font-medium">
          Floor {floor.number}
        </span>
        <span className="px-4 py-1 bg-white border border-gray-400 text-slate-700 rounded-md text-sm">
          {floor.units.length} Units
        </span>
        <span className="px-4 py-1 bg-white border border-gray-400 text-slate-700 rounded-md text-sm">
          {floor.units.reduce((acc, unit) => acc + unit.rooms.length, 0)} Rooms
        </span>
        <span className="px-4 py-1 bg-white border border-gray-400 text-slate-700 rounded-md text-sm">
          {floor.units.reduce(
            (acc, unit) =>
              acc +
              unit.rooms.reduce(
                (roomAcc, room) => roomAcc + room.bedspaces.length,
                0
              ),
            0
          )}{" "}
          Bedspaces
        </span>
        <div className="ml-auto flex items-center gap-2">
          <Switch checked={isSwitchOn} onCheckedChange={handleSwitchChange} />
          <Copy className="text-green-600 cursor-pointer" />
          <Trash2 className="text-red-600 cursor-pointer" onClick={onRemove} />
        </div>
      </div>

      <div className="flex flex-col gap-1 mb-4">
        <p className="font-semibold text-gray-700">Floor {floor.number}</p>
        <div className="flex">
          <p className="text-sm text-gray-500 mr-2">
            {floor.description || "No description"}
          </p>
          <Label
            htmlFor={`mediaFile-${floor.id}`}
            className="border border-gray-400 p-2 py-1 h-7 ml-4 -mt-7 rounded-sm">
            <Image className="w-4 h-4" /> Media 0
          </Label>
          <Input
            type="file"
            name={`mediaFile-${floor.id}`}
            id={`mediaFile-${floor.id}`}
            className="hidden"
          />
        </div>
      </div>

      {isSwitchOn && (
        <>
          <h3 className="font-medium text-gray-800 mb-4">Add New Floor</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
            <div>
              <Input
                placeholder="e.g., 1, 2, 3"
                value={floor.number}
                onChange={(e) => updateFloor({ number: e.target.value })}
              />
            </div>
            <Input
              placeholder="e.g., Ground Floor, Mezzanine"
              value={floor.name}
              onChange={(e) => updateFloor({ name: e.target.value })}
            />
          </div>

          <div className="mb-4">
            <p className="text-sm font-medium">Floor Description (Optional)</p>
            <Textarea
              placeholder="E.G., Main Entrance Level With Reception And Common Areas, Residential Units, Commercial Space..."
              value={floor.description}
              onChange={(e) => updateFloor({ description: e.target.value })}
            />
          </div>

          <div className="flex items-center gap-6 mb-6">
            <label className="flex items-center gap-2 text-sm">
              <Checkbox /> ADA Accessible
            </label>
            <label className="flex items-center gap-2 text-sm">
              <Checkbox defaultChecked /> Fire Safety Compliant
            </label>
          </div>
        </>
      )}

      <div className="flex flex-wrap gap-3 items-center justify-center">
        <Button variant="outline" size="sm" onClick={onAddUnit}>
          + Units/Apartments
        </Button>
        <Button variant="outline" size="sm">
          + Rooms
        </Button>
        <Button variant="outline" size="sm">
          + Bedspaces
        </Button>
        <Button variant="outline" size="sm" onClick={onAddCommonArea}>
          + Common Area
        </Button>
      </div>
    </Card>
  );
}
