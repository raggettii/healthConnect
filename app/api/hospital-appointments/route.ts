import { PrismaClient } from "@prisma/client";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
  const secret = process.env.NEXTAUTH_SECRET;
  const token = await getToken({ req, secret });
  const hospital = token?.name;
  console.log(hospital);
  const prisma = new PrismaClient();
  try {
    const response = await prisma.healthConnect_Appointment.findMany({
      //     where: {
      //       hospital: hospital,
      //     },
    });
    return NextResponse.json({
      response,
    });
  } catch (error) {
    console.error(`Error occured while fetching appointments ${error}`);
    return NextResponse.json(
      { error: "Error occured while fetching appointments" },
      { status: 500 }
    );
  }
}
