
import React from 'react';
import { useSEO } from '@/hooks/useSEO';
import ArticleFormattingTool from '@/components/ArticleFormattingTool';
import { CheckCircle2, FileText, FileEdit, BookOpen, PenTool, UserCheck } from 'lucide-react';

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

      {/* Additional Content Section */}
      <div className="max-w-4xl mx-auto mt-12 space-y-12 px-4">
        <section className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-primary">
            Article Formatting Tool – Structure & Format Your Articles Effortlessly
          </h2>
          <p className="text-slate-700 text-center">
            📄 Want to make your articles look professional and well-structured? Use our Article Formatting Tool to instantly format your text with proper headings, paragraph spacing, bullet points, and more. Whether you're writing a blog post, essay, or report, this tool ensures that your content is readable, engaging, and SEO-friendly.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="flex items-start space-x-2">
              <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <p>Automatically structure your articles with proper headings</p>
            </div>
            <div className="flex items-start space-x-2">
              <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <p>Improve readability with paragraph spacing & bullet points</p>
            </div>
            <div className="flex items-start space-x-2">
              <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <p>Format text for blogs, essays, reports & online publications</p>
            </div>
            <div className="flex items-start space-x-2">
              <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <p>Copy & paste formatted text with one click</p>
            </div>
          </div>
        </section>

        <hr className="border-slate-200" />

        <section className="space-y-6">
          <div className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-medium">How to Use the Article Formatting Tool?</h3>
          </div>
          
          <h2 className="text-xl md:text-2xl font-bold text-primary">Format Your Articles in Just 3 Easy Steps</h2>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0">1</div>
              <p className="pt-1">Enter or paste your article into the input box.</p>
            </div>
            <div className="flex items-start space-x-4">
              <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0">2</div>
              <p className="pt-1">Select formatting options – apply headings, bold/italic text, bullet points, and paragraph spacing.</p>
            </div>
            <div className="flex items-start space-x-4">
              <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0">3</div>
              <p className="pt-1">Click "Copy" and paste the properly formatted article wherever you need it – blogs, documents, or emails.</p>
            </div>
          </div>
        </section>

        <hr className="border-slate-200" />

        <section className="space-y-6">
          <div className="flex items-center space-x-2">
            <FileEdit className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-medium">Where Can You Use This Tool?</h3>
          </div>
          
          <h2 className="text-xl md:text-2xl font-bold text-primary">Perfect for Bloggers, Writers & Content Creators</h2>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="text-blue-500 flex-shrink-0">🔹</div>
              <div>
                <span className="font-medium">Blog Writing & Publishing</span> – Structure your blog posts with H1, H2, and H3 tags for better SEO.
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="text-blue-500 flex-shrink-0">🔹</div>
              <div>
                <span className="font-medium">SEO Articles</span> – Format articles for online publishing with proper paragraph breaks and keyword placement.
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="text-blue-500 flex-shrink-0">🔹</div>
              <div>
                <span className="font-medium">Academic & Research Papers</span> – Ensure correct formatting for essays, reports, and thesis documents.
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="text-blue-500 flex-shrink-0">🔹</div>
              <div>
                <span className="font-medium">Business Documents</span> – Create well-structured reports, proposals, and presentations.
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="text-blue-500 flex-shrink-0">🔹</div>
              <div>
                <span className="font-medium">Freelancers & Copywriters</span> – Save time formatting client articles and marketing content.
              </div>
            </div>
          </div>
        </section>

        <hr className="border-slate-200" />

        <section className="space-y-6">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-medium">Why Choose Our Article Formatting Tool?</h3>
          </div>
          
          <h2 className="text-xl md:text-2xl font-bold text-primary">Features That Make Your Writing Stand Out</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            <div className="flex items-start space-x-2">
              <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <p><span className="font-medium">Automatic Heading & Subheading Formatting</span> – Convert text into properly structured content.</p>
            </div>
            <div className="flex items-start space-x-2">
              <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <p><span className="font-medium">Bullet Points & Numbered Lists</span> – Organize key points effortlessly.</p>
            </div>
            <div className="flex items-start space-x-2">
              <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <p><span className="font-medium">Bold, Italic & Underline Formatting</span> – Highlight important sections for better readability.</p>
            </div>
            <div className="flex items-start space-x-2">
              <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <p><span className="font-medium">Paragraph Spacing & Indentation</span> – Ensure clear separation between sections.</p>
            </div>
            <div className="flex items-start space-x-2">
              <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <p><span className="font-medium">SEO-Optimized Formatting</span> – Apply the best practices for online publishing.</p>
            </div>
            <div className="flex items-start space-x-2">
              <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <p><span className="font-medium">Easy Copy & Paste Functionality</span> – No extra effort needed—just generate, copy, and use!</p>
            </div>
          </div>
        </section>

        <hr className="border-slate-200" />

        <section className="space-y-6">
          <div className="flex items-center space-x-2">
            <PenTool className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-medium">Examples of Article Formatting</h3>
          </div>
          
          <h2 className="text-xl md:text-2xl font-bold text-primary">See How Your Text Can Look After Formatting</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-4 bg-slate-50">
              <h4 className="font-medium mb-2">Before Formatting:</h4>
              <p className="text-slate-600">
                article formatting is important for readability seo and user experience without structure content looks cluttered and hard to read
              </p>
            </div>
            <div className="border rounded-lg p-4 bg-white shadow-sm">
              <h4 className="font-medium mb-2">After Using the Tool:</h4>
              <h5 className="font-bold mb-2">Why Article Formatting is Important</h5>
              <p className="mb-4">
                Proper article formatting enhances readability, SEO, and user experience. Without a clear structure, content appears cluttered and difficult to read.
              </p>
              <p className="flex items-center space-x-2 mb-1">
                <span className="text-green-600">🟢</span>
                <span>Bullet points help break down information.</span>
              </p>
              <p className="flex items-center space-x-2 mb-1">
                <span className="text-green-600">🟢</span>
                <span>Heading's guide readers through key sections.</span>
              </p>
              <p className="flex items-center space-x-2 mb-3">
                <span className="text-green-600">🟢</span>
                <span>Bold & Italic text highlights important details.</span>
              </p>
              <p className="font-medium">Try it now and see the difference! 🚀</p>
            </div>
          </div>
        </section>

        <hr className="border-slate-200" />

        <section className="space-y-6">
          <div className="flex items-center space-x-2">
            <UserCheck className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-medium">Format Your Article Now!</h3>
          </div>
          
          <p className="text-center">
            Use the tool above to instantly format your content for better structure, readability, and SEO. Save time and ensure your articles look clean, professional, and easy to read.
          </p>
        </section>
      </div>
    </div>
  );
};

export default ArticleFormatter;
