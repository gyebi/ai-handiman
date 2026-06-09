import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Roadside Assist",
  description: "Mobile-first roadside assistance marketplace foundation.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div className="app-shell">{children}</div>
      </body>
    </html>
  );
}
