import OrgControl from "@/providers/OrgControl";
import React, { ReactNode } from "react";

const OrgIdLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <OrgControl />
      {children}
    </>
  );
};

export default OrgIdLayout;
