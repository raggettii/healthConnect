import { z } from "zod";

const signupSchema = z.object({
  hospitalName: z.string().nonempty({ message: "Field is Required" }),
  hospitalEmail: z.string().nonempty({ message: "Field is Required" }).email(),
  phoneNumberH: z
    .string()
    .regex(/^\+91\d{10}$/, { message: "Invalid phone number format." }),
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

const scheduleAppointment = z
  .object({
    hospitalId: z
      .string({ message: "Please select Hospital" })
      .nonempty("Please select Hospital"),
    specialization: z
      .string({ message: "Please select Specialization" })
      .nonempty("Please select Specialization"),
    doctorId: z
      .string({ message: "Please select Doctor" })
      .nonempty("Please select Doctor"),
    userId: z.string(),
    status: z.string(),
    paymentStatus: z.string(),
    date: z
      .string()
      .refine(
        (val) => {
          const date = new Date(val);
          return !isNaN(date.getTime());
        },
        { message: "Invalid date format" }
      )
      .refine(
        (val) => {
          const inputDate = new Date(val);
          const now = new Date();
          inputDate.setHours(0, 0, 0, 0);
          now.setHours(0, 0, 0, 0);
          return inputDate >= now;
        },
        { message: "Appointment date must be in the future" }
      ),
    time: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
      message: "Make sure its valid time",
    }),
  })
  .refine(
    (data) => {
      const dateTimeStr = `${data.date} ${data.time}`;
      const appointmentDateTime = new Date(dateTimeStr);
      const now = new Date();
      return appointmentDateTime > now;
    },
    { message: "Appointment date and time must be in the future" }
  );

const updateStatusSchema = z.object({
  selectedValue: z.string(),
  date: z.string().date("Make sure its a Date"),
  time: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: "Make sure its valid time ",
  }),
});

export {
  updateStatusSchema,
  signupSchema,
  userSignupSchema,
  scheduleAppointment,
};
