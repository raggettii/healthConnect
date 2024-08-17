"use client";
import React from "react";
import Link from "next/link";

const NavBar = () => {
  return (
    <nav className="bg-[#0c4238] p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">HealthConnect</div>
        <div className="hidden md:flex space-x-4">
          <Link href="/patient-dashboard">
            <p className="text-white hover:text-gray-300">Dashboard</p>
          </Link>
          <Link href="/patient-signup">
            <p className="text-white hover:text-gray-300">Signup</p>
          </Link>
          <Link href="/api/auth/signin">
            <p className="text-white hover:text-gray-300">Signin</p>
          </Link>
          <Link href="/api/auth/signout">
            <p className="text-white hover:text-gray-300">SignOut</p>
          </Link>
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
      <div id="nav-menu" className="hidden md:hidden">
        <Link href="/">
          <p className="block text-white py-2 px-4 hover:bg-[#0a332a]">Home</p>
        </Link>
        <Link href="/patient-signup">
          <p className="block text-white py-2 px-4 hover:bg-[#0a332a]">
            Signup
          </p>
        </Link>
        <Link href="/api/auth/signin">
          <p className="block text-white py-2 px-4 hover:bg-[#0a332a]">
            Signin
          </p>
        </Link>
        <Link href="/contact">
          <p className="block text-white py-2 px-4 hover:bg-[#0a332a]">
            Contact
          </p>
        </Link>
      </div>
    </nav>
  );
};

const HeroSection = () => {
  return (
    <div className="bg-[#0c4238] text-white h-screen flex items-center justify-center">
      <div className="text-center p-8">
        <h1 className="text-5xl font-bold mb-4">Welcome to HealthConnect</h1>
        <p className="text-xl mb-8">
          Simplifying appointments between hospitals and doctors.
        </p>
        <Link href="/get-started">
          <p className="bg-white text-[#0c4238] px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-200">
            Get Started
          </p>
        </Link>
      </div>
    </div>
  );
};

const HomePage = () => {
  React.useEffect(() => {
    const navToggle = document.getElementById("nav-toggle");
    const navMenu = document.getElementById("nav-menu");

    const toggleMenu = () => {
      if (navMenu) {
        navMenu.classList.toggle("hidden");
      }
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

  return (
    <>
      <NavBar />
      <HeroSection />
    </>
  );
};

export default HomePage;
