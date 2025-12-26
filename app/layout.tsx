import "./globals.css";
import Nav from "@/components/Nav";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="scroll-smooth">
      <body className="antialiased">
        <Nav />
        <div className="pt-16 md:pt-20">
          {children}
        </div>
      </body>
    </html>
  );
}
