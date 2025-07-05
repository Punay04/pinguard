import { Resend } from "resend";

const resend = new Resend("re_aHZPjePE_44hygVLLz5Mx6RJfqTSYtoU7");

export async function sendAlertEmail(
  to: string,
  websiteName: string,
  websiteUrl: string
) {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to,
      subject: `🚨 ${websiteName} is DOWN!`,
      html: `<p>The website <strong>${websiteName}</strong> (<a href="${websiteUrl}">${websiteUrl}</a>) appears to be <span style="color: red;">DOWN</span>.</p>`,
    });
    console.log(`Email sent to ${to}`);
  } catch (err) {
    console.error("Email send failed:", err);
  }
}
