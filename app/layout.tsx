import { Inter } from "next/font/google";
import type { Metadata } from "next";
import "@/styles/globals.css";
import AuthProviderWrapper from "./AuthProviderWrapper";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next SNS",
  description: "SNS WebApp Created by NextJs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <AuthProviderWrapper>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}{" "}
          </ThemeProvider>
        </AuthProviderWrapper>
      </body>
    </html>
  );
}
