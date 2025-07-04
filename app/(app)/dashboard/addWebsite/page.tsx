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

      return;
    }

    const data = response.data;

    console.log(data);
  };

  return (
    <div className="p-18">
      <div className="p-4 bg-blue-50 rounded-md">
        <h1 className="text-4xl font-bold">Add Website...</h1>
      </div>
      <div className="p-5 h-min-[40%] bg-blue-50 rounded-md mt-4 flex flex-col gap-2">
        <div className="flex flex-col">
          <label className="text-xl" htmlFor="">
            Website Name :
          </label>
          <input
            type="text"
            className="p-3 bg-white rounded-md "
            placeholder="Enter website name"
            ref={inputRef1}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-xl" htmlFor="">
            URL :
          </label>
          <input
            className="p-3 bg-white rounded-md "
            type="text"
            placeholder="Enter website url"
            ref={inputRef2}
          />
        </div>
        <div className="mt-3">
          <Button onClick={handleSumbit}>Submit</Button>
        </div>
      </div>
    </div>
  );
}
