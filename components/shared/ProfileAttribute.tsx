import Link from "next/link";
import { ReactElement } from "react";

interface ProfileAttributeProps {
  icon: ReactElement;
  url?: string;
  title: string;
}

const ProfileAttribute = ({ icon, url, title }: ProfileAttributeProps) => {
  return (
    <div className="flex justify-center gap-1">
      {icon}
      {url ? (
        <Link
          href={url}
          target="_blank"
          className="paragraph-medium text-blue-500"
        >
          {title}
        </Link>
      ) : (
        <p className="paragraph-medium text-dark400_light700">{title}</p>
      )}
    </div>
  );
};

export default ProfileAttribute;
