
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import LinkedInFormatter from "./pages/LinkedInFormatter";
import BoldText from "./pages/BoldText";
import ItalicText from "./pages/ItalicText";
import UnderlineText from "./pages/UnderlineText";
import BigTextConverter from "./pages/BigTextConverter";
import CaseConverter from "./pages/CaseConverter";
import BubbleTextGenerator from "./pages/BubbleTextGenerator";
import ArticleFormatter from "./pages/ArticleFormatter";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Blog from "./pages/Blog";
import Navigation from "./components/Navigation";
import { Footer } from "./components/Footer";

const queryClient = new QueryClient();

function App() {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen flex flex-col">
              <Navigation />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/linkedin-formatter" element={<LinkedInFormatter />} />
                  <Route path="/bold-text" element={<BoldText />} />
                  <Route path="/italic-text" element={<ItalicText />} />
                  <Route path="/online-text-underliner" element={<UnderlineText />} />
                  <Route path="/big-text-converter" element={<BigTextConverter />} />
                  <Route path="/case-converter" element={<CaseConverter />} />
                  <Route path="/bubble-text-generator" element={<BubbleTextGenerator />} />
                  <Route path="/article-formatting-tool" element={<ArticleFormatter />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
}

export default App;
