import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Copy, Check, Text, BookText, AlignJustify, Download } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const BubbleTextGenerator = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [bubbleType, setBubbleType] = useState("lowercase");
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState({
    characters: 0,
    words: 0,
    sentences: 0
  });

  useEffect(() => {
    if (inputText) {
      convertToBubbleText(inputText, bubbleType);
    } else {
      setOutputText("");
    }
  }, [inputText, bubbleType]);

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

  const convertToBubbleText = (text: string, type: string) => {
    const lowercaseBubbleMap: { [key: string]: string } = {
      'a': 'ⓐ', 'b': 'ⓑ', 'c': 'ⓒ', 'd': 'ⓓ', 'e': 'ⓔ', 'f': 'ⓕ',
      'g': 'ⓖ', 'h': 'ⓗ', 'i': 'ⓘ', 'j': 'ⓙ', 'k': 'ⓚ', 'l': 'ⓛ',
      'm': 'ⓜ', 'n': 'ⓝ', 'o': 'ⓞ', 'p': 'ⓟ', 'q': 'ⓠ', 'r': 'ⓡ',
      's': 'ⓢ', 't': 'ⓣ', 'u': 'ⓤ', 'v': 'ⓥ', 'w': 'ⓦ', 'x': 'ⓧ',
      'y': 'ⓨ', 'z': 'ⓩ', '0': '⓪', '1': '①', '2': '②', '3': '③',
      '4': '④', '5': '⑤', '6': '⑥', '7': '⑦', '8': '⑧', '9': '⑨',
      ' ': ' '
    };

    const uppercaseBubbleMap: { [key: string]: string } = {
      'A': 'Ⓐ', 'B': 'Ⓑ', 'C': 'Ⓒ', 'D': 'Ⓓ', 'E': 'Ⓔ', 'F': 'Ⓕ',
      'G': 'Ⓖ', 'H': 'Ⓗ', 'I': 'Ⓘ', 'J': 'Ⓙ', 'K': 'Ⓚ', 'L': 'Ⓛ',
      'M': 'Ⓜ', 'N': 'Ⓝ', 'O': 'Ⓞ', 'P': 'Ⓟ', 'Q': 'Ⓠ', 'R': 'Ⓡ',
      'S': 'Ⓢ', 'T': 'Ⓣ', 'U': 'Ⓤ', 'V': 'Ⓥ', 'W': 'Ⓦ', 'X': 'Ⓧ',
      'Y': 'Ⓨ', 'Z': 'Ⓩ', '0': '⓪', '1': '①', '2': '②', '3': '③',
      '4': '④', '5': '⑤', '6': '⑥', '7': '⑦', '8': '⑧', '9': '⑨',
      ' ': ' '
    };

    const boldBubbleMap: { [key: string]: string } = {
      'a': '🅐', 'b': '🅑', 'c': '🅒', 'd': '🅓', 'e': '🅔', 'f': '🅕',
      'g': '🅖', 'h': '🅗', 'i': '🅘', 'j': '🅙', 'k': '🅚', 'l': '🅛',
      'm': '🅜', 'n': '🅝', 'o': '🅞', 'p': '🅟', 'q': '🅠', 'r': '🅡',
      's': '🅢', 't': '🅣', 'u': '🅤', 'v': '🅥', 'w': '🅦', 'x': '🅧',
      'y': '🅨', 'z': '🅩', 'A': '🅐', 'B': '🅑', 'C': '🅒', 'D': '🅓',
      'E': '🅔', 'F': '🅕', 'G': '🅖', 'H': '🅗', 'I': '🅘', 'J': '🅙',
      'K': '🅚', 'L': '🅛', 'M': '🅜', 'N': '🅝', 'O': '🅞', 'P': '🅟',
      'Q': '🅠', 'R': '🅡', 'S': '🅢', 'T': '🅣', 'U': '🅤', 'V': '🅥',
      'W': '🅦', 'X': '🅧', 'Y': '🅨', 'Z': '🅩', ' ': ' '
    };

    let bubbleMap: { [key: string]: string };
    
    switch(type) {
      case "uppercase":
        bubbleMap = uppercaseBubbleMap;
        text = text.toUpperCase();
        break;
      case "bold":
        bubbleMap = boldBubbleMap;
        break;
      case "lowercase":
      default:
        bubbleMap = lowercaseBubbleMap;
        text = text.toLowerCase();
        break;
    }

    // Convert each character using the map or keep original if not in map
    const result = text.split('').map(char => bubbleMap[char] || char).join('');
    setOutputText(result);
  };

  const handleCopyToClipboard = () => {
    if (outputText) {
      navigator.clipboard.writeText(outputText)
        .then(() => {
          setCopied(true);
          toast({
            title: "Copied!",
            description: "Bubble text copied to clipboard",
          });
          
          setTimeout(() => {
            setCopied(false);
          }, 2000);
        })
        .catch((err) => {
          console.error('Failed to copy text: ', err);
          toast({
            title: "Error",
            description: "Failed to copy to clipboard",
            variant: "destructive",
          });
        });
    }
  };

  const handleDownload = () => {
    if (!outputText) return;
    
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
    setBubbleType("lowercase");
    toast({
      title: "Reset complete",
      description: "All fields have been cleared"
    });
  };

  const bubbleOptions = [
    { id: "lowercase", label: "Lowercase Bubbles (ⓐⓑⓒ)" },
    { id: "uppercase", label: "Uppercase Bubbles (ⒶⒷⒸ)" },
    { id: "bold", label: "Bold Bubbles (🅐🅑🅒)" }
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
              Select bubble style:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4">
              {bubbleOptions.map((option) => (
                <Button
                  key={option.id}
                  variant={bubbleType === option.id ? "default" : "outline"}
                  className="justify-start"
                  onClick={() => setBubbleType(option.id)}
                >
                  <span className="ml-2">{option.label}</span>
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
                  Bubble Text Result:
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
                className="min-h-[150px] w-full"
                value={outputText}
                readOnly
                placeholder="Bubble text will appear here..."
              />
            </div>
            
            {/* Reset Button */}
            <Button 
              variant="outline" 
              className="w-full mt-2" 
              onClick={handleReset}
              disabled={!inputText && !outputText}
            >
              Reset
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BubbleTextGenerator;
