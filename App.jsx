import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import SmartRecommendationPage from "./pages/SmartRecommendationPage";
import PestPredictionPage from "./pages/PestPredictionPage";
import KnowledgeHubPage from "./pages/KnowledgeHubPage";
import SafetyCompliancePage from "./pages/SafetyCompliancePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import DemandForecastingPage from "./pages/DemandForecastingPage";
import SalesAnalyticsPage from "./pages/SalesAnalyticsPage";

function App() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  return (
    <div className="app-container">
      <Navigation isAdminLoggedIn={isAdminLoggedIn} />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/recommendation" element={<SmartRecommendationPage />} />
          <Route path="/pest-prediction" element={<PestPredictionPage />} />
          <Route path="/knowledge" element={<KnowledgeHubPage />} />
          <Route path="/safety" element={<SafetyCompliancePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route
            path="/admin/login"
            element={<AdminLoginPage setIsAdminLoggedIn={setIsAdminLoggedIn} />}
          />

          {isAdminLoggedIn && (
            <>
              <Route
                path="/admin/dashboard"
                element={<AdminDashboard setIsAdminLoggedIn={setIsAdminLoggedIn} />}
              />
              <Route path="/admin/analytics" element={<SalesAnalyticsPage />} />
              <Route path="/admin/forecasting" element={<DemandForecastingPage />} />
            </>
          )}
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
