import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export function InlineCode({ className, children, ...props }) {
  return (
    <code
      className={twMerge(
        clsx(
          "bg-black/5 dark:bg-white/10 text-[var(--color-text-primary)]",
          "rounded-md px-1.5 py-0.5 mx-0.5",
          "font-mono text-[0.85em]",
          "break-words",
          className
        )
      )}
      {...props}
    >
      {children}
    </code>
  );
}
