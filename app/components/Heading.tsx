import { Roboto } from "next/font/google";
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
});
export default function Heading({ text }: { text: string }) {
  return (
    <>
      <div className={`${roboto.className} text-2xl font-semibold`}>{text}</div>
    </>
  );
}
