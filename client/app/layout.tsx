import { Footer, Navbar } from "@/app/components";
import "./globals.css";
import { Inter } from "next/font/google";

import { Providers } from "@/app/components";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Memories | Share your outstanding memories",
  description: "Share your memories across the globe with thousand of people",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <html lang="en">
        <body className={inter.className}>
          <Navbar />
          {children}
          <Footer />
        </body>
      </html>
    </Providers>
  );
}
