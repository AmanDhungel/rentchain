import React, { useState, useRef } from "react";
import { v4 as uuid } from "uuid";
import {
  Copy,
  Trash2,
  Upload,
  ChevronDown,
  GripVertical,
  Image as ImageIcon,
} from "lucide-react";

import { Input } from "../../../ui/input";
import { Button } from "../../../ui/button";
import { Card } from "../../../ui/card";
import { Switch } from "../../../ui/switch";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../../ui/select";
import { Checkbox } from "../../../ui/checkbox";
import { Label } from "../../../ui/label";
import Image from "next/image";

export default function UnitForm({ unit, onAddRoom, onRemove }) {
  const [items, setItems] = useState([]);
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const fileInputsRef = useRef({});

  function addItem() {
    setItems((s) => [
      ...s,
      { id: uuid(), name: "", condition: "Good", photo: null },
    ]);
  }

  function updateItem(id, patch) {
    setItems((s) => s.map((it) => (it.id === id ? { ...it, ...patch } : it)));
  }

  function removeItem(id) {
    setItems((s) => s.filter((it) => it.id !== id));
  }

  function handleFileChange(e, id) {
    const file = e.target.files?.[0] ?? null;
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => updateItem(id, { photo: reader.result });
    reader.readAsDataURL(file);
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
    <Card className="w-full p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center gap-2 text-gray-500 cursor-move">
          <GripVertical />
          <ChevronDown />
        </div>

        <div className="inline-flex items-center px-4 py-1 rounded-md bg-orange-500 text-white text-sm font-medium">
          Unit 1
        </div>

        <div className="inline-flex items-center gap-2 ml-2">
          <div className="px-3 py-1 bg-white border border-gray-200 rounded-md text-sm">
            0 Rooms
          </div>
          <div className="px-3 py-1 bg-white border border-gray-200 rounded-md text-sm">
            0 Bedspaces
          </div>
        </div>

        <div className="ml-auto flex items-center gap-3">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="hidden" />
            <div className="flex items-center">
              <Switch onCheckedChange={(res) => setIsSwitchOn(res)} />
            </div>
          </label>
          <Copy className="text-green-500 cursor-pointer" />
          <Trash2 className="text-red-500 cursor-pointer" onClick={onRemove} />
        </div>
      </div>

      {/* Title */}

      <div className="flex flex-col gap-1 mb-4">
        <p className="font-semibold text-gray-700">Apartment 101</p>
        <div className="flex">
          <p className="text-sm text-gray-500 mr-2">Apartment</p>
          <Label
            htmlFor="mediaFile"
            className="border border-gray-400 p-2 py-1 h-7 ml-14 -mt-7 rounded-sm">
            <ImageIcon className="w-4 h-4" /> Media 0
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left column */}
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium mb-1 block">
                  Apartment Name
                </label>
                <Input placeholder="e.g. Apt 101" />
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">
                  Area (sq ft)
                </label>
                <Input placeholder="eg. 800" />
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">
                  Occupancy Status
                </label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Vacant" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vacant">Vacant</SelectItem>
                    <SelectItem value="occupied">Occupied</SelectItem>
                    <SelectItem value="reserved">Reserved</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="mt-2">
                <label className="text-sm font-medium mb-1 block">
                  Furnished Status
                </label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Furnished" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="furnished">Furnished</SelectItem>
                    <SelectItem value="unfurnished">Unfurnished</SelectItem>
                    <SelectItem value="part">Partially Furnished</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Right column */}
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium mb-1 block">
                  Apartment Type
                </label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Studio" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="studio">Studio</SelectItem>
                    <SelectItem value="one">1 BHK</SelectItem>
                    <SelectItem value="two">2 BHK</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">
                  Capacity
                </label>
                <Input placeholder="eg. 2" />
              </div>

              {/* Furniture & Fixtures */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium">
                    Furniture & Fixtures{" "}
                    <span className="text-gray-400">
                      {items.length} Item{items.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <Button onClick={addItem} variant="outline" size="sm">
                    + Add Item
                  </Button>
                </div>

                <div className="space-y-3">
                  {items.map((it) => (
                    <div key={it.id} className="border rounded-md p-3 bg-white">
                      <div className="flex gap-3 items-start">
                        <div className="flex-1">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                            <div>
                              <label className="text-xs font-medium">
                                Item
                              </label>
                              <Input
                                value={it.name}
                                onChange={(e) =>
                                  updateItem(it.id, { name: e.target.value })
                                }
                                placeholder="e.g. sofa"
                              />
                            </div>

                            <div>
                              <label className="text-xs font-medium">
                                Condition
                              </label>
                              <Select>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder={it.condition} />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Excellent">
                                    Excellent
                                  </SelectItem>
                                  <SelectItem value="Good">Good</SelectItem>
                                  <SelectItem value="Fair">Fair</SelectItem>
                                  <SelectItem value="Needs Repair">
                                    Needs Repair
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div>
                              <label className="text-xs font-medium">
                                Photo
                              </label>
                              <div className="flex items-center gap-2">
                                <Label
                                  htmlFor="furnitureFileInput"
                                  className="border border-gray-300 p-2 rounded-md">
                                  <Upload className="w-4 h-4" />
                                  Photo
                                </Label>
                                <Input
                                  ref={(el) =>
                                    (fileInputsRef.current[it.id] = el)
                                  }
                                  onChange={(e) => handleFileChange(e, it.id)}
                                  type="file"
                                  accept="image/*"
                                  className="text-sm w-15 hidden"
                                  id="furnitureFileInput"
                                />
                                <button
                                  className="text-sm text-red-500"
                                  onClick={() => removeItem(it.id)}>
                                  <Trash2 />
                                </button>
                              </div>
                            </div>
                          </div>

                          {it.photo && (
                            <Image
                              src={it.photo}
                              alt="preview"
                              className="mt-3 h-20 w-20 object-cover rounded"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* counters */}
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div>
                      Excellent:{" "}
                      <span className="font-medium text-gray-800">
                        {counts.excellent}
                      </span>
                    </div>
                    <div>
                      Good:{" "}
                      <span className="font-medium text-gray-800">
                        {counts.good}
                      </span>
                    </div>
                    <div>
                      Fair:{" "}
                      <span className="font-medium text-gray-800">
                        {counts.fair}
                      </span>
                    </div>
                    <div>
                      Needs Repair:{" "}
                      <span className="font-medium text-gray-800">
                        {counts.needsRepair}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <label className="flex items-center gap-3">
              <Checkbox />
              <span className="text-sm font-medium">Rent Pricing</span>
            </label>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
              <div>
                <label className="text-sm font-medium mb-1 block">
                  Baseline Rent ($)
                </label>
                <Input placeholder="e.g. 1500" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">
                  Minimum Rent (5)
                </label>
                <Input placeholder="e.g. 1500" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">
                  Maximum Rent (5)
                </label>
                <Input placeholder="e.g. 1500" />
              </div>
            </div>
          </div>
        </>
      )}
      <div className="  pt-4 flex justify-center gap-3">
        <Button
          variant="ghost"
          className="bg-white shadow-sm"
          onClick={onAddRoom}>
          + Rooms
        </Button>
        <Button variant="ghost" className="bg-white shadow-sm">
          + Bedspaces
        </Button>
        <Button variant="ghost" className="bg-white shadow-sm">
          + Common Area
        </Button>
      </div>
    </Card>
  );
}
