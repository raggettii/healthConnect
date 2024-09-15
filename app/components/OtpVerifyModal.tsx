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
import { Router } from "next/router";

export default function OtpVerifyModal({
  closeModal,
  label,
  placeholder,
  id,
  setter,
}: OtpVerifyModalType) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [otpText, setOtpText] = useState("");
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtpText(e.target.value);
  };

  const sendOtp = async () => {
    setIsSubmitting(true);
    try {
      const { data } = await axios.get("/api/verify-phone-number/send-otp");
      console.log(data);

      if (data.sent) {
        toast.success("OTP successfully sent!");
        setIsSubmitting(false);
      } else {
        toast.error("Failed to send OTP. Please try again.");
        setIsSubmitting(false);
      }
    } catch (error) {
      toast.error("Error occurred while sending OTP.");
      console.error("Error:", error);
      setIsSubmitting(false);
    }
  };
  const onClickHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const url = `?otp=${otpText}`;
    router.push(url);
    if (otpText.length != 6) {
      toast.error("Invailid length of OTP");
      setIsSubmitting(false);
      return;
    }
    try {
      const { data } = await axios.post("/api/verify-phone-number/verify-otp", {
        otp: otpText,
      });
      console.log(data);

      if (data.verified) {
        toast.success("OTP verified successfully");
        setter(true);
        router.refresh();
        closeModal();
        setIsSubmitting(false);
      } else {
        toast.error("Failed to verify OTP. Please try again.");
        setIsSubmitting(false);
      }
    } catch (error) {
      toast.error("Error occurred while verifying OTP.");
      console.error("Error:", error);
      setIsSubmitting(false);
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
          <button className=" w-[10px]" onClick={closeModal}>
            <Image
              className="bg-white "
              src={"/icons/cross.svg"}
              alt="cross"
              height={10}
              width={10}
            />
          </button>
          <h2 className="text-center  text-white font-semibold text-lg">
            {label}
          </h2>
          <button
            onClick={sendOtp}
            type="submit"
            disabled={isSubmitting}
            className=" disabled:text-gray-500 disabled:hover:text-gray-500 text-center font-bold text-lg hover:text-green-800  text-white m-2 ml-[75px] w-[98px]"
          >
            Send OTP
          </button>
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
  setter: (boolValue: boolean) => void;
};
