
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Copy, 
  Download, 
  RefreshCw,
  BookText,
  AlignJustify,
  Type,
  Circle,
  Text
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const BubbleTextGenerator = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [bubbleStyle, setBubbleStyle] = useState("circle");
  const [fontStyle, setFontStyle] = useState("default");
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState({
    characters: 0,
    words: 0
  });

  // Process the text whenever input or style changes
  useEffect(() => {
    convertText(inputText, bubbleStyle);
  }, [inputText, bubbleStyle, fontStyle]);

  // Calculate text statistics
  useEffect(() => {
    const characters = inputText.length;
    const words = inputText.trim() === "" ? 0 : inputText.trim().split(/\s+/).length;
    
    setStats({
      characters,
      words
    });
  }, [inputText]);

  const convertText = (text: string, style: string) => {
    if (!text) {
      setOutputText("");
      return;
    }

    let result = "";

    // Define character mappings for different bubble styles
    const normalChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    
    // Circled characters (Unicode Circled Alphanumerics)
    const circleChars = "ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ⓪①②③④⑤⑥⑦⑧⑨";
    
    // Filled circle/bubble characters
    const filledCircleChars = "🅐🅑🅒🅓🅔🅕🅖🅗🅘🅙🅚🅛🅜🅝🅞🅟🅠🅡🅢🅣🅤🅥🅦🅧🅨🅩🅐🅑🅒🅓🅔🅕🅖🅗🅘🅙🅚🅛🅜🅝🅞🅟🅠🅡🅢🅣🅤🅥🅦🅧🅨🅩⓿❶❷❸❹❺❻❼❽❾";
    
    // Square characters (Unicode Squared Alphanumerics)
    const squareChars = "🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🅉🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🅉0123456789";
    
    // Negative square characters
    const negativeSquareChars = "🅰🅱🅲🅳🅴🅵🅶🅷🅸🅹🅺🅻🅼🅽🅾🅿🆀🆁🆂🆃🆄🆅🆆🆇🆈🆉🅰🅱🅲🅳🅴🅵🅶🅷🅸🅹🅺🅻🅼🅽🅾🅿🆀🆁🆂🆃🆄🆅🆆🆇🆈🆉0123456789";
    
    switch (style) {
      case "circle":
        result = mapChars(text, normalChars, circleChars);
        break;
      case "filledCircle":
        result = mapChars(text, normalChars, filledCircleChars);
        break;
      case "square":
        result = mapChars(text, normalChars, squareChars);
        break;
      case "negativeSquare":
        result = mapChars(text, normalChars, negativeSquareChars);
        break;
      default:
        result = mapChars(text, normalChars, circleChars);
    }

    setOutputText(result);
  };

  // Helper function to map characters to their special versions
  const mapChars = (text: string, sourceChars: string, targetChars: string): string => {
    return Array.from(text).map(char => {
      const index = sourceChars.indexOf(char);
      return index !== -1 ? targetChars[index] : char;
    }).join('');
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(outputText)
      .then(() => {
        setCopied(true);
        toast({
          title: "Text copied to clipboard",
          description: "Your bubble text has been copied. You can now paste it anywhere you need",
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
    setFontStyle("default");
    
    toast({
      title: "Text reset",
      description: "Your input has been cleared",
    });
  };

  const bubbleStyleOptions = [
    { id: "circle", icon: <Circle className="h-4 w-4" />, label: "Circle" },
    { id: "filledCircle", icon: <Circle className="h-4 w-4 fill-current" />, label: "Filled Circle" },
    { id: "square", icon: <Text className="h-4 w-4" />, label: "Square" },
    { id: "negativeSquare", icon: <Text className="h-4 w-4 fill-current" />, label: "Negative Square" }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="grid grid-cols-1 gap-6">
        {/* Input/Output Section */}
        <Card className="w-full">
          <CardContent className="pt-6">
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <label htmlFor="input-text" className="block text-sm font-medium">
                  Enter your text:
                </label>
                <div className="flex items-center text-xs text-slate-500">
                  <span className="mr-4">{stats.characters} Characters</span>
                  <span>{stats.words} Words</span>
                </div>
              </div>
              <Textarea
                id="input-text"
                placeholder="Type or paste your text here..."
                className="min-h-[120px] w-full mb-2"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
            </div>
            
            {/* Conversion Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Bubble Style:
                </label>
                <Tabs value={bubbleStyle} onValueChange={setBubbleStyle} className="w-full">
                  <TabsList className="grid grid-cols-2 sm:grid-cols-4 w-full">
                    {bubbleStyleOptions.map((option) => (
                      <TabsTrigger key={option.id} value={option.id} className="flex items-center gap-1">
                        {option.icon}
                        <span className="hidden sm:inline">{option.label}</span>
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Font Style:
                </label>
                <Select value={fontStyle} onValueChange={setFontStyle}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select font style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="serif">Serif</SelectItem>
                    <SelectItem value="mono">Monospace</SelectItem>
                    <SelectItem value="handwriting">Handwriting</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Result Preview */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Bubble Text Result:
              </label>
              <div className={`p-4 min-h-[120px] border rounded-md bg-slate-50 whitespace-pre-wrap break-all font-${fontStyle}`}>
                {outputText || <span className="text-slate-400">Your bubble text will appear here...</span>}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2">
              <Button 
                variant="default" 
                onClick={handleCopyToClipboard}
                disabled={!outputText}
              >
                <Copy className="mr-2 h-4 w-4" />
                Copy to Clipboard
              </Button>
              <Button 
                variant="outline" 
                onClick={handleDownload}
                disabled={!outputText}
              >
                <Download className="mr-2 h-4 w-4" />
                Download as Text
              </Button>
              <Button 
                variant="outline"
                onClick={handleReset}
                className="ml-auto"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BubbleTextGenerator;
