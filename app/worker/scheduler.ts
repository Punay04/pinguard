// workers/scheduler.ts
import cron from "node-cron";
import client from "@/prisma";
import { monitorQueue } from "@/lib/queue";

cron.schedule("*/5 * * * * *", async () => {
  const websites = await client.website.findMany({
    where: { isPaused: false },
  });

  for (const site of websites) {
    const lastResult = await client.checkResult.findFirst({
      where: { monitorId: site.id },
      orderBy: { createdAt: "desc" },
    });

    const now = Date.now();
    const lastPing = lastResult?.createdAt?.getTime() || 0;
    const intervalMs = site.checkInterval * 1000;

    if (now - lastPing >= intervalMs) {
      await monitorQueue.add("ping", {
        websiteId: site.id,
        url: site.url,
      });
    }
  }
});
