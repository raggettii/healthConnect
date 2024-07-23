"use client";
import Heading from "../Heading";
import SubHeading from "../SubHeading";
import InputBox from "../InputBox";
import ButtonComponent from "../ButtonComponent";
import Link from "next/link";
import useDebounce from "@/app/functions/debounce";
import React, { useState, ChangeEvent } from "react";
import { userSignupSchema } from "@/app/zod";
import validateField from "@/app/functions/validateField";
import { signIn } from "next-auth/react";

export default function PatientForm() {
  const onSubmit = async () => {
    const result = await signIn("Patient_Credentials", {
      fullName: fullName,
      phoneNumber: phoneNumberU,
      email: emailU,
      redirect: true,
      callbackUrl: "/patient-dashboard",
    });
    console.log(`${result?.url} this is result `);
  };

  const prev: Array<String> = [];

  type SetterType = React.Dispatch<React.SetStateAction<string>>;
  type ValidatorType = (value: string) => void;

  interface SetterValidator {
    setter: SetterType;
    validator: ValidatorType;
  }

  const errorMap: Map<string, string> = new Map();
  errorMap.set("fullName", "");
  errorMap.set("userEmail", "");
  errorMap.set("phoneNumberU", "");
  errorMap.set("city", "");

  const [fullName, setFullName] = useState<string>("");
  const [emailU, setEmailU] = useState<string>("");
  const [phoneNumberU, setPhoneNumberU] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [errors, setErrors] = useState<Map<string, string>>(errorMap);

  const debouncedFullName = useDebounce(fullName, 500);
  const debouncedEmailU = useDebounce(emailU, 500);
  const debouncedPhoneNumberU = useDebounce(phoneNumberU, 500);
  const debouncedCity = useDebounce(city, 500);

  // console.log(hospitalName);
  // console.log(emailH);
  // console.log(phoneNumberH);
  // console.log(city);
  const validate = (field: string, value: string) => {
    const errorMessage: string = validateField(userSignupSchema, field, value);
    setErrors(errorMap.set(field, errorMessage));
  };

  const onClickHandler =
    (setter: SetterType, field: string) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setter(value);
      validate(field, value);
    };

  React.useEffect(() => {
    validate("fullName", debouncedFullName);
  }, [debouncedFullName]);

  React.useEffect(() => {
    validate("userEmail", debouncedEmailU);
  }, [debouncedEmailU]);

  React.useEffect(() => {
    validate("phoneNumberU", debouncedPhoneNumberU);
  }, [debouncedPhoneNumberU]);

  React.useEffect(() => {
    validate("city", debouncedCity);
  }, [debouncedCity]);

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
              value={fullName}
              error={errors.get("fullName")}
              onChange={onClickHandler(setFullName, "fullName")}
            />
            <InputBox
              label={"Email"}
              placeholder={"johndoe@gmail.com"}
              imageSource={"/icons/email.svg"}
              value={emailU}
              error={errors.get("userEmail")}
              onChange={onClickHandler(setEmailU, "userEmail")}
            />
            <InputBox
              label={"Phone Number"}
              placeholder={"+00 0000000000"}
              imageSource={"/icons/city.svg"}
              value={phoneNumberU}
              error={errors.get("phoneNumberU")}
              onChange={onClickHandler(setPhoneNumberU, "phoneNumberU")}
            />
            <button onClick={onSubmit}>Button</button>
            <ButtonComponent text={"Get Started"} />
            <Link
              href={"/admin-signup"}
              className="pl-24 text-[12px] text-white font-bold hover:text-green-800"
            >
              Admin ?
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
