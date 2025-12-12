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
import { AuthProvider } from "./hooks/useAuth";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<AuthLayouts />}>
            <Route path="/Login" element={<LoginPage />} />
            <Route path="/Register" element={<RegistrationPage />} />
          </Route>
          <Route path="/" element={<RegularLayout />}>
            <Route path="/Gallery" element={<GalleryPage />} />
            <Route path="/Item" element={<ItemPage />} />
            <Route path="/NotFound" element={<NotFoundPage />} />
            <Route path="/Claim" element={<ClaimFormPage />} />
            <Route path="/Report" element={<ReportFormPage />} />
            <Route path="/Profile" element={<ProfilePage />} />
          </Route>

          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="ProfileInfo" element={<ProfileInfoPage />} />
            <Route path="messages" element={<MessagesPage />} />
            <Route path="claims" element={<ClaimsPage />} />

            <Route path="chat/:id" element={<ChatPage />} />

          </Route>

        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
