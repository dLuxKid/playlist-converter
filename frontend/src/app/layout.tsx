import ContextProvider from "@/context/GlobalContext";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from 'sonner';
import GoogleProvider from "./GoogleProvider";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "spotify to yt",
  description: "It should convert your spotify playlists to youtube playlist",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GoogleProvider  >
      <html lang="en">
        <Script src="https://accounts.google.com/gsi/client" async defer />
        <body className={`${inter.className}  bg-gray-700 relative`}>
          <ContextProvider>
            {children}
            <Toaster
              position="top-right" closeButton={true}
              duration={2500}
            />
          </ContextProvider>
        </body>
      </html>
    </GoogleProvider>
  );
}
