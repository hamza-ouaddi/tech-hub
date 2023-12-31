import Link from "next/link";
import React from "react";
import { Badge } from "@/components/ui/badge";

interface Props {
  _id: string;
  name: string;
  questionNum?: number;
  showNum?: boolean;
}

const Tag = ({ _id, name, questionNum, showNum }: Props) => {
  return (
    <Link
      key={_id}
      href={`/tags/${_id}`}
      className="flex justify-between gap-2"
    >
      <Badge className="subtle-medium background-light800_dark300 text-light400_light500 rounded-md border-none px-4 py-2 uppercase">
        {name}
      </Badge>

      {showNum && (
        <p className="small-medium text-dark500_light700">{questionNum}</p>
      )}
    </Link>
  );
};

export default Tag;
