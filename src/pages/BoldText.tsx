
import React from "react";
import { TextEditor } from "@/components/BoldTextEditor";
import { Toaster } from "@/components/ui/toaster";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, ListOrdered, ArrowUp, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

const BoldText = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const scrollToEditor = () => {
    const editorElement = document.querySelector(".text-editor-section");
    if (editorElement) {
      editorElement.scrollIntoView({
        behavior: "smooth"
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Text Editor Section */}
      <div className="text-editor-section py-8 px-4">
        <TextEditor />
        <Toaster />
      </div>

      {/* Content Sections */}
      <div className="max-w-4xl mx-auto px-4 pb-16 space-y-12">
        {/* Introduction */}
        <section className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Bold Text Generator – Make Your Text Stand Out
          </h1>
          <p className="text-slate-600 mb-6">
            Looking to bold your text for better emphasis? Our Bold Text Generator lets you transform plain text into bold font styles instantly. Whether you need bold text for social media, blog posts, emails, or web design, this tool helps you create eye-catching and readable content in seconds.
          </p>
          <p className="text-slate-600 mb-8">
            Simply type or paste your text into the box, and our tool will generate bold text variations you can copy and use anywhere!
          </p>
          <Button onClick={scrollToEditor} size="lg" className="bg-blue-600 hover:bg-blue-700">
            Start Converting Text to Bold
          </Button>
        </section>

        {/* Why Use Section */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Why Use Bold Text?
          </h2>
          <div className="grid gap-4">
            {[
              "Highlight Important Words – Emphasize key points in your writing.",
              "Improve Readability – Make content easier to scan and understand.",
              "Boost Engagement – Attract attention on social media platforms.",
              "SEO Benefits – Enhance on-page SEO with better content structure.",
              "Better UX (User Experience) – Help users find important information quickly."
            ].map((text, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <p className="text-slate-700">{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How to Use Section */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            How to Use Our Bold Text Generator?
          </h2>
          <div className="grid gap-4">
            {[
              "Enter your text into the input box.",
              "Select a bold text style from the generated options.",
              "Copy the bold text and paste it anywhere!"
            ].map((text, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm">
                <ListOrdered className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <p className="text-slate-700">{text}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-blue-600 font-medium">
            🚀 No software or downloads required! Works on all devices.
          </p>
        </section>

        {/* Where to Use Section */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Where Can You Use Bold Text?
          </h2>
          <div className="grid gap-4">
            {[
              "Social Media Posts: Make captions & comments stand out",
              "Chat & Messaging Apps: Emphasize important messages",
              "Blog & Article Writing: Highlight key points",
              "Emails & Marketing Copy: Catch readers' attention",
              "Website Content & UI Design: Improve readability & SEO"
            ].map((text, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm">
                <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <p className="text-slate-700">{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Bold Styles Section */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Types of Bold Text Styles We Generate
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              "𝗕𝗼𝗹𝗱 𝗦𝗮𝗻𝘀 (Bold Sans-Serif)",
              "𝐁𝐨𝐥𝐝 𝐒𝐞𝐫𝐢𝐟 (Bold Serif)",
              "𝑩𝒐𝒍𝒅 𝑰𝒕𝒂𝒍𝒊𝒄 (Bold Italic)",
              "𝖡𝗈𝗅𝖽 𝖦𝗈𝗍𝗁𝗂𝖼 (Bold Gothic Font)",
              "𝙱𝚘𝚕𝚍 𝙼𝚘𝚗𝚘𝚜𝚙𝚊𝚌𝚎 (Bold Monospace)"
            ].map((feature, index) => (
              <Card key={index} className="p-4 flex items-start gap-3 bg-white hover:shadow-md transition-shadow">
                <Sparkles className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                <p className="text-slate-700">{feature}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Trust Badge Section */}
        <div className="text-center py-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full">
            <CheckCircle className="h-5 w-5" />
            <span className="font-medium">Used by Thousands Worldwide</span>
          </div>
        </div>

        {/* FAQ Section */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {[
              {
                q: "Is this Bold Text Generator free to use?",
                a: "Yes! Our Bold Text Generator is completely free with no sign-ups required."
              },
              {
                q: "Will the bold text work everywhere?",
                a: "The bold text works on most platforms including social media, messaging apps, and websites. Some platforms might have limitations on certain styles."
              },
              {
                q: "Can I use this on my phone?",
                a: "Yes! The Bold Text Generator is fully responsive and works perfectly on mobile devices."
              },
              {
                q: "How many bold styles can I generate?",
                a: "We offer multiple bold text styles including Sans-Serif, Serif, Italic, Gothic, and Monospace variations."
              }
            ].map((faq, index) => (
              <AccordionItem key={index} value={`faq-${index}`} className="bg-white rounded-lg shadow-sm px-4">
                <AccordionTrigger className="text-left font-medium">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* Final CTA */}
        <section className="text-center py-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Try the Bold Text Generator Now!
          </h2>
          <p className="text-slate-600 mb-6">
            Transform your plain text into eye-catching bold text instantly. Perfect
            for social media, blogs, messages, and more!
          </p>
          <Button onClick={scrollToEditor} size="lg" className="bg-blue-600 hover:bg-blue-700">
            Convert Text to Bold Now
          </Button>
        </section>
      </div>

      {/* Sticky scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};

export default BoldText;
