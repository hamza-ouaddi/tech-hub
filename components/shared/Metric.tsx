import Image from "next/image";
import Link from "next/link";
import React, { ReactElement } from "react";

interface MetricProps {
  icon?: ReactElement;
  imgUrl: string;
  alt: string;
  value: string | number;
  title: string;
  href?: string;
  textStyles: string;
  isAuthor: boolean;
}

export const Metric = ({
  icon,
  imgUrl,
  alt,
  value,
  title,
  href,
  textStyles,
  isAuthor,
}: MetricProps) => {
  const metricContent = (
    <>
      {isAuthor ? (
        <Image
          src={imgUrl}
          width={16}
          height={16}
          alt={alt}
          className="rounded-full object-contain"
        />
      ) : (
        icon
      )}

      <p className={`${textStyles} flex items-center gap-1`}>
        {value}{" "}
        <span
          className={`small-regular line-clamp-1 ${
            isAuthor ? "max-sm:hidden" : ""
          }`}
        >
          {title}
        </span>{" "}
      </p>
    </>
  );

  if (href) {
    return (
      <Link href={href} className="flex-center gap-1">
        {metricContent}
      </Link>
    );
  }

  return <div className="flex-center flex-wrap gap-1">{metricContent}</div>;
};
