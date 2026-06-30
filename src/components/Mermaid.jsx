import React, { useEffect, useState, useId } from 'react';

let mermaidPromise = null;
let currentTheme = null;

const getMermaid = async (theme) => {
    if (!mermaidPromise) {
        mermaidPromise = import('mermaid').then((m) => m.default);
    }
    const mermaid = await mermaidPromise;
    
    if (currentTheme !== theme) {
        mermaid.initialize({
            startOnLoad: false,
            theme: theme,
            securityLevel: 'loose',
            fontFamily: 'inherit',
            fontSize: 18,
            flowchart: {
                nodeSpacing: 70,
                rankSpacing: 70,
            },
            sequence: {
                useMaxWidth: false,
            },
            gantt: {
                useMaxWidth: false,
            },
            journey: {
                useMaxWidth: false,
            },
            er: {
                useMaxWidth: false,
            },
            pie: {
                useMaxWidth: false,
            },
            state: {
                useMaxWidth: false,
            }
        });
        currentTheme = theme;
    }
    
    return mermaid;
};

const Mermaid = ({ chart }) => {
    const id = `mermaid-${useId().replace(/:/g, '')}`;
    const [svg, setSvg] = useState('');
    const [error, setError] = useState(null);
    
    // Check actual site theme via html class, not OS preference.
    const [theme, setTheme] = useState(() => 
        typeof document !== 'undefined' && document.documentElement.classList.contains('dark') ? 'dark' : 'default'
    );

    useEffect(() => {
        // Observe html element for dark mode class toggles
        const observer = new MutationObserver(() => {
            const isDark = document.documentElement.classList.contains('dark');
            setTheme(isDark ? 'dark' : 'default');
        });
        
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
        });
        
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        let isMounted = true;

        const renderChart = async () => {
            try {
                const mermaid = await getMermaid(theme);
                
                if (isMounted) setError(null);
                
                const { svg } = await mermaid.render(id, chart);
                
                if (isMounted) {
                    setSvg(svg);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err instanceof Error ? err.message : String(err));
                }
            }
        };

        renderChart();

        return () => {
            isMounted = false;
        };
    }, [chart, id, theme]);

    if (error) {
        return (
            <div className="p-4 border border-red-500 bg-red-50 text-red-700 rounded-md overflow-auto text-sm font-mono my-6">
                <strong>Mermaid Syntax Error:</strong>
                <pre className="mt-2 whitespace-pre-wrap">{error}</pre>
            </div>
        );
    }

    if (!svg) {
        return (
            <div className="animate-pulse h-32 bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center text-gray-400 my-6">
                Loading diagram...
            </div>
        );
    }

    return (
        <div 
            className="mermaid-wrapper w-full overflow-x-auto my-8 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-md"
            tabIndex={0}
            role="region"
            aria-label="Mermaid diagram container"
        >
            <div 
                className="mermaid-container w-max min-w-full flex justify-center"
                aria-label="Diagram"
                dangerouslySetInnerHTML={{ __html: svg }}
            />
        </div>
    );
};

export default Mermaid;
