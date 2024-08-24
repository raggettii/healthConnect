import HospitalComponent from "@/app/components/HospitalComponent";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import { getToken } from "next-auth/jwt";
// import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
export default async function Hospitals() {
  const secret = process.env.NEXTAUTH_SECRET;
  const token = await getServerSession(options);
  console.log("token from hospitals page ", token);
  const city = token?.user.address;
  console.log(city);
  const prisma = new PrismaClient();
  const hospitalsData = await prisma.hospital.findMany({
    where: {
      city: city,
    },
  });
  console.log("Hospitals fetched", hospitalsData);
  const hospitalsFetched = hospitalsData.map(({ fullName, phoneNumber }) => ({
    name: fullName,
    contactNumber: phoneNumber,
  }));
  console.log("Hospitals fetched data", hospitalsFetched);
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
        {hospitalsFetched.map((item, index) => (
          <HospitalComponent
            key={index}
            name={item.name}
            city={item.contactNumber}
          />
        ))}
      </div>
    </>
  );
}
