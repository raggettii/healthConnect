import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  const { appointmentId } = await req.json();
  const prisma = new PrismaClient();
  try {
    const response = await prisma.healthConnect_Appointment.delete({
      where: {
        id: appointmentId,
      },
    });
    return NextResponse.json(response);
  } catch (error) {
    console.error(`Error occured while deleting appointment ${error}`);
    return NextResponse.json(
      { error: "Error occured while deleting appointment" },
      { status: 500 }
    );
  }
}
