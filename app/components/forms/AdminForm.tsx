"use client";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import useDebounce from "@/app/functions/debounce";
import { z } from "zod";
import { adminSignupSchema } from "@/app/zod";
import React, { ChangeEvent, useState } from "react";
import Heading from "../Heading";
import SubHeading from "../SubHeading";
import InputBox from "../InputBox";
import OtpSendButton from "../OtpSendButton";
import validateField from "@/app/functions/validateField";
import axios from "axios";

export default function AdminForm() {
  const router = useRouter();
  // const prisma = new PrismaClient();

  const prev: Array<String> = [];

  type SetterType = React.Dispatch<React.SetStateAction<string>>;
  type ValidatorType = (value: string) => void;

  interface SetterValidator {
    setter: SetterType;
    validator: ValidatorType;
  }

  const errorMap: Map<string, string> = new Map();
  errorMap.set("hospitalName", "");
  errorMap.set("emailH", "");
  errorMap.set("phoneNumberH", "");
  errorMap.set("city", "");

  const [hospitalName, setHospitalName] = useState<string>("");
  const [emailH, setEmailH] = useState<string>("");
  const [phoneNumberH, setPhoneNumberH] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [errors, setErrors] = useState<Map<string, string>>(errorMap);

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

  const onSubmit = async () => {
    const result = adminSignupSchema.safeParse({
      hospitalName,
      hospitalEmail: emailH,
      phoneNumberH,
      city,
    });

    if (!result.success) {
      // Update the errors state with all validation errors
      const fieldErrors = new Map<string, string>();
      result.error.errors.forEach((error) => {
        if (error.path[0]) {
          fieldErrors.set(error.path[0], error.message);
        }
      });
      setErrors(fieldErrors);
      toast.error("Please fix the errors before submitting");
      return;
    }

    try {
      const response = await axios.post("/api/admin-signup", {
        hospitalName,
        emailH,
        phoneNumberH,
        city,
      });
      if (response.status === 200) {
        toast.success("Post created successfully");
        router.refresh();
        router.push("/api/auth/signin");
        console.log(`${hospitalName}Admin created successfully ${response}`);
      }
      // console.log("Hi sbove the 409");
    } catch (error) {
      alert("Email and PhoneNumber Sould be unique (Error:409)");
      console.error(`Error Occured While Creating Admin ${error}`);
    }
  };

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
              error={errors.get("hospitalName")}
            />
            <InputBox
              label={"Email"}
              placeholder={"cityhospital@gmail.com"}
              imageSource={"/icons/email.svg"}
              value={emailH}
              onChange={onClickHandler(setEmailH, "hospitalEmail")}
              error={errors.get("hospitalEmail")}
            />
            <InputBox
              label={"Phone Number"}
              placeholder={"+00 0000000000"}
              imageSource={"/icons/phone.svg"}
              value={phoneNumberH}
              onChange={onClickHandler(setPhoneNumberH, "phoneNumberH")}
              error={errors.get("phoneNumberH")}
            />
            <InputBox
              label={"City"}
              placeholder={"Delhi"}
              imageSource={"/icons/city.svg"}
              value={city}
              onChange={onClickHandler(setCity, "city")}
              error={errors.get("city")}
            />
            {/* Make sure to save city as small letters and when searching by patient also search for small letters */}
            <button
              className="text-center font-bold text-lg hover:text-green-800 p-2  mt-3 mb-3 text-white bg-green-400 w-[200px] ml-5 rounded-lg"
              onClick={onSubmit}
            >
              Button
            </button>
            {/* <OtpSendButton text="Submit" phoneNumber={""} /> */}
          </div>
        </div>
      </section>
    </>
  );
}
