import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  return (
    <>
      <div className="flex justify-between">
        <div className="flex gap-5 ">
          <Skeleton className="h-36 w-36 rounded-full bg-gray-200" />
          <div className="space-y-2">
            <Skeleton className="h-12 w-48 bg-gray-200" />
            <Skeleton className="h-8 w-40 bg-gray-200" />
          </div>
        </div>
        <Skeleton className="h-12 w-40 bg-gray-200" />
      </div>
      <div className="mt-10 flex flex-wrap gap-5">
        {[...Array(4)].map((_, index) => (
          <Skeleton key={index} className="h-24 w-60 bg-gray-200" />
        ))}
      </div>
      <div className="mt-10 flex flex-col gap-6">
        {[...Array(5)].map((_, index) => (
          <Skeleton key={index} className="h-52 w-full bg-gray-200" />
        ))}
      </div>
    </>
  );
};

export default Loading;
