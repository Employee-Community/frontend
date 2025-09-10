import { useState } from "react";
import { Input, Button, Card, Space } from "antd";
import { memberApi } from "../service/MemberApi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function SignupTemplate() {
  const [id, setId] = useState("");
  const [nickname, setNickname] = useState("");
  const [role, setRole] = useState("FREE");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      setLoading(true);
      const response = await memberApi.signup({
        id,
        name,
        email,
        phone,
        nickname,
        password,
        role,
      });

      Swal.fire({
        icon: "success",
        title: "회원가입 성공",
        text: response.data.message || "로그인 페이지로 이동합니다.",
      }).then(() => {
        navigate("/login");
      });
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "회원가입 실패",
        text: error.response?.data?.message || "다시 시도해주세요.",
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
          <h2 style={{ textAlign: "center" }}>회원가입</h2>

          <Input
            placeholder="아이디"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <Input
            placeholder="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="핸드폰 번호 (-) 구분"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <Input
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="닉네임"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <Input.Password
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button type="primary" block loading={loading} onClick={handleSignup}>
            회원가입
          </Button>

          <Button type="default" block onClick={() => navigate("/login")}>
            로그인
          </Button>
        </Space>
      </Card>
    </div>
  );
}

export default SignupTemplate;
