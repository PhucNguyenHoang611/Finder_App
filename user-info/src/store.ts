import { atom } from "jotai";

const initialValue = {
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
};

const signedInUser: SignedInUser = JSON.parse(
  localStorage.getItem("signedInUser") ?? JSON.stringify(initialValue)
);

const signedInUserAtom = atom<SignedInUser>(signedInUser);

export const signedInUserAtomWithPersistence = atom(
  (get) => get(signedInUserAtom),
  (_get, set, newValue: SignedInUser) => {
    set(signedInUserAtom, newValue);
    localStorage.setItem("signedInUser", JSON.stringify(newValue));
  }
);
