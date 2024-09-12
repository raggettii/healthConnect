"use client";
import toast from "react-hot-toast";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { ChangeEvent } from "react";
import { scheduleAppointment } from "../zod";
import DropDown from "./DropDown";
import InputBox from "./InputBox";
import SubHeading from "./SubHeading";
import Image from "next/image";
import validateField from "../functions/validateField";
import { useSession } from "next-auth/react";
import { NextResponse } from "next/server";
import Link from "next/link";

export default function AppointmentBookingModal({
  onClickHandler,
}: {
  onClickHandler: () => void;
}) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const session = useSession();
  const userId = session.data?.user.id;
  const [doctorId, setDoctorId] = useState("");
  const [specialization, setSpecialization] = useState(""); // Added state for specialization

  const router = useRouter();
  const [hospitalId, setHospitalId] = useState<string>("");
  const [hospitalsArray, setHospitalArray] = useState([]);
  const [doctorsArray, setDoctorsArray] = useState([]);
  const [hospitalName, setHospital] = useState<string>("");
  const [doctorName, setDoctorName] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const hospitalsData = async () => {
      try {
        const response = await axios.get("/api/hospitals");
        setHospitalArray(response.data);
      } catch (error) {
        console.error(`Error while fetching hospitals data ${error}`);
        return NextResponse.json(
          { error: "Error while fetching hospitals data" },
          { status: 500 }
        );
      }
    };
    hospitalsData();
  }, []);

  useEffect(() => {
    async function fetchDoctors() {
      try {
        const response = await axios.post("/api/doctors", {
          hospitalId: hospitalId,
          specialization: specialization,
        });
        setDoctorsArray(response.data);
      } catch (error) {
        console.error(`Error occurred while fetching doctors ${error}`);
        return NextResponse.json(
          { error: "Error occurred while fetching doctors" },
          { status: 500 }
        );
      }
    }
    if (hospitalId) fetchDoctors();
  }, [hospitalId, specialization]);

  const hospitalsNamesArray = hospitalsArray.map(({ fullName }) => fullName);
  // console.log(
  //   doctorsArray,
  //   "logging fetched doctor data in appointment booking modal "
  // );
  const doctorsNameArray = doctorsArray.map(({ name }) => name);

  const dropdownContent = [
    "Family_Medicine",
    "Cardiology",
    "Dermatology",
    "Endocrinology",
    "Gastroenterology",
    "Neurology",
    "Obstetrics",
    "Oncology",
    "Orthopedics",
    "Pediatrics",
    "Psychiatry",
    "Surgery",
  ];

  useEffect(() => {
    const hospital = hospitalsArray.find(
      ({ fullName }) => fullName === hospitalName
    );
    if (hospital) {
      const hospitalData = hospital as hospitalDataType;
      setHospitalId(hospitalData.id);
    }
  }, [hospitalName, hospitalsArray]);

  useEffect(() => {
    const doctor = doctorsArray.find(({ name }) => name === doctorName);
    if (doctor) {
      const doctorData = doctor as doctorDataType;
      setDoctorId(doctorData.id);
    }
  }, [doctorName, doctorsArray]);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    // if (!isPhoneNumberVerified) {
    //   toast.error(`Phone Number not Verified`);
    //   // toast.apply()
    //   setIsSubmitting(false);
    //   return;
    // }
    const result = scheduleAppointment.safeParse({
      hospitalId,
      specialization,
      doctorId,
      userId,
      date,
      status: "PENDING",
      time,
    });

    // console.log("result after zod validation of appointment", result);

    if (!result.success) {
      result.error.errors.forEach((error) => {
        toast.error(error.message);
      });
      setIsSubmitting(false);
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
      // console.log(
      //   "Data i want to print from appointment booking modal ",
      //   hospitalId,
      //   specialization,
      //   doctorId,
      //   userId,
      //   date,
      //   time
      // );
      if (response.status === 200) {
        toast.success("Appointment Booked successfully");
        router.refresh();
        onClickHandler();
        router.push("/patient-dashboard");
      }
    } catch (error) {
      toast.error("All fields are required");
      console.error(`Error Occurred While Creating Appointment ${error}`);
      return NextResponse.json(
        { error: "Error Occurred While Creating Appointment" },
        { status: 500 }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const onChangeHandler =
    (setter: React.Dispatch<React.SetStateAction<string>>, field: string) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setter(value);
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

  return (
    <>
      <div
        onClick={onClickHandler}
        className="fixed inset-0 bg-[#0c4238] bg-opacity-60 flex justify-center items-center"
      >
        <div className="flex h-screen justify-center">
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
                  noDropdownDataText="No Hospitals are registered from your City"
                  label={"Select Hospital"}
                  dropdownContent={hospitalsNamesArray}
                  onSelect={dropdownChangeHospital}
                />
                <DropDown
                  noDropdownDataText=""
                  label={"Select Specialization"}
                  dropdownContent={dropdownContent}
                  onSelect={dropdownChangeSpe}
                />
                <DropDown
                  noDropdownDataText="No doctors available with your selected specialization at this hospital"
                  label={"Select Doctor"}
                  dropdownContent={doctorsNameArray}
                  onSelect={dropdownChangeDoc}
                />
              </div>
              <form>
                <div className="md:flex justify-around">
                  <InputBox
                    type="text"
                    required={true}
                    label="Expected Appointment Date "
                    imageSource="/icons/calender.svg"
                    placeholder="YYYY-MM-DD"
                    value={date}
                    error={""}
                    onChange={onChangeHandler(setDate, "date")}
                  />
                  <InputBox
                    type="text"
                    required={true}
                    label="Expected Appointment Time "
                    imageSource="/icons/clock.svg"
                    placeholder="HH:MM (24 Hrs)"
                    value={time}
                    error={""}
                    onChange={onChangeHandler(setTime, "time")}
                  />
                </div>
                <div className="flex justify-center">
                  <button
                    onClick={onSubmit}
                    disabled={isSubmitting}
                    type="submit"
                    className="disabled:bg-gray-400 disabled:hover:text-white text-center font-bold text-lg hover:text-green-800 p-2 mt-3 mb-3 text-white bg-green-400 w-[200px] rounded-lg"
                  >
                    Book Appointment
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
type hospitalDataType = {
  id: string;
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
  city: string;
};
type doctorDataType = {
  id: string;
  name: string;
  specialization: string;
  hospitalId: string;
};
