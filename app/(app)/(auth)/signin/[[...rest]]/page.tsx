import { SignIn } from "@clerk/nextjs";
import React from "react";

const Signin = () => {
  return (
    <div className="h-screen flex bg-neutral-900 items-center justify-center ">
      <div>
        <SignIn />
      </div>
    </div>
  );
};

export default Signin;
