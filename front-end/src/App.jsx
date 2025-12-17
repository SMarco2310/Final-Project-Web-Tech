import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";
import AuthLayouts from "./Layouts/AuthLayouts";
import GalleryPage from "./pages/GalleryPage";
import NotFoundPage from "./pages/NotFoundPage";
import RegularLayout from "./Layouts/RegularLayout";
import ItemPage from "./pages/ItemPage";
import ClaimFormPage from "./pages/ClaimFormPage";
import ReportFormPage from "./pages/ReportFormPage";
import ProfilePage from "./pages/ProfilePage";
import ChatPage from "./pages/ChatPage";
import DashboardLayout from "./Layouts/DashboardLayout";
import DashboardPage from "./pages/DashboardPage";
import ProfileInfoPage from "./pages/ProfileInfoPage";
import MessagesPage from "./pages/MessagesPage";
import ClaimsPage from "./pages/ClaimsPage";
import ClaimDetailsPage from "./pages/ClaimDetailsPage";
import { AuthProvider } from "./hooks/useAuth";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Authentication Routes */}
          <Route path="/" element={<AuthLayouts />}>
            <Route path="Login" element={<LoginPage />} />
            <Route path="Register" element={<RegistrationPage />} />
          </Route>

          {/* Regular Layout Routes */}
          <Route path="/" element={<RegularLayout />}>
            <Route index element={<GalleryPage />} />
            <Route path="Item/:id" element={<ItemPage />} />
            <Route path="Profile/:id" element={<ProfilePage />} />

            {/* Protected Routes inside RegularLayout */}
            <Route element={<ProtectedRoute />}>
              <Route path="Claim/:id" element={<ClaimFormPage />} />
              <Route path="Report" element={<ReportFormPage />} />
              <Route path="Report/:id" element={<ReportFormPage />} />
            </Route>

            {/* 404 Not Found - specific path if needed, but catch-all is below */}
            <Route path="NotFound" element={<NotFoundPage />} />
          </Route>

          {/* Protected Dashboard Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="dashboard/:id" element={<DashboardLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path="profile" element={<ProfileInfoPage />} />
              <Route path="messages" element={<MessagesPage />} />
              <Route path="claims" element={<ClaimsPage />} />
              <Route path="claims/:claimId" element={<ClaimDetailsPage />} />
              <Route path="chat/:chatId" element={<ChatPage />} />
            </Route>
          </Route>

          {/* Catch-all 404 Route */}
          <Route path="*" element={<NotFoundPage />} />

        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
