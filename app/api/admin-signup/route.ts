import { PrismaClient } from "@prisma/client";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextApiRequest) {
  const { hospitalName, emailH, phoneNumberH, city }: signUpAdminType =
    req.body;
  const prisma = new PrismaClient();
  console.log(req.body);
  //   console.log(req.json);
  console.log(hospitalName);

  try {
    const response = await prisma.hospital.create({
      data: {
        hospitalName: hospitalName,
        email: emailH,
        phoneNumber: phoneNumberH,
        city: city,
      },
    });
    console.log(`Hospital created successfully ${response}`);
    return NextResponse.json({
      response,
    });
  } catch (error) {
    console.error(`Error occured while signup at admin ${error}`);
    return NextResponse.json({
      error,
    });
  }
}
type signUpAdminType = {
  hospitalName: string;
  emailH: string;
  phoneNumberH: string;
  city: string;
};
