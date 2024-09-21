import React from "react";

import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 w-full h-14 px-4 border-b shadow-sm bg-white flex items-center">
      <div className="md:max-w-screen-2xl mx-auto flex items-center justify-between w-full">
        <Logo />
        <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
          <Button asChild variant={"outline"} size={"sm"}>
            <Link href={"/sign-in"}>Login</Link>
          </Button>
          <Button asChild size={"sm"}>
            <Link href={"/sign-up"}>get Taskify for free</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
