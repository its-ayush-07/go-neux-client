interface ErrorHandlerInterface {
  isError: boolean;
}

export default function ErrorHandler({ isError }: ErrorHandlerInterface) {
  if (!isError) return null;

  return (
    <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
      <div className="h-100 mx-auto flex w-1/2 items-center justify-center rounded-lg bg-red-500 p-2 text-white md:max-w-md md:p-4">
        An error occurred. Please refresh and try again.
      </div>
    </div>
  );
}
