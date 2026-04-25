import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "@/context/I18nContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Homes - Thiết kế & Thi công Nội thất Cao cấp",
  description: "Kiến tạo không gian sống thông minh, hiện đại cùng công nghệ AI. Thương hiệu nội thất uy tín thuộc VIMGROUP.",
  keywords: "thiết kế nội thất, thi công nội thất, AI Homes, VIMGROUP, nội thất cao cấp",
  icons: {
    icon: "/favicon-aihomes.png"
  },
  openGraph: {
    title: "AI Homes - Thiết kế & Thi công Nội thất Cao cấp",
    description: "Kiến tạo không gian sống thông minh, hiện đại cùng công nghệ AI. Thương hiệu nội thất uy tín thuộc VIMGROUP.",
    url: "https://aihomes-vimgroup.vercel.app",
    siteName: "AI Homes",
    images: [
      {
        url: "https://aihomes-vimgroup.vercel.app/images/og-banner.png",
        width: 1200,
        height: 630,
        alt: "AI Homes Banner",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Homes - Thiết kế & Thi công Nội thất Cao cấp",
    description: "Kiến tạo không gian sống thông minh, hiện đại cùng công nghệ AI. Thương hiệu nội thất uy tín thuộc VIMGROUP.",
    images: ["https://aihomes-vimgroup.vercel.app/images/og-banner.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-slate-50 text-slate-900`} suppressHydrationWarning>
        <I18nProvider>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
