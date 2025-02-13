
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Underline,
  Copy,
} from 'lucide-react';

export const TextEditor = () => {
  const [text, setText] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    updateCounts(text);
  }, [text]);

  const updateCounts = (value: string) => {
    setCharCount(value.length);
    setWordCount(value.trim() === '' ? 0 : value.trim().split(/\s+/).length);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleCaseChange = (type: string) => {
    switch (type) {
      case 'upper':
        setText(text.toUpperCase());
        break;
      case 'lower':
        setText(text.toLowerCase());
        break;
      case 'title':
        setText(
          text.toLowerCase().replace(/(?:^|\s)\w/g, (letter) => letter.toUpperCase())
        );
        break;
      case 'sentence':
        setText(
          text.toLowerCase().replace(/(^\w|\.\s+\w)/g, (letter) => letter.toUpperCase())
        );
        break;
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied to clipboard",
        description: "Text has been copied successfully.",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleAlignment = (alignment: string) => {
    const textarea = document.querySelector('textarea');
    if (textarea) {
      textarea.style.textAlign = alignment;
    }
  };

  const handleStyle = (style: string) => {
    const textarea = document.querySelector('textarea');
    if (textarea) {
      switch (style) {
        case 'bold':
          textarea.style.fontWeight = textarea.style.fontWeight === 'bold' ? 'normal' : 'bold';
          break;
        case 'italic':
          textarea.style.fontStyle = textarea.style.fontStyle === 'italic' ? 'normal' : 'italic';
          break;
        case 'underline':
          textarea.style.textDecoration = textarea.style.textDecoration === 'underline' ? 'none' : 'underline';
          break;
      }
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6 animate-fadeIn">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-primary mb-2">Text Formatter</h1>
        <p className="text-slate-600">A beautiful tool for all your text formatting needs</p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
        <div className="flex flex-wrap gap-2 pb-4 border-b">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleAlignment('left')}
              className="hover:bg-slate-100"
            >
              <AlignLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleAlignment('center')}
              className="hover:bg-slate-100"
            >
              <AlignCenter className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleAlignment('right')}
              className="hover:bg-slate-100"
            >
              <AlignRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleStyle('bold')}
              className="hover:bg-slate-100"
            >
              <Bold className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleStyle('italic')}
              className="hover:bg-slate-100"
            >
              <Italic className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleStyle('underline')}
              className="hover:bg-slate-100"
            >
              <Underline className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex gap-2 ml-auto">
            <Button
              variant="outline"
              onClick={() => handleCaseChange('upper')}
              className="hover:bg-slate-100"
            >
              ABC
            </Button>
            <Button
              variant="outline"
              onClick={() => handleCaseChange('lower')}
              className="hover:bg-slate-100"
            >
              abc
            </Button>
            <Button
              variant="outline"
              onClick={() => handleCaseChange('title')}
              className="hover:bg-slate-100"
            >
              Title
            </Button>
            <Button
              variant="outline"
              onClick={() => handleCaseChange('sentence')}
              className="hover:bg-slate-100"
            >
              Sentence
            </Button>
          </div>
        </div>

        <textarea
          value={text}
          onChange={handleTextChange}
          className="w-full h-64 p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200 resize-none font-sans"
          placeholder="Enter or paste your text here..."
        />

        <div className="flex items-center justify-between text-sm text-slate-600">
          <div className="flex gap-4">
            <span>{wordCount} words</span>
            <span>{charCount} characters</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className="hover:bg-slate-100"
          >
            <Copy className="h-4 w-4 mr-2" />
            Copy
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TextEditor;
