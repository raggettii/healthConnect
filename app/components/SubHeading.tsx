export default function SubHeading({ text }: { text: string }) {
  return (
    <>
      <div className={` text-gray-400 text-[12px] font-light`}>{text}</div>
    </>
  );
}
