import HospitalComponent from "@/app/components/HospitalComponent";
import Link from "next/link";

export default function Hospitals() {
  const hospitals = [
    {
      name: "Guru Dev ",
      city: "Delhi",
    },
    {
      name: "Guru Nanak 2 ",
      city: "Delhi Yes it is ",
    },
    {
      name: "Not Guru Nanak",
      city: "Delhi obviously dude ",
    },
  ];
  return (
    <>
      <div className="h-screen">
        <Link
          className="mb-4 flex justify-end md:pr-14 pr-4"
          href={"/patient-dashboard"}
        >
          <h1 className="hover:text-sky-600 font-semibold">
            Your Appointments
          </h1>
        </Link>
        {hospitals.map((item, index) => (
          <HospitalComponent key={index} name={item.name} city={item.city} />
        ))}
      </div>
    </>
  );
}
