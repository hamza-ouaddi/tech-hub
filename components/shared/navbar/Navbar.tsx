import { SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ThemeMode from "./ThemeMode";
import MobileSideBar from "./MobileSideBar";
import SearchBar from "../searchbar/SearchBar";

const Navbar = () => {
  return (
    <nav className="flex-between background-light900_dark200 fixed z-50 w-full gap-5 p-6 shadow-light-300 dark:shadow-none sm:px-12">
      <Link href="/" className="flex items-center gap-3">
        <Image
          src="/assets/images/techhub-logo-icon.svg"
          width={28}
          height={28}
          alt="TechHub"
        />
        <p className="h2-semibold font-dmSans text-dark-100 dark:text-light-900 max-sm:hidden">
          Tech<span className="text-primary-500">Hub</span>
        </p>
      </Link>

      <SearchBar />

      <div className="flex-between gap-5">
        <ThemeMode />
        <SignedIn>
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "h-10 w-10",
              },
              variables: {
                colorPrimary: "#4A3AFF",
              },
            }}
          />
        </SignedIn>
        <MobileSideBar />
      </div>
    </nav>
  );
};

export default Navbar;
