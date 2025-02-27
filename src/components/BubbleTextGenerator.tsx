import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const BubbleTextGenerator = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    if (inputText) {
      convertToBubbleText(inputText);
    } else {
      setOutputText("");
    }
  }, [inputText]);

  const convertToBubbleText = (text: string) => {
    const bubbleMap: { [key: string]: string } = {
      'a': 'ⓐ', 'b': 'ⓑ', 'c': 'ⓒ', 'd': 'ⓓ', 'e': 'ⓔ', 'f': 'ⓕ',
      'g': 'ⓖ', 'h': 'ⓗ', 'i': 'ⓘ', 'j': 'ⓙ', 'k': 'ⓚ', 'l': 'ⓛ',
      'm': 'ⓜ', 'n': 'ⓝ', 'o': 'ⓞ', 'p': 'ⓟ', 'q': 'ⓠ', 'r': 'ⓡ',
      's': 'ⓢ', 't': 'ⓣ', 'u': 'ⓤ', 'v': 'ⓥ', 'w': 'ⓦ', 'x': 'ⓧ',
      'y': 'ⓨ', 'z': 'ⓩ', 'A': 'Ⓐ', 'B': 'Ⓑ', 'C': 'Ⓒ', 'D': 'Ⓓ',
      'E': 'Ⓔ', 'F': 'Ⓕ', 'G': 'Ⓖ', 'H': 'Ⓗ', 'I': 'Ⓘ', 'J': 'Ⓙ',
      'K': 'Ⓚ', 'L': 'Ⓛ', 'M': 'Ⓜ', 'N': 'Ⓝ', 'O': 'Ⓞ', 'P': 'Ⓟ',
      'Q': 'Ⓠ', 'R': 'Ⓡ', 'S': 'Ⓢ', 'T': 'Ⓣ', 'U': 'Ⓤ', 'V': 'Ⓥ',
      'W': 'Ⓦ', 'X': 'Ⓧ', 'Y': 'Ⓨ', 'Z': 'Ⓩ', '0': '⓪', '1': '①',
      '2': '②', '3': '③', '4': '④', '5': '⑤', '6': '⑥', '7': '⑦',
      '8': '⑧', '9': '⑨', ' ': ' '
    };

    // Convert each character using the map or keep original if not in map
    const result = text.split('').map(char => bubbleMap[char] || char).join('');
    setOutputText(result);
  };

  const handleCopyToClipboard = () => {
    if (outputText) {
      navigator.clipboard.writeText(outputText)
        .then(() => {
          toast({
            title: "Copied!",
            description: "Bubble text copied to clipboard",
          });
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

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="mb-6">
          <label htmlFor="input-text" className="block text-sm font-medium mb-2">
            Enter Your Text
          </label>
          <Input
            id="input-text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type here to generate bubble text..."
            className="w-full"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            Bubble Text Result
          </label>
          <div className="p-4 bg-muted rounded-md min-h-[60px] break-words">
            {outputText || "Your bubble text will appear here..."}
          </div>
        </div>

        <Button 
          onClick={handleCopyToClipboard} 
          disabled={!outputText} 
          className="w-full"
        >
          <Copy className="mr-2 h-4 w-4" /> Copy Bubble Text
        </Button>
      </CardContent>
    </Card>
  );
};

export default BubbleTextGenerator;
