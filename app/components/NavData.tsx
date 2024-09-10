"use client";
import Image from "next/image";
import StatusBox from "./StatusBox";
import { useState } from "react";
import OtpVerifyModal from "./OtpVerifyModal";
import ConfigModal from "./ConfigModal";
import { usePathname } from "next/navigation";

export default function NavData({
  date,
  time,
  status,
  doctor,
  id,
  patient,
}: data) {
  // console.log(id, "id from nav data");
  const pathName = usePathname();
  const actualPathname = pathName.split("-");
  const actualPathname1 = actualPathname[0];
  const onClickHandler = () => {
    if (actualPathname1 === "/admin") onClickConfigHandler();
    else onCancelClickHandler();
  };
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const onCancelClickHandler = () => {
    setModalOpen(!isModalOpen);
  };
  const [isConfigModalOpen, setConfigModalOpen] = useState<boolean>(false);
  const onClickConfigHandler = () => {
    setConfigModalOpen(!isConfigModalOpen);
  };
  return (
    <>
      <div className=" md:justify-between justify-evenly text-[15px] font-light items-center flex shadow-lg rounded-lg p-2   bg-[#1a3623]">
        <span className=" pl-[1px] break-words truncate md:w-[120px] w-[60px]   ">
          {patient}
        </span>
        <span className=" ml-[15px] break-words truncate md:w-[120px] w-[60px]  ">
          {doctor}
        </span>
        <span className="ml-4 text-left break-words truncate md:w-[120px] w-[60px] ">
          {date}
        </span>
        <span className="ml-3 text-left break-words truncate md:w-[120px] w-[60px]">
          {time}
        </span>
        <span className="flex items-left md:pl-0  ml-3 break-words truncate md:w-[120px] w-[40px]  ">
          <StatusBox status={status} />
        </span>
        <button className="lg:mr-6 ml-6   w-[40px] " onClick={onClickHandler}>
          <Image src={"/icons/circle.svg"} alt="corss" height={10} width={10} />
        </button>
        {isModalOpen && (
          <OtpVerifyModal
            closeModal={onClickHandler}
            label={"Cancel Appointment"}
            placeholder={""}
            id={id}
          />
        )}
        {isConfigModalOpen && (
          <ConfigModal
            closeModal={onClickConfigHandler}
            label={"Update Status"}
            placeholder={"Description"}
            id={id}
          />
        )}
      </div>
    </>
  );
}

type data = {
  id: string;
  date: string;
  time: string;
  status: string;
  doctor: string;
  patient: string;
};
