import Image from "next/image";
export default function MiddleSection() {

  return (
    <>
      <section id="features" className="py-16 bg-[#0c4238] text-center">
        <h3 className="text-3xl font-semibold text-white m-3 ">
          Tired of Searching & Scheduling Appointments?
        </h3>
        <p>
          We make it <span className="font-bold">easy & hassle-free</span> to
          find hospitals and book appointments{" "}
          <span className="font-bold">near you</span>.
        </p>
        <div className="flex justify-between">
          <div className="flex flex-col items-start">
            <div className=" font-bold text-xl p-4 text-white">
              Easy Appointment Scheduling
            </div>
            <Image
              className="rounded-md shadow-xl border-white border-2 ml-4"
              src={"/assets/schedule.png"}
              height={300}
              width={600}
              alt="schedule_image"
            />
          </div>
          <div className="flex flex-col items-end">
            <div className=" font-bold text-xl p-4 text-white">
              Ensures Valid users
            </div>
            <Image
              className="rounded-md shadow-xl border-white border-2 mr-4"
              src={"/assets/phone_verify.png"}
              height={300}
              width={300}
              alt="phone_verify_image"
            />
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className=" font-bold text-xl p-4 text-white">
            Interactive Dashboard
          </div>
          <Image
            className="rounded-md shadow-xl border-white border-2 mr-4"
            src={"/assets/appointments.png"}
            height={300}
            width={1000}
            alt="appointments_image"
          />
        </div>
      </section>
    </>
  );
}
