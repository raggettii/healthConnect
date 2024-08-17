import BookAppointment from "@/app/components/BookAppointment";
import NavData from "@/app/components/NavData";
import Nodata from "@/app/components/Nodata";
// import { getServerSession } from "next-auth";
export default async function PatientDashboard() {
  // const session = await getServerSession();

  const navData = ["Hospital", "Doctor", "Date", "Time", "Status", "Cancel"];
  // const firstName = "Ranjit";
  const array: Array<data> = [
    {
      key: "unique string",
      patient: "Guru Govind",
      date: "date hai",
      time: "1",
      status: "SCHEDULED",
      doctor: "Dr singh",
    },
    {
      key: "unique string",
      patient: "Guru Govind",
      date: "date hai",
      time: "12 baje",
      status: "PENDING",
      doctor: "Dr singh",
    },
    {
      key: "unique string",
      patient: "Guru Govind",
      date: "date hai",
      time: "12 baje",
      status: "CANCELLED",
      doctor: "Dr Abhi Singh bhadoriys is the badhf hsdh",
    },
    {
      key: "unique string",
      patient: "Guru Govind",
      date: "date hai",
      time: "12 baje",
      status: "DONE",
      doctor: "Dr singh",
    },
  ];
  return (
    <>
      {/* <div>{JSON.stringify(session)}</div> */}
      <div className="h-screen">
        <div className="flex  justify-end mr-3 lg:mr-8">
          <BookAppointment text={"+ Book New Appointment"} />
        </div>
        <nav className=" lg:ml-[240px] lg:mr-[240px] md:ml-[100px] md:mr-[100px] font-semibold md:text-lg  mt-12  ml-2 mr-2 p-2 rounded-t-xl bg-[#0b2b1c] h-[40px] ">
          <ul className="flex justify-between px-2">
            {navData.map((item, index) => (
              <div key={index}>{item}</div>
            ))}
          </ul>
          <div className=" flex flex-col gap-4 mt-4  ">
            {array[0] ? (
              array.map(({ date, time, status, doctor, key, patient }) => (
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
