import { formatNumber } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface StatsBadeCardProps {
  imgUrl: string;
  number: number;
  title: string;
}

const StatsBadgeCard = ({ imgUrl, number, title }: StatsBadeCardProps) => {
  return (
    <div className="light-border background-light900_dark300 flex flex-wrap items-center justify-evenly gap-4 rounded-md border p-6 shadow-light-300 dark:shadow-light-200">
      <Image src={imgUrl} alt={title} width={50} height={50} />
      <div>
        <p className="paragraph-semibold text-dark200_light900">{number}</p>
        <p className="body-medium text-dark400_light700">{title}</p>
      </div>
    </div>
  );
};

interface StatsProps {
  totalQuestions: number;
  totalAnswers: number;
}

const Stats = ({ totalAnswers, totalQuestions }: StatsProps) => {
  return (
    <div className="mt-10">
      <h4 className="h3-semibold text-dark200_light900"> Stats</h4>

      <div className="mt-5 grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-4">
        <div className="light-border background-light900_dark300 flex flex-wrap items-center justify-evenly gap-4 rounded-md border p-6 shadow-light-300 dark:shadow-light-200">
          <div>
            <p className="paragraph-semibold text-dark200_light900">
              {formatNumber(totalQuestions)}
            </p>
            <p className="body-medium text-dark400_light700">Questions</p>
          </div>
          <div>
            <p className="paragraph-semibold text-dark200_light900">
              {formatNumber(totalAnswers)}
            </p>
            <p className="body-medium text-dark400_light700">Answers</p>
          </div>
        </div>

        <StatsBadgeCard
          imgUrl="../assets/images/gold-badge.svg"
          number={0}
          title="Gold Badges"
        />

        <StatsBadgeCard
          imgUrl="../assets/images/silver-badge.svg"
          number={0}
          title="Silver Badges"
        />

        <StatsBadgeCard
          imgUrl="../assets/images/bronze-badge.svg"
          number={0}
          title="Bronze Badges"
        />
      </div>
    </div>
  );
};

export default Stats;
