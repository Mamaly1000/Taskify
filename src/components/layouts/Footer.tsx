import React from "react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 w-full p-4 border-t bg-slate-100">
      <div className="md:max-w-screen-2xl mx-auto flex items-center justify-between w-full">
        <Logo />
        <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
          <Button variant={"ghost"} size={"sm"}>
            Privacy Policy
          </Button>
          <Button variant={"ghost"} size={"sm"}>
            Terms of Service
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
