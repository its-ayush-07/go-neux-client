import { Avatar, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { ThumbsUp } from "lucide-react";
import Image from "next/image";
import ErrorHandler from "./ui/error-handler";
import moment from "moment";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

interface ArticleLayoutProps {
  data: {
    ID: string;
    Title: string;
    CreatedAt: string;
    Content: string;
    Author: string;
    AuthorID: number;
    Image: string;
    Likes: number;
  };
}

export default function ArticleLayout({ data }: ArticleLayoutProps) {
  useEffect(() => {
    setLikes(data.Likes);
    const auth = localStorage.getItem("auth");
    if (auth !== null) {
      const authData = JSON.parse(auth);
      const userID = authData["userDetails"]["id"];

      if (userID !== undefined && userID == data.AuthorID) {
        setIsDeletable(true);
      }
    }
  }, [data]);

  const router = useRouter();

  const [isDeletable, setIsDeletable] = useState(false);

  const likeHandler = async () => {
    try {
      const body = {
        IsLike: !isLiked,
      };

      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/articles/${data.ID}/like`,
        body,
        {
          withCredentials: true,
        }
      );
      if (response.status == 200) {
        if (!isLiked) {
          setIsLiked(true);
          setLikes(likes + 1);
        } else {
          setIsLiked(false);
          setLikes(likes - 1);
        }
      }
    } catch (error) {
      const parsedError = error as { response: { status: number } } | undefined;

      if (
        parsedError &&
        parsedError.response &&
        parsedError.response.status === 401
      ) {
        router.push("/sign-in");
      }
    }
  };

  const deleteArticleHandler = async () => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/articles/${data.ID}`,
        {
          withCredentials: true,
        }
      );
      if (response.status == 200) {
        router.push("/");
      }
    } catch (e) {
      setIsError(true);
    }
  };

  const [isLiked, setIsLiked] = useState(false);
  const [isError, setIsError] = useState(false);
  const [likes, setLikes] = useState(0);

  return (
    <>
      <ErrorHandler isError={isError} />
      <div className="flex flex-col gap-5">
        <h1 className="font-oswald text-4xl font-medium text-slate-950">
          {data.Title}
        </h1>
        <div className="flex gap-3">
          <div>
            <Avatar>
              <AvatarImage src={"https://github.com/shadcn.png"} />
            </Avatar>
          </div>
          <div className="flex flex-col">
            <Link href={`/user/${data.AuthorID}`}>
              <p className="text-[20px] text-slate-950">{data.Author}</p>
            </Link>
            <p className="text-[15px] text-slate-500">
              {moment(data.CreatedAt).fromNow()}
            </p>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2">
            <ThumbsUp
              onClick={likeHandler}
              size={26}
              stroke-width="1"
              fill={isLiked ? "#4A90E2" : "none"}
              cursor="pointer"
            />
            <p className="text-[20px] text-slate-950">{likes}</p>
          </div>
          {isDeletable ? (
            <Button
              onClick={deleteArticleHandler}
              className="flex gap-2 rounded bg-red-500 text-sm text-white hover:border-red-600 hover:bg-red-600"
            >
              Delete article
            </Button>
          ) : (
            ""
          )}
        </div>
        <div
          style={{ position: "relative", overflow: "hidden", height: "500px" }}
        >
          <Image
            src={data.Image ? data.Image : ""}
            alt="Article Cover Image"
            style={{ objectFit: "cover" }}
            fill
          />
        </div>

        <p className="mt-8 text-[20px] text-slate-950">{data.Content}</p>
      </div>
    </>
  );
}
