import type { IMember } from "./../common/types/response/memberResponse";
import { atom } from "recoil";

export const memberAtom = atom<IMember | null>({
  key: "memberAtom",
  default: null,
});
