
import React from "react"
import { Link } from "react-router-dom"
import { Mail, Send, MapPin, Phone } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SocialLinks } from "./contact/SocialLinks"

export function Footer() {
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    // Add newsletter subscription logic here
    console.log("Newsletter subscription submitted")
  }

  return (
    <footer className="bg-gray-900 text-gray-100 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12 grid gap-8 md:gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand Section */}
        <div className="space-y-4">
          <Link to="/" className="text-2xl font-bold hover:text-primary transition-colors">
            Text Tweaker
          </Link>
          <p className="text-gray-400 text-sm leading-relaxed">
            Text Tweaker is your go-to platform for quick and easy text formatting tools. 
            Optimize your text for social media, SEO, and professional use—all in one place!
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 gap-8 md:gap-4">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Tools & Features</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/linkedin-formatter" className="text-gray-400 hover:text-white transition-colors">
                  LinkedIn Text Formatter
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-white transition-colors">
                  Bold Text Generator
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-white transition-colors">
                  Italic Text Maker
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-white transition-colors">
                  Underline Text Tool
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Contact Us</h3>
          <ul className="space-y-3">
            <li className="flex items-center gap-2 text-gray-400">
              <Mail className="h-4 w-4" />
              <a href="mailto:support@texttweaker.com" className="hover:text-white transition-colors">
                support@texttweaker.com
              </a>
            </li>
            <li className="flex items-center gap-2 text-gray-400">
              <MapPin className="h-4 w-4" />
              <span>Worldwide Service</span>
            </li>
          </ul>
          <div className="pt-4">
            <SocialLinks />
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Stay Updated</h3>
          <p className="text-sm text-gray-400">
            Get the latest formatting tools & tips directly in your inbox!
          </p>
          <form onSubmit={handleSubscribe} className="space-y-2">
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
              />
              <Button type="submit" variant="secondary" size="icon">
                <Send className="h-4 w-4" />
                <span className="sr-only">Subscribe</span>
              </Button>
            </div>
            <p className="text-xs text-gray-500">
              We respect your privacy. No spam.
            </p>
          </form>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center text-sm text-gray-400">
            <p>© {new Date().getFullYear()} Text Tweaker. All rights reserved.</p>
            <div className="mt-2 space-x-4">
              <Link to="#" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <span>|</span>
              <Link to="#" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
