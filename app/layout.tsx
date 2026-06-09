import type { Metadata } from "next";
import { FirebaseAnalytics } from "./firebase-analytics";
import "./globals.css";
import { brandAssets } from "@/lib/brand-assets";

export const metadata: Metadata = {
  title: "Handiman Mechanics",
  description: "Mobile-first roadside assistance marketplace foundation.",
  icons: {
    icon: brandAssets.icon,
    apple: brandAssets.iconLarge,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <FirebaseAnalytics />
        <div className="app-shell">{children}</div>
      </body>
    </html>
  );
}
