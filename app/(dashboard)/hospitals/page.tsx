import HospitalComponent from "@/app/components/HospitalComponent";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import Nodata from "@/app/components/Nodata";

export default async function Hospitals() {
  const token = await getServerSession(options);
  const city = token?.user.address;
  const prisma = new PrismaClient();
  const hospitalsData = await prisma.healthConnect_Hospital.findMany({
    where: {
      city: city,
    },
  });
  const hospitalsFetched = hospitalsData.map(({ fullName, phoneNumber }) => ({
    name: fullName,
    contactNumber: phoneNumber,
  }));
  return (
    <>
      <div className="max-h-full min-h-[678px]">
        <Link
          className="mb-4 flex justify-end md:pr-14 pr-4"
          href={"/patient-dashboard"}
        >
          <h1 className="hover:text-sky-600 font-semibold">
            Your Appointments
          </h1>
        </Link>
        {hospitalsFetched.length > 0 ? (
          hospitalsFetched.map((item, index) => (
            <HospitalComponent
              key={index}
              name={item.name}
              city={item.contactNumber}
            />
          ))
        ) : (
          <Nodata text="No hospitals are registered from your City"></Nodata>
        )}
      </div>
    </>
  );
}
