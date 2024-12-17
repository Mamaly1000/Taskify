"use client";
import { useOrganization } from "@clerk/nextjs";
import React from "react";
import { Skeleton } from "./skeleton";
import Image from "next/image";
import { CreditCard } from "lucide-react";

const Info = () => {
  const { isLoaded, organization } = useOrganization();
  if (!isLoaded) {
    return <InfoSkeleton />;
  }
  return (
    <section className="flex items-center gap-x-4">
      <div className="relative w-[60px] h-[60px]">
        <Image
          fill
          src={organization?.imageUrl || ""}
          alt="org image"
          className="rounded-md object-cover"
        />
      </div>
      <div className="space-y-1">
        <p className="font-semibold text-xl">
          {organization?.name || "Organization Name"}
        </p>
        <div className="flex items-center text-xs text-muted-foreground">
          <CreditCard className="w-3 h-3 mr-1" />
          free
        </div>
      </div>
    </section>
  );
};

export default Info;

const InfoSkeleton = () => {
  return (
    <div className="flex items-center gap-x-4">
      <div className="w-[60px] h-[60px] relative">
        <Skeleton className="w-full h-full absolute" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-10 w-[200px]" />
        <div className="flex items-center">
          <Skeleton className="h-4 w-4 mr-2" />
          <Skeleton className="h-4 w-[100px] " />
        </div>
      </div>
    </div>
  );
};
