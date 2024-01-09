import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  return (
    <>
      <Skeleton className="h-14 w-40 " />
      <div className="my-12 flex flex-wrap gap-5 ">
        <Skeleton className="h-14 flex-1 " />
        <Skeleton className="h-14 w-28 " />
      </div>

      <div className="mt-10 flex flex-col gap-6">
        {[...Array(5)].map((_, index) => (
          <Skeleton key={index} className="h-52 w-full " />
        ))}
      </div>
    </>
  );
};

export default Loading;
