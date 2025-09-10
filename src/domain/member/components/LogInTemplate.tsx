import { useState } from "react";
import { Input, Button, Card, Space } from "antd";
import { memberApi } from "../service/MemberApi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function LoginTemplate() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await memberApi.login({ id, password });

      Swal.fire({
        icon: "success",
        title: "로그인 성공",
        text: response.data.message || "홈페이지로 이동합니다.",
      }).then(() => {
        const accessToken = response.headers["authorization"];
        if (accessToken) {
          localStorage.setItem("accessToken", accessToken);
        }
        navigate("/");
      });
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "로그인 실패",
        text:
          error.response?.data?.message || "아이디와 비밀번호를 확인해주세요.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 100 }}>
      <Card
        style={{
          width: 400,
          padding: 24,
          borderRadius: 12,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <Space direction="vertical" style={{ width: "100%" }} size="large">
          <h2 style={{ textAlign: "center" }}>로그인</h2>

          <Input
            placeholder="아이디"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <Input.Password
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button type="primary" block loading={loading} onClick={handleLogin}>
            로그인
          </Button>

          <Button type="default" block onClick={() => navigate("/signup")}>
            회원가입
          </Button>
        </Space>
      </Card>
    </div>
  );
}

export default LoginTemplate;
