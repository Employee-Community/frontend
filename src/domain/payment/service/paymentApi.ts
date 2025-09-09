import api from "../../../common/config/axios";

interface VerifyPaymentRequest {
  impUid: string;
  merchantUid: string;
}

export const paymentApi = {
  verifyPayment: (data: VerifyPaymentRequest) => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      throw new Error("로그인이 필요합니다.");
    }

    return api.post("/payment/verify", data, {
      headers: {
        Authorization: token, // 이미 Bearer가 붙어 있다면 그대로 사용
        "Content-Type": "application/json",
      },
    });
  },
};
