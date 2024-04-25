"use client";

import TrendingSection from "@/components/trending-section";
import ErrorHandler from "@/components/ui/error-handler";
import Loader from "@/components/ui/loader";
import { useEffect, useState } from "react";
import axios from "axios";

interface PostDataInterface {
  ID: string;
  Title: string;
  CreatedAt: string;
  Image: string;
}

export default function Home() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/articles`
        );
        setIsLoading(false);
        const datas = response.data["articles"];
        const postDatas: PostDataInterface[] = [];
        datas.map((postData: any) => {
          const postObj: PostDataInterface = {
            ID: postData["id"],
            Title: postData["title"],
            CreatedAt: postData["created_at"],
            Image: postData["image"],
          };
          postDatas.push(postObj);
        });
        setSampleTrending(postDatas);
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
      }
    };

    fetchData();
  }, []);

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [sampleTrending, setSampleTrending] = useState<PostDataInterface[]>([]);

  return (
    <div className="min-h-dvh w-full">
      {/* Trending */}
      <div className="my-8">
        {!isLoading ? (
          <>
            <ErrorHandler isError={isError} />
            <TrendingSection data={sampleTrending} />
          </>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
}
