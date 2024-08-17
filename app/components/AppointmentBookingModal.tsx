"use client";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import { scheduleAppointment } from "../zod";
import BookAppointment from "./BookAppointment";
import DropDown from "./DropDown";
import InputBox from "./InputBox";
import SubHeading from "./SubHeading";
import Image from "next/image";
import useDebounce from "../functions/debounce";
import validateField from "../functions/validateField";
export default function AppointmentBookingModal({
  onClickHandler,
}: {
  onClickHandler: () => void;
}) {
  const errorsMap: Map<string, string> = new Map();

  const router = useRouter();

  errorsMap.set("date", "");
  errorsMap.set("time", "");

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

  const [specialization, setSpecialization] = useState<string>("");
  const [doctorName, setDoctorName] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [reason, setReason] = useState<string>("");
  const [error, setErrors] = useState<Map<string, string>>(errorsMap);

  const debouncedDate = useDebounce(date, 500);
  const debouncedTime = useDebounce(time, 500);

  const validate = (field: string, value: string) => {
    const errorMessage: string = validateField(
      scheduleAppointment,
      field,
      value
    );

    setErrors(errorsMap.set(field, errorMessage));
  };

  const onSubmit = async () => {
    const result = scheduleAppointment.safeParse({
      specialization,
      doctorName,
      date,
      time,
    });

    if (!result.success) {
      // Update the errors state with all validation errors
      const fieldErrors = new Map<string, string>();
      result.error.errors.forEach((error) => {
        if (error.path[0]) {
          fieldErrors.set(error.path[0], error.message);
        }
      });
      setErrors(fieldErrors);
      toast.error("Please fix the errors before submitting");
      return;
    }

    try {
      const response = await axios.post("/api/book-appointment", {
        specialization,
        doctorName,
        date,
        time,
      });
      if (response.status === 200) {
        toast.success("Appointment Booked successfully");
        router.refresh();
        router.push("/");
        console.log(`${time}Status Updated successfully ${response}`);
      }
      // console.log("Hi sbove the 409");
    } catch (error) {
      alert("All fields are Required (Error:400)");
      console.error(`Error Occured While Creating Admin ${error}`);
    }
  };

  console.log(debouncedDate);
  console.log(debouncedTime);
  console.log(specialization);
  console.log(doctorName);
  console.log(`${error.get("date")} date ka error`);

  React.useEffect(() => {
    validate("date", debouncedDate);
  }, [debouncedDate]);
  React.useEffect(() => {
    validate("time", debouncedTime);
  }, [debouncedTime]);

  type SetterType = React.Dispatch<React.SetStateAction<string>>;

  const onChangeHandler =
    (setter: SetterType, field: string) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setter(value);
      validate(field, value);
    };

  const dropdownChangeSpe = (item: string) => {
    setSpecialization(item);
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
                  label={"Select Specialization"}
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
                {/* <InputBox
                  label="Reason for Appointment"
                  imageSource="/icons/pen.svg"
                  placeholder="ex. Monthly Checkup"
                  value={reason}
                  error=""
                  onChange={onChangeHandler("reason")}
                /> */}
                <InputBox
                  label="Expected Appointment Date "
                  imageSource="/icons/calender.svg"
                  placeholder="YYYY-MM-DD"
                  value={date}
                  error={error.get("date")}
                  onChange={onChangeHandler(setDate, "date")}
                />
                <InputBox
                  label="Expected Appointment Time "
                  imageSource="/icons/clock.svg"
                  placeholder="HH:MM (24 Hrs)"
                  value={time}
                  error={error.get("time")}
                  onChange={onChangeHandler(setTime, "time")}
                />
              </div>
              <div className="flex justify-center">
                <button
                  onClick={onSubmit}
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
