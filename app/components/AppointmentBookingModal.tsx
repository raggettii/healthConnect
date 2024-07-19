import BookAppointment from "./BookAppointment";
import DropDown from "./DropDown";
import InputBox from "./InputBox";
import SubHeading from "./SubHeading";
import Image from "next/image";
export default function AppointmentBookingModal({
  onClickHandler,
}: {
  onClickHandler: () => void;
}) {
  const doctors = ["Rajesh", "Suresh"];
  const dropdownContent = [
    "Family Medicine",
    "Cardiology",
    "Dermatology",
    "Endocrinology",
    "Gastroenterology",
    "Neurology",
    "Obstetrics ",
    "Oncology",
    "Orthopedics",
    "Pediatrics",
    "Psychiatry",
    "Surgery",
  ];
  return (
    <>
      <div
        onClick={onClickHandler}
        className=" fixed inset-0 bg-[#0c4238] bg-opacity-60  flex justify-center items-center"
      >
        <div className="flex  h-screen justify-center ">
          <div className="flex flex-col justify-center">
            <div
              onClick={(e) => e.stopPropagation()}
              className="text-white bg-[#011e0e] p-3 rounded-lg shadow-3xl"
            >
              <button onClick={onClickHandler}>
                <Image
                  className="bg-white"
                  src={"icons/cross.svg"}
                  alt="cross"
                  height={12}
                  width={12}
                />
              </button>
              <h1 className="text-lg font-semibold">Schedule Appointment</h1>
              <SubHeading text="Please fill in the details to schedule" />
              <div className="md:flex ml-5 gap-3">
                <DropDown
                  label={"Select Specialisation"}
                  dropdownContent={dropdownContent}
                />
                <DropDown label={"Select Doctor"} dropdownContent={doctors} />
              </div>
              <div className="md:flex">
                <InputBox
                  label="Reason for Appointment"
                  imageSource="icons/pen.svg"
                  placeholder="ex. Monthly Checkup"
                />
                <InputBox
                  label="Expected Appointment date "
                  imageSource="icons/calender.svg"
                  placeholder="dd/mm/yyyy"
                />
              </div>
              <div className="flex justify-center">
                <button
                  onClick={onClickHandler}
                  className=" text-center font-bold text-lg hover:text-green-800 p-2 mt-3 mb-3 text-white bg-green-400 w-[200px] rounded-lg"
                >
                  Book Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
