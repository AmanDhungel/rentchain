import React, { useState } from "react";
import { Card, CardContent } from "../../../ui/card";
import { Input } from "../../../ui/input";
import { Label } from "../../../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../ui/select";
import { Switch } from "../../../ui/switch";
import { Menu, ChevronDown, Copy, Trash2, GripVertical } from "lucide-react";
import { Button } from "../../../ui";
import { Checkbox } from "../../../ui/checkbox";

export default function CommonAreaCard({ removeCommonArea }) {
  const [enabled, setEnabled] = useState(true);
  const [areaType, setAreaType] = useState("Swimming Pool");
  const [chargeable, setChargeable] = useState(true);

  return (
    <div className="mx-auto">
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-md text-slate-400 hover:text-slate-600">
              <GripVertical />
            </button>
            <button className="p-1 rounded-full text-slate-500">
              <ChevronDown />
            </button>

            <Button className=" bg-orange-500 text-white text-sm font-medium px-3 py-1 rounded-md">
              Common Area
            </Button>

            <div className="flex items-center gap-2 ml-2">
              <Button variant="outline">1 Units</Button>
              <Button variant="outline">0 Rooms</Button>
              <Button variant="outline">0 Bedspaces</Button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Switch checked={enabled} onCheckedChange={setEnabled} />
            <button
              className="p-1 rounded-md text-slate-400 hover:text-slate-600"
              title="Duplicate">
              <Copy className="text-green-500" />
            </button>
            <button
              className="p-1 rounded-md text-red-500 hover:text-red-700"
              title="Delete"
              onClick={removeCommonArea}>
              <Trash2 />
            </button>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="text-slate-800 font-semibold">Common Area</h3>
          <p className="text-slate-400 text-sm">lorem sdasd</p>
        </div>
        {enabled && (
          <>
            <Card className="mt-4 border rounded-lg">
              <CardContent className="p-5">
                <h4 className="text-slate-800 font-semibold mb-4">
                  Add Common Area
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm">Area Name</Label>
                    <Input placeholder="e.g., Swimming Pool" />
                  </div>

                  <div>
                    <Label className="text-sm">Area Type</Label>
                    <Select
                      value={areaType}
                      onValueChange={(v) => setAreaType(v)}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={areaType} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Swimming Pool">
                          Swimming Pool
                        </SelectItem>
                        <SelectItem value="Gym">Gym</SelectItem>
                        <SelectItem value="Lobby">Lobby</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm">Area (sq ft)</Label>
                    <Input placeholder="eg. 800" />
                  </div>

                  <div>
                    <Label className="text-sm">Capacity (optional)</Label>
                    <Input placeholder="eg. 2" />
                  </div>

                  <div className="pt-6">
                    <label className="inline-flex items-center gap-2 cursor-pointer">
                      <Checkbox
                        className=""
                        defaultValue={chargeable as any}
                        onCheckedChange={(res) => {
                          setChargeable(res as boolean);
                        }}
                      />
                      <span className="text-sm text-slate-700">Chargeable</span>
                    </label>
                  </div>

                  <div>
                    <Label className="text-sm">Usage Fee Per Unit</Label>
                    <Input placeholder="eg. $50 per person" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
