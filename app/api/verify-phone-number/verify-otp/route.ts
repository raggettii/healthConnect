import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { options } from "../../auth/[...nextauth]/options";
import twilio from "twilio";
import toast from "react-hot-toast";
import { PrismaClient } from "@prisma/client";

const accountSID = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceId = process.env.TWILIO_SERVICE_ID_OTP!;

const client = twilio(accountSID, authToken);

export async function GET(req: NextRequest) {
  const prisma = new PrismaClient();
  const sessionData = await getServerSession(options);
  const phoneNumber = sessionData?.user.phoneNumber!;
  // const isVerified = sessionData?.user

  const userId = sessionData?.user.id!;
  const role = sessionData?.user.role;
  try {
    if (phoneNumber) {
      throw new Error();
    }

    const { searchParams } = new URL(req.url);
    const otp = searchParams.get("otp") as string;

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
      // await prisma
      toast.success(`OTP verified successfully`);
      return NextResponse.json(
        {
          verified: true,
        },
        { status: 200 }
      );
    } else {
      toast.error(`Enter correct OTP or try again`);
      return NextResponse.json(
        {
          verified: false,
        },
        { status: 500 }
      );
    }

    console.log("Hello");
  } catch (error) {
    console.error(`Error occured while sending OTP`);
    return NextResponse.json({ message: "Error Occured" }, { status: 500 });
  }
}
