"use client";
import ButtonComponent from "./ButtonComponent";
import InputBox from "./InputBox";
import Image from "next/image";
import { PrismaClient } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useReducer, useState } from "react";
import { NextResponse } from "next/server";
import { number } from "zod";
import toast from "react-hot-toast";

export default function OtpVerifyModal({
  closeModal,
  label,
  placeholder,
  id,
}: OtpVerifyModalType) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [otpText, setOtpText] = useState("");
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtpText(e.target.value);
  };
  const router = useRouter();
  const onClickHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      opt: otpText,
    };
    // if (typeof otpText != "number") {
    //   toast.error("OTP should be a Number");
    //   return;
    // }
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
          <form action="" onSubmit={onClickHandler}>
            <InputBox
              type="tel"
              required={true}
              placeholder={placeholder}
              label=""
              imageSource="/icons/otp.svg"
              value={otpText}
              error=""
              onChange={onChangeHandler}
            />
            <button
              // onClick={onClickHandler}
              type="submit"
              disabled={isSubmitting}
              className="disabled:bg-gray-500 disabled:text-white text-center font-bold text-lg hover:text-green-800 p-2 mt-3 mb-3 text-white bg-green-400 w-[200px] ml-5 rounded-lg"
            >
              Submit
            </button>
          </form>
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
