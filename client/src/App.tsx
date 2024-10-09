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
import CreateJobForm from "./components/jobs/Jobscomponent";
import Companies from "./components/companies/Companies";
import Create from "./components/companies/Create";
import CompaniesList from "./pages/Companies";
import CompanyId from "./pages/CompanyId";
import JobsPage from "./pages/Job";
import JobId from "./pages/JobId";
import JobApplicationForm from "./pages/Application";
import MyDashboard from "./components/user/MyDashboard";
import UserApplications from "./components/applications/UserApplications";

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
        path="/companies"
        element={
          <Layout>
            <CompaniesList />
          </Layout>
        }
      />

      <Route
        path="/company/:companyId"
        element={
          <Layout>
            <CompanyId />
          </Layout>
        }
      />

      <Route
        path="/jobs"
        element={
          <Layout>
            <JobsPage />
          </Layout>
        }
      />

      <Route
        path="/job/:jobId"
        element={
          <Layout>
            <JobId />
          </Layout>
        }
      />

      <Route
        path="/apply/:jobId"
        element={
          <Layout>
            <JobApplicationForm />
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
        path="/user/jobs/create"
        element={
          <RootLayout>
            <CreateJobForm />
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
        path="/user/companies"
        element={
          <RootLayout>
            <Companies />
          </RootLayout>
        }
      />
      <Route
        path="/user/companies/create"
        element={
          <RootLayout>
            <Create />
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

      <Route
        path="/seeker/profile"
        element={
          <RootLayout>
            <Profile />
          </RootLayout>
        }
      />

      <Route
        path="/seeker/dashboard"
        element={
          <RootLayout>
            <MyDashboard />
          </RootLayout>
        }
      />

      <Route
        path="/seeker/applications"
        element={
          <RootLayout>
            <UserApplications />
          </RootLayout>
        }
      />
    </Routes>
  );
}

export default App;
