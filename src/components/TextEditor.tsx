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
  Trash2,
  SortAsc,
  SortDesc,
  Shuffle,
  FileText,
} from 'lucide-react';

export const TextEditor = () => {
  const [text, setText] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [fontFamily, setFontFamily] = useState('Inter');
  const [fontSize, setFontSize] = useState('16px');
  const [lineHeight, setLineHeight] = useState('1.5');
  const [textColor, setTextColor] = useState('#000000');
  const [backgroundColor, setBackgroundColor] = useState('transparent');
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

  const handleFontChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFontFamily(e.target.value);
    const textarea = document.querySelector('textarea');
    if (textarea) {
      textarea.style.fontFamily = e.target.value;
    }
  };

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFontSize(e.target.value);
    const textarea = document.querySelector('textarea');
    if (textarea) {
      textarea.style.fontSize = e.target.value;
    }
  };

  const handleLineHeightChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLineHeight(e.target.value);
    const textarea = document.querySelector('textarea');
    if (textarea) {
      textarea.style.lineHeight = e.target.value;
    }
  };

  const handleTextColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextColor(e.target.value);
    const textarea = document.querySelector('textarea');
    if (textarea) {
      textarea.style.color = e.target.value;
    }
  };

  const handleBackgroundColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBackgroundColor(e.target.value);
    const textarea = document.querySelector('textarea');
    if (textarea) {
      textarea.style.backgroundColor = e.target.value;
    }
  };

  const removeDuplicateWords = () => {
    const words = text.split(/\s+/);
    const uniqueWords = [...new Set(words)];
    setText(uniqueWords.join(' '));
    toast({
      title: "Duplicates removed",
      description: "Duplicate words have been removed from the text.",
    });
  };

  const sortWords = (ascending: boolean = true) => {
    const words = text.split(/\s+/);
    const sortedWords = words.sort((a, b) => {
      return ascending ? a.localeCompare(b) : b.localeCompare(a);
    });
    setText(sortedWords.join(' '));
    toast({
      title: "Text sorted",
      description: `Words have been sorted in ${ascending ? 'ascending' : 'descending'} order.`,
    });
  };

  const shuffleWords = () => {
    const words = text.split(/\s+/);
    for (let i = words.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [words[i], words[j]] = [words[j], words[i]];
    }
    setText(words.join(' '));
    toast({
      title: "Text shuffled",
      description: "Words have been randomly shuffled.",
    });
  };

  const generateLoremIpsum = () => {
    const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
    setText(loremIpsum);
    toast({
      title: "Lorem Ipsum generated",
      description: "Random text has been generated.",
    });
  };

  const fontFamilies = [
    { label: 'Inter', value: 'Inter' },
    { label: 'Arial', value: 'Arial' },
    { label: 'Times New Roman', value: 'Times New Roman' },
    { label: 'Courier New', value: 'Courier New' },
    { label: 'Georgia', value: 'Georgia' },
  ];

  const fontSizes = [
    { label: 'Small', value: '14px' },
    { label: 'Normal', value: '16px' },
    { label: 'Large', value: '18px' },
    { label: 'Extra Large', value: '20px' },
  ];

  const lineHeights = [
    { label: 'Tight', value: '1.2' },
    { label: 'Normal', value: '1.5' },
    { label: 'Relaxed', value: '1.8' },
    { label: 'Double', value: '2' },
  ];

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

          <div className="flex gap-2">
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

        <div className="flex flex-wrap gap-4 pb-4 border-b">
          <select
            value={fontFamily}
            onChange={handleFontChange}
            className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            {fontFamilies.map(font => (
              <option key={font.value} value={font.value}>
                {font.label}
              </option>
            ))}
          </select>

          <select
            value={fontSize}
            onChange={handleFontSizeChange}
            className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            {fontSizes.map(size => (
              <option key={size.value} value={size.value}>
                {size.label}
              </option>
            ))}
          </select>

          <select
            value={lineHeight}
            onChange={handleLineHeightChange}
            className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            {lineHeights.map(height => (
              <option key={height.value} value={height.value}>
                {height.label}
              </option>
            ))}
          </select>

          <div className="flex items-center gap-2">
            <input
              type="color"
              value={textColor}
              onChange={handleTextColorChange}
              className="w-8 h-8 rounded cursor-pointer"
              title="Text Color"
            />
            <input
              type="color"
              value={backgroundColor}
              onChange={handleBackgroundColorChange}
              className="w-8 h-8 rounded cursor-pointer"
              title="Highlight Color"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pb-4 border-b">
          <Button
            variant="outline"
            onClick={removeDuplicateWords}
            className="hover:bg-slate-100"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Remove Duplicates
          </Button>
          <Button
            variant="outline"
            onClick={() => sortWords(true)}
            className="hover:bg-slate-100"
          >
            <SortAsc className="h-4 w-4 mr-2" />
            Sort A-Z
          </Button>
          <Button
            variant="outline"
            onClick={() => sortWords(false)}
            className="hover:bg-slate-100"
          >
            <SortDesc className="h-4 w-4 mr-2" />
            Sort Z-A
          </Button>
          <Button
            variant="outline"
            onClick={shuffleWords}
            className="hover:bg-slate-100"
          >
            <Shuffle className="h-4 w-4 mr-2" />
            Shuffle
          </Button>
          <Button
            variant="outline"
            onClick={generateLoremIpsum}
            className="hover:bg-slate-100"
          >
            <FileText className="h-4 w-4 mr-2" />
            Lorem Ipsum
          </Button>
        </div>

        <textarea
          value={text}
          onChange={handleTextChange}
          className="w-full h-64 p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200 resize-none font-sans"
          placeholder="Enter or paste your text here..."
          style={{
            fontFamily,
            fontSize,
            lineHeight,
            color: textColor,
            backgroundColor,
          }}
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
