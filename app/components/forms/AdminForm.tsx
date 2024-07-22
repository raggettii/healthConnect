"use client";
import useDebounce from "@/app/functions/debounce";
import { z } from "zod";
import { adminSignupSchema } from "@/app/zod";
import React, { ChangeEvent, useState } from "react";
import Heading from "../Heading";
import SubHeading from "../SubHeading";
import InputBox from "../InputBox";
import OtpSendButton from "../OtpSendButton";
import { error } from "console";

export default function AdminForm() {
  const prev: Array<String> = [];

  type SetterType = React.Dispatch<React.SetStateAction<string>>;
  type ValidatorType = (value: string) => void;

  interface SetterValidator {
    setter: SetterType;
    validator: ValidatorType;
  }

  const validateField = (
    schema: z.AnyZodObject,
    field: string,
    value: string
  ) => {
    // for parsing the entered value through
    // zod we need to create a special schema
    // that is created each time for different
    // inputs as per required value
    const validateSchema = z.object({
      [field]: schema.shape[field],
    });
    try {
      const { success } = validateSchema.safeParse(value);
      if (success) return "";
      else throw new Error();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return error.errors[0]?.message || "Invalid value";
      } else return "Something Bad Happened";
    }
  };

  const [hospitalName, setHospitalName] = useState<string>("");
  const [emailH, setEmailH] = useState<string>("");
  const [phoneNumberH, setPhoneNumberH] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [errors, setErrors] = useState<[{ [key: string]: string }]>([{}]);

  const debouncedHospitalName = useDebounce(hospitalName, 500);
  const debouncedEmailH = useDebounce(emailH, 500);
  const debouncedPhoneNumberH = useDebounce(phoneNumberH, 500);
  const debouncedCity = useDebounce(city, 500);

  console.log(hospitalName);
  console.log(emailH);
  console.log(phoneNumberH);
  console.log(city);
  const validate = (field: string, value: string) => {
    const errorMessage: string = validateField(adminSignupSchema, field, value);
    setErrors((prev) => ({ ...prev, [field]: errorMessage }));
  };

  const onClickHandler =
    (setter: SetterType, field: string) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setter(value);
      validate(field, value);
    };

  React.useEffect(() => {
    validate("hospitalName", debouncedHospitalName);
  }, [debouncedHospitalName]);

  React.useEffect(() => {
    validate("hospitalEmail", debouncedEmailH);
  }, [debouncedEmailH]);

  React.useEffect(() => {
    validate("phoneNumberH", debouncedPhoneNumberH);
  }, [debouncedPhoneNumberH]);

  React.useEffect(() => {
    validate("city", debouncedCity);
  }, [debouncedCity]);

  return (
    <>
      <section className="flex justify-center h-screen">
        <div className="flex flex-col justify-center">
          <div className="flex flex-col gap-2 p-5 border-2 border-gray-400 rounded-lg shadow-lg">
            <Heading text={"Hii Admin..."} />
            <SubHeading text={"Get started with Appointments"} />
            <InputBox
              label={"Hospital Name"}
              placeholder={"City Hospital"}
              imageSource={"/icons/hospital_icon.svg"}
              value={hospitalName}
              onChange={onClickHandler(setHospitalName, "hospitalName")}
              error={"errors[0].hospitalEmail"}
            />
            <InputBox
              label={"Email"}
              placeholder={"cityhospital@gmail.com"}
              imageSource={"/icons/email.svg"}
              value={emailH}
              onChange={onClickHandler(setEmailH, "hospitalEmail")}
              error={"errors.hospitalEmail"}
            />
            <InputBox
              label={"Phone Number"}
              placeholder={"+00 0000000000"}
              imageSource={"/icons/phone.svg"}
              value={phoneNumberH}
              onChange={onClickHandler(setPhoneNumberH, "phoneNumberH")}
              error={"errors.phoneNumberH"}
            />
            <InputBox
              label={"City"}
              placeholder={"Delhi"}
              imageSource={"/icons/city.svg"}
              value={city}
              onChange={onClickHandler(setCity, "city")}
              error={"errors.city"}
            />
            {/* Make sure to save city as small letters and when searching by patient also search for small letters */}
            <OtpSendButton text="Submit" phoneNumber={""} />
          </div>
        </div>
      </section>
    </>
  );
}
