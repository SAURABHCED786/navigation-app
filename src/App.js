import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@shopify/polaris/build/esm/styles.css";
import enTranslations from "@shopify/polaris/locales/en.json";
import { AppProvider, Page } from "@shopify/polaris";
import Header from "./pages/Header";
import Footer from "./pages/Footer";
import Dashboard from "./pages/Dashboard";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Home from "./pages/Home";
import Adduser from "./pages/Adduser";
function App() {
  return (
    <AppProvider i18n={enTranslations}>
      <div className="App">
        <Router>
          <Header />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/add" element={<Adduser name="Add" />} />
            <Route path="/:id" element={<Adduser />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
          <Footer />
        </Router>
      </div>
    </AppProvider>
  );
}

export default App;
