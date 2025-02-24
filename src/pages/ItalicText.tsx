
import React from "react";
import { ItalicTextEditor } from "@/components/ItalicTextEditor";
import { Toaster } from "@/components/ui/toaster";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, ListOrdered, TextItalic, ArrowUp, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

const ItalicText = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

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
      {/* Text Editor Section */}
      <div className="text-editor-section py-8 px-4">
        <ItalicTextEditor />
        <Toaster />
      </div>

      {/* Content Sections */}
      <div className="max-w-4xl mx-auto px-4 pb-16 space-y-12">
        {/* Introduction */}
        <section className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Convert Text to Italics with Our Free Online Tool
          </h2>
          <p className="text-slate-600 mb-6">
            Want to make your text more expressive and stylish? Use our Italic Text Generator to transform 
            plain text into slanted, elegant font styles in seconds. Whether you're formatting content for 
            social media, blogs, websites, or messaging apps, this tool helps your words stand out effortlessly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 px-4 py-2 rounded-full">
              <CheckCircle className="h-5 w-5" />
              <span>Copy & paste italicized text anywhere</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 px-4 py-2 rounded-full">
              <CheckCircle className="h-5 w-5" />
              <span>Works on all social platforms</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 px-4 py-2 rounded-full">
              <CheckCircle className="h-5 w-5" />
              <span>100% Free & Online</span>
            </div>
          </div>
          <Button onClick={scrollToEditor} size="lg" className="bg-blue-600 hover:bg-blue-700">
            Start Converting Text
          </Button>
        </section>

        {/* How to Use Section */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            How to Use the Italic Text Converter?
          </h2>
          <div className="grid gap-4">
            {[
              "Type or paste your text into the input box.",
              "The tool will instantly convert it into italicized font styles.",
              "Click \"Copy\" to use the italic text anywhere—social media, emails, blog posts, and more!"
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
            Where Can You Use Italicized Text?
          </h2>
          <div className="grid gap-4">
            {[
              "Social Media – Use italics in Instagram bios, Twitter posts, Facebook updates, and LinkedIn profiles.",
              "Messaging Apps – Make your text more stylish on WhatsApp, Telegram, Discord, and Messenger.",
              "Blog Posts & Articles – Improve formatting and structure by italicizing key phrases.",
              "Emails & Documents – Add a professional touch to your email communication and reports."
            ].map((text, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm">
                <TextItalic className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <p className="text-slate-700">{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Why Use Our Italic Text Generator?
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              "Quick & Easy – Get italic text in seconds",
              "Works Everywhere – Use on any platform",
              "Enhance Readability – Make content engaging",
              "Free Forever – No sign-ups required",
              "Multiple Styles – Choose from various fonts"
            ].map((feature, index) => (
              <Card key={index} className="p-4 flex items-start gap-3 bg-white hover:shadow-md transition-shadow">
                <Sparkles className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                <p className="text-slate-700">{feature}</p>
              </Card>
            ))}
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
                q: "What's the difference between Italic and Bold text?",
                a: "Italic text is used for emphasis, book titles, or foreign words, while Bold text is used to highlight important points or headings. You can combine both to create visually striking content!"
              },
              {
                q: "Will the italicized text work everywhere?",
                a: "Yes! Our italic text generator creates special characters that work across most platforms including social media, messaging apps, and documents."
              },
              {
                q: "Is this tool completely free?",
                a: "Yes! Our Italic Text Generator is 100% free with no sign-ups or downloads required."
              },
              {
                q: "Can I use this on my mobile device?",
                a: "Absolutely! The tool is fully responsive and works perfectly on both desktop and mobile devices."
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
            Try the Italic Text Generator Now!
          </h2>
          <p className="text-slate-600 mb-6">
            Start typing in the box above and get your custom italicized text instantly. 
            Copy and use it anywhere online!
          </p>
          <Button onClick={scrollToEditor} size="lg" className="bg-blue-600 hover:bg-blue-700">
            Create Italic Text Now
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

export default ItalicText;
