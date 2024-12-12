import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from 'sonner'


export const metadata: Metadata = {
  title: "Admin: E-Ferramentas",
  description: "Área Administrativa da Ferramentas Admin",
  icons: {
    icon: '/favicon_io/favicon.ico', 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      
      <body className="">
        
        {children}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
