import Heading from "../Heading";
import SubHeading from "../SubHeading";
import InputBox from "../InputBox";
import ButtonComponent from "../ButtonComponent";
import Link from "next/link";
export default function PatientForm() {
  return (
    <>
      <section className="flex  justify-center h-screen">
        <div className="flex flex-col justify-center">
          <div className="flex flex-col gap-2 p-5 border-2  border-gray-400 rounded-lg shadow-lg">
            <Heading text={"Hii there..."} />
            <SubHeading text={"Get started with Appointments"} />
            <InputBox
              label={"Full Name"}
              placeholder={"John Doe"}
              imageSource={"/icons/full_name.svg"}
            />
            <InputBox
              label={"Email"}
              placeholder={"johndoe@gmail.com"}
              imageSource={"/icons/email.svg"}
            />
            <InputBox
              label={"Phone Number"}
              placeholder={"+00 0000000000"}
              imageSource={"/icons/city.svg"}
            />
            <ButtonComponent text={"Get Started"} />
            <Link
              href={"/admin-auth"}
              className="pl-24 text-[12px] text-white font-bold hover:text-green-800"
            >
              Admin?
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
