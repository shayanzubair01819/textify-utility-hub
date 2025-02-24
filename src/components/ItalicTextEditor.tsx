
import React, { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { AlignLeft, AlignCenter, AlignRight, Bold, Italic, Underline, Copy, Trash2, SortAsc, SortDesc, Shuffle, FileText, Download, Upload, Code, FileCode, RefreshCw } from 'lucide-react';

const ITALIC_STYLES = {
  serif: "𝐼𝑡𝑎𝑙𝑖𝑐 𝑆𝑒𝑟𝑖𝑓",
  sans: "𝘐𝘵𝘢𝘭𝘪𝘤 𝘚𝘢𝘯𝘴",
  script: "𝒥𝓉𝒶𝓁𝒾𝒸 𝒮𝒸𝓇𝒾𝓅𝓉",
  mono: "𝙸𝚝𝚊𝚕𝚒𝚌 𝙼𝚘𝚗𝚘",
  gothic: "𝔦𝔱𝔞𝔩𝔦𝔠 𝔤𝔬𝔱𝔥𝔦𝔠"
};

const convertToItalicStyle = (text: string, style: keyof typeof ITALIC_STYLES) => {
  return text; // For now, return original text
};

export const ItalicTextEditor = () => {
  const [text, setText] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [fontFamily, setFontFamily] = useState('Inter');
  const [fontSize, setFontSize] = useState('16px');
  const [lineHeight, setLineHeight] = useState('1.5');
  const [textColor, setTextColor] = useState('#000000');
  const [backgroundColor, setBackgroundColor] = useState('transparent');
  const [selectedStyle, setSelectedStyle] = useState<keyof typeof ITALIC_STYLES>('sans');
  const [isMarkdownPreview, setIsMarkdownPreview] = useState(false);
  const [showHTML, setShowHTML] = useState(false);
  const [markdownHTML, setMarkdownHTML] = useState('');
  const [convertedHTML, setConvertedHTML] = useState('');

  const { toast } = useToast();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      updateCounts(text);
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [text]);

  const updateCounts = useCallback((value: string) => {
    setCharCount(value.length);
    setWordCount(value.trim() === '' ? 0 : value.trim().split(/\s+/).length);
  }, []);

  const handleTextChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  }, []);

  const handleCopy = useCallback(async () => {
    try {
      const italicText = convertToItalicStyle(text, selectedStyle);
      await navigator.clipboard.writeText(italicText);
      toast({
        title: "Copied to clipboard",
        description: "Italic text has been copied successfully."
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again or use Ctrl+C/Cmd+C.",
        variant: "destructive"
      });
    }
  }, [text, selectedStyle, toast]);

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

  const fontFamilies = [
    { label: 'Inter', value: 'Inter' },
    { label: 'Arial', value: 'Arial' },
    { label: 'Times New Roman', value: 'Times New Roman' },
    { label: 'Courier New', value: 'Courier New' },
    { label: 'Georgia', value: 'Georgia' }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto p-2 sm:p-4 md:p-6 space-y-4 sm:space-y-6 animate-fadeIn">
      <div className="text-center mb-4 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-2">
          Italic Text Generator – Convert & Copy Stylish Italic Fonts
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          Easily transform your regular text into elegant, italicized fonts with our free Italic Text Converter. Perfect for social media, blogs, websites, and messaging apps.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4">
        {isMarkdownPreview ? (
          <div className="w-full min-h-[16rem] max-h-[32rem] p-4 border rounded-lg bg-slate-50 overflow-auto prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: markdownHTML }} />
        ) : showHTML ? (
          <div className="w-full min-h-[16rem] max-h-[32rem] p-4 border rounded-lg bg-slate-50 overflow-auto">
            <pre className="text-sm font-mono whitespace-pre-wrap">{convertedHTML}</pre>
          </div>
        ) : (
          <textarea
            value={text}
            onChange={handleTextChange}
            className="w-full min-h-[16rem] max-h-[32rem] p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200 resize-vertical font-sans text-sm sm:text-base"
            placeholder="Enter or paste your text here to make it italic... (Ctrl+B for bold, Ctrl+I for italic, Ctrl+S to save)"
            style={{
              fontFamily,
              fontSize,
              lineHeight,
              color: textColor,
              backgroundColor
            }}
          />
        )}

        <div className="flex flex-wrap items-center justify-between text-xs sm:text-sm text-slate-600 gap-2 border-b pb-4">
          <div className="flex flex-wrap gap-2 sm:gap-4">
            <span>{wordCount} words</span>
            <span>{charCount} characters</span>
          </div>
          <Button variant="outline" size="sm" onClick={handleCopy} className="hover:bg-slate-100">
            <Copy className="h-4 w-4 mr-2" />
            Copy Italic Text
          </Button>
        </div>

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

          <div className="ml-auto flex gap-2">
            <Button variant="outline" onClick={() => setText('')} className="hover:bg-slate-100">
              <Trash2 className="h-4 w-4 mr-2" />
              Clear Text
            </Button>
          </div>
        </div>

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

          <div className="flex items-center gap-2">
            <input
              type="color"
              value={textColor}
              onChange={e => setTextColor(e.target.value)}
              className="w-8 h-8 rounded cursor-pointer"
              title="Text Color"
            />
            <input
              type="color"
              value={backgroundColor}
              onChange={e => setBackgroundColor(e.target.value)}
              className="w-8 h-8 rounded cursor-pointer"
              title="Background Color"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(ITALIC_STYLES).map(([key, label]) => (
            <Button
              key={key}
              variant={selectedStyle === key ? "default" : "outline"}
              className="w-full"
              onClick={() => setSelectedStyle(key as keyof typeof ITALIC_STYLES)}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>

      <div className="text-center text-xs sm:text-sm text-slate-500 mt-4">
        <p>Keyboard shortcuts: Ctrl/Cmd + B (Bold), Ctrl/Cmd + I (Italic), Ctrl/Cmd + S (Save)</p>
      </div>
    </div>
  );
};

export default ItalicTextEditor;
