
import { TextEditor } from "@/components/LinkedInTextEditor";
import { Toaster } from "@/components/ui/toaster";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  CheckCircle,
  ListOrdered,
  LinkedinIcon,
  ArrowUp,
  Sparkles,
} from "lucide-react";
import { useState, useEffect } from "react";

const LinkedInFormatter = () => {
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
      {/* Header Section */}
      <div className="text-center py-8 px-4 bg-white border-b">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-2">
          LinkedIn Text Formatter – Style & Format Text for LinkedIn Posts
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Easily Format, Style & Optimize Your LinkedIn Text with One Click
        </p>
      </div>

      {/* Text Editor Section */}
      <div className="text-editor-section py-8 px-4">
        <TextEditor />
        <Toaster />
      </div>

      {/* Content Sections */}
      <div className="max-w-4xl mx-auto px-4 pb-16 space-y-12">
        {/* Introduction */}
        <section className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Easily Format Text for LinkedIn with Our Free Tool
          </h2>
          <p className="text-slate-600 mb-6">
            The LinkedIn Text Formatter lets you bold, italicize, underline, and
            style your text for LinkedIn posts, comments, and messages. Stand out
            in your professional network with perfectly formatted text that grabs
            attention.
          </p>
          <p className="text-slate-600 mb-8">
            No complicated setup—just type, format, and copy! This tool helps
            improve readability, engagement, and impact on LinkedIn.
          </p>
          <Button
            onClick={scrollToEditor}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700"
          >
            Start Formatting Now
          </Button>
        </section>

        {/* Why Use Section */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Why Use a LinkedIn Text Formatter?
          </h2>
          <div className="grid gap-4">
            {[
              "Increase Engagement – Highlight key points to keep your audience hooked.",
              "Make Posts Stand Out – Professionally formatted text attracts more views.",
              "Enhance Readability – Use clear formatting for better communication.",
              "No Extra Effort Needed – Format text in seconds without coding.",
              "100% Free & Online – No sign-ups, no downloads—just quick and easy formatting.",
            ].map((text, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm"
              >
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <p className="text-slate-700">{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How to Use Section */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            How to Use the LinkedIn Text Formatter?
          </h2>
          <div className="grid gap-4">
            {[
              "Enter Your Text – Type or paste your content into the input box.",
              "Apply Formatting – Select bold, italics, underline, or special styles.",
              "Copy & Use – Click "Copy" and paste it directly into LinkedIn.",
            ].map((text, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm"
              >
                <ListOrdered className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <p className="text-slate-700">{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Best Uses Section */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Best Uses for LinkedIn Text Formatting
          </h2>
          <div className="grid gap-4">
            {[
              "LinkedIn Posts – Highlight key points & improve engagement.",
              "Comments & Replies – Emphasize important insights in discussions.",
              "Profile Headlines – Make your profile stand out with formatted text.",
              "Direct Messages (DMs) – Grab attention with bold & stylish text.",
              "Company Announcements – Format corporate updates for clarity.",
            ].map((text, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm"
              >
                <LinkedinIcon className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <p className="text-slate-700">{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            LinkedIn Text Formatter Features
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              "Supports Bold, Italics, Underline & Strikethrough",
              "One-Click Copy to Clipboard",
              "No Logins, No Downloads – 100% Free",
              "Works on Desktop & Mobile",
              "Perfect for LinkedIn, Facebook, Twitter & More",
            ].map((feature, index) => (
              <Card
                key={index}
                className="p-4 flex items-start gap-3 bg-white hover:shadow-md transition-shadow"
              >
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
            <span className="font-medium">Trusted by Professionals Worldwide</span>
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
                q: "Is this LinkedIn Text Formatter free to use?",
                a: "Yes! This tool is 100% free with no sign-ups or downloads required.",
              },
              {
                q: "Will the formatted text work on LinkedIn?",
                a: "Yes! The text styles are supported by LinkedIn and appear correctly in posts, comments, and messages.",
              },
              {
                q: "Can I use this for other social media platforms?",
                a: "Absolutely! You can copy the formatted text and use it on Facebook, Instagram, Twitter, and more.",
              },
              {
                q: "Does this work on mobile devices?",
                a: "Yes! The tool is fully responsive and works on both desktop and mobile devices.",
              },
            ].map((faq, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="bg-white rounded-lg shadow-sm px-4"
              >
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
            Try the LinkedIn Text Formatter Now!
          </h2>
          <p className="text-slate-600 mb-6">
            Boost your LinkedIn engagement today! Use the LinkedIn Text Formatter to
            create eye-catching, formatted content instantly.
          </p>
          <Button
            onClick={scrollToEditor}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700"
          >
            Format LinkedIn Text Now
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

export default LinkedInFormatter;

