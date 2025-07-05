import cron from "node-cron";
import client from "@/prisma";
import { monitorQueue } from "@/lib/queue";

cron.schedule("*/5 * * * * *", async () => {
  const websites = await client.website.findMany({
    where: { isPaused: false },
  });
  console.log("⏰ Scheduler running at", new Date().toLocaleTimeString());

  console.log("🌐 Fetched websites:", websites.length);

  for (const site of websites) {
    const lastResult = await client.checkResult.findFirst({
      where: { monitorId: site.id },
      orderBy: { createdAt: "desc" },
    });

    const now = Date.now();
    const lastPing = lastResult?.createdAt?.getTime() || 0;
    const intervalMs = 5 * 1000;

    if (now - lastPing >= intervalMs) {
      console.log("✅ Passed interval check for:", site.url);
      try {
        await monitorQueue.add("monitor", {
          email: "",
          websiteId: site.id,
          url: site.url,
        });
        console.log("📤 Job added for:", site.url);
      } catch (err) {
        console.error("❌ Failed to enqueue job for:", site.url, err);
      }
    }
  }
});
