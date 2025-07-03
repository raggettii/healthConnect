import SignUpForm from "@/app/components/forms/SignUpForm";
export default function PatientAuth() {
  return (
    <>
      <div className="max-h-full min-h-[678px]">
        <SignUpForm
          name={"First Name"}
          namePlaceholder={"John Doe"}
          emailPlaceholder={"johndoe@gmail.com"}
        />
      </div>
    </>
  );
}
