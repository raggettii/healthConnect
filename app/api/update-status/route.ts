import { PrismaClient, STATUS } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { date } from "zod";

export async function POST(req: NextRequest) {
  const {
    id,
    date,
    time,
    selectedValue,
  }: { id: string; date: string; time: string; selectedValue: STATUS } =
    await req.json();
  const prisma = new PrismaClient();
  try {
    const updatedStatus = await prisma.appointment.update({
      where: {
        id: id,
      },
      data: {
        date,
        time,
        status: selectedValue,
      },
    });
    console.log(updatedStatus, "response after updating status");
    return NextResponse.json(updatedStatus);
  } catch (error) {
    console.error(`Error occured while updating status ${error}`);
    return NextResponse.json(
      { error: "Error occured while updating status " },
      { status: 500 }
    );
  }
}
