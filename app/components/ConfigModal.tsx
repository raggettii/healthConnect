import { ChangeEvent, useState } from "react";
import ButtonComponent from "./ButtonComponent";
import DropDown from "./DropDown";
import InputBox from "./InputBox";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import { NextResponse } from "next/server";
import toast from "react-hot-toast";
import { updateStatusSchema } from "../zod";

export default function ConfigModal({
  closeModal,
  label,
  placeholder,
  id,
}: ConfigModalType) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    const formData = {
      date,
      time,
      selectedValue,
    };
    const response = updateStatusSchema.safeParse(formData);
    if (!response.success) {
      response.error.errors.map((error) => toast.error(error.message));
      setIsSubmitting(false);
      return;
    }
    try {
      const response = await axios.post("/api/update-status", {
        id,
        date,
        time,
        selectedValue,
      });
      if (response) {
        // console.log(
        //   "HEYyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy",
        //   response
        // );
        toast.success("Status updated successfully ");
        setIsSubmitting(false);
        closeModal();
        router.refresh();
      }
    } catch (error) {
      // console.log(`Error occured while updating status ${error}`);
      return NextResponse.json(
        { error: "Error occured while updating status" },
        { status: 500 }
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const dropdownContent = ["SCHEDULED", "PENDING", "CANCELLED", "DONE"];
  const dropdownChange = (item: string) => {
    setSelectedValue(item);
  };
  // console.log(selectedValue);
  const onClickHandler =
    (value: string) => (e: ChangeEvent<HTMLInputElement>) => {
      if (value === "description") setDescription(e.target.value);
      if (value === "date") setDate(e.target.value);
      if (value === "time") setTime(e.target.value);
    };
  // console.log(date);
  // console.log(time);
  // console.log(description);
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
              noDropdownDataText=""
              label="Select Status"
              dropdownContent={dropdownContent}
              onSelect={dropdownChange}
            />
          </div>
          <form action="" onSubmit={onSubmit}>
            <InputBox
              type="text"
              required={true}
              placeholder={placeholder}
              label=""
              imageSource="/icons/otp.svg"
              value={description}
              error=""
              onChange={onClickHandler("description")}
            />
            <InputBox
              type="text"
              required={true}
              placeholder="YYYY-MM-DD"
              label=""
              imageSource="/icons/calender.svg"
              value={date}
              error=""
              onChange={onClickHandler("date")}
            />
            <InputBox
              type="text"
              required={true}
              placeholder="HH:MM (24 Hrs)"
              label=""
              imageSource="/icons/clock.svg"
              value={time}
              error=""
              onChange={onClickHandler("time")}
            />
            <button
              // onClick={onSubmit}
              type="submit"
              disabled={isSubmitting}
              className=" disabled:bg-gray-500 disabled:text-white text-center font-bold text-lg hover:text-green-800 p-2 mt-3 mb-3 text-white bg-green-400 w-[200px] ml-5 rounded-lg"
            >
              Submit
            </button>
          </form>
          {/* Isi button k click par otp bhejne ka logic  */}
        </div>
      </div>
    </>
  );
}

type ConfigModalType = {
  closeModal: () => void;
  label: string;
  placeholder: string;
  id: string;
};
