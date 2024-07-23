import { z } from "zod";
const validateField = (
  schema: z.AnyZodObject,
  field: string,
  value: any // Adjusted to any to accommodate various types
) => {
  // Ensure the field exists in the schema
  if (!schema.shape[field]) {
    console.error(`Field "${field}" does not exist in the schema.`);
    return "Field does not exist in the schema";
  }

  // Create a dynamic schema for the specific field
  const validateSchema = z.object({
    [field]: schema.shape[field],
  });

  console.log("validateSchema:", validateSchema);

  try {
    const parsedValue = { [field]: value };
    const result = validateSchema.safeParse(parsedValue);
    console.log("Parsed Result:", result);

    if (result.success) {
      return "";
    } else {
      throw result.error;
    }
  } catch (error) {
    console.log("Error:", error);

    if (error instanceof z.ZodError) {
      console.log("Validation error:", error.errors);
      return error.errors[0]?.message || "Invalid value";
    } else {
      console.log("Unknown error occurred");
      return "Something Bad Happened";
    }
  }
};
export default validateField;
