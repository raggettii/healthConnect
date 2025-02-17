import Link from "next/link";
export default function Footer() {
  return (
    <>
      <div className="py-6 text-center bg-[#0f5448]">
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
      </div>
    </>
  );
}
