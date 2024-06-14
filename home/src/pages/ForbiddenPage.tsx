import { useNavigate } from "react-router-dom";

/* eslint-disable @typescript-eslint/no-explicit-any */
const ForbiddenPage = () => {
  const navigate = useNavigate();

  return (
    <div
      id="forbidden-page"
      className="flex items-center justify-center h-screen bg-gray-100"
    >
      <div className="text-center max-w-md">
        <h1 className="text-3xl font-bold text-gray-800">Ôi không!</h1>
        <p className="text-gray-600 mt-4">
          Tài khoản của bạn đã bị vô hiệu hóa. Vui lòng đăng nhập bằng tài khoản
          khác.
        </p>
        <p
          className="text-gray-400 italic mt-2 cursor-pointer"
          onClick={() => navigate("/sign-in", { replace: true })}
        >
          <u>
            <i>Quay lại đăng nhập</i>
          </u>
        </p>
      </div>
    </div>
  );
};

export default ForbiddenPage;
