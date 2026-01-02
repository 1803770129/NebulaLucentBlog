import "./globals.css";
import Nav from "@/components/Nav";
import ClientProviders from "@/components/ClientProviders";
import CosmicFooter from "@/components/cosmic/CosmicFooter";

export const metadata = {
  title: "Nebula Lucent - 探索宇宙的边界",
  description: "一个现代化的个人空间，记录技术探索与创作历程",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="scroll-smooth">
      <body className="antialiased">
        <ClientProviders />
        <Nav />
        <div className="pt-16 md:pt-20">
          {children}
        </div>
        <CosmicFooter />
      </body>
    </html>
  );
}
