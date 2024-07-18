"use client";
import AppointmentBookingModal from "./AppointmentBookingModal";
import SubHeading from "./SubHeading";
import { useState } from "react";
export default function BookAppointment({ text }: { text: string }) {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const onClickHandler = () => {
    setModalOpen(!isModalOpen);
  };
  return (
    <>
      <button onClick={onClickHandler}>
        <SubHeading text={text} />
      </button>
      {isModalOpen && (
        <AppointmentBookingModal onClickHandler={onClickHandler} />
      )}
    </>
  );
}
