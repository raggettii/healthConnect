import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
export async function POST(req: Request) {
  const { specialization, name }: { specialization: string; name: string } =
    await req.json();
  const prisma = new PrismaClient();
  try {
    const addDoctor = await prisma.doctor.create({
      data: {
        specialization,
        name,
      },
    });
    return NextResponse.json({
      addDoctor,
    });
  } catch (error) {
    console.error(`Error occured while adding doctor ${error}`);
    return NextResponse.json({
      error,
    });
  }
}
