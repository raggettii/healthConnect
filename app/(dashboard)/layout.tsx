"use client";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import MainLogoName from "../components/MainLogoName";
import { Merriweather } from "next/font/google";
import SubHeading from "../components/SubHeading";
import { useEffect, useState } from "react";
import DropDown from "../components/DropDown";
import { PrismaClient } from "@prisma/client";
const merriWeather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"],
});
export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: sessionData, update } = useSession();

  const dropdownChangeDoc = async (newCity: string) => {
    await update({
      tempCity: newCity,
    });
  };
  const role = sessionData?.user.role;
  const pathName = usePathname();
  const newPathName = pathName.split("/");
  const firstName = sessionData?.user?.name;
  const availableCity: Array<string> = sessionData?.user
    ?.cities as Array<string>;

  return (
    <>
      <nav className="flex justify-between border-b-2  border-gray-400  m-1 sm:p-3 p-1 shadow-xl ">
        <MainLogoName />
        <div className="flex justify-end gap-1 ">
          {role === "user" ? (
            <DropDown
              label={sessionData?.user.tempCity || "Select City"}
              dropdownContent={availableCity}
              onSelect={dropdownChangeDoc}
              noDropdownDataText="No cities available"
            />
          ) : null}
          <button
            className="border p-1 rounded shadow-lg"
            onClick={() => {
              signOut();
            }}
          >
            SignOut
          </button>
        </div>
      </nav>
      <div className="mt-10 ">
        <div className="flex justify-between">
          <div>
            <h1
              className={`${merriWeather.className} font-bold lg:text-3xl text-xl ml-8 lg:ml-20`}
            >
              Welcome, <span className="text-[#0e7490]">{firstName}</span>
            </h1>
            <div className="ml-20 lg:ml-32 lg:text-sm ">
              {newPathName[1] === "hospitals" ? (
                <SubHeading text="Available Hospitals in your City" />
              ) : (
                <SubHeading text="Below are Your Appointments" />
              )}
            </div>
          </div>
        </div>
        {children}
      </div>
    </>
  );
}
