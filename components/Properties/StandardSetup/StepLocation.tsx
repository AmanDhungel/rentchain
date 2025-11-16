import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Button } from "../../ui/button";
import { useFormContext } from "react-hook-form";
import { useState, useCallback } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { icons } from "../../../assets/icons/exports";
import Image from "next/image";

const containerStyle = {
  width: "100%",
  height: "300px",
  borderRadius: "8px",
};

export default function StepLocation({
  onNext,
  onPrev,
}: {
  onNext: () => void;
  onPrev: () => void;
}) {
  const { register, setValue } = useFormContext();
  const [coords, setCoords] = useState<{ lat: number; lng: number }>({
    lat: 27.7172, // default: Kathmandu
    lng: 85.324,
  });

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
  });

  // Handle current location
  const handleCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      setCoords({ lat: latitude, lng: longitude });
      setValue("location", { lat: latitude, lng: longitude });
    });
  };

  // Handle map click
  const handleMapClick = useCallback(
    (event: google.maps.MapMouseEvent) => {
      if (event.latLng) {
        const newCoords = {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        };
        setCoords(newCoords);
        setValue("location", newCoords);
      }
    },
    [setValue]
  );

  return (
    <div>
      <div className="space-x-2 ml-4 mb-2">
        <Button variant="outline" className="p-4">
          <Image alt="goolgemap" src={icons.QuickSetupGoogleMap} /> Google Maps{" "}
        </Button>
        <Button variant="outline" className="p-4">
          <Image alt="OpenStreetMap" src={icons.OpenStreetMap} />
          OpenStreetMaps{" "}
        </Button>
      </div>

      <div className="flex gap-4 mb-4 ml-4">
        <Button
          variant="outline"
          className="w-[48%] h-20 text-2xl border-none bg-[#F6F9FF]"
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
          className="w-[48%] border-none h-20 bg-[#F6F9FF]"
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

      {/* Google Map */}
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
                setValue("location", newCoords);
              }
            }}
          />
        </GoogleMap>
      ) : (
        <p className="text-sm text-gray-500 text-center">Loading map...</p>
      )}

      <div className="flex flex-col gap-2 mt-4">
        <Label>Search Location</Label>
        <div className="flex bg-[#F6F9FF] border-none rounded-sm px-[5px] py-[5px]">
          <Input
            {...register("addressLine1")}
            placeholder="Choose Location"
            className="border-none focus:border-none shadow-none focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <Image src={icons.TravelExplore} alt="" className="mr-5" />
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-2">
        <p className="font-medium text-lg">Property Address</p>
        <Label>Address Line 1*</Label>
        <Input
          {...register("addressLine1")}
          placeholder="Street Number And Name"
        />
        <Label className="mt-2">Address Line 2</Label>
        <Input
          {...register("addressLine2")}
          placeholder="Apartment, suite, etc."
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="space-y-2">
          <Label>City*</Label>
          <Input {...register("city")} placeholder="City" />
        </div>
        <div className="space-y-2">
          <Label>State/Province*</Label>
          <Input {...register("state")} placeholder="State or Province" />
        </div>
        <div className="space-y-2">
          <Label>Postal Code*</Label>
          <Input {...register("postalCode")} placeholder="ZIP/Postal Code" />
        </div>
        <div className="space-y-2">
          <Label>Country*</Label>
          <Input {...register("country")} placeholder="Country" />
        </div>
      </div>

      <div className="flex items-center justify-between mt-6">
        <Button variant="outline" onClick={onPrev} type="button">
          Previous
        </Button>

        <div className="flex items-center gap-3">
          <Button className="bg-orange-500" onClick={onNext}>
            Next →
          </Button>
        </div>
      </div>
    </div>
  );
}
