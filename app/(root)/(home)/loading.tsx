import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">All Questions</h1>
      <div className="my-12 flex flex-wrap gap-5 ">
        <Skeleton className="h-14 flex-1 bg-gray-200" />
        <Skeleton className="h-14 w-28 bg-gray-200" />
      </div>

      <div className="flex gap-3">
        {[...Array(4)].map((_, index) => (
          <Skeleton key={index} className="h-12 w-28 bg-gray-200" />
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
