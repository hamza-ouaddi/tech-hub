"use client";
import { deleteAnswer } from "@/lib/actions/answer.action";
import { deleteQuestion } from "@/lib/actions/question.action";
import { PenSquare, Trash } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";

interface Props {
  type: string;
  itemId: string;
}

const EditDeleteAction = ({ type, itemId }: Props) => {
  const pathname = usePathname();

  const handleDelete = async () => {
    if (type === "question") {
      await deleteQuestion({
        questionId: JSON.parse(itemId),
        path: pathname,
      });
    } else if (type === "answer") {
      await deleteAnswer({
        answerId: JSON.parse(itemId),
        path: pathname,
      });
    }
  };
  return (
    <div className="flex items-center justify-end gap-3 max-sm:w-full">
      {type === "question" && (
        <PenSquare
          width={16}
          height={16}
          className="cursor-pointer text-accent-blue"
        />
      )}
      <Trash
        width={16}
        height={16}
        className="cursor-pointer text-red-600"
        onClick={handleDelete}
      />
    </div>
  );
};

export default EditDeleteAction;
