import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Landscaper',
  description: 'Top-down landscape design tool',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-cream">{children}</body>
    </html>
  );
}
