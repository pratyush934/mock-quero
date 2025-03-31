import React, { Suspense } from "react";
import { RingLoader } from "react-spinners";

const LayoutDashBoard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="px-5">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-6xl font-bold gradient-title">Industry Insights</h1>
      </div>
      <Suspense
        fallback={<RingLoader className="mt-4" size={"100%"} color="gray" />}
      >
        {children}
      </Suspense>
    </div>
  );
};

export default LayoutDashBoard;
