import Logo from "./logo";

export const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center bg-zinc-900 text-white">
      <div className="flex w-full max-w-[1440px] items-start justify-between p-10 md:p-24">
        <div className="flex flex-col gap-8">
          <div>
            <Logo className="text-white" />
            <h6 className="mt-2 text-base">
              Redefining journalism for Tommorrow.
            </h6>
          </div>
        </div>

        <div className="flex gap-10 md:gap-20">
          <div className="flex flex-col gap-4">
            <p className="font-bold ">Company</p>
            <div className="flex flex-col gap-2 text-sm text-slate-500">
              <p>Terms of Service</p>
              <p>Privacy policy</p>
              <p>Contact</p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <p className="font-bold ">Connect</p>
            <div className="flex flex-col gap-2 text-sm text-slate-500">
              <p>Facebook</p>
              <p>Twitter</p>
              <p>LinkedIn</p>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[1px] w-full bg-zinc-800"></div>

      <h6 className="my-4 text-sm text-slate-500">
        GoNeux © {new Date().getFullYear()}. All rights reserved.
      </h6>
    </footer>
  );
};
