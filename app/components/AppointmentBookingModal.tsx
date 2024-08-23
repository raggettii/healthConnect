"use client";
import toast from "react-hot-toast";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { ChangeEvent } from "react";
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
  const [specialization, setSpecialization] = useState(""); // Added state for specialization

  const errorsMap: Map<string, string> = new Map();

  const validate = useCallback((field: string, value: string) => {
    const errorMessage: string = validateField(
      scheduleAppointment,
      field,
      value
    );
    setErrors((prevErrors) => new Map(prevErrors).set(field, errorMessage));
  }, []);

  const router = useRouter();
  const [hospitalId, setHospitalId] = useState<string>("");
  const [hospitalsArray, setHospitalArray] = useState([]);
  const [doctorsArray, setDoctorsArray] = useState([]);
  const [hospitalName, setHospital] = useState<string>("");
  const [doctorName, setDoctorName] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [reason, setReason] = useState<string>("");
  const [error, setErrors] = useState<Map<string, string>>(errorsMap);

  const debouncedDate = useDebounce(date, 500);
  const debouncedTime = useDebounce(time, 500);

  // Fetch hospitals data
  useEffect(() => {
    const hospitalsData = async () => {
      try {
        const response = await axios.get("/api/hospitals");
        setHospitalArray(response.data);
      } catch (error) {
        console.error(`Error while fetching hospitals data ${error}`);
      }
    };
    hospitalsData();
  }, []);

  // Fetch doctors data when hospitalId changes
  useEffect(() => {
    async function fetchDoctors() {
      try {
        const response = await axios.post("/api/doctors", {
          hospitalId: hospitalId,
        });
        setDoctorsArray(response.data);
      } catch (error) {
        console.error(`Error occurred while fetching doctors ${error}`);
      }
    }
    if (hospitalId) fetchDoctors();
  }, [hospitalId]);

  const hospitalsNamesArray = hospitalsArray.map(({ fullName }) => fullName);
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

  // Validate fields with debounced values
  useEffect(() => {
    validate("date", debouncedDate);
  }, [debouncedDate, validate]);

  useEffect(() => {
    validate("time", debouncedTime);
  }, [debouncedTime, validate]);

  // Update hospitalId when hospitalName changes
  useEffect(() => {
    const hospital = hospitalsArray.find(
      ({ fullName }) => fullName === hospitalName
    );
    if (hospital) {
      setHospitalId(hospital.id);
    }
  }, [hospitalName, hospitalsArray]);

  // Update doctorId when doctorName changes
  useEffect(() => {
    const doctor = doctorsArray.find(({ name }) => name === doctorName);
    if (doctor) {
      setDoctorId(doctor.id);
    }
  }, [doctorName, doctorsArray]);

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
      if (response.status === 200) {
        toast.success("Appointment Booked successfully");
        router.refresh();
        onClickHandler();
        router.push("/patient-dashboard");
      }
    } catch (error) {
      console.error(`Error Occurred While Creating Appointment ${error}`);
    }
  };

  const onChangeHandler =
    (setter: React.Dispatch<React.SetStateAction<string>>, field: string) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setter(value);
      validate(field, value);
    };

  const dropdownChangeHospital = (item: string) => {
    setHospital(item);
  };

  const dropdownChangeSpe = (item: string) => {
    setSpecialization(item); // Fixed specialization handling
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
                  label={"Select Hospital"}
                  dropdownContent={hospitalsNamesArray}
                  onSelect={dropdownChangeHospital}
                />
                <DropDown
                  label={"Select Specialization"}
                  dropdownContent={dropdownContent}
                  onSelect={dropdownChangeSpe} // Fixed specialization dropdown
                />
                <DropDown
                  label={"Select Doctor"}
                  dropdownContent={doctorsNameArray}
                  onSelect={dropdownChangeDoc}
                />
              </div>
              <div className="md:flex justify-around">
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
                  className="text-center font-bold text-lg hover:text-green-800 p-2 mt-3 mb-3 text-white bg-green-400 w-[200px] rounded-lg"
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
