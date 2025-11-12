import * as React from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import {
  Button,
  Input,
  Label,
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Switch,
} from "../../../ui/index";
import {
  Trash2,
  Image as ImageIcon,
  Pencil,
  Copy,
  GripVertical,
  ChevronDown,
} from "lucide-react";

type Bed = {
  name: string;
  type: string;
};

type FormValues = {
  numberOfBeds: number;
  defaultBedType: string;
  beds: Bed[];
};

export function BedspacesForm({ bedspace, onAddCommonArea, removeBedspace }) {
  const { control, register, watch, setValue } = useForm<FormValues>({
    defaultValues: {
      numberOfBeds: 2,
      defaultBedType: "Single Bed",
      beds: [
        { name: "Bed 1", type: "Single Bed" },
        { name: "Bed 2", type: "Single Bed" },
      ],
    },
  });

  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "beds",
  });

  const numberOfBeds = watch("numberOfBeds");
  const defaultBedType = watch("defaultBedType");

  React.useEffect(() => {
    const currentBeds = fields.length;
    if (numberOfBeds > currentBeds) {
      for (let i = currentBeds; i < numberOfBeds; i++) {
        append({ name: `Bed ${i + 1}`, type: defaultBedType });
      }
    } else if (numberOfBeds < currentBeds) {
      for (let i = currentBeds; i > numberOfBeds; i--) {
        remove(i - 1);
      }
    }
  }, [numberOfBeds, defaultBedType]);

  return (
    <Card className=" mx-auto mt-4">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <GripVertical />
          <ChevronDown />
          <div className="text-sm bg-orange-500 text-white px-3 py-1 rounded-md">
            Bedspaces
          </div>
          <div className="text-sm border px-3 py-1 rounded-md text-muted-foreground">
            {fields.length} Bedspaces
          </div>
        </CardTitle>
        <div className="flex gap-4">
          <Switch
            checked={isSwitchOn}
            onCheckedChange={(res) => setIsSwitchOn(res)}
          />
          <Copy className="text-green-500 cursor-pointer" />
          <Trash2
            className="text-red-500 cursor-pointer"
            onClick={removeBedspace}
          />
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <Label className="text-base font-semibold">
            Bedroom Configuration:
          </Label>
        </div>
        {isSwitchOn && (
          <>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <Label>Number Of Beds</Label>
                <Input
                  type="number"
                  min={1}
                  {...register("numberOfBeds", { valueAsNumber: true })}
                />
              </div>
              <div>
                <Label>Default Bed Type</Label>
                <Controller
                  control={control}
                  name="defaultBedType"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select bed type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Single Bed">Single Bed</SelectItem>
                        <SelectItem value="Double Bed">Double Bed</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>

            <div className="bg-muted/20 p-3 rounded-md">
              <p className="text-sm">
                Will create {numberOfBeds} bedspaces ({fields.length})
              </p>
              <div className="flex gap-2 mt-2 flex-wrap">
                {fields.map((bed, i) => (
                  <Button variant="outline" size="sm" key={bed.id}>
                    {bed.name} ({bed.type.toLowerCase()})
                  </Button>
                ))}
              </div>
            </div>

            <div className="border rounded-md p-4">
              <Label className="font-semibold mb-2 block">Room</Label>

              <div className="space-y-3">
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="flex items-center justify-between border rounded-md px-3 py-2">
                    <div>{field.name}</div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex items-center gap-1">
                        <ImageIcon className="h-4 w-4" /> Photo
                      </Button>
                      <Button size="icon" variant="ghost">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => remove(index)}
                        className="text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
        <div className="flex justify-center gap-2">
          <Button
            variant="outline"
            onClick={() => {
              append({
                name: `Bed ${fields.length + 1}`,
                type: defaultBedType,
              });
              setIsSwitchOn(true);
            }}>
            + Bedspaces
          </Button>
          <Button variant="outline" onClick={onAddCommonArea}>
            + Common Area
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
