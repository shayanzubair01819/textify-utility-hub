
import React from 'react';
import { useSEO } from '@/hooks/useSEO';
import ArticleFormattingTool from '@/components/ArticleFormattingTool';

const ArticleFormatter = () => {
  useSEO({
    title: "Article Formatting Tool – Free Online Text Editor",
    description: "Format and optimize your articles with our free online article formatting tool. Adjust text styles, check readability, and export content easily.",
    canonicalPath: "/article-formatting-tool",
    schemaPath: "/schemas/article-formatting-schema.json"
  });

  return (
    <div className="container mx-auto py-8">
      <ArticleFormattingTool />
    </div>
  );
};

export default ArticleFormatter;
