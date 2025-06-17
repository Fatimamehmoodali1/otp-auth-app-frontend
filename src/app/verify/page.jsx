"use client";
import { Suspense } from "react";
import VarifyComponent from "./VarifyComponent";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-xl font-bold text-orange-600">
          Loading Verification Page...
        </div>
      }
    >
      <VarifyComponent />
    </Suspense>
  );
}