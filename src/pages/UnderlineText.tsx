
import React from "react";
import { UnderlineTextEditor } from "@/components/UnderlineTextEditor";
import { Toaster } from "@/components/ui/toaster";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, ListOrdered, Underline, ArrowUp, Sparkles, Bold, Italic } from "lucide-react";
import { useState, useEffect } from "react";

const UnderlineText = () => {
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
        <UnderlineTextEditor />
        <Toaster />
      </div>

      {/* Content Sections */}
      <div className="max-w-4xl mx-auto px-4 pb-16 space-y-12">
        {/* Introduction */}
        <section className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Convert Text to Underlined Style with Our Free Online Tool
          </h2>
          <p className="text-slate-600 mb-6">
            Looking for a quick way to underline text online? Our Underline Text Generator makes it easy to convert plain text into underlined styles with a single click. Whether you're formatting text for social media, blogs, emails, or presentations, this tool ensures your words stand out effortlessly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 px-4 py-2 rounded-full">
              <CheckCircle className="h-5 w-5" />
              <span>Generate underlined text instantly</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 px-4 py-2 rounded-full">
              <CheckCircle className="h-5 w-5" />
              <span>Copy & paste underlined text anywhere</span>
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
            How to Use the Underline Text Converter?
          </h2>
          <div className="grid gap-4">
            {[
              "Enter your text in the input box above.",
              "The tool will instantly convert it into underlined text styles.",
              "Click \"Copy\" to paste it anywhere—on social media, blogs, emails, and more!"
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
            Where Can You Use Underlined Text?
          </h2>
          <div className="grid gap-4">
            {[
              "Social Media – Enhance posts on Instagram, Twitter, Facebook, LinkedIn, and TikTok.",
              "Messaging Apps – Use underlined text in WhatsApp, Messenger, Telegram, and Discord.",
              "Blog Posts & Articles – Format your content with underlined headings & key points.",
              "Emails & Documents – Add emphasis to important words in reports & presentations."
            ].map((text, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm">
                <Underline className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <p className="text-slate-700">{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Why Use Our Underline Text Generator?
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              "Fast & Simple – Underline words with just one click.",
              "Copy & Paste Anywhere – Works on social media, blogs, emails, and more.",
              "Improves Readability – Helps highlight key points naturally.",
              "100% Free & Online – No registration or downloads needed.",
              "Multiple Font Options – Choose the style that fits your needs"
            ].map((feature, index) => (
              <Card key={index} className="p-4 flex items-start gap-3 bg-white hover:shadow-md transition-shadow">
                <Sparkles className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                <p className="text-slate-700">{feature}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Comparison Section */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Underline vs. Bold & Italic – What's the Difference?
          </h2>
          <div className="grid gap-4">
            <div className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm">
              <Underline className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold mb-1">Underline Text</p>
                <p className="text-slate-700">Used to highlight links, key phrases, or important sections.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm">
              <Bold className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold mb-1">Bold Text</p>
                <p className="text-slate-700">Adds emphasis and makes text stand out in headings or important messages.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm">
              <Italic className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold mb-1">Italic Text</p>
                <p className="text-slate-700">Used for styling quotes, book titles, or emphasis in sentences.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm">
              <div className="flex gap-1">
                <Bold className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <Underline className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              </div>
              <div>
                <p className="font-semibold mb-1">Mix & Match Styles</p>
                <p className="text-slate-700">Example: Bold & Underlined Text for extra impact!</p>
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
                q: "Is this underline text generator free to use?",
                a: "Yes! Our underline text generator is 100% free with no sign-ups, subscriptions, or downloads required."
              },
              {
                q: "Will underlined text work in social media posts?",
                a: "Yes, our underlined text works across most social media platforms. Simply copy the underlined text and paste it into your posts."
              },
              {
                q: "Can I combine underline with other text styles?",
                a: "Absolutely! You can combine underline with bold, italic, and other styles for maximum emphasis and customization."
              },
              {
                q: "Does this work on mobile devices?",
                a: "Yes! Our underline text generator is fully responsive and works perfectly on both desktop and mobile devices."
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
            Try the Underline Text Generator Now!
          </h2>
          <p className="text-slate-600 mb-6">
            Start typing in the box above and get your underlined text instantly. 
            Copy and use it anywhere online! 🚀
          </p>
          <Button onClick={scrollToEditor} size="lg" className="bg-blue-600 hover:bg-blue-700">
            Create Underlined Text Now
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

export default UnderlineText;
