"use client";
import React from "react";

import Link from "next/link";
import { useLocalStorage } from "usehooks-ts";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { Accordion } from "../ui/accordion";
import NavItem from "../ui/NavItem";
import { OrganizationResource } from "@/types";
import NavItemSkeleton from "../ui/NavItemSkeleton";

interface props {
  storageKey?: string;
}

const OrgSidebar = ({ storageKey = "t-sidebar-state" }: props) => {
  const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(
    storageKey,
    {}
  );
  const { organization: activeOrganization, isLoaded: isLoadedOrg } =
    useOrganization();
  const { userMemberships, isLoaded: isLoadedOrgList } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });

  const defaultAccValue: string[] = Object.keys(expanded).reduce(
    (acc: string[], key: string) => {
      if (expanded[key]) {
        acc.push(key);
      }
      return acc;
    },
    []
  );

  const onExpand = (id: string) => {
    setExpanded((currentValue) => ({
      ...currentValue,
      [id]: !expanded[id],
    }));
  };

  if (!isLoadedOrg || !isLoadedOrgList || userMemberships.isLoading) {
    return (
      <>
        <div className="flex items-center justify-between mb-2">
          <Skeleton className="h-10 w-[50%] " />
          <Skeleton className="h-10 w-10" />
        </div>
        <div className="space-y-2">
          <NavItemSkeleton />
          <NavItemSkeleton />
          <NavItemSkeleton />
          <NavItemSkeleton />
          <NavItemSkeleton />
          <NavItemSkeleton />
          <NavItemSkeleton />
        </div>
      </>
    );
  }

  return (
    <>
      <section className="font-medium text-xs flex items-center mb-1 ">
        <span className="pl-4">Workspaces</span>
        <Button
          asChild
          type="button"
          size={"icon"}
          variant={"ghost"}
          className="ml-auto"
        >
          <Link href={"/select-org"}>
            <Plus className="w-4 h-4" />
          </Link>
        </Button>
      </section>
      <Accordion
        type="multiple"
        defaultValue={defaultAccValue}
        className="space-y-2"
      >
        {userMemberships.data?.map(({ organization }) => (
          <NavItem
            key={organization.id}
            isActive={activeOrganization?.id === organization.id}
            isExpanded={expanded[organization.id]}
            org={organization as OrganizationResource}
            onExpand={onExpand}
          />
        ))}
      </Accordion>
    </>
  );
};

export default OrgSidebar;
