import React from "react";
import ActivityList from "@/components/ui/ActivityList";
import Info from "@/components/ui/Info";
import { Separator } from "@/components/ui/separator";

const OrgActivityPage = async () => {
  return (
    <div className="w-full">
      <Info />
      <Separator className="my-2" />
      <ActivityList />
    </div>
  );
};

export default OrgActivityPage;
