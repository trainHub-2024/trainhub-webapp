import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import GlobalProvider from "@/providers/global-provider";


const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"]
});

const APP_NAME = process.env.APP_NAME;

export const metadata: Metadata = {
  title: APP_NAME,
  description: "Created by Kielo Mercado",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased`}
      >
        <GlobalProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster />
            <main className="w-full relative min-h-screen">
              {children}
            </main>
            <ThemeToggle />
          </ThemeProvider>
        </GlobalProvider>
      </body>
    </html>
  );
}
