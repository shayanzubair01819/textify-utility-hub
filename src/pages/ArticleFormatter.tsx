
import React from 'react';
import { useSEO } from '@/hooks/useSEO';
import ArticleFormattingTool from '@/components/ArticleFormattingTool';
import { Button } from '@/components/ui/button';
import { CheckCircle2, FileText, FileEdit, BookOpen, PenTool, UserCheck, ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

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

          {/* New CTA Button */}
          <div className="flex justify-center mt-6">
            <Button size="lg" className="group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              Start Formatting Your Article Now
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
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

          {/* New CTA Button */}
          <div className="flex justify-center mt-6">
            <Button variant="outline" size="lg" className="group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              Try It For Free
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
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

          {/* New CTA Button */}
          <div className="flex justify-center mt-6">
            <Button variant="secondary" size="lg" className="group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              Format Your Content Now
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
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

          {/* New CTA Button */}
          <div className="flex justify-center mt-6">
            <Button size="lg" className="group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              Start Formatting Your Text
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
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
          
          {/* New CTA Button */}
          <div className="flex justify-center mt-4">
            <Button size="lg" className="group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              Get Started for Free
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </section>

        <hr className="border-slate-200" />

        {/* NEW: Other Tools You May Like Section */}
        <section className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-primary">
            Other Tools You May Like
          </h2>
          
          <p className="text-center text-slate-700">
            Explore our other free text formatting and content creation tools
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-5 border border-slate-100">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">Bold Text Generator</h3>
              <p className="text-slate-600 mb-4">Convert your text to bold format for social media, messaging, and more.</p>
              <Link to="/bold-text">
                <Button variant="outline" className="w-full group">
                  Try It Now
                  <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-5 border border-slate-100">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <PenTool className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">Italic Text Generator</h3>
              <p className="text-slate-600 mb-4">Create italic text for emphasis in your documents and online content.</p>
              <Link to="/italic-text">
                <Button variant="outline" className="w-full group">
                  Try It Now
                  <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-5 border border-slate-100">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <FileEdit className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">Underline Text Generator</h3>
              <p className="text-slate-600 mb-4">Generate underlined text to highlight important information.</p>
              <Link to="/underline-text">
                <Button variant="outline" className="w-full group">
                  Try It Now
                  <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-5 border border-slate-100">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">LinkedIn Text Formatter</h3>
              <p className="text-slate-600 mb-4">Optimize your LinkedIn posts for maximum engagement and impact.</p>
              <Link to="/linkedin-formatter">
                <Button variant="outline" className="w-full group">
                  Try It Now
                  <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-5 border border-slate-100">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">Bubble Text Generator</h3>
              <p className="text-slate-600 mb-4">Convert your text into fun bubble letters for creative projects.</p>
              <Link to="/bubble-text-generator">
                <Button variant="outline" className="w-full group">
                  Try It Now
                  <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-5 border border-slate-100">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <PenTool className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">Case Converter Tool</h3>
              <p className="text-slate-600 mb-4">Convert text between uppercase, lowercase, title case, and more.</p>
              <Link to="/case-converter">
                <Button variant="outline" className="w-full group">
                  Try It Now
                  <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ArticleFormatter;
