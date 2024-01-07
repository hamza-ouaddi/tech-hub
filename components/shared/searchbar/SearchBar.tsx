"use client";
import { Search } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import GlobalResult from "./GlobalResult";

const SearchBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const query = searchParams.get("q");

  const [search, setSearch] = useState(query || "");
  const [isOpen, setIsOpen] = useState(false);

  const searchContainerRef = useRef(null);

  // To close search result container after search or out click
  useEffect(() => {
    const handleOutsideClick = (e: any) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target)
      ) {
        setIsOpen(false);
        setSearch("");
      }
    };

    setIsOpen(false);

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [pathname]);

  const handleInputChange = (e: any) => {
    if (!isOpen) {
      setIsOpen(true);
    }
    if (e === "" && isOpen) {
      setIsOpen(false);
    }
  };

  console.log(isOpen);

  useEffect(() => {
    // To make a delay when requestion data while typing
    const debounceSearchFn = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "global",
          value: search,
        });

        router.push(newUrl, { scroll: false });
      } else {
        if (query) {
          const newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keysToRemove: ["global", "type"],
          });

          router.push(newUrl, { scroll: false });
        }
      }
    }, 300);

    return () => clearTimeout(debounceSearchFn);
  }, [search, searchParams, pathname, router, query]);

  return (
    <div
      className="relative w-full max-w-[600px] max-lg:hidden"
      ref={searchContainerRef}
    >
      <div className="background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4">
        <Search size={24} className="text-light-500" />
        <Input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            handleInputChange(e.target.value);
          }}
          className="no-focus text-dark400_light700 paragraph-regular placeholder border-none bg-transparent shadow-none outline-none"
        />
      </div>
      {isOpen && <GlobalResult />}
    </div>
  );
};

export default SearchBar;
