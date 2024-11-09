import { XCircle } from "lucide-react";
import React from "react";

const Error = ({ error }: { error: string }) => {
  return (
    <div
      key={error}
      className="flex items-center justify-start capitalize gap-2 font-medium p-2 border border-rose-500 bg-rose-500/10 rounded-sm"
    >
      <XCircle className="w-4 h-4" /> {error}
    </div>
  );
};

export default Error;
