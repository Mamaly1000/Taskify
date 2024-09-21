import React, { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full max-w-full flex items-center justify-center flex-col h-full bg-slate-100 dark:bg-slate-900">
      {children}
    </div>
  );
};

export default AuthLayout;
