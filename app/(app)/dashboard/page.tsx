"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import axios from "axios";
import { DeleteIcon, LoaderIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [websites, setWebsites] = useState<any>([]);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/addWebsite");
        const data = await response.data;
        console.log(data.websites);
        setWebsites(data.websites);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
    setLoading(false);
  }, []);

  function handleSubmit(websiteId: string) {
    const confirmDelete = confirm(
      "Are you sure you want to delete this website?"
    );
    if (confirmDelete) {
      axios
        .delete(`/api/addWebsite`, { data: { websiteId } })
        .then(() => {
          setWebsites((prevWebsites: any) =>
            prevWebsites.filter((website: any) => website.id !== websiteId)
          );
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <main className="h-screen w-full bg-blue-50 p-12 overflow-y-auto">
        <div className="p-4 bg-blue-200 rounded-md border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)]">
          <h1 className="text-4xl font-extrabold tracking-tight text-black">
            Dashboard
          </h1>
        </div>

        {loading && (
          <div className="flex justify-center items-center mt-15">
            <LoaderIcon size={80} />
          </div>
        )}

        <div className="mt-6 space-y-4">
          {websites.map((website: any) => (
            <div
              key={website.id}
              className="bg-white border-4 border-black rounded-md p-5 shadow-[4px_4px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row justify-between items-center gap-4"
            >
              <div>
                <Link
                  href={`/dashboard/website/${website.id}`}
                  className="text-2xl font-bold text-black hover:underline cursor-pointer"
                >
                  {website.name}
                </Link>
                <p className="text-black text-sm">{website.url}</p>
              </div>

              <div className="flex flex-row gap-4">
                <Button
                  className={cn(
                    "font-bold text-base border-2 border-black shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-transform",
                    website.results[0]?.isUp
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  )}
                >
                  {website.results[0]?.isUp ? "Active" : "Inactive"}
                </Button>

                <Button
                  className="font-bold text-base bg-blue-500 text-white border-2 border-black shadow-[2px_2px_0px_rgba(255,255,255,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-transform"
                  onClick={() => router.push(website.url)}
                >
                  Visit
                </Button>
                <Button
                  onClick={() => handleSubmit(website.id)}
                  className="bg-red-500"
                >
                  <TrashIcon size={20} className="text-white font-bold" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Page;
