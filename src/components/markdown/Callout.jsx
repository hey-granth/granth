import React from 'react';
import { AlertCircle, Info, Lightbulb, AlertTriangle } from 'lucide-react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

const CALLOUT_TYPES = {
  note: {
    icon: Info,
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-50 dark:bg-blue-950/30',
    border: 'border-blue-200 dark:border-blue-900',
  },
  warning: {
    icon: AlertTriangle,
    color: 'text-amber-600 dark:text-amber-500',
    bg: 'bg-amber-50 dark:bg-amber-950/30',
    border: 'border-amber-200 dark:border-amber-900',
  },
  tip: {
    icon: Lightbulb,
    color: 'text-green-600 dark:text-green-400',
    bg: 'bg-green-50 dark:bg-green-950/30',
    border: 'border-green-200 dark:border-green-900',
  },
  important: {
    icon: AlertCircle,
    color: 'text-purple-600 dark:text-purple-400',
    bg: 'bg-purple-50 dark:bg-purple-950/30',
    border: 'border-purple-200 dark:border-purple-900',
  },
};

export function Callout({ children, className, ...props }) {
  // Try to extract the text to detect if it's a specific callout
  let type = 'default';
  
  // This is a naive extraction that works for standard Remark AST converted to React
  let firstText = '';
  
  React.Children.forEach(children, (child) => {
    if (!firstText && child && child.props && child.props.children) {
      const childContent = child.props.children;
      if (typeof childContent === 'string') {
        firstText = childContent;
      } else if (Array.isArray(childContent) && typeof childContent[0] === 'string') {
        firstText = childContent[0];
      }
    }
  });

  if (firstText) {
    const match = firstText.match(/^\[!(NOTE|WARNING|TIP|IMPORTANT|CAUTION)\]/i) 
               || firstText.match(/^(Note|Warning|Tip|Important|Caution):?/i);
    
    if (match) {
      const matchedType = match[1].toLowerCase();
      if (matchedType === 'caution') type = 'warning';
      else type = matchedType;
    }
  }

  if (type === 'default') {
    return (
      <blockquote 
        className={twMerge(
          clsx(
            "my-6 border-l-4 border-plum-deep pl-6 italic text-text-secondary",
            className
          )
        )}
        {...props}
      >
        {children}
      </blockquote>
    );
  }

  const TypeIcon = CALLOUT_TYPES[type].icon;

  // We want to remove the "[!NOTE]" or "Note:" prefix from the children if possible, 
  // but modifying React children deeply is complex. 
  // We'll let it render but style it distinctively.
  
  return (
    <div 
      className={twMerge(
        clsx(
          "my-6 flex gap-3 rounded-lg border p-4",
          CALLOUT_TYPES[type].bg,
          CALLOUT_TYPES[type].border,
          className
        )
      )}
      {...props}
    >
      <div className={clsx("mt-1 flex-shrink-0", CALLOUT_TYPES[type].color)}>
        <TypeIcon className="h-5 w-5" />
      </div>
      <div className="text-text-primary [&>p:first-child]:mt-0 [&>p:last-child]:mb-0">
        {children}
      </div>
    </div>
  );
}
