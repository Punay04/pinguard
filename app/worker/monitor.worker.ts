import { Worker } from "bullmq";
import axios from "axios";
import client from "@/prisma";
import IORedis from "ioredis";

const connection = new IORedis(process.env.REDIS_URL!);

const worker = new Worker("monitor", async (job) => {
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
} , {connection , concurrency : 5});
