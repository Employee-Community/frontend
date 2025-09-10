import api from "../../../common/config/axios";

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

interface ApiResponse {
  success: boolean;
  message: string;
  data: any;
  timestamp: string;
}

export const memberApi = {
  signup: (data: SignupRequest) =>
    api.post<ApiResponse>("/member/register", data),

  login: (data: LogInRequest) =>
    api.post<ApiResponse>("/member/logIn", data, {
      withCredentials: true,
    }),

  changeMemberShip: (data: ChangeMembershipRequest) =>
    api.patch<ApiResponse>("/member/role", data),

  findMember: () => api.get<ApiResponse>("/member/1"),
};
