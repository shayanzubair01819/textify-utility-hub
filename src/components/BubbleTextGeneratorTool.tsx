
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Copy, 
  Download, 
  BookText,
  Text,
  Circle,
  RotateCcw,
  Square,
  Braces,
  Hash
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Utility functions to convert text to different bubble styles
const bubbleTextConverter = {
  // Convert to bubble style (circled)
  toBubble: (text: string): string => {
    return text
      .split("")
      .map(char => {
        if (/[a-z]/.test(char)) {
          // Small letters a-z
          return String.fromCodePoint(char.charCodeAt(0) - 97 + 0x24D0);
        } else if (/[A-Z]/.test(char)) {
          // Capital letters A-Z
          return String.fromCodePoint(char.charCodeAt(0) - 65 + 0x24B6);
        } else if (/[0-9]/.test(char)) {
          // Numbers 0-9
          return String.fromCodePoint(char.charCodeAt(0) - 48 + 0x2460);
        }
        return char;
      })
      .join("");
  },

  // Convert to filled bubble style
  toFilledBubble: (text: string): string => {
    return text
      .split("")
      .map(char => {
        if (/[a-z]/.test(char)) {
          // Use alternative filled bubble if available, or default to regular bubble
          return String.fromCodePoint(char.charCodeAt(0) - 97 + 0x1F150);
        } else if (/[A-Z]/.test(char)) {
          return String.fromCodePoint(char.charCodeAt(0) - 65 + 0x1F150);
        } else if (/[0-9]/.test(char)) {
          // Use filled circled numbers when available
          return String.fromCodePoint(char.charCodeAt(0) - 48 + 0x278A);
        }
        return char;
      })
      .join("");
  },

  // Convert to square style
  toSquare: (text: string): string => {
    return text
      .split("")
      .map(char => {
        if (/[a-z]/.test(char)) {
          // For lowercase, we can use regular style with fallback
          return char;
        } else if (/[A-Z]/.test(char)) {
          // Capital letters A-Z in squares
          return String.fromCodePoint(char.charCodeAt(0) - 65 + 0x1F130);
        } else if (/[0-9]/.test(char)) {
          // For numbers, use regular style
          return char;
        }
        return char;
      })
      .join("");
  },

  // Convert to double-struck style (mathematical double-struck)
  toDoubleStruck: (text: string): string => {
    return text
      .split("")
      .map(char => {
        if (/[a-z]/.test(char)) {
          // Small letters a-z (using mathematical double-struck where available)
          const charCode = char.charCodeAt(0);
          // Only certain lowercase letters have double-struck versions
          if ("abcdefghijklmnopqrstuvwxyz".indexOf(char) !== -1) {
            return String.fromCodePoint(0x1D552 + charCode - 97);
          }
          return char;
        } else if (/[A-Z]/.test(char)) {
          // Capital letters A-Z
          const charCode = char.charCodeAt(0);
          return String.fromCodePoint(0x1D538 + charCode - 65);
        } else if (/[0-9]/.test(char)) {
          // Numbers 0-9 in double-struck
          if (char === "0") {
            return "𝟘";
          }
          const num = parseInt(char);
          return String.fromCodePoint(0x1D7D8 + num - 1);
        }
        return char;
      })
      .join("");
  },

  // Convert to parenthesized style
  toParenthesized: (text: string): string => {
    return text
      .split("")
      .map(char => {
        if (/[a-z]/.test(char)) {
          // Small letters a-z
          return String.fromCodePoint(char.charCodeAt(0) - 97 + 0x249C);
        } else if (/[A-Z]/.test(char)) {
          // Use lowercase parenthesized since uppercase aren't available
          return String.fromCodePoint(char.toLowerCase().charCodeAt(0) - 97 + 0x249C);
        } else if (/[0-9]/.test(char)) {
          // Numbers 0-9
          if (char === "0") {
            return "⓪";
          }
          return String.fromCodePoint(char.charCodeAt(0) - 49 + 0x2474);
        }
        return char;
      })
      .join("");
  }
};

