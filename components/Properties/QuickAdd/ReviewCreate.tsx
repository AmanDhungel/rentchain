import React from "react";
import { useFormContext } from "react-hook-form";

type Props = {
  onPrev?: () => void;
  onSubmit?: () => void;
};

export default function ReviewCreateProperty({ onPrev, onSubmit }: Props) {
  const { getValues } = useFormContext?.() ?? { getValues: () => ({}) };

  // pull values with safe fallbacks
  const values = getValues();

  const propertyPhotos: string[] = values.propertyPhotos || [];
  const propertyVideos: string[] = values.propertyVideos || [];
  const virtualTours: string[] = values.virtualTours || [];
  const floorPlans: string[] = values.floorPlans || [];
  const documentsLegal: string[] = values.documentsLegal || [];
  const documentsInsurance: string[] = values.documentsInsurance || [];
  const urls: string[] = values.urls || [];
  const addWatermark: boolean = !!values.addWatermark;
  const autoResize: boolean = !!values.autoResize;
  const publicGallery: boolean = !!values.publicGallery;
  const tenantAccess: boolean = !!values.tenantAccess;

  const basic = {
    propertyName: values.propertyName || "",
    propertyCode: values.propertyCode || "",
    propertyDescription: values.propertyDescription || "",
  };

  const location = {
    addressLine1: values.addressLine1 || "",
    addressLine2: values.addressLine2 || "",
    city: values.city || "",
    state: values.state || "",
    postalCode: values.postalCode || "",
    country: values.country || "",
  };

  const details = {
    roomSize: values.roomSize || "",
    bedType: values.bedType || "",
    attachedBathroom: values.attachedBathroom || false,
    airConditioning: values.airConditioning || false,
    furnished: values.furnished || false,
    floorNumber: values.floorNumber || "",
  };

  const publishing: any = {
    status: values.status || "",
    channels: values.channels || [],
    availableFrom: values.availableFrom || null,
    availableTo: values.availableTo || null,
    features: values.features || {},
    amenities: values.amenities || [],
  };

  const smallBox = (title: string, children: React.ReactNode) => (
    <div className="bg-white border rounded-lg p-4 shadow-sm">
      <div className="text-sm text-gray-700 font-medium mb-3">{title}</div>
      <div className="max-h-40 overflow-auto text-sm text-gray-600">
        {children}
      </div>
    </div>
  );

  return (
    <div className="max-w-[59rem] mx-auto p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Review & Create Property
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Review all information before creating your property
      </p>

      <div className="space-y-4">
        {smallBox(
          "Basic Information",
          <div className="space-y-2">
            <div className="text-gray-800 font-medium">
              {basic.propertyName || "-"}
            </div>
            <div className="text-xs text-gray-500">
              Code: {basic.propertyCode || "-"}
            </div>
            <div className="pt-2 text-sm text-gray-600">
              {basic.propertyDescription || "-"}
            </div>
          </div>
        )}

        {smallBox(
          "Location",
          <div className="space-y-2">
            <div>{location.addressLine1 || "-"}</div>
            {location.addressLine2 && <div>{location.addressLine2}</div>}
            <div>
              {[location.city, location.state].filter(Boolean).join(", ")}
            </div>
            <div>
              {[location.postalCode, location.country]
                .filter(Boolean)
                .join(" - ")}
            </div>
          </div>
        )}

        {smallBox(
          "Property Details",
          <div className="space-y-2">
            <div>Room size: {details.roomSize || "-"}</div>
            <div>Bed type: {details.bedType || "-"}</div>
            <div>
              Attached bathroom: {details.attachedBathroom ? "Yes" : "No"}
            </div>
            <div>
              Air conditioning: {details.airConditioning ? "Yes" : "No"}
            </div>
            <div>Furnished: {details.furnished ? "Yes" : "No"}</div>
            <div>Floor number: {details.floorNumber || "-"}</div>
          </div>
        )}

        {smallBox(
          "Amenities",
          <div className="space-y-2">
            {Array.isArray(publishing.amenities) &&
            publishing.amenities.length > 0 ? (
              <ul className="list-disc pl-5">
                {publishing.amenities.map((a: string, idx: number) => (
                  <li key={idx}>{a}</li>
                ))}
              </ul>
            ) : (
              <div className="text-gray-500">-</div>
            )}
          </div>
        )}

        {smallBox(
          "Media & Documents",
          <div className="space-y-3">
            <div>
              <div className="text-xs text-gray-500 mb-2">Photos</div>
              <div className="flex flex-wrap gap-2">
                {propertyPhotos.length ? (
                  propertyPhotos.map((p, i) => (
                    <div
                      key={i}
                      className="w-20 h-14 bg-gray-100 rounded overflow-hidden flex items-center justify-center text-xs text-gray-500">
                      <img
                        src={p}
                        alt={`photo-${i}`}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500">No photos</div>
                )}
              </div>
            </div>

            <div>
              <div className="text-xs text-gray-500 mb-2">Videos</div>
              <div className="flex flex-wrap gap-2">
                {propertyVideos.length ? (
                  propertyVideos.map((v: string, i: number) => (
                    <div
                      key={i}
                      className="w-28 h-14 bg-gray-100 rounded overflow-hidden flex items-center justify-center text-xs text-gray-500">
                      <video
                        src={v}
                        className="w-full h-full object-cover"
                        controls={false}
                      />
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500">No videos</div>
                )}
              </div>
            </div>

            <div>
              <div className="text-xs text-gray-500 mb-2">Floor plans</div>
              <div className="flex flex-wrap gap-2">
                {floorPlans.length ? (
                  floorPlans.map((f: string, i: number) => (
                    <div
                      key={i}
                      className="w-28 h-20 bg-gray-50 rounded overflow-hidden flex items-center justify-center text-xs text-gray-500">
                      <img
                        src={f}
                        alt={`floor-${i}`}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500">No floor plans</div>
                )}
              </div>
            </div>

            <div>
              <div className="text-xs text-gray-500 mb-2">Legal Documents</div>
              <div className="flex flex-col gap-1">
                {documentsLegal.length ? (
                  documentsLegal.map((d: string, i: number) => (
                    <a
                      key={i}
                      href={d}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-indigo-600 underline">
                      Document {i + 1}
                    </a>
                  ))
                ) : (
                  <div className="text-gray-500">No documents</div>
                )}
              </div>
            </div>

            <div>
              <div className="text-xs text-gray-500 mb-2">
                Insurance Documents
              </div>
              <div className="flex flex-col gap-1">
                {documentsInsurance.length ? (
                  documentsInsurance.map((d: string, i: number) => (
                    <a
                      key={i}
                      href={d}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-indigo-600 underline">
                      Insurance {i + 1}
                    </a>
                  ))
                ) : (
                  <div className="text-gray-500">No insurance docs</div>
                )}
              </div>
            </div>

            <div>
              <div className="text-xs text-gray-500 mb-2">
                URLs & Virtual Tours
              </div>
              <div className="flex flex-col gap-1">
                {urls.length ? (
                  urls.map((u: string, i: number) => (
                    <a
                      key={i}
                      href={u}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-indigo-600 underline">
                      {u}
                    </a>
                  ))
                ) : (
                  <div className="text-gray-500">-</div>
                )}

                {virtualTours.length
                  ? virtualTours.map((v: string, i: number) => (
                      <a
                        key={i}
                        href={v}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-indigo-600 underline">
                        Virtual tour {i + 1}
                      </a>
                    ))
                  : null}
              </div>
            </div>
          </div>
        )}

        {smallBox(
          "Publishing Settings",
          <div className="space-y-2">
            <div>
              Status:{" "}
              <span className="font-medium">{publishing.status || "-"}</span>
            </div>
            <div>
              Channels:{" "}
              {publishing.channels && publishing.channels.length
                ? publishing.channels.join(", ")
                : "-"}
            </div>
            <div>
              Available:{" "}
              {publishing.availableFrom
                ? new Date(publishing.availableFrom).toLocaleDateString()
                : "-"}{" "}
              -{" "}
              {publishing.availableTo
                ? new Date(publishing.availableTo).toLocaleDateString()
                : "-"}
            </div>

            <div className="pt-2">
              <div className="text-xs text-gray-500 mb-1">Features</div>
              <div className="flex flex-wrap gap-2">
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    publishing.features?.instantBooking
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-500"
                  }`}>
                  Instant Booking
                </span>
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    publishing.features?.virtualTours
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-500"
                  }`}>
                  Virtual Tours
                </span>
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    publishing.features?.contactInfo
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-500"
                  }`}>
                  Contact Info
                </span>
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    publishing.features?.autoRenewal
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-500"
                  }`}>
                  Auto Renewal
                </span>
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    publishing.features?.internalOnly
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-100 text-gray-500"
                  }`}>
                  Internal Only
                </span>
              </div>
            </div>

            <div className="pt-2">
              <div className="text-xs text-gray-500 mb-1">Gallery Options</div>
              <div className="flex gap-3 items-center text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <input type="checkbox" checked={addWatermark} readOnly />{" "}
                  <span className="ml-1">Add Watermark</span>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" checked={autoResize} readOnly />{" "}
                  <span className="ml-1">Auto Resize</span>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" checked={publicGallery} readOnly />{" "}
                  <span className="ml-1">Public Gallery</span>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" checked={tenantAccess} readOnly />{" "}
                  <span className="ml-1">Tenant Access</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mt-6">
        <button
          onClick={onPrev}
          className="px-4 py-2 rounded-md bg-gray-100 text-gray-700">
          ← Previous
        </button>
        <div className="flex items-center gap-3">
          <div className="text-sm text-green-700 bg-green-50 px-3 py-2 rounded">
            All required information has been provided. Your property is ready
            to be created!
          </div>
          <button
            onClick={onSubmit}
            className="px-4 py-2 rounded-md bg-orange-500 text-white">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
