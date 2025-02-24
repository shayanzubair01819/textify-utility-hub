import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Bold, Italic, Underline, Strikethrough, Type, Sparkles, ChevronRight, Search, GraduationCap, Users, Code, Briefcase, ArrowRight, Wand2, FileText, List, CaseUpper } from "lucide-react";
import { Link } from "react-router-dom";
const Index = () => {
  return <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-slate-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Text Tweaker – Free Online Text Formatting Tools
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 mb-8">
            Easily Format, Style & Optimize Your Text with One Click
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link to="/linkedin-formatter">
              <Button size="lg" className="w-full sm:w-auto">
                Start Tweaking Text <ArrowRight className="ml-2" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Explore All Tools <ChevronRight className="ml-2" />
            </Button>
          </div>
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input type="search" placeholder="Search for a text tool..." className="w-full pl-10 bg-white" />
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-lg text-gray-600 mb-8">
              Welcome to Text Tweaker, your go-to platform for free online text formatting tools.
              Whether you need to bold, italicize, underline, or convert text styles, our tools
              help you tweak and modify text effortlessly. No downloads, no hassle—just quick
              and easy text transformations!
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 bg-slate-50 rounded-lg">
                <Wand2 className="mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">Instant Text Formatting</h3>
                <p className="text-gray-600">Apply bold, italics, strikethrough, and more in one click.</p>
              </div>
              <div className="p-6 bg-slate-50 rounded-lg">
                <CaseUpper className="mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">Case & Style Converters</h3>
                <p className="text-gray-600">Convert text to uppercase, lowercase, title case, or fancy fonts.</p>
              </div>
              <div className="p-6 bg-slate-50 rounded-lg">
                <FileText className="mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">Text Utilities</h3>
                <p className="text-gray-600">Remove extra spaces, count characters, and clean up messy text.</p>
              </div>
              <div className="p-6 bg-slate-50 rounded-lg">
                <Sparkles className="mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">100% Free & Online</h3>
                <p className="text-gray-600">No sign-up required—format your text anytime, anywhere.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tools Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Text Formatting Tools</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[{
            icon: Bold,
            title: "Bold Text Generator",
            desc: "Make text stand out with bold formatting"
          }, {
            icon: Italic,
            title: "Italic Text Generator",
            desc: "Add stylish emphasis to your words"
          }, {
            icon: Underline,
            title: "Underline Text Tool",
            desc: "Highlight key text with underlines"
          }, {
            icon: Strikethrough,
            title: "Strikethrough Text Maker",
            desc: "Cross out words with a single click"
          }, {
            icon: Type,
            title: "Case Converter",
            desc: "Switch between text cases easily"
          }, {
            icon: Sparkles,
            title: "Fancy Text Generator",
            desc: "Create eye-catching, decorative fonts"
          }].map((tool, index) => <Card key={index} className="transition-transform hover:scale-105">
                <CardContent className="p-6 text-center">
                  <tool.icon className="mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold mb-2">{tool.title}</h3>
                  <p className="text-gray-600 mb-4">{tool.desc}</p>
                  <Button variant="secondary" size="sm">
                    Use This Tool
                  </Button>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">How It Works</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[{
            step: "1",
            title: "Choose a Tool",
            desc: "Select from the available text formatting options"
          }, {
            step: "2",
            title: "Enter Text",
            desc: "Paste or type your text into the input box"
          }, {
            step: "3",
            title: "Apply Formatting",
            desc: "Click the format button to tweak your text"
          }, {
            step: "4",
            title: "Copy & Use",
            desc: "Copy the formatted text and use it anywhere"
          }].map((step, index) => <div key={index} className="relative">
                <div className="bg-slate-50 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-primary font-bold">
                  {step.step}
                </div>
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Who Can Use Text Tweaker?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[{
            icon: GraduationCap,
            title: "Students & Writers",
            desc: "Format essays, articles, and reports easily"
          }, {
            icon: Users,
            title: "Social Media Users",
            desc: "Create bold, stylish text for social media"
          }, {
            icon: Code,
            title: "Developers & Designers",
            desc: "Get clean, formatted text for web and coding"
          }, {
            icon: Briefcase,
            title: "Business Professionals",
            desc: "Format emails, reports, and presentations"
          }].map((audience, index) => <div key={index} className="text-center p-6 bg-white rounded-lg shadow-sm">
                <audience.icon className="mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">{audience.title}</h3>
                <p className="text-gray-600">{audience.desc}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* More Tools Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Explore More Tools</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-slate-50 rounded-lg">
              <List className="mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-2">Basic Formatting</h3>
              <ul className="text-gray-600 space-y-2">
                <li>Bold</li>
                <li>Italic</li>
                <li>Underline</li>
                <li>Strikethrough</li>
              </ul>
            </div>
            <div className="p-6 bg-slate-50 rounded-lg">
              <Type className="mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-2">Case Converters</h3>
              <ul className="text-gray-600 space-y-2">
                <li>Uppercase</li>
                <li>Lowercase</li>
                <li>Title Case</li>
              </ul>
            </div>
            <div className="p-6 bg-slate-50 rounded-lg">
              <Sparkles className="mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-2">Fancy & Decorative</h3>
              <ul className="text-gray-600 space-y-2">
                <li>Fancy Text</li>
                <li>Zalgo</li>
                <li>Bubble Text</li>
              </ul>
            </div>
            <div className="p-6 bg-slate-50 rounded-lg">
              <FileText className="mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-2">Text Utilities</h3>
              <ul className="text-gray-600 space-y-2">
                <li>Word Counter</li>
                <li>Remove Spaces</li>
                <li>Line Break Remover</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Start Tweaking Your Text Now!</h2>
          <div className="space-y-4">
            <Link to="/linkedin-formatter">
              <Button size="lg" className="w-full sm:w-auto">
                Try Our Tools Now <ArrowRight className="ml-2" />
              </Button>
            </Link>
            <div>
              <Button variant="ghost" size="lg" className="w-full sm:w-auto">
                Want a New Tool? Suggest One Here!
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      
    </div>;
};
export default Index;