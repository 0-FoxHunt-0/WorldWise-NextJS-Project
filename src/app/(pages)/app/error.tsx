"use client";

import { buttonVariants } from "@/components/ui/button";
import React from "react";

interface errorProps {
  error: Error;
  reset: () => void;
}

function error({ reset, error }: errorProps) {
  return (
    <div className="flex flex-col items-center justify-start h-screen gap-6">
      <p className="text-4xl text-slate-50">Error!</p>
      <p className="text-3xl text-slate-50">{error.message || "Oops. Something went wrong!"}</p>
      <button
        className={`${buttonVariants({ variant: "secondary" })} text-2xl`}
        onClick={reset}
      >
        Try Again
      </button>
    </div>
  );
}

export default error;
