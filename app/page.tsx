"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import NavBar from "./components/NavBar";

const HeroSection = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  return (
    <>
      <div className="bg-[#0c4238] text-white h-screen flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-5xl font-bold mb-4">Welcome to HealthConnect</h1>
          <p className="text-xl mb-8">
            Simplifying appointments between hospitals and doctors.
          </p>
          {!isLoggedIn && (
            <Link href="/patient-signup">
              <p className="bg-white text-[#0c4238] px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-200">
                Get Started
              </p>
            </Link>
          )}
        </div>
      </div>

      <section id="features" className="py-16 bg-[#0c4238] text-center">
        <h3 className="text-3xl font-semibold text-white m-3 ">
          Tired of Searching & Scheduling Appointments?
        </h3>
        <p>
          We make it <span className="font-bold">easy & hassle-free</span> to
          find hospitals and book appointments{" "}
          <span className="font-bold">near you</span>.
        </p>
        <div className="flex justify-between">
          <div className="flex flex-col items-start">
            <div className=" font-bold text-xl p-4 text-white">
              Easy Appointment Scheduling
            </div>
            <Image
              className="rounded-md shadow-xl border-white border-2 ml-4"
              src={"/assets/schedule.png"}
              height={300}
              width={600}
              alt="schedule_image"
            />
          </div>
          <div className="flex flex-col items-end">
            <div className=" font-bold text-xl p-4 text-white">
              Ensures Valid users
            </div>
            <Image
              className="rounded-md shadow-xl border-white border-2 mr-4"
              src={"/assets/phone_verify.png"}
              height={300}
              width={300}
              alt="phone_verify_image"
            />
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className=" font-bold text-xl p-4 text-white">
            Interactive Dashboard
          </div>
          <Image
            className="rounded-md shadow-xl border-white border-2 mr-4"
            src={"/assets/appointments.png"}
            height={300}
            width={1000}
            alt="appointments_image"
          />
        </div>
      </section>
      <footer className="py-6 text-center bg-[#0f5448]">
        <p className="text-white">
          &copy; {new Date().getFullYear()} MyApp. All rights reserved.
        </p>
        <div className="mt-2 space-x-4">
          <Link href="/privacy" className="text-blue-600 hover:underline">
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-blue-600 hover:underline">
            Terms of Service
          </Link>
        </div>
      </footer>
    </>
  );
};

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const navToggle = document.getElementById("nav-toggle");

    const toggleMenu = () => {
      setIsMenuOpen((prev) => !prev);
    };

    if (navToggle) {
      navToggle.addEventListener("click", toggleMenu);
    }

    return () => {
      if (navToggle) {
        navToggle.removeEventListener("click", toggleMenu);
      }
    };
  }, []);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <HeroSection isLoggedIn={isLoggedIn} />

      {/* Modal for mobile menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-end p-4"
          onClick={handleOverlayClick}
        >
          <div className="bg-[#4a9d8f] text-white w-full max-w-sm md:w-1/2 lg:w-1/3 p-6 rounded-lg shadow-lg relative flex flex-col justify-between h-full">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-4 right-4 text-white"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
            <div className="flex flex-col space-y-4 mt-12">
              {isLoggedIn ? (
                <>
                  <Link href="/patient-dashboard">
                    <p className="text-white hover:text-gray-300 text-center">
                      Dashboard
                    </p>
                  </Link>
                  <Link href="/api/auth/signout">
                    <p className="text-white hover:text-gray-300 text-center">
                      SignOut
                    </p>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/patient-signup">
                    <p className="text-white font-semibold hover:text-gray-300 text-center">
                      Signup
                    </p>
                  </Link>
                  <Link href="/api/auth/signin">
                    <p className="text-white font-semibold hover:text-gray-300 text-center">
                      Signin
                    </p>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
