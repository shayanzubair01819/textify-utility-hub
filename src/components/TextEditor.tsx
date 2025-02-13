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
    if (!searchTerm) return;
    const regex = new RegExp(searchTerm, 'gi');
    const newText = text.replace(regex, replaceText);
    setText(newText);
    toast({
      title: "Replace completed",
      description: `Replaced all occurrences of "${searchTerm}" with "${replaceText}"`,
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

  const ColorPicker = ({ value, onChange, title }: { value: string; onChange: (color: string) => void; title: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [tempColor, setTempColor] = useState(value);
    
    const presetColors = [
      '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF',
      '#FFFF00', '#FF00FF', '#00FFFF', '#808080', '#800000',
      '#808000', '#008000', '#800080', '#008080', '#000080',
      '#FFA500', '#A52A2A', '#DEB887', '#5F9EA0', '#7FFF00',
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
            className="w-[150px] justify-start text-left font-normal"
          >
            <div
              className="w-4 h-4 rounded-full mr-2 shrink-0"
              style={{ backgroundColor: value }}
            />
            {title}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[280px]">
          <div className="space-y-4">
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium">Custom Color</label>
              <input
                type="color"
                value={tempColor}
                onChange={handleColorChange}
                className="w-full h-8 cursor-pointer"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Preset Colors</label>
              <div className="grid grid-cols-5 gap-2">
                {presetColors.map((color) => (
                  <button
                    key={color}
                    className={`w-8 h-8 rounded-full border-2 ${
                      tempColor === color ? 'border-primary' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => handlePresetClick(color)}
                  />
                ))}
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6">
      <div className="text-center space-y-2 sm:space-y-3">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Advanced Text Editor
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto px-4">
          A powerful tool for formatting, converting, and manipulating text
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-3 border-b">
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-1 p-1 bg-slate-50 rounded-lg">
              <Button
                variant="ghost"
                size={isMobile ? "sm" : "default"}
                onClick={() => handleAlignment('left')}
                className="hover:bg-slate-100"
              >
                <AlignLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size={isMobile ? "sm" : "default"}
                onClick={() => handleAlignment('center')}
                className="hover:bg-slate-100"
              >
                <AlignCenter className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size={isMobile ? "sm" : "default"}
                onClick={() => handleAlignment('right')}
                className="hover:bg-slate-100"
              >
                <AlignRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center gap-1 p-1 bg-slate-50 rounded-lg">
              <Button
                variant="ghost"
                size={isMobile ? "sm" : "default"}
                onClick={() => handleStyle('bold')}
                className="hover:bg-slate-100"
              >
                <Bold className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size={isMobile ? "sm" : "default"}
                onClick={() => handleStyle('italic')}
                className="hover:bg-slate-100"
              >
                <Italic className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size={isMobile ? "sm" : "default"}
                onClick={() => handleStyle('underline')}
                className="hover:bg-slate-100"
              >
                <Underline className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <select
              value={fontFamily}
              onChange={handleFontChange}
              className="px-2 py-1 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 bg-slate-50"
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
              className="px-2 py-1 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 bg-slate-50"
            >
              {fontSizes.map(size => (
                <option key={size.value} value={size.value}>
                  {size.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-wrap gap-2">
            <ColorPicker
              value={textColor}
              onChange={(color: string) => handleTextColorChange(color)}
              title="Text Color"
            />
            <ColorPicker
              value={backgroundColor}
              onChange={(color: string) => handleBackgroundColorChange(color)}
              title="Background Color"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex-1 flex gap-2">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
                className="flex-1 px-2 py-1 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <Button
                variant="outline"
                size={isMobile ? "sm" : "default"}
                onClick={handleSearch}
                className="whitespace-nowrap"
              >
                Search
              </Button>
            </div>
            <div className="flex-1 flex gap-2">
              <input
                type="text"
                value={replaceText}
                onChange={(e) => setReplaceText(e.target.value)}
                placeholder="Replace..."
                className="flex-1 px-2 py-1 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <Button
                variant="outline"
                size={isMobile ? "sm" : "default"}
                onClick={handleReplace}
                className="whitespace-nowrap"
              >
                Replace
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pb-3 border-b">
          <Button
            variant="outline"
            size={isMobile ? "sm" : "default"}
            onClick={convertToHTML}
            className="w-full"
          >
            HTML
          </Button>
          <Button
            variant="outline"
            size={isMobile ? "sm" : "default"}
            onClick={() => {
              if (isMarkdownPreview) {
                setIsMarkdownPreview(false);
              } else {
                convertToMarkdown();
              }
            }}
            className="w-full"
          >
            {isMarkdownPreview ? 'Edit' : 'Preview'}
          </Button>
          <Button
            variant="outline"
            size={isMobile ? "sm" : "default"}
            onClick={encodeBase64}
            className="w-full"
          >
            Encode
          </Button>
          <Button
            variant="outline"
            size={isMobile ? "sm" : "default"}
            onClick={decodeBase64}
            className="w-full"
          >
            Decode
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 pb-3 border-b">
          <Button
            variant="outline"
            size={isMobile ? "sm" : "default"}
            onClick={() => document.getElementById('fileInput')?.click()}
            className="flex-1 sm:flex-none"
          >
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <input
            id="fileInput"
            type="file"
            onChange={handleFileImport}
            className="hidden"
            accept=".txt,.md"
          />
          <Button
            variant="outline"
            size={isMobile ? "sm" : "default"}
            onClick={handleFileExport}
            className="flex-1 sm:flex-none"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>

        {isMarkdownPreview ? (
          <div 
            className="w-full min-h-[16rem] sm:min-h-[24rem] p-3 sm:p-4 border rounded-lg bg-slate-50 overflow-auto prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: markdownHTML }}
          />
        ) : showHTML ? (
          <div className="w-full min-h-[16rem] sm:min-h-[24rem] p-3 sm:p-4 border rounded-lg bg-slate-50 overflow-auto">
            <div
              className="whitespace-pre-wrap font-mono text-sm"
              dangerouslySetInnerHTML={{ __html: convertedHTML }}
            />
          </div>
        ) : (
          <textarea
            value={text}
            onChange={handleTextChange}
            className="w-full min-h-[16rem] sm:min-h-[24rem] p-3 sm:p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200 resize-vertical font-sans"
            placeholder={isMobile ? "Enter text here..." : "Enter or paste your text here... (Ctrl+B for bold, Ctrl+I for italic, Ctrl+S to save)"}
            style={{
              fontFamily,
              fontSize,
              lineHeight,
              color: textColor,
              backgroundColor,
            }}
          />
        )}

        <div className="flex items-center justify-between text-sm text-slate-600">
          <div className="flex flex-wrap items-center gap-3">
            <span>{wordCount} words</span>
            <span>{charCount} chars</span>
            {fileName && (
              <span className="flex items-center gap-1">
                <FileText className="h-4 w-4" />
                {fileName}
              </span>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="hover:bg-slate-100"
          >
            <Copy className="h-4 w-4 mr-2" />
            Copy
          </Button>
        </div>
      </div>

      {!isMobile && (
        <div className="text-center">
          <div className="inline-block px-3 py-2 bg-slate-100 rounded-lg text-xs sm:text-sm text-slate-600">
            <span className="font-medium">Shortcuts:</span>{' '}
            <kbd className="px-1.5 py-0.5 bg-white rounded border shadow-sm mx-1">Ctrl/⌘ + B</kbd> Bold,{' '}
            <kbd className="px-1.5 py-0.5 bg-white rounded border shadow-sm mx-1">Ctrl/⌘ + I</kbd> Italic,{' '}
            <kbd className="px-1.5 py-0.5 bg-white rounded border shadow-sm mx-1">Ctrl/⌘ + S</kbd> Save
          </div>
        </div>
      )}
    </div>
  );
};

export default TextEditor;
