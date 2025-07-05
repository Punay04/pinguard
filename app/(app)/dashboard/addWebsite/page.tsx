"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRef } from "react";

export default function UsernameForm() {
  const inputRef1 = useRef<HTMLInputElement>(null);
  const inputRef2 = useRef<HTMLInputElement>(null);

  const handleSumbit = async () => {
    const name = inputRef1.current?.value.trim() || "";
    const url = inputRef2.current?.value.trim() || "";

    if (!name || !url) {
      console.log("Missing data");
      return;
    }

    const response = await axios.post("/api/addWebsite", {
      name,
      url,
    });

    if (!response) {
      console.log(response);
      alert("Something went wrong");
      return;
    }

    inputRef1.current!.value = "";
    inputRef2.current!.value = "";

    alert("Website added successfully");
  };

  return (
    <main className="h-screen w-full bg-blue-50 p-12 overflow-y-auto">
      <div className="p-4 bg-blue-200 rounded-md border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] w-full max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold tracking-tight text-black">
          Add Website
        </h1>
      </div>

      <div className="p-6 mt-6 bg-white rounded-md border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] w-full max-w-3xl mx-auto flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-lg font-bold uppercase text-black">
            Website Name
          </label>
          <input
            type="text"
            className="p-3 bg-blue-100 rounded-md border-2 border-black focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Enter website name"
            ref={inputRef1}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-lg font-bold uppercase text-black">URL</label>
          <input
            type="text"
            className="p-3 bg-blue-100 rounded-md border-2 border-black focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Enter website URL"
            ref={inputRef2}
          />
        </div>

        <div className="mt-4">
          <Button
            onClick={handleSumbit}
            className="w-full bg-blue-700 text-white border-2 border-black rounded-md shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-transform"
          >
            Submit
          </Button>
        </div>
      </div>
    </main>
  );
}
