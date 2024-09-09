import SignUpForm from "@/app/components/forms/SignUpForm";

export default function AdminAuth() {
  return (
    <>
      <div className="max-h-full min-h-[678px]">
        <SignUpForm
          name={"Hospital Name"}
          namePlaceholder={"City Hospital"}
          emailPlaceholder={"cityhospital@gmail.com"}
        />
      </div>
    </>
  );
}
