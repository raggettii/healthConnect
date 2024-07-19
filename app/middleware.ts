export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/admin-dashboard", "/otp-verify", "/patient-dashboard"],
};
