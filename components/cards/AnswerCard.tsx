import { formatNumber, getDateFormat } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { Metric } from "../shared/Metric";
import { ThumbsUp } from "lucide-react";
import { SignedIn } from "@clerk/nextjs";
import EditDeleteAction from "../shared/EditDeleteAction";

interface AnswerProps {
  _id: string;
  clerkId?: string | null;
  question: {
    _id: string;
    title: string;
  };
  author: {
    _id: string;
    clerkId: string;
    name: string;
    picture: string;
  };
  upvotes: number;
  createdAt: Date;
}

const AnswerCard = ({
  _id,
  clerkId,
  question,
  author,
  upvotes,
  createdAt,
}: AnswerProps) => {
  const isAuthor = clerkId && clerkId === author.clerkId;
  return (
    <Link
      href={`/question/${question._id}/#${_id}`}
      className="card-wrapper rounded-[10px] p-9 sm:px-11"
    >
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getDateFormat(createdAt)}
          </span>
          <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
            {question.title}
          </h3>
        </div>

        <SignedIn>
          {isAuthor && (
            <EditDeleteAction type="answer" itemId={JSON.stringify(_id)} />
          )}
        </SignedIn>
      </div>

      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Metric
          imgUrl={author.picture}
          alt="User"
          value={author.name}
          title={` - Answered ${getDateFormat(createdAt)}`}
          href={`/profile/${author._id}`}
          textStyles="body-medium text-dark400_light700"
          isAuthor
        />

        <Metric
          icon={<ThumbsUp size={16} />}
          value={formatNumber(upvotes)}
          title="Votes"
          textStyles="small-medium text-dark400_light800"
          imgUrl={""}
          alt={""}
          isAuthor={false}
        />
      </div>
    </Link>
  );
};

export default AnswerCard;
