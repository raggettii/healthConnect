import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import { HEALTHCONNECT_SPECIALIZATION, PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  const {
    hospitalId,
    specialization,
  }: { hospitalId: string; specialization: HEALTHCONNECT_SPECIALIZATION } =
    await req.json();
  const prisma = new PrismaClient();
  console.log(hospitalId, "hospitalId form api doctors");
  try {
    const doctors = await prisma.healthConnect_Doctor.findMany({
      where: {
        hospitalId: hospitalId,
        specialization: specialization,
      },
    });
    console.log(doctors, "from server side api call doctors array");
    return NextResponse.json(doctors);
  } catch (error) {
    console.error(`Error occured while fetching doctors ${error}`);
    return NextResponse.json(
      { error: "Error occured while fetching doctors" },
      { status: 500 }
    );
  }
}
