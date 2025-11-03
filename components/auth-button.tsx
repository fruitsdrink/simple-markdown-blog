"use client";

import { signIn } from "next-auth/react";
import { Button } from "./ui/button";

export const AuthButton = () => {
  return (
    <Button variant={"outline"} onClick={() => signIn("google")}>
      Sign In
    </Button>
  );
};
