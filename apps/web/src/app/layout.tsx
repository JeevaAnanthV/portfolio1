import './globals.css'; // <- must be relative to this file
import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Jeeva Ananth V – AI Engineer Portfolio',
  description: 'Portfolio of Jeeva Ananth V – Senior AI/ML Engineer & Deep-Tech Builder.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground antialiased">
        {/* Simple client-side error capture for debugging */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__clientErrors__=[]; window.onerror=(m,s,l)=>{window.__clientErrors__.push({message:m,source:s,line:l})};`
          }}
        />
        {children}
      </body>
    </html>
  );
}
