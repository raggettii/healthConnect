"use client";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import MainLogoName from "../components/MainLogoName";
import { Merriweather } from "next/font/google";
import SubHeading from "../components/SubHeading";
import { useEffect, useState } from "react";
import PhoneNumberVerification from "../components/phoneNumberVerification";
const merriWeather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"],
});
export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sessionData = useSession();
  const pathName = usePathname();
  const newPathName = pathName.split("/");
  const firstName = sessionData.data?.user?.name;
  const [phoneNumberVerifiedLocally, setIsPhoneNumberVerifiedLocally] =
    useState(false);
  const isPhoneNumberVerified = sessionData.data?.user.isVerified;
  useEffect(() => {
    function func() {
      if (isPhoneNumberVerified) {
        setIsPhoneNumberVerifiedLocally(true);
      }
    }
    func();
  }, []);

  return (
    <>
      <nav className="flex justify-between border-b-2  border-gray-400  m-1 sm:p-3 p-1 shadow-xl ">
        <MainLogoName />
        <div className="flex justify-end gap-1 ">
          {!phoneNumberVerifiedLocally && (
            <PhoneNumberVerification
              setter={() => setIsPhoneNumberVerifiedLocally}
              text="Verify Phone Number"
            />
          )}
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
