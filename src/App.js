import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@shopify/polaris/build/esm/styles.css';
import enTranslations from '@shopify/polaris/locales/en.json';
import { AppProvider } from "@shopify/polaris";
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
        <div className="container">
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<Adduser name="add" />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        </div>
        <Footer />
      </Router>
    </div>
    </AppProvider>
  );
}

export default App;