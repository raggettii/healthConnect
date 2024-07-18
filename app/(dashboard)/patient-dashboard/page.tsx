import BookAppointment from "@/app/components/BookAppointment";
import NavData from "@/app/components/NavData";
import Nodata from "@/app/components/Nodata";
import SubHeading from "@/app/components/SubHeading";
import { Merriweather } from "next/font/google";
import Link from "next/link";
const merriWeather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"],
});
export default function PatientDashboard() {
  const navData = ["Doctor", "Date", "Time", "Status", "Cancel"];
  const firstName = "Ranjit";
  const array: Array<data> = [
    {
      key: "unique string",
      date: "date hai",
      time: "1",
      status: "scheduled",
      doctor: "Dr singh",
    },
    {
      key: "unique string",
      date: "date hai",
      time: "12 baje",
      status: "pending",
      doctor: "Dr singh",
    },
    {
      key: "unique string",
      date: "date hai",
      time: "12 baje",
      status: "cancelled",
      doctor: "Dr Abhi Singh bhadoriys is the badhf hsdh",
    },
    {
      key: "unique string",
      date: "date hai",
      time: "12 baje",
      status: "done",
      doctor: "Dr singh",
    },
  ];
  return (
    <>
      <div className="mt-10 h-screen">
        <div className="flex justify-between lg:mr-28 mr-4">
          <div>
            <h1
              className={`${merriWeather.className} font-bold lg:text-3xl text-xl ml-8 lg:ml-20`}
            >
              Welcome, <span className="text-[#0e7490]">{firstName}</span>
            </h1>
            <div className="ml-20 lg:ml-32 lg:text-sm ">
              <SubHeading text="Below are Your Appointments" />
            </div>
          </div>
          <BookAppointment text={"+ Book New Appointment"} />
        </div>
        <nav className="lg:ml-[240px] lg:mr-[240px] md:ml-[100px] md:mr-[100px] font-semibold md:text-lg  mt-12  ml-2 mr-2 p-2 rounded-t-xl bg-[#0b2b1c] h-[40px] ">
          <ul className="flex justify-between px-2">
            {navData.map((item, index) => (
              <div key={index}>{item}</div>
            ))}
          </ul>
          <div className=" flex flex-col gap-4 mt-4  ">
            {array[0] ? (
              array.map(({ date, time, status, doctor, key }) => (
                <NavData
                  date={date}
                  time={time}
                  status={status}
                  doctor={doctor}
                  key={key}
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
};
