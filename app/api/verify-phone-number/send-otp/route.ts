import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { options } from "../../auth/[...nextauth]/options";
import twilio from "twilio";
import toast from "react-hot-toast";

const accountSID = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceId = process.env.TWILIO_SERVICE_ID_OTP!;

const client = twilio(accountSID, authToken);

export async function GET(req: NextRequest) {
  console.log("HII from send-otp route");
  const sessionData = await getServerSession(options);
  const phoneNumber = sessionData?.user.phoneNumber!;
  try {
    if (phoneNumber) {
      throw new Error();
    }
    const twilioResponse = await client.verify.v2
      .services(serviceId)
      .verifications.create({
        channel: "sms",
        to: phoneNumber,
      });
    if (twilioResponse.status === "pending") {
      toast.success(`OTP successfully sent to ${phoneNumber}`);
      return NextResponse.json(
        {
          sent: true,
        },
        { status: 200 }
      );
    } else {
      toast.error(
        `Please check your phone number ${phoneNumber}, or try again`
      );
      return NextResponse.json(
        {
          sent: false,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    toast.error(`Error occured while sending OTP ${phoneNumber}`);
    console.error(`Error occured while sending OTP ${error}`);
    return NextResponse.json({ message: "Error Occured" }, { status: 500 });
  }
}
