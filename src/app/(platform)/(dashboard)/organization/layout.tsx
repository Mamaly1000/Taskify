import OrgSidebar from "@/components/layouts/OrgSidebar";
import React, { ReactNode } from "react";

const Dashboard_Organization_Layout = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <section className="pt-20 px-4 max-w-6xl md:pt-24 2xl:max-w-screen-xl mx-auto">
      <div className="flex gap-x-7">
        <div className="w-64 shrink-0 hidden md:block">
          <OrgSidebar />
        </div>
        {children}
      </div>
    </section>
  );
};

export default Dashboard_Organization_Layout;
