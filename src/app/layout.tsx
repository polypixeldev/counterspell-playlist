import type { Metadata } from "next";
import { Inter, Jersey_25 } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const jersey = Jersey_25({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-jersey",
});

export const metadata: Metadata = {
  title: "Counterspell Playlist",
  description: "Add a song to Counterspell's Spotify playlist!",
  icons: "/favicon.ico",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`relative ${inter.className} ${jersey.variable}`}>
        {children}
      </body>
    </html>
  );
}
