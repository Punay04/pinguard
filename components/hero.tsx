import React from "react";
import { Button } from "./ui/button";

const Hero = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center mt-0 gap-y-4">
      <div>
        <Button
          variant={"default"}
          className="text-5xl p-10 bg-blue-200 text-blue-500  font-bold"
        >
          We Watch Your Website So You Don’t Have To.
        </Button>
      </div>
      <Button className="text-2xl font-medium p-5">
        Uptime monitoring, real-time alerts, and incident tracking—done right.
      </Button>
    </div>
  );
};

export default Hero;
