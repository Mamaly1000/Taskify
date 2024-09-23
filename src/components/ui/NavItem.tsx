"use client";
import React from "react";
import { OrganizationResource } from "@/types";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Activity, CreditCard, Layout, Settings } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./button";

interface props {
  isActive: boolean;
  isExpanded: boolean;
  org: OrganizationResource;
  onExpand: (id: string) => void;
}

const NavItem = ({ isActive, isExpanded, onExpand, org }: props) => {
  const router = useRouter();
  const pathname = usePathname();

  const routes = [
    {
      label: "Boards",
      icon: Layout,
      href: `/organization/${org.id}`,
    },
    {
      label: "Activity",
      icon: Activity,
      href: `/organization/${org.id}/activity`,
    },
    {
      label: "Settings",
      icon: Settings,
      href: `/organization/${org.id}/settings`,
    },
    {
      label: "Billing",
      icon: CreditCard,
      href: `/organization/${org.id}/billing`,
    },
  ];

  const onClick = (href: string) => {
    router.push(href);
  };

  return (
    <AccordionItem value={org.id} className="border-none">
      <AccordionTrigger
        onClick={() => onExpand(org.id)}
        className={cn(
          `flex items-center gap-x-2 p-1.5 text-neutral-700 rounded-md hover:bg-neutral-500/10 transition text-start no-underline hover:no-underline`,
          isActive && !isExpanded && "bg-sky-500/10 text-sky-700"
        )}
      >
        <div className="flex items-center gap-x-2 ">
          <div className="w-7 h-7 relative">
            <Image
              loading="lazy"
              blurDataURL={org.imageUrl}
              fill
              src={org.imageUrl}
              alt={org.name}
              className="rounded-sm object-cover"
            />
          </div>
          <span className="font-medium text-sm capitalize text-start">
            {org.name}
          </span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pt-1 text-neutral-700">
        {routes.map((route) => (
          <Button
            onClick={() => onClick(route.href)}
            size={"sm"}
            key={route.href}
            className={cn(
              "w-full font-normal justify-start pl-10 mb-1",
              pathname === route.href && "bg-sky-500/10 text-sky-700 "
            )}
            variant={"ghost"}
          >
            <route.icon className="h-4 w-4 mr-2" />
            {route.label}
          </Button>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};

export default NavItem;
