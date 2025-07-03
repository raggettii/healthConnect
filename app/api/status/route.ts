import crypto from "crypto";
import axios from "axios";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

let salt_key = process.env.SALT_KEY;
let merchant_id = process.env.MERCHANT_ID;

export async function POST(req: any) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const merchantTransactionId = searchParams.get("id");
    const appointmentId = searchParams.get("appointmentId");

    const keyIndex = 1;

    console.log("Inside status thingggg");

    const string =
      `/pg/v1/status/${merchant_id}/${merchantTransactionId}` + salt_key;
    const sha256 = crypto.createHash("sha256").update(string).digest("hex");
    const checksum = sha256 + "###" + keyIndex;

    const options = {
      method: "GET",
      url: `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${merchant_id}/${merchantTransactionId}`,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
        "X-MERCHANT-ID": merchant_id,
      },
    };
    console.log("Inside status thingggg before status");
    const response = await axios(options);
    console.log(response);
    console.log("Inside status thingggg after status");
    if (response.data.success === true) {
      // Update appointment status in database
      await prisma.healthConnect_Appointment.update({
        where: { id: appointmentId },
        data: {
          paymentStatus: "SUCCESSFULL",
          transactionId: merchantTransactionId,
          paymentVerifiedAt: new Date(),
        },
      });

      const response = NextResponse.redirect(
        "http://localhost:3000/patient-dashboard",
        {
          status: 301,
        }
      );
      response.cookies.set("toast_message", "Appointment booked successfully");
      return response;
    } else {
      await prisma.healthConnect_Appointment.update({
        where: { id: appointmentId },
        data: { paymentStatus: "FAILED" },
      });
      const response = NextResponse.redirect(
        "http://localhost:3000/patient-dashboard",
        {
          status: 301,
        }
      );
      response.cookies.set("toast_message", "Appointment booking failed");
      return response;
    }
  } catch (error: any) {
    console.error(error);
    // Return error response
    return NextResponse.json(
      { error: "Payment check failed", details: error.message },
      { status: 500 }
    );
  }
}
