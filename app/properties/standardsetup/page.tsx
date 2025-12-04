import StandardPropertySetup from "@/components/Properties/StandardSetup/StandardPropertySetup";

const page = () => {
  return (
    <>
      <h1 className="text-xl font-semibold mt-2 text-slate-900">
        Standard Property Setup
      </h1>
      <p className="text-sm text-muted-foreground ">
        Streamlined property creation with essential steps only
      </p>
      <StandardPropertySetup />
    </>
  );
};

export default page;
