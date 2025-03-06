import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ContactForm } from "@/components/contact/ContactForm";
import { FAQ } from "@/components/contact/FAQ";
import { SocialLinks } from "@/components/contact/SocialLinks";
import { Button } from "@/components/ui/button";
import { Mail, MessageSquare, Globe } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

const Contact = () => {
  useSEO({
    title: "Contact Text Tweaker - Get Support & Send Feedback",
    description: "Have questions or suggestions about our text formatting tools? Contact the Text Tweaker team for support, feedback, or partnership opportunities.",
    canonicalPath: "/contact",
    schemaPath: "/schemas/contact-schema.json"
  });

  const scrollToForm = () => {
    const formElement = document.getElementById("contact-form");
    formElement?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-12 max-w-7xl">
      {/* Hero Section */}
      <section className="text-center py-12 space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Get in Touch with Text Tweaker
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Have questions, feedback, or suggestions? We'd love to hear from you!
        </p>
        <Button onClick={scrollToForm} size="lg" className="mt-4">
          Send a Message
        </Button>
      </section>

      {/* Quick Contact Information */}
      <section className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Email
            </CardTitle>
          </CardHeader>
          <CardContent>
            <a
              href="mailto:support@texttweaker.com"
              className="text-primary hover:underline"
            >
              support@texttweaker.com
            </a>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Website
            </CardTitle>
          </CardHeader>
          <CardContent>
            <a
              href="https://www.texttweaker.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              www.texttweaker.com
            </a>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Response Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Within 24-48 hours</p>
          </CardContent>
        </Card>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="scroll-mt-16">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Send Us a Message</CardTitle>
            <CardDescription>
              We value your feedback! Whether you have a question, suggestion, or
              need support, fill out the form below, and our team will get back to
              you as soon as possible.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ContactForm />
          </CardContent>
        </Card>
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* Social Links Section */}
      <SocialLinks />

      {/* Final CTA */}
      <section className="text-center py-12 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 rounded-lg">
        <h2 className="text-3xl font-bold mb-6">
          Need a Text Tool? Start Tweaking Now!
        </h2>
        <Button size="lg" variant="secondary" asChild>
          <a href="/">Explore All Tools</a>
        </Button>
      </section>
    </div>
  );
};

export default Contact;
