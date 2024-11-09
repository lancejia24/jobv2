import React from 'react';

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
}

export function Link({ href, children, className = '', ...props }: LinkProps) {
  return (
    <a
      href={href}
      className={`transition-colors duration-150 ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}