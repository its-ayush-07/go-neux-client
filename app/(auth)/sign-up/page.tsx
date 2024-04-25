"use client";

import { Input } from "@/components/input";
import { Button } from "@/components/ui/button";
import ErrorHandler from "@/components/ui/error-handler";
import { AtSign, KeyRound, Mail } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isError, setIsError] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/user/signup`,
        formData,
        {
          withCredentials: true,
        }
      );
      if (response.status == 200) {
        const authData = {
          isAuthenticated: true,
          userDetails: {
            id: response.data["id"],
            email: response.data["email"],
            username: response.data["username"],
          },
        };
        if (typeof window !== "undefined") {
          localStorage.setItem("auth", JSON.stringify(authData));
        }
        router.push("/");
      }
    } catch (error) {
      setIsError(true);
    }
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-16">
      {/* Headline */}
      <div className="flex flex-col items-center justify-center">
        <h1 className="font-oswald text-3xl font-semibold">JOIN US TODAY</h1>
        <p className="text-center font-normal text-slate-500">
          Redefining Journalism for Tomorrow.
        </p>
      </div>
      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center gap-4"
      >
        <Input
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          name="username"
          icon={<AtSign size={18} />}
          required
        />
        <Input
          type="text"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          name="email"
          icon={<Mail size={18} />}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          name="password"
          icon={<KeyRound size={18} />}
          required
        />
        <Button
          className="mt-6 w-full max-w-80 rounded bg-blue-500 px-8 py-2 text-sm hover:bg-blue-600"
          type="submit"
        >
          Sign Up
        </Button>
        <div className="mt-4 text-sm text-slate-500 ">
          Have an account?{" "}
          <Link
            href="/sign-in"
            className="font-medium text-blue-500 hover:text-blue-600"
          >
            Sign in here
          </Link>
        </div>
      </form>
      <ErrorHandler isError={isError} />
    </div>
  );
}
