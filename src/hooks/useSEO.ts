
import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  canonicalPath?: string;
  schemaPath: string;
}

export const useSEO = ({ title, description, canonicalPath, schemaPath }: SEOProps) => {
  useEffect(() => {
    // Set document title
    document.title = title;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", description);
    }

    // Update Open Graph and Twitter tags
    const updateMetaContent = (selector: string, content: string) => {
      const element = document.querySelector(selector);
      if (element) {
        element.setAttribute("content", content);
      }
    };

    updateMetaContent('meta[property="og:title"]', title);
    updateMetaContent('meta[property="og:description"]', description);
    updateMetaContent('meta[name="twitter:title"]', title);
    updateMetaContent('meta[name="twitter:description"]', description);

    // Update canonical link
    if (canonicalPath) {
      const fullCanonicalUrl = `https://texttweaker.com${canonicalPath}`;
      updateMetaContent('meta[property="og:url"]', fullCanonicalUrl);
      
      const canonicalLink = document.querySelector('link[rel="canonical"]');
      if (canonicalLink) {
        canonicalLink.setAttribute("href", fullCanonicalUrl);
      }
    }

    // Load page-specific schema
    const loadSchema = async () => {
      try {
        const schemaResponse = await fetch(schemaPath);
        const schemaData = await schemaResponse.json();
        
        // Find existing schema or create new one
        let schemaScript = document.getElementById('page-specific-schema');
        if (!schemaScript) {
          schemaScript = document.createElement('script');
          schemaScript.id = 'page-specific-schema';
          schemaScript.type = 'application/ld+json';
          document.head.appendChild(schemaScript);
        }
        
        schemaScript.textContent = JSON.stringify(schemaData);
      } catch (error) {
        console.error('Error loading schema:', error);
      }
    };
    
    loadSchema();
    
    // Cleanup function
    return () => {
      const schemaScript = document.getElementById('page-specific-schema');
      if (schemaScript) {
        schemaScript.remove();
      }
    };
  }, [title, description, canonicalPath, schemaPath]);
};
