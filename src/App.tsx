import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppHeader from "./layout/AppHeader";
import AppFooter from "./layout/AppFooter";
import LogIn from "./pages/LogIn";
import Home from "./pages/Home";
import AppContent from "./layout/AppContent";
import { Layout } from "antd";
import SignUp from "./pages/SignUp";
import PostList from "./pages/PostList";
import PostDetail from "./pages/PostDetail";
import "./App.css";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout style={{ minHeight: "100vh", flexDirection: "column" }}>
        <AppHeader />

        <AppContent>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/postlist" element={<PostList />} />
            <Route path="/postdetail" element={<PostDetail />} />
          </Routes>
        </AppContent>

        <AppFooter />
      </Layout>
    </BrowserRouter>
  );
};

export default App;
