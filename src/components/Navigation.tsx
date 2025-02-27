
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, X, ChevronDown, Type, Bold, Italic, Underline, AlignJustify, Shuffle, Circle } from 'lucide-react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Blog', path: '/blog' },
  ];

  const textFormattingTools = [
    { name: 'Bold Text Generator', path: '/bold-text', icon: <Bold className="h-4 w-4 mr-2" /> },
    { name: 'Italic Text Generator', path: '/italic-text', icon: <Italic className="h-4 w-4 mr-2" /> },
    { name: 'Underline Text Generator', path: '/underline-text', icon: <Underline className="h-4 w-4 mr-2" /> },
    { name: 'LinkedIn Formatter', path: '/linkedin-formatter', icon: <AlignJustify className="h-4 w-4 mr-2" /> },
    { name: 'Case Converter', path: '/case-converter', icon: <Shuffle className="h-4 w-4 mr-2" /> },
    { name: 'Big Text Converter', path: '/big-text-converter', icon: <Type className="h-4 w-4 mr-2" /> },
    { name: 'Bubble Text Generator', path: '/bubble-text', icon: <Circle className="h-4 w-4 mr-2" /> },
  ];

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ease-in-out ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-sm shadow-md' 
          : 'bg-white shadow-sm'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link 
              to="/" 
              className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent"
            >
              Text Tweaker
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive(link.path) 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center ml-1 rounded-md">
                  <Type className="h-4 w-4 mr-2" />
                  Text Tools
                  <ChevronDown className="h-4 w-4 ml-1 opacity-70" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-60 p-2">
                {textFormattingTools.map((tool) => (
                  <DropdownMenuItem key={tool.path} asChild className="rounded-md">
                    <Link 
                      to={tool.path}
                      className={`flex items-center w-full px-3 py-2 text-sm ${
                        isActive(tool.path) 
                          ? 'bg-blue-50 text-blue-600 font-medium' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {tool.icon}
                      {tool.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
          
          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
            aria-expanded={isMenuOpen}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t py-2 shadow-lg animate-fade-in">
          <div className="container mx-auto px-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-3 py-2 rounded-md text-sm font-medium ${
                  isActive(link.path) 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="py-2">
              <div className="font-medium text-sm px-3 py-2 text-gray-500">Text Formatting Tools</div>
              <div className="space-y-1 pl-3">
                {textFormattingTools.map((tool) => (
                  <Link
                    key={tool.path}
                    to={tool.path}
                    className={`flex items-center px-3 py-2 rounded-md text-sm ${
                      isActive(tool.path) 
                        ? 'text-blue-600 bg-blue-50 font-medium' 
                        : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {tool.icon}
                    {tool.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navigation;
