import SubHeading from "./SubHeading";

export default function HospitalComponent({
  name,
  city,
}: {
  name: string;
  city: string;
}) {
  return (
    <>
      <div className="flex felx-col justify-center mt-2">
        <div className="hover:border rounded md:w-[700px] w-[400px] xl p-2 md:p-5 shadow-2xl border-gray-300">
          <h1 className="font-semibold  text-xl truncate">{name}</h1>
          <h3 className="flex justify-end pr-1">
            <SubHeading text={`Contact Number : ${city}`} />
          </h3>
        </div>
      </div>
    </>
  );
}
