import { Link } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

const AboutUs = () => {
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
          Finder - Hỗ trợ tìm đồ thất lạc
        </h1>

        <div className="flex justify-center items-center">
          <img
            src="/mainLogo.png"
            alt="Finder logo"
            className="w-[400px] h-auto"
          />
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-gray-600 text-justify leading-relaxed text-sm sm:text-base md:text-md lg:text-lg mb-4">
            Chào mừng bạn đến với <span className="font-semibold">Finder</span>!
            Sứ mệnh của chúng tôi được xác định sẽ giúp bạn dễ dàng tìm lại
            những món đồ bị thất lạc một cách nhanh chóng và hiệu quả. Chúng tôi
            hiểu rằng việc mất đồ có thể là một trải nghiệm rất căng thẳng và
            phiền phức, và chúng tôi ở đây để giúp bạn.
          </p>

          <p className="text-gray-600 text-justify leading-relaxed text-sm sm:text-base md:text-md lg:text-lg mb-4">
            Chúng tôi là một nhóm những người trẻ đầy nhiệt huyết và có kinh
            nghiệm trong việc cung cấp dịch vụ hỗ trợ tìm đồ. Với những công cụ
            tiên tiến và mạng lưới rộng lớn, chúng tôi tự tin rằng sẽ giúp bạn
            tìm lại được đồ thất lạc một cách nhanh nhất.
          </p>

          <p className="text-gray-600 text-justify leading-relaxed text-sm sm:text-base md:text-md lg:text-lg">
            Tại đây bạn có thể:
          </p>
          <ul className="list-disc mb-4">
            <li>
              <p className="text-gray-600 text-justify leading-relaxed text-sm sm:text-base md:text-md lg:text-lg">
                Đăng tin tìm đồ, nhặt được đồ
              </p>
            </li>
            <li>
              <p className="text-gray-600 text-justify leading-relaxed text-sm sm:text-base md:text-md lg:text-lg">
                Đăng tin tìm thú cưng/ bắt được thú cưng bị lạc
              </p>
            </li>
            <li>
              <p className="text-gray-600 text-justify leading-relaxed text-sm sm:text-base md:text-md lg:text-lg">
                Tìm người thân thất lạc/ gặp người thất lạc thì đăng tin giúp
                tìm người nhà
              </p>
            </li>
            <li>
              <p className="text-gray-600 text-justify leading-relaxed text-sm sm:text-base md:text-md lg:text-lg">
                Đăng tin cho đồ không dùng nữa để người đang thiếu có thể lấy,
                tránh lãng phí tài nguyên cho xã hội
              </p>
            </li>
          </ul>

          <p className="text-gray-600 text-justify leading-relaxed text-sm sm:text-base md:text-md lg:text-lg">
            Hãy chia sẻ <span className="font-semibold">Finder</span> đến càng
            nhiều người càng tốt để mọi người khi mất đồ có thể nghĩ ngay đến{" "}
            <span className="font-semibold">Finder</span> để đăng tin, giúp cho
            mọi người tìm thấy đồ một cách nhanh chóng.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
