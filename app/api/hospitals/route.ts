import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  const prisma = new PrismaClient();
  const sessionData = await getServerSession(options);
  // console.log("session Data heer erer", sessionData);
  const tempCity = sessionData?.user.tempCity;
  if (!tempCity || tempCity === "") {
    return NextResponse.json(
      {
        error: "Please select your City",
        errorType: "CITY_NOT_SELECTED", // Add error type for easier client-side handling
      },
      {
        status: 400, // Using 400 (Bad Request) for missing required data
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  try {
    // if (tempCity == "") throw new Error("Please select your City");
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
