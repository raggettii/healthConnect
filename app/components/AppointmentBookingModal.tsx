"use client";
import toast from "react-hot-toast";
// import { PrismaClient } from "@prisma/client";
import { useEffect } from "react";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import { scheduleAppointment } from "../zod";
import BookAppointment from "./BookAppointment";
import DropDown from "./DropDown";
import InputBox from "./InputBox";
import SubHeading from "./SubHeading";
import Image from "next/image";
import useDebounce from "../functions/debounce";
import validateField from "../functions/validateField";
import { useSession } from "next-auth/react";
export default function AppointmentBookingModal({
  onClickHandler,
}: {
  onClickHandler: () => void;
}) {
  const session = useSession();
  const userId = session.data?.user.id;
  const [doctorId, setDoctorId] = useState("");

  // const prisma = new PrismaClient();
  const errorsMap: Map<string, string> = new Map();
  useEffect(() => {
    const hospitalsData = async () => {
      try {
        console.log(
          "inside the use effect of hospital api calllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll"
        );
        const response = await axios.get("/api/hospitals");
        console.log("just after the api call");
        // setHospitalArray(response.data);
        console.log(response.data);
        setHospitalArray(response.data);
      } catch (error) {
        console.error(`Error while fetching hospitals data ${error}`);
      }
    };
    hospitalsData();
  }, []);
  const router = useRouter();
  const [hospitalId, setHospitalId] = useState<string>("");
  useEffect(() => {
    async function fetchDoctors() {
      try {
        const response = await axios.post("/api/doctors", {
          hospitalId: hospitalId,
        });
        console.log(response.data, "response ka data ie doctors ka array ");
        setDoctorsArray(response.data);
      } catch (error) {
        console.error(`Error occurred while fetching doctors ${error}`);
      }
    }
    if (hospitalId) fetchDoctors();
  }, [hospitalId]);
  const [hospitalsArray, setHospitalArray] = useState([]);
  const [doctorsArray, setDoctorsArray] = useState([]);
  console.log(hospitalsArray, "hospitalsArrayyyyyyyyyyyyyyy");
  const hospitalsNamesArray = hospitalsArray.map(({ fullName }) => fullName);
  console.log(hospitalsNamesArray, "hospitalsnamessssssArrayyyyyyyyyyyyyyy");

  const doctorsNameArray = doctorsArray.map(({ name }) => name);
  console.log(doctorsNameArray, "doctorsNameArray hai ye ");
  // const newHospitalsArray = hospitalsArray.map(({ fullName, id }) => ({
  //   fullName,
  //   id,
  // }));
  // console.log(newHospitalsArray, "new hospitalArrya");
  errorsMap.set("date", "");
  errorsMap.set("time", "");
  const doctors = ["Rajesh", "Suresh"];
  const dropdownContent = [
    "Family_Medicine",
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

  const [specialization, setSpecialization] = useState<string>("NA");
  const [hospitalName, setHospital] = useState<string>("");
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
      hospitalId,
      specialization,
      doctorId,
      userId,
      date,
      status: "PENDING",
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
        hospitalId,
        specialization,
        doctorId,
        userId,
        date,
        status: "PENDING",
        time,
      });
      console.log(response, "response from crwating the appointments ");
      if (response.status === 200) {
        toast.success("Appointment Booked successfully");
        router.refresh();
        onClickHandler();
        router.push("/patient-dashboard");
        console.log(`${time}Status Updated successfully ${response}`);
      }
      // console.log("Hi sbove the 409");
    } catch (error) {
      // alert("All fields are Required (Error:400)");
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
  const dropdownChangeHospital = (item: string) => {
    setHospital(item);
  };
  const dropdownChangeSpe = (item: string) => {
    setSpecialization(item);
  };
  const dropdownChangeDoc = (item: string) => {
    setDoctorName(item);
  };
  useEffect(() => {
    const hospital = hospitalsArray.find(
      ({ fullName }) => fullName === hospitalName
    );
    if (hospital) {
      setHospitalId(hospital.id);
    }
  }, [hospitalName, hospitalsArray]); // Re-run this effect only when hospitalName or hospitalsArray changes
  useEffect(() => {
    const doctor = doctorsArray.find(({ name }) => name === doctorName);
    if (doctor) {
      setDoctorId(doctor.id);
    }
  }, [doctorName, doctorsArray]); // Re-run this effect only when hospitalName or hospitalsArray changes

  // const hospitalsFetched = hospitalsArray.map(({ fullName, phoneNumber }) => ({
  //   name: fullName,
  //   contactNumber: phoneNumber,
  // }));
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
                  label={"Select Hospital"}
                  dropdownContent={hospitalsNamesArray}
                  onSelect={dropdownChangeHospital}
                />
                <DropDown
                  label={"Select Specialization"}
                  dropdownContent={dropdownContent}
                  onSelect={dropdownChangeSpe}
                />
                <DropDown
                  label={"Select Doctor"}
                  dropdownContent={doctorsNameArray}
                  onSelect={dropdownChangeDoc}
                />
              </div>
              <div className="md:flex justify-around">
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
