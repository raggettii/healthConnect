"use client";
import { ChangeEvent, useState } from "react";
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
  const [specialisation, setSpecialisation] = useState<string>("");
  const [doctorName, setDoctorName] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [reason, setReason] = useState<string>("");
  const onClickHandler1 =
    (item: string) => (e: ChangeEvent<HTMLInputElement>) => {
      if (item === "reason") setReason(e.target.value);
      if (item === "date") setDate(e.target.value);
      if (item === "time") setTime(e.target.value);
    };
  const dropdownChangeSpe = (item: string) => {
    setSpecialisation(item);
  };
  const dropdownChangeDoc = (item: string) => {
    setDoctorName(item);
  };
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
                  src={"/icons/cross.svg"}
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
                  onSelect={dropdownChangeSpe}
                />
                <DropDown
                  label={"Select Doctor"}
                  dropdownContent={doctors}
                  onSelect={dropdownChangeDoc}
                />
              </div>
              <div className="md:flex">
                <InputBox
                  label="Reason for Appointment"
                  imageSource="/icons/pen.svg"
                  placeholder="ex. Monthly Checkup"
                  value={reason}
                  error=""
                  onChange={onClickHandler1("reason")}
                />
                <InputBox
                  label="Expected Appointment Date "
                  imageSource="/icons/calender.svg"
                  placeholder="dd/mm/yyyy"
                  value={date}
                  error=""
                  onChange={onClickHandler1("date")}
                />
                <InputBox
                  label="Expected Appointment Time "
                  imageSource="/icons/clock.svg"
                  placeholder="HH : MM"
                  value={time}
                  error=""
                  onChange={onClickHandler1("time")}
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
