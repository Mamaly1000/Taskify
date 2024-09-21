import React, { ReactNode } from "react";

const MarketingLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-full bg-slate-100 dark:bg-slate-900 text-black dark:text-white">
      <main className="pt-40 pb-20 bg-inherit dark:bg-inherit">{children}</main>
    </div>
  );
};

export default MarketingLayout;
