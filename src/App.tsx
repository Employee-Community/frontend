import { Layout } from "antd";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AppContent from "./layout/AppContent";
import AppFooter from "./layout/AppFooter";
import AppHeader from "./layout/AppHeader";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import PostCreate from "./pages/PostCreate";
import PostDetail from "./pages/PostDetail";
import PostList from "./pages/PostList";
import PostMain from "./pages/PostMain";
import SignUp from "./pages/SignUp";
import { RecoilRoot } from "recoil";

import "./App.css";

const App: React.FC = () => {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Layout style={{ minHeight: "100vh", flexDirection: "column" }}>
          <AppHeader />

        <AppContent>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/posts" element={<PostMain />} />
            <Route path="/posts/category/:categoryIdx" element={<PostList />} />
            <Route path="/posts/:postIdx" element={<PostDetail />} />
            <Route path="/posts/create" element={<PostCreate />} />
          </Routes>
        </AppContent>
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
    </RecoilRoot>
  );
};

export default App;
