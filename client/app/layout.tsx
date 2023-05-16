"use client"; // FIXME: remove in future
import { ReactQueryDevtools } from "react-query/devtools";

import { Footer, Navbar } from "@/app/components";
import "./globals.css";
import { Providers } from "@/app/components";

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
        <body>
          <Navbar />
          {children}
          {/* FIXME: remove in production */}
          <ReactQueryDevtools initialIsOpen={false} />
          <Footer />
        </body>
      </html>
    </Providers>
  );
}
