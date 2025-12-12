import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '../src/index.scss';
import { ThemeProvider } from '../src/context/ThemeContext';
import { ThemeLayout } from '../src/layouts/theme-layout';

export const metadata: Metadata = {
  title: 'Carbon React starter template',
  description: 'Server-side rendered page',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <ThemeLayout>{children}</ThemeLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
