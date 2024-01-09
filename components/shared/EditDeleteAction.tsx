"use client";
import { deleteAnswer } from "@/lib/actions/answer.action";
import { deleteQuestion } from "@/lib/actions/question.action";
import { PenSquare, Trash } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { toast } from "../ui/use-toast";

interface Props {
  type: string;
  itemId: string;
}

const EditDeleteAction = ({ type, itemId }: Props) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleEdit = async () => {
    router.push(`/question/edit/${JSON.parse(itemId)}`);
  };

  const handleDelete = async () => {
    if (type === "question") {
      await deleteQuestion({
        questionId: JSON.parse(itemId),
        path: pathname,
      });

      toast({
        title: "Question has been deleted successfully.",
      });
    } else if (type === "answer") {
      await deleteAnswer({
        answerId: JSON.parse(itemId),
        path: pathname,
      });

      toast({
        title: "Answer has been deleted successfully.",
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
          onClick={handleEdit}
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
