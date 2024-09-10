"use client";
import { useState } from "react";
import OtpVerifyModal from "./OtpVerifyModal";

const OtpVerifyButton: React.FC<ButtonComponentProps> = ({
  text,
  phoneNumber,
  otp,
}) => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const handleOpenModel = () => {
    setModalOpen(!isModalOpen);
  };
  return (
    <>
      {isModalOpen && (
        <OtpVerifyModal
          id=""
          closeModal={handleOpenModel}
          label="Enter OTP"
          placeholder="Enter OTP"
        />
      )}
      <button
        onClick={handleOpenModel}
        className="text-center font-bold text-lg hover:text-green-800 p-2  mt-3 mb-3 text-white bg-green-400 w-[200px] ml-5 rounded-lg"
      >
        {text}
      </button>
    </>
  );
};

type ButtonComponentProps = {
  text: string;
  phoneNumber: string;
  otp: string;
};

export default OtpVerifyButton;
