import { z } from "zod";
const validateField = (schema: z.AnyZodObject, field: string, value: any) => {
  if (!schema.shape[field]) {
    console.error(`Field "${field}" does not exist in the schema.`);
    return "Field does not exist in the schema";
  }

  const validateSchema = z.object({
    [field]: schema.shape[field],
  });

  try {
    const parsedValue = { [field]: value };
    const result = validateSchema.safeParse(parsedValue);

    if (result.success) {
      return "";
    } else {
      throw result.error;
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return error.errors[0]?.message || "Invalid value";
    } else {
      return "Something Bad Happened";
    }
  }
};
export default validateField;
