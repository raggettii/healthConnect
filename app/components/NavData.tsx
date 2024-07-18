"use client";
import Image from "next/image";
import StatusBox from "./StatusBox";
import { useState } from "react";
import OtpVerifyModal from "./OtpVerifyModal";

export default function NavData({ date, time, status, doctor, key }: data) {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const onClickHandler = () => {
    setModalOpen(!isModalOpen);
  };
  return (
    <>
      <div className=" md:justify-between text-[15px] font-light items-center flex shadow-lg rounded-lg p-2   bg-[#1a3623]">
        <span className=" pl-[1px] break-words truncate w-[80px]  ">
          {doctor}
        </span>
        <span className="ml-6 text-left break-words truncate w-[80px]  ">
          {date}
        </span>
        <span className="ml-3 text-left break-words truncate w-[80px]  ">
          {time}
        </span>
        <span className="flex text-end ml-3 break-words truncate w-[100px]  ">
          <StatusBox status={status} />
        </span>
        <button className="lg:mr-9 ml-9 " onClick={onClickHandler}>
          <Image src={"icons/cross.svg"} alt="corss" height={10} width={10} />
        </button>
        {isModalOpen && (
          <OtpVerifyModal
            closeModal={onClickHandler}
            label={"Cancel Appointment"}
            placeholder={"Reason for Appointment"}
          />
        )}
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
};
