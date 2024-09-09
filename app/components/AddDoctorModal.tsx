"use client";
import { ChangeEvent, useState } from "react";
import ButtonComponent from "./ButtonComponent";
import DropDown from "./DropDown";
import InputBox from "./InputBox";
import Image from "next/image";
import axios from "axios";
import { NextResponse } from "next/server";
import toast from "react-hot-toast";

export default function AddDoctorModal({
  closeModal,
  label,
  placeholder,
}: AddDoctorModalType) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<string>("");
  const handleDropdownChange = (item: string) => {
    setSelectedValue(item);
  };
  const [doctorName, setDoctorName] = useState<string>("");
  const onClickHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setDoctorName(e.target.value);
  };
  console.log(doctorName);
  console.log(selectedValue);
  const dropdownContent = [
    "NA",
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
  async function onSubmit() {
    setIsSubmitting(true);
    try {
      const response = await axios.post("/api/add-doctor", {
        specialization: selectedValue,
        name: doctorName,
      });
      toast.success("Doctor added Successfully");
      console.log("Doctor added successfully:", response.data);
      closeModal();
    } catch (error) {
      toast.error("All fields are required");
      console.error(`Error Occured during adding Doctor ${error}`);
      return NextResponse.json(
        { error: "Error Occured during adding Doctor" },
        { status: 500 }
      );
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <>
      <div
        onClick={closeModal}
        className="fixed inset-0 bg-[#0c4238] bg-opacity-60  flex justify-center items-center"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex flex-col bg-[#011e0e] p-3  rounded-lg shadow-2xl"
        >
          <button className=" w-[10px]" onClick={closeModal}>
            <Image
              className="bg-white "
              src={"/icons/cross.svg"}
              alt="cross"
              height={10}
              width={10}
            />
          </button>
          <h2 className="text-center m-4 text-white font-semibold text-lg">
            {label}
          </h2>
          <div className="ml-4">
            <DropDown
              noDropdownDataText=""
              label="Select Specilization"
              dropdownContent={dropdownContent}
              onSelect={handleDropdownChange}
            />
          </div>
          <InputBox
            type="text"
            required={true}
            placeholder={placeholder}
            label=""
            imageSource="/icons/otp.svg"
            value={doctorName}
            error=""
            onChange={onClickHandler}
          />
          <button
            onClick={onSubmit}
            disabled={isSubmitting}
            className="disabled:bg-gray-300 disabled:hover:text-gray-500 text-center font-bold text-lg hover:text-green-800 p-2 mt-3 mb-3 text-white bg-green-400 w-[200px] ml-5 rounded-lg"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}

type AddDoctorModalType = {
  closeModal: () => void;
  label: string;
  placeholder: string;
};
