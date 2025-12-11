import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormContext } from "react-hook-form";
import { LocationSchema, LocationFormValues } from "./Parking.types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Locate, Search } from "lucide-react"; // Icons for UI elements
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useCallback, useState } from "react";
import Image from "next/image";
import { icons } from "@/assets/icons/exports";

// Dummy data for country selection
const COUNTRIES = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "gb", label: "United Kingdom" },
];
const containerStyle = {
  width: "100%",
  height: "300px",
  borderRadius: "8px",
};
export function LocationForm() {
  const form = useFormContext<LocationFormValues>();
  const [coords, setCoords] = useState<{ lat: number; lng: number }>({
    lat: 27.7172,
    lng: 85.324,
  });

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
  });

  const handleCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      setCoords({ lat: latitude, lng: longitude });
      form.setValue("location", { lat: latitude, lng: longitude });
    });
  };

  const handleMapClick = useCallback(
    (event: google.maps.MapMouseEvent) => {
      if (event.latLng) {
        const newCoords = {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        };
        setCoords(newCoords);
        form.setValue("location", newCoords);
      }
    },
    [form]
  );
  function onSubmit(data: LocationFormValues) {}

  return (
    <>
      <h2 className="text-xl font-bold mt-4">Location Details</h2>
      <div className="space-x-2 mt-2 mb-2">
        <Button variant="outline" className="p-4">
          <Image alt="goolgemap" src={icons.QuickSetupGoogleMap} /> Google Maps{" "}
        </Button>
        <Button variant="outline" className="p-4">
          <Image alt="OpenStreetMap" src={icons.OpenStreetMap} />
          OpenStreetMaps{" "}
        </Button>
      </div>

      <div className="space-y-4 ">
        <div className="flex gap-4 mb-4">
          <Button
            variant="outline"
            className="w-[48.5%] h-20 text-2xl border-none bg-[#F6F9FF]"
            onClick={handleCurrentLocation}>
            <Image
              src={icons.LocationSearching}
              alt="Current Location"
              className="w-6 h-6"
            />
            <p className="text-xl flex flex-col text-left font-medium">
              Current Location{" "}
              <span className="text-gray-400 text-sm font-normal">
                Use Current Location
              </span>
            </p>
          </Button>
          <Button
            className="w-[48.5%] border-none h-20 bg-[#F6F9FF]"
            variant="outline">
            <Image src={icons.PinBoard} alt="Pin on Map" className="w-6 h-6" />
            <p className="text-lg flex flex-col text-left">
              Pin on Map{" "}
              <span className="text-gray-400 text-sm font-normal">
                Click to pin location
              </span>
            </p>
          </Button>
        </div>

        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={coords}
            zoom={14}
            onClick={handleMapClick}>
            <Marker
              position={coords}
              draggable
              onDragEnd={(e) => {
                if (e.latLng) {
                  const newCoords = {
                    lat: e.latLng.lat(),
                    lng: e.latLng.lng(),
                  };
                  setCoords(newCoords);
                  form.setValue("location", newCoords);
                }
              }}
            />
          </GoogleMap>
        ) : (
          <p className="text-sm text-gray-500 text-center">Loading map...</p>
        )}

        <div className="space-y-1">
          <FormLabel>Search Location</FormLabel>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
            <Input
              placeholder="Choose Location"
              className="pl-10"
              readOnly={true} // Read-only as it would typically be a map interaction
            />
          </div>
        </div>
      </div>

      <h3 className="text-xl font-semibold mt-8">Property Address</h3>

      <FormField
        control={form.control}
        name="addressLine1"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Address Line 1 *</FormLabel>
            <FormControl>
              <Input placeholder="Street Number And Name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="addressLine2"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Address Line 2</FormLabel>
            <FormControl>
              <Input placeholder="Street Number And Name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem className="col-span-1">
              <FormLabel>City *</FormLabel>
              <FormControl>
                <Input placeholder="City" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="stateProvince"
          render={({ field }) => (
            <FormItem className="col-span-1">
              <FormLabel>State/Province *</FormLabel>
              <FormControl>
                <Input placeholder="State or Province" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="postalCode"
          render={({ field }) => (
            <FormItem className="col-span-1">
              <FormLabel>Postal Code *</FormLabel>
              <FormControl>
                <Input placeholder="ZIP/Postal Code" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem className="col-span-1">
              <FormLabel>Country *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {COUNTRIES.map((country) => (
                    <SelectItem key={country.value} value={country.value}>
                      {country.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
}
