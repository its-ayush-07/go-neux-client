"use client";

import { Input } from "@/components/input";
import { Button } from "@/components/ui/button";
import ErrorHandler from "@/components/ui/error-handler";
import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { useRouter, redirect } from "next/navigation";
import axios from "axios";
import { UploadDropzone } from "@bytescale/upload-widget-react";

const EditorPage = () => {
  useEffect(() => {
    const authObj = localStorage.getItem("auth");
    if (authObj !== null) {
      const authData = JSON.parse(authObj);
      const auth = authData["isAuthenticated"];
      if (!auth) {
        return redirect("/sign-in");
      }
    } else {
      return redirect("/sign-in");
    }
  }, []);

  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: "",
  });

  const options = {
    apiKey: "free", // Get API keys from: www.bytescale.com
    maxFileCount: 1,
  };

  const [isError, setIsError] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const authObj = localStorage.getItem("auth");
      if (authObj !== null) {
        const authData = JSON.parse(authObj);
        const data = {
          title: formData.title,
          content: formData.content,
          author: authData["userDetails"]["username"],
          authorid: authData["userDetails"]["id"],
          image: formData.image,
        };
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/user/create`,
          data,
          {
            withCredentials: true,
          }
        );
        if (response.status == 200) {
          router.push("/");
        }
      }
    } catch (e) {
      setIsError(true);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label htmlFor="image" className=" text-slate-950">
          Upload cover image:
        </label>
        <UploadDropzone
          options={options}
          onUpdate={({ uploadedFiles }) => {
            uploadedFiles.map((x) => {
              setFormData((prev) => ({ ...prev, image: x.fileUrl }));
            });
          }}
          width="320px"
          height="375px"
        />
        <Input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          name="title"
          required
        />

        <Input
          type="text"
          placeholder="Content"
          value={formData.content}
          onChange={handleChange}
          name="content"
          required
        />

        <Button
          className="w-full max-w-80 rounded bg-blue-500 px-8 py-2 text-sm hover:bg-blue-600"
          type="submit"
        >
          Publish
        </Button>
      </form>
      <ErrorHandler isError={isError} />
    </div>
  );
};

export default EditorPage;
