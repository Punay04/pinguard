import { SignUp } from "@clerk/nextjs";
import React from "react";

const Signup = () => {
  return (
    <div className="h-screen flex bg-neutral-900 items-center justify-center ">
      <div>
        <SignUp />
      </div>
    </div>
  );
};

export default Signup;
