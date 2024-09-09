import SignUpForm from "@/app/components/forms/SignUpForm";
// import PatientForm from "@/app/components/forms/PatientForm";
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
