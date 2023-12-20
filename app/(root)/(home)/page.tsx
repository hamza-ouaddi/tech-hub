import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilters from "@/components/home/HomeFilters";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import LocalSearchBar from "@/components/shared/searchbar/LocalSearchBar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filter";
import { getQuestions } from "@/lib/actions/question.action";
import Link from "next/link";

export default async function Home() {
  const results = await getQuestions({});

  console.log(results.questions);

  // const questions = [
  //   {
  //     _id: "1",
  //     title: "How to implement a responsive design?",
  //     tags: [
  //       { _id: "1", name: "html" },
  //       { _id: "2", name: "css" },
  //       { _id: "3", name: "responsive" },
  //     ],
  //     author: {
  //       _id: "1",
  //       name: "Alice Johnson",
  //       picture: "/assets/images/users/user-01.png",
  //     },
  //     upvotes: 25200,
  //     views: 214515,
  //     answers: [],
  //     createdAt: new Date("2023-12-05T14:30:00.000Z"),
  //   },
  //   {
  //     _id: "2",
  //     title: "Best practices for secure web development",
  //     tags: [
  //       { _id: "4", name: "security" },
  //       { _id: "5", name: "web development" },
  //     ],
  //     author: {
  //       _id: "2",
  //       name: "Bob Smith",
  //       picture: "/assets/images/users/user-02.png",
  //     },
  //     upvotes: 18,
  //     views: 180,
  //     answers: [],
  //     createdAt: new Date("2023-09-08T09:45:00.000Z"),
  //   },
  //   {
  //     _id: "3",
  //     title: "Getting started with React Hooks",
  //     tags: [
  //       { _id: "6", name: "react" },
  //       { _id: "7", name: "javascript" },
  //       { _id: "8", name: "hooks" },
  //     ],
  //     author: {
  //       _id: "3",
  //       name: "Charlie Brown",
  //       picture: "/assets/images/users/user-03.png",
  //     },
  //     upvotes: 30,
  //     views: 250,
  //     answers: [],
  //     createdAt: new Date("2023-09-12T18:15:00.000Z"),
  //   },
  // ];
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

      <div className="mt-10 flex w-full flex-col gap-6">
        {results.questions.length > 0 ? (
          results.questions.map((question) => (
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
            title="No question found"
            description="Be the first to spark a conversation! Ask a question and be a
          trailblazer. Your inquiry could be the catalyst for meaningful
          discussions. Join in!"
            link="/ask-question"
            btnTitle="Ask a Question"
          />
        )}
      </div>
    </>
  );
}
