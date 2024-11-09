import React from "react";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import MobileOrgSidebar from "./MobileOrgSidebar";
import FormPopover from "../form/FormPopover";

const DashboardNavbar = () => {
  return (
    <nav className="fixed z-50 top-0 w-full h-14 border-b shadow-sm bg-white flex items-center px-4">
      <MobileOrgSidebar />
      <div className="flex items-center gap-x-4">
        <div className="hidden md:flex ">
          <Logo />
        </div>
        <FormPopover align="start" side="bottom" sideOffset={5}>
          <Button
            variant={"primary"}
            size={"sm"}
            className="rounded-sm hidden md:block h-auto py-1.5 px-2"
          >
            Create
          </Button>
        </FormPopover>
        <FormPopover align="start" side="bottom" sideOffset={5}>
          <Button
            variant={"primary"}
            size={"icon"}
            className="md:hidden rounded-sm"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </FormPopover>
      </div>
      <div className="ml-auto flex gap-x-2 items-center">
        <OrganizationSwitcher
          hidePersonal
          afterSelectOrganizationUrl={"/organization/:id"}
          afterCreateOrganizationUrl={"/organization/:id"}
          afterLeaveOrganizationUrl={"/select-org"}
          appearance={{
            elements: {
              rootBox: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              },
            },
          }}
        />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              userButtonAvatarBox: {
                height: 30,
                width: 30,
              },
            },
          }}
        />
      </div>
    </nav>
  );
};

export default DashboardNavbar;
