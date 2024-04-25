"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import AccountDashboard from "@/components/account-dashboard";
import ErrorHandler from "@/components/ui/error-handler";
import Loader from "@/components/ui/loader";
import { redirect } from "next/navigation";

interface PostDataInterface {
  ID: string;
  Title: string;
  CreatedAt: string;
  Image: string;
}

export default function UserProfile() {
  useEffect(() => {
    const authObj = localStorage.getItem("auth");
    if (authObj !== null) {
      const authData = JSON.parse(authObj);
      const auth = authData["isAuthenticated"];
      if (!auth) {
        return redirect("/sign-in");
      } else {
        const fetchData = async () => {
          try {
            const data = {
              UserName: authData["userDetails"]["username"],
              Email: authData["userDetails"]["email"],
            };
            setUserData(data);

            const response = await axios.get(
              `${process.env.NEXT_PUBLIC_SERVER_URL}/user/articles/${authData["userDetails"]["id"]}`
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
            setPostsData(postDatas);
          } catch (error) {
            setIsLoading(false);
            setIsError(true);
          }
        };

        fetchData();
      }
    } else {
      return redirect("/sign-in");
    }
  }, []);

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
