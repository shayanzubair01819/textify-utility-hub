
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function FeaturedPosts() {
  const featuredPosts = [
    {
      id: 1,
      title: "10 LinkedIn Formatting Tips to Make Your Profile Stand Out",
      excerpt: "Learn how to format your LinkedIn profile for maximum impact...",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      category: "LinkedIn Tips",
    },
    {
      id: 2,
      title: "The Ultimate Guide to Text Formatting for Social Media",
      excerpt: "Master the art of formatting your social media posts...",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      category: "Social Media",
    },
    {
      id: 3,
      title: "SEO-Friendly Text Formatting: Best Practices",
      excerpt: "Discover how proper text formatting can boost your SEO...",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      category: "SEO",
    },
  ];

  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Articles</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredPosts.map((post) => (
          <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <CardHeader>
              <span className="text-sm text-primary mb-2">{post.category}</span>
              <h3 className="text-xl font-semibold line-clamp-2">{post.title}</h3>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
              <Button variant="secondary" className="w-full">
                Read More <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
