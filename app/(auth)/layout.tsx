import Image from "next/image";
import MainLogoName from "../components/MainLogoName";

export default function authLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex md:justify-between">
        <MainLogoName />
        {children}
        <Image
          className="hidden md:block h-screen max-w-[50%] "
          src={"/icons/doctor_front.jpg"}
          alt="Smiling doctor image "
          width={1000}
          height={1000}
        />
      </div>
    </>
  );
}
