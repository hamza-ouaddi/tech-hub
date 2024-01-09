import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">All Users</h1>
      <div className="my-12 flex flex-wrap gap-5 ">
        <Skeleton className="h-14 flex-1 bg-gray-200" />
        <Skeleton className="h-14 w-28 bg-gray-200" />
      </div>

      <div className="flex flex-wrap gap-4">
        {[...Array(8)].map((_, index) => (
          <Skeleton key={index} className="h-60 w-[32%] bg-gray-200" />
        ))}
      </div>
    </>
  );
};

export default Loading;
