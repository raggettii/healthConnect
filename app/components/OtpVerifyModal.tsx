"use client";
import ButtonComponent from "./ButtonComponent";
import InputBox from "./InputBox";
import Image from "next/image";
import { PrismaClient } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useReducer } from "react";
import { NextResponse } from "next/server";

export default function OtpVerifyModal({
  closeModal,
  label,
  placeholder,
  id,
}: OtpVerifyModalType) {
  const router = useRouter();
  const prisma = new PrismaClient();
  const onClickHandler = async () => {
    try {
      console.log("hii from onClick inside deletion of ststua");
      const response = await axios.post("/api/delete-appointment", {
        appointmentId: id,
      });
      if (response) {
        closeModal();
        router.refresh();
      }
    } catch (error) {
      console.error(`Error occured while deleting appointment ${error}`);
      return NextResponse.json(
        { error: "Error occured while deleting appointment" },
        { status: 500 }
      );
    }
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
          <button onClick={closeModal}>
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
          {/* <InputBox
            placeholder={placeholder}
            label=""
            imageSource="/icons/otp.svg"
            value=""
            error=""
            onChange={() => {}}
          /> */}
          <button
            onClick={onClickHandler}
            className="text-center font-bold text-lg hover:text-green-800 p-2 mt-3 mb-3 text-white bg-green-400 w-[200px] ml-5 rounded-lg"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}

type OtpVerifyModalType = {
  closeModal: () => void;
  label: string;
  placeholder: string;
  id: string;
};
