// lib/db.ts
import { PrismaClient } from "@prisma/client";
import { toast } from "react-hot-toast";

const prisma = new PrismaClient();

export async function safeDbOperation<T>(
  operation: () => Promise<T>,
  errorMessage = "Database operation failed"
): Promise<T | null> {
  try {
    return await operation();
  } catch (error) {
    console.error("Database error:", error);

    // Handle specific Prisma connection errors
    if (error instanceof Error && error.message.includes("connect")) {
      toast.error(
        "Failed to connect to database. Please check your internet connection."
      );
    } else {
      toast.error(errorMessage);
    }

    return null;
  }
}

export default prisma;
