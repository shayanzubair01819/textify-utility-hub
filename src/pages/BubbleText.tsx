
import React from "react";
import BubbleTextGenerator from "@/components/BubbleTextGenerator";
import { Toaster } from "@/components/ui/toaster";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, ArrowUp, Circle, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";

const BubbleText = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  
  const scrollToGenerator = () => {
    const generatorElement = document.querySelector(".bubble-generator-section");
    if (generatorElement) {
      generatorElement.scrollIntoView({
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
      {/* Bubble Text Generator Section */}
      <div className="bubble-generator-section py-8 px-4">
        <div className="max-w-4xl mx-auto mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Bubble Text Generator
          </h1>
          <p className="text-xl text-slate-600">
            Create Fancy Bubble Letters Online
          </p>
        </div>
        <BubbleTextGenerator />
        <Toaster />
      </div>

      {/* Content Sections */}
      <div className="max-w-4xl mx-auto px-4 pb-16 space-y-12">
        {/* Introduction */}
        <section className="text-center">
          <p className="text-slate-600 mb-6">
            💬 Transform your text into stylish bubble letters instantly! Our Bubble Text Generator lets you convert regular text into unique, eye-catching bubble fonts for social media, messaging apps, and creative projects. Whether you're looking to stand out on Instagram, Twitter, Discord, or anywhere else, this tool helps you create aesthetic text in just seconds.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-2 rounded-full">
              <CheckCircle className="h-5 w-5" />
              <span>Instant bubble-style text conversion</span>
            </div>
            <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-2 rounded-full">
              <CheckCircle className="h-5 w-5" />
              <span>Compatible with Instagram, Twitter, Facebook, and more</span>
            </div>
            <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-2 rounded-full">
              <CheckCircle className="h-5 w-5" />
              <span>Copy & paste with one click</span>
            </div>
            <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-2 rounded-full">
              <CheckCircle className="h-5 w-5" />
              <span>Completely free & online – no downloads needed</span>
            </div>
          </div>
          <Button onClick={scrollToGenerator} size="lg" className="bg-blue-600 hover:bg-blue-700">
            Try Bubble Text Generator Now
          </Button>
        </section>

        {/* How to Use Section */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            How to Use the Bubble Text Generator?
          </h2>
          <div className="grid gap-4">
            <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm">
              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold">
                1
              </div>
              <div>
                <p className="text-slate-700">Enter or paste your text in the input box above.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm">
              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold">
                2
              </div>
              <div>
                <p className="text-slate-700">The tool will automatically generate bubble-style text.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm">
              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold">
                3
              </div>
              <div>
                <p className="text-slate-700">Click "Copy" and paste it wherever you want – social media, chats, or creative projects!</p>
              </div>
            </div>
          </div>
        </section>

        {/* Where to Use Section */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Perfect for Social Media, Chats & Creativity
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: "Social Media Posts", desc: "Make your Instagram, Twitter, and TikTok captions pop!" },
              { title: "Discord & Chat Apps", desc: "Send cool bubble-style text in WhatsApp, Messenger, and Telegram." },
              { title: "Usernames & Nicknames", desc: "Create a stylish username for gaming or online profiles." },
              { title: "Aesthetic Design Projects", desc: "Add a playful touch to graphic designs and digital art." },
              { title: "Fun Messages & Notes", desc: "Send creative texts that grab attention." }
            ].map((item, index) => (
              <Card key={index} className="p-4 flex items-start gap-3 bg-white hover:shadow-md transition-shadow">
                <MessageCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-slate-900">{item.title}</h3>
                  <p className="text-slate-600">{item.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Features of Our Bubble Text Tool
          </h2>
          <div className="grid gap-4">
            {[
              "Real-Time Text Conversion – See bubble letters as you type.",
              "Unicode-Based – Works across all platforms without losing formatting.",
              "Easy Copy & Paste – No extra effort needed—just generate, copy, and use!",
              "100% Free & No Sign-Up Required – Use the tool instantly without hassle.",
              "Compatible with All Devices – Works on mobile, tablet, and desktop."
            ].map((feature, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <p className="text-slate-700">{feature}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Examples Section */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            What Does Bubble Text Look Like?
          </h2>
          <p className="text-slate-600 mb-4">
            Here are some examples of bubble-style text:
          </p>
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg">
              <div className="mb-2 text-sm font-medium text-slate-500">Regular Text:</div>
              <div className="text-lg">Hello World</div>
            </div>
            <div className="p-4 bg-white rounded-lg">
              <div className="mb-2 text-sm font-medium text-slate-500">Bubble Text:</div>
              <div className="text-lg">Ⓗⓔⓛⓛⓞ ⓦⓞⓡⓛⓓ</div>
            </div>
          </div>
          
          <p className="text-slate-600 mt-6 mb-4">
            Different variations may include:
          </p>
          <div className="space-y-4 mb-6">
            <div className="p-4 bg-white rounded-lg">
              <div className="mb-2 text-sm font-medium text-slate-500">Bold Bubble Text:</div>
              <div className="text-lg">🅗🅔🅛🅛🅞 🅦🅞🅡🅛🅓</div>
            </div>
            <div className="p-4 bg-white rounded-lg">
              <div className="mb-2 text-sm font-medium text-slate-500">Circled Bubble Letters:</div>
              <div className="text-lg">ⒽⒺⓁⓁⓄ ⓌⓄⓇⓁⒹ</div>
            </div>
          </div>
          <p className="text-center text-slate-600 italic">
            Try different styles and have fun creating your unique bubble letters! 🎉
          </p>
        </section>

        {/* FAQ Section */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {[
              {
                q: "Will bubble text work everywhere I paste it?",
                a: "Bubble text uses Unicode characters that are supported by most modern platforms including social media, messaging apps, and websites. However, some very old systems or specific applications might have limited Unicode support."
              },
              {
                q: "Can I use bubble text on Instagram and TikTok?",
                a: "Yes! Bubble text works great on Instagram, TikTok, Twitter, Facebook, and most other social media platforms. It's perfect for making your captions and comments stand out."
              },
              {
                q: "Why do some characters not convert to bubble text?",
                a: "Some special characters, symbols, or non-Latin alphabet characters may not have bubble text equivalents in Unicode. The tool primarily supports English alphabet characters and numbers."
              },
              {
                q: "Is this tool completely free to use?",
                a: "Yes, our Bubble Text Generator is 100% free to use with no limitations or sign-up requirements."
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
            Type your text in the box above and instantly turn it into bubble-style letters. Express your creativity and make your messages stand out!
          </p>
          <Button onClick={scrollToGenerator} size="lg" className="bg-blue-600 hover:bg-blue-700">
            Create Bubble Text Now
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

export default BubbleText;
