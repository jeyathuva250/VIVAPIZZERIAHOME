import type { Metadata } from "next";
import { Playfair_Display, Poppins, Luckiest_Guy, Permanent_Marker, Montserrat } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const luckiestGuy = Luckiest_Guy({
  variable: "--font-poster",
  weight: "400",
  subsets: ["latin"],
});

const permanentMarker = Permanent_Marker({
  variable: "--font-brush",
  weight: "400",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-sans-alt",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Viva Pizzeria & Pasta House",
  description: "Authentic Italian Crafted with Fire",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${poppins.variable} ${luckiestGuy.variable} ${permanentMarker.variable} ${montserrat.variable} scroll-smooth`}
    >
      <body className="font-sans antialiased text-[#1A1A1A] bg-white min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
