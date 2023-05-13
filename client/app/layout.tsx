"use client";
import { Footer, Navbar } from "@/app/components";
import "./globals.css";
import { Inter } from "next/font/google";

import { ReduxProvider } from "@/redux/ReduxProvider";
import { MantineProvider } from "@mantine/core";
import { theme } from "@/utils/theme";

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
    <html lang="en">
      <body className={inter.className}>
        <MantineProvider theme={theme}>
          <ReduxProvider>
            <Navbar />

            {children}

            <Footer />
          </ReduxProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
