import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export function Image({ className, alt, src, ...props }) {
  return (
    <figure className="my-8 flex flex-col items-center justify-center">
      <img
        src={src}
        alt={alt}
        className={twMerge(
          clsx(
            "max-w-full rounded-xl object-contain shadow-card-hover",
            className
          )
        )}
        loading="lazy"
        {...props}
      />
      {alt && (
        <figcaption className="mt-3 text-center text-sm text-text-muted">
          {alt}
        </figcaption>
      )}
    </figure>
  );
}
