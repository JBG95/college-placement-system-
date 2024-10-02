import { Route, Routes } from "react-router-dom";
import Layout from "./components/global/Layout";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import Register from "./components/auth/Register";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<Register />} />

      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />
    </Routes>
  );
}

export default App;
