import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: Request, res: Response) {
  const {
    password,
    hospitalName,
    emailH,
    phoneNumberH,
    city,
  }: signUpAdminType = await req.json();
  const prisma = new PrismaClient();
  console.log(password, hospitalName, emailH, phoneNumberH, city);
  try {
    const response = await prisma.healthConnect_User.create({
      data: {
        fullName: hospitalName,
        email: emailH,
        phoneNumber: phoneNumberH,
        city: city,
        password: password,
      },
    });
    // console.log(`User created successfully ${response}`);
    return NextResponse.json({
      response,
    });
  } catch (error) {
    // console.error(`Error occured while signup at user ${error}`);
    return NextResponse.json(
      { error: "Error occured while signup at user " },
      { status: 500 }
    );
  }
}
type signUpAdminType = {
  hospitalName: string;
  emailH: string;
  phoneNumberH: string;
  city: string;
  password: string;
};
