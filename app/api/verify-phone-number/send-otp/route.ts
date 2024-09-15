import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { options } from "../../auth/[...nextauth]/options";
import twilio from "twilio";

const accountSID = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceId = process.env.TWILIO_SERVICE_ID_OTP!;

const client = twilio(accountSID, authToken);

export async function GET(req: NextRequest) {
  console.log("HII from send-otp route");
  const sessionData = await getServerSession(options);
  const phoneNumber = sessionData?.user.phoneNumber!;
  console.log("Here is the phone number ", phoneNumber);
  try {
    if (!phoneNumber) {
      console.log("HII before throwing error");
      throw new Error();
    }
    console.log("HII after throwing error ");
    const twilioResponse = await client.verify.v2
      .services(serviceId)
      .verifications.create({
        channel: "sms",
        to: phoneNumber,
      });
    if (twilioResponse.status === "pending") {
      console.log(`OTP successfully sent to ${phoneNumber}`);
      return NextResponse.json(
        {
          sent: true,
        },
        { status: 200 }
      );
    } else {
      console.log(
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
    console.error(`Error occured while sending OTP ${error}`);
    return NextResponse.json({ message: "Error Occured" }, { status: 500 });
  }
}
