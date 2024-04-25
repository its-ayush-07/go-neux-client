import React from "react";
import Image from "next/image";
import moment from "moment";
import { Button } from "./ui/button";
import { ArrowRight, ChevronRight, TrendingUp } from "lucide-react";
import Link from "next/link";

interface TrendingSectionProps {
  data: {
    ID: string;
    Title: string;
    CreatedAt: string;
    Image: string;
  }[];
}

const TrendingSection = ({ data }: TrendingSectionProps) => {
  return (
    <div className="flex w-full flex-col gap-4">
      {/* Heading */}
      <h1 className="font-oswald text-3xl font-medium uppercase text-slate-950">
        Trending
      </h1>
      {/* Articles */}
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-4">
        {data.map((article) => (
          <div
            key={article.ID}
            className="group relative flex h-full w-full gap-3 overflow-hidden rounded border border-slate-200 bg-white p-2 md:first:col-span-2 md:first:row-span-4 md:first:p-0"
          >
            <div className="relative flex-[3] overflow-hidden rounded">
              <Image
                src={article.Image ? article.Image : ""}
                alt="Article Cover Image"
                style={{ objectFit: "cover" }}
                fill
                priority
              />
            </div>
            <div className="bottom-0 flex w-full flex-[4] flex-col justify-between gap-4 rounded from-black to-transparent md:group-first:absolute md:group-first:flex-row md:group-first:items-end md:group-first:gap-10 md:group-first:bg-gradient-to-t md:group-first:p-8">
              <div className="flex flex-col gap-2 md:group-first:flex-col-reverse">
                <p className="line-clamp-2 font-oswald font-medium uppercase md:group-first:text-3xl md:group-first:text-white">
                  {article.Title}
                </p>
                <p className="flex items-center gap-4 text-[10px] font-semibold capitalize text-slate-500 md:group-first:text-[12px] md:group-first:text-white">
                  <span className="hidden gap-2 rounded-full bg-blue-500 p-2 px-4 md:group-first:flex">
                    <TrendingUp size={16} />
                    Trending
                  </span>
                  {moment(article.CreatedAt).fromNow()}
                </p>
              </div>
              <Link href={`/article/${article.ID}`}>
                <Button
                  variant={"outline"}
                  className="flex h-fit w-fit gap-4 border-2 p-2 text-slate-500 hover:border-blue-500 hover:bg-blue-500 hover:text-white md:group-first:border-blue-500 md:group-first:bg-blue-500 md:group-first:px-4 md:group-first:text-white"
                >
                  <span className="hidden md:group-first:flex">Read More</span>
                  <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingSection;
