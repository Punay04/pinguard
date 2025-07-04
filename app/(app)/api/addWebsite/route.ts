import { monitorQueue } from "@/lib/queue";
import client from "@/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

interface WebsiteProps {
  name: string;
  url: string;
}

const user = await auth();

export async function POST(req: NextRequest) {
  const { name, url }: WebsiteProps = await req.json();

  if (!name || !url) {
    return NextResponse.json({
      message: "Incorrect Data",
    });
  }

  try {
    const data = await client.website.create({
      data: {
        name,
        url,
        userId: user.userId!,
      },
    });

    if (!data) {
      return NextResponse.json({
        message: "Something went wrong",
      });
    }

    await monitorQueue.add("ping", {
      websiteId: data.id,
      url: data.url,
      expectedStatus: 200,
    });

    return NextResponse.json({
      message: "Website added successfully",
      data,
    });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({
      message: "Something went wrong",
      error,
    });
  }
}

export async function GET() {
  try {
    const websites = await client.website.findMany({
      where: {
        userId: user.userId!,
      },
    });

    return NextResponse.json({
      message: "Websites fetched successfully",
      websites,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Something went wrong",
      error,
    });
  }
}
