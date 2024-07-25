import AddDoctorButton from "@/app/components/AddDoctorButton";
import ButtonComponent from "@/app/components/ButtonComponent";
import DropDown from "@/app/components/DropDown";
import NavData from "@/app/components/NavData";
import Nodata from "@/app/components/Nodata";
import { PrismaClient } from "@prisma/client";

export async function adminDashboard() {
  const prisma = new PrismaClient();
  // const doctors = ["Rajesh", "Suresh"];
  const navData = ["Patient ", "Doctor", "Date", "Time", "Status", "confi."];
  // const array = await prisma.appointment.findMany({
  //   where: {
  //     //patient and hospital are same
  //   },
  // });
  // also need to use inside it of useEffect as when the navData changes
  // it needs to refresh
  const array: Array<data> = [
    {
      key: "unique string",
      patient: "abhishake",
      date: "date hai",
      time: "1",
      status: "DONE",
      doctor: "Dr singh",
    },
    {
      key: "unique string",
      patient: "raamkaa",
      date: "date hai",
      time: "12 baje",
      status: "PENDING",
      doctor: "Dr singh",
    },
    {
      key: "unique string",
      patient: "raamkaa",
      date: "date hai",
      time: "12 baje",
      status: "CANCELLED",
      doctor: "Dr Abhi Singh bhadoriys is the badhf hsdh",
    },
    {
      key: "unique string",
      patient: "shubham",
      date: "date hai",
      time: "12 baje",
      status: "PENDING",
      doctor: "Dr singh",
    },
  ];
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
            {array[0] ? (
              array.map(({ patient, date, time, status, doctor, key }) => (
                <NavData
                  date={date}
                  time={time}
                  status={status}
                  doctor={doctor}
                  key={key}
                  patient={patient}
                />
              ))
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

export default adminDashboard;
