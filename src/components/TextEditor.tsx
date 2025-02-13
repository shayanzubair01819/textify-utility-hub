import React, { useState, useEffect, useCallback } from 'react';
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
  Download,
  Upload,
  Code,
  FileCode,
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
  const [searchTerm, setSearchTerm] = useState('');
  const [replaceText, setReplaceText] = useState('');
  const [convertedHTML, setConvertedHTML] = useState('');
  const [showHTML, setShowHTML] = useState(false);
  const [fileName, setFileName] = useState('');
  const [isMarkdownPreview, setIsMarkdownPreview] = useState(false);
  const [markdownHTML, setMarkdownHTML] = useState('');
  const { toast } = useToast();

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

  const handleSearch = () => {
    if (!searchTerm) return;
    const regex = new RegExp(searchTerm, 'gi');
    const newText = text.replace(regex, match => `<mark>${match}</mark>`);
    const textarea = document.querySelector('textarea');
    if (textarea) {
      textarea.innerHTML = newText;
    }
    toast({
      title: "Search completed",
      description: `Highlighted all occurrences of "${searchTerm}"`,
    });
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

  return (
    <div className="w-full max-w-5xl mx-auto p-6 space-y-8 animate-fadeIn">
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Advanced Text Editor
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          A powerful tool for formatting, converting, and manipulating text. Use the toolbars below to transform your content.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-slate-200">
        <div className="border-b border-slate-200">
          <div className="p-4 space-y-4">
            <div className="flex flex-wrap gap-2 items-center">
              <div className="flex items-center gap-2 p-1 bg-slate-50 rounded-lg">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleAlignment('left')}
                  className="hover:bg-slate-100"
                >
                  <AlignLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleAlignment('center')}
                  className="hover:bg-slate-100"
                >
                  <AlignCenter className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleAlignment('right')}
                  className="hover:bg-slate-100"
                >
                  <AlignRight className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center gap-2 p-1 bg-slate-50 rounded-lg">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleStyle('bold')}
                  className="hover:bg-slate-100"
                >
                  <Bold className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleStyle('italic')}
                  className="hover:bg-slate-100"
                >
                  <Italic className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleStyle('underline')}
                  className="hover:bg-slate-100"
                >
                  <Underline className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={fontFamily}
                  onChange={handleFontChange}
                  className="px-3 py-1 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 bg-slate-50"
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
                  className="px-3 py-1 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 bg-slate-50"
                >
                  {fontSizes.map(size => (
                    <option key={size.value} value={size.value}>
                      {size.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-600">Text:</span>
                <input
                  type="color"
                  value={textColor}
                  onChange={handleTextColorChange}
                  className="w-8 h-8 rounded cursor-pointer"
                  title="Text Color"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-600">Background:</span>
                <input
                  type="color"
                  value={backgroundColor}
                  onChange={handleBackgroundColorChange}
                  className="w-8 h-8 rounded cursor-pointer"
                  title="Background Color"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-slate-200 p-4 space-y-4">
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[200px] space-y-2">
                <label className="text-sm font-medium text-slate-600">Search & Replace</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Find..."
                    className="flex-1 px-3 py-1 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  <input
                    type="text"
                    value={replaceText}
                    onChange={(e) => setReplaceText(e.target.value)}
                    placeholder="Replace with..."
                    className="flex-1 px-3 py-1 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleReplace}
                    className="whitespace-nowrap"
                  >
                    Replace All
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 items-center">
              <div className="space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={convertToHTML}
                  className="hover:bg-slate-100"
                >
                  HTML
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (isMarkdownPreview) {
                      setIsMarkdownPreview(false);
                    } else {
                      convertToMarkdown();
                    }
                  }}
                  className="hover:bg-slate-100"
                >
                  {isMarkdownPreview ? 'Edit' : 'Preview'}
                </Button>
              </div>

              <div className="space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={encodeBase64}
                  className="hover:bg-slate-100"
                >
                  <Code className="h-4 w-4 mr-2" />
                  Encode
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={decodeBase64}
                  className="hover:bg-slate-100"
                >
                  <Code className="h-4 w-4 mr-2" />
                  Decode
                </Button>
              </div>

              <div className="space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById('fileInput')?.click()}
                  className="hover:bg-slate-100"
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
                  size="sm"
                  onClick={handleFileExport}
                  className="hover:bg-slate-100"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4">
          {isMarkdownPreview ? (
            <div 
              className="w-full min-h-[24rem] p-6 border rounded-lg bg-slate-50 overflow-auto prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: markdownHTML }}
            />
          ) : showHTML ? (
            <div className="w-full min-h-[24rem] p-6 border rounded-lg bg-slate-50 overflow-auto">
              <pre className="text-sm font-mono whitespace-pre-wrap">{convertedHTML}</pre>
            </div>
          ) : (
            <textarea
              value={text}
              onChange={handleTextChange}
              className="w-full min-h-[24rem] p-6 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200 resize-vertical font-sans"
              placeholder="Start typing or paste your text here... (Ctrl+B for bold, Ctrl+I for italic, Ctrl+S to save)"
              style={{
                fontFamily,
                fontSize,
                lineHeight,
                color: textColor,
                backgroundColor,
              }}
            />
          )}

          <div className="flex items-center justify-between mt-4 px-2 text-sm text-slate-600">
            <div className="flex items-center gap-4">
              <span>{wordCount} words</span>
              <span>{charCount} characters</span>
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
      </div>

      <div className="text-center">
        <div className="inline-block px-4 py-2 bg-slate-100 rounded-lg text-sm text-slate-600">
          <span className="font-medium">Keyboard shortcuts:</span>{' '}
          <kbd className="px-2 py-1 bg-white rounded border shadow-sm mx-1">Ctrl/⌘ + B</kbd> Bold,{' '}
          <kbd className="px-2 py-1 bg-white rounded border shadow-sm mx-1">Ctrl/⌘ + I</kbd> Italic,{' '}
          <kbd className="px-2 py-1 bg-white rounded border shadow-sm mx-1">Ctrl/⌘ + S</kbd> Save
        </div>
      </div>
    </div>
  );
};

export default TextEditor;
