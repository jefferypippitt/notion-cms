import React from 'react';
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";


export const metadata: Metadata = {
  title: 'Notion Blog',
  description: 'A modern blog powered by Notion CMS'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="scroll-smooth antialiased"
      suppressHydrationWarning
    >
      <body className={`relative flex min-h-screen flex-col ${GeistSans.className}`}>
        <ThemeProvider
          enableSystem
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
        >
          <Header />
          <main className="container max-w-3xl mx-auto px-4 grow">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
