import { PrismaClient, HEALTHCONNECT_SPECIALIZATION } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { options } from "../auth/[...nextauth]/options";
const prisma = new PrismaClient();
export async function POST(req: NextRequest, res: NextResponse) {
  const {
    specialization,
    name,
  }: { specialization: HEALTHCONNECT_SPECIALIZATION; name: string } =
    await req.json();
  const tokenData = await getServerSession(options);
  // const id = tokenData?.id;
  console.log(tokenData, "Token data form add doctor");
  const id = tokenData?.user.id;
  console.log(
    specialization,
    name,
    id,
    "Data entered for adding doctorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr"
  );
  try {
    const addDoctor = await prisma.healthConnect_Doctor.create({
      data: {
        name,
        specialization,
        hospital: {
          connect: {
            id: id, // You should pass the hospitalId here
          },
        },
      },
    });
    return NextResponse.json({
      addDoctor,
    });
  } catch (error) {
    console.error(`Error occured while adding doctor ${error}`);
    return NextResponse.json(
      { error: "Error occurred while adding doctor" },
      { status: 500 }
    );
    // return NextResponse.json({
    //   error,
    // });
  }
}