const BubbleTextGeneratorTool = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [activeTab, setActiveTab] = useState("bubble");
  const [stats, setStats] = useState({
    characters: 0,
    words: 0
  });
  const [copied, setCopied] = useState(false);
  
  // Process the text whenever input or conversion type changes
  useEffect(() => {
    convertText(inputText, activeTab);
  }, [inputText, activeTab]);

  // Calculate text statistics
  useEffect(() => {
    const characters = inputText.length;
    const words = inputText.trim() === "" ? 0 : inputText.trim().split(/\s+/).length;
    
    setStats({
      characters,
      words
    });
  }, [inputText]);

  const convertText = (text: string, conversionType: string) => {
    if (!text) {
      setOutputText("");
      return;
    }

    let result = "";

    switch (conversionType) {
      case "bubble":
        result = bubbleTextConverter.toBubble(text);
        break;
      case "filled-bubble":
        result = bubbleTextConverter.toFilledBubble(text);
        break;
      case "square":
        result = bubbleTextConverter.toSquare(text);
        break;
      case "double-struck":
        result = bubbleTextConverter.toDoubleStruck(text);
        break;
      case "parenthesized":
        result = bubbleTextConverter.toParenthesized(text);
        break;
      default:
        result = text;
    }

    setOutputText(result);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(outputText)
      .then(() => {
        setCopied(true);
        toast({
          title: "Text copied to clipboard",
          description: "You can now paste it anywhere you need",
        });
        
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      })
      .catch(err => {
        toast({
          title: "Failed to copy text",
          description: "Please try again or copy manually",
          variant: "destructive"
        });
      });
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([outputText], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "bubble-text.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: "Text file downloaded",
      description: "Your bubble text has been downloaded as a .txt file",
    });
  };

  const handleReset = () => {
    setInputText("");
    setOutputText("");
    
    toast({
      title: "Text reset",
      description: "Your text has been cleared",
    });
  };

  const conversionStyles = [
    { id: "bubble", icon: <Circle className="h-4 w-4" />, label: "Bubble" },
    { id: "filled-bubble", icon: <Circle className="h-4 w-4 fill-current" />, label: "Filled Bubble" },
    { id: "square", icon: <Square className="h-4 w-4" />, label: "Square" },
    { id: "double-struck", icon: <Hash className="h-4 w-4" />, label: "Double-Struck" },
    { id: "parenthesized", icon: <Braces className="h-4 w-4" />, label: "Parenthesized" }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="grid grid-cols-1 gap-6">
        {/* Input Section */}
        <Card className="w-full">
          <CardContent className="pt-6">
            <div className="mb-4">
              <label htmlFor="input-text" className="block text-sm font-medium mb-2">
                Enter your text:
              </label>
              <Textarea
                id="input-text"
                placeholder="Type or paste your text here to convert to bubble text..."
                className="min-h-[150px] w-full"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
            </div>
            
            {/* Text Stats */}
            <div className="flex flex-wrap gap-3 text-sm text-slate-500 mb-4">
              <div className="flex items-center">
                <BookText className="h-4 w-4 mr-1" />
                <span>{stats.characters} Characters</span>
              </div>
              <div className="flex items-center">
                <Text className="h-4 w-4 mr-1" />
                <span>{stats.words} Words</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Conversion Options */}
        <Card className="w-full">
          <CardContent className="pt-6">
            <label className="block text-sm font-medium mb-3">
              Select bubble text style:
            </label>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-1">
                {conversionStyles.map((style) => (
                  <TabsTrigger key={style.id} value={style.id} className="flex items-center gap-1">
                    {style.icon}
                    <span className="ml-1">{style.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
              
              <TabsContent value={activeTab} className="mt-4">
                <div className="bg-slate-50 p-4 rounded-md min-h-[100px] mb-4">
                  <p className="whitespace-pre-wrap break-words">
                    {outputText || "Your bubble text will appear here..."}
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopyToClipboard}
                    disabled={!outputText}
                    className="flex items-center"
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    <span>Copy Text</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDownload}
                    disabled={!outputText}
                    className="flex items-center"
                  >
                    <Download className="h-4 w-4 mr-1" />
                    <span>Download .txt</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleReset}
                    className="flex items-center ml-auto"
                  >
                    <RotateCcw className="h-4 w-4 mr-1" />
                    <span>Reset</span>
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BubbleTextGeneratorTool;
