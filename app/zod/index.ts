import { z } from "zod";

const adminSignupSchema = z.object({
  hospitalName: z.string().nonempty({ message: "Field is Required" }),
  hospitalEmail: z.string().nonempty({ message: "Field is Required" }).email(),
  phoneNumberH: z
    .string()
    .max(16, "Maximum Length Exceeded ")
    .nonempty({ message: "Field is Required" }),
  city: z.string().nonempty({ message: "Field is Required" }),
  password: z
    .string()
    .min(6, "Minimum Length required is 6")
    .nonempty({ message: "" }),
});

const userSignupSchema = z.object({
  fullName: z.string().nonempty({ message: "Field is Required" }),
  userEmail: z.string().email().nonempty({ message: "Field is Required" }),
  phoneNumberU: z
    .string()
    .max(16, "Maximum Length Exceeded")
    .nonempty({ message: "Field is Required" }),
  city: z.string().nonempty({ message: "Field is Required" }),
  password: z
    .string()
    .min(6, "Minimum Length required is 6")
    .nonempty({ message: "" }),
});

const scheduleAppointment = z.object({
  // const date = z.string().date(),
  specialization: z.string(),
  doctorName: z.string(),
  date: z.string().date("Make sure its a Date"),
  time: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: "Make sure its valid time ",
  }),
});

export { adminSignupSchema, userSignupSchema, scheduleAppointment };
