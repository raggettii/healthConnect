import AdminForm from "@/app/components/forms/AdminForm";

export default function adminAuth() {
  return (
    <>
      <AdminForm
        name={"Hospital Name"}
        namePlaceholder={"City Hospital"}
        emailPlaceholder={"cityhospital@gmail.com"}
      />
    </>
  );
}
