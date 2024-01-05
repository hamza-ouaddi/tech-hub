import QuestionCard from "@/components/cards/QuestionCard";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import Pagination from "@/components/shared/Pagination";
import LocalSearchBar from "@/components/shared/searchbar/LocalSearchBar";
import { QuestionFilters } from "@/constants/filter";
import { getSavedQuestions } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import { auth } from "@clerk/nextjs";
import React from "react";

export default async function Home({ searchParams }: SearchParamsProps) {
  const { userId } = auth();

  if (!userId) {
    return null;
  }
  const savedQuestions = await getSavedQuestions({
    clerkId: userId,
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
  });
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Saved Questions</h1>

      <div className="mt-8 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          route="/collection"
          iconPosition="left"
          placeholder="Search for questions..."
          additionalClasses="flex-1"
        />

        <Filter
          filters={QuestionFilters}
          additionalClasses="min-h-[56px] sm:min-w-[17px]"
          containerClasses=""
        />
      </div>
      <div className="mt-10 flex w-full flex-col gap-6">
        {savedQuestions.questions.length > 0 ? (
          savedQuestions.questions.map((question: any) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResult
            title="No saved question found"
            description="It seems that you didn't save any question yet..."
            link="/ask-question"
            btnTitle="Ask a Question"
          />
        )}
      </div>
      <div className="mt-10">
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={savedQuestions.isNext}
        />
      </div>
    </>
  );
}
