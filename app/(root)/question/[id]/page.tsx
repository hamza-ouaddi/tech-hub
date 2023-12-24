import HTMLParser from "@/components/shared/HTMLParser";
import { Metric } from "@/components/shared/Metric";
import Tag from "@/components/shared/Tag";
import { getQuestionById } from "@/lib/actions/question.action";
import { getDateFormat, formatNumber } from "@/lib/utils";
import { MessageCircle, Eye, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

// @ts-ignore
const Page = async ({ params }) => {
  const question = await getQuestionById({ questionId: params.id });
  return (
    <>
      <div className="flex-start w-full flex-col">
        <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
          <Link
            href={`/profile/${question.author.clerkId}`}
            className="flex items-center justify-start gap-2"
          >
            <Image
              src={question.author.picture}
              width={24}
              height={24}
              alt="Profile Picture"
              className="rounded-full"
            />
            <p className="paragraph-semibold text-dark300_light700">
              {question.author.name}
            </p>
          </Link>
        </div>
        <h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full text-left">
          {question.title}
        </h2>
      </div>
      <div className="mb-8 mt-5 flex flex-wrap gap-4">
        <Metric
          icon={<Clock size={16} className="text-dark400_light800" />}
          value=""
          title={`Asked ${getDateFormat(question.createdAt)}`}
          imgUrl={""}
          alt={""}
          textStyles="body-medium text-dark400_light700"
          isAuthor={false}
        />

        <Metric
          icon={<MessageCircle size={16} className="text-dark400_light800" />}
          value={formatNumber(question.answers.length)}
          title="Answers"
          textStyles="small-medium text-dark400_light800"
          imgUrl={""}
          alt={""}
          isAuthor={false}
        />

        <Metric
          icon={<Eye size={16} className="text-dark400_light800" />}
          value={formatNumber(question.views)}
          title="Views"
          textStyles="small-medium text-dark400_light800"
          imgUrl={""}
          alt={""}
          isAuthor={false}
        />
      </div>
      <HTMLParser data={question.description} />

      <div className="mt-8 flex flex-wrap gap-2">
        {question.tags.map((tag: any) => (
          <Tag key={tag._id} _id={tag._id} name={tag.name} />
        ))}
      </div>
    </>
  );
};

export default Page;
