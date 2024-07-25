"use client";
import { ChangeEvent, useState } from "react";
import ButtonComponent from "./ButtonComponent";
import DropDown from "./DropDown";
import InputBox from "./InputBox";
import Image from "next/image";
import axios from "axios";

export default function AddDoctorModal({
  closeModal,
  label,
  placeholder,
}: AddDoctorModalType) {
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
  const onSubmit = async () => async () => {
    const response = await axios.post("api/add-doctor", {
      // yaaha aaiga dono data aur same kar denge
    });
    console.log("Doctor added successfully:", response.data);
  };
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
              label="Select Specilization"
              dropdownContent={dropdownContent}
              onSelect={handleDropdownChange}
            />
          </div>
          <InputBox
            placeholder={placeholder}
            label=""
            imageSource="/icons/otp.svg"
            value={doctorName}
            error=""
            onChange={onClickHandler}
          />
          <button
            onClick={onSubmit}
            className="text-center font-bold text-lg hover:text-green-800 p-2 mt-3 mb-3 text-white bg-green-400 w-[200px] ml-5 rounded-lg"
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
