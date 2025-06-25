import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://igan-group-nextjs.vercel.app"),
  title: {
    default: "ИГАН Групп — алюминиевые фасады, мебельные решения",
    template: "%s | ИГАН Групп",
  },
  description:
    "ИГАН Групп — решения для мебели и интерьера: алюминиевые фасады, конфигураторы, проектирование и производство",
  openGraph: {
    title: "ИГАН Групп — алюминиевые фасады, мебельные решения",
    description:
      "Современные алюминиевые фасады на заказ и готовые решения. Удобные онлайн-инструменты для дизайнеров, производителей и частных клиентов.",
    url: "https://igan-group-nextjs.vercel.app",
    siteName: "ИГАН Групп",
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ИГАН Групп — мебельные и фасадные решения",
    description:
      "Модульные алюминиевые фасады и онлайн-конфигураторы.",
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
