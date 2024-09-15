import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { options } from "../../auth/[...nextauth]/options";
import twilio from "twilio";
import toast from "react-hot-toast";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";

const accountSID = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceId = process.env.TWILIO_SERVICE_ID_OTP!;

const client = twilio(accountSID, authToken);

export async function POST(req: NextRequest) {
  const { otp } = await req.json();
  console.log("here is the otp", otp);
  const prisma = new PrismaClient();
  const sessionData = await getServerSession(options);
  const phoneNumber = sessionData?.user.phoneNumber!;

  const userId = sessionData?.user.id!;
  const role = sessionData?.user.role;
  try {
    if (!phoneNumber) {
      throw new Error();
    }
    // const searchParams = req.nextUrl.searchParams;
    // console.log("Here is the full url ", req.url);
    // // const { searchParams } = new URL(req.url);
    // console.log("Here aare sercfd params ", searchParams.getAll("otp"));
    // const otp = searchParams.get("otp") as string;
    // console.log("Hii otp aai kya ", otp);

    const twilioResponse = await client.verify.v2
      .services(serviceId)
      .verificationChecks.create({
        code: otp,
        to: phoneNumber,
      });

    if (twilioResponse.status === "approved") {
      if (role === "user") {
        await prisma.healthConnect_User.update({
          where: { id: userId },
          data: { isVerified: true },
        });
      } else {
        await prisma.healthConnect_Hospital.update({
          where: { id: userId },
          data: { isVerified: true },
        });
      }
      return NextResponse.json(
        {
          verified: true,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          verified: false,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error(`Error occured while verifying OTP`);
    return NextResponse.json({ message: "Error Occured" }, { status: 500 });
  }
}
