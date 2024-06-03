/* eslint-disable react-hooks/exhaustive-deps */
import PostsList from "@/components/Post/PostsList";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { setJWT } from "@/config/api";
import { GET_MY_PROFILE } from "@/services/graphql/queries";
import { signedInUserAtom } from "@/store";
import { useLazyQuery } from "@apollo/client";
import { useSetAtom } from "jotai";
import { Megaphone } from "lucide-react";
import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

const Home = () => {
  // Manage Signed In User Data
  const [searchParams, setSearchParams] = useSearchParams();
  const [getMyProfile] = useLazyQuery(GET_MY_PROFILE);
  const setSignedInUser = useSetAtom(signedInUserAtom);

  const handleGetMyProfile = async (
    accessToken: string,
    accessTokenExpired: string,
    refreshToken: string,
    refreshTokenExpired: string,
    expiredDate: Date
  ) => {
    await getMyProfile({
      context: {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    })
      .then((result) => {
        const userData = result.data.getMyProfile.data;

        const signedInUser: SignedInUser = {
          id: userData.id,
          accessToken: accessToken,
          accessTokenExpired: new Date(accessTokenExpired),
          refreshToken: refreshToken,
          refreshTokenExpired: new Date(refreshTokenExpired),
          expired: expiredDate,
          avatar: userData.avatar,
          displayName: userData.displayName,
          email: userData.email,
          gender: userData.gender,
          phone: userData.phone,
          birthDate: userData.birthDate,
          address: userData.address
        };
        setSignedInUser(signedInUser);

        setJWT(accessToken);
        toast.success("Đăng nhập thành công! Chào mừng bạn trở lại");

        searchParams.delete("accessToken");
        searchParams.delete("accessTokenExpired");
        searchParams.delete("refreshToken");
        searchParams.delete("refreshTokenExpired");

        setSearchParams(searchParams);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Get Search Params
  useEffect(() => {
    if (searchParams.size > 0 && searchParams.get("accessToken")) {
      const expiredDate = new Date();
      expiredDate.setDate(expiredDate.getDate() + 7);

      const accessToken = searchParams.get("accessToken") || "";
      const accessTokenExpired = searchParams.get("accessTokenExpired") || "";
      const refreshToken = searchParams.get("refreshToken") || "";
      const refreshTokenExpired = searchParams.get("refreshTokenExpired") || "";

      handleGetMyProfile(
        accessToken,
        accessTokenExpired,
        refreshToken,
        refreshTokenExpired,
        expiredDate
      );
    }
  }, [searchParams]);

  return (
    <section className="flex flex-col justify-center">
      <Alert className="bg-slate-200 border rounded-[8px] w-full mx-auto">
        <AlertDescription className="flex justify-center items-center gap-2">
          <Megaphone className="h-4 w-4" />

          <Link to={"/create-post"} className="underline text-md font-bold">
            <p>Đăng tin ngay ở đây</p>
          </Link>
        </AlertDescription>
      </Alert>

      <PostsList />
    </section>
  );
};

export default Home;
