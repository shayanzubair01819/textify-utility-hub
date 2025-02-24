
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, User } from "lucide-react";

export function BlogGrid() {
  const posts = [
    {
      id: 1,
      title: "How to Format Text for Better Readability",
      excerpt: "Learn the best practices for formatting text to improve readability and engagement...",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      date: "2024-02-20",
      author: "John Doe",
      category: "Formatting Tips",
    },
    // ... Add more blog posts
  ];

  return (
    <div className="grid gap-8">
      {posts.map((post) => (
        <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
          <div className="md:flex">
            <div className="md:w-1/3">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 md:h-full object-cover"
              />
            </div>
            <div className="md:w-2/3">
              <CardHeader>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(post.date).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {post.author}
                  </span>
                </div>
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-primary">{post.category}</span>
                  <Button variant="secondary" size="sm">
                    Read More
                  </Button>
                </div>
              </CardContent>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
