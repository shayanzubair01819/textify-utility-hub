
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Menu,
  Search,
  X,
  Type,
  Wand2,
  FileText,
  ScrollText,
  Home,
  AlignLeft,
  Mail,
  HelpCircle,
  BookOpen,
} from "lucide-react";

const toolsCategories = [
  {
    title: "Basic Formatting",
    tools: [
      { name: "Bold Text", path: "/bold-text" },
      { name: "Italic Text", path: "/italic-text" },
      { name: "Underline Text", path: "/underline-text" },
      { name: "Strikethrough Text", path: "/strikethrough-text" },
    ],
    icon: Type,
  },
  {
    title: "Case Converters",
    tools: [
      { name: "Uppercase Text", path: "/uppercase-text" },
      { name: "Lowercase Text", path: "/lowercase-text" },
      { name: "Title Case", path: "/title-case" },
    ],
    icon: AlignLeft,
  },
  {
    title: "Fancy & Decorative",
    tools: [
      { name: "Fancy Text", path: "/fancy-text" },
      { name: "Zalgo Text", path: "/zalgo-text" },
      { name: "Bubble Text", path: "/bubble-text" },
    ],
    icon: Wand2,
  },
  {
    title: "Text Utilities",
    tools: [
      { name: "Word Counter", path: "/word-counter" },
      { name: "Remove Spaces", path: "/remove-spaces" },
      { name: "Line Break Remover", path: "/line-break-remover" },
    ],
    icon: FileText,
  },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4">
        {/* Logo & Brand */}
        <Link to="/" className="mr-6 flex items-center space-x-2">
          <ScrollText className="h-6 w-6" />
          <span className="hidden font-bold sm:inline-block">Text Tweaker</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:flex-1">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/" className={`px-4 py-2 text-sm font-medium ${isActive("/") ? "text-primary" : "text-muted-foreground"}`}>
                  Home
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Tools</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[600px] gap-3 p-4 md:grid-cols-2">
                    {toolsCategories.map((category) => (
                      <div key={category.title} className="space-y-2">
                        <div className="flex items-center gap-2 font-medium">
                          <category.icon className="h-4 w-4" />
                          {category.title}
                        </div>
                        <div className="space-y-1">
                          {category.tools.map((tool) => (
                            <Link
                              key={tool.path}
                              to={tool.path}
                              className="block rounded-md p-2 text-sm hover:bg-accent hover:text-accent-foreground"
                            >
                              {tool.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/blog" className={`px-4 py-2 text-sm font-medium ${isActive("/blog") ? "text-primary" : "text-muted-foreground"}`}>
                  Blog
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/about" className={`px-4 py-2 text-sm font-medium ${isActive("/about") ? "text-primary" : "text-muted-foreground"}`}>
                  About
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/contact" className={`px-4 py-2 text-sm font-medium ${isActive("/contact") ? "text-primary" : "text-muted-foreground"}`}>
                  Contact
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/faqs" className={`px-4 py-2 text-sm font-medium ${isActive("/faqs") ? "text-primary" : "text-muted-foreground"}`}>
                  FAQs
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Search & CTA */}
        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="relative hidden w-48 lg:block">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
          <Link to="/tools">
            <Button variant="secondary" size="sm" className="hidden sm:inline-flex">
              Start Tweaking
            </Button>
          </Link>

          {/* Mobile Menu Trigger */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] px-0 py-8">
              <div className="flex flex-col space-y-4 px-6">
                <Link to="/" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
                  <Home className="h-5 w-5" />
                  <span>Home</span>
                </Link>
                <div className="space-y-4">
                  {toolsCategories.map((category) => (
                    <div key={category.title} className="space-y-2">
                      <div className="font-medium flex items-center gap-2">
                        <category.icon className="h-4 w-4" />
                        {category.title}
                      </div>
                      <div className="ml-6 space-y-1">
                        {category.tools.map((tool) => (
                          <Link
                            key={tool.path}
                            to={tool.path}
                            className="block py-1 text-sm text-muted-foreground hover:text-primary"
                            onClick={() => setIsOpen(false)}
                          >
                            {tool.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  <Link
                    to="/blog"
                    className="flex items-center space-x-2 py-1"
                    onClick={() => setIsOpen(false)}
                  >
                    <BookOpen className="h-5 w-5" />
                    <span>Blog</span>
                  </Link>
                  <Link
                    to="/about"
                    className="flex items-center space-x-2 py-1"
                    onClick={() => setIsOpen(false)}
                  >
                    <FileText className="h-5 w-5" />
                    <span>About</span>
                  </Link>
                  <Link
                    to="/contact"
                    className="flex items-center space-x-2 py-1"
                    onClick={() => setIsOpen(false)}
                  >
                    <Mail className="h-5 w-5" />
                    <span>Contact</span>
                  </Link>
                  <Link
                    to="/faqs"
                    className="flex items-center space-x-2 py-1"
                    onClick={() => setIsOpen(false)}
                  >
                    <HelpCircle className="h-5 w-5" />
                    <span>FAQs</span>
                  </Link>
                </div>
                <div className="space-y-2 pt-4">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search tools..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-8 w-full"
                    />
                  </div>
                  <Link
                    to="/tools"
                    className="block"
                    onClick={() => setIsOpen(false)}
                  >
                    <Button variant="secondary" className="w-full">
                      Start Tweaking
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
