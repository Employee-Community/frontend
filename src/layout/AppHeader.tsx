import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
const { Header } = Layout;
import { useRecoilValue } from "recoil";
import { memberAtom } from "../atoms/memberAtom";
import useRemainLogin from "../common/hooks/useRemainLogin";

function AppHeader() {
  const member = useRecoilValue(memberAtom);
  useRemainLogin();

  return (
    <Header
      style={{
        backgroundColor: "#001529",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
      }}
    >
      <div
        className="logo"
        style={{ color: "white", fontSize: "20px", fontWeight: "bold" }}
      >
        JobTalk
      </div>

      <Menu
        theme="dark"
        mode="horizontal"
        style={{ flex: 1, justifyContent: "center" }}
      >
        <Menu.Item key="1">
          <Link to="/">홈</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/postlist">게시판</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/postlist">기업리뷰</Link>
        </Menu.Item>
      </Menu>

      <div style={{ color: "white", display: "flex", gap: "16px" }}>
        {member ? (
          <span>{member.nickname}</span>
        ) : (
          <>
            <Link to="/login" style={{ color: "white" }}>
              로그인
            </Link>
            <Link to="/signup" style={{ color: "white" }}>
              회원가입
            </Link>
          </>
        )}
      </div>
    </Header>
  );
}

export default AppHeader;
