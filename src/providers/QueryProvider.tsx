"use client";
import React, { ReactNode, useState } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const QueryProvider = ({ children }: { children: ReactNode }) => {
  const [queryclient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryclient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
