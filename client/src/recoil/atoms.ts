import { atom } from "recoil";
import { localPersistEffect } from "./config";

export const isAuthenticatedAtom = atom<boolean>({
  key: "isAuthenticatedAtom",
  default: false,
  effects_UNSTABLE: [localPersistEffect],
});

export const userDetailsAtom = atom({
  key: "userDetailsAtom",
  default: {
    id: "",
    email: "",
    phone: "",
    username: "",
    fullname: "",
    avatarUrl: "",
    role: "",
    location: "",
    emailVerified: false,
    phoneVerified: false,
    privateProfile: false,
    accessToken: "",
    refreshToken: "",
  },
  effects_UNSTABLE: [localPersistEffect],
});
