
import React from "react";
import CaseConverterTool from "@/components/CaseConverterTool";
import { Toaster } from "@/components/ui/toaster";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, ArrowUp, ArrowDown, Type, Shuffle } from "lucide-react";
import { useState, useEffect } from "react";

const CaseConverter = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  
  const scrollToEditor = () => {
    const editorElement = document.querySelector(".converter-tool-section");
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
      <div className="converter-tool-section py-8 px-4">
        <div className="max-w-4xl mx-auto mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Case Converter
          </h1>
          <p className="text-xl text-slate-600">
            Convert Text to Uppercase, Lowercase, Title Case & More
          </p>
        </div>
        <CaseConverterTool />
        <Toaster />
      </div>

      {/* Content Sections */}
      <div className="max-w-4xl mx-auto px-4 pb-16 space-y-12">
        {/* Introduction */}
        <section className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Instantly Change the Case of Any Text with Our Free Online Tool
          </h2>
          <p className="text-slate-600 mb-6">
            Whether you need to convert text to UPPERCASE, lowercase, Title Case, or Sentence case, this tool makes formatting text quick and easy. Perfect for students, writers, programmers, and content creators who need properly formatted text without manual effort.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-2 rounded-full">
              <CheckCircle className="h-5 w-5" />
              <span>Convert case instantly</span>
            </div>
            <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-2 rounded-full">
              <CheckCircle className="h-5 w-5" />
              <span>Supports multiple text formats</span>
            </div>
            <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-2 rounded-full">
              <CheckCircle className="h-5 w-5" />
              <span>Copy & paste with one click</span>
            </div>
            <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-2 rounded-full">
              <CheckCircle className="h-5 w-5" />
              <span>100% free & online – no downloads required</span>
            </div>
          </div>
          <Button onClick={scrollToEditor} size="lg" className="bg-blue-600 hover:bg-blue-700">
            Try Case Converter Now
          </Button>
        </section>

        {/* How to Use Section */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Convert Text Case in 3 Simple Steps
          </h2>
          <div className="grid gap-4">
            <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm">
              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold">
                1
              </div>
              <div>
                <h3 className="font-medium text-slate-900 mb-1">Enter or paste your text into the input box.</h3>
                <p className="text-slate-600">Type directly or paste text from any source.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm">
              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold">
                2
              </div>
              <div>
                <h3 className="font-medium text-slate-900 mb-1">Select from the case conversion options:</h3>
                <ul className="pl-5 list-disc text-slate-600 space-y-1">
                  <li><strong>UPPERCASE</strong> – Converts all text to capital letters.</li>
                  <li><strong>lowercase</strong> – Converts all text to small letters.</li>
                  <li><strong>Title Case</strong> – Capitalizes the first letter of each word.</li>
                  <li><strong>Sentence case</strong> – Capitalizes only the first letter of each sentence.</li>
                  <li>And more formatting options...</li>
                </ul>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm">
              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold">
                3
              </div>
              <div>
                <h3 className="font-medium text-slate-900 mb-1">Click "Copy" and paste the formatted text anywhere you need.</h3>
                <p className="text-slate-600">Or download the formatted text as a .txt file.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Need Section */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Why Do You Need a Case Converter?
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                title: "Writers & Bloggers",
                description: "Ensure proper capitalization for articles, essays, and headlines."
              },
              {
                title: "Students & Researchers",
                description: "Format academic papers and assignments easily."
              },
              {
                title: "Social Media Users",
                description: "Create perfectly formatted posts for Instagram, Twitter, and LinkedIn."
              },
              {
                title: "Developers & Coders",
                description: "Convert text for database queries, programming variables, and file names."
              },
              {
                title: "Office & Business Users",
                description: "Properly format reports, presentations, and emails."
              }
            ].map((item, index) => (
              <Card key={index} className="p-4 flex items-start gap-3 bg-white hover:shadow-md transition-shadow">
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <Type className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-medium text-slate-900 mb-1">{item.title}</h3>
                  <p className="text-slate-600">{item.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Features of Our Case Converter Tool
          </h2>
          <div className="grid gap-4">
            {[
              {
                title: "Fast & Instant Formatting",
                description: "No need to manually edit text case."
              },
              {
                title: "Multiple Case Options",
                description: "UPPERCASE, lowercase, Title Case, and Sentence case."
              },
              {
                title: "Easy to Copy & Paste",
                description: "Convert and copy text with just one click."
              },
              {
                title: "Works on All Devices",
                description: "Compatible with desktops, tablets, and mobile phones."
              },
              {
                title: "Completely Free & Online",
                description: "No software downloads or installations needed."
              }
            ].map((feature, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-slate-900">{feature.title}</h3>
                  <p className="text-slate-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Case Difference Section */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            What's the Difference Between Uppercase, Lowercase & Title Case?
          </h2>
          <div className="grid gap-4">
            {[
              {
                title: "UPPERCASE",
                description: "Converts all letters to capital letters.",
                example: "HELLO WORLD",
                icon: <ArrowUp />
              },
              {
                title: "lowercase",
                description: "Converts all letters to small letters.",
                example: "hello world",
                icon: <ArrowDown />
              },
              {
                title: "Title Case",
                description: "Capitalizes the first letter of each word.",
                example: "Hello World",
                icon: <Type />
              },
              {
                title: "Sentence case",
                description: "Capitalizes the first letter of each sentence.",
                example: "Hello world. This is a test.",
                icon: <Type />
              },
              {
                title: "aLtErNaTiNg CaSe",
                description: "Alternates between lowercase and uppercase letters.",
                example: "hElLo WoRlD",
                icon: <Shuffle />
              }
            ].map((format, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm">
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  {format.icon}
                </div>
                <div>
                  <h3 className="font-medium text-slate-900 mb-1">{format.title}</h3>
                  <p className="text-slate-600 mb-2">{format.description}</p>
                  <div className="p-2 bg-slate-50 rounded text-slate-700 font-mono">
                    {format.example}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {[{
              q: "Is this Case Converter free to use?",
              a: "Yes! Our Case Converter is 100% free to use with no limitations, sign-ups, or downloads required."
            }, {
              q: "Can I convert large amounts of text at once?",
              a: "Yes, our tool can handle large text blocks efficiently, though extremely large texts (over 100,000 characters) might experience slight processing delays."
            }, {
              q: "Does the Case Converter work offline?",
              a: "No, our tool requires an internet connection as it runs in your web browser. However, once loaded, it processes your text entirely on your device."
            }, {
              q: "Will this tool change my document formatting?",
              a: "This tool only changes the case of your text. It preserves spaces, line breaks, and punctuation, but doesn't affect other formatting elements like bold, italics, or font styles."
            }].map((faq, index) => (
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
            Try the Case Converter Now!
          </h2>
          <p className="text-slate-600 mb-6">
            Start typing or paste your text and instantly change its case. Easily format your text for social media, emails, coding, or any other use.
          </p>
          <Button onClick={scrollToEditor} size="lg" className="bg-blue-600 hover:bg-blue-700">
            Convert Text Case Now
          </Button>
        </section>
      </div>

      {/* Sticky scroll to top button */}
      {showScrollTop && (
        <button onClick={scrollToTop} className="fixed bottom-6 right-6 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors" aria-label="Scroll to top">
          <ArrowUp className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};

export default CaseConverter;
