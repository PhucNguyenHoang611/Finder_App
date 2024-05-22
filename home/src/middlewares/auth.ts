/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthenticateService } from "@/services/api";
import { setJWT } from "@/config/api";
import { RESET } from "jotai/utils";

export const signInValidate = async (user: SignedInUser, setUser: any) => {
  const today = new Date();

  if (today < new Date(user.expired)) {
    if (today >= new Date(user.accessTokenExpired)) {
      const response = await AuthenticateService.authControllerRefreshToken(
        user.refreshToken
      );
      const data = response.data;

      setUser({
        ...user,
        accessToken: data.accesToken,
        accessTokenExpired: new Date(data.accessTokenExpired),
        refreshToken: data.refreshToken,
        refreshTokenExpired: new Date(data.refreshTokenExpired)
      });

      console.log("Get new Refresh Token successfully !!!");
    } else {
      setJWT(user.accessToken);
    }
  } else {
    setUser(RESET);
  }
};
