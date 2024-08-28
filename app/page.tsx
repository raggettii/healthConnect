"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

const NavBar = ({
  isLoggedIn,
  setIsLoggedIn,
}: {
  isLoggedIn: boolean;
  setIsLoggedIn: (data: boolean) => void;
}) => {
  const { data: sessionData } = useSession();

  useEffect(() => {
    if (sessionData?.user?.id) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [sessionData]);

  return (
    <nav className="bg-[#0c4238] p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">HealthConnect</div>
        <div className="hidden md:flex space-x-4">
          {isLoggedIn ? (
            <>
              <Link href="/patient-dashboard">
                <p className="text-white hover:text-gray-300">Dashboard</p>
              </Link>
              <Link href="/api/auth/signout">
                <p className="text-white hover:text-gray-300">SignOut</p>
              </Link>
            </>
          ) : (
            <>
              <Link href="/patient-signup">
                <p className="text-white hover:text-gray-300">Signup</p>
              </Link>
              <Link href="/api/auth/signin">
                <p className="text-white hover:text-gray-300">Signin</p>
              </Link>
            </>
          )}
        </div>
        <div className="md:hidden">
          <button id="nav-toggle" className="text-white focus:outline-none">
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
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

const HeroSection = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  return (
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
                    <p className="text-white hover:text-gray-300 text-center">
                      Signup
                    </p>
                  </Link>
                  <Link href="/api/auth/signin">
                    <p className="text-white hover:text-gray-300 text-center">
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
