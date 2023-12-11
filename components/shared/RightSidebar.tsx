import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import Tag from "./Tag";

const RightSidebar = () => {
  const topQuestions = [
    {
      _id: 1,
      title: "How does RESTful API differ from GraphQL?",
    },
    {
      _id: 2,
      title:
        "What is the difference between machine learning and deep learning?",
    },
    {
      _id: 3,
      title:
        "Explain the difference between front-end and back-end development.",
    },
    {
      _id: 4,
      title: "The purpose of a firewall in network security.",
    },
    {
      _id: 5,
      title:
        "Evaluate how continuous integration/continuous deployment (CI/CD) improves software development.",
    },
  ];

  const popularTags = [
    { _id: 1, name: "javascript", questionNum: 10 },
    { _id: 2, name: "progamming", questionNum: 8 },
    { _id: 3, name: "database", questionNum: 6 },
    { _id: 4, name: "webdev", questionNum: 6 },
    { _id: 5, name: "python", questionNum: 5 },
    { _id: 6, name: "next.js", questionNum: 4 },
  ];

  return (
    <section className="background-light900_dark200 light-border custom-scrollbar sticky right-0 top-0 flex h-screen flex-col overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden lg:w-[350px]">
      <div>
        <h3 className="h3-bold text-dark200_light900">Top Questions</h3>
        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {topQuestions.map((question) => (
            <Link
              key={question._id}
              href={`/question/${question._id}`}
              className="flex cursor-pointer items-center justify-between gap-7"
            >
              <p className="body-medium text-dark500_light700">
                {question.title}
              </p>
              <div>
                <ChevronRight className="text-dark500_light700" size={18} />
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-16">
        <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>
        <div className="mt-7 flex w-full flex-col gap-4">
          {popularTags.map((tag) => (
            <Tag
              key={tag._id}
              _id={tag._id}
              name={tag.name}
              questionNum={tag.questionNum}
              showNum
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightSidebar;
