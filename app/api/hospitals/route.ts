import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  const prisma = new PrismaClient();
  const sessionData = await getServerSession(options);
  const tempCity = sessionData?.user.tempCity;
  if (!tempCity || tempCity === "") {
    return NextResponse.json(
      {
        error: "Please select your City",
        errorType: "CITY_NOT_SELECTED",
      },
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  try {
    const response = await prisma.healthConnect_Hospital.findMany({
      where: {
        city: tempCity,
      },
    });
    console.log(response, "From api hospital call");
    return NextResponse.json(response);
  } catch (error) {
    if (tempCity != "") {
      return NextResponse.json(
        { error: "Error occured while fetchin nbndjkbnjdbg hospitals" },
        { status: 403 }
      );
    } else
      return NextResponse.json(
        { error: "Please select your City" },
        { status: 401 }
      );
  }
}
