import QuestionCard from "@/components/cards/QuestionCard";
import NoResult from "@/components/shared/NoResult";
import LocalSearchBar from "@/components/shared/searchbar/LocalSearchBar";
import { getQuestionByTagId } from "@/lib/actions/tag.action";
import { URLProps } from "@/types";
import React from "react";

const Page = async ({ params, searchParams }: URLProps) => {
  const questions = await getQuestionByTagId({
    tagId: params.id,
    searchQuery: searchParams.q,
  });
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">{questions.tagTitle}</h1>

      <div className="mt-8 w-full">
        <LocalSearchBar
          route={`/tags/${params.id}`}
          iconPosition="left"
          placeholder="Search for questions by tags..."
          additionalClasses="flex-1"
        />
      </div>
      <div className="mt-10 flex w-full flex-col gap-6">
        {questions.questions.length > 0 ? (
          questions.questions.map((question: any) => (
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
            title="No questions found"
            description="It seems that there is no questions for this tag..."
            link="/ask-question"
            btnTitle="Ask a Question"
          />
        )}
      </div>
    </>
  );
};

export default Page;
