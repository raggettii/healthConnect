import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  const { appointmentId } = await req.json();
  console.log(appointmentId, "here is the appointment id ");
  const prisma = new PrismaClient();
  try {
    const response = await prisma.appointment.delete({
      where: {
        id: appointmentId,
      },
    });
    console.log(response, "response froom deleting the appointment");
    return NextResponse.json(response);
  } catch (error) {
    console.error(`Error occured while deleting appointment ${error}`);
  }
}
