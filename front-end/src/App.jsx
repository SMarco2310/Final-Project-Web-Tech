import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";
import AuthLayouts from "./Layouts/AuthLayouts";
import GalleryPage from "./pages/GalleryPage";
import GalleryLayout from "./Layouts/GalleryLayout";
import NotFoundPage from "./pages/NotFoundPage";
import RegularLayout from "./Layouts/RegularLayout";
import ItemCard from "./components/ItemCard";
function App() {
  return (  
    <Router>
      <Routes>
        <Route path="/" element={<AuthLayouts />}>
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/Register" element={<RegistrationPage />} />
        </Route>
        {/* <Route path="/" element={<GalleryLayout />}>
          <Route path="/Gallery" element={<GalleryPage />} />
          <Route path="/NotFound" element={<NotFoundPage />} />
        </Route> */}
        <Route path="/" element={<RegularLayout />}>
          <Route path="/ItemCard" element={<ItemCard />} />
          <Route path="/Gallery" element={<GalleryPage />} />
          <Route path="/NotFound" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
