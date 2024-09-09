"use client";
import { useState, ChangeEvent } from "react";
import Image from "next/image";
const InputBox: React.FC<InputBoxProps> = ({
  placeholder,
  label,
  imageSource,
  onChange,
  value,
  error,
  type,
  required,
}) => {
  return (
    <>
      <div className="mr-3 ml-3 text-sm">
        {label}
        <div
          className={`flex mb-3 mr-3 ml-3 border-1 border font-medium   rounded-lg shadow-lg hover:bg-[#313131] bg-[#3d3d3d]  w-[200px]  ${
            error ? "border-red-500" : "border-gray-400"
          }`}
        >
          <Image
            className="pl-1"
            src={imageSource}
            alt="small img"
            width={14}
            height={14}
          />
          <input
            value={value}
            type={type}
            required={required}
            placeholder={placeholder}
            onChange={onChange}
            className={`text-[#11111]  font-medium  text-start rounded-lg  hover:bg-[#313131] p-2 ml-[7px] w-[175px] bg-[#3d3d3d]`}
          />
        </div>
        {error && <p className="text-red-500 text-[12px] ">{error}</p>}
      </div>
    </>
  );
};

type InputBoxProps = {
  placeholder: string;
  label: string;
  imageSource: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  error: string | undefined;
  type: string;
  required: boolean;
};

export default InputBox;
