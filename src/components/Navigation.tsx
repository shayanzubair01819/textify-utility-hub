
import React, { useState } from 'react';
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
  const location = useLocation();

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
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-800">TextMaster</Link>
          </div>
          
          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive(link.path) ? 'text-blue-600' : 'text-gray-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center">
                  <Type className="h-4 w-4 mr-2" />
                  Text Formatting Tools
                  <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-60">
                {textFormattingTools.map((tool) => (
                  <DropdownMenuItem key={tool.path} asChild>
                    <Link 
                      to={tool.path}
                      className={`flex items-center w-full px-2 py-1.5 ${
                        isActive(tool.path) ? 'bg-blue-50 text-blue-600' : ''
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
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t py-2">
          <div className="container mx-auto px-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block py-2 text-sm font-medium ${
                  isActive(link.path) ? 'text-blue-600' : 'text-gray-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="py-2">
              <div className="font-medium text-sm py-2 text-gray-500">Text Formatting Tools</div>
              <div className="space-y-2 pl-2">
                {textFormattingTools.map((tool) => (
                  <Link
                    key={tool.path}
                    to={tool.path}
                    className={`flex items-center py-1.5 text-sm ${
                      isActive(tool.path) ? 'text-blue-600' : 'text-gray-600'
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
