import Image from "next/image";
import authImage from "@/public/auth-image.jpg";
import Logo from "@/components/logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full text-slate-900">
      <section className="hidden w-full lg:flex">
        <Image
          src={authImage}
          alt="Picture of newpaper headlines"
          style={{ objectFit: "cover" }}
          className="w-full"
        />
      </section>
      <section className="flex w-full flex-col bg-slate-50 p-8">
        <Logo />
        {children}
      </section>
    </div>
  );
}
