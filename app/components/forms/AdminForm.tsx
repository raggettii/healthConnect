import Heading from "../Heading";
import SubHeading from "../SubHeading";
import InputBox from "../InputBox";
import ButtonComponent from "../ButtonComponent";
import Link from "next/link";
import OtpSendButton from "../OtpSendButton";
export default function AdminForm() {
  return (
    <>
      <section className="flex  justify-center h-screen">
        <div className="flex flex-col justify-center">
          <div className="flex flex-col gap-2 p-5 border-2  border-gray-400 rounded-lg shadow-lg">
            <Heading text={"Hii Admin..."} />
            <SubHeading text={"Get started with Appointments"} />
            <InputBox
              label={"Hospital Name"}
              placeholder={"City Hospital"}
              imageSource={"/icons/hospital_icon.svg"}
            />
            <InputBox
              label={"Email"}
              placeholder={"cityhospital@gmail.com"}
              imageSource={"/icons/email.svg"}
            />
            <InputBox
              label={"Phone Number"}
              placeholder={"+00 0000000000"}
              imageSource={"/icons/phone.svg"}
            />
            <InputBox
              label={"City"}
              placeholder={"Delhi"}
              imageSource={"/icons/city.svg"}
            />
            {/* Make sure to save city as small letters and when searching by patient also search for small letters */}
            <OtpSendButton text="Submit" phoneNumber={""} />
          </div>
        </div>
      </section>
    </>
  );
}
