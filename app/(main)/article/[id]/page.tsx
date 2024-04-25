"use client";

import ArticleLayout from "@/components/article-layout";
import ErrorHandler from "@/components/ui/error-handler";
import Loader from "@/components/ui/loader";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Article({ params }: { params: { id: string } }) {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/articles/${params.id}`
        );
        setIsLoading(false);
        const data = {
          ID: response.data["id"],
          Title: response.data["title"],
          Content: response.data["content"],
          CreatedAt: response.data["created_at"],
          Author: response.data["author"],
          AuthorID: response.data["authorid"],
          Image: response.data["image"],
          Likes: response.data["likes"],
        };
        setArticleData(data);
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
      }
    };

    fetchData();
  }, [params.id]);

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [articleData, setArticleData] = useState({
    ID: "",
    Title: "",
    CreatedAt: "",
    Content: "",
    Author: "",
    AuthorID: 0,
    Image: "",
    Likes: 0,
  });

  return (
    <div className="min-h-dvh w-full">
      <div className="my-8">
        {!isLoading ? (
          <>
            <ArticleLayout data={articleData} />
            <ErrorHandler isError={isError} />
          </>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
}
