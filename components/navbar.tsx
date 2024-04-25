"use client";

import React, { useState, useEffect } from "react";
import ErrorHandler from "./ui/error-handler";
import Logo from "./logo";
import { Input } from "./input";
import { Button } from "./ui/button";
import { PenLine } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarImage } from "./ui/avatar";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Navbar() {
  useEffect(() => {
    const auth = localStorage.getItem("auth");
    if (auth !== null) {
      const authData = JSON.parse(auth);
      setIsAuthenticated(authData["isAuthenticated"]);
    }
  }, []);

  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [isError, setIsError] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleClick = () => {};

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onSearch = () => {
    router.push(`/search/${inputValue}`);
  };

  const logoutHandler = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/user/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      if (response.status == 200) {
        const authData = {
          isAuthenticated: false,
          userDetails: {},
        };
        if (typeof window !== "undefined") {
          localStorage.setItem("auth", JSON.stringify(authData));
        }
        setIsAuthenticated(false);
        router.push("/");
      }
    } catch (e) {
      setIsError(true);
    }
  };

  return (
    <>
      <ErrorHandler isError={isError} />
      <div className="flex flex-col items-center">
        <div className="flex h-20 w-full items-center justify-center">
          <div className="flex w-full max-w-[1440px] items-center justify-between px-8">
            <div className="flex gap-8">
              <Logo />
              <Input
                className="hidden py-2 md:flex"
                type="text"
                placeholder="Search here"
                name="search"
                isSearch
                onSearch={onSearch}
                onChange={onSearchChange}
              />
            </div>
            <div className="flex gap-4">
              <Link href={"/editor"}>
                <Button
                  variant={"outline"}
                  className="flex gap-2 rounded bg-transparent text-sm text-slate-500 hover:border-blue-500 hover:bg-transparent hover:text-blue-500"
                  onClick={handleClick}
                >
                  <PenLine size={16} />
                  Write
                </Button>
              </Link>

              {!isAuthenticated ? (
                <Button
                  className="flex gap-2 rounded bg-blue-500 text-sm text-white hover:border-blue-600 hover:bg-blue-600"
                  asChild
                >
                  <Link href={"/sign-in"}>Sign In</Link>
                </Button>
              ) : (
                <>
                  <Link href={"/profile"}>
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                    </Avatar>
                  </Link>
                  <Button
                    className="flex gap-2 rounded bg-blue-500 text-sm text-white hover:border-blue-600 hover:bg-blue-600"
                    // asChild
                    onClick={logoutHandler}
                  >
                    Sign Out
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
        <Input
          className="flex w-full py-2 md:hidden"
          type="text"
          placeholder="Search here"
          name="search"
          isSearch
          onSearch={onSearch}
          onChange={onSearchChange}
        />
      </div>
    </>
  );
}
