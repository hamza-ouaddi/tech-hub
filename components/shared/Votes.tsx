"use client";
import { downvoteAnswer, upvoteAnswer } from "@/lib/actions/answer.action";
import {
  downvoteQuestion,
  upvoteQuestion,
} from "@/lib/actions/question.action";
import { formatNumber } from "@/lib/utils";
import { usePathname } from "next/navigation";
import React from "react";
import {
  PiArrowFatDownFill,
  PiArrowFatUpFill,
  PiBookmarkSimpleFill,
  PiBookmarkSimpleBold,
  PiArrowFatDownBold,
  PiArrowFatUpBold,
} from "react-icons/pi";

interface Props {
  type: string;
  typeId: string;
  userId: string;
  upvotes: number;
  hasUpvoted: boolean;
  downvotes: number;
  hasDownvoted: boolean;
  hasSaved?: boolean;
}

const Votes = ({
  type,
  typeId,
  userId,
  upvotes,
  hasUpvoted,
  downvotes,
  hasDownvoted,
  hasSaved,
}: Props) => {
  const pathname = usePathname();

  const handleVote = async (action: string) => {
    if (!userId) {
      return;
    }

    if (action === "upvote") {
      if (type === "question") {
        await upvoteQuestion({
          questionId: JSON.parse(typeId),
          userId: JSON.parse(userId),
          hasUpvoted,
          hasDownvoted,
          path: pathname,
        });
      } else if (type === "answer") {
        await upvoteAnswer({
          answerId: JSON.parse(typeId),
          userId: JSON.parse(userId),
          hasUpvoted,
          hasDownvoted,
          path: pathname,
        });
      }
    }

    if (action === "downvote") {
      if (type === "question") {
        await downvoteQuestion({
          questionId: JSON.parse(typeId),
          userId: JSON.parse(userId),
          hasUpvoted,
          hasDownvoted,
          path: pathname,
        });
      } else if (type === "answer") {
        await downvoteAnswer({
          answerId: JSON.parse(typeId),
          userId: JSON.parse(userId),
          hasUpvoted,
          hasDownvoted,
          path: pathname,
        });
      }
    }
  };

  return (
    <div className="flex gap-5">
      <div className="flex-center gap-2.5">
        <div className="flex-center gap-1.5">
          {hasUpvoted ? (
            <PiArrowFatUpFill
              size={18}
              className="cursor-pointer text-green-400"
              onClick={() => handleVote("upvote")}
            />
          ) : (
            <PiArrowFatUpBold
              size={18}
              className="cursor-pointer text-slate-500"
              onClick={() => handleVote("upvote")}
            />
          )}

          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <p className="subtle-medium text-dark400_light900">
              {formatNumber(upvotes)}
            </p>
          </div>
        </div>
        <div className="flex-center gap-1.5">
          {hasDownvoted ? (
            <PiArrowFatDownFill
              size={18}
              className="cursor-pointer text-red-400"
              onClick={() => handleVote("downvote")}
            />
          ) : (
            <PiArrowFatDownBold
              size={18}
              className="cursor-pointer text-slate-500"
              onClick={() => handleVote("downvote")}
            />
          )}

          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <p className="subtle-medium text-dark400_light900">
              {formatNumber(downvotes)}
            </p>
          </div>
        </div>
      </div>
      {type === "question" &&
        (hasSaved ? (
          <PiBookmarkSimpleFill
            size={20}
            className="cursor-pointer text-primary-500"
          />
        ) : (
          <PiBookmarkSimpleBold
            size={20}
            className="cursor-pointer text-primary-500"
          />
        ))}
    </div>
  );
};

export default Votes;
