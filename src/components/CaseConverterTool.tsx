import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ArrowUpIcon, 
  ArrowDownIcon, 
  TextQuote, 
  Copy, 
  Download, 
  Check, 
  BookText,
  AlignJustify,
  Type,
  Shuffle,
  Repeat,
  Text,
  Heading1
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const CaseConverterTool = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [selectedConversion, setSelectedConversion] = useState("uppercase");
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState({
    characters: 0,
    words: 0,
    sentences: 0
  });

  // Process the text whenever input or conversion type changes
  useEffect(() => {
    convertText(inputText, selectedConversion);
  }, [inputText, selectedConversion]);

  // Calculate text statistics
  useEffect(() => {
    const characters = inputText.length;
    const words = inputText.trim() === "" ? 0 : inputText.trim().split(/\s+/).length;
    const sentences = inputText.trim() === "" ? 0 : 
      inputText.split(/[.!?]+/).filter(sentence => sentence.trim() !== "").length;
    
    setStats({
      characters,
      words,
      sentences
    });
  }, [inputText]);

  const convertText = (text, conversionType) => {
    if (!text) {
      setOutputText("");
      return;
    }

    let result = "";

    switch (conversionType) {
      case "uppercase":
        result = text.toUpperCase();
        break;
      case "lowercase":
        result = text.toLowerCase();
        break;
      case "sentencecase":
        // Split by sentence-ending punctuation followed by space
        result = text.toLowerCase().replace(
          /(^\s*|[.!?]\s+)([a-z])/g,
          (match, p1, p2) => p1 + p2.toUpperCase()
        );
        break;
      case "titlecase":
        // Capitalize first letter of each word, keeping exceptions in mind
        result = text.toLowerCase().replace(
          /\b(\w)/g,
          (match) => match.toUpperCase()
        );
        break;
      case "alternatingcase":
        // Alternate between uppercase and lowercase
        result = Array.from(text)
          .map((char, index) => 
            index % 2 === 0 ? char.toLowerCase() : char.toUpperCase()
          )
          .join("");
        break;
      case "togglecase":
        // Swap case of each character
        result = Array.from(text)
          .map(char => 
            char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()
          )
          .join("");
        break;
      case "capitalizeeachsentence":
        // Ensure the first letter of every sentence is capitalized
        result = text.replace(
          /(^\s*|[.!?]\s+)([a-z])/g,
          (match, p1, p2) => p1 + p2.toUpperCase()
        );
        break;
      case "firstlettercapitalization":
        // Capitalize only the first letter, rest lowercase
        result = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
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
    element.download = "converted-text.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: "Text file downloaded",
      description: "Your converted text has been downloaded as a .txt file",
    });
  };

  const conversionOptions = [
    { id: "uppercase", icon: <ArrowUpIcon className="h-4 w-4" />, label: "UPPERCASE" },
    { id: "lowercase", icon: <ArrowDownIcon className="h-4 w-4" />, label: "lowercase" },
    { id: "sentencecase", icon: <TextQuote className="h-4 w-4" />, label: "Sentence case" },
    { id: "titlecase", icon: <Type className="h-4 w-4" />, label: "Title Case" },
    { id: "alternatingcase", icon: <Shuffle className="h-4 w-4" />, label: "aLtErNaTiNg CaSe" },
    { id: "togglecase", icon: <Repeat className="h-4 w-4" />, label: "tOGGLE cASE" },
    { id: "capitalizeeachsentence", icon: <AlignJustify className="h-4 w-4" />, label: "Capitalize Each Sentence" },
    { id: "firstlettercapitalization", icon: <Heading1 className="h-4 w-4" />, label: "First Letter Capitalization" }
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
                placeholder="Type or paste your text here..."
                className="min-h-[200px] w-full"
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
              <div className="flex items-center">
                <AlignJustify className="h-4 w-4 mr-1" />
                <span>{stats.sentences} Sentences</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Conversion Options */}
        <Card className="w-full">
          <CardContent className="pt-6">
            <label className="block text-sm font-medium mb-3">
              Select conversion type:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 mb-4">
              {conversionOptions.map((option) => (
                <Button
                  key={option.id}
                  variant={selectedConversion === option.id ? "default" : "outline"}
                  className="justify-start"
                  onClick={() => setSelectedConversion(option.id)}
                >
                  {option.icon}
                  <span className="ml-2 overflow-hidden text-ellipsis">{option.label}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Output Section */}
        <Card className="w-full">
          <CardContent className="pt-6">
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <label htmlFor="output-text" className="block text-sm font-medium">
                  Converted result:
                </label>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopyToClipboard}
                    disabled={!outputText}
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    <span className="ml-1">{copied ? "Copied!" : "Copy"}</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDownload}
                    disabled={!outputText}
                  >
                    <Download className="h-4 w-4" />
                    <span className="ml-1">Download</span>
                  </Button>
                </div>
              </div>
              <Textarea
                id="output-text"
                className="min-h-[200px] w-full"
                value={outputText}
                readOnly
                placeholder="Converted text will appear here..."
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CaseConverterTool;
