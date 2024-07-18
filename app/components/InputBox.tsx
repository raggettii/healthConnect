"use client";
import { useState, ChangeEvent } from "react";
import Image from "next/image";
const InputBox: React.FC<InputBoxProps> = ({
  placeholder,
  label,
  imageSource,
}) => {
  const [inputText, setInputText] = useState<string>("");
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
    console.log(event.target.value);
  };

  return (
    <>
      <div className="mr-3 ml-3 text-sm">
        {label}
        <div className="flex mb-3 mr-3 ml-3 border-1 border font-medium   rounded-lg shadow-lg hover:bg-[#313131] bg-[#3d3d3d]  w-[200px]">
          <Image
            className="pl-1"
            src={imageSource}
            alt="small img"
            width={14}
            height={14}
          />
          <input
            type="text"
            placeholder={placeholder}
            onChange={handleInputChange}
            className="text-[#11111]  font-medium  text-start rounded-lg  hover:bg-[#313131] p-2 ml-[7px] w-[175px] bg-[#3d3d3d] "
          />
        </div>
      </div>
    </>
  );
};

type InputBoxProps = {
  placeholder: string;
  label: string;
  imageSource: string;
};

export default InputBox;
