
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Circle, 
  Copy, 
  Download, 
  RefreshCw, 
  CheckCircle,
  Text,
  BookText,
  AlignJustify,
  Type,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const BubbleTextGenerator = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [bubbleStyle, setBubbleStyle] = useState("circle");
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState({
    characters: 0,
    words: 0,
    sentences: 0
  });

  // Bubble text conversion maps
  const conversionMaps = {
    circle: {
      a: "ⓐ", b: "ⓑ", c: "ⓒ", d: "ⓓ", e: "ⓔ", f: "ⓕ", g: "ⓖ", h: "ⓗ", i: "ⓘ", j: "ⓙ", 
      k: "ⓚ", l: "ⓛ", m: "ⓜ", n: "ⓝ", o: "ⓞ", p: "ⓟ", q: "ⓠ", r: "ⓡ", s: "ⓢ", t: "ⓣ", 
      u: "ⓤ", v: "ⓥ", w: "ⓦ", x: "ⓧ", y: "ⓨ", z: "ⓩ",
      A: "Ⓐ", B: "Ⓑ", C: "Ⓒ", D: "Ⓓ", E: "Ⓔ", F: "Ⓕ", G: "Ⓖ", H: "Ⓗ", I: "Ⓘ", J: "Ⓙ", 
      K: "Ⓚ", L: "Ⓛ", M: "Ⓜ", N: "Ⓝ", O: "Ⓞ", P: "Ⓟ", Q: "Ⓠ", R: "Ⓡ", S: "Ⓢ", T: "Ⓣ", 
      U: "Ⓤ", V: "Ⓥ", W: "Ⓦ", X: "Ⓧ", Y: "Ⓨ", Z: "Ⓩ",
      "0": "⓪", "1": "①", "2": "②", "3": "③", "4": "④", "5": "⑤", "6": "⑥", "7": "⑦", "8": "⑧", "9": "⑨",
    },
    filled: {
      a: "🅐", b: "🅑", c: "🅒", d: "🅓", e: "🅔", f: "🅕", g: "🅖", h: "🅗", i: "🅘", j: "🅙", 
      k: "🅚", l: "🅛", m: "🅜", n: "🅝", o: "🅞", p: "🅟", q: "🅠", r: "🅡", s: "🅢", t: "🅣", 
      u: "🅤", v: "🅥", w: "🅦", x: "🅧", y: "🅨", z: "🅩",
      A: "🅐", B: "🅑", C: "🅒", D: "🅓", E: "🅔", F: "🅕", G: "🅖", H: "🅗", I: "🅘", J: "🅙", 
      K: "🅚", L: "🅛", M: "🅜", N: "🅝", O: "🅞", P: "🅟", Q: "🅠", R: "🅡", S: "🅢", T: "🅣", 
      U: "🅤", V: "🅥", W: "🅦", X: "🅧", Y: "🅨", Z: "🅩",
    },
    square: {
      a: "🄰", b: "🄱", c: "🄲", d: "🄳", e: "🄴", f: "🄵", g: "🄶", h: "🄷", i: "🄸", j: "🄹", 
      k: "🄺", l: "🄻", m: "🄼", n: "🄽", o: "🄾", p: "🄿", q: "🅀", r: "🅁", s: "🅂", t: "🅃", 
      u: "🅄", v: "🅅", w: "🅆", x: "🅇", y: "🅈", z: "🅉",
      A: "🄰", B: "🄱", C: "🄲", D: "🄳", E: "🄴", F: "🄵", G: "🄶", H: "🄷", I: "🄸", J: "🄹", 
      K: "🄺", L: "🄻", M: "🄼", N: "🄽", O: "🄾", P: "🄿", Q: "🅀", R: "🅁", S: "🅂", T: "🅃", 
      U: "🅄", V: "🅅", W: "🅆", X: "🅇", Y: "🅈", Z: "🅉",
    },
    double: {
      a: "𝕒", b: "𝕓", c: "𝕔", d: "𝕕", e: "𝕖", f: "𝕗", g: "𝕘", h: "𝕙", i: "𝕚", j: "𝕛", 
      k: "𝕜", l: "𝕝", m: "𝕞", n: "𝕟", o: "𝕠", p: "𝕡", q: "𝕢", r: "𝕣", s: "𝕤", t: "𝕥", 
      u: "𝕦", v: "𝕧", w: "𝕨", x: "𝕩", y: "𝕪", z: "𝕫",
      A: "𝔸", B: "𝔹", C: "ℂ", D: "𝔻", E: "𝔼", F: "𝔽", G: "𝔾", H: "ℍ", I: "𝕀", J: "𝕁", 
      K: "𝕂", L: "𝕃", M: "𝕄", N: "ℕ", O: "𝕆", P: "ℙ", Q: "ℚ", R: "ℝ", S: "𝕊", T: "𝕋", 
      U: "𝕌", V: "𝕍", W: "𝕎", X: "𝕏", Y: "𝕐", Z: "ℤ",
      "0": "𝟘", "1": "𝟙", "2": "𝟚", "3": "𝟛", "4": "𝟜", "5": "𝟝", "6": "𝟞", "7": "𝟟", "8": "𝟠", "9": "𝟡",
    }
  };

  // Convert text based on selected style
  const convertText = (text: string, style: string): string => {
    if (!text) return "";
    
    const map = conversionMaps[style as keyof typeof conversionMaps];
    if (!map) return text;

    return Array.from(text).map(char => {
      return map[char as keyof typeof map] || char;
    }).join("");
  };

  // Update output text whenever input or style changes
  useEffect(() => {
    setOutputText(convertText(inputText, bubbleStyle));
  }, [inputText, bubbleStyle]);

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
    setBubbleStyle("circle");
    toast({
      title: "Reset complete",
      description: "All text has been cleared",
    });
  };

  // Style options for bubble text
  const bubbleStyles = [
    { id: "circle", label: "Circle Style", description: "ⓐⓑⓒ" },
    { id: "filled", label: "Filled Style", description: "🅐🅑🅒" },
    { id: "square", label: "Square Style", description: "🄰🄱🄲" },
    { id: "double", label: "Double Strike", description: "𝕒𝕓𝕔" },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="grid grid-cols-1 gap-6">
        {/* Input Section */}
        <Card className="w-full">
          <CardContent className="pt-6">
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div className="flex-1">
                  <label htmlFor="bubble-style" className="block text-sm font-medium mb-2">
                    Choose Bubble Style:
                  </label>
                  <Select 
                    value={bubbleStyle} 
                    onValueChange={(value) => setBubbleStyle(value)}
                  >
                    <SelectTrigger id="bubble-style" className="w-full">
                      <SelectValue placeholder="Select a style" />
                    </SelectTrigger>
                    <SelectContent>
                      {bubbleStyles.map((style) => (
                        <SelectItem key={style.id} value={style.id}>
                          <div className="flex items-center">
                            <span>{style.label}</span>
                            <span className="ml-2 text-xs text-muted-foreground">
                              ({style.description})
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleReset}
                    className="flex-shrink-0"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                </div>
              </div>

              <div>
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
              <div className="flex flex-wrap gap-3 text-sm text-slate-500">
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
            </div>
          </CardContent>
        </Card>
        
        {/* Output Section */}
        <Card className="w-full">
          <CardContent className="pt-6">
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <label htmlFor="output-text" className="block text-sm font-medium">
                  Bubble Text Results:
                </label>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopyToClipboard}
                    disabled={!outputText}
                  >
                    {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
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
                placeholder="Converted bubble text will appear here..."
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BubbleTextGenerator;
