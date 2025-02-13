import React, { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
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
  Download,
  Upload,
  Code,
  FileCode,
  Menu,
} from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export const TextEditor = () => {
  const [text, setText] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [fontFamily, setFontFamily] = useState('Inter');
  const [fontSize, setFontSize] = useState('16px');
  const [lineHeight, setLineHeight] = useState('1.5');
  const [textColor, setTextColor] = useState('#000000');
  const [backgroundColor, setBackgroundColor] = useState('transparent');
  const [searchTerm, setSearchTerm] = useState('');
  const [replaceText, setReplaceText] = useState('');
  const [convertedHTML, setConvertedHTML] = useState('');
  const [showHTML, setShowHTML] = useState(false);
  const [fileName, setFileName] = useState('');
  const [isMarkdownPreview, setIsMarkdownPreview] = useState(false);
  const [markdownHTML, setMarkdownHTML] = useState('');
  const { toast } = useToast();
  const isMobile = useIsMobile();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      updateCounts(text);
    }, 300); // Debounce count updates

    return () => clearTimeout(timeoutId);
  }, [text]);

  const updateCounts = useCallback((value: string) => {
    setCharCount(value.length);
    setWordCount(value.trim() === '' ? 0 : value.trim().split(/\s+/).length);
  }, []);

  const handleTextChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  }, []);

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

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied to clipboard",
        description: "Text has been copied successfully.",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again or use Ctrl+C/Cmd+C.",
        variant: "destructive",
      });
    }
  }, [text, toast]);

  // Ensure text formatting functions work consistently
  const handleAlignment = useCallback((alignment: string) => {
    const textarea = document.querySelector('textarea');
    if (textarea) {
      textarea.style.textAlign = alignment;
    }
  }, []);

  const handleStyle = useCallback((style: string) => {
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
  }, []);

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

  const handleTextColorChange = useCallback((colorValue: string | React.ChangeEvent<HTMLInputElement>) => {
    const newColor = typeof colorValue === 'string' ? colorValue : colorValue.target.value;
    setTextColor(newColor);
    const textarea = document.querySelector('textarea');
    if (textarea) {
      textarea.style.color = newColor;
    }
  }, []);

  const handleBackgroundColorChange = useCallback((colorValue: string | React.ChangeEvent<HTMLInputElement>) => {
    const newColor = typeof colorValue === 'string' ? colorValue : colorValue.target.value;
    setBackgroundColor(newColor);
    const textarea = document.querySelector('textarea');
    if (textarea) {
      textarea.style.backgroundColor = newColor;
    }
  }, []);

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

  const handleSearch = () => {
    if (!searchTerm) return;

    const textarea = document.querySelector('textarea');
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const currentText = text;
    if (searchTerm) {
      const regex = new RegExp(searchTerm, 'gi');
      const matches = Array.from(currentText.matchAll(regex));
      
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = currentText;
      
      matches.forEach(match => {
        const matchIndex = match.index || 0;
        const matchText = match[0];
        const span = `<mark style="background-color: #fff3cd; padding: 0 2px; border-radius: 2px;">${matchText}</mark>`;
        tempDiv.innerHTML = tempDiv.innerHTML.slice(0, matchIndex) + span + tempDiv.innerHTML.slice(matchIndex + matchText.length);
      });

      setConvertedHTML(tempDiv.innerHTML);
      setShowHTML(true);
      
      toast({
        title: "Search results",
        description: `Found ${matches.length} matches for "${searchTerm}"`,
      });
    }

    textarea.setSelectionRange(start, end);
  };

  const handleReplace = () => {
    if (!searchTerm) {
      toast({
        title: "Search term required",
        description: "Please enter a search term before replacing.",
        variant: "destructive",
      });
      return;
    }

    const regex = new RegExp(searchTerm, 'gi');
    const matchCount = (text.match(regex) || []).length;
    
    if (matchCount === 0) {
      toast({
        title: "No matches found",
        description: `No occurrences of "${searchTerm}" were found in the text.`,
        variant: "destructive",
      });
      return;
    }

    const newText = text.replace(regex, replaceText);
    setText(newText);
    toast({
      title: "Replace completed",
      description: `Replaced ${matchCount} ${matchCount === 1 ? 'occurrence' : 'occurrences'} of "${searchTerm}" with "${replaceText}"`,
    });
  };

  const convertToHTML = () => {
    const htmlText = text
      .split('\n')
      .map(paragraph => `<p>${paragraph}</p>`)
      .join('\n');
    setConvertedHTML(htmlText);
    setShowHTML(true);
    toast({
      title: "Converted to HTML",
      description: "Text has been converted to HTML format",
    });
  };

  const convertFromHTML = () => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = text;
    const plainText = tempDiv.textContent || tempDiv.innerText;
    setText(plainText);
    setShowHTML(false);
    toast({
      title: "Converted from HTML",
      description: "HTML has been converted to plain text",
    });
  };

  const handleFileImport = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setFileName(file.name);
      const content = await file.text();
      setText(content);
      toast({
        title: "File imported",
        description: `Successfully imported ${file.name}`,
      });
    } catch (error) {
      toast({
        title: "Import failed",
        description: "Failed to read the file. Please try again.",
        variant: "destructive",
      });
    } finally {
      if (e.target) e.target.value = '';
    }
  }, [toast]);

  const handleFileExport = () => {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName || 'text-export.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({
      title: "File exported",
      description: "Text has been exported successfully.",
    });
  };

  const encodeBase64 = () => {
    try {
      const encoded = btoa(text);
      setText(encoded);
      toast({
        title: "Text encoded",
        description: "Text has been encoded to Base64.",
      });
    } catch (err) {
      toast({
        title: "Encoding failed",
        description: "Please ensure your text contains valid characters.",
        variant: "destructive",
      });
    }
  };

  const decodeBase64 = () => {
    try {
      const decoded = atob(text);
      setText(decoded);
      toast({
        title: "Text decoded",
        description: "Base64 has been decoded to text.",
      });
    } catch (err) {
      toast({
        title: "Decoding failed",
        description: "Please ensure your input is valid Base64.",
        variant: "destructive",
      });
    }
  };

  const convertToMarkdown = useCallback(() => {
    if (!text.trim()) {
      toast({
        title: "No content",
        description: "Please enter some text to preview as Markdown.",
        variant: "destructive",
      });
      return;
    }

    const html = text
      .replace(/#{6}\s?([^\n]+)/g, '<h6>$1</h6>')
      .replace(/#{5}\s?([^\n]+)/g, '<h5>$1</h5>')
      .replace(/#{4}\s?([^\n]+)/g, '<h4>$1</h4>')
      .replace(/#{3}\s?([^\n]+)/g, '<h3>$1</h3>')
      .replace(/#{2}\s?([^\n]+)/g, '<h2>$1</h2>')
      .replace(/#{1}\s?([^\n]+)/g, '<h1>$1</h1>')
      .replace(/\*\*([^\*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^\*]+)\*/g, '<em>$1</em>')
      .replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2">$1</a>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>');
    
    setMarkdownHTML(`<div class="markdown-preview"><p>${html}</p></div>`);
    setIsMarkdownPreview(true);
    toast({
      title: "Markdown preview",
      description: "Viewing markdown preview. Click again to return to edit mode.",
    });
  }, [text, toast]);

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

  useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault();
        handleStyle('bold');
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'i') {
        e.preventDefault();
        handleStyle('italic');
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleFileExport();
      }
    };

    window.addEventListener('keydown', handleKeyboard);
    return () => window.removeEventListener('keydown', handleKeyboard);
  }, [handleStyle, handleFileExport]);

  // Enhanced ColorPicker with contained layout
  const ColorPicker = ({ value, onChange, title }: { value: string; onChange: (color: string) => void; title: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [tempColor, setTempColor] = useState(value);
    
    const presetColors = [
      ['#000000', '#434343', '#666666', '#999999', '#B7B7B7'],
      ['#FFFFFF', '#F3F3F3', '#E5E5E5', '#D4D4D4', '#C8C8C8'],
      ['#FF0000', '#FF4D4D', '#FF9999', '#FFE5E5', '#FFF2F2'],
      ['#0000FF', '#4D4DFF', '#9999FF', '#E5E5FF', '#F2F2FF']
    ];

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newColor = e.target.value;
      setTempColor(newColor);
      onChange(newColor);
    };

    const handlePresetClick = (color: string) => {
      setTempColor(color);
      onChange(color);
    };

    return (
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-[120px] h-9 justify-start text-left font-normal"
          >
            <div
              className="w-4 h-4 rounded-full mr-2 shrink-0 border border-slate-200"
              style={{ backgroundColor: value }}
            />
            <span className="truncate">{title}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[240px] p-3">
          <div className="space-y-3">
            <div className="space-y-1.5">
              <label className="text-xs font-medium">Custom</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={tempColor}
                  onChange={handleColorChange}
                  className="w-24 h-8 p-1 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={tempColor.toUpperCase()}
                  onChange={(e) => handlePresetClick(e.target.value)}
                  className="w-20 px-2 text-xs border rounded"
                  placeholder="#000000"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium">Presets</label>
              <div className="grid gap-1">
                {presetColors.map((row, idx) => (
                  <div key={idx} className="flex gap-1">
                    {row.map((color) => (
                      <button
                        key={color}
                        className={`w-8 h-8 rounded transition-transform hover:scale-105 ${
                          tempColor === color ? 'ring-2 ring-primary ring-offset-2' : 'ring-1 ring-slate-200'
                        }`}
                        style={{ backgroundColor: color }}
                        onClick={() => handlePresetClick(color)}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-6 space-y-4">
      <div className="text-center space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Advanced Text Editor
        </h1>
        <p className="text-sm text-slate-600">
          A powerful tool for formatting and editing text
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-3 sm:p-4 space-y-3">
        {/* Text Formatting Tools */}
        <div className="flex flex-wrap gap-2 pb-3 border-b">
          <div className="inline-flex items-center rounded-lg bg-slate-50 p-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleAlignment('left')}
              className="h-8 w-8"
            >
              <AlignLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleAlignment('center')}
              className="h-8 w-8"
            >
              <AlignCenter className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleAlignment('right')}
              className="h-8 w-8"
            >
              <AlignRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="inline-flex items-center rounded-lg bg-slate-50 p-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleStyle('bold')}
              className="h-8 w-8"
            >
              <Bold className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleStyle('italic')}
              className="h-8 w-8"
            >
              <Italic className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleStyle('underline')}
              className="h-8 w-8"
            >
              <Underline className="h-4 w-4" />
            </Button>
          </div>

          <select
            value={fontFamily}
            onChange={handleFontChange}
            className="h-8 px-2 text-sm border rounded bg-slate-50"
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
            className="h-8 px-2 text-sm border rounded bg-slate-50"
          >
            {fontSizes.map(size => (
              <option key={size.value} value={size.value}>
                {size.label}
              </option>
            ))}
          </select>
        </div>

        {/* Color Controls */}
        <div className="flex flex-wrap gap-2 pb-3 border-b">
          <ColorPicker
            value={textColor}
            onChange={(color: string) => handleTextColorChange(color)}
            title="Text"
          />
          <ColorPicker
            value={backgroundColor}
            onChange={(color: string) => handleBackgroundColorChange(color)}
            title="Background"
          />
        </div>

        {/* Search and Replace */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pb-3 border-b">
          <div className="space-y-1">
            <label className="text-xs font-medium">Search</label>
            <div className="flex gap-1">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Find text..."
                className="flex-1 h-8 px-2 text-sm border rounded"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={handleSearch}
                className="whitespace-nowrap h-8"
              >
                Search
              </Button>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium">Replace</label>
            <div className="flex gap-1">
              <input
                type="text"
                value={replaceText}
                onChange={(e) => setReplaceText(e.target.value)}
                placeholder="Replace with..."
                className="flex-1 h-8 px-2 text-sm border rounded"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={handleReplace}
                className="whitespace-nowrap h-8"
              >
                Replace
              </Button>
            </div>
          </div>
        </div>

        {/* Text Area */}
        <textarea
          value={text}
          onChange={handleTextChange}
          className="w-full min-h-[200px] p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 resize-y"
          placeholder="Enter or paste your text here..."
          style={{
            fontFamily,
            fontSize,
            lineHeight,
            color: textColor,
            backgroundColor,
          }}
        />

        {/* Status Bar */}
        <div className="flex items-center justify-between text-sm text-slate-600">
          <div className="flex items-center gap-3">
            <span>{wordCount} words</span>
            <span>{charCount} chars</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="h-8"
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
