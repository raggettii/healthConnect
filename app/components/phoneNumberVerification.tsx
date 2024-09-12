"use client";
import { useState } from "react";
import OtpVerifyModal from "./otpVerifyModal";
import axios from "axios";

export default function PhoneNumberVerification({ text }: { text: string }) {
  const [showModal, setShowModal] = useState(false);
  const changeModal = async () => {
    setShowModal(!showModal);
    const data = await axios.get("/api/verify-phone-number/send-otp");
    console.log(data);
    // open karte hi otp send and a hot toast thing
    // then verify
  };
  return (
    <>
      <button className="border p-1 rounded shadow-lg" onClick={changeModal}>
        {text}
      </button>
      {showModal && (
        <OtpVerifyModal
          id="vuhsu"
          label="Verify Phone Number"
          placeholder="Enter OTP"
          closeModal={changeModal}
        />
      )}
    </>
  );
}
