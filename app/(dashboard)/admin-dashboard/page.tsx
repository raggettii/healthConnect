import AddDoctorButton from "@/app/components/AddDoctorButton";
import ButtonComponent from "@/app/components/ButtonComponent";
import DropDown from "@/app/components/DropDown";
import NavData from "@/app/components/NavData";
import Nodata from "@/app/components/Nodata";
// import { NextRequest } from "next/server";
import axios from "axios";
import { getServerSession, Session } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { PrismaClient } from "@prisma/client";

export default async function AdminDashboard() {
  const prisma = new PrismaClient();
  const navData = ["Patient ", "Doctor", "Date", "Time", "Status", "confi."];
  const sessionData: Session | null = await getServerSession(options);
  console.log(sessionData, "Session data form adminDashboard");
  const hospitalId = sessionData?.user.id;
  const newName = sessionData?.user.name;
  const appointments = await prisma.appointment.findMany({
    where: {
      hospitalId: hospitalId,
    },
    include: {
      patient: {
        select: {
          fullName: true, // Include doctor's name
        },
      },
      doctor: {
        select: {
          name: true, // Include hospital's name
        },
      },
    },
  });
  const appointmentsData = appointments.map(
    ({ id, date, time, status, doctor, patient }) => ({
      key: id,
      id: id,
      patient: patient.fullName,
      date: date,
      time: time,
      status,
      doctor: doctor.name,
    })
  );
  // const array = axios.get("/api/hospital-appointments");
  // console.log(array);

  // console.log(id, "id hai bhaiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
  // const array: Array<data> = [
  //   {
  //     key: "unique string",
  //     patient: "abhishake",
  //     date: "date hai",
  //     time: "1",
  //     status: "PENDING",
  //     doctor: "Dr singh",
  //   },
  //   {
  //     key: "unique string",
  //     patient: "raamkaa",
  //     date: "date hai",
  //     time: "12 baje",
  //     status: "PENDING",
  //     doctor: "Dr singh",
  //   },
  //   {
  //     key: "unique string",
  //     patient: "raamkaa",
  //     date: "date hai",
  //     time: "12 baje",
  //     status: "CANCELLED",
  //     doctor: "Dr Abhi Singh bhadoriys is the badhf hsdh",
  //   },
  //   {
  //     key: "unique string",
  //     patient: "shubham",
  //     date: "date hai",
  //     time: "12 baje",
  //     status: "PENDING",
  //     doctor: "Dr singh",
  //   },
  // ];
  return (
    <>
      <AddDoctorButton text={"+ Add Doctor"} />
      <div className="h-screen">
        <nav className="lg:ml-[240px] lg:mr-[240px] md:ml-[100px] md:mr-[100px] font-semibold md:text-lg  mt-12  ml-2 mr-2 p-2 rounded-t-xl bg-[#0b2b1c] h-[40px] ">
          <ul className="flex justify-between px-2">
            {navData.map((item, index) => (
              <div key={index}>{item}</div>
            ))}
          </ul>
          <div className=" flex flex-col gap-4 mt-4  ">
            {appointmentsData[0] ? (
              appointmentsData.map(
                ({ patient, date, time, status, doctor, id }) => (
                  <NavData
                    key={id}
                    date={date}
                    time={time}
                    status={status}
                    doctor={doctor}
                    id={id}
                    patient={patient}
                  />
                )
              )
            ) : (
              <Nodata />
            )}
          </div>
        </nav>
      </div>
    </>
  );
}
type data = {
  key: string;
  date: string;
  time: string;
  status: string;
  doctor: string;
  patient: string;
};

// export default adminDashboard;
