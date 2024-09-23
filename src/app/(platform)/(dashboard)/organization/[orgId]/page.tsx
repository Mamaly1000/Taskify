import { currentUser, Organization } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const OrganizationPage = async ({ params }: { params: { orgId: string } }) => {
  const user = await currentUser();
  if (!!!user) {
    return redirect("/sign-in");
  }
  return (
    <div className="max-w-full overflow-hidden text-wrap">
      {JSON.stringify(user)}
    </div>
  );
};

export default OrganizationPage;
