"use client";
import { Input } from "@/components/ui/input";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface CustomInputProps {
  route: string;
  iconPosition: string;
  placeholder: string;
  additionalClasses: string;
}

const LocalSearchBar = ({
  route,
  iconPosition,
  placeholder,
  additionalClasses,
}: CustomInputProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const query = searchParams.get("q");

  const [search, setSearch] = useState(query || "");

  useEffect(() => {
    // To make a delay when requesting data while typing
    const debounceSearchFn = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "q",
          value: search,
        });

        router.push(newUrl, { scroll: false });
      } else {
        if (pathname === route) {
          const newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keysToRemove: ["q"],
          });

          router.push(newUrl, { scroll: false });
        }
      }
    }, 300);

    return () => clearTimeout(debounceSearchFn);
  }, [search, searchParams, pathname, router, route]);
  return (
    <div
      className={`background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 ${additionalClasses}`}
    >
      {iconPosition === "left" && (
        <Search size={24} className="cursor-pointer text-light-500" />
      )}

      <Input
        type="text"
        placeholder="Search for questions..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="no-focus paragraph-regular placeholder  border-none bg-transparent shadow-none outline-none"
      />

      {iconPosition === "right" && (
        <Search size={24} className="cursor-pointer text-light-500" />
      )}
    </div>
  );
};

export default LocalSearchBar;
