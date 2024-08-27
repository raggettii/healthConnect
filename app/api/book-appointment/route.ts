import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { PrismaClient, SPECIALIZATION, STATUS } from "@prisma/client";
export async function POST(req: NextRequest) {
  const prisma = new PrismaClient();
  const {
    hospitalId,
    specialization,
    doctorId,
    userId,
    date,
    status,
    time,
  }: {
    hospitalId: string;
    specialization: SPECIALIZATION;
    doctorId: string;
    userId: string;
    date: string;
    status: STATUS;
    time: string;
  } = await req.json();
  try {
    const response = await prisma.appointment.create({
      data: {
        doctorSpecialization: specialization,
        date,
        time,
        doctor: {
          connect: { id: doctorId },
        },
        patient: {
          connect: { id: userId },
        },
        hospital: {
          connect: { id: hospitalId },
        },
        status,
      },
    });
    console.log(response, "api response after book appointment");
    return NextResponse.json({
      msg: `Appointment added successfully ${response}`,
    });
  } catch (error) {
    console.error(`Error while booking appointment ${error}`);
    return NextResponse.json(
      { error: "Error while booking appointment" },
      { status: 500 }
    );
  }
}
