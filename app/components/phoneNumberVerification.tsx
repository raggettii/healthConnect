"use client";
import { useState } from "react";
import OtpVerifyModal from "./otpVerifyModal";

export default function PhoneNumberVerification({
  text,
  setter,
}: {
  text: string;
  setter: () => void;
}) {
  const [showModal, setShowModal] = useState(false);

  const changeModal = async () => {
    setShowModal(!showModal);
  };
  return (
    <>
      <button className="border p-1 rounded shadow-lg" onClick={changeModal}>
        {text}
      </button>
      {showModal && (
        <OtpVerifyModal
          setter={setter}
          id="vuhsu"
          label="Verify Phone Number"
          placeholder="Enter OTP"
          closeModal={changeModal}
        />
      )}
    </>
  );
}
