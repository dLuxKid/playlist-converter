import ContextProvider from "@/context/GlobalContext";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
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
    <html lang="en">
      <body className={`${inter.className}  bg-gray-700 relative`}>
        <ContextProvider>
          {children}
          <Toaster
            richColors
            position="top-right"
            closeButton={true}
            duration={2500}
          />
        </ContextProvider>
      </body>
    </html>
  );
}
