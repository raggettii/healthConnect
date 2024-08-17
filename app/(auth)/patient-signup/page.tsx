import AdminForm from "@/app/components/forms/AdminForm";
// import PatientForm from "@/app/components/forms/PatientForm";
export default function patientAuth() {
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
