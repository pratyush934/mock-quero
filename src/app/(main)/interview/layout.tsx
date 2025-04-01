import React, { Suspense } from "react";
import { BarLoader } from "react-spinners";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="px-5">
      <Suspense
        fallback={<BarLoader color="gray" className="mt-4" width={"100%"} />}
      >
        {children}
      </Suspense>
    </div>
  );
};

export default Layout;
