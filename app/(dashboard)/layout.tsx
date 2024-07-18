import Image from "next/image";
import MainLogoName from "../components/MainLogoName";
export default function dashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <nav className=" border-b-2  border-gray-400  m-1 sm:p-3 p-1 shadow-xl ">
        <MainLogoName />
      </nav>
      {children}
    </>
  );
}
