import React, { ReactNode } from "react";
import DashboardNavbar from "@/components/layouts/DashboardNavbar";
const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-full max-w-full">
      <DashboardNavbar />
      {children}
    </div>
  );
};

export default DashboardLayout;
