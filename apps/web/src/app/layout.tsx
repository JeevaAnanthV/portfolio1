import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Jeeva Ananth V – AI Engineer Portfolio',
  description: 'Portfolio of Jeeva Ananth V – Senior AI/ML Engineer & Deep-Tech Builder.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-black text-white antialiased min-h-screen">
        <main className="mx-auto max-w-7xl px-8 py-16">
          {children}
        </main>
      </body>
    </html>
  );
}
