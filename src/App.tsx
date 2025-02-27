
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Footer } from "@/components/Footer";

// Pages
import Index from "@/pages/Index";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Blog from "@/pages/Blog";
import NotFound from "@/pages/NotFound";
import BoldText from "@/pages/BoldText";
import ItalicText from "@/pages/ItalicText";
import UnderlineText from "@/pages/UnderlineText";
import LinkedInFormatter from "@/pages/LinkedInFormatter";
import CaseConverter from "@/pages/CaseConverter";
import BigTextConverter from "@/pages/BigTextConverter";
import BubbleText from "@/pages/BubbleText";

import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Navigation />
      <div className="min-h-screen flex flex-col">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/bold-text" element={<BoldText />} />
          <Route path="/italic-text" element={<ItalicText />} />
          <Route path="/underline-text" element={<UnderlineText />} />
          <Route path="/linkedin-formatter" element={<LinkedInFormatter />} />
          <Route path="/case-converter" element={<CaseConverter />} />
          <Route path="/big-text-converter" element={<BigTextConverter />} />
          <Route path="/bubble-text" element={<BubbleText />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
