import Image from "next/image";

const ManagementCard = ({
  rows,
}: {
  rows: { id: number; title: string; icon: string }[];
}) => {
  return (
    <>
      {rows.map((r) => (
        <div
          key={r.id}
          className="flex border border-[#E5E7EB] rounded-md p-4 items-center  gap-5">
          <Image src={r.icon} alt={r.title} />
          <h3 className="text-gray-700 font-semibold ">{r.title}</h3>
        </div>
      ))}
    </>
  );
};

export default ManagementCard;
