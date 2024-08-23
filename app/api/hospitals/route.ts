import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  const prisma = new PrismaClient();
  const sessionData = await getServerSession(options);
  const city = sessionData?.user.address;
  try {
    const response = await prisma.hospital.findMany({
      where: {
        city: city,
      },
    });
    console.log(response, "From api hospital call");
    return NextResponse.json(response);
  } catch (error) {
    console.error(`Error occured while fetching hospitals ${error}`);
  }
}
