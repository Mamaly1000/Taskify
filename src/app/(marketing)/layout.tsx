import Footer from "@/components/layouts/Footer";
import Navbar from "@/components/layouts/Navbar";
import React, { ReactNode } from "react";

const MarketingLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-full bg-slate-100 dark:bg-slate-900 text-black dark:text-white">
      <Navbar />
      <main className="pt-40 pb-20 bg-inherit dark:bg-inherit">{children}</main>
      <Footer />
    </div>
  );
};

export default MarketingLayout;
