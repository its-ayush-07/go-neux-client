"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import AccountDashboard from "@/components/account-dashboard";
import ErrorHandler from "@/components/ui/error-handler";
import Loader from "@/components/ui/loader";

interface PostDataInterface {
  ID: string;
  Title: string;
  CreatedAt: string;
  Image: string;
}

export default function UserAccount({ params }: { params: { id: string } }) {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/user/${params.id}`
        );
        setIsLoading(false);
        const data = {
          UserName: response.data["username"],
          Email: response.data["email"],
        };
        setUserData(data);

        const posts_response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/user/articles/${params.id}`
        );
        const datas = posts_response.data;
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
        setPostsData(postDatas);
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
      }
    };

    fetchData();
  }, [params.id]);

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [userData, setUserData] = useState({
    UserName: "",
    Email: "",
  });
  const [postsData, setPostsData] = useState<PostDataInterface[]>([]);

  return (
    <div className="min-h-dvh w-full">
      <div className="my-8">
        {!isLoading ? (
          <>
            <AccountDashboard user={userData} data={postsData} />
            <ErrorHandler isError={isError} />
          </>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
}
