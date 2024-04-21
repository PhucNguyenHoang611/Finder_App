import {
  Dog,
  HandHeart,
  PersonStanding,
  PhoneOff,
  TextSearch,
  Upload,
} from "lucide-react";
import { Link, Outlet } from "react-router-dom";

const SideBar = () => {
  return (
    <main className="flex justify-start items-start pt-4">
      <section className="flex justify-center items-center gap-4 w-2/12">
        <ul className="text-apptext-1">
          <li>
            <div className="p-2 font-bold flex gap-2 w-full hover:bg-appbg-2 border border-transparent	 rounded-xl">
              <Upload className="text-apptext-3" />
              <Link to={"/post"} className="">
                Đăng tin
              </Link>
            </div>
          </li>
          <li>
            <div className="p-2 font-bold flex gap-2 w-full hover:bg-appbg-2 border border-transparent	 rounded-xl">
              <TextSearch className="text-apptext-3" />
              <Link to={"/Tincantim"}>Tin cần tìm</Link>
            </div>
          </li>
          <li>
            <div className="p-2 font-bold flex gap-2 w-full hover:bg-appbg-2 border border-transparent	 rounded-xl">
              <HandHeart className="text-apptext-3" />
              <Link to={"/Tinnhatduoc"}>Tin nhặt được</Link>
            </div>
          </li>
          <li>
            <div className="p-2 font-bold flex gap-2 w-full hover:bg-appbg-2 border border-transparent	 rounded-xl">
              <Dog className="text-apptext-3" />
              <Link to={"/Timthucung"}>Tìm thú cưng</Link>
            </div>
          </li>
          <li>
            <div className="p-2 font-bold flex gap-2 w-full hover:bg-appbg-2 border border-transparent	 rounded-xl">
              <PersonStanding className="text-apptext-3" />
              <Link to={"/Timnguoi"}>Tìm người</Link>
            </div>
          </li>
          <li>
            <div className="p-2 font-bold flex gap-2 w-full hover:bg-appbg-2 border border-transparent	 rounded-xl">
              <PhoneOff className="text-apptext-3" />
              <Link to={"/Luadao"}>Cảnh báo lừa đảo</Link>
            </div>
          </li>
        </ul>
      </section>
      <section className="w-10/12 px-12">
        <Outlet />
      </section>
    </main>
  );
};

export default SideBar;
