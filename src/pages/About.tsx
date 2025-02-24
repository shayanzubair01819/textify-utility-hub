
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  ScrollText,
  Clock,
  Tag,
  Layout,
  RefreshCcw,
  GraduationCap,
  Share2,
  Code2,
  Briefcase,
  Mail,
} from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="mx-auto max-w-3xl">
          <ScrollText className="mx-auto mb-6 h-16 w-16 text-primary" />
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">
            About Text Tweaker – The Ultimate Text Formatting Toolbox
          </h1>
          <p className="mb-8 text-xl text-muted-foreground">
            Easily format, style & optimize your text with free online tools.
          </p>
          <Link to="/tools">
            <Button size="lg">Start Tweaking Your Text</Button>
          </Link>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="bg-accent/10 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-3xl font-bold">Who We Are</h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <p className="text-lg text-muted-foreground">
                Welcome to Text Tweaker, your go-to platform for free online text formatting tools.
                Whether you need to bold, italicize, underline, or convert text styles, our tools help
                you tweak and modify text effortlessly.
              </p>
              <ul className="space-y-3">
                {[
                  { text: "Instant Formatting – Apply styles with one click.", icon: Clock },
                  { text: "100% Free & Online – No sign-ups or downloads needed.", icon: Tag },
                  { text: "User-Friendly Interface – Easily accessible for everyone.", icon: Layout },
                  {
                    text: "Diverse Tools – From basic formatting to advanced text utilities.",
                    icon: RefreshCcw,
                  },
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <item.icon className="h-5 w-5 text-primary" />
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[Clock, Tag, Layout, RefreshCcw].map((Icon, index) => (
                <div
                  key={index}
                  className="flex aspect-square items-center justify-center rounded-lg bg-accent/20"
                >
                  <Icon className="h-12 w-12 text-primary" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="mb-6 text-3xl font-bold">Our Mission</h2>
            <p className="text-lg text-muted-foreground">
              At Text Tweaker, our mission is simple: to make text formatting quick, easy, and
              accessible for everyone. Whether you're a student, marketer, developer, or business
              professional, our tools help you save time and improve readability with just a few clicks.
            </p>
          </div>
          <div className="flex items-center justify-center">
            <ScrollText className="h-32 w-32 text-primary opacity-20" />
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="bg-accent/10 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-3xl font-bold">Who Can Use Text Tweaker?</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: GraduationCap,
                title: "Students & Writers",
                desc: "Format essays, reports, and articles easily.",
              },
              {
                icon: Share2,
                title: "Social Media Users",
                desc: "Create stylish text for captions, bios, and posts.",
              },
              {
                icon: Code2,
                title: "Developers & Designers",
                desc: "Get clean, formatted text for web and coding.",
              },
              {
                icon: Briefcase,
                title: "Business Professionals",
                desc: "Optimize text for emails, presentations, and documents.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md"
              >
                <item.icon className="mb-4 h-8 w-8 text-primary" />
                <h3 className="mb-2 font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Overview */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="mb-8 text-3xl font-bold">Our Tools at a Glance</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {[
            {
              title: "Basic Formatting",
              features: ["Bold", "Italic", "Underline", "Strikethrough"],
            },
            {
              title: "Case Converters",
              features: ["Uppercase", "Lowercase", "Title Case"],
            },
            {
              title: "Fancy & Decorative Text",
              features: ["Stylish", "Fancy Fonts", "Zalgo Text"],
            },
            {
              title: "Text Utilities",
              features: ["Word Counter", "Remove Spaces", "Line Break Remover"],
            },
          ].map((category, index) => (
            <div
              key={index}
              className="rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md"
            >
              <h3 className="mb-4 text-xl font-semibold">{category.title}</h3>
              <ul className="space-y-2">
                {category.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="text-muted-foreground">
                    • {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-accent/20 to-accent/10 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 text-3xl font-bold">
            Join Thousands of Users Who Trust Text Tweaker
          </h2>
          <p className="mb-8 text-lg text-muted-foreground">
            Every day, writers, marketers, developers, and content creators rely on Text Tweaker to
            enhance their text. Try our tools today and experience effortless text formatting!
          </p>
          <Link to="/tools">
            <Button size="lg" variant="default">
              Try Our Tools Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Contact Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-6 text-3xl font-bold">Need Help or Have Suggestions?</h2>
          <p className="mb-8 text-lg text-muted-foreground">
            We love feedback! If you have any ideas or need support, feel free to get in touch with us.
          </p>
          <Link to="/contact">
            <Button variant="outline" className="gap-2">
              <Mail className="h-4 w-4" />
              Contact Us
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
