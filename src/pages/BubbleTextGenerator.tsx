
import React from "react";
import BubbleTextGenerator from "@/components/BubbleTextGenerator";
import { Circle } from "lucide-react";

const BubbleTextGeneratorPage = () => {
  return (
    <div className="container py-8 px-4 mx-auto">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <Circle className="h-6 w-6 mr-2 text-primary" />
          <h1 className="text-3xl font-bold">Bubble Text Generator</h1>
        </div>
        
        <div className="prose max-w-none mb-8">
          <h2 className="text-2xl font-semibold mb-4">Create Fancy Bubble Letters Online</h2>
          <p className="text-lg mb-6">
            💬 Transform your text into stylish bubble letters instantly! Our Bubble Text Generator lets you convert regular text into unique, eye-catching bubble fonts for social media, messaging apps, and creative projects. Whether you're looking to stand out on Instagram, Twitter, Discord, or anywhere else, this tool helps you create aesthetic text in just seconds.
          </p>
          
          <div className="flex flex-col mb-6 space-y-2">
            <p>✅ Instant bubble-style text conversion</p>
            <p>✅ Compatible with Instagram, Twitter, Facebook, and more</p>
            <p>✅ Copy & paste with one click</p>
            <p>✅ Completely free & online – no downloads needed</p>
          </div>
        </div>
        
        <BubbleTextGenerator />
        
        <div className="prose max-w-none mt-12">
          <h2 className="text-2xl font-semibold mb-4" id="how-to-use">
            <span className="text-primary">📍</span> How to Use the Bubble Text Generator?
          </h2>
          <h3 className="text-xl font-medium mb-3">Convert Your Text into Bubble Letters in 3 Simple Steps</h3>
          <ol className="mb-8 space-y-2">
            <li><span className="font-medium">1️⃣</span> Enter or paste your text in the input box above.</li>
            <li><span className="font-medium">2️⃣</span> The tool will automatically generate bubble-style text.</li>
            <li><span className="font-medium">3️⃣</span> Click "Copy" and paste it wherever you want – social media, chats, or creative projects!</li>
          </ol>
          
          <h2 className="text-2xl font-semibold mb-4" id="where-to-use">
            <span className="text-primary">📍</span> Where Can You Use Bubble Text?
          </h2>
          <h3 className="text-xl font-medium mb-3">Perfect for Social Media, Chats & Creativity</h3>
          <ul className="mb-8 space-y-2">
            <li><span className="text-primary">🔹</span> <span className="font-medium">Social Media Posts</span> – Make your Instagram, Twitter, and TikTok captions pop!</li>
            <li><span className="text-primary">🔹</span> <span className="font-medium">Discord & Chat Apps</span> – Send cool bubble-style text in WhatsApp, Messenger, and Telegram.</li>
            <li><span className="text-primary">🔹</span> <span className="font-medium">Usernames & Nicknames</span> – Create a stylish username for gaming or online profiles.</li>
            <li><span className="text-primary">🔹</span> <span className="font-medium">Aesthetic Design Projects</span> – Add a playful touch to graphic designs and digital art.</li>
            <li><span className="text-primary">🔹</span> <span className="font-medium">Fun Messages & Notes</span> – Send creative texts that grab attention.</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mb-4" id="features">
            <span className="text-primary">📍</span> Why Choose Our Bubble Text Generator?
          </h2>
          <h3 className="text-xl font-medium mb-3">Features of Our Bubble Text Tool</h3>
          <ul className="mb-8 space-y-2">
            <li><span className="text-success">✔️</span> <span className="font-medium">Real-Time Text Conversion</span> – See bubble letters as you type.</li>
            <li><span className="text-success">✔️</span> <span className="font-medium">Unicode-Based</span> – Works across all platforms without losing formatting.</li>
            <li><span className="text-success">✔️</span> <span className="font-medium">Easy Copy & Paste</span> – No extra effort needed—just generate, copy, and use!</li>
            <li><span className="text-success">✔️</span> <span className="font-medium">100% Free & No Sign-Up Required</span> – Use the tool instantly without hassle.</li>
            <li><span className="text-success">✔️</span> <span className="font-medium">Compatible with All Devices</span> – Works on mobile, tablet, and desktop.</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mb-4" id="examples">
            <span className="text-primary">📍</span> Bubble Text Examples & Variations
          </h2>
          <h3 className="text-xl font-medium mb-3">What Does Bubble Text Look Like?</h3>
          <p className="mb-4">Here are some examples of bubble-style text:</p>
          <ul className="mb-4 space-y-2">
            <li><span className="text-primary">🔹</span> <span className="font-medium">Regular Text:</span> Hello World</li>
            <li><span className="text-primary">🔹</span> <span className="font-medium">Bubble Text:</span> Ⓗⓔⓛⓛⓞ ⓦⓞⓡⓛⓓ</li>
          </ul>
          
          <p className="mb-4">Different variations may include:</p>
          <ul className="mb-8 space-y-2">
            <li><span className="font-medium">Bold Bubble Text:</span> 🅗🅔🅛🅛🅞 🅦🅞🅡🅛🅓</li>
            <li><span className="font-medium">Circled Bubble Letters:</span> ⒽⒺⓁⓁⓄ ⓌⓄⓇⓁⒹ</li>
          </ul>
          <p>Try different styles and have fun creating your unique bubble letters! 🎉</p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">
            <span className="text-primary">📍</span> Try the Bubble Text Generator Now!
          </h2>
          <p className="mb-4">
            Type your text in the box above and instantly turn it into bubble-style letters. Express your creativity and make your messages stand out!
          </p>
        </div>
      </div>
    </div>
  );
};

export default BubbleTextGeneratorPage;
