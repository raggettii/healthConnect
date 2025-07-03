// "use client";
// const client = require("twilio")(process.env.accountSid, process.env.authToken);

// // twilio-otp.js
// const verifyServiceSID = process.env.verifyServiceSID;
// async function sendOTP(phoneNumber: string) {
//   try {
//     const verification = await client.verify
//       .services(verifyServiceSID)
//       .verifications.create({ to: phoneNumber, channel: "sms" });

//     console.log(verification.sid); // Optionally, log verification SID for tracking
//     return verification;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// }

// // twilio-otp.js

// async function verifyOTP(phoneNumber: string, code: string) {
//   try {
//     const verificationCheck = await client.verify
//       .services(verifyServiceSID)
//       .verificationChecks.create({ to: phoneNumber, code: code });

//     console.log(verificationCheck.status); // 'approved' or 'pending'

//     if (verificationCheck.status === "approved") {
//       console.log("OTP verified successfully!");
//       return true;
//     } else {
//       console.log("OTP verification failed.");
//       return false;
//     }
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// }

// export { sendOTP, verifyOTP };
