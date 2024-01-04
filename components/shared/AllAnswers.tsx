import React from "react";
import Filter from "./Filter";
import { AnswerFilters } from "@/constants/filter";
import { getAnswers } from "@/lib/actions/answer.action";
import Link from "next/link";
import Image from "next/image";
import { getDateFormat } from "@/lib/utils";
import HTMLParser from "./HTMLParser";
import Votes from "./Votes";

interface Props {
  questionId: string;
  userId: string;
  totalAnswers: number;
  page?: number;
  filter?: string;
}

const AllAnswers = async ({
  questionId,
  userId,
  totalAnswers,
  page,
  filter,
}: Props) => {
  const answers = await getAnswers({
    questionId,
    sortBy: filter,
  });
  return (
    <div className="mt-11">
      <div className="flex items-center justify-between">
        <h3 className="primary-text-gradient">{totalAnswers} Answers</h3>
        <Filter
          filters={AnswerFilters}
          additionalClasses=""
          containerClasses=""
        />
      </div>

      <div>
        {answers.answers.map((answer: any) => (
          <article key={answer._id} className="light-border border-b py-10">
            <div className="flex items-center justify-between">
              <div className="mb-4 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
                <Link
                  href={`profile/${answer.author.clerkId}`}
                  className="flex flex-1 items-start gap-1 sm:items-center "
                >
                  <Image
                    src={answer.author.picture}
                    width={18}
                    height={18}
                    alt="Profile Picture"
                    className="rounded-full object-cover max-sm:mt-0.5"
                  />
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center">
                    <p className="body-semibold text-dark300_light700">
                      {answer.author.name}{" "}
                    </p>

                    <p className="small-regular text-light400_light500 mt-0.5 line-clamp-1">
                      answered {getDateFormat(answer.createdAt)}
                    </p>
                  </div>
                </Link>
                <div className="flex justify-end">
                  <Votes
                    type="answer"
                    typeId={JSON.stringify(answer._id)}
                    userId={JSON.stringify(userId)}
                    upvotes={answer.upvotes.length}
                    hasUpvoted={answer.upvotes.includes(userId)}
                    downvotes={answer.downvotes.length}
                    hasDownvoted={answer.downvotes.includes(userId)}
                  />
                </div>
              </div>
            </div>
            <HTMLParser data={answer.description} />
          </article>
        ))}
      </div>
    </div>
  );
};

export default AllAnswers;
