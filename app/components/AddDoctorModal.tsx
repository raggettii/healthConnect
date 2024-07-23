import ButtonComponent from "./ButtonComponent";
import DropDown from "./DropDown";
import InputBox from "./InputBox";
import Image from "next/image";

export default function AddDoctorModal({
  closeModal,
  label,
  placeholder,
}: AddDoctorModalType) {
  const dropdownContent = [
    "Family Medicine",
    "Cardiology",
    "Dermatology",
    "Endocrinology",
    "Gastroenterology",
    "Neurology",
    "Obstetrics ",
    "Oncology",
    "Orthopedics",
    "Pediatrics",
    "Psychiatry",
    "Surgery",
  ];
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
              label="Select Specilization"
              dropdownContent={dropdownContent}
            />
          </div>
          <InputBox
            placeholder={placeholder}
            label=""
            imageSource="/icons/otp.svg"
            value=""
            error=""
            onChange={() => {}}
          />
          <button
            onClick={closeModal}
            className="text-center font-bold text-lg hover:text-green-800 p-2 mt-3 mb-3 text-white bg-green-400 w-[200px] ml-5 rounded-lg"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}

type AddDoctorModalType = {
  closeModal: () => void;
  label: string;
  placeholder: string;
};
