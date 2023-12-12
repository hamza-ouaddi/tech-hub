import HomeFilters from "@/components/home/HomeFilters";
import Filter from "@/components/shared/Filter";
import LocalSearchBar from "@/components/shared/searchbar/LocalSearchBar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filter";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask a Question
          </Button>
        </Link>
      </div>
      <div className="mt-8 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          route="/"
          iconPosition="left"
          placeholder="Search for questions..."
          additionalClasses="flex-1"
        />

        <Filter
          filters={HomePageFilters}
          additionalClasses="min-h-[56px] sm:min-w-[17px]"
          containerClasses="hidden max-md:flex"
        />
      </div>
      <HomeFilters />
    </>
  );
}
