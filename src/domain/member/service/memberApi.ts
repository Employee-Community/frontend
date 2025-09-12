import api from "../../../common/config/axios";
import type { IApiResponse } from "../../../common/types/response/commonResponse";
import type { IMember } from "../../../common/types/response/memberResponse";

interface SignupRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  nickname: string;
  password: string;
  role: string;
}

interface LogInRequest {
  id: string;
  password: string;
}

interface ChangeMembershipRequest {
  role: string;
  impUid: string;
}

export const memberApi = {
  signup: (data: SignupRequest) =>
    api.post<IApiResponse<void>>("/member/register", data),

  login: (data: LogInRequest) =>
    api.post<IApiResponse<IMember>>("/member/logIn", data, {
      withCredentials: true,
    }),

  changeMemberShip: (data: ChangeMembershipRequest) =>
    api.patch<IApiResponse<void>>("/member/role", data),

  getMyInfo: () =>
    api.get<IApiResponse<IMember>>("/member", {
      withCredentials: true,
    }),
};
