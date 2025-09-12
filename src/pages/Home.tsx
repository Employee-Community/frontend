import { memberApi } from "../domain/member/service/MemberApi";
import { paymentApi } from "../domain/payment/service/paymentApi";

declare global {
  interface Window {
    IMP: any;
  }
}

interface PaymentResponse {
  success: boolean;
  imp_uid: string;
  merchant_uid: string;
  error_msg?: string;
}

function Home() {
  const handlePayment = () => {
    const IMP = window.IMP;
    IMP.init("imp81284006");

    const data = {
      pg: "kakaopay",
      pay_method: "card",
      merchant_uid: `mid_${new Date().getTime()}`,
      name: "유료회원권",
      amount: 1000,
      buyer_email: "test@test.com",
      buyer_name: "이의현",
      buyer_tel: "010-1234-5678",
      redirect_url: "http://localhost:3000/",
    };

    IMP.request_pay(data, async function (response: PaymentResponse) {
      if (response.success) {
        // 결제 성공 시 백엔드로 검증 요청
        await paymentApi.verifyPayment({
          impUid: response.imp_uid,
          merchantUid: response.merchant_uid,
        });
        console.log("결제 검증 성공:");
      } else {
        alert(`결제 실패: ${response.error_msg}`);
      }

      await memberApi.changeMemberShip({
        impUid: response.imp_uid,
        role: "PREMIUM",
      });

      console.log("멤버쉽 변경 성공");
    });
  };

  const serachMember = async () => {
    const res = await memberApi.getMyInfo();
    console.log(res);
  };

  return (
    <div>
      <button onClick={handlePayment}>결제 클릭</button>
      <button onClick={serachMember}>회원 조회</button>
    </div>
  );
}

export default Home;
