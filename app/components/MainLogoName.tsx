import { Oswald } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "600"],
});
export default function MainLogoName() {
  return (
    <>
      <div>
        <Link href={"/"} className="flex">
          <Image
            className="rounded-3xl"
            src={"/icons/logo (1).svg"}
            alt="main logo"
            width={40}
            height={40}
          />
          <h1
            className={`${oswald.className} pt-1 font- text-xl text-[#4ade80]`}
          >
            HealthConnect
          </h1>
        </Link>
      </div>
    </>
  );
}
