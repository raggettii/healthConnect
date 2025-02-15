import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Link from "next/link";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";
const secret = process.env.NEXT_AUTH_SECRET;
export default function NavBar({
  isLoggedIn,
  setIsLoggedIn,
}: {
  isLoggedIn: boolean;
  setIsLoggedIn: (data: boolean) => void;
}) {
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
}
