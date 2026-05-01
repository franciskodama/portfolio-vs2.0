import type { Metadata } from 'next';
import {
  Geist,
  Geist_Mono,
  Gloria_Hallelujah,
  Henny_Penny,
} from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const gloria = Gloria_Hallelujah({
  weight: '400',
  variable: '--font-gloria',
  subsets: ['latin'],
});

const hennyPenny = Henny_Penny({
  weight: '400',
  variable: '--font-henny-penny',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'fkodama.com',
  description: 'Francis Kodama Portfolio',
  openGraph: {
    images: [
      {
        url: 'https://www.fkodama.com/og-tags/prj-portfolio.jpeg',
        width: 1200,
        height: 630,
        alt: 'Francis Kodama Portfolio',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${gloria.variable} ${hennyPenny.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
