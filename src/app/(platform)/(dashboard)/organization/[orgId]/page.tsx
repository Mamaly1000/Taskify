import { db } from "@/lib/db";
import React from "react";

const OrganizationPage = async ({ params }: { params: { orgId: string } }) => {
  return (
    <div className="max-w-full text-wrap flex flex-col space-y-4 min-w-full md:min-w-fit">
      <h1 className="text-lg capitalize">organization page</h1>
    </div>
  );
};

export default OrganizationPage;
