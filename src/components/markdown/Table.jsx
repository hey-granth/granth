import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export function Table({ className, children, ...props }) {
  return (
    <div className="w-full overflow-x-auto my-6 rounded-lg border border-divider">
      <table
        className={twMerge(
          clsx(
            "w-full text-left border-collapse",
            className
          )
        )}
        {...props}
      >
        {children}
      </table>
    </div>
  );
}

export function TableHead({ className, children, ...props }) {
  return (
    <thead className={twMerge(clsx("bg-black/5 dark:bg-white/5", className))} {...props}>
      {children}
    </thead>
  );
}

export function TableRow({ className, children, ...props }) {
  return (
    <tr
      className={twMerge(
        clsx(
          "border-b border-divider last:border-0 transition-colors hover:bg-black/5 dark:hover:bg-white/5",
          className
        )
      )}
      {...props}
    >
      {children}
    </tr>
  );
}

export function TableCell({ className, children, ...props }) {
  return (
    <td
      className={twMerge(
        clsx(
          "px-4 py-3 align-middle [&[align=center]]:text-center [&[align=right]]:text-right",
          className
        )
      )}
      {...props}
    >
      {children}
    </td>
  );
}

export function TableHeader({ className, children, ...props }) {
  return (
    <th
      className={twMerge(
        clsx(
          "px-4 py-3 font-semibold text-text-primary align-middle [&[align=center]]:text-center [&[align=right]]:text-right",
          className
        )
      )}
      {...props}
    >
      {children}
    </th>
  );
}
