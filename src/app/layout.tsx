import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";

const playfair_display = Playfair_Display({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "Venshare",
  description: "A platform dedicated to connecting its users seamlessly.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className={`bg-black text-white ${playfair_display.className}`}>
        {children}
      </body>
    </html>
  );
}
