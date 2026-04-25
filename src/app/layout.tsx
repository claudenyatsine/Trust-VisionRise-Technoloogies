import type { Metadata } from "next";
import "./globals.css";
import { SmoothScrolling } from "@/components/providers/SmoothScrolling";
import { AdminProvider } from "@/context/AdminContext";

export const metadata: Metadata = {
  title: "GuardianSight Solutions | Professional CCTV Installation",
  description: "Expert industrial-grade surveillance and CCTV installation services for home and business.",
  icons: {
    icon: "/logo.png",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased selection:bg-primary selection:text-primary-foreground" suppressHydrationWarning>
        <AdminProvider>
          <SmoothScrolling>
            {children}
          </SmoothScrolling>
        </AdminProvider>
      </body>
    </html>
  );
}