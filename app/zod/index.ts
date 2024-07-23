import { z } from "zod";

const adminSignupSchema = z.object({
  hospitalName: z.string().nonempty({ message: "Field is Required" }),
  hospitalEmail: z.string().nonempty({ message: "Field is Required" }).email(),
  phoneNumberH: z
    .string()
    .max(16, "Maximum Length Exceeded ")
    .nonempty({ message: "Field is Required" }),
  city: z.string().nonempty({ message: "Field is Required" }),
});

const userSignupSchema = z.object({
  fullName: z.string().nonempty({ message: "Field is Required" }),
  userEmail: z.string().email().nonempty({ message: "Field is Required" }),
  phoneNumberU: z
    .string()
    .max(16, "Maximum Length Exceeded")
    .nonempty({ message: "Field is Required" }),
  city: z.string().nonempty({ message: "Field is Required" }),
});

export { adminSignupSchema, userSignupSchema };
