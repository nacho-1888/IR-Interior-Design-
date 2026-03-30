import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import Home from "./pages/Home";
import ProjectDetail from "./pages/ProjectDetail";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import Navbar from "./components/Navbar";
import ContactPopup from "./components/ContactPopup";

function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "auto" }); // Instant snap to anchor
        }
      }, 0);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollManager />
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const { pathname } = useLocation();
  const isHomePage = pathname === "/";
  const [isContactOpen, setIsContactOpen] = useState(false);

  const openContact = () => setIsContactOpen(true);

  return (
    <>
      <ContactPopup isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      {isHomePage && <Navbar onContactOpen={openContact} />}
      <Routes>
        <Route path="/" element={<Home onContactOpen={openContact} />} />
        <Route path="/project/:id" element={<ProjectDetail onContactOpen={openContact} />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
      </Routes>
    </>
  );
}

