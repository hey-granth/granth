/* eslint-disable no-unused-vars */
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

import 'katex/dist/katex.min.css';
import './markdown.css';

import { CodeBlock } from './CodeBlock';
import { InlineCode } from './InlineCode';
import { Table, TableRow, TableCell, TableHeader, TableHead } from './Table';
import { Callout } from './Callout';
import { Image } from './Image';
import ExternalLinkPreview from '../ui/ExternalLinkPreview';
import Mermaid from '../Mermaid';

export function MarkdownRenderer({ content, className = '' }) {
  return (
    <div className={`markdown-body ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          a: ({ href, children, ...props }) => {
            const isExternal = typeof href === 'string' && /^https?:\/\//i.test(href);

            if (!href || !isExternal) {
              return (
                <a href={href} {...props}>
                  {children}
                </a>
              );
            }

            // Using ExternalLinkPreview for external links to match the portfolio aesthetic
            return (
              <ExternalLinkPreview
                url={href}
                isStatic={false}
                className={props.className}
              >
                {children}
              </ExternalLinkPreview>
            );
          },
          pre: ({ node, children, ...props }) => {
            // react-markdown passes the <code> element as a child of <pre>
            const codeChild = node?.children?.[0];
            if (codeChild?.tagName === 'code') {
              const classNames = codeChild.properties?.className || [];
              const classNameStr = Array.isArray(classNames)
                ? classNames.join(' ')
                : classNames;
              
              const isMermaid = classNameStr.includes('language-mermaid');

              if (isMermaid) {
                // Extract the raw text for Mermaid
                const textNode = codeChild.children?.[0];
                const chart = textNode?.type === 'text' ? textNode.value : '';
                return <Mermaid chart={chart} />;
              }

              // Extract text content for CodeBlock
              const textNode = codeChild.children?.[0];
              const codeString = textNode?.type === 'text' ? textNode.value : '';

              return (
                <CodeBlock className={classNameStr} {...props}>
                  {codeString}
                </CodeBlock>
              );
            }
            return <pre {...props}>{children}</pre>;
          },
          code: ({ className, children, ...props }) => {
            // If the code block is inline, we use InlineCode
            return (
              <InlineCode className={className} {...props}>
                {children}
              </InlineCode>
            );
          },
          table: ({ node, ...props }) => <Table {...props} />,
          thead: ({ node, ...props }) => <TableHead {...props} />,
          tr: ({ node, ...props }) => <TableRow {...props} />,
          th: ({ node, ...props }) => <TableHeader {...props} />,
          td: ({ node, ...props }) => <TableCell {...props} />,
          img: ({ node, alt, src, ...props }) => <Image alt={alt} src={src} {...props} />,
          blockquote: ({ node, children, ...props }) => <Callout {...props}>{children}</Callout>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
