import { Route, Routes } from "react-router-dom";
import Layout from "./components/global/Layout";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import Register from "./components/auth/Register";
import Dashboard from "./components/user/Dashboard";
import RootLayout from "./components/user/RootLayout";
import Profile from "./components/user/Profile";
import Applications from "./components/user/Applications";
import Jobs from "./components/user/Jobs";
import Avatar from "./components/auth/Avatar";
import Role from "./components/auth/Role";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/user/avatar/:userId" element={<Avatar />} />
      <Route path="/user/role/:userId" element={<Role />} />

      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />
      <Route
        path="/dashboard"
        element={
          <RootLayout>
            <Dashboard />
          </RootLayout>
        }
      />
      <Route
        path="/user/jobs"
        element={
          <RootLayout>
            <Jobs />
          </RootLayout>
        }
      />
      <Route
        path="/user/applications"
        element={
          <RootLayout>
            <Applications />
          </RootLayout>
        }
      />
      <Route
        path="/user/profile"
        element={
          <RootLayout>
            <Profile />
          </RootLayout>
        }
      />
    </Routes>
  );
}

export default App;
