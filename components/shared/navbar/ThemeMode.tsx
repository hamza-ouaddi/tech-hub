"use client";

import React from "react";
import { useTheme } from "@/context/ThemeProvider";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Moon, Sun } from "lucide-react";
import { themeModes } from "@/constants";

const ThemeMode = () => {
  const { mode, setMode } = useTheme();

  return (
    <Menubar className="relative border-none bg-transparent shadow-none">
      <MenubarMenu>
        <MenubarTrigger className="focus:bg-light-900 data-[state=open]:bg-light-900 dark:focus:bg-dark-200 dark:data-[state=open]:bg-dark-200">
          {mode === "light" ? (
            <Sun size={26} className="active-theme" />
          ) : (
            <Moon size={26} className="active-theme" />
          )}
        </MenubarTrigger>
        <MenubarContent className="absolute right-[-2rem] mt-1 min-w-[120px] rounded border py-2 dark:border-dark-400 dark:bg-dark-300">
          {themeModes.map((item) => (
            <MenubarItem
              key={item.value}
              className="flex items-center gap-4 p-2 font-inter focus:bg-light-800 dark:focus:bg-dark-400"
              onClick={() => {
                setMode(item.value);
                if (item.value !== "system") {
                  localStorage.theme = item.value;
                } else {
                  localStorage.removeItem("theme");
                }
              }}
            >
              <span
                className={`${
                  mode === item.value ? "active-theme" : "text-light-500"
                }`}
              >
                {item.icon}
              </span>
              <p
                className={`body-semibold  ${
                  mode === item.value
                    ? "text-primary-500"
                    : "text-dark100_light900"
                }`}
              >
                {item.label}
              </p>
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default ThemeMode;
