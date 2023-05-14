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
          <Footer />
        </body>
      </html>
    </Providers>
  );
}
