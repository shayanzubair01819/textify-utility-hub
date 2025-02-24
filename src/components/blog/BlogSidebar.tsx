
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { SocialLinks } from "@/components/contact/SocialLinks";

export function BlogSidebar() {
  const categories = [
    { name: "Formatting Tips", count: 12 },
    { name: "SEO", count: 8 },
    { name: "Social Media", count: 10 },
    { name: "LinkedIn", count: 6 },
  ];

  const recentPosts = [
    "10 LinkedIn Formatting Tips",
    "SEO Best Practices",
    "Text Formatting Guide",
    "Social Media Tips",
    "Content Writing Guide",
  ];

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="search"
              placeholder="Search articles..."
              className="w-full pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {categories.map((category) => (
              <li key={category.name} className="flex items-center justify-between">
                <a href="#" className="text-gray-600 hover:text-primary">
                  {category.name}
                </a>
                <span className="text-gray-400 text-sm">{category.count}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {recentPosts.map((post) => (
              <li key={post}>
                <a href="#" className="text-gray-600 hover:text-primary">
                  {post}
                </a>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Newsletter</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            Subscribe to our newsletter for the latest tips and insights.
          </p>
          <Input
            type="email"
            placeholder="Enter your email"
            className="mb-4"
          />
          <Button className="w-full">Subscribe</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Follow Us</CardTitle>
        </CardHeader>
        <CardContent>
          <SocialLinks />
        </CardContent>
      </Card>
    </div>
  );
}
