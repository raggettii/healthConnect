import MainLogoName from "../components/MainLogoName";
import { Merriweather } from "next/font/google";
import SubHeading from "../components/SubHeading";
import BookAppointment from "../components/BookAppointment";
const merriWeather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"],
});
export default function dashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const firstName = "Guru Nanak hospitals";
  return (
    <>
      <nav className=" border-b-2  border-gray-400  m-1 sm:p-3 p-1 shadow-xl ">
        <MainLogoName />
      </nav>
      <div className="mt-10 h-screen">
        <div className="flex justify-between">
          <div>
            <h1
              className={`${merriWeather.className} font-bold lg:text-3xl text-xl ml-8 lg:ml-20`}
            >
              Welcome, <span className="text-[#0e7490]">{firstName}</span>
            </h1>
            <div className="ml-20 lg:ml-32 lg:text-sm ">
              <SubHeading text="Below are Your Appointments" />
            </div>
          </div>
        </div>
        {children}
      </div>
    </>
  );
}
