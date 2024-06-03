/* eslint-disable @typescript-eslint/no-unused-vars */
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const signedInUserAtom = atomWithStorage<SignedInUser>("signedInUser", {
  id: 0,
  accessToken: "",
  accessTokenExpired: new Date(),
  refreshToken: "",
  refreshTokenExpired: new Date(),
  expired: new Date(),
  avatar: "",
  displayName: "",
  email: "",
  gender: true,
  phone: "",
  birthDate: new Date(),
  address: ""
});

export const useSignedInUserAtom = () => useAtom(signedInUserAtom);
