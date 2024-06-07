import { Link } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

const ScamWarning = () => {
  return (
    <section className="flex flex-col justify-center mb-6">
      <Alert
        className={cn("rounded-xl bg-red-400 text-white border mb-[20px]")}
      >
        <TriangleAlert className="h-6 w-6" style={{ color: "white" }} />
        <AlertTitle>Chú ý !</AlertTitle>

        <div className="flex gap-1">
          <AlertDescription>Cảnh báo</AlertDescription>
          <AlertDescription>
            <Link to="/scam-warning" className="underline font-medium">
              lừa đảo
            </Link>
          </AlertDescription>
        </div>
      </Alert>

      <div className="border border-slate-200 w-full rounded-xl bg-white px-8 sm:px-10 md:px-12 py-8">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-gray-800 mb-4">
          Cảnh báo lừa đảo !
        </h1>

        <div className="flex justify-center items-center">
          <img
            src="/ScamWarning.png"
            alt="Finder logo"
            className="w-[600px] h-auto my-8 rounded-xl"
          />
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-gray-600 text-justify leading-relaxed text-sm sm:text-base md:text-md lg:text-lg font-semibold">
            Cảnh báo những người đang cần tìm ví, giấy tờ:
          </p>
          <ul className="list-disc mb-4">
            <li>
              <p className="text-gray-600 text-justify leading-relaxed text-sm sm:text-base md:text-md lg:text-lg">
                Xác định chính xác xem người ta có đang cầm tài sản của mình
                không, bằng cách yêu cầu cung thông tin trên CCCD, giấy tờ liên
                quan (tất cả các loại giấy tờ khi đăng công khai lên các trang
                rao vặt, các trang mạng xã hội cần phải che các mã số quan
                trọng)
              </p>
            </li>
            <li>
              <p className="text-gray-600 text-justify leading-relaxed text-sm sm:text-base md:text-md lg:text-lg">
                Tuyệt đối không chuyển khoản trước khi bị yêu cầu chuộc
              </p>
            </li>
            <li>
              <p className="text-gray-600 text-justify leading-relaxed text-sm sm:text-base md:text-md lg:text-lg">
                Cảm ơn và hậu tạ trực tiếp, tận nơi (không chuyển khoản trước)
              </p>
            </li>
            <li>
              <p className="text-gray-600 text-justify leading-relaxed text-sm sm:text-base md:text-md lg:text-lg">
                100% yêu cầu chuyển khoản trước là lừa đảo
              </p>
            </li>
          </ul>

          <p className="text-gray-600 text-justify leading-relaxed text-sm sm:text-base md:text-md lg:text-lg font-semibold">
            Cảnh báo những người đang cần thú cưng, chó, mèo:
          </p>
          <ul className="list-disc mb-4">
            <li>
              <p className="text-gray-600 text-justify leading-relaxed text-sm sm:text-base md:text-md lg:text-lg">
                Xác định chính xác xem người ta có đang giữ vật nuôi của mình
                không, bằng cách yêu cầu chụp hình, quay video xác nhận
              </p>
            </li>
            <li>
              <p className="text-gray-600 text-justify leading-relaxed text-sm sm:text-base md:text-md lg:text-lg">
                Tuyệt đối không chuyển khoản trước khi bị yêu cầu chuộc
              </p>
            </li>
            <li>
              <p className="text-gray-600 text-justify leading-relaxed text-sm sm:text-base md:text-md lg:text-lg">
                Cảm ơn và hậu tạ trực tiếp, tận nơi (không chuyển khoản trước)
              </p>
            </li>
            <li>
              <p className="text-gray-600 text-justify leading-relaxed text-sm sm:text-base md:text-md lg:text-lg">
                100% yêu cầu chuyển khoản trước là lừa đảo
              </p>
            </li>
          </ul>

          <p className="text-gray-600 text-justify leading-relaxed text-sm sm:text-base md:text-md lg:text-lg font-semibold">
            Finder chúng tôi:
          </p>
          <ul className="list-disc mb-4">
            <li>
              <p className="text-gray-600 text-justify leading-relaxed text-sm sm:text-base md:text-md lg:text-lg">
                Không có cá nhân đại diện để liên lạc với mọi người
              </p>
            </li>
            <li>
              <p className="text-gray-600 text-justify leading-relaxed text-sm sm:text-base md:text-md lg:text-lg">
                Không nhận đồ hộ người mất
              </p>
            </li>
            <li>
              <p className="text-gray-600 text-justify leading-relaxed text-sm sm:text-base md:text-md lg:text-lg">
                Mọi cá nhân mạo danh Finder đều là lừa đảo
              </p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ScamWarning;
