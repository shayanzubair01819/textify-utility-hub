
import React, { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  AlignLeft, AlignCenter, AlignRight, AlignJustify, Bold, Italic, Underline, 
  StrikethroughIcon, Copy, Trash2, List, ListOrdered, Quote, Link, Download, 
  FileText, FileCode, DownloadCloud, RefreshCw, CheckIcon
} from 'lucide-react';

export const ArticleFormattingTool = () => {
  const [text, setText] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [paragraphCount, setParagraphCount] = useState(0);
  const [readingTime, setReadingTime] = useState('0 min');
  const [fontFamily, setFontFamily] = useState('Inter');
  const [fontSize, setFontSize] = useState('16px');
  const [lineHeight, setLineHeight] = useState('1.5');
  const [textColor, setTextColor] = useState('#000000');
  const [backgroundColor, setBackgroundColor] = useState('transparent');
  const [searchTerm, setSearchTerm] = useState('');
  const [replaceText, setReplaceText] = useState('');
  const [keywordDensity, setKeywordDensity] = useState<Record<string, number>>({});
  const [longSentences, setLongSentences] = useState<number[]>([]);
  const [passiveVoice, setPassiveVoice] = useState<number[]>([]);
  const [autoSaveTimeout, setAutoSaveTimeout] = useState<number | null>(null);
  const [fileName, setFileName] = useState('');
  const [convertedHTML, setConvertedHTML] = useState('');
  const [showHTML, setShowHTML] = useState(false);
  
  const { toast } = useToast();

  // Load saved content on initial mount
  useEffect(() => {
    const savedContent = localStorage.getItem('articleFormattingContent');
    if (savedContent) {
      setText(savedContent);
    }
  }, []);

  // Auto-save functionality
  useEffect(() => {
    if (autoSaveTimeout) {
      clearTimeout(autoSaveTimeout);
    }
    
    const timeoutId = window.setTimeout(() => {
      if (text.trim()) {
        localStorage.setItem('articleFormattingContent', text);
        // Silent auto-save without toast
      }
    }, 5000); // Auto-save after 5 seconds of inactivity
    
    setAutoSaveTimeout(timeoutId as unknown as number);
    
    return () => {
      if (autoSaveTimeout) {
        clearTimeout(autoSaveTimeout);
      }
    };
  }, [text]);

  // Update text stats with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      updateTextStats(text);
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [text]);

  const updateTextStats = useCallback((value: string) => {
    // Update character count
    setCharCount(value.length);
    
    // Update word count
    const wordCount = value.trim() === '' ? 0 : value.trim().split(/\s+/).length;
    setWordCount(wordCount);
    
    // Update paragraph count
    const paragraphs = value.trim() === '' ? 0 : value.split(/\n\s*\n/).filter(p => p.trim() !== '').length;
    setParagraphCount(paragraphs);
    
    // Calculate reading time (average reading speed: 200 words per minute)
    const minutes = Math.ceil(wordCount / 200);
    setReadingTime(`${minutes} min${minutes !== 1 ? 's' : ''}`);
    
    // Calculate keyword density (words that appear more than once)
    if (wordCount > 0) {
      const words = value.toLowerCase().match(/\b\w+\b/g) || [];
      const wordFrequency: Record<string, number> = {};
      
      words.forEach(word => {
        if (word.length > 3) { // Only count words with more than 3 letters
          wordFrequency[word] = (wordFrequency[word] || 0) + 1;
        }
      });
      
      // Filter to words that appear more than once
      const filteredDensity: Record<string, number> = {};
      Object.entries(wordFrequency)
        .filter(([_, count]) => count > 1)
        .sort(([_, countA], [_, countB]) => countB - countA)
        .slice(0, 10) // Top 10 most frequent words
        .forEach(([word, count]) => {
          filteredDensity[word] = Math.round((count / wordCount) * 100);
        });
      
      setKeywordDensity(filteredDensity);
    } else {
      setKeywordDensity({});
    }
    
    // Find long sentences (more than 25 words)
    const sentences = value.match(/[^.!?]+[.!?]+/g) || [];
    const longSentenceIndexes: number[] = [];
    let currentIndex = 0;
    
    sentences.forEach(sentence => {
      const wordCount = sentence.trim().split(/\s+/).length;
      if (wordCount > 25) {
        longSentenceIndexes.push(currentIndex);
      }
      currentIndex += sentence.length;
    });
    
    setLongSentences(longSentenceIndexes);
    
    // Detect passive voice using simple regex patterns
    const passivePatterns = [
      /\b(?:am|is|are|was|were|be|being|been)\s+(\w+ed|built|done|made|put|sent|paid|sold|told)\b/gi
    ];
    
    const passiveIndexes: number[] = [];
    
    passivePatterns.forEach(pattern => {
      let match;
      while ((match = pattern.exec(value)) !== null) {
        passiveIndexes.push(match.index);
      }
    });
    
    setPassiveVoice(passiveIndexes);
  }, []);

  const handleTextChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  }, []);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied to clipboard",
        description: "Article has been copied successfully."
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
      const selectionStart = textarea.selectionStart;
      const selectionEnd = textarea.selectionEnd;
      
      if (selectionStart === selectionEnd) {
        // No text selected, apply to whole text
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
          case 'strikethrough':
            textarea.style.textDecoration = textarea.style.textDecoration === 'line-through' ? 'none' : 'line-through';
            break;
        }
      } else {
        // Text selected, wrap with markdown
        const selectedText = text.substring(selectionStart, selectionEnd);
        let newText = text;
        
        switch (style) {
          case 'bold':
            newText = text.substring(0, selectionStart) + `**${selectedText}**` + text.substring(selectionEnd);
            break;
          case 'italic':
            newText = text.substring(0, selectionStart) + `*${selectedText}*` + text.substring(selectionEnd);
            break;
          case 'underline':
            newText = text.substring(0, selectionStart) + `<u>${selectedText}</u>` + text.substring(selectionEnd);
            break;
          case 'strikethrough':
            newText = text.substring(0, selectionStart) + `~~${selectedText}~~` + text.substring(selectionEnd);
            break;
          case 'h1':
            newText = text.substring(0, selectionStart) + `# ${selectedText}` + text.substring(selectionEnd);
            break;
          case 'h2':
            newText = text.substring(0, selectionStart) + `## ${selectedText}` + text.substring(selectionEnd);
            break;
          case 'h3':
            newText = text.substring(0, selectionStart) + `### ${selectedText}` + text.substring(selectionEnd);
            break;
          case 'quote':
            newText = text.substring(0, selectionStart) + `> ${selectedText}` + text.substring(selectionEnd);
            break;
          case 'ul':
            newText = text.substring(0, selectionStart) + selectedText.split('\n').map(line => `- ${line}`).join('\n') + text.substring(selectionEnd);
            break;
          case 'ol':
            newText = text.substring(0, selectionStart) + selectedText.split('\n').map((line, i) => `${i+1}. ${line}`).join('\n') + text.substring(selectionEnd);
            break;
        }
        
        setText(newText);
        
        // Reset selection after text change
        setTimeout(() => {
          textarea.focus();
          textarea.setSelectionRange(
            selectionStart, 
            selectionEnd + (newText.length - text.length)
          );
        }, 0);
      }
    }
  };

  const insertLink = () => {
    const textarea = document.querySelector('textarea');
    if (textarea) {
      const selectionStart = textarea.selectionStart;
      const selectionEnd = textarea.selectionEnd;
      const selectedText = text.substring(selectionStart, selectionEnd);
      
      const url = prompt('Enter URL:', 'https://');
      if (url) {
        const linkText = selectedText || 'Link text';
        const markdown = `[${linkText}](${url})`;
        
        const newText = text.substring(0, selectionStart) + markdown + text.substring(selectionEnd);
        setText(newText);
      }
    }
  };

  const handleCaseChange = (type: string) => {
    const textarea = document.querySelector('textarea');
    if (textarea) {
      const selectionStart = textarea.selectionStart;
      const selectionEnd = textarea.selectionEnd;
      
      if (selectionStart !== selectionEnd) {
        // Only apply to selected text
        const selectedText = text.substring(selectionStart, selectionEnd);
        let transformedText = selectedText;
        
        switch (type) {
          case 'upper':
            transformedText = selectedText.toUpperCase();
            break;
          case 'lower':
            transformedText = selectedText.toLowerCase();
            break;
          case 'title':
            transformedText = selectedText.toLowerCase().replace(/(?:^|\s)\w/g, letter => letter.toUpperCase());
            break;
          case 'sentence':
            transformedText = selectedText.toLowerCase().replace(/(^\w|\.\s+\w)/g, letter => letter.toUpperCase());
            break;
        }
        
        const newText = text.substring(0, selectionStart) + transformedText + text.substring(selectionEnd);
        setText(newText);
      } else {
        // Apply to whole text
        let newText = text;
        
        switch (type) {
          case 'upper':
            newText = text.toUpperCase();
            break;
          case 'lower':
            newText = text.toLowerCase();
            break;
          case 'title':
            newText = text.toLowerCase().replace(/(?:^|\s)\w/g, letter => letter.toUpperCase());
            break;
          case 'sentence':
            newText = text.toLowerCase().replace(/(^\w|\.\s+\w)/g, letter => letter.toUpperCase());
            break;
        }
        
        setText(newText);
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

  const clearFormatting = () => {
    const textarea = document.querySelector('textarea');
    if (textarea) {
      textarea.style.fontFamily = 'Inter';
      textarea.style.fontSize = '16px';
      textarea.style.lineHeight = '1.5';
      textarea.style.color = '#000000';
      textarea.style.backgroundColor = 'transparent';
      textarea.style.fontWeight = 'normal';
      textarea.style.fontStyle = 'normal';
      textarea.style.textDecoration = 'none';
      textarea.style.textAlign = 'left';
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

  const handleFileExport = (format: string) => {
    let blob;
    let mimeType;
    let extension;
    
    switch (format) {
      case 'txt':
        mimeType = 'text/plain';
        extension = 'txt';
        blob = new Blob([text], { type: mimeType });
        break;
      case 'html':
        const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${fileName || 'Article'}</title>
  <style>
    body { font-family: ${fontFamily}; line-height: ${lineHeight}; }
    p { margin-bottom: 1em; }
  </style>
</head>
<body>
  ${text.split('\n\n').map(p => `<p>${p}</p>`).join('\n')}
</body>
</html>`;
        mimeType = 'text/html';
        extension = 'html';
        blob = new Blob([htmlContent], { type: mimeType });
        break;
      default:
        mimeType = 'text/plain';
        extension = 'txt';
        blob = new Blob([text], { type: mimeType });
    }
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = (fileName || 'article') + '.' + extension;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "File exported",
      description: `Article has been exported as ${extension.toUpperCase()} successfully.`
    });
  };

  const convertToHTML = () => {
    // Convert markdown to HTML
    let htmlText = text
      .replace(/#{6}\s?([^\n]+)/g, '<h6>$1</h6>')
      .replace(/#{5}\s?([^\n]+)/g, '<h5>$1</h5>')
      .replace(/#{4}\s?([^\n]+)/g, '<h4>$1</h4>')
      .replace(/#{3}\s?([^\n]+)/g, '<h3>$1</h3>')
      .replace(/#{2}\s?([^\n]+)/g, '<h2>$1</h2>')
      .replace(/#{1}\s?([^\n]+)/g, '<h1>$1</h1>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em>$1</em>')
      .replace(/~~([^~]+)~~/g, '<s>$1</s>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
      .replace(/^\s*>\s*(.+)/gm, '<blockquote>$1</blockquote>')
      .replace(/^\s*-\s*(.+)/gm, '<li>$1</li>')
      .replace(/^\s*\d+\.\s*(.+)/gm, '<li>$1</li>');
    
    // Convert line breaks to paragraphs
    htmlText = '<p>' + htmlText.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>') + '</p>';
    
    // Convert consecutive <li> to lists
    htmlText = htmlText.replace(/<li>(.+?)<\/li>(\s*<li>(.+?)<\/li>)+/gs, function(match) {
      return '<ul>' + match + '</ul>';
    });
    
    setConvertedHTML(htmlText);
    setShowHTML(true);
    toast({
      title: "Converted to HTML",
      description: "Article has been converted to HTML format"
    });
  };

  const fontFamilies = [
    { label: 'Inter', value: 'Inter' },
    { label: 'Arial', value: 'Arial' },
    { label: 'Times New Roman', value: 'Times New Roman' },
    { label: 'Georgia', value: 'Georgia' },
    { label: 'Courier New', value: 'Courier New' },
    { label: 'Calibri', value: 'Calibri' },
    { label: 'Helvetica', value: 'Helvetica, Arial, sans-serif' }
  ];

  const fontSizes = [
    { label: 'Small', value: '14px' },
    { label: 'Normal', value: '16px' },
    { label: 'Medium', value: '18px' },
    { label: 'Large', value: '20px' },
    { label: 'X-Large', value: '24px' }
  ];

  const lineHeights = [
    { label: 'Tight', value: '1.3' },
    { label: 'Normal', value: '1.5' },
    { label: 'Relaxed', value: '1.8' },
    { label: 'Spacious', value: '2' }
  ];

  // Keyboard shortcut handlers
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
      if ((e.ctrlKey || e.metaKey) && e.key === 'u') {
        e.preventDefault();
        handleStyle('underline');
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleFileExport('txt');
      }
    };

    window.addEventListener('keydown', handleKeyboard);
    return () => window.removeEventListener('keydown', handleKeyboard);
  }, [text]);

  return (
    <div className="w-full max-w-4xl mx-auto p-2 sm:p-4 md:p-6 space-y-4 sm:space-y-6 animate-fadeIn">
      <div className="text-center mb-4 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-2">
          Article Formatting Tool – Free Online Text Editor
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          Format and optimize your articles with our free online article formatting tool. Adjust text styles, check readability, and export content easily.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4">
        {/* Text Editor Area */}
        {showHTML ? (
          <div className="w-full min-h-[16rem] max-h-[32rem] p-4 border rounded-lg bg-slate-50 overflow-auto">
            <pre className="text-sm font-mono whitespace-pre-wrap">{convertedHTML}</pre>
          </div>
        ) : (
          <textarea 
            value={text} 
            onChange={handleTextChange} 
            className="w-full min-h-[16rem] max-h-[32rem] p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200 resize-vertical font-sans text-sm sm:text-base"
            placeholder="Enter or paste your article content here to format it... (Ctrl+B for bold, Ctrl+I for italic, Ctrl+U for underline)"
            style={{
              fontFamily,
              fontSize,
              lineHeight,
              color: textColor,
              backgroundColor
            }}
          />
        )}
        
        {/* Quick stats for immediate feedback */}
        <div className="flex flex-wrap items-center justify-between text-xs sm:text-sm text-slate-600 gap-2 border-b pb-4">
          <div className="flex flex-wrap gap-2 sm:gap-4">
            <span>{wordCount} words</span>
            <span>{charCount} characters</span>
            <span>{paragraphCount} paragraphs</span>
            <span>~{readingTime} reading time</span>
          </div>
          <Button variant="outline" size="sm" onClick={handleCopy} className="hover:bg-slate-100">
            <Copy className="h-4 w-4 mr-2" />
            Copy
          </Button>
        </div>
        
        {/* Formatting Toolbar */}
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
            <Button variant="outline" size="icon" onClick={() => handleAlignment('justify')} className="hover:bg-slate-100">
              <AlignJustify className="h-4 w-4" />
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
            <Button variant="outline" size="icon" onClick={() => handleStyle('strikethrough')} className="hover:bg-slate-100">
              <StrikethroughIcon className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={() => handleStyle('ul')} className="hover:bg-slate-100">
              <List className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => handleStyle('ol')} className="hover:bg-slate-100">
              <ListOrdered className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => handleStyle('quote')} className="hover:bg-slate-100">
              <Quote className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={insertLink} className="hover:bg-slate-100">
              <Link className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={() => handleStyle('h1')} className="hover:bg-slate-100 text-xs font-bold">
              H1
            </Button>
            <Button variant="outline" size="icon" onClick={() => handleStyle('h2')} className="hover:bg-slate-100 text-xs font-bold">
              H2
            </Button>
            <Button variant="outline" size="icon" onClick={() => handleStyle('h3')} className="hover:bg-slate-100 text-xs font-bold">
              H3
            </Button>
          </div>
          
          <Button variant="outline" size="icon" onClick={clearFormatting} className="hover:bg-slate-100 ml-auto" title="Clear Formatting">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Font Settings */}
        <div className="flex flex-wrap gap-4 pb-4 border-b">
          <select
            value={fontFamily}
            onChange={handleFontChange}
            className="px-2 sm:px-3 py-1 sm:py-2 text-sm sm:text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
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
            className="px-2 sm:px-3 py-1 sm:py-2 text-sm sm:text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
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
            className="px-2 sm:px-3 py-1 sm:py-2 text-sm sm:text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
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
              onChange={(e) => setTextColor(e.target.value)} 
              className="w-8 h-8 rounded cursor-pointer" 
              title="Text Color" 
            />
            <input 
              type="color" 
              value={backgroundColor} 
              onChange={(e) => setBackgroundColor(e.target.value)} 
              className="w-8 h-8 rounded cursor-pointer" 
              title="Background Color" 
            />
          </div>
        </div>
        
        {/* Case Conversion */}
        <div className="flex flex-wrap gap-2 pb-4 border-b">
          <Button variant="outline" className="hover:bg-slate-100" onClick={() => handleCaseChange('upper')}>
            UPPERCASE
          </Button>
          <Button variant="outline" className="hover:bg-slate-100" onClick={() => handleCaseChange('lower')}>
            lowercase
          </Button>
          <Button variant="outline" className="hover:bg-slate-100" onClick={() => handleCaseChange('title')}>
            Title Case
          </Button>
          <Button variant="outline" className="hover:bg-slate-100" onClick={() => handleCaseChange('sentence')}>
            Sentence case
          </Button>
        </div>
        
        {/* Export Options */}
        <div className="flex flex-wrap gap-2 pb-4 border-b">
          <div className="flex gap-2">
            <Button variant="outline" className="hover:bg-slate-100" onClick={() => document.getElementById('fileInput')?.click()}>
              <FileText className="h-4 w-4 mr-2" />
              Import File
            </Button>
            <input id="fileInput" type="file" onChange={handleFileImport} className="hidden" accept=".txt,.md,.html" />
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" className="hover:bg-slate-100" onClick={() => handleFileExport('txt')}>
              <Download className="h-4 w-4 mr-2" />
              Export as TXT
            </Button>
            <Button variant="outline" className="hover:bg-slate-100" onClick={() => handleFileExport('html')}>
              <FileCode className="h-4 w-4 mr-2" />
              Export as HTML
            </Button>
          </div>
          
          <Button variant="outline" className="hover:bg-slate-100 ml-auto" onClick={() => {
            if (showHTML) {
              setShowHTML(false);
            } else {
              convertToHTML();
            }
          }}>
            {showHTML ? 'Back to Editor' : 'View HTML'}
          </Button>
        </div>
        
        {/* Readability Analysis */}
        <div className="space-y-3 pb-4 border-b">
          <h3 className="font-medium text-sm sm:text-base">Readability Analysis</h3>
          
          {Object.keys(keywordDensity).length > 0 ? (
            <div className="bg-slate-50 p-3 rounded-md">
              <h4 className="text-sm font-medium mb-2">Top Keywords</h4>
              <div className="flex flex-wrap gap-2">
                {Object.entries(keywordDensity).map(([word, percentage]) => (
                  <span key={word} className="px-2 py-1 bg-slate-200 rounded-full text-xs">
                    {word}: {percentage}%
                  </span>
                ))}
              </div>
            </div>
          ) : null}
          
          {longSentences.length > 0 && (
            <div className="bg-amber-50 p-3 rounded-md">
              <h4 className="text-sm font-medium mb-2">Readability Suggestions</h4>
              <p className="text-xs text-amber-800">
                {longSentences.length} long sentence{longSentences.length !== 1 ? 's' : ''} detected. Consider breaking them into shorter sentences for better readability.
              </p>
            </div>
          )}
          
          {passiveVoice.length > 0 && (
            <div className="bg-slate-50 p-3 rounded-md">
              <h4 className="text-sm font-medium mb-2">Style Suggestions</h4>
              <p className="text-xs text-slate-700">
                {passiveVoice.length} instance{passiveVoice.length !== 1 ? 's' : ''} of passive voice detected. Consider using active voice for more engaging writing.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* How to Use Section */}
      <div className="mt-8 space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-primary">Article Formatting Tool – Structure & Format Your Articles Effortlessly</h2>
        <p className="text-slate-700">
          Want to make your articles look professional and well-structured? Use our Article Formatting Tool to instantly format your text with proper headings, paragraph spacing, bullet points, and more. Whether you're writing a blog post, essay, or report, this tool ensures that your content is readable, engaging, and SEO-friendly.
        </p>
        
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <CheckIcon className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
            <span>Automatically structure your articles with proper headings</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckIcon className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
            <span>Improve readability with paragraph spacing & bullet points</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckIcon className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
            <span>Format text for blogs, essays, reports & online publications</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckIcon className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
            <span>Copy & paste formatted text with one click</span>
          </li>
        </ul>
        
        <h2 className="text-xl sm:text-2xl font-bold text-primary mt-8">How to Use the Article Formatting Tool?</h2>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Format Your Articles in Just 3 Easy Steps</h3>
          <ol className="space-y-4">
            <li className="flex items-start gap-3">
              <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold">1</div>
              <p>Enter or paste your article into the input box.</p>
            </li>
            <li className="flex items-start gap-3">
              <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold">2</div>
              <p>Select formatting options – apply headings, bold/italic text, bullet points, and paragraph spacing.</p>
            </li>
            <li className="flex items-start gap-3">
              <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold">3</div>
              <p>Click "Copy" and paste the properly formatted article wherever you need it – blogs, documents, or emails.</p>
            </li>
          </ol>
        </div>
        
        <h2 className="text-xl sm:text-2xl font-bold text-primary mt-8">Where Can You Use This Tool?</h2>
        <h3 className="text-lg font-semibold">Perfect for Bloggers, Writers & Content Creators</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="p-4 border rounded-lg bg-white">
            <h4 className="font-medium mb-2">Blog Writing & Publishing</h4>
            <p className="text-sm text-slate-600">Structure your blog posts with H1, H2, and H3 tags for better SEO.</p>
          </div>
          <div className="p-4 border rounded-lg bg-white">
            <h4 className="font-medium mb-2">SEO Articles</h4>
            <p className="text-sm text-slate-600">Format articles for online publishing with proper paragraph breaks and keyword placement.</p>
          </div>
          <div className="p-4 border rounded-lg bg-white">
            <h4 className="font-medium mb-2">Academic & Research Papers</h4>
            <p className="text-sm text-slate-600">Ensure correct formatting for essays, reports, and thesis documents.</p>
          </div>
          <div className="p-4 border rounded-lg bg-white">
            <h4 className="font-medium mb-2">Business Documents</h4>
            <p className="text-sm text-slate-600">Create well-structured reports, proposals, and presentations.</p>
          </div>
          <div className="p-4 border rounded-lg bg-white md:col-span-2">
            <h4 className="font-medium mb-2">Freelancers & Copywriters</h4>
            <p className="text-sm text-slate-600">Save time formatting client articles and marketing content.</p>
          </div>
        </div>
        
        <h2 className="text-xl sm:text-2xl font-bold text-primary mt-8">Why Choose Our Article Formatting Tool?</h2>
        <h3 className="text-lg font-semibold">Features That Make Your Writing Stand Out</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
          <div className="flex items-start gap-2">
            <CheckIcon className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
            <span>Automatic Heading & Subheading Formatting – Convert text into properly structured content.</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckIcon className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
            <span>Bullet Points & Numbered Lists – Organize key points effortlessly.</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckIcon className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
            <span>Bold, Italic & Underline Formatting – Highlight important sections for better readability.</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckIcon className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
            <span>Paragraph Spacing & Indentation – Ensure clear separation between sections.</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckIcon className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
            <span>SEO-Optimized Formatting – Apply the best practices for online publishing.</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckIcon className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
            <span>Easy Copy & Paste Functionality – No extra effort needed—just generate, copy, and use!</span>
          </div>
        </div>
        
        <h2 className="text-xl sm:text-2xl font-bold text-primary mt-8">Examples of Article Formatting</h2>
        <h3 className="text-lg font-semibold">See How Your Text Can Look After Formatting</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div className="p-4 border rounded-lg bg-slate-50">
            <h4 className="font-medium mb-2">Before Formatting:</h4>
            <p className="text-sm text-slate-600 whitespace-pre-wrap">article formatting is important for readability seo and user experience without structure content looks cluttered and hard to read</p>
          </div>
          <div className="p-4 border rounded-lg bg-white">
            <h4 className="font-medium mb-2">After Using the Tool:</h4>
            <div className="text-sm space-y-2">
              <h5 className="font-bold">Why Article Formatting is Important</h5>
              <p>Proper article formatting enhances readability, SEO, and user experience. Without a clear structure, content appears cluttered and difficult to read.</p>
              <ul className="pl-5 space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-green-500">🟢</span>
                  <span>Bullet points help break down information.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">🟢</span>
                  <span>Headings guide readers through key sections.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">🟢</span>
                  <span>Bold & Italic text highlights important details.</span>
                </li>
              </ul>
              <p>Try it now and see the difference! 🚀</p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-slate-50 rounded-lg text-center">
          <h2 className="text-xl font-bold text-primary mb-4">Format Your Article Now!</h2>
          <p className="mb-4">Use the tool above to instantly format your content for better structure, readability, and SEO. Save time and ensure your articles look clean, professional, and easy to read.</p>
          <Button className="mt-2" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Get Started
          </Button>
        </div>
      </div>

      <div className="text-center text-xs sm:text-sm text-slate-500 mt-4">
        <p>Keyboard shortcuts: Ctrl/Cmd + B (Bold), Ctrl/Cmd + I (Italic), Ctrl/Cmd + U (Underline), Ctrl/Cmd + S (Save)</p>
      </div>
    </div>
  );
};

export default ArticleFormattingTool;
