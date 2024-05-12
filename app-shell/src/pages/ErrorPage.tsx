/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error: any = useRouteError();
  console.error(error);

  return (
    <div
      id="error-page"
      className="flex items-center justify-center h-screen bg-gray-100"
    >
      <div className="text-center max-w-md">
        <h1 className="text-3xl font-bold text-gray-800">Ôi không!</h1>
        <p className="text-gray-600 mt-4">
          Xin lỗi, một lỗi không mong muốn đã xảy ra.
        </p>
        <p className="text-gray-400 italic mt-2">
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;