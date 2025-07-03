import { options } from "@/app/api/auth/[...nextauth]/options";
import BookAppointment from "@/app/components/BookAppointment";
import NavData from "@/app/components/NavData";
import Nodata from "@/app/components/Nodata";
import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";

export default async function PatientDashboard() {
  const prisma = new PrismaClient();
  const session = await getServerSession(options);
  const userId = session?.user.id;
  const appointments = await prisma.healthConnect_Appointment.findMany({
    where: {
      patientId: userId,
    },
    include: {
      doctor: {
        select: {
          name: true,
        },
      },
      hospital: {
        select: {
          fullName: true,
        },
      },
    },
  });
  const navData = ["Hospital", "Doctor", "Date", "Time", "Status", "Cancel"];
  const appointmentsData = appointments.map(
    ({ id, date, time, status, doctor, hospital }) => ({
      key: id,
      id: id,
      patient: hospital.fullName,
      date: date,
      time: time,
      status,
      doctor: doctor.name,
    })
  );

  return (
    <>
      <div className="min-h-screen max-h-fit">
        <div className="flex  justify-end mr-3 lg:mr-8">
          <BookAppointment text={"+ Book New Appointment"} />
        </div>
        <nav className=" lg:ml-[240px] lg:mr-[240px] md:ml-[100px] md:mr-[100px] font-semibold md:text-lg  mt-12  ml-2 mr-2 p-2 rounded-t-xl bg-[#0b2b1c] h-[40px] ">
          <ul className="flex justify-between px-2">
            {navData.map((item, index) => (
              <div key={index}>{item}</div>
            ))}
          </ul>
          <div className=" flex flex-col gap-4 mt-4 ">
            {appointmentsData[0] ? (
              appointmentsData.map(
                ({
                  date,
                  time,
                  status,
                  doctor,
                  id,
                  patient,
                }: {
                  date: string;
                  time: string;
                  status: string;
                  doctor: string;
                  id: string;
                  patient: string;
                }) => (
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
              <Nodata text="No Appointments available" />
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
