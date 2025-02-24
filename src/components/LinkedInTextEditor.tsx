import React, { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { AlignLeft, AlignCenter, AlignRight, Bold, Italic, Underline, Copy, Trash2, SortAsc, SortDesc, Shuffle, FileText, Download, Upload, Code, FileCode, RefreshCw } from 'lucide-react';
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
  const {
    toast
  } = useToast();
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
        setText(text.toLowerCase().replace(/(?:^|\s)\w/g, letter => letter.toUpperCase()));
        break;
      case 'sentence':
        setText(text.toLowerCase().replace(/(^\w|\.\s+\w)/g, letter => letter.toUpperCase()));
        break;
    }
  };
  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied to clipboard",
        description: "Text has been copied successfully."
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again or use Ctrl+C/Cmd+C.",
        variant: "destructive"
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
      description: "Duplicate words have been removed from the text."
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
      description: `Words have been sorted in ${ascending ? 'ascending' : 'descending'} order.`
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
      description: "Words have been randomly shuffled."
    });
  };
  const generateLoremIpsum = () => {
    const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
    setText(loremIpsum);
    toast({
      title: "Lorem Ipsum generated",
      description: "Random text has been generated."
    });
  };
  const highlightSearchResults = (content: string, term: string): string => {
    if (!term) return content;
    try {
      const regex = new RegExp(`(${term})`, 'gi');
      return content.replace(regex, `<span style="background-color: #9b87f5; color: white;">$1</span>`);
    } catch (e) {
      // In case of invalid regex characters
      return content;
    }
  };
  const handleSearch = () => {
    if (!searchTerm) {
      toast({
        title: "Search term required",
        description: "Please enter a text to search.",
        variant: "destructive"
      });
      return;
    }
    try {
      const regex = new RegExp(searchTerm, 'gi');
      const matches = text.match(regex);
      const count = matches ? matches.length : 0;
      if (count === 0) {
        toast({
          title: "No matches found",
          description: `No occurrences of "${searchTerm}" were found.`,
          variant: "destructive"
        });
        return;
      }
      const textarea = document.querySelector('textarea');
      if (textarea) {
        const highlightedText = text.replace(regex, `<span style="background-color: #9b87f5; color: white;">$1</span>`);
        textarea.style.display = 'none';
        let highlightDiv = document.getElementById('highlight-display');
        if (!highlightDiv) {
          highlightDiv = document.createElement('div');
          highlightDiv.id = 'highlight-display';
          textarea.parentNode?.insertBefore(highlightDiv, textarea);
        }
        highlightDiv.innerHTML = highlightedText.replace(/\n/g, '<br>');
        highlightDiv.style.cssText = getHighlightStyles();
        const clearButton = document.createElement('button');
        clearButton.textContent = 'Clear Search';
        clearButton.className = 'absolute top-2 right-2 px-3 py-1 text-sm bg-slate-100 hover:bg-slate-200 rounded z-10';
        clearButton.onclick = clearHighlights;
        highlightDiv.appendChild(clearButton);
      }
      toast({
        title: "Search completed",
        description: `Found ${count} ${count === 1 ? 'match' : 'matches'} for "${searchTerm}"`
      });
    } catch (e) {
      toast({
        title: "Search failed",
        description: "Invalid search pattern. Please try a different search term.",
        variant: "destructive"
      });
    }
  };
  const clearHighlights = () => {
    const textarea = document.querySelector('textarea');
    const highlightDiv = document.getElementById('highlight-display');
    if (textarea && highlightDiv) {
      textarea.style.display = 'block';
      highlightDiv.remove();
      setSearchTerm('');
    }
  };
  const handleReplace = () => {
    if (!searchTerm) {
      toast({
        title: "Search term required",
        description: "Please enter a text to search before replacing.",
        variant: "destructive"
      });
      return;
    }
    try {
      const regex = new RegExp(searchTerm, 'gi');
      const matches = text.match(regex);
      const count = matches ? matches.length : 0;
      if (count === 0) {
        toast({
          title: "No matches found",
          description: `No occurrences of "${searchTerm}" were found to replace.`,
          variant: "destructive"
        });
        return;
      }
      const newText = text.replace(regex, replaceText);
      setText(newText);

      // Clear any existing highlights after replacement
      clearHighlights();
      toast({
        title: "Replace completed",
        description: `Replaced ${count} ${count === 1 ? 'occurrence' : 'occurrences'} of "${searchTerm}" with "${replaceText}"`
      });
    } catch (e) {
      toast({
        title: "Replace failed",
        description: "Invalid search pattern. Please try a different search term.",
        variant: "destructive"
      });
    }
  };
  useEffect(() => {
    return () => {
      const highlightDiv = document.getElementById('highlight-display');
      if (highlightDiv) {
        highlightDiv.remove();
      }
    };
  }, []);
  useEffect(() => {
    if (showHTML || isMarkdownPreview) {
      clearHighlights();
    }
  }, [showHTML, isMarkdownPreview]);
  const convertToHTML = () => {
    const htmlText = text.split('\n').map(paragraph => `<p>${paragraph}</p>`).join('\n');
    setConvertedHTML(htmlText);
    setShowHTML(true);
    toast({
      title: "Converted to HTML",
      description: "Text has been converted to HTML format"
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
      description: "HTML has been converted to plain text"
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
        description: `Successfully imported ${file.name}`
      });
    } catch (error) {
      toast({
        title: "Import failed",
        description: "Failed to read the file. Please try again.",
        variant: "destructive"
      });
    } finally {
      if (e.target) e.target.value = '';
    }
  }, [toast]);
  const handleFileExport = () => {
    const blob = new Blob([text], {
      type: 'text/plain'
    });
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
      description: "Text has been exported successfully."
    });
  };
  const encodeBase64 = () => {
    try {
      const encoded = btoa(text);
      setText(encoded);
      toast({
        title: "Text encoded",
        description: "Text has been encoded to Base64."
      });
    } catch (err) {
      toast({
        title: "Encoding failed",
        description: "Please ensure your text contains valid characters.",
        variant: "destructive"
      });
    }
  };
  const decodeBase64 = () => {
    try {
      const decoded = atob(text);
      setText(decoded);
      toast({
        title: "Text decoded",
        description: "Base64 has been decoded to text."
      });
    } catch (err) {
      toast({
        title: "Decoding failed",
        description: "Please ensure your input is valid Base64.",
        variant: "destructive"
      });
    }
  };
  const convertToMarkdown = useCallback(() => {
    if (!text.trim()) {
      toast({
        title: "No content",
        description: "Please enter some text to preview as Markdown.",
        variant: "destructive"
      });
      return;
    }
    const html = text.replace(/#{6}\s?([^\n]+)/g, '<h6>$1</h6>').replace(/#{5}\s?([^\n]+)/g, '<h5>$1</h5>').replace(/#{4}\s?([^\n]+)/g, '<h4>$1</h4>').replace(/#{3}\s?([^\n]+)/g, '<h3>$1</h3>').replace(/#{2}\s?([^\n]+)/g, '<h2>$1</h2>').replace(/#{1}\s?([^\n]+)/g, '<h1>$1</h1>').replace(/\*\*([^\*]+)\*\*/g, '<strong>$1</strong>').replace(/\*([^\*]+)\*/g, '<em>$1</em>').replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2">$1</a>').replace(/`([^`]+)`/g, '<code>$1</code>').replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>');
    setMarkdownHTML(`<div class="markdown-preview"><p>${html}</p></div>`);
    setIsMarkdownPreview(true);
    toast({
      title: "Markdown preview",
      description: "Viewing markdown preview. Click again to return to edit mode."
    });
  }, [text, toast]);
  const fontFamilies = [{
    label: 'Inter',
    value: 'Inter'
  }, {
    label: 'Arial',
    value: 'Arial'
  }, {
    label: 'Times New Roman',
    value: 'Times New Roman'
  }, {
    label: 'Courier New',
    value: 'Courier New'
  }, {
    label: 'Georgia',
    value: 'Georgia'
  }];
  const fontSizes = [{
    label: 'Small',
    value: '14px'
  }, {
    label: 'Normal',
    value: '16px'
  }, {
    label: 'Large',
    value: '18px'
  }, {
    label: 'Extra Large',
    value: '20px'
  }];
  const lineHeights = [{
    label: 'Tight',
    value: '1.2'
  }, {
    label: 'Normal',
    value: '1.5'
  }, {
    label: 'Relaxed',
    value: '1.8'
  }, {
    label: 'Double',
    value: '2'
  }];
  const getHighlightStyles = () => `
    white-space: pre-wrap;
    font-family: ${fontFamily};
    font-size: ${fontSize};
    line-height: ${lineHeight};
    color: ${textColor};
    background-color: ${backgroundColor};
    padding: 12px 16px;
    border: 1px solid #e2e8f0;
    border-radius: 0.5rem;
    min-height: 16rem;
    max-height: calc(100vh - 400px);
    overflow-y: auto;
    width: 100%;
    position: relative;
  `;
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
  const clearFormatting = () => {
    const textarea = document.querySelector('textarea');
    if (textarea) {
      // Reset all styling properties
      textarea.style.fontFamily = 'Inter';
      textarea.style.fontSize = '16px';
      textarea.style.lineHeight = '1.5';
      textarea.style.color = '#000000';
      textarea.style.backgroundColor = 'transparent';
      textarea.style.fontWeight = 'normal';
      textarea.style.fontStyle = 'normal';
      textarea.style.textDecoration = 'none';
      textarea.style.textAlign = 'left';

      // Reset all state variables related to formatting
      setFontFamily('Inter');
      setFontSize('16px');
      setLineHeight('1.5');
      setTextColor('#000000');
      setBackgroundColor('transparent');
      toast({
        title: "Formatting cleared",
        description: "All text formatting has been reset to default."
      });
    }
  };
  return <div className="w-full max-w-4xl mx-auto p-2 sm:p-4 md:p-6 space-y-4 sm:space-y-6 animate-fadeIn">
      <div className="text-center mb-4 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-2">LinkedIn Text Formatter – Style &amp; Format Text for LinkedIn Posts</h1>
        <p className="text-sm sm:text-base text-slate-600">Easily Format, Style &amp; Optimize Your LinkedIn Text with One Click</p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4">
        {/* Text Area moved to top for better accessibility */}
        {isMarkdownPreview ? <div className="w-full min-h-[16rem] max-h-[32rem] p-4 border rounded-lg bg-slate-50 overflow-auto prose prose-sm max-w-none" dangerouslySetInnerHTML={{
        __html: markdownHTML
      }} /> : showHTML ? <div className="w-full min-h-[16rem] max-h-[32rem] p-4 border rounded-lg bg-slate-50 overflow-auto">
            <pre className="text-sm font-mono whitespace-pre-wrap">{convertedHTML}</pre>
          </div> : <textarea value={text} onChange={handleTextChange} className="w-full min-h-[16rem] max-h-[32rem] p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200 resize-vertical font-sans text-sm sm:text-base" placeholder="Enter or paste your LinkedIn content here... (Ctrl+B for bold, Ctrl+I for italic, Ctrl+S to save)" style={{
        fontFamily,
        fontSize,
        lineHeight,
        color: textColor,
        backgroundColor
      }} />}

        {/* Quick stats for immediate feedback */}
        <div className="flex flex-wrap items-center justify-between text-xs sm:text-sm text-slate-600 gap-2 border-b pb-4">
          <div className="flex flex-wrap gap-2 sm:gap-4">
            <span>{wordCount} words</span>
            <span>{charCount} characters</span>
            {fileName && <span className="truncate max-w-[200px]">File: {fileName}</span>}
          </div>
          <Button variant="outline" size="sm" onClick={handleCopy} className="hover:bg-slate-100">
            <Copy className="h-4 w-4 mr-2" />
            Copy
          </Button>
        </div>

        {/* Formatting Tools */}
        <div className="flex flex-wrap gap-2 pb-4 border-b overflow-x-auto">
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={() => handleAlignment('left')} className="hover:bg-slate-100">
              <AlignLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => handleAlignment('center')} className="hover:bg-slate-100">
              <AlignCenter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => handleAlignment('right')} className="hover:bg-slate-100">
              <AlignRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={() => handleStyle('bold')} className="hover:bg-slate-100">
              <Bold className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => handleStyle('italic')} className="hover:bg-slate-100">
              <Italic className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => handleStyle('underline')} className="hover:bg-slate-100">
              <Underline className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={clearFormatting} className="hover:bg-slate-100" title="Clear Formatting">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Font Settings */}
        <div className="flex flex-wrap gap-4 pb-4 border-b">
          <select value={fontFamily} onChange={handleFontChange} className="px-2 sm:px-3 py-1 sm:py-2 text-sm sm:text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20">
            {fontFamilies.map(font => <option key={font.value} value={font.value}>
                {font.label}
              </option>)}
          </select>

          <select value={fontSize} onChange={handleFontSizeChange} className="px-2 sm:px-3 py-1 sm:py-2 text-sm sm:text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20">
            {fontSizes.map(size => <option key={size.value} value={size.value}>
                {size.label}
              </option>)}
          </select>

          <select value={lineHeight} onChange={handleLineHeightChange} className="px-2 sm:px-3 py-1 sm:py-2 text-sm sm:text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20">
            {lineHeights.map(height => <option key={height.value} value={height.value}>
                {height.label}
              </option>)}
          </select>

          <div className="flex items-center gap-2">
            <input type="color" value={textColor} onChange={handleTextColorChange} className="w-8 h-8 rounded cursor-pointer" title="Text Color" />
            <input type="color" value={backgroundColor} onChange={handleBackgroundColorChange} className="w-8 h-8 rounded cursor-pointer" title="Background Color" />
          </div>
        </div>

        {/* Search and Replace */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b">
          <div className="flex-1 flex gap-2">
            <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search text..." className="flex-1 px-3 py-2 text-sm sm:text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20" />
            <Button variant="outline" onClick={handleSearch} className="hover:bg-slate-100 whitespace-nowrap">
              Search
            </Button>
          </div>
          <div className="flex-1 flex gap-2">
            <input type="text" value={replaceText} onChange={e => setReplaceText(e.target.value)} placeholder="Replace with..." className="flex-1 px-3 py-2 text-sm sm:text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20" />
            <Button variant="outline" onClick={handleReplace} className="hover:bg-slate-100 whitespace-nowrap">
              Replace All
            </Button>
          </div>
        </div>

        {/* Additional Tools */}
        <div className="flex flex-wrap gap-2 pb-4 border-b">
          <div className="flex gap-2">
            <Button variant="outline" className="hover:bg-slate-100" onClick={() => document.getElementById('fileInput')?.click()}>
              <Upload className="h-4 w-4 mr-2" />
              Import
            </Button>
            <input id="fileInput" type="file" onChange={handleFileImport} className="hidden" accept=".txt,.md" />
            <Button variant="outline" className="hover:bg-slate-100" onClick={handleFileExport}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" className="hover:bg-slate-100" onClick={encodeBase64}>
              <Code className="h-4 w-4 mr-2" />
              Encode Base64
            </Button>
            <Button variant="outline" className="hover:bg-slate-100" onClick={decodeBase64}>
              <Code className="h-4 w-4 mr-2" />
              Decode Base64
            </Button>
          </div>

          <Button variant="outline" className="hover:bg-slate-100" onClick={() => {
          if (isMarkdownPreview) {
            setIsMarkdownPreview(false);
          } else {
            convertToMarkdown();
          }
        }}>
            <FileCode className="h-4 w-4 mr-2" />
            {isMarkdownPreview ? 'Edit Mode' : 'Preview Markdown'}
          </Button>
        </div>
      </div>

      <div className="text-center text-xs sm:text-sm text-slate-500 mt-4">
        <p>Keyboard shortcuts: Ctrl/Cmd + B (Bold), Ctrl/Cmd + I (Italic), Ctrl/Cmd + S (Save)</p>
      </div>
    </div>;
};
export default TextEditor;