"use client";
import { UseMobileSidebar } from "@/hooks/use-mobile-org-sidebar";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import OrgSidebar from "./OrgSidebar";

const MobileOrgSidebar = () => {
  const [isMounted, setMounted] = useState(false);

  const pathname = usePathname();

  const { isOpen, onClose, onOpen } = UseMobileSidebar();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    onClose();
  }, [onClose, pathname]);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Button
        onClick={onOpen}
        size={"icon"}
        variant={"ghost"}
        className="md:hidden mr-2"
      >
        <Menu className="w-4 h-4" />
      </Button>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side={"left"} className="p-2 pt-10 bg-white">
          <OrgSidebar storageKey="t-sidebar-mobile-state" />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default MobileOrgSidebar;
