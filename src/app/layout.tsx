import Toast from "@/components/Toast";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SessionProviders from "./SessionProviders";
import "./globals.css";


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
    <SessionProviders>
      <html lang="en">
        <body className={`${inter.className}  bg-gray-700 relative`}>
          {children}
          <Toast />
        </body>
      </html>
    </SessionProviders>
  );
}
