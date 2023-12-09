import { Search } from "lucide-react";
import React from "react";
import { Input } from "@/components/ui/input";

const SearchBar = () => {
  return (
    <div className="relative w-full max-w-[600px] max-lg:hidden">
      <div className="background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4">
        <Search size={24} className="text-light-500" />
        <Input
          type="text"
          placeholder="Search"
          value=""
          className="no-focus paragraph-regular placeholder border-none bg-transparent shadow-none outline-none"
        />
      </div>
    </div>
  );
};

export default SearchBar;
