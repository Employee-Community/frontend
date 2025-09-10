import api from "../../../common/config/axios";

interface VerifyPaymentRequest {
  impUid: string;
  merchantUid: string;
}

export const paymentApi = {
  verifyPayment: (data: VerifyPaymentRequest) => {
    return api.post("/payment/verify", data);
  },
};
