import axios from "axios";
import crypto from "crypto";
import { NextResponse } from "next/server";

let salt_key = process.env.SALT_KEY;
let merchant_id = process.env.MERCHANT_ID;

export async function POST(req: any) {
  try {
    let reqData = await req.json();

    let merchantTransactionId = reqData.transactionId;
    const appointmentId = reqData.appointmentId;
    console.log("FIRST WAALA");
    const data = {
      merchantId: merchant_id,
      merchantTransactionId: merchantTransactionId,
      name: reqData.name,
      amount: reqData.amount * 100,
      redirectUrl: `http://localhost:3000/api/status?id=${merchantTransactionId}&appointmentId=${appointmentId}`,
      redirectMode: "POST",
      callbackUrl: `http://localhost:3000/api/status?id=${merchantTransactionId}&appointmentId=${appointmentId}`,
      mobileNumber: reqData.phone,
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };
    console.log("after data declare");

    const payload = JSON.stringify(data);
    const payloadMain = Buffer.from(payload).toString("base64");
    const keyIndex = 1;
    const string = payloadMain + "/pg/v1/pay" + salt_key;
    const sha256 = crypto.createHash("sha256").update(string).digest("hex");
    const checksum = sha256 + "###" + keyIndex;

    const prod_URL =
      "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay";

    const options = {
      method: "POST",
      url: prod_URL,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
      },
      data: {
        request: payloadMain,
      },
    };
    console.log("Before optionsssssss");
    const response = await axios(options);
    console.log("after optionsssssss");
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { error: "Payment initiation failed", details: error.message },
      { status: 500 }
    );
  }
}
