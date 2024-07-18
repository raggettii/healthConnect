import ButtonComponent from "./ButtonComponent";
import InputBox from "./InputBox";
import Image from "next/image";

export default function OtpVerifyModal({
  closeModal,
  label,
  placeholder,
}: OtpVerifyModalType) {
  return (
    <>
      <div className="fixed inset-0 bg-[#0c4238] bg-opacity-60  flex justify-center items-center">
        <div className="flex flex-col bg-[#011e0e] p-3  rounded-lg shadow-2xl">
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
          <InputBox
            placeholder={placeholder}
            label=""
            imageSource="/icons/otp.svg"
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

type OtpVerifyModalType = {
  closeModal: () => void;
  label: string;
  placeholder: string;
};
