
import React, { useState, useEffect, useRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { 
  Copy, 
  Download, 
  Type, 
  Bold, 
  Italic, 
  Circle, 
  SquareBox, 
  ArrowRight, 
  Strikethrough, 
  Underline, 
  FlipHorizontal, 
  FlipVertical, 
  Sparkles, 
  Slash, 
  Smile,
  ChevronsUp,
  ChevronsDown,
  FileText,
  Image
} from "lucide-react";
import BigTextGenerator from "@/components/BigTextGenerator";

const BigTextConverter = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [activeTab, setActiveTab] = useState("bold");
  const [intensity, setIntensity] = useState(50);
  const [fontStyle, setFontStyle] = useState("default");
  const [caseOption, setCaseOption] = useState("nochange");
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  
  const outputRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    updateCounts();
  }, [inputText]);

  useEffect(() => {
    convertText();
  }, [inputText, activeTab, intensity, fontStyle, caseOption]);

  const updateCounts = () => {
    const words = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;
    setWordCount(words);
    setCharCount(inputText.length);
  };

  const applyCase = (text: string) => {
    switch (caseOption) {
      case "upper":
        return text.toUpperCase();
      case "lower":
        return text.toLowerCase();
      case "title":
        return text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase());
      case "sentence":
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
      default:
        return text;
    }
  };

  const convertText = () => {
    let result = applyCase(inputText);
    
    // Skip conversion if input is empty
    if (!result) {
      setOutputText("");
      return;
    }

    // Process based on the selected tab
    switch (activeTab) {
      case "bold":
        result = BigTextGenerator.toBold(result);
        break;
      case "italic":
        result = BigTextGenerator.toItalic(result);
        break;
      case "bold-italic":
        result = BigTextGenerator.toBoldItalic(result);
        break;
      case "bubble":
        result = BigTextGenerator.toBubble(result);
        break;
      case "circle":
        result = BigTextGenerator.toCircle(result);
        break;
      case "square":
        result = BigTextGenerator.toSquare(result);
        break;
      case "box":
        result = BigTextGenerator.toBox(result);
        break;
      case "wide":
        result = BigTextGenerator.toWide(result, intensity);
        break;
      case "strikethrough":
        result = BigTextGenerator.toStrikethrough(result);
        break;
      case "underline":
        result = BigTextGenerator.toUnderline(result);
        break;
      case "flip-horizontal":
        result = BigTextGenerator.flipHorizontal(result);
        break;
      case "flip-vertical":
        result = BigTextGenerator.flipVertical(result);
        break;
      case "zalgo":
        result = BigTextGenerator.toZalgo(result, intensity);
        break;
      case "slanted":
        result = BigTextGenerator.toSlanted(result);
        break;
      case "emoji":
        result = BigTextGenerator.toEmoji(result);
        break;
      default:
        break;
    }

    setOutputText(result);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText);
    toast({
      title: "Copied to clipboard",
      description: "The transformed text has been copied to your clipboard.",
    });
  };

  const handleDownloadTxt = () => {
    const element = document.createElement("a");
    const file = new Blob([outputText], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "big-text.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast({
      title: "Downloaded as TXT",
      description: "Your big text has been downloaded as a text file.",
    });
  };

  const handleDownloadPng = () => {
    if (outputRef.current) {
      // This is a simplified version - in production you would use a proper library like html2canvas
      toast({
        title: "PNG Download",
        description: "PNG download would be implemented with html2canvas or similar library.",
      });
    }
  };

  // List of tabs with their icons and labels
  const tabs = [
    { id: "bold", icon: <Bold className="w-4 h-4" />, label: "Bold" },
    { id: "italic", icon: <Italic className="w-4 h-4" />, label: "Italic" },
    { id: "bold-italic", icon: <Bold className="w-4 h-4" />, label: "Bold-Italic" },
    { id: "bubble", icon: <Circle className="w-4 h-4" />, label: "Bubble" },
    { id: "circle", icon: <Circle className="w-4 h-4" />, label: "Circle" },
    { id: "square", icon: <SquareBox className="w-4 h-4" />, label: "Square" },
    { id: "box", icon: <SquareBox className="w-4 h-4" />, label: "Box" },
    { id: "wide", icon: <ArrowRight className="w-4 h-4" />, label: "Wide" },
    { id: "strikethrough", icon: <Strikethrough className="w-4 h-4" />, label: "Strikethrough" },
    { id: "underline", icon: <Underline className="w-4 h-4" />, label: "Underline" },
    { id: "flip-horizontal", icon: <FlipHorizontal className="w-4 h-4" />, label: "Flip H" },
    { id: "flip-vertical", icon: <FlipVertical className="w-4 h-4" />, label: "Flip V" },
    { id: "zalgo", icon: <Sparkles className="w-4 h-4" />, label: "Zalgo" },
    { id: "slanted", icon: <Slash className="w-4 h-4" />, label: "Slanted" },
    { id: "emoji", icon: <Smile className="w-4 h-4" />, label: "Emoji" }
  ];

  return (
    <div className="container py-8 px-4 mx-auto">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Page Title & Description */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">Big Text Converter</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Transform ordinary text into eye-catching big fonts, fancy Unicode characters, and stylized text. Perfect for social media, creative projects, or whenever you need text that stands out.
          </p>
        </div>

        {/* Main Tool Card */}
        <Card className="border shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Type className="h-5 w-5" />
              Big Text Generator
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Input Section */}
            <div className="space-y-2">
              <label htmlFor="input-text" className="block text-sm font-medium">
                Enter your text:
              </label>
              <Textarea
                id="input-text"
                placeholder="Type or paste your text here..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="min-h-[100px] font-mono"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>{wordCount} words</span>
                <span>{charCount} characters</span>
              </div>
            </div>

            {/* Transformation Options */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="case-converter" className="block text-sm font-medium mb-1">
                    Text Case:
                  </label>
                  <Select value={caseOption} onValueChange={setCaseOption}>
                    <SelectTrigger id="case-converter">
                      <SelectValue placeholder="Select case" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nochange">No Change</SelectItem>
                      <SelectItem value="upper">UPPERCASE</SelectItem>
                      <SelectItem value="lower">lowercase</SelectItem>
                      <SelectItem value="title">Title Case</SelectItem>
                      <SelectItem value="sentence">Sentence case</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label htmlFor="font-style" className="block text-sm font-medium mb-1">
                    Font Style:
                  </label>
                  <Select value={fontStyle} onValueChange={setFontStyle}>
                    <SelectTrigger id="font-style">
                      <SelectValue placeholder="Select style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Default</SelectItem>
                      <SelectItem value="monospace">Monospace</SelectItem>
                      <SelectItem value="serif">Serif</SelectItem>
                      <SelectItem value="cursive">Cursive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Intensity Slider for applicable effects like Zalgo or Wide */}
              {(activeTab === "zalgo" || activeTab === "wide") && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label htmlFor="intensity-slider" className="block text-sm font-medium">
                      Effect Intensity:
                    </label>
                    <span className="text-xs text-gray-500">{intensity}%</span>
                  </div>
                  <Slider
                    id="intensity-slider"
                    value={[intensity]}
                    min={1}
                    max={100}
                    step={1}
                    onValueChange={(values) => setIntensity(values[0])}
                  />
                </div>
              )}
            </div>

            {/* Transformation Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="overflow-x-auto pb-2">
                <TabsList className="grid grid-flow-col auto-cols-max gap-1 justify-start">
                  {tabs.map((tab) => (
                    <TabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-1">
                      {tab.icon}
                      <span className="hidden sm:inline">{tab.label}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              {/* Output Preview (Single content area that changes based on active tab) */}
              <div className="mt-4 p-4 bg-gray-50 rounded-md min-h-[140px] relative">
                <div 
                  ref={outputRef}
                  className={`font-${fontStyle === 'default' ? 'sans' : fontStyle} break-all whitespace-pre-wrap`}
                >
                  {outputText || <span className="text-gray-400">Output preview will appear here...</span>}
                </div>
              </div>
            </Tabs>
          </CardContent>

          {/* Actions Footer */}
          <CardFooter className="flex flex-wrap gap-2 justify-between border-t p-4">
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" onClick={handleCopy} disabled={!outputText}>
                <Copy className="w-4 h-4 mr-1" />
                Copy Text
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownloadTxt} disabled={!outputText}>
                <FileText className="w-4 h-4 mr-1" />
                Download TXT
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownloadPng} disabled={!outputText}>
                <Image className="w-4 h-4 mr-1" />
                Download PNG
              </Button>
            </div>
            <div className="flex items-center text-xs text-gray-500">
              <Badge variant="outline" className="mr-1">
                Unicode Text
              </Badge>
            </div>
          </CardFooter>
        </Card>

        {/* How To Use Section */}
        <Card className="border shadow-sm">
          <CardHeader>
            <CardTitle>How to Use the Big Text Converter</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ol className="list-decimal list-inside space-y-2">
              <li>Type or paste your text in the input field.</li>
              <li>Select your desired text transformation style from the tabs.</li>
              <li>Adjust any additional options like case or intensity as needed.</li>
              <li>See the live preview of your converted text.</li>
              <li>Copy or download your transformed text with one click.</li>
            </ol>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card className="border shadow-sm">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold">What is a Big Text Converter?</h3>
              <p className="text-gray-500">
                A Big Text Converter transforms normal text into various stylized formats using Unicode characters and symbols to create visually distinctive text that can be copied and pasted across most platforms.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Where can I use these big text styles?</h3>
              <p className="text-gray-500">
                You can use these stylized texts on social media platforms, messaging apps, emails, documents, or anywhere that supports Unicode characters.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Will these text styles work everywhere?</h3>
              <p className="text-gray-500">
                Most modern platforms support Unicode characters, but some systems or applications might have limited support. We recommend testing the output in your intended platform.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BigTextConverter;
