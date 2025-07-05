import { monitorQueue } from "@/lib/queue";
import client from "@/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

interface WebsiteProps {
  name: string;
  url: string;
}

export async function POST(req: NextRequest) {
  const { name, url }: WebsiteProps = await req.json();
  const user = await currentUser();

  if(!user) {
    return NextResponse.json({
      message: "Unauthorized",
    });
  }

  if (!name || !url) {
    return NextResponse.json({
      message: "Incorrect Data",
    });
  }

  try {
    const existingWebsite = await client.website.findFirst({
      where: {
        url,
        userId: user.id!,
        name
      },
    });

    if (existingWebsite) {
      return NextResponse.json({
        message: "Website already exists",
      });
    }

    const data = await client.website.create({
      data: {
        name,
        url,
        userId: user.id!,
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
      email : user.emailAddresses[0].emailAddress
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
  const user = await auth();
  try {
    const websites = await client.website.findMany({
      where: {
        userId: user.userId!,
      },
      include : {
        results : true
      }
    })

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
