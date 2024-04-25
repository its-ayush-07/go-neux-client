import { Footer } from "@/components/footer";
import Navbar from "@/components/navbar";
import React from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full">
      <Navbar />
      <main className="mx-auto h-full w-full max-w-[1440px] px-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}
