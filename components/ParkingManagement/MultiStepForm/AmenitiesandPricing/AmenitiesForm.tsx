import { useForm, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// shadcn/ui imports
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

// Local imports
import { amenitiesSchema, AmenitiesFormValues } from "./Amenities.type";
import { AMENITIES_LIST, defaultAmenitiesValues, AmenityId } from "./data";

// --- Main Form Component ---
const AmenitiesForm = () => {
  const form = useFormContext<AmenitiesFormValues>();

  const { handleSubmit } = form;

  const onSubmit = (data: AmenitiesFormValues) => {
    console.log("Amenities Selected:", data.selected_amenities);
    // Add your logic to save the data here (e.g., API call)
  };

  // Divide the list into two columns for the layout shown in the image
  const halfLength = Math.ceil(AMENITIES_LIST.length / 2);
  const column1 = AMENITIES_LIST.slice(0, halfLength);
  const column2 = AMENITIES_LIST.slice(halfLength);

  return (
    <div className=" mx-auto p-8  bg-white">
      <h2 className="text-xl font-semibold mb-6">Amenities & Features</h2>

      <>
        <h3 className="text-lg font-medium mb-4">Available Amenities</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
          {/* --- Column 1 --- */}
          <div>
            {column1.map((item) => (
              <FormField
                key={item.id}
                control={form.control}
                name="selected_amenities" // The array field name
                render={({ field }) => {
                  // Check if the current amenity ID is in the array
                  const isChecked = field.value?.includes(item.id);

                  return (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-1">
                      <FormControl>
                        <Checkbox
                          checked={isChecked}
                          onCheckedChange={(checked) => {
                            const currentArray = field.value || [];
                            const newArray = checked
                              ? [...currentArray, item.id] // Add ID
                              : currentArray.filter(
                                  (value) => value !== item.id
                                ); // Remove ID

                            field.onChange(newArray); // Update the RHF field value
                          }}
                        />
                      </FormControl>
                      <div className="leading-none -mt-1">
                        <FormLabel className="font-normal cursor-pointer text-base">
                          {item.label}
                        </FormLabel>
                      </div>
                    </FormItem>
                  );
                }}
              />
            ))}
          </div>

          <div>
            {column2.map((item) => (
              <FormField
                key={item.id}
                control={form.control}
                name="selected_amenities"
                render={({ field }) => {
                  const isChecked = field.value?.includes(item.id);

                  return (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-1">
                      <FormControl>
                        <Checkbox
                          checked={isChecked}
                          onCheckedChange={(checked) => {
                            const currentArray = field.value || [];
                            const newArray = checked
                              ? [...currentArray, item.id]
                              : currentArray.filter(
                                  (value) => value !== item.id
                                );

                            field.onChange(newArray);
                          }}
                        />
                      </FormControl>
                      <div className="leading-none -mt-1">
                        <FormLabel className="font-normal cursor-pointer text-base">
                          {item.label}
                        </FormLabel>
                      </div>
                    </FormItem>
                  );
                }}
              />
            ))}
          </div>
        </div>
      </>
    </div>
  );
};

export default AmenitiesForm;
