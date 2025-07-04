import { Worker } from "bullmq";
import axios from "axios";
import IORedis from "ioredis";
import { sendAlertEmail } from "@/lib/mail";
import { currentUser } from "@clerk/nextjs/server";
import client from "@/prisma";

const connection = new IORedis(process.env.REDIS_URL!);

const user = await currentUser();

const worker = new Worker(
  "monitor",
  async (job) => {
    const { websiteId, url, expectedStatus = 200 } = job.data;

    if (!websiteId || !url || !expectedStatus) {
      throw new Error("Missing data");
    }

    try {
      const time = Date.now();
      const res = await axios.get(url, { timeout: 1000 });
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
          String(user?.emailAddresses),
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
