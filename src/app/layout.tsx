"use client";

import { Toaster } from 'react-hot-toast';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              border: "2px solid white",
              padding: "20px",
              fontSize: "15px",
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}
