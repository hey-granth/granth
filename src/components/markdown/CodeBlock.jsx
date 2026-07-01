import React, { useState, useEffect } from 'react';
import { createHighlighter } from 'shiki';
import { Check, Copy } from 'lucide-react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

// Cache the highlighter instance to avoid recreating it
let highlighterPromise = null;
function getHighlighterInstance() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ['vitesse-dark', 'vitesse-light'],
      langs: [
        'javascript', 'typescript', 'python', 'go', 'sql', 
        'bash', 'dockerfile', 'yaml', 'json', 'markdown', 
        'mermaid', 'html', 'css', 'jsonc'
      ]
    });
  }
  return highlighterPromise;
}

export function CodeBlock({ className, children }) {
  const [html, setHtml] = useState(null);
  const [copied, setCopied] = useState(false);

  // Parse language and optional filename
  // The className usually looks like "language-javascript:src/app.js"
  let language = 'text';
  let filename = '';
  
  if (className) {
    const match = className.match(/language-(\w+)(:(.+))?/);
    if (match) {
      language = match[1];
      filename = match[3] || '';
    }
  }

  const codeString = Array.isArray(children) 
    ? children.join('') 
    : (typeof children === 'string' ? children : '');

  useEffect(() => {
    let isMounted = true;
    
    async function highlight() {
      try {
        const highlighter = await getHighlighterInstance();
        // Fallback to text if language isn't loaded
        const lang = highlighter.getLoadedLanguages().includes(language) ? language : 'text';
        
        // We use CSS variables to handle dark/light mode switching 
        // if we were using a single theme, but here we can render HTML 
        // with both themes and use CSS to show/hide, OR just use one theme 
        // depending on body class. Actually, shiki supports dual themes:
        const highlighted = highlighter.codeToHtml(codeString, {
          lang,
          themes: {
            light: 'vitesse-light',
            dark: 'vitesse-dark',
          }
        });
        
        if (isMounted) {
          setHtml(highlighted);
        }
      } catch (err) {
        console.error("Shiki highlight error:", err);
      }
    }
    
    if (codeString) {
      highlight();
    }
    
    return () => { isMounted = false; };
  }, [codeString, language]);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6 flex flex-col overflow-hidden rounded-xl border border-divider shadow-sm">
      {(filename || language) && (
        <div className="flex items-center justify-between bg-black/5 dark:bg-white/5 px-4 py-2 text-xs text-text-secondary border-b border-divider">
          <span className="font-mono font-medium">
            {filename || language}
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-md px-2 py-1 transition-colors hover:bg-black/5 dark:hover:bg-white/10"
            aria-label="Copy code"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-green-500" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      )}
      
      {!filename && !language && (
         <div className="absolute right-2 top-2 z-10">
           <button
            onClick={handleCopy}
            className="flex items-center justify-center rounded-md p-1.5 text-text-muted transition-colors hover:bg-black/10 dark:hover:bg-white/10 hover:text-text-primary"
            aria-label="Copy code"
          >
            {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
          </button>
         </div>
      )}

      <div className={twMerge(clsx("relative overflow-x-auto text-sm", !filename && !language && "pt-8"))}>
        {html ? (
          <div 
            className="shiki-container [&>pre]:!bg-transparent [&>pre]:p-4 [&>pre]:m-0"
            dangerouslySetInnerHTML={{ __html: html }} 
          />
        ) : (
          <pre className="p-4 m-0 overflow-x-auto text-text-primary font-mono bg-black/5 dark:bg-white/5">
            <code>{codeString}</code>
          </pre>
        )}
      </div>
    </div>
  );
}
