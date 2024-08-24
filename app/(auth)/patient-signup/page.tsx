import AdminForm from "@/app/components/forms/AdminForm";
// import PatientForm from "@/app/components/forms/PatientForm";
export default function PatientAuth() {
  return (
    <>
      <AdminForm
        name={"First Name"}
        namePlaceholder={"John Doe"}
        emailPlaceholder={"johndoe@gmail.com"}
      />
    </>
  );
}
