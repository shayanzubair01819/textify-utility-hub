
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
      {/* Hero Section with improved gradient and spacing */}
      <section className="relative overflow-hidden bg-gradient-to-b from-accent/30 to-background py-24">
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <ScrollText className="mx-auto mb-8 h-20 w-20 animate-fadeIn text-primary opacity-90" />
            <h1 className="animate-fadeIn bg-gradient-to-r from-primary via-primary/90 to-primary/80 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl">
              About Text Tweaker
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-xl text-muted-foreground">
              Your ultimate toolbox for text formatting and style optimization
            </p>
            <Link to="/tools" className="mt-8 inline-block">
              <Button size="lg" className="shadow-lg hover:shadow-xl">
                Start Tweaking Your Text
              </Button>
            </Link>
          </div>
        </div>
        <div className="absolute inset-0 -z-10 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent via-background to-background opacity-90" />
        </div>
      </section>

      {/* Who We Are Section with cards */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight sm:text-4xl">
            Who We Are
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-6 rounded-2xl bg-card p-8 shadow-lg">
              <p className="text-lg leading-relaxed text-muted-foreground">
                Welcome to Text Tweaker, your go-to platform for free online text formatting tools.
                Whether you need to bold, italicize, underline, or convert text styles, our tools help
                you tweak and modify text effortlessly.
              </p>
              <ul className="space-y-4">
                {[
                  { text: "Instant Formatting – Apply styles with one click.", icon: Clock },
                  { text: "100% Free & Online – No sign-ups or downloads needed.", icon: Tag },
                  { text: "User-Friendly Interface – Easily accessible for everyone.", icon: Layout },
                  {
                    text: "Diverse Tools – From basic formatting to advanced text utilities.",
                    icon: RefreshCcw,
                  },
                ].map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-4 rounded-lg bg-background/50 p-4 shadow-sm transition-all hover:bg-accent/5"
                  >
                    <item.icon className="h-6 w-6 shrink-0 text-primary" />
                    <span className="text-foreground">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[Clock, Tag, Layout, RefreshCcw].map((Icon, index) => (
                <div
                  key={index}
                  className="group flex aspect-square items-center justify-center rounded-2xl bg-card p-8 shadow-lg transition-all hover:shadow-xl"
                >
                  <Icon className="h-16 w-16 text-primary transition-all group-hover:scale-110" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement with gradient background */}
      <section className="bg-gradient-to-b from-background via-accent/5 to-background py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 md:grid-cols-2">
            <div className="flex flex-col justify-center">
              <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">Our Mission</h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                At Text Tweaker, our mission is simple: to make text formatting quick, easy, and
                accessible for everyone. Whether you're a student, marketer, developer, or business
                professional, our tools help you save time and improve readability with just a few
                clicks.
              </p>
            </div>
            <div className="flex items-center justify-center">
              <ScrollText className="h-48 w-48 text-primary opacity-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience with hover effects */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight sm:text-4xl">
            Who Can Use Text Tweaker?
          </h2>
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
                className="group rounded-2xl border bg-card p-8 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <item.icon className="mb-6 h-12 w-12 text-primary transition-all group-hover:scale-110" />
                <h3 className="mb-3 text-xl font-semibold">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Overview with gradient cards */}
      <section className="bg-gradient-to-b from-background via-accent/5 to-background py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight sm:text-4xl">
            Our Tools at a Glance
          </h2>
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
                className="group rounded-2xl bg-gradient-to-br from-card to-card/95 p-8 shadow-lg transition-all hover:shadow-xl"
              >
                <h3 className="mb-6 text-2xl font-semibold">{category.title}</h3>
                <ul className="space-y-3">
                  {category.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center gap-2 text-muted-foreground"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with enhanced gradient */}
      <section className="relative overflow-hidden bg-gradient-to-r from-accent/20 via-accent/10 to-accent/5 py-20">
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h2 className="mx-auto mb-6 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
            Join Thousands of Users Who Trust Text Tweaker
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
            Every day, writers, marketers, developers, and content creators rely on Text Tweaker to
            enhance their text. Try our tools today and experience effortless text formatting!
          </p>
          <Link to="/tools">
            <Button size="lg" className="shadow-lg hover:shadow-xl">
              Try Our Tools Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Contact Section with card design */}
      <section className="py-20">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <div className="rounded-2xl bg-card p-8 shadow-lg">
            <h2 className="mb-6 text-3xl font-bold">Need Help or Have Suggestions?</h2>
            <p className="mb-8 text-lg text-muted-foreground">
              We love feedback! If you have any ideas or need support, feel free to get in touch with
              us.
            </p>
            <Link to="/contact">
              <Button variant="outline" className="shadow-sm hover:shadow-md">
                <Mail className="mr-2 h-4 w-4" />
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

