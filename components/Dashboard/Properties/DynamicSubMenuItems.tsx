import { Calendar1 } from "lucide-react";
import Image from "next/image";

const DynamicSubMenuItems = ({
  Title,
  rows,
}: {
  Title?: string;
  rows: Array<{
    id: number;
    title: string;
    subtitle: string;
    badge: {
      text: string;
      color: string;
    };
    icon?: string;
  }>;
}) => {
  return (
    <>
      {Title ? (
        <>
          <div className="mb-4 flex justify-between">
            <h3 className="text-gray-700 font-semibold">{Title}</h3>
            <p className="text-sm border border-[#E5E7EB] rounded-md px-3 py-1 flex items-center gap-2 ">
              <Calendar1 size={16} /> This Week
            </p>
          </div>
          <hr className="border border-[#E5E7EB] mb-5" />
        </>
      ) : (
        ""
      )}
      <div className="space-y-3 border border-[#E5E7EB] rounded-lg  mr-2 mb-5">
        {rows.map((r, index) => (
          <div key={r.id}>
            <div
              key={r.id}
              className="p-4 bg-white  rounded-lg  py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  <Image
                    src={r.icon ? r.icon : ""}
                    alt="Building Icon"
                    className="w-11 h-11"
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-block text-sm font-medium px-3 py-1 rounded text-white"
                      style={{
                        background:
                          r.badge.color === "bg-orange-500"
                            ? "#F97316"
                            : "#7C3AED",
                      }}>
                      {r.badge.text}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mt-2">{r.subtitle}</div>
                </div>
              </div>

              <div>
                <button
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-50"
                  aria-label="open">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M9 18l6-6-6-6"
                      stroke="#9CA3AF"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
            {index === rows.length - 1 ? (
              ""
            ) : (
              <hr className="w-full border border-[#E5E7EB]" />
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default DynamicSubMenuItems;
