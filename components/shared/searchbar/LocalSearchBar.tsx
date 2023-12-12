"use client";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React from "react";

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
        value=""
        onChange={() => {}}
        className="no-focus paragraph-regular placeholder background-light800_darkgradient border-none bg-transparent shadow-none outline-none"
      />

      {iconPosition === "right" && (
        <Search size={24} className="cursor-pointer text-light-500" />
      )}
    </div>
  );
};

export default LocalSearchBar;
