import React, { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { v4 as uuid } from "uuid";
import { Copy, Trash2, GripVertical, ChevronDown, Image } from "lucide-react";
import { Input } from "../../../../ui/input";
import { Button } from "../../../../ui/button";
import { Card } from "../../../../ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../../../ui/select";
import { Checkbox } from "../../../../ui/checkbox";
import { Switch } from "../../../../ui/switch";
import { Label } from "../../../../ui/label";

interface RoomFurnitureItem {
  id: string;
  name: string;
  condition: "Excellent" | "Good" | "Fair" | "Needs Repair";
  photo?: File | null;
}

export default function RoomForm({ room, onAddBedspace, onRemove }) {
  const { register, control, setValue, watch } = useFormContext();
  const items: RoomFurnitureItem[] = watch("furniture", []);
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  function addItem() {
    const newItem: RoomFurnitureItem = {
      id: uuid(),
      name: "",
      condition: "Good",
      photo: null,
    };
    setValue("furniture", [...items, newItem]);
  }

  function updateItem(id: string, patch: Partial<RoomFurnitureItem>) {
    const updated = items.map((it) =>
      it.id === id ? { ...it, ...patch } : it
    );
    setValue("furniture", updated);
  }

  function removeItem(id: string) {
    setValue(
      "furniture",
      items.filter((it) => it.id !== id)
    );
  }

  const counts = items.reduce(
    (acc, it) => {
      if (it.condition === "Excellent") acc.excellent++;
      if (it.condition === "Good") acc.good++;
      if (it.condition === "Fair") acc.fair++;
      if (it.condition === "Needs Repair") acc.needsRepair++;
      return acc;
    },
    { excellent: 0, good: 0, fair: 0, needsRepair: 0 }
  );

  return (
    <Card className="w-full p-6 mt-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center gap-2 text-gray-500 cursor-move">
          <GripVertical />
          <ChevronDown />
        </div>

        <div className="inline-flex items-center px-4 py-1 rounded-md bg-orange-500 text-white text-sm font-medium">
          Room 1
        </div>

        <div className="inline-flex items-center gap-2 ml-2">
          <div className="px-3 py-1 bg-white border border-gray-200 rounded-md text-sm">
            0 Bedspaces
          </div>
        </div>

        <div className="ml-auto flex items-center gap-3">
          <Switch onCheckedChange={(res) => setIsSwitchOn(res)} />
          <Copy className="text-green-500 cursor-pointer" />
          <Trash2 className="text-red-500 cursor-pointer" onClick={onRemove} />
        </div>
      </div>

      <div className="flex flex-col gap-1 mb-4">
        <p className="font-semibold text-gray-700">Room</p>
        <div className="flex">
          <p className="text-sm text-gray-500 mr-2">Apartment</p>
          <Label
            htmlFor="mediaFile"
            className="border border-gray-400 p-2 py-1 h-7 ml-4 -mt-7 rounded-sm">
            <Image className="w-4 h-4" /> Media 0
          </Label>
          <Input
            type="file"
            name="mediaFile"
            id="mediaFile"
            className="hidden"
          />
        </div>
      </div>

      {isSwitchOn && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="text-sm font-medium mb-1 block">
                Room Name
              </label>
              <Input placeholder="bed room" {...register("roomName")} />
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">
                Room Type
              </label>
              <Controller
                control={control}
                name="roomType"
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Bedroom" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bedroom">Bedroom</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">
                Area (sq ft)
              </label>
              <Input placeholder="3000" {...register("area")} />
            </div>
          </div>

          <div className="mb-4">
            <label className="text-sm font-medium mb-1 block">
              Sharing Type
            </label>
            <Controller
              control={control}
              name="sharingType"
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Private (single occupant)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="private">Private</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-sm font-medium mb-1 block">
                Number Of Beds
              </label>
              <Input placeholder="2" {...register("numberOfBeds")} />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">
                Default Bed Type
              </label>
              <Controller
                control={control}
                name="defaultBedType"
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Single Bed" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Single Bed</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          <label className="flex items-center gap-3 mb-4">
            <Checkbox defaultChecked {...register("rentPricing")} />
            <span className="text-sm font-medium">Rent Pricing</span>
          </label>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="text-sm font-medium mb-1 block">
                Baseline Rent ($)
              </label>
              <Input placeholder="e.g. 1500" {...register("baselineRent")} />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">
                Minimum Rent ($)
              </label>
              <Input placeholder="e.g. 1500" {...register("minRent")} />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">
                Maximum Rent ($)
              </label>
              <Input placeholder="e.g. 1500" {...register("maxRent")} />
            </div>
          </div>
        </>
      )}
      <div className=" flex justify-center gap-3">
        <Button
          variant="ghost"
          className="bg-white shadow-sm"
          onClick={onAddBedspace}>
          + Bedspaces
        </Button>
        <Button variant="ghost" className="bg-white shadow-sm">
          + Common Area
        </Button>
      </div>
    </Card>
  );
}
