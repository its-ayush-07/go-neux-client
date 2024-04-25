"use client";

import SearchResults from "@/components/search-results";
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

export default function SearchPage({ params }: { params: { term: string } }) {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const decodedString = decodeURIComponent(
          params.term.replace(/\+/g, " ")
        );
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/search`,
          {
            params: {
              q: decodedString,
            },
          }
        );
        setIsLoading(false);
        const datas = response.data;
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
        setSearchData(postDatas);
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
      }
    };

    fetchData();
  }, [params.term]);

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [searchData, setSearchData] = useState<PostDataInterface[]>([]);

  return (
    <div className="min-h-dvh w-full">
      <div className="my-8">
        {!isLoading ? (
          <>
            <SearchResults
              term={decodeURIComponent(params.term.replace(/\+/g, " "))}
              data={searchData}
            />
            <ErrorHandler isError={isError} />
          </>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
}
