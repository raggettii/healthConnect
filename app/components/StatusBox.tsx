import Image from "next/image";

export default function StatusBox({ status }: { status: string }) {
  const func = () => {
    switch (status) {
      case "SCHEDULED":
        return "/icons/check.svg";
      case "PENDING":
        return "/icons/loader.svg";
      case "CANCELLED":
        return "/icons/cross.svg";
      case "DONE":
        return "/icons/dash.svg";
    }
  };
  return (
    <>
      <div className="pl-2 flex  gap-2 rounded-lg p-1">
        <Image
          className="text-xl"
          src={`${func()}`}
          height={10}
          width={10}
          alt="status-icon"
        />
        <div className="hidden md:block">{status}</div>
      </div>
    </>
  );
}
