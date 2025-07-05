import { Worker } from "bullmq";
import axios from "axios";
import IORedis from "ioredis";
import { sendAlertEmail } from "@/lib/mail";
import client from "@/prisma";
import { headers } from "next/headers";

const connection = new IORedis(process.env.REDIS_URL!, {
  maxRetriesPerRequest: null,
});

const worker = new Worker(
  "monitor",
  async (job) => {
    const { websiteId, url, expectedStatus = 200 } = job.data;

    if (!websiteId || !url || !expectedStatus) {
      throw new Error("Missing data");
    }

    try {
      const time = Date.now();
      const res = await axios.get(url, {
        timeout: 1000,
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
        },
      });
      const isUp = res.status === expectedStatus;

      await client.checkResult.create({
        data: {
          monitorId: websiteId,
          statusCode: res.status,
          isUp,
          responseTime: Date.now() - time,
        },
      });

      if (!isUp) {
        console.log("Website is down", url);
        // email sent

        const email = await sendAlertEmail(
          String(job.data.email),
          websiteId,
          url
        );
      }
    } catch (error) {
      await client.checkResult.create({
        data: {
          monitorId: websiteId,
          statusCode: 0,
          isUp: false,
          responseTime: 0,
        },
      });
    }
  },
  { connection, concurrency: 5 }
);
