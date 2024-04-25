import Image from "next/image";
import Link from "next/link";
import { Button } from "./button";
import { ArrowRight } from "lucide-react";
import moment from "moment";

interface ArticleCardProps {
  data: {
    ID: string;
    Title: string;
    CreatedAt: string;
    Image: string;
  };
}

export default function ArticleCard({ data }: ArticleCardProps) {
  return (
    <div className="flex flex-col rounded border border-slate-200 p-2">
      <div
        style={{ position: "relative", overflow: "hidden", height: "300px" }}
      >
        <Image
          src={data.Image ? data.Image : ""}
          alt="Article Cover Image"
          style={{ objectFit: "cover" }}
          fill
        />
      </div>
      <p className="mt-2 line-clamp-2 font-oswald font-medium uppercase">
        {data.Title}
      </p>
      <p className=" text-[10px] font-semibold capitalize text-slate-500 ">
        {moment(data.CreatedAt).fromNow()}
      </p>
      <Link href={`/article/${data.ID}`}>
        <Button
          variant={"outline"}
          className="mt-2 h-fit w-fit border-2 p-2 text-slate-500 hover:border-blue-500 hover:bg-blue-500 hover:text-white"
        >
          <ArrowRight size={16} />
        </Button>
      </Link>
    </div>
  );
}
