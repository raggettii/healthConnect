"use client";
import Image from "next/image";
import { useState } from "react";
export default function DropDown({
  label,
  dropdownContent,
}: {
  label: string;
  dropdownContent: Array<string>;
}) {
  const [dropdownHeader, setDropdownHeader] = useState<string>(label);
  const headerChange = (item: string) => {
    setDropdownHeader(item);
    console.log("Hii from header change");
  };
  const [dropdownToggle, setDropdownToggle] = useState<boolean>(false);
  const togglerAndHeader = (item: string) => {
    headerChange(item);
    setDropdownToggle(!dropdownToggle);
  };
  const toggler = () => {
    setDropdownToggle(!dropdownToggle);
  };
  return (
    <>
      <button
        onClick={toggler}
        className="flex justify-between mt-2 mb-3 mr-3  border text-gray-500  font-medium  text-start rounded-lg  hover:bg-[#313131] p-2 ml-[7px] w-[200px] bg-[#3d3d3d] "
      >
        {dropdownHeader}
        <Image
          className="mt-2 pl-[1px]"
          src={"/icons/down-notch.svg"}
          alt="down-notch"
          width={10}
          height={10}
        />
      </button>
      {dropdownToggle && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={toggler}
        >
          <div
            className="relative bg-[#3d3d3d] rounded-lg p-4"
            onClick={(e) => e.stopPropagation()}
          >
            {dropdownContent.map((item, index) => (
              <div
                onClick={() => togglerAndHeader(item)}
                className="cursor-pointer pl-1 ml-2 border-b rounded-sm w-[180px] bg-[#313131] hover:bg-slate-500"
                key={index}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
