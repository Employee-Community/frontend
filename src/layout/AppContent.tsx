import { Layout } from "antd";

const { Content } = Layout;

function AppContent({ children }: { children?: React.ReactNode }) {
  return <Content style={{ padding: "20px" }}>{children}</Content>;
}

export default AppContent;
