import { useRecoilState } from "recoil";
import { memberAtom } from "../../atoms/memberAtom";
import { useEffect } from "react";
import { memberApi } from "../../domain/member/service/MemberApi";

function useRemainLogin() {
  const [member, setMember] = useRecoilState(memberAtom);
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (member && accessToken) return;

    if (member && !accessToken) {
      setMember(null);
      return;
    }

    if (accessToken) {
      (async () => {
        try {
          const res = await memberApi.getMyInfo();
          setMember(res.data.data);
        } catch (e) {
          console.error("로그인 유지 실패:", e);
          setMember(null);
        }
      })();
    }
  });
}

export default useRemainLogin;
