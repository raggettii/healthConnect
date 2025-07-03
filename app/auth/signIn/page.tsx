"use client";
import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import MainLogoName from "@/app/components/MainLogoName";
import Link from "next/link";

export default function CustomSignIn() {
  const [form, setForm] = useState({
    phoneNumber: "",
    password: "",
    role: "user",
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // console.log("Current form state:", form);
    // console.log("Currently focused:", focusedField);
  }, [form, focusedField]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const newState = { ...prev, [name]: value };
      // console.log(`Updating ${name} to:`, value);
      return newState;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const submissionData = { ...form };
    // console.log("Submitting:", submissionData);

    const result = await signIn("credentials", {
      redirect: false,
      ...submissionData,
    });

    if (result?.error) {
      toast.error(result.error);
    } else if (!result?.error) {
      toast.success("Login successful");
      router.push(
        submissionData.role === "user"
          ? "/patient-dashboard"
          : "/admin-dashboard"
      );
    }
  };

  const handleGoogleSignIn = () => {
    signIn("google", {
      callbackUrl: "/patient-dashboard",
    });
  };

  return (
    <>
      <MainLogoName />
      <div className="h-screen flex items-center justify-center">
        <div className="max-w-md w-full p-8 rounded-lg shadow-2xl">
          <Link href={"/patient-signup"} className="underline cursor-pointer">
            Sign Up
          </Link>
          <h2 className="text-2xl font-bold text-center mb-4">Sign In</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Your existing form fields */}
            <div>
              {/* <Link href={"/user-signup"}>SignUp</Link> */}
              <label className="block mb-1 text-sm font-medium text-gray-300">
                Role
              </label>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                onFocus={() => setFocusedField("role")}
                className="text-gray-900 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-300">
                Phone Number
              </label>
              <input
                name="phoneNumber"
                type="tel"
                value={form.phoneNumber}
                onChange={handleChange}
                onFocus={() => setFocusedField("phoneNumber")}
                className="text-gray-900 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="+(91)9876543210"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                onFocus={() => setFocusedField("password")}
                className="text-gray-900 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Enter password"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
            >
              Sign In
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Google Sign-In Button */}
            <button
              onClick={handleGoogleSignIn}
              type="button"
              className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google (Only User)
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
