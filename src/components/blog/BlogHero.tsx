
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function BlogHero() {
  return (
    <section className="bg-gradient-to-b from-white to-slate-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
          Text Tweaker Blog – Formatting Tips & SEO Insights
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Explore expert tips, guides, and tools to perfect your text formatting and online presence.
        </p>
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="search"
              placeholder="Search articles..."
              className="w-full pl-10 bg-white"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
