import type { Metadata, Viewport } from "next";
import Link from "next/link";
import Image from "next/image";
import localFont from "next/font/local";
import "./globals.css";
const raleway = localFont({ src: "../public/raleway.woff2", display: "swap", variable: "--font-raleway", weight: "100 900" });
export const metadata: Metadata = {
  metadataBase: new URL("https://business.buyology.online"),
  title: { default: "Buyology Business | Become a Stockist & Retail Partner", template: "%s | Buyology Business" },
  description: "Partner with Buyology to bring certified refurbished laptops and tablets to your market. Explore stockist, retailer and B2B distribution partnerships.",
  applicationName: "Buyology Business", robots: { index: true, follow: true },
  icons: { icon: "/favicon.png", apple: "/favicon.png" },
  openGraph: { type: "website", siteName: "Buyology Business", locale: "en_US", title: "Build your technology business with Buyology", description: "Explore stockist, retail and B2B distribution partnerships for refurbished technology.", images: [{ url: "/logo-light.png", alt: "Buyology — Buy the why" }] },
  twitter: { card: "summary", title: "Buyology Business Partnerships", description: "Explore stockist, retail and B2B distribution partnerships.", images: ["/logo-light.png"] },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#402f75" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={raleway.variable}>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header"><div className="container header-inner">
      <Link className="brand" href="/" aria-label="Buyology Business home"><Image src="/logo-light.png" alt="Buyology" width={190} height={42} priority /><span>BUSINESS</span></Link>
      <nav aria-label="Main navigation"><Link href="/">Home</Link><Link className="button small" href="/become-partner/">Become a partner</Link></nav>
    </div></header>
    <main id="main">{children}</main>
    <footer><div className="container footer-inner"><div><Image src="/logo.png" alt="Buyology" width={180} height={40} /><p>Buy the why. Build what’s next.</p></div><div><Link href="/become-partner/">Become a partner</Link><a href="https://buyology.online">Visit Buyology store</a><a href="mailto:support@buyology.online">support@buyology.online</a></div></div><div className="container footer-bottom">© {new Date().getFullYear()} Buyology. All rights reserved.<span>Stockist · Retail · B2B Distribution</span></div></footer>
  </body></html>;
}
