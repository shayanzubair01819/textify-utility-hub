import React, { useState, useEffect } from "react";
import BubbleTextGeneratorTool from "@/components/BubbleTextGeneratorTool";
import { Toaster } from "@/components/ui/toaster";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, ListOrdered, Circle, ArrowUp, Sparkles, Square, Hash } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

const BubbleTextGenerator = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useSEO({
    title: "Bubble Text Generator - Create Circle Text Online Free | Text Tweaker",
    description: "Transform regular text into fun bubble and circle letters with our free Bubble Text Generator. Perfect for social media profiles, posts, and usernames. No sign-up needed!",
    canonicalPath: "/bubble-text",
    schemaPath: "/schemas/bubble-text-schema.json"
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToEditor = () => {
    const editorElement = document.querySelector(".text-editor-section");
    if (editorElement) {
      editorElement.scrollIntoView({ behavior: "smooth" });
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
      {/* Header Section */}
      <div className="w-full bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto py-12 px-4 text-center">
          <h1 className="text-3xl font-bold text-slate-700 mb-4">
            Bubble Text Generator - Create Stylish Circle Text Online
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Transform your regular text into fun bubble letters and circular characters instantly. Perfect for social media, usernames, and creative text styling!
          </p>
        </div>
      </div>

      {/* Text Editor Section */}
      <div className="text-editor-section py-8 px-4">
        <BubbleTextGeneratorTool />
        <Toaster />
      </div>

      {/* Content Sections */}
      <div className="max-w-4xl mx-auto px-4 pb-16 space-y-12">
        {/* Introduction */}
        <section className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Create Beautiful Bubble Text with Our Free Online Tool
          </h2>
          <p className="text-slate-600 mb-6">
            Looking for a fun way to make your text stand out? Our Bubble Text Generator transforms ordinary text into eye-catching bubble letters and circular characters. Perfect for social media posts, profile names, comments, or anywhere you want your text to pop!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 px-4 py-2 rounded-full">
              <CheckCircle className="h-5 w-5" />
              <span>Multiple bubble styles</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 px-4 py-2 rounded-full">
              <CheckCircle className="h-5 w-5" />
              <span>Unicode compatible</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 px-4 py-2 rounded-full">
              <CheckCircle className="h-5 w-5" />
              <span>100% Free to use</span>
            </div>
          </div>
          <Button onClick={scrollToEditor} size="lg" className="bg-blue-600 hover:bg-blue-700">
            Try Bubble Text Now
          </Button>
        </section>

        {/* How to Use Section */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            How to Use the Bubble Text Generator
          </h2>
          <div className="grid gap-4">
            {[
              "Type or paste your regular text into the input box.",
              "Choose your preferred bubble style from the available options.",
              "Watch as your text instantly transforms into bubble characters.",
              "Copy the result with one click or download as a text file."
            ].map((text, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm">
                <ListOrdered className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <p className="text-slate-700">{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Where to Use Section */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Where Can You Use Bubble Text?
          </h2>
          <div className="grid gap-4">
            {[
              "Social Media – Make your Instagram bio, Twitter name, or Facebook posts stand out.",
              "User Names – Create unique usernames for gaming, forums, or online platforms.",
              "Messages & Comments – Add fun styling to your text messages and comments.",
              "Creative Projects – Enhance presentations, digital art, or graphic designs."
            ].map((text, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm">
                <Circle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <p className="text-slate-700">{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Why Use Our Bubble Text Generator?
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              "Multiple Bubble Styles – Choose from circle, filled, square, and more styles",
              "Instant Transformation – See your text change in real-time as you type",
              "One-Click Copy – Easily copy your bubble text to use anywhere",
              "Download Option – Save your bubble text as a .txt file",
              "Character Counter – Track the length of your text",
              "Mobile Friendly – Works perfectly on smartphones and tablets"
            ].map((feature, index) => (
              <Card key={index} className="p-4 flex items-start gap-3 bg-white hover:shadow-md transition-shadow">
                <Sparkles className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                <p className="text-slate-700">{feature}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Bubble Text Styles */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Available Bubble Text Styles
          </h2>
          <div className="grid gap-4">
            <div className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm">
              <Circle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold mb-1">Bubble Style</p>
                <p className="text-slate-700">Classic circled characters: ⓐⓑⓒ</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm">
              <Circle className="h-5 w-5 fill-current text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold mb-1">Filled Bubble Style</p>
                <p className="text-slate-700">Solid circled characters: 🅐🅑🅒</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm">
              <Square className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold mb-1">Square Style</p>
                <p className="text-slate-700">Squared characters: 🄰🄱🄲</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm">
              <Hash className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold mb-1">Double-Struck Style</p>
                <p className="text-slate-700">Mathematical double-struck characters: 𝔸𝔹ℂ</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {[
              {
                q: "Is the Bubble Text Generator free to use?",
                a: "Yes! Our Bubble Text Generator is 100% free with no limitations. You can use it as many times as you want without any cost."
              },
              {
                q: "Will my bubble text work everywhere online?",
                a: "Bubble text works on most modern platforms and websites that support Unicode characters. However, some older systems or specific platforms might have limited support for special characters."
              },
              {
                q: "Can I use bubble text in my Instagram bio?",
                a: "Yes! Bubble text is perfect for making your Instagram bio stand out. Simply generate your text, copy it, and paste it into your bio section."
              },
              {
                q: "Why are some characters not converting to bubble text?",
                a: "The Unicode standard doesn't include bubble versions for every possible character. Most letters and numbers work well, but some special characters, symbols, or non-Latin alphabets might not have bubble equivalents."
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
            Try the Bubble Text Generator Now!
          </h2>
          <p className="text-slate-600 mb-6">
            Ready to transform your ordinary text into fun bubble characters? Start typing in the editor above and see the magic happen instantly!
          </p>
          <Button onClick={scrollToEditor} size="lg" className="bg-blue-600 hover:bg-blue-700">
            Create Bubble Text Now
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

export default BubbleTextGenerator;
